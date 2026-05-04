import { createServerClient } from './supabase';
import type {
  Booking, Customer, PricingRule, Notification,
  BookingFilters, DashboardStats, Driver, ActivityLog,
  Invoice, PaginatedResponse,
} from '@/types';

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

export function generateInvoiceNumber(): string {
  const year = new Date().getFullYear();
  const num = String(Math.floor(Math.random() * 90000) + 10000);
  return `INV-${year}-${num}`;
}

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────

export async function getBookings(filters: BookingFilters = {}): Promise<Booking[]> {
  let q = db().from('bookings').select('*, driver:drivers(id,name,phone,status,vehicle_type,vehicle_plate)').order('created_at', { ascending: false });
  if (filters.status)         q = q.eq('booking_status', filters.status);
  if (filters.date_from)      q = q.gte('pickup_date', filters.date_from);
  if (filters.date_to)        q = q.lte('pickup_date', filters.date_to);
  if (filters.service_type)   q = q.eq('service_type', filters.service_type);
  if (filters.payment_method) q = q.eq('payment_method', filters.payment_method);
  if (filters.payment_status) q = q.eq('payment_status', filters.payment_status);
  if (filters.driver_id)      q = q.eq('driver_id', filters.driver_id);
  if (filters.price_min != null) q = q.gte('price_estimate', filters.price_min);
  if (filters.price_max != null) q = q.lte('price_estimate', filters.price_max);
  if (filters.search) {
    const s = filters.search;
    q = q.or(`customer_name.ilike.%${s}%,customer_phone.ilike.%${s}%,booking_ref.ilike.%${s}%,pickup_location.ilike.%${s}%,dropoff_location.ilike.%${s}%`);
  }
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Booking[];
}

export async function getBookingsPaginated(
  filters: BookingFilters = {},
  page = 1,
  limit = 25,
): Promise<PaginatedResponse<Booking>> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let q = db().from('bookings').select('*, driver:drivers(id,name,phone,status,vehicle_type,vehicle_plate)', { count: 'exact' }).order('created_at', { ascending: false }).range(from, to);

  if (filters.status)         q = q.eq('booking_status', filters.status);
  if (filters.date_from)      q = q.gte('pickup_date', filters.date_from);
  if (filters.date_to)        q = q.lte('pickup_date', filters.date_to);
  if (filters.service_type)   q = q.eq('service_type', filters.service_type);
  if (filters.payment_method) q = q.eq('payment_method', filters.payment_method);
  if (filters.payment_status) q = q.eq('payment_status', filters.payment_status);
  if (filters.driver_id)      q = q.eq('driver_id', filters.driver_id);
  if (filters.price_min != null) q = q.gte('price_estimate', filters.price_min);
  if (filters.price_max != null) q = q.lte('price_estimate', filters.price_max);
  if (filters.search) {
    const s = filters.search;
    q = q.or(`customer_name.ilike.%${s}%,customer_phone.ilike.%${s}%,booking_ref.ilike.%${s}%,pickup_location.ilike.%${s}%,dropoff_location.ilike.%${s}%`);
  }

  const { data, error, count } = await q;
  if (error) throw error;
  const total = count ?? 0;
  return { data: (data ?? []) as Booking[], total, page, limit, pages: Math.ceil(total / limit) };
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const { data, error } = await db().from('bookings').select('*, driver:drivers(id,name,phone,status,vehicle_type,vehicle_plate)').eq('id', id).single();
  if (error) return null;
  return data as Booking;
}

export async function createBooking(
  input: Omit<Booking, 'id' | 'booking_ref' | 'created_at' | 'updated_at' | 'driver'>
): Promise<Booking> {
  const now = new Date().toISOString();
  const booking = { ...input, booking_ref: generateBookingRef(), created_at: now, updated_at: now };
  const { data, error } = await db().from('bookings').insert(booking).select().single();
  if (error) throw error;
  return data as Booking;
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | null> {
  const { driver: _d, ...safeUpdates } = updates as Booking & { driver?: unknown };
  const { data, error } = await db()
    .from('bookings')
    .update({ ...safeUpdates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return data as Booking;
}

export async function cancelBooking(id: string): Promise<boolean> {
  return (await updateBooking(id, { booking_status: 'cancelled' })) !== null;
}

export async function bulkUpdateBookings(ids: string[], updates: Partial<Booking>): Promise<number> {
  const { driver: _d, ...safeUpdates } = updates as Booking & { driver?: unknown };
  const { error, count } = await db()
    .from('bookings')
    .update({ ...safeUpdates, updated_at: new Date().toISOString() })
    .in('id', ids);
  if (error) throw error;
  return count ?? ids.length;
}

export async function assignDriver(bookingId: string, driverId: string | null): Promise<Booking | null> {
  return updateBooking(bookingId, { driver_id: driverId ?? undefined });
}

// ─── DRIVERS ──────────────────────────────────────────────────────────────────

export async function getDrivers(): Promise<Driver[]> {
  const { data, error } = await db()
    .from('drivers')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Driver[];
}

export async function getAvailableDrivers(): Promise<Driver[]> {
  const { data, error } = await db()
    .from('drivers')
    .select('*')
    .eq('status', 'available')
    .eq('is_active', true)
    .order('name');
  if (error) throw error;
  return (data ?? []) as Driver[];
}

export async function getDriverById(id: string): Promise<Driver | null> {
  const { data, error } = await db().from('drivers').select('*').eq('id', id).single();
  if (error) return null;
  return data as Driver;
}

export async function createDriver(input: Omit<Driver, 'id' | 'created_at' | 'assigned_bookings'>): Promise<Driver> {
  const { data, error } = await db().from('drivers').insert(input).select().single();
  if (error) throw error;
  return data as Driver;
}

export async function updateDriver(id: string, updates: Partial<Driver>): Promise<Driver | null> {
  const { data, error } = await db().from('drivers').update(updates).eq('id', id).select().single();
  if (error) return null;
  return data as Driver;
}

export async function deleteDriver(id: string): Promise<boolean> {
  const { error } = await db().from('drivers').delete().eq('id', id);
  return !error;
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

export async function getCustomerBookings(phone: string): Promise<Booking[]> {
  const { data, error } = await db()
    .from('bookings')
    .select('*')
    .eq('customer_phone', phone)
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data ?? []) as Booking[];
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

// ─── INVOICES ─────────────────────────────────────────────────────────────────

export async function getInvoices(): Promise<Invoice[]> {
  const { data, error } = await db().from('invoices').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Invoice[];
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  const { data, error } = await db().from('invoices').select('*').eq('id', id).single();
  if (error) return null;
  return data as Invoice;
}

export async function createInvoice(booking: Booking): Promise<Invoice> {
  const amount = booking.final_price ?? booking.price_estimate ?? 0;
  const tax_rate = 0.15;
  const tax_amount = Math.round(amount * tax_rate * 100) / 100;
  const total_amount = Math.round((amount + tax_amount) * 100) / 100;
  const invoice = {
    booking_id: booking.id,
    invoice_number: generateInvoiceNumber(),
    customer_name: booking.customer_name,
    customer_email: booking.customer_email,
    customer_phone: booking.customer_phone,
    service_type: booking.service_type,
    pickup_location: booking.pickup_location,
    dropoff_location: booking.dropoff_location,
    amount,
    tax_rate,
    tax_amount,
    total_amount,
    status: 'unpaid' as const,
  };
  const { data, error } = await db().from('invoices').insert(invoice).select().single();
  if (error) throw error;
  return data as Invoice;
}

export async function updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice | null> {
  const { data, error } = await db().from('invoices').update(updates).eq('id', id).select().single();
  if (error) return null;
  return data as Invoice;
}

export async function markInvoicePaid(id: string): Promise<Invoice | null> {
  return updateInvoice(id, { status: 'paid', paid_at: new Date().toISOString() });
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

// ─── ACTIVITY LOGS ────────────────────────────────────────────────────────────

export async function logActivity(
  action: string,
  entity_type: string,
  entity_id: string,
  details?: Record<string, unknown>,
  admin_id = 'admin',
): Promise<void> {
  await db().from('activity_logs').insert({ action, entity_type, entity_id, details, admin_id });
}

export async function getActivityLogs(entity_type?: string, entity_id?: string, limit = 50): Promise<ActivityLog[]> {
  let q = db().from('activity_logs').select('*').order('created_at', { ascending: false }).limit(limit);
  if (entity_type) q = q.eq('entity_type', entity_type);
  if (entity_id)   q = q.eq('entity_id', entity_id);
  const { data, error } = await q;
  if (error) return [];
  return (data ?? []) as ActivityLog[];
}

// ─── DASHBOARD STATS ──────────────────────────────────────────────────────────

export async function getDashboardStats(): Promise<DashboardStats> {
  const bookings = await getBookings();
  const now = new Date();
  const todayStr   = now.toISOString().split('T')[0];
  const weekAgoStr = new Date(now.getTime() - 7 * 86400000).toISOString().split('T')[0];
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];

  const today_bookings = bookings.filter(b => b.created_at.startsWith(todayStr)).length;
  const week_bookings  = bookings.filter(b => b.created_at.split('T')[0] >= weekAgoStr).length;
  const month_bookings = bookings.filter(b => b.created_at.split('T')[0] >= monthStart).length;

  const completed     = bookings.filter(b => b.booking_status === 'completed');
  const total_revenue = completed.reduce((s, b) => s + (b.final_price ?? b.price_estimate ?? 0), 0);
  const month_revenue = completed
    .filter(b => b.created_at.split('T')[0] >= monthStart)
    .reduce((s, b) => s + (b.final_price ?? b.price_estimate ?? 0), 0);

  // Peak hours
  const hourCounts: Record<number, number> = {};
  bookings.forEach(b => {
    const h = parseInt(b.pickup_time?.split(':')[0] ?? '0', 10);
    hourCounts[h] = (hourCounts[h] ?? 0) + 1;
  });
  const peak_hours = Object.entries(hourCounts)
    .map(([hour, count]) => ({ hour: parseInt(hour), count }))
    .sort((a, b) => a.hour - b.hour);

  // Revenue by service
  const serviceMap: Record<string, { revenue: number; count: number }> = {};
  bookings.forEach(b => {
    const st = b.service_type;
    if (!serviceMap[st]) serviceMap[st] = { revenue: 0, count: 0 };
    serviceMap[st].revenue += (b.final_price ?? b.price_estimate ?? 0);
    serviceMap[st].count++;
  });
  const revenue_by_service = Object.entries(serviceMap).map(([service_type, v]) => ({ service_type, ...v }));

  // Top routes
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
    pending_count:     bookings.filter(b => b.booking_status === 'pending').length,
    confirmed_count:   bookings.filter(b => b.booking_status === 'confirmed').length,
    completed_count:   completed.length,
    cancelled_count:   bookings.filter(b => b.booking_status === 'cancelled').length,
    in_progress_count: bookings.filter(b => b.booking_status === 'in_progress').length,
    top_routes,
    recent_bookings: bookings.slice(0, 10),
    peak_hours,
    revenue_by_service,
  };
}
