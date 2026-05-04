import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getBookings, getBookingsPaginated, createBooking, createNotification, bulkUpdateBookings, assignDriver, logActivity } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import type { BookingFilters } from '@/types';

const rateLimitMap = new Map<string, { count: number; reset: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.reset < now) { rateLimitMap.set(ip, { count: 1, reset: now + 3600000 }); return true; }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

const createSchema = z.object({
  customer_name:    z.string().min(1).max(100).default('Guest'),
  customer_phone:   z.string().min(1).max(30),
  customer_email:   z.string().email().optional().or(z.literal('')),
  pickup_location:  z.string().min(1).max(300).default('TBD'),
  dropoff_location: z.string().min(1).max(300).default('TBD'),
  pickup_date:      z.string().regex(/^\d{4}-\d{2}-\d{2}$/).default(() => new Date().toISOString().split('T')[0]),
  pickup_time:      z.string().regex(/^\d{2}:\d{2}$/).default('00:00'),
  service_type:     z.enum(['standard', 'airport', 'tour', 'rental']).default('standard'),
  passengers:       z.number().int().min(1).max(20).default(1),
  payment_method:   z.enum(['cash', 'online']).default('cash'),
  price_estimate:   z.number().positive().optional(),
  notes:            z.string().max(500).optional(),
});

function requireAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

// GET — admin only, supports pagination
export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const sp = request.nextUrl.searchParams;
  const filters: BookingFilters = {
    status:         (sp.get('status') as any)         ?? undefined,
    date_from:      sp.get('date_from')               ?? undefined,
    date_to:        sp.get('date_to')                 ?? undefined,
    search:         sp.get('search')                  ?? undefined,
    service_type:   (sp.get('service_type') as any)   ?? undefined,
    payment_method: (sp.get('payment_method') as any) ?? undefined,
    payment_status: (sp.get('payment_status') as any) ?? undefined,
    driver_id:      sp.get('driver_id')               ?? undefined,
    price_min:      sp.get('price_min') ? Number(sp.get('price_min')) : undefined,
    price_max:      sp.get('price_max') ? Number(sp.get('price_max')) : undefined,
  };

  const page  = parseInt(sp.get('page') ?? '1', 10);
  const limit = Math.min(parseInt(sp.get('limit') ?? '25', 10), 100);
  const paginate = sp.get('paginate') === 'true';

  if (paginate) {
    const result = await getBookingsPaginated(filters, page, limit);
    return NextResponse.json({ success: true, ...result });
  }

  const bookings = await getBookings(filters);
  return NextResponse.json({ success: true, data: bookings });
}

// POST — public (create) OR admin (bulk actions)
export async function POST(request: NextRequest) {
  const isAdmin = requireAdmin(request);

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }

  // Admin bulk actions
  if (isAdmin && (body as any)?.bulk_action) {
    const { bulk_action, ids, driver_id } = body as { bulk_action: string; ids: string[]; driver_id?: string };
    if (!Array.isArray(ids) || ids.length === 0) return NextResponse.json({ success: false, error: 'ids required' }, { status: 422 });

    if (bulk_action === 'confirm') {
      await bulkUpdateBookings(ids, { booking_status: 'confirmed' });
      for (const id of ids) await logActivity('bulk_confirmed', 'booking', id);
      return NextResponse.json({ success: true, updated: ids.length });
    }
    if (bulk_action === 'cancel') {
      await bulkUpdateBookings(ids, { booking_status: 'cancelled' });
      for (const id of ids) await logActivity('bulk_cancelled', 'booking', id);
      return NextResponse.json({ success: true, updated: ids.length });
    }
    if (bulk_action === 'assign_driver') {
      if (!driver_id) return NextResponse.json({ success: false, error: 'driver_id required' }, { status: 422 });
      for (const id of ids) {
        await assignDriver(id, driver_id);
        await logActivity('driver_assigned', 'booking', id, { driver_id });
      }
      return NextResponse.json({ success: true, updated: ids.length });
    }
    return NextResponse.json({ success: false, error: 'Unknown bulk_action' }, { status: 422 });
  }

  // Public booking creation
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(ip)) return NextResponse.json({ success: false, error: 'Too many requests. Please try again later.' }, { status: 429 });

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    console.error('[bookings] Validation failed:', JSON.stringify(parsed.error.flatten()));
    return NextResponse.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;
  const booking = await createBooking({
    customer_name: data.customer_name, customer_phone: data.customer_phone,
    customer_email: data.customer_email || undefined,
    pickup_location: data.pickup_location, dropoff_location: data.dropoff_location,
    pickup_date: data.pickup_date, pickup_time: data.pickup_time,
    service_type: data.service_type, passengers: data.passengers,
    payment_method: data.payment_method, payment_status: 'pending',
    booking_status: 'pending', price_estimate: data.price_estimate, notes: data.notes,
  });

  await createNotification({
    type: 'new_booking',
    booking_id: booking.id,
    message: `New booking ${booking.booking_ref} from ${booking.customer_name} — ${booking.pickup_location} to ${booking.dropoff_location}`,
  });

  await logActivity('booking_created', 'booking', booking.id, { ref: booking.booking_ref });
  return NextResponse.json({ success: true, data: booking }, { status: 201 });
}
