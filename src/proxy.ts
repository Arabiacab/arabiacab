import { NextRequest, NextResponse } from 'next/server';

const SECRET = process.env.ADMIN_JWT_SECRET ?? 'arabiacab-admin-secret-key-2024-change-in-prod';

async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const dot = token.lastIndexOf('.');
    if (dot === -1) return false;
    const body = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      Buffer.from(sig, 'base64url'),
      encoder.encode(body)
    );
    
    if (!isValid) return false;
    
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login' || pathname === '/admin/login/') {
      return NextResponse.next();
    }
    const token = request.cookies.get('admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
