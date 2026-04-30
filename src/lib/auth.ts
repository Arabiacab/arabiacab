import { createHmac } from 'crypto';
import type { AdminUser } from '@/types';

const SECRET = process.env.ADMIN_JWT_SECRET ?? 'arabiacab-admin-secret-key-2024-change-in-prod';
const EXPIRES_IN = 24 * 60 * 60 * 1000; // 24h

interface TokenPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  exp: number;
}

export function createToken(user: AdminUser): string {
  const payload: TokenPayload = { ...user, exp: Date.now() + EXPIRES_IN };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', SECRET).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const dot = token.lastIndexOf('.');
    if (dot === -1) return null;
    const body = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const expected = createHmac('sha256', SECRET).update(body).digest('base64url');
    if (sig !== expected) return null;
    const payload: TokenPayload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// Simple HMAC verify for use in proxy (no Buffer.from needed at edge)
export function verifyTokenEdge(token: string): boolean {
  return verifyToken(token) !== null;
}

export const HARDCODED_ADMIN = {
  id: 'admin-001',
  email: 'admin@arabiacab.com',
  password: 'ArabiaCab@2024',
  name: 'ArabiaCab Admin',
  role: 'admin',
} as const;
