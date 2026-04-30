import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, service } = body;

    // Resend must be initialised inside the handler — not at module level —
    // otherwise Next.js throws during static build when the env var is absent.
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Owner notification
    await resend.emails.send({
      from: 'bookings@arabiacab.com',
      to: 'arabiacab04@gmail.com',
      subject: `New Booking — ${name}`,
      html: `
        <h2>New Booking Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
        <p><b>Service:</b> ${service}</p>
      `,
    });

    // Customer confirmation
    if (email) {
      await resend.emails.send({
        from: 'bookings@arabiacab.com',
        to: email,
        subject: 'Booking Confirmed — Arabia Cab',
        html: `
          <h2>Thank you, ${name}!</h2>
          <p>Your booking is confirmed.</p>
          <p>We will contact you shortly.</p>
          <p><b>Date:</b> ${date}</p>
          <p><b>Time:</b> ${time}</p>
          <p><b>Service:</b> ${service}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ success: true });
  }
}
