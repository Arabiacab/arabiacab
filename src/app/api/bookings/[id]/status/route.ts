import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getBookingById, updateBooking, createNotification } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function requireAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

const schema = z.object({
  status: z.enum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']),
  reason: z.string().max(500).optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;

  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 422 });

  const { status, reason } = parsed.data;
  const booking = await updateBooking(id, { booking_status: status });
  if (!booking) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

  await createNotification({
    type: 'status_change',
    booking_id: booking.id,
    message: `Booking ${booking.booking_ref} status changed to ${status}`,
  });

  return NextResponse.json({ success: true, data: booking });
}
