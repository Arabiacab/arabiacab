import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, serviceType, passengers, carType, tripType, extraDetails } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'bookings@arabiacab.com',
      to: 'arabiacab04@gmail.com',
      subject: 'New Booking — Arabia Cab',
      html: ownerEmailHtml({ name, email, phone, date, serviceType, passengers, carType, tripType, extraDetails }),
    });

    if (email) {
      await resend.emails.send({
        from: 'bookings@arabiacab.com',
        to: email,
        subject: 'Your Booking is Confirmed!',
        html: customerEmailHtml({ name, date, serviceType, passengers, carType }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: true });
  }
}

function customerEmailHtml({
  name,
  date,
  serviceType,
  passengers,
  carType,
}: {
  name: string;
  date: string;
  serviceType: string;
  passengers: string;
  carType: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111111;border-radius:12px;border:1px solid #333333;overflow:hidden;">
        <tr><td style="background:#0A0A0A;padding:32px 40px;border-bottom:1px solid #333333;text-align:center;">
          <p style="margin:0;font-size:28px;font-weight:700;color:#C9A84C;letter-spacing:2px;">ARABIA CAB</p>
          <p style="margin:8px 0 0;font-size:13px;color:#888888;letter-spacing:1px;text-transform:uppercase;">Premium Taxi Service — Saudi Arabia</p>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#FFFFFF;">Your Booking is Confirmed!</p>
          <p style="margin:0 0 28px;font-size:15px;color:#AAAAAA;line-height:1.6;">
            Dear <strong style="color:#FFFFFF;">${name}</strong>, thank you for choosing Arabia Cab. We have received your booking and will contact you shortly to confirm your ride.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#1A1A1A;border-radius:8px;border:1px solid #333333;margin-bottom:28px;">
            <tr><td style="padding:20px 24px;border-bottom:1px solid #333333;">
              <p style="margin:0;font-size:11px;color:#888888;text-transform:uppercase;letter-spacing:1px;">Service</p>
              <p style="margin:6px 0 0;font-size:15px;color:#FFFFFF;font-weight:600;">${serviceType || '—'}</p>
            </td></tr>
            <tr><td style="padding:20px 24px;border-bottom:1px solid #333333;">
              <p style="margin:0;font-size:11px;color:#888888;text-transform:uppercase;letter-spacing:1px;">Date & Time</p>
              <p style="margin:6px 0 0;font-size:15px;color:#FFFFFF;font-weight:600;">${date || 'To be confirmed'}</p>
            </td></tr>
            <tr><td style="padding:20px 24px;border-bottom:1px solid #333333;">
              <p style="margin:0;font-size:11px;color:#888888;text-transform:uppercase;letter-spacing:1px;">Vehicle</p>
              <p style="margin:6px 0 0;font-size:15px;color:#FFFFFF;font-weight:600;">${carType || '—'}</p>
            </td></tr>
            <tr><td style="padding:20px 24px;">
              <p style="margin:0;font-size:11px;color:#888888;text-transform:uppercase;letter-spacing:1px;">Passengers</p>
              <p style="margin:6px 0 0;font-size:15px;color:#FFFFFF;font-weight:600;">${passengers || '—'}</p>
            </td></tr>
          </table>
          <p style="margin:0 0 28px;font-size:14px;color:#AAAAAA;line-height:1.7;">Our team will reach out via WhatsApp or phone to confirm the details.</p>
          <p style="margin:0;font-size:14px;color:#FFFFFF;font-weight:600;">The Arabia Cab Team</p>
        </td></tr>
        <tr><td style="background:#0A0A0A;padding:20px 40px;border-top:1px solid #333333;text-align:center;">
          <p style="margin:0;font-size:12px;color:#555555;">© 2025 Arabia Cab · arabiacab.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function ownerEmailHtml({
  name,
  email,
  phone,
  date,
  serviceType,
  passengers,
  carType,
  tripType,
  extraDetails,
}: {
  name: string;
  email: string;
  phone: string;
  date: string;
  serviceType: string;
  passengers: string;
  carType: string;
  tripType: string;
  extraDetails: string;
}) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #333333;width:140px;vertical-align:top;">
        <span style="font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.5px;">${label}</span>
      </td>
      <td style="padding:14px 20px;border-bottom:1px solid #333333;">
        <span style="font-size:15px;color:#FFFFFF;font-weight:600;">${value || '—'}</span>
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111111;border-radius:12px;border:1px solid #333333;overflow:hidden;">
        <tr><td style="background:#C9A84C;padding:24px 32px;">
          <p style="margin:0;font-size:20px;font-weight:700;color:#000000;">New Booking — Arabia Cab</p>
          <p style="margin:6px 0 0;font-size:13px;color:#333333;">A new booking request has been submitted.</p>
        </td></tr>
        <tr><td style="padding:8px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${row('Name', name)}
            ${row('Email', email)}
            ${row('Phone', phone ? '+966 ' + phone : '—')}
            ${row('Trip Type', tripType)}
            ${row('Service', serviceType)}
            ${row('Date & Time', date)}
            ${row('Vehicle', carType)}
            ${row('Passengers', passengers)}
            ${row('Details', extraDetails)}
          </table>
        </td></tr>
        <tr><td style="background:#0A0A0A;padding:20px 32px;border-top:1px solid #333333;text-align:center;">
          <p style="margin:0;font-size:12px;color:#555555;">Arabia Cab · Booking System · arabiacab.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
