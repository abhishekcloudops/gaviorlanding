-- Gavior admin, quotation and invoice system.
-- Run this migration in the Supabase SQL editor before enabling /admin.

create extension if not exists pgcrypto;

create type public.admin_role as enum ('pending', 'admin');
create type public.quotation_status as enum ('draft', 'generated', 'reviewed', 'sent', 'accepted', 'rejected', 'expired');
create type public.invoice_status as enum ('draft', 'issued', 'sent', 'partially_paid', 'paid', 'overdue', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role public.admin_role not null default 'pending',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, coalesce(new.email, ''), new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and active = true
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create table public.company_settings (
  id text primary key default 'default' check (id = 'default'),
  legal_name text not null default 'Gavior',
  trading_name text not null default 'Gavior',
  email text,
  phone text,
  address text,
  state text,
  state_code text,
  gstin text,
  pan text,
  bank_name text,
  account_name text,
  account_number text,
  ifsc text,
  upi_id text,
  default_terms text,
  ai_model text not null default 'gemini-2.5-flash',
  quotation_prefix text not null default 'GAV-Q',
  invoice_prefix text not null default 'GAV-I',
  default_tax_rate_bps integer not null default 1800 check (default_tax_rate_bps between 0 and 10000),
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.company_settings (id) values ('default') on conflict do nothing;

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text,
  email text,
  phone text,
  billing_address text,
  state text,
  state_code text,
  gstin text,
  notes text,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.catalog_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  item_type text not null default 'service' check (item_type in ('product', 'service')),
  unit text not null default 'project',
  sac_hsn text,
  unit_price_paise bigint not null default 0 check (unit_price_paise >= 0),
  tax_rate_bps integer not null default 1800 check (tax_rate_bps between 0 and 10000),
  active boolean not null default true,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.quotations (
  id uuid primary key default gen_random_uuid(),
  quotation_number text not null unique,
  client_id uuid not null references public.clients(id) on delete restrict,
  title text not null,
  short_summary text not null,
  timeline text,
  valid_until date,
  status public.quotation_status not null default 'draft',
  currency char(3) not null default 'INR' check (currency = 'INR'),
  discount_paise bigint not null default 0 check (discount_paise >= 0),
  subtotal_paise bigint not null default 0 check (subtotal_paise >= 0),
  tax_paise bigint not null default 0 check (tax_paise >= 0),
  total_paise bigint not null default 0 check (total_paise >= 0),
  content jsonb not null default '{}'::jsonb,
  ai_model text,
  prompt_version text,
  immutable_snapshot jsonb,
  finalized_at timestamptz,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.quotation_items (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid not null references public.quotations(id) on delete cascade,
  catalog_item_id uuid references public.catalog_items(id) on delete set null,
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

create table public.quotation_versions (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid not null references public.quotations(id) on delete cascade,
  version integer not null,
  reason text not null,
  snapshot jsonb not null,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  unique (quotation_id, version)
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  quotation_id uuid references public.quotations(id) on delete set null,
  client_id uuid not null references public.clients(id) on delete restrict,
  title text not null,
  issue_date date not null default current_date,
  due_date date,
  place_of_supply text,
  status public.invoice_status not null default 'draft',
  currency char(3) not null default 'INR' check (currency = 'INR'),
  discount_paise bigint not null default 0 check (discount_paise >= 0),
  subtotal_paise bigint not null default 0 check (subtotal_paise >= 0),
  tax_paise bigint not null default 0 check (tax_paise >= 0),
  total_paise bigint not null default 0 check (total_paise >= 0),
  amount_paid_paise bigint not null default 0 check (amount_paid_paise >= 0),
  notes text,
  immutable_snapshot jsonb,
  issued_at timestamptz,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (amount_paid_paise <= total_paise)
);

create table public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
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

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete restrict,
  amount_paise bigint not null check (amount_paise > 0),
  paid_at date not null default current_date,
  method text,
  reference text,
  notes text,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.encrypted_secrets (
  key_name text primary key,
  ciphertext text not null,
  iv text not null,
  auth_tag text not null,
  key_version integer not null default 1,
  last_four text not null,
  updated_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.document_counters (
  document_type text not null check (document_type in ('quotation', 'invoice')),
  financial_year text not null,
  last_value integer not null default 0,
  primary key (document_type, financial_year)
);

create table public.ai_generation_events (
  id bigint generated always as identity primary key,
  actor_id uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create or replace function public.next_document_number(p_document_type text, p_prefix text)
returns text
language plpgsql
security definer set search_path = ''
as $$
declare
  fy text;
  next_value integer;
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  if p_document_type not in ('quotation', 'invoice') or p_prefix !~ '^[A-Z0-9-]{1,16}$' then
    raise exception 'Invalid document numbering request';
  end if;
  fy := case
    when extract(month from current_date) >= 4
      then to_char(current_date, 'YYYY') || '-' || to_char(current_date + interval '1 year', 'YY')
    else to_char(current_date - interval '1 year', 'YYYY') || '-' || to_char(current_date, 'YY')
  end;
  insert into public.document_counters (document_type, financial_year, last_value)
  values (p_document_type, fy, 1)
  on conflict (document_type, financial_year)
  do update set last_value = public.document_counters.last_value + 1
  returning last_value into next_value;
  return p_prefix || '-' || fy || '-' || lpad(next_value::text, 4, '0');
end;
$$;

revoke all on function public.next_document_number(text, text) from public;
grant execute on function public.next_document_number(text, text) to authenticated;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger company_settings_updated_at before update on public.company_settings for each row execute procedure public.set_updated_at();
create trigger clients_updated_at before update on public.clients for each row execute procedure public.set_updated_at();
create trigger catalog_items_updated_at before update on public.catalog_items for each row execute procedure public.set_updated_at();
create trigger quotations_updated_at before update on public.quotations for each row execute procedure public.set_updated_at();
create trigger invoices_updated_at before update on public.invoices for each row execute procedure public.set_updated_at();
create trigger encrypted_secrets_updated_at before update on public.encrypted_secrets for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.company_settings enable row level security;
alter table public.clients enable row level security;
alter table public.catalog_items enable row level security;
alter table public.quotations enable row level security;
alter table public.quotation_items enable row level security;
alter table public.quotation_versions enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.payments enable row level security;
alter table public.encrypted_secrets enable row level security;
alter table public.audit_logs enable row level security;
alter table public.document_counters enable row level security;
alter table public.ai_generation_events enable row level security;

-- New Supabase projects do not automatically expose new public tables to the
-- Data API. Grant only the operations used by authenticated administrators;
-- RLS policies below still decide which rows are accessible.
grant usage on schema public to authenticated;
revoke all on table
  public.profiles,
  public.company_settings,
  public.clients,
  public.catalog_items,
  public.quotations,
  public.quotation_items,
  public.quotation_versions,
  public.invoices,
  public.invoice_items,
  public.payments,
  public.encrypted_secrets,
  public.audit_logs,
  public.document_counters,
  public.ai_generation_events
from anon, authenticated;

grant select, update on public.profiles, public.company_settings to authenticated;
grant select, insert, update, delete on
  public.clients,
  public.catalog_items,
  public.quotations,
  public.quotation_items,
  public.invoices,
  public.invoice_items,
  public.encrypted_secrets
to authenticated;
grant select, insert on public.quotation_versions, public.audit_logs to authenticated;
grant select on public.payments, public.document_counters to authenticated;
grant usage, select on sequence public.audit_logs_id_seq to authenticated;

create policy admin_profiles on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy admin_company_settings on public.company_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy admin_clients on public.clients for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy admin_catalog_items on public.catalog_items for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy admin_quotations on public.quotations for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy admin_quotation_items on public.quotation_items for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy admin_quotation_versions_select on public.quotation_versions for select to authenticated using (public.is_admin());
create policy admin_quotation_versions_insert on public.quotation_versions for insert to authenticated with check (public.is_admin() and created_by = auth.uid());
create policy admin_invoices on public.invoices for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy admin_invoice_items on public.invoice_items for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy admin_payments_select on public.payments for select to authenticated using (public.is_admin());
create policy admin_encrypted_secrets on public.encrypted_secrets for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy admin_audit_logs_select on public.audit_logs for select to authenticated using (public.is_admin());
create policy admin_audit_logs_insert on public.audit_logs for insert to authenticated with check (public.is_admin() and actor_id = auth.uid());
create policy admin_document_counters on public.document_counters for select to authenticated using (public.is_admin());

create or replace function public.consume_ai_generation_quota()
returns void
language plpgsql
security definer set search_path = ''
as $$
declare recent_count integer; daily_count integer;
begin
  if not public.is_admin() then raise exception 'Not authorized'; end if;
  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text, 0));
  select count(*) into recent_count from public.ai_generation_events
    where actor_id = auth.uid() and created_at > now() - interval '10 minutes';
  select count(*) into daily_count from public.ai_generation_events
    where actor_id = auth.uid() and created_at > now() - interval '24 hours';
  if recent_count >= 10 or daily_count >= 50 then raise exception 'AI generation rate limit exceeded'; end if;
  insert into public.ai_generation_events (actor_id) values (auth.uid());
end;
$$;

revoke all on function public.consume_ai_generation_quota() from public;
grant execute on function public.consume_ai_generation_quota() to authenticated;

create or replace function public.protect_quotation_state()
returns trigger language plpgsql set search_path = public as $$
begin
  if old.status in ('accepted', 'rejected', 'expired') then
    raise exception 'Finalized quotation cannot be changed';
  end if;
  if old.status = 'sent' and new.status not in ('accepted', 'rejected', 'expired') then
    raise exception 'Invalid quotation transition';
  end if;
  if old.status = 'reviewed' and new.status not in ('reviewed', 'sent', 'accepted', 'rejected', 'expired') then
    raise exception 'Invalid quotation transition';
  end if;
  if old.status = 'sent' and (
    new.client_id is distinct from old.client_id or new.title is distinct from old.title or
    new.short_summary is distinct from old.short_summary or new.content is distinct from old.content or
    new.subtotal_paise is distinct from old.subtotal_paise or new.tax_paise is distinct from old.tax_paise or
    new.total_paise is distinct from old.total_paise
  ) then raise exception 'Sent quotation content is locked'; end if;
  return new;
end;
$$;

create trigger protect_quotation_before_update before update on public.quotations
for each row execute procedure public.protect_quotation_state();

create or replace function public.prevent_final_document_delete()
returns trigger language plpgsql set search_path = public as $$
begin
  if tg_table_name = 'quotations' and old.status::text <> 'draft' then
    raise exception 'Only draft quotations can be deleted';
  end if;
  if tg_table_name = 'invoices' and old.status::text <> 'draft' then
    raise exception 'Only draft invoices can be deleted';
  end if;
  return old;
end;
$$;

create trigger protect_quotation_before_delete before delete on public.quotations
for each row execute procedure public.prevent_final_document_delete();

create or replace function public.protect_quotation_items()
returns trigger language plpgsql set search_path = public as $$
declare parent_status public.quotation_status;
begin
  select status into parent_status from public.quotations where id = coalesce(new.quotation_id, old.quotation_id);
  if parent_status in ('sent', 'accepted', 'rejected', 'expired') then raise exception 'Quotation items are locked'; end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

create trigger protect_quotation_items_write before insert or update or delete on public.quotation_items
for each row execute procedure public.protect_quotation_items();

create or replace function public.protect_issued_invoice()
returns trigger language plpgsql set search_path = public as $$
begin
  if old.status <> 'draft' and (
    new.invoice_number is distinct from old.invoice_number or new.client_id is distinct from old.client_id or
    new.title is distinct from old.title or new.issue_date is distinct from old.issue_date or
    new.due_date is distinct from old.due_date or new.place_of_supply is distinct from old.place_of_supply or
    new.discount_paise is distinct from old.discount_paise or new.subtotal_paise is distinct from old.subtotal_paise or
    new.tax_paise is distinct from old.tax_paise or new.total_paise is distinct from old.total_paise or
    new.immutable_snapshot is distinct from old.immutable_snapshot
  ) then raise exception 'Issued invoice financial data is immutable'; end if;
  if old.status = 'cancelled' then raise exception 'Cancelled invoice cannot be changed'; end if;
  return new;
end;
$$;

create trigger protect_invoice_before_update before update on public.invoices
for each row execute procedure public.protect_issued_invoice();

create trigger protect_invoice_before_delete before delete on public.invoices
for each row execute procedure public.prevent_final_document_delete();

create or replace function public.protect_invoice_items()
returns trigger language plpgsql set search_path = public as $$
declare parent_status public.invoice_status;
begin
  select status into parent_status from public.invoices where id = coalesce(new.invoice_id, old.invoice_id);
  if parent_status <> 'draft' then raise exception 'Issued invoice items are immutable'; end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

create trigger protect_invoice_items_write before insert or update or delete on public.invoice_items
for each row execute procedure public.protect_invoice_items();

create or replace function public.record_invoice_payment(
  p_invoice_id uuid, p_amount_paise bigint, p_paid_at date, p_method text, p_reference text
)
returns void
language plpgsql
security definer set search_path = ''
as $$
declare current_invoice public.invoices%rowtype; next_paid bigint;
begin
  if not public.is_admin() then raise exception 'Not authorized'; end if;
  if p_amount_paise <= 0 then raise exception 'Invalid payment amount'; end if;
  select * into current_invoice from public.invoices where id = p_invoice_id for update;
  if not found or current_invoice.status not in ('issued', 'sent', 'partially_paid', 'overdue') then
    raise exception 'Invoice cannot receive payment';
  end if;
  next_paid := current_invoice.amount_paid_paise + p_amount_paise;
  if next_paid > current_invoice.total_paise then raise exception 'Payment exceeds balance'; end if;
  insert into public.payments (invoice_id, amount_paise, paid_at, method, reference, created_by)
  values (p_invoice_id, p_amount_paise, p_paid_at, nullif(trim(p_method), ''), nullif(trim(p_reference), ''), auth.uid());
  update public.invoices set amount_paid_paise = next_paid,
    status = case when next_paid = total_paise then 'paid'::public.invoice_status else 'partially_paid'::public.invoice_status end
  where id = p_invoice_id;
end;
$$;

revoke all on function public.record_invoice_payment(uuid, bigint, date, text, text) from public;
grant execute on function public.record_invoice_payment(uuid, bigint, date, text, text) to authenticated;

create index clients_company_name_idx on public.clients using btree (lower(company_name));
create index company_settings_updated_by_idx on public.company_settings(updated_by);
create index clients_created_by_idx on public.clients(created_by);
create index catalog_items_created_by_idx on public.catalog_items(created_by);
create index quotations_client_id_idx on public.quotations(client_id);
create index quotations_created_by_idx on public.quotations(created_by);
create index quotations_status_created_idx on public.quotations(status, created_at desc);
create index quotation_items_quotation_id_idx on public.quotation_items(quotation_id);
create index quotation_items_catalog_item_id_idx on public.quotation_items(catalog_item_id);
create index quotation_versions_created_by_idx on public.quotation_versions(created_by);
create index invoices_client_id_idx on public.invoices(client_id);
create index invoices_created_by_idx on public.invoices(created_by);
create unique index invoices_one_per_quotation_idx on public.invoices(quotation_id) where quotation_id is not null;
create index invoices_status_created_idx on public.invoices(status, created_at desc);
create index invoice_items_invoice_id_idx on public.invoice_items(invoice_id);
create index payments_invoice_id_idx on public.payments(invoice_id);
create index payments_created_by_idx on public.payments(created_by);
create index encrypted_secrets_updated_by_idx on public.encrypted_secrets(updated_by);
create index audit_logs_actor_id_idx on public.audit_logs(actor_id);
create index audit_logs_created_idx on public.audit_logs(created_at desc);
create index ai_generation_events_actor_created_idx on public.ai_generation_events(actor_id, created_at desc);

-- Bootstrap only: after creating the first user in Supabase Auth, promote it once.
-- update public.profiles set role = 'admin' where email = 'YOUR_ADMIN_EMAIL';
