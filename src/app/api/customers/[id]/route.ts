import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCustomerById, updateCustomer, getBookings } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function requireAdmin(r: NextRequest) {
  const token = r.cookies.get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const customer = await getCustomerById(id);
  if (!customer) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

  // Fetch their bookings
  const allBookings = await getBookings();
  const bookings = allBookings.filter(b => b.customer_phone === customer.phone);

  return NextResponse.json({ success: true, data: { customer, bookings } });
}

const updateSchema = z.object({
  name:     z.string().min(2).max(100).optional(),
  email:    z.string().email().optional().or(z.literal('')),
  is_vip:   z.boolean().optional(),
}).partial();

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 422 });
  const customer = await updateCustomer(id, parsed.data);
  if (!customer) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: customer });
}
