import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCustomers, upsertCustomer } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function requireAdmin(r: NextRequest) {
  const token = r.cookies.get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const customers = await getCustomers();
  return NextResponse.json({ success: true, data: customers });
}

const schema = z.object({
  name:  z.string().min(2).max(100),
  phone: z.string().min(9).max(20),
  email: z.string().email().optional().or(z.literal('')),
});

export async function POST(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 422 });
  const { name, phone, email } = parsed.data;
  const customer = await upsertCustomer(phone, name, email || undefined);
  return NextResponse.json({ success: true, data: customer }, { status: 201 });
}
