import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getBookingById, updateBooking, cancelBooking } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function requireAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

const updateSchema = z.object({
  booking_status: z.enum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']).optional(),
  payment_status: z.enum(['pending', 'paid', 'refunded']).optional(),
  final_price:    z.number().positive().optional(),
  price_estimate: z.number().positive().optional(),
  admin_notes:    z.string().max(1000).optional(),
  notes:          z.string().max(500).optional(),
}).partial();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const booking = await getBookingById(id);
  if (!booking) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: booking });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;

  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, { status: 422 });

  const booking = await updateBooking(id, parsed.data);
  if (!booking) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: booking });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const ok = await cancelBooking(id);
  if (!ok) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
