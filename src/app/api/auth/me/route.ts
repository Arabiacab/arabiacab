import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, HARDCODED_ADMIN } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });

  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ success: false, error: 'Invalid or expired token' }, { status: 401 });

  return NextResponse.json({
    success: true,
    user: { id: payload.id, email: payload.email, name: payload.name, role: payload.role },
  });
}
