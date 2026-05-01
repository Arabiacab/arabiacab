import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, service, vehicle, bookingRef } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Owner notification
    await resend.emails.send({
      from: 'ArabiaCab Bookings <bookings@arabiacab.com>',
      to: ['arabiacab04@gmail.com'],
      replyTo: email || 'bookings@arabiacab.com',
      subject: `New Booking Request — ${name || 'Customer'}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 20px;">
    <tr><td align="center">
      <table width="560" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">
        <tr><td style="background:#1a1a2e;padding:24px 32px;">
          <h1 style="margin:0;color:#f0b429;font-size:22px;font-weight:700;">ArabiaCab</h1>
          <p style="margin:4px 0 0;color:#aaaaaa;font-size:13px;">New Booking Notification</p>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 20px;color:#333;font-size:16px;">A new booking has been submitted:</p>
          <table width="100%" style="border-collapse:collapse;">
            ${bookingRef ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;width:120px;">Booking Ref</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#c8f000;font-size:14px;font-weight:700;">${bookingRef}</td></tr>` : ''}
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;width:120px;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#222;font-size:14px;font-weight:600;">${name || '—'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#222;font-size:14px;font-weight:600;">${phone || '—'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#222;font-size:14px;font-weight:600;">${email || '—'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Date</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#222;font-size:14px;font-weight:600;">${date || '—'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Time</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#222;font-size:14px;font-weight:600;">${time || '—'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Vehicle</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#222;font-size:14px;font-weight:600;">${vehicle || '—'}</td></tr>
            <tr><td style="padding:10px 0;color:#666;font-size:14px;">Service</td>
                <td style="padding:10px 0;color:#222;font-size:14px;font-weight:600;">${service || '—'}</td></tr>
          </table>
          <p style="margin:24px 0 0;color:#888;font-size:13px;">Reply to this email to contact the customer directly.</p>
        </td></tr>
        <tr><td style="background:#f9f9f9;padding:16px 32px;text-align:center;">
          <p style="margin:0;color:#aaa;font-size:12px;">ArabiaCab · arabiacab.com · bookings@arabiacab.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    // Customer confirmation
    if (email) {
      await resend.emails.send({
        from: 'ArabiaCab Bookings <bookings@arabiacab.com>',
        to: [email],
        replyTo: 'arabiacab04@gmail.com',
        subject: 'Your Booking Request Received — ArabiaCab',
        html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 20px;">
    <tr><td align="center">
      <table width="560" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">
        <tr><td style="background:#1a1a2e;padding:24px 32px;">
          <h1 style="margin:0;color:#f0b429;font-size:22px;font-weight:700;">ArabiaCab</h1>
          <p style="margin:4px 0 0;color:#aaaaaa;font-size:13px;">Premium Taxi Service — Saudi Arabia</p>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <h2 style="margin:0 0 12px;color:#222;font-size:20px;">Thank you, ${name || 'there'}!</h2>
          <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">
            We have received your booking request and will contact you shortly on WhatsApp or phone to confirm.
          </p>
          <table width="100%" style="border-collapse:collapse;background:#f9f9f9;border-radius:6px;">
            ${bookingRef ? `<tr><td style="padding:12px 16px;border-bottom:1px solid #eee;color:#666;font-size:14px;width:140px;">Booking Reference</td>
                <td style="padding:12px 16px;border-bottom:1px solid #eee;color:#1a1a2e;font-size:15px;font-weight:700;letter-spacing:2px;">${bookingRef}</td></tr>` : ''}
            <tr><td style="padding:12px 16px;border-bottom:1px solid #eee;color:#666;font-size:14px;width:120px;">Date</td>
                <td style="padding:12px 16px;border-bottom:1px solid #eee;color:#222;font-size:14px;font-weight:600;">${date || '—'}</td></tr>
            <tr><td style="padding:12px 16px;border-bottom:1px solid #eee;color:#666;font-size:14px;">Time</td>
                <td style="padding:12px 16px;border-bottom:1px solid #eee;color:#222;font-size:14px;font-weight:600;">${time || '—'}</td></tr>
            <tr><td style="padding:12px 16px;border-bottom:1px solid #eee;color:#666;font-size:14px;">Vehicle</td>
                <td style="padding:12px 16px;border-bottom:1px solid #eee;color:#222;font-size:14px;font-weight:600;">${vehicle || '—'}</td></tr>
            <tr><td style="padding:12px 16px;color:#666;font-size:14px;">Service</td>
                <td style="padding:12px 16px;color:#222;font-size:14px;font-weight:600;">${service || '—'}</td></tr>
          </table>
          <p style="margin:24px 0 0;color:#888;font-size:13px;">
            Questions? Reply to this email or WhatsApp us directly.
          </p>
        </td></tr>
        <tr><td style="background:#f9f9f9;padding:16px 32px;text-align:center;">
          <p style="margin:0;color:#aaa;font-size:12px;">ArabiaCab · arabiacab.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[send-email] error:', String(error));
    return NextResponse.json({ success: true });
  }
}
