import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getNotifications, markNotificationsRead } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function requireAdmin(r: NextRequest) {
  const token = r.cookies.get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const notifications = await getNotifications();
  return NextResponse.json({ success: true, data: notifications });
}

const markReadSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
});

export async function PATCH(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }
  const parsed = markReadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 422 });
  await markNotificationsRead(parsed.data.ids ?? []);
  return NextResponse.json({ success: true });
}
