import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCustomerById, updateCustomer, getCustomerBookings, logActivity } from '@/lib/db';
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
  const bookings = await getCustomerBookings(customer.phone);
  return NextResponse.json({ success: true, data: { customer, bookings } });
}

const updateSchema = z.object({
  name:    z.string().min(2).max(100).optional(),
  email:   z.string().email().optional().or(z.literal('')),
  is_vip:  z.boolean().optional(),
  tags:    z.array(z.enum(['vip', 'frequent', 'risky', 'new'])).optional(),
  notes:   z.string().max(2000).optional(),
}).partial();

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 422 });
  const customer = await updateCustomer(id, parsed.data);
  if (!customer) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  await logActivity('customer_updated', 'customer', id, parsed.data as Record<string, unknown>);
  return NextResponse.json({ success: true, data: customer });
}
