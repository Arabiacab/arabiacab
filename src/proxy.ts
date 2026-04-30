import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { createHmac } from 'crypto';

const intlMiddleware = createMiddleware(routing);

const SECRET = process.env.ADMIN_JWT_SECRET ?? 'arabiacab-admin-secret-key-2024-change-in-prod';

function verifyAdminToken(token: string): boolean {
  try {
    const dot = token.lastIndexOf('.');
    if (dot === -1) return false;
    const body = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const expected = createHmac('sha256', SECRET).update(body).digest('base64url');
    if (sig !== expected) return false;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login' || pathname === '/admin/login/') {
      return NextResponse.next();
    }
    const token = request.cookies.get('admin_token')?.value;
    if (!token || !verifyAdminToken(token)) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/admin/:path*', '/', '/(ar|en)/:path*'],
};
