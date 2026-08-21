-- =========================================================
-- Veltapedia — Phase 3: Database Schema
-- Jalankan SEKALI lewat Supabase Dashboard → SQL Editor → New query → Run
-- Aman dijalankan ulang untuk tabel (pakai "if not exists"),
-- tapi policy/trigger di-drop dulu sebelum dibuat ulang supaya idempotent.
-- =========================================================

create extension if not exists pgcrypto;

-- =========================================================
-- 1. TABEL
-- =========================================================

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  name text not null,
  slug text not null unique,
  sku text not null unique,
  supplier_sku text,
  description text,
  price numeric(12,2) not null check (price >= 0),
  image_url text,
  is_active boolean not null default true,
  is_popular boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  order_number text not null unique,
  total_amount numeric(12,2) not null check (total_amount >= 0),
  payment_status text not null default 'PENDING'
    check (payment_status in ('PENDING','PAID','FAILED','EXPIRED')),
  fulfillment_status text not null default 'PENDING'
    check (fulfillment_status in ('PENDING','PROCESSING','SUCCESS','FAILED')),
  payment_method text,
  midtrans_transaction_id text,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null default 1 check (quantity > 0),
  price numeric(12,2) not null check (price >= 0),
  target_data jsonb not null default '{}'::jsonb,
  supplier_order_id text,
  supplier_status text,
  supplier_response jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'midtrans',
  provider_transaction_id text,
  amount numeric(12,2) not null check (amount >= 0),
  status text not null default 'PENDING',
  payment_type text,
  raw_notification jsonb,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- 2. INDEX
-- =========================================================

create index if not exists idx_products_category_id on public.products(category_id);
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_status on public.orders(payment_status, fulfillment_status);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_order_items_product_id on public.order_items(product_id);
create index if not exists idx_payments_order_id on public.payments(order_id);

-- =========================================================
-- 3. FUNCTIONS
-- =========================================================

-- auto-update kolom updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- auto-buat baris profiles begitu ada user baru daftar (Supabase Auth)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

-- helper cek role admin (security definer supaya tidak recursive dengan RLS profiles)
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

-- =========================================================
-- 4. TRIGGERS
-- =========================================================

drop trigger if exists set_updated_at on public.profiles;
create trigger set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.categories;
create trigger set_updated_at before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.products;
create trigger set_updated_at before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.orders;
create trigger set_updated_at before update on public.orders
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.payments;
create trigger set_updated_at before update on public.payments
for each row execute function public.set_updated_at();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- =========================================================
-- 5. ROW LEVEL SECURITY
-- =========================================================

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;

-- profiles: user lihat/edit profil sendiri, admin lihat semua
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- categories: publik hanya lihat yang aktif, admin full akses
drop policy if exists "categories_select_public" on public.categories;
create policy "categories_select_public" on public.categories
for select using (is_active = true or public.is_admin());

drop policy if exists "categories_admin_insert" on public.categories;
create policy "categories_admin_insert" on public.categories
for insert with check (public.is_admin());

drop policy if exists "categories_admin_update" on public.categories;
create policy "categories_admin_update" on public.categories
for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "categories_admin_delete" on public.categories;
create policy "categories_admin_delete" on public.categories
for delete using (public.is_admin());

-- products: publik hanya lihat yang aktif, admin full akses
drop policy if exists "products_select_public" on public.products;
create policy "products_select_public" on public.products
for select using (is_active = true or public.is_admin());

drop policy if exists "products_admin_insert" on public.products;
create policy "products_admin_insert" on public.products
for insert with check (public.is_admin());

drop policy if exists "products_admin_update" on public.products;
create policy "products_admin_update" on public.products
for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "products_admin_delete" on public.products;
create policy "products_admin_delete" on public.products
for delete using (public.is_admin());

-- orders: user hanya lihat/buat order miliknya sendiri, admin lihat & update semua
-- (update payment_status/fulfillment_status dari user TIDAK diizinkan — itu wajib
-- lewat webhook server-side pakai service_role key, bukan dari browser)
drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own" on public.orders
for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "orders_insert_own" on public.orders;
create policy "orders_insert_own" on public.orders
for insert with check (auth.uid() = user_id);

drop policy if exists "orders_admin_update" on public.orders;
create policy "orders_admin_update" on public.orders
for update using (public.is_admin()) with check (public.is_admin());

-- order_items: ikut kepemilikan order induknya
drop policy if exists "order_items_select_own" on public.order_items;
create policy "order_items_select_own" on public.order_items
for select using (
  exists (
    select 1 from public.orders o
    where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())
  )
);

drop policy if exists "order_items_insert_own" on public.order_items;
create policy "order_items_insert_own" on public.order_items
for insert with check (
  exists (
    select 1 from public.orders o
    where o.id = order_id and o.user_id = auth.uid()
  )
);

-- payments: user hanya baca (lewat kepemilikan order), tulis cuma server-side (service_role)
drop policy if exists "payments_select_own" on public.payments;
create policy "payments_select_own" on public.payments
for select using (
  exists (
    select 1 from public.orders o
    where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())
  )
);

-- =========================================================
-- 6. SEED DATA (kategori + produk MVP)
-- =========================================================

insert into public.categories (name, slug, sort_order)
values
  ('Mobile Legends', 'mobile-legends', 1),
  ('Free Fire', 'free-fire', 2),
  ('Roblox', 'roblox', 3),
  ('Genshin Impact', 'genshin-impact', 4)
on conflict (slug) do nothing;

insert into public.products (category_id, name, slug, sku, price, is_popular)
select c.id, v.name, v.slug, v.sku, v.price, v.is_popular
from (
  values
    ('mobile-legends', '86 Diamonds', '86-diamonds', 'ML-86', 21000, true),
    ('mobile-legends', '172 Diamonds', '172-diamonds', 'ML-172', 41000, false),
    ('free-fire', '70 Diamonds', '70-diamonds', 'FF-70', 10000, true),
    ('free-fire', '140 Diamonds', '140-diamonds', 'FF-140', 20000, false),
    ('roblox', '400 Robux', '400-robux', 'RB-400', 76000, true),
    ('roblox', '800 Robux', '800-robux', 'RB-800', 150000, false),
    ('genshin-impact', '60 Genesis Crystal', '60-genesis-crystal', 'GI-60', 16000, false),
    ('genshin-impact', '300+30 Genesis Crystal', '300-30-genesis-crystal', 'GI-300', 79000, true)
) as v(category_slug, name, slug, sku, price, is_popular)
join public.categories c on c.slug = v.category_slug
on conflict (slug) do nothing;
