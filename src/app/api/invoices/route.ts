import { NextRequest, NextResponse } from 'next/server';
import { getInvoices, createInvoice, getBookingById, logActivity } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function requireAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const booking_id = request.nextUrl.searchParams.get('booking_id') ?? undefined;
  const invoices = await getInvoices(booking_id);
  return NextResponse.json({ success: true, data: invoices });
}

export async function POST(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }
  const { booking_id } = body as { booking_id: string };
  if (!booking_id) return NextResponse.json({ success: false, error: 'booking_id required' }, { status: 422 });
  const booking = await getBookingById(booking_id);
  if (!booking) return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  const invoice = await createInvoice(booking);
  await logActivity('invoice_created', 'invoice', invoice.id, { booking_id, invoice_number: invoice.invoice_number });
  return NextResponse.json({ success: true, data: invoice }, { status: 201 });
}
