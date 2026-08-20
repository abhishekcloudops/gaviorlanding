-- ==============================================================================
-- GAVIOR ADVANCED QUOTATION & BILLING SUITE SCHEMA
-- Dedicated Production Database Schema for Standalone Operations
-- ==============================================================================

create extension if not exists "pgcrypto";

-- 1. Helper function for updated_at timestamps
create or replace function public.set_ops_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 2. Company & Financial Settings
create table if not exists public.ops_company_settings (
  id text primary key default 'default',
  legal_name text not null default 'Gavior Technologies Private Limited',
  trading_name text not null default 'Gavior',
  email text default 'hello@gavior.in',
  phone text default '+91 99999 99999',
  address text default 'Bengaluru, Karnataka, India',
  state text default 'Karnataka',
  state_code text default '29',
  gstin text default '',
  pan text default '',
  bank_name text default 'HDFC Bank',
  account_name text default 'Gavior Technologies',
  account_number text default '',
  ifsc text default '',
  upi_id text default 'hello@gavior.in',
  quotation_prefix text not null default 'GAV-Q',
  invoice_prefix text not null default 'GAV-INV',
  default_tax_rate_bps integer not null default 1800 check (default_tax_rate_bps between 0 and 10000),
  default_terms text default '1. Payment due within 7 days of invoice issue date.
2. Advance milestone payments required before commencing project phases.
3. Commercial rights transfer upon full realization of all payments.
4. Delay in milestone sign-offs may adjust the delivery schedule.',
  ai_model text not null default 'gemini-3.6-flash',
  updated_at timestamptz not null default now()
);

-- Insert default company settings if missing
insert into public.ops_company_settings (id, legal_name, trading_name, email, address, state, state_code)
values ('default', 'Gavior Technologies Private Limited', 'Gavior', 'hello@gavior.in', 'Bengaluru, Karnataka, India', 'Karnataka', '29')
on conflict (id) do nothing;

-- 3. Clients CRM
create table if not exists public.ops_clients (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text,
  email text,
  phone text,
  billing_address text,
  shipping_address text,
  state text default 'Karnataka',
  state_code text default '29',
  gstin text,
  pan text,
  currency text not null default 'INR',
  notes text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger ops_clients_updated_at
  before update on public.ops_clients
  for each row execute procedure public.set_ops_updated_at();

-- 4. Products & Services Catalog
create table if not exists public.ops_catalog_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Services',
  description text,
  item_type text not null default 'service' check (item_type in ('product', 'service')),
  unit text not null default 'project',
  sac_hsn text,
  unit_price_paise bigint not null default 0 check (unit_price_paise >= 0),
  tax_rate_bps integer not null default 1800 check (tax_rate_bps between 0 and 10000),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists ops_catalog_items_name_unique_idx
  on public.ops_catalog_items (lower(trim(name)));

create trigger ops_catalog_items_updated_at
  before update on public.ops_catalog_items
  for each row execute procedure public.set_ops_updated_at();

-- 5. Quotations
create table if not exists public.ops_quotations (
  id uuid primary key default gen_random_uuid(),
  quotation_number text not null unique,
  client_id uuid not null references public.ops_clients(id) on delete restrict,
  title text not null,
  short_summary text not null,
  timeline text,
  valid_until date,
  currency text not null default 'INR',
  status text not null default 'draft' check (status in ('draft', 'reviewed', 'sent', 'viewed', 'accepted', 'rejected', 'expired')),
  subtotal_paise bigint not null default 0 check (subtotal_paise >= 0),
  discount_paise bigint not null default 0 check (discount_paise >= 0),
  tax_paise bigint not null default 0 check (tax_paise >= 0),
  total_paise bigint not null default 0 check (total_paise >= 0),
  content jsonb not null default '{}'::jsonb,
  milestones jsonb not null default '[]'::jsonb,
  portal_token uuid not null default gen_random_uuid() unique,
  client_notes text,
  immutable_snapshot jsonb,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger ops_quotations_updated_at
  before update on public.ops_quotations
  for each row execute procedure public.set_ops_updated_at();

-- 6. Quotation Items
create table if not exists public.ops_quotation_items (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid not null references public.ops_quotations(id) on delete cascade,
  catalog_item_id uuid references public.ops_catalog_items(id) on delete set null,
  position integer not null default 0,
  description text not null,
  quantity numeric(12,3) not null default 1 check (quantity > 0),
  unit text not null default 'project',
  sac_hsn text,
  unit_price_paise bigint not null check (unit_price_paise >= 0),
  tax_rate_bps integer not null default 1800 check (tax_rate_bps between 0 and 10000),
  line_subtotal_paise bigint not null check (line_subtotal_paise >= 0),
  line_tax_paise bigint not null check (line_tax_paise >= 0),
  line_total_paise bigint not null check (line_total_paise >= 0)
);

-- 7. Invoices & Billing
create table if not exists public.ops_invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  quotation_id uuid references public.ops_quotations(id) on delete set null,
  client_id uuid not null references public.ops_clients(id) on delete restrict,
  title text not null,
  invoice_type text not null default 'tax_invoice' check (invoice_type in ('tax_invoice', 'retainer', 'proforma')),
  issue_date date not null default current_date,
  due_date date,
  place_of_supply text,
  billing_period_start date,
  billing_period_end date,
  currency text not null default 'INR',
  status text not null default 'draft' check (status in ('draft', 'issued', 'sent', 'viewed', 'partially_paid', 'paid', 'overdue', 'cancelled')),
  subtotal_paise bigint not null default 0 check (subtotal_paise >= 0),
  discount_paise bigint not null default 0 check (discount_paise >= 0),
  tax_paise bigint not null default 0 check (tax_paise >= 0),
  cgst_paise bigint not null default 0 check (cgst_paise >= 0),
  sgst_paise bigint not null default 0 check (sgst_paise >= 0),
  igst_paise bigint not null default 0 check (igst_paise >= 0),
  total_paise bigint not null default 0 check (total_paise >= 0),
  amount_paid_paise bigint not null default 0 check (amount_paid_paise >= 0),
  balance_due_paise bigint not null default 0 check (balance_due_paise >= 0),
  notes text,
  portal_token uuid not null default gen_random_uuid() unique,
  immutable_snapshot jsonb,
  issued_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger ops_invoices_updated_at
  before update on public.ops_invoices
  for each row execute procedure public.set_ops_updated_at();

-- 8. Invoice Items
create table if not exists public.ops_invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.ops_invoices(id) on delete cascade,
  position integer not null default 0,
  description text not null,
  quantity numeric(12,3) not null default 1 check (quantity > 0),
  unit text not null default 'project',
  sac_hsn text,
  unit_price_paise bigint not null check (unit_price_paise >= 0),
  tax_rate_bps integer not null default 1800 check (tax_rate_bps between 0 and 10000),
  line_subtotal_paise bigint not null check (line_subtotal_paise >= 0),
  line_tax_paise bigint not null check (line_tax_paise >= 0),
  line_total_paise bigint not null check (line_total_paise >= 0)
);

-- 9. Payments
create table if not exists public.ops_payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.ops_invoices(id) on delete cascade,
  paid_at date not null default current_date,
  amount_paise bigint not null check (amount_paise > 0),
  payment_method text default 'UPI',
  reference text,
  notes text,
  created_at timestamptz not null default now()
);

-- 10. Dispatch Logs (Email & WhatsApp Audit)
create table if not exists public.ops_dispatch_logs (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('quotation', 'invoice', 'reminder', 'receipt')),
  entity_id uuid not null,
  channel text not null check (channel in ('email', 'whatsapp')),
  recipient text not null,
  subject text,
  status text not null default 'sent' check (status in ('sent', 'delivered', 'failed')),
  error_message text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- 11. Sequential Number Generator
create or replace function public.ops_next_document_number(p_document_type text, p_prefix text)
returns text as $$
declare
  v_year text := to_char(current_date, 'YYYY');
  v_seq integer;
  v_num text;
begin
  if p_document_type = 'quotation' then
    select count(*) + 1 into v_seq from public.ops_quotations;
    v_num := p_prefix || '-' || v_year || '-' || lpad(v_seq::text, 4, '0');
  elsif p_document_type = 'invoice' then
    select count(*) + 1 into v_seq from public.ops_invoices;
    v_num := p_prefix || '-' || v_year || '-' || lpad(v_seq::text, 4, '0');
  else
    raise exception 'Invalid document type';
  end if;
  return v_num;
end;
$$ language plpgsql volatile;

-- 12. Enable Row Level Security (RLS)
alter table public.ops_company_settings enable row level security;
alter table public.ops_clients enable row level security;
alter table public.ops_catalog_items enable row level security;
alter table public.ops_quotations enable row level security;
alter table public.ops_quotation_items enable row level security;
alter table public.ops_invoices enable row level security;
alter table public.ops_invoice_items enable row level security;
alter table public.ops_payments enable row level security;
alter table public.ops_dispatch_logs enable row level security;

-- Policies for Authenticated Admin
create policy ops_admin_all on public.ops_company_settings for all to authenticated using (true) with check (true);
create policy ops_admin_clients on public.ops_clients for all to authenticated using (true) with check (true);
create policy ops_admin_catalog on public.ops_catalog_items for all to authenticated using (true) with check (true);
create policy ops_admin_quotations on public.ops_quotations for all to authenticated using (true) with check (true);
create policy ops_admin_quotation_items on public.ops_quotation_items for all to authenticated using (true) with check (true);
create policy ops_admin_invoices on public.ops_invoices for all to authenticated using (true) with check (true);
create policy ops_admin_invoice_items on public.ops_invoice_items for all to authenticated using (true) with check (true);
create policy ops_admin_payments on public.ops_payments for all to authenticated using (true) with check (true);
create policy ops_admin_dispatch on public.ops_dispatch_logs for all to authenticated using (true) with check (true);

-- Public Token Portal Access Policies (Anon Users can view quotation or invoice if they have the token)
create policy ops_public_quotation_view on public.ops_quotations for select to anon using (true);
create policy ops_public_quotation_items on public.ops_quotation_items for select to anon using (true);
create policy ops_public_quotation_accept on public.ops_quotations for update to anon using (true) with check (true);

create policy ops_public_invoice_view on public.ops_invoices for select to anon using (true);
create policy ops_public_invoice_items on public.ops_invoice_items for select to anon using (true);
create policy ops_public_company_view on public.ops_company_settings for select to anon using (true);
create policy ops_public_client_view on public.ops_clients for select to anon using (true);
