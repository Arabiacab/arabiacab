import { createServerClient } from './supabase';
import type { Booking, Customer, PricingRule, Notification, BookingFilters, DashboardStats } from '@/types';

function db() {
  const client = createServerClient();
  if (!client) throw new Error('Supabase is not configured. Check environment variables.');
  return client;
}

export function generateBookingRef(): string {
  const year = new Date().getFullYear();
  const num = String(Math.floor(Math.random() * 9000) + 1000);
  return `AC-${year}-${num}`;
}

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────

export async function getBookings(filters: BookingFilters = {}): Promise<Booking[]> {
  let q = db().from('bookings').select('*').order('created_at', { ascending: false });
  if (filters.status)    q = q.eq('booking_status', filters.status);
  if (filters.date_from) q = q.gte('pickup_date', filters.date_from);
  if (filters.date_to)   q = q.lte('pickup_date', filters.date_to);
  if (filters.search) {
    const s = filters.search;
    q = q.or(`customer_name.ilike.%${s}%,customer_phone.ilike.%${s}%,booking_ref.ilike.%${s}%,pickup_location.ilike.%${s}%,dropoff_location.ilike.%${s}%`);
  }
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Booking[];
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const { data, error } = await db().from('bookings').select('*').eq('id', id).single();
  if (error) return null;
  return data as Booking;
}

export async function createBooking(
  input: Omit<Booking, 'id' | 'booking_ref' | 'created_at' | 'updated_at'>
): Promise<Booking> {
  const now = new Date().toISOString();
  const booking = {
    ...input,
    booking_ref: generateBookingRef(),
    created_at: now,
    updated_at: now,
  };
  const { data, error } = await db().from('bookings').insert(booking).select().single();
  if (error) throw error;
  return data as Booking;
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | null> {
  const { data, error } = await db()
    .from('bookings')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return data as Booking;
}

export async function cancelBooking(id: string): Promise<boolean> {
  return (await updateBooking(id, { booking_status: 'cancelled' })) !== null;
}

// ─── CUSTOMERS ────────────────────────────────────────────────────────────────

export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await db().from('customers').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Customer[];
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const { data, error } = await db().from('customers').select('*').eq('id', id).single();
  if (error) return null;
  return data as Customer;
}

export async function upsertCustomer(phone: string, name: string, email?: string): Promise<Customer> {
  const { data, error } = await db()
    .from('customers')
    .upsert(
      { phone, name, ...(email ? { email } : {}) },
      { onConflict: 'phone', ignoreDuplicates: false }
    )
    .select()
    .single();
  if (error) throw error;
  return data as Customer;
}

export async function updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | null> {
  const { data, error } = await db().from('customers').update(updates).eq('id', id).select().single();
  if (error) return null;
  return data as Customer;
}

// ─── PRICING ──────────────────────────────────────────────────────────────────

export async function getPricing(): Promise<PricingRule[]> {
  const { data, error } = await db().from('pricing_rules').select('*').order('service_type');
  if (error) throw error;
  return (data ?? []) as PricingRule[];
}

export async function updatePricing(id: string, updates: Partial<PricingRule>): Promise<PricingRule | null> {
  const { data, error } = await db().from('pricing_rules').update(updates).eq('id', id).select().single();
  if (error) return null;
  return data as PricingRule;
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

export async function getNotifications(): Promise<Notification[]> {
  const { data, error } = await db().from('notifications').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Notification[];
}

export async function createNotification(n: Pick<Notification, 'type' | 'booking_id' | 'message'>): Promise<void> {
  await db().from('notifications').insert({ ...n, is_read: false });
}

export async function markNotificationsRead(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  await db().from('notifications').update({ is_read: true }).in('id', ids);
}

// ─── DASHBOARD STATS ──────────────────────────────────────────────────────────

export async function getDashboardStats(): Promise<DashboardStats> {
  const bookings = await getBookings();
  const now = new Date();
  const todayStr    = now.toISOString().split('T')[0];
  const weekAgoStr  = new Date(now.getTime() - 7 * 86400000).toISOString().split('T')[0];
  const monthStart  = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];

  const today_bookings = bookings.filter(b => b.created_at.startsWith(todayStr)).length;
  const week_bookings  = bookings.filter(b => b.created_at.split('T')[0] >= weekAgoStr).length;
  const month_bookings = bookings.filter(b => b.created_at.split('T')[0] >= monthStart).length;

  const completed      = bookings.filter(b => b.booking_status === 'completed');
  const total_revenue  = completed.reduce((s, b) => s + (b.final_price ?? b.price_estimate ?? 0), 0);
  const month_revenue  = completed
    .filter(b => b.created_at.split('T')[0] >= monthStart)
    .reduce((s, b) => s + (b.final_price ?? b.price_estimate ?? 0), 0);

  const routeCounts: Record<string, number> = {};
  bookings.forEach(b => {
    const key = `${b.pickup_location}|||${b.dropoff_location}`;
    routeCounts[key] = (routeCounts[key] ?? 0) + 1;
  });
  const top_routes = Object.entries(routeCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([key, count]) => {
      const [pickup, dropoff] = key.split('|||');
      return { pickup, dropoff, count };
    });

  return {
    today_bookings,
    week_bookings,
    month_bookings,
    total_revenue,
    month_revenue,
    pending_count:   bookings.filter(b => b.booking_status === 'pending').length,
    confirmed_count: bookings.filter(b => b.booking_status === 'confirmed').length,
    completed_count: completed.length,
    cancelled_count: bookings.filter(b => b.booking_status === 'cancelled').length,
    top_routes,
    recent_bookings: bookings.slice(0, 5),
  };
}
