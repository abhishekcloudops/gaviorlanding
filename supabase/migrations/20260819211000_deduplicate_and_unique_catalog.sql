-- 1. Remove any existing duplicates in catalog_items, keeping the newest entry per name
with ranked_items as (
  select
    id,
    row_number() over (
      partition by lower(trim(name))
      order by created_at desc, id desc
    ) as rank_num
  from public.catalog_items
)
delete from public.catalog_items
where id in (
  select id from ranked_items where rank_num > 1
);

-- 2. Create unique index to permanently prevent duplicates in catalog_items
create unique index if not exists catalog_items_name_unique_idx
  on public.catalog_items (lower(trim(name)));
