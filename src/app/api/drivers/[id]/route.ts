import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDriverById, updateDriver, deleteDriver, logActivity } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function requireAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

const updateSchema = z.object({
  name:          z.string().min(1).max(100).optional(),
  phone:         z.string().min(1).max(30).optional(),
  vehicle_type:  z.enum(['standard', 'airport', 'tour', 'rental']).optional(),
  vehicle_plate: z.string().max(20).optional(),
  notes:         z.string().max(500).optional(),
  status:        z.enum(['available', 'busy', 'offline']).optional(),
  is_active:     z.boolean().optional(),
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const driver = await getDriverById(id);
  if (!driver) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: driver });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 422 });
  const driver = await updateDriver(id, parsed.data);
  if (!driver) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  await logActivity('driver_updated', 'driver', id, parsed.data as Record<string, unknown>);
  return NextResponse.json({ success: true, data: driver });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const ok = await deleteDriver(id);
  if (!ok) return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
  await logActivity('driver_deleted', 'driver', id);
  return NextResponse.json({ success: true });
}
