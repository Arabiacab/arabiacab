import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getBookingById, updateBooking, createNotification } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { Resend } from 'resend';
import { bookingCancelledHtml, statusUpdateHtml } from '@/emails/templates';

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

  // Send email based on new status
  if (booking.customer_email) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      if (status === 'cancelled') {
        await resend.emails.send({
          from: 'bookings@arabiacab.com',
          to: booking.customer_email,
          subject: `Booking Cancelled — Ref #${booking.booking_ref}`,
          html: bookingCancelledHtml(booking, reason),
        });
      } else if (['confirmed', 'in_progress', 'completed'].includes(status)) {
        await resend.emails.send({
          from: 'bookings@arabiacab.com',
          to: booking.customer_email,
          subject: `Your ride status updated — Arabia Cab`,
          html: statusUpdateHtml(booking),
        });
      }
    } catch { /* silent */ }
  }

  return NextResponse.json({ success: true, data: booking });
}
