import { NextResponse } from 'next/server';
import { createToken, HARDCODED_ADMIN } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (email !== HARDCODED_ADMIN.email || password !== HARDCODED_ADMIN.password) {
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }

    const user = { id: HARDCODED_ADMIN.id, email: HARDCODED_ADMIN.email, name: HARDCODED_ADMIN.name, role: HARDCODED_ADMIN.role };
    const token = createToken(user);

    const res = NextResponse.json({ success: true, user });
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24h
      path: '/',
    });
    return res;
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
