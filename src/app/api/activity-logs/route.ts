import { NextRequest, NextResponse } from 'next/server';
import { getActivityLogs } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function requireAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const sp = request.nextUrl.searchParams;
  const entity_type = sp.get('entity_type') ?? undefined;
  const entity_id   = sp.get('entity_id') ?? undefined;
  const limit       = Math.min(parseInt(sp.get('limit') ?? '50', 10), 200);
  const logs = await getActivityLogs(entity_type, entity_id, limit);
  return NextResponse.json({ success: true, data: logs });
}
