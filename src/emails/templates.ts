import type { Booking } from '@/types';

const BRAND = '#1a1f5e';
const GOLD = '#C9A84C';

function layout(content: string, preheader = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Arabia Cab</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>` : ''}
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <!-- Header -->
      <tr><td style="background:${BRAND};padding:28px 40px;text-align:center;">
        <p style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:2px;">ARABIA CAB</p>
        <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:1px;text-transform:uppercase;">Premium Taxi Service — Saudi Arabia</p>
      </td></tr>
      <!-- Body -->
      ${content}
      <!-- Footer -->
      <tr><td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
        <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} Arabia Cab · <a href="https://arabiacab.com" style="color:${BRAND};text-decoration:none;">arabiacab.com</a></p>
        <p style="margin:6px 0 0;font-size:12px;color:#94a3b8;">Riyadh, Saudi Arabia</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 16px;border-bottom:1px solid #f1f5f9;width:40%;">
      <span style="font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">${label}</span>
    </td>
    <td style="padding:10px 16px;border-bottom:1px solid #f1f5f9;">
      <span style="font-size:14px;color:#1e293b;font-weight:600;">${value || '—'}</span>
    </td>
  </tr>`;
}

// ─── 1. Booking Confirmation ──────────────────────────────────────────────────
export function bookingConfirmationHtml(booking: Booking): string {
  const body = `
  <tr><td style="padding:40px;">
    <p style="margin:0 0 4px;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Booking Confirmed</p>
    <p style="margin:0 0 24px;font-size:28px;font-weight:700;color:#1e293b;">Your ride is booked! 🎉</p>
    <p style="margin:0 0 28px;font-size:15px;color:#475569;line-height:1.6;">
      Dear <strong style="color:#1e293b;">${booking.customer_name}</strong>, thank you for choosing Arabia Cab.
      Your booking has been received and we will contact you shortly to confirm.
    </p>

    <!-- Ref Number -->
    <div style="background:${BRAND};border-radius:8px;padding:20px;text-align:center;margin-bottom:28px;">
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:1px;">Booking Reference</p>
      <p style="margin:8px 0 0;font-size:32px;font-weight:700;color:#ffffff;letter-spacing:4px;">${booking.booking_ref}</p>
    </div>

    <!-- Details -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:28px;">
      ${detailRow('Pickup', booking.pickup_location)}
      ${detailRow('Drop-off', booking.dropoff_location)}
      ${detailRow('Date', booking.pickup_date)}
      ${detailRow('Time', booking.pickup_time)}
      ${detailRow('Passengers', String(booking.passengers))}
      ${detailRow('Service', booking.service_type.charAt(0).toUpperCase() + booking.service_type.slice(1))}
      ${detailRow('Payment', booking.payment_method === 'cash' ? 'Cash to Driver' : 'Online Payment')}
      ${booking.price_estimate ? detailRow('Estimated Price', `SAR ${booking.price_estimate.toFixed(2)}`) : ''}
    </table>

    <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.7;">
      Our team will call you to confirm your driver's details. If you need to make any changes, please contact us via WhatsApp.
    </p>

    <div style="text-align:center;">
      <a href="https://wa.me/966503667424" style="display:inline-block;background:#25D366;color:#ffffff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;">
        📱 Contact via WhatsApp
      </a>
    </div>
  </td></tr>`;

  return layout(body, `Booking ${booking.booking_ref} confirmed — Arabia Cab`);
}

// ─── 2. Booking Cancelled ─────────────────────────────────────────────────────
export function bookingCancelledHtml(booking: Booking, reason?: string): string {
  const body = `
  <tr><td style="padding:40px;">
    <div style="background:#fef2f2;border-left:4px solid #ef4444;padding:16px;border-radius:0 8px 8px 0;margin-bottom:28px;">
      <p style="margin:0;font-size:16px;font-weight:700;color:#dc2626;">Booking Cancelled</p>
      <p style="margin:4px 0 0;font-size:14px;color:#ef4444;">Reference: ${booking.booking_ref}</p>
    </div>

    <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.6;">
      Dear <strong style="color:#1e293b;">${booking.customer_name}</strong>,
      your booking has been cancelled. We apologize for any inconvenience.
    </p>

    ${reason ? `<div style="background:#f8fafc;border-radius:8px;padding:16px;margin-bottom:24px;border:1px solid #e2e8f0;">
      <p style="margin:0;font-size:13px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Cancellation Reason</p>
      <p style="margin:8px 0 0;font-size:14px;color:#475569;">${reason}</p>
    </div>` : ''}

    <p style="margin:0 0 28px;font-size:14px;color:#475569;">
      We'd love to serve you again. You can book a new ride anytime.
    </p>

    <div style="text-align:center;">
      <a href="https://arabiacab.com/booking" style="display:inline-block;background:${BRAND};color:#ffffff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;">
        Book a New Ride
      </a>
    </div>
  </td></tr>`;

  return layout(body, `Your booking ${booking.booking_ref} has been cancelled`);
}

// ─── 3. Admin — New Booking Notification ─────────────────────────────────────
export function adminNewBookingHtml(booking: Booking): string {
  const body = `
  <tr><td style="padding:32px 40px;">
    <div style="background:${GOLD};border-radius:8px;padding:16px 20px;margin-bottom:28px;">
      <p style="margin:0;font-size:18px;font-weight:700;color:#000000;">🚗 New Booking Received</p>
      <p style="margin:4px 0 0;font-size:14px;color:#333333;">Ref: ${booking.booking_ref}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:24px;">
      ${detailRow('Customer', booking.customer_name)}
      ${detailRow('Phone', `<a href="tel:${booking.customer_phone}" style="color:${BRAND};">${booking.customer_phone}</a>`)}
      ${booking.customer_email ? detailRow('Email', booking.customer_email) : ''}
      ${detailRow('Pickup', booking.pickup_location)}
      ${detailRow('Drop-off', booking.dropoff_location)}
      ${detailRow('Date & Time', `${booking.pickup_date} at ${booking.pickup_time}`)}
      ${detailRow('Service', booking.service_type)}
      ${detailRow('Passengers', String(booking.passengers))}
      ${detailRow('Payment', booking.payment_method)}
      ${booking.price_estimate ? detailRow('Est. Price', `SAR ${booking.price_estimate.toFixed(2)}`) : ''}
      ${booking.notes ? detailRow('Notes', booking.notes) : ''}
    </table>

    <div style="text-align:center;">
      <a href="https://arabiacab.com/admin/bookings" style="display:inline-block;background:${BRAND};color:#ffffff;font-size:14px;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;">
        Open Admin Panel
      </a>
    </div>
  </td></tr>`;

  return layout(body);
}

// ─── 4. Status Update ─────────────────────────────────────────────────────────
const statusConfig: Record<string, { label: string; color: string; emoji: string }> = {
  confirmed:   { label: 'Confirmed',   color: '#3b82f6', emoji: '✅' },
  in_progress: { label: 'In Progress', color: '#8b5cf6', emoji: '🚗' },
  completed:   { label: 'Completed',   color: '#22c55e', emoji: '🎉' },
  cancelled:   { label: 'Cancelled',   color: '#ef4444', emoji: '❌' },
};

export function statusUpdateHtml(booking: Booking): string {
  const cfg = statusConfig[booking.booking_status] ?? { label: booking.booking_status, color: '#64748b', emoji: 'ℹ️' };

  const body = `
  <tr><td style="padding:40px;">
    <p style="margin:0 0 24px;font-size:15px;color:#475569;">
      Dear <strong style="color:#1e293b;">${booking.customer_name}</strong>, here's an update on your booking.
    </p>

    <!-- Status Badge -->
    <div style="background:${cfg.color}18;border:2px solid ${cfg.color};border-radius:12px;padding:20px;text-align:center;margin-bottom:28px;">
      <p style="margin:0;font-size:36px;">${cfg.emoji}</p>
      <p style="margin:8px 0 0;font-size:20px;font-weight:700;color:${cfg.color};">${cfg.label}</p>
      <p style="margin:4px 0 0;font-size:14px;color:#64748b;">Ref: ${booking.booking_ref}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:24px;">
      ${detailRow('Pickup', booking.pickup_location)}
      ${detailRow('Drop-off', booking.dropoff_location)}
      ${detailRow('Date', `${booking.pickup_date} at ${booking.pickup_time}`)}
    </table>

    <p style="margin:0 0 24px;font-size:14px;color:#475569;">
      For any questions, contact us via WhatsApp — we're available 24/7.
    </p>

    <div style="text-align:center;">
      <a href="https://wa.me/966503667424" style="display:inline-block;background:#25D366;color:#ffffff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;">
        Contact Driver / Support
      </a>
    </div>
  </td></tr>`;

  return layout(body, `Your booking is ${cfg.label.toLowerCase()} — ${booking.booking_ref}`);
}
