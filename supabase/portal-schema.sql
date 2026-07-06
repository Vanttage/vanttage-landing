-- ─────────────────────────────────────────────────────────────
-- Vanttage · Portal interno — esquema de CRM y cotizaciones
-- Pegar TODO esto en Supabase → SQL Editor → Run
-- ─────────────────────────────────────────────────────────────

-- CLIENTES (CRM)
create table if not exists public.clientes (
  id         uuid primary key default gen_random_uuid(),
  nombre     text not null,
  empresa    text,
  whatsapp   text,
  email      text,
  notas      text,
  origen     text default 'cotizador',
  created_at timestamptz default now()
);

-- Consecutivo para las cotizaciones
create sequence if not exists public.cotizacion_seq start 1;

-- COTIZACIONES (historial)
create table if not exists public.cotizaciones (
  id             uuid primary key default gen_random_uuid(),
  consecutivo    int  not null default nextval('public.cotizacion_seq'),
  numero         text,
  cliente_id     uuid references public.clientes(id) on delete set null,
  cliente_nombre text,
  proyecto       text,
  subtotal       bigint default 0,
  descuento      int    default 0,
  total          bigint default 0,
  estado         text   default 'enviada',
  datos          jsonb  not null,
  created_at     timestamptz default now()
);

-- Seguridad: RLS activo SIN políticas públicas.
-- El acceso es solo desde el servidor con la SECRET KEY (omite RLS).
-- Así nadie con la publishable/anon key puede leer ni escribir.
alter table public.clientes     enable row level security;
alter table public.cotizaciones enable row level security;

-- Índices útiles
create index if not exists cotizaciones_consecutivo_idx on public.cotizaciones (consecutivo desc);
create index if not exists cotizaciones_cliente_idx     on public.cotizaciones (cliente_id);
create index if not exists clientes_created_idx         on public.clientes (created_at desc);
