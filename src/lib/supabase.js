'use client';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** 환경변수가 없으면 null → 앱은 localStorage 모드로 동작합니다. */
export const supabase = url && key ? createClient(url, key) : null;
export const isSupabaseReady = Boolean(supabase);

/*  Supabase SQL — 대시보드 SQL Editor 에 붙여넣으세요

    create table if not exists progress (
      user_id    uuid references auth.users on delete cascade,
      object_id  text not null,
      created_at timestamptz default now(),
      primary key (user_id, object_id)
    );
    alter table progress enable row level security;
    create policy "own rows" on progress
      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

    Authentication → Providers 에서 Google / Kakao 활성화,
    Redirect URL 에 https://<도메인>/auth/callback 추가.
*/
