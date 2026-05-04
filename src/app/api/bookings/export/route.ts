import { NextRequest, NextResponse } from 'next/server';
import { getBookings } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import type { BookingFilters, Booking } from '@/types';

function requireAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

function escape(v: unknown): string {
  const s = String(v ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const sp = request.nextUrl.searchParams;
  const filters: BookingFilters = {
    status:         (sp.get('status') as any) ?? undefined,
    date_from:      sp.get('date_from') ?? undefined,
    date_to:        sp.get('date_to') ?? undefined,
    search:         sp.get('search') ?? undefined,
    service_type:   (sp.get('service_type') as any) ?? undefined,
    payment_method: (sp.get('payment_method') as any) ?? undefined,
    payment_status: (sp.get('payment_status') as any) ?? undefined,
  };

  const bookings = await getBookings(filters);

  const headers = ['Booking Ref', 'Customer Name', 'Phone', 'Email', 'Pickup', 'Dropoff', 'Date', 'Time', 'Service', 'Passengers', 'Payment Method', 'Payment Status', 'Booking Status', 'Price Estimate', 'Final Price', 'Notes', 'Created At'];
  const rows = bookings.map((b: Booking) => [
    b.booking_ref, b.customer_name, b.customer_phone, b.customer_email ?? '',
    b.pickup_location, b.dropoff_location, b.pickup_date, b.pickup_time,
    b.service_type, b.passengers, b.payment_method, b.payment_status,
    b.booking_status, b.price_estimate ?? '', b.final_price ?? '',
    b.notes ?? '', b.created_at,
  ].map(escape).join(','));

  const csv = [headers.join(','), ...rows].join('\n');
  const date = new Date().toISOString().split('T')[0];

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="arabiacab-bookings-${date}.csv"`,
    },
  });
}
