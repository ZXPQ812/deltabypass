-- Run this in Supabase → SQL Editor

create table if not exists public.users (
  id         uuid default gen_random_uuid() primary key,
  email      text unique not null,
  name       text,
  avatar     text,
  last_login timestamptz,
  created_at timestamptz default now()
);

-- Allow the service role full access (used server-side only)
alter table public.users enable row level security;

create policy "service role only"
  on public.users
  using (false);
