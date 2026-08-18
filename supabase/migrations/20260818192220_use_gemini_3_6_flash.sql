alter table public.company_settings
  alter column ai_model set default 'gemini-3.6-flash';

update public.company_settings
set ai_model = 'gemini-3.6-flash'
where id = 'default'
  and ai_model in ('gemini-2.5-flash', 'gemini-3-flash-preview', 'gemini-3.5-flash');
