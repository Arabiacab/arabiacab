export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentMethod = 'cash' | 'online';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';
export type ServiceType = 'standard' | 'airport' | 'tour' | 'rental';
export type NotificationType = 'new_booking' | 'status_change' | 'payment';

export interface Booking {
  id: string;
  booking_ref: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  pickup_time: string;
  service_type: ServiceType;
  passengers: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  booking_status: BookingStatus;
  price_estimate?: number;
  final_price?: number;
  notes?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  total_bookings: number;
  total_spent: number;
  is_vip: boolean;
  created_at: string;
}

export interface PricingRule {
  id: string;
  service_type: string;
  base_price: number;
  price_per_km?: number;
  minimum_price?: number;
  is_active: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  booking_id?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface DashboardStats {
  today_bookings: number;
  week_bookings: number;
  month_bookings: number;
  total_revenue: number;
  month_revenue: number;
  pending_count: number;
  confirmed_count: number;
  completed_count: number;
  cancelled_count: number;
  top_routes: { pickup: string; dropoff: string; count: number }[];
  recent_bookings: Booking[];
}

export interface BookingFilters {
  status?: BookingStatus;
  date_from?: string;
  date_to?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
