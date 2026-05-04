import { NextRequest, NextResponse } from 'next/server';
import { getInvoiceById, markInvoicePaid, updateInvoice, logActivity } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function requireAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const invoice = await getInvoiceById(id);
  if (!invoice) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: invoice });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }
  const { action, ...updates } = body as { action?: string; [k: string]: unknown };
  let invoice;
  if (action === 'mark_paid') {
    invoice = await markInvoicePaid(id);
    await logActivity('invoice_paid', 'invoice', id);
  } else {
    invoice = await updateInvoice(id, updates);
    await logActivity('invoice_updated', 'invoice', id, updates);
  }
  if (!invoice) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: invoice });
}
