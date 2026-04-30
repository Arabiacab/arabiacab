import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getBookings, createBooking, createNotification } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import type { BookingFilters } from '@/types';

// ─── Rate limiting (in-memory, per IP) ───────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; reset: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.reset < now) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60 * 60 * 1000 });
    return true;
  }
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

// GET — admin only
export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const sp = request.nextUrl.searchParams;
  const filters: BookingFilters = {
    status:    (sp.get('status') as any) ?? undefined,
    date_from: sp.get('date_from') ?? undefined,
    date_to:   sp.get('date_to') ?? undefined,
    search:    sp.get('search') ?? undefined,
  };

  const bookings = await getBookings(filters);
  return NextResponse.json({ success: true, data: bookings });
}

// POST — public
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ success: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    console.error('[bookings] Validation failed:', JSON.stringify(parsed.error.flatten()));
    return NextResponse.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;
  const booking = await createBooking({
    customer_name:    data.customer_name,
    customer_phone:   data.customer_phone,
    customer_email:   data.customer_email || undefined,
    pickup_location:  data.pickup_location,
    dropoff_location: data.dropoff_location,
    pickup_date:      data.pickup_date,
    pickup_time:      data.pickup_time,
    service_type:     data.service_type,
    passengers:       data.passengers,
    payment_method:   data.payment_method,
    payment_status:   'pending',
    booking_status:   'pending',
    price_estimate:   data.price_estimate,
    notes:            data.notes,
  });

  // Notification
  await createNotification({
    type: 'new_booking',
    booking_id: booking.id,
    message: `New booking ${booking.booking_ref} from ${booking.customer_name} — ${booking.pickup_location} to ${booking.dropoff_location}`,
  });

  return NextResponse.json({ success: true, data: booking }, { status: 201 });
}
