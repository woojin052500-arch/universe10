// ─────────────────────────────────────────────
//  Supabase 연동 준비 파일 — MVP에서는 사용하지 않습니다.
//  진도는 localStorage(src/lib/progress.js)로 관리 중.
//
//  나중에 로그인 붙일 때:
//   1) npm i @supabase/supabase-js
//   2) .env.local 에 아래 두 값 넣기
//        NEXT_PUBLIC_SUPABASE_URL=...
//        NEXT_PUBLIC_SUPABASE_ANON_KEY=...
//   3) 아래 주석 해제
//
//  필요한 테이블 (SQL):
//   create table progress (
//     user_id    uuid references auth.users on delete cascade,
//     object_id  text not null,
//     created_at timestamptz default now(),
//     primary key (user_id, object_id)
//   );
//   alter table progress enable row level security;
//   create policy "own rows" on progress
//     for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
// ─────────────────────────────────────────────

// import { createClient } from '@supabase/supabase-js';
//
// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

export const supabase = null;
