import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDrivers, createDriver, logActivity } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function requireAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

const createSchema = z.object({
  name:          z.string().min(1).max(100),
  phone:         z.string().min(1).max(30),
  vehicle_type:  z.enum(['standard', 'airport', 'tour', 'rental']).default('standard'),
  vehicle_plate: z.string().max(20).optional(),
  notes:         z.string().max(500).optional(),
  status:        z.enum(['available', 'busy', 'offline']).default('available'),
  is_active:     z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const drivers = await getDrivers();
  return NextResponse.json({ success: true, data: drivers });
}

export async function POST(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, { status: 422 });
  const driver = await createDriver(parsed.data);
  await logActivity('driver_created', 'driver', driver.id, { name: driver.name });
  return NextResponse.json({ success: true, data: driver }, { status: 201 });
}
