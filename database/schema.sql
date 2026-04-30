-- ArabiaCab Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────
-- TABLE: bookings
-- ─────────────────────────────────────────
create table if not exists bookings (
  id                uuid primary key default gen_random_uuid(),
  booking_ref       text unique not null,
  customer_name     text not null,
  customer_phone    text not null,
  customer_email    text,
  pickup_location   text not null,
  dropoff_location  text not null,
  pickup_date       date not null,
  pickup_time       time not null,
  service_type      text check (service_type in ('standard','airport','tour','rental')),
  passengers        integer default 1,
  payment_method    text check (payment_method in ('cash','online')),
  payment_status    text default 'pending' check (payment_status in ('pending','paid','refunded')),
  booking_status    text default 'pending' check (booking_status in ('pending','confirmed','in_progress','completed','cancelled')),
  price_estimate    decimal(10,2),
  final_price       decimal(10,2),
  notes             text,
  admin_notes       text,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- ─────────────────────────────────────────
-- TABLE: customers
-- ─────────────────────────────────────────
create table if not exists customers (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  phone           text unique not null,
  email           text unique,
  total_bookings  integer default 0,
  total_spent     decimal(10,2) default 0,
  is_vip          boolean default false,
  created_at      timestamptz default now()
);

-- ─────────────────────────────────────────
-- TABLE: admin_users
-- ─────────────────────────────────────────
create table if not exists admin_users (
  id          uuid primary key,
  email       text unique not null,
  name        text,
  role        text default 'admin',
  created_at  timestamptz default now()
);

-- ─────────────────────────────────────────
-- TABLE: pricing_rules
-- ─────────────────────────────────────────
create table if not exists pricing_rules (
  id             uuid primary key default gen_random_uuid(),
  service_type   text not null,
  base_price     decimal(10,2) not null,
  price_per_km   decimal(10,2),
  minimum_price  decimal(10,2),
  is_active      boolean default true,
  created_at     timestamptz default now()
);

-- ─────────────────────────────────────────
-- TABLE: notifications
-- ─────────────────────────────────────────
create table if not exists notifications (
  id          uuid primary key default gen_random_uuid(),
  type        text check (type in ('new_booking','status_change','payment')),
  booking_id  uuid references bookings(id) on delete cascade,
  message     text,
  is_read     boolean default false,
  created_at  timestamptz default now()
);

-- ─────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────
create index if not exists idx_bookings_status     on bookings(booking_status);
create index if not exists idx_bookings_created_at on bookings(created_at desc);
create index if not exists idx_bookings_phone      on bookings(customer_phone);
create index if not exists idx_customers_phone     on customers(phone);
create index if not exists idx_customers_email     on customers(email);

-- ─────────────────────────────────────────
-- TRIGGER: auto-update updated_at on bookings
-- ─────────────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists bookings_updated_at on bookings;
create trigger bookings_updated_at
  before update on bookings
  for each row execute function update_updated_at();

-- ─────────────────────────────────────────
-- SEED: default pricing rules
-- ─────────────────────────────────────────
insert into pricing_rules (service_type, base_price, price_per_km, minimum_price) values
  ('standard', 30.00,  1.50, 30.00),
  ('airport',  80.00,  2.00, 80.00),
  ('tour',    200.00,  0.00, 200.00),
  ('rental',  400.00,  0.00, 400.00)
on conflict do nothing;

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY (enable when ready)
-- ─────────────────────────────────────────
-- alter table bookings enable row level security;
-- alter table customers enable row level security;
-- alter table admin_users enable row level security;
-- alter table pricing_rules enable row level security;
-- alter table notifications enable row level security;
