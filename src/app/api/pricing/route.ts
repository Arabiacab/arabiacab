import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPricing, updatePricing } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function requireAdmin(r: NextRequest) {
  const token = r.cookies.get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const pricing = await getPricing();
  return NextResponse.json({ success: true, data: pricing });
}

const updateSchema = z.object({
  id:            z.string().uuid(),
  base_price:    z.number().positive(),
  price_per_km:  z.number().min(0).optional(),
  minimum_price: z.number().positive().optional(),
  is_active:     z.boolean().optional(),
});

export async function PATCH(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 422 });
  const { id, ...updates } = parsed.data;
  const rule = await updatePricing(id, updates);
  if (!rule) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: rule });
}
