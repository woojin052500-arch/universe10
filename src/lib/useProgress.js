'use client';
import { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseReady } from './supabase';
import { readLocal, writeLocal, clearLocal, fetchRemote, pushRemote, clearRemote } from './progress';

/**
 * 진도 + 세션을 한 곳에서 관리합니다.
 *
 *  비로그인 → localStorage
 *  로그인   → Supabase (로그인 순간 로컬 진도를 서버로 병합)
 *
 * Supabase 환경변수가 없으면 항상 localStorage 모드로 동작합니다.
 */
export default function useProgress() {
  // 서버·클라이언트 첫 렌더가 모두 [] → 하이드레이션 불일치 없이 화면이 바로 그려집니다.
  // 실제 진도는 마운트 직후 채워집니다.
  const [completed, setCompleted] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);

  // 초기 로드
  useEffect(() => {
    let alive = true;
    (async () => {
      const local = readLocal();
      if (!isSupabaseReady) { if (alive) { setCompleted(local); setLoaded(true); } return; }

      const { data } = await supabase.auth.getSession();
      const u = data?.session?.user ?? null;
      if (!alive) return;
      setUser(u);

      if (!u) { setCompleted(local); setLoaded(true); return; }
      const remote = await fetchRemote(u.id);
      const merged = Array.from(new Set([...(remote || []), ...local]));
      if (!alive) return;
      setCompleted(merged); setLoaded(true);
      // 로컬에만 있던 항목을 서버로 올림
      const missing = local.filter((id) => !(remote || []).includes(id));
      if (missing.length) pushRemote(u.id, missing);
    })();

    if (!isSupabaseReady) return () => { alive = false; };
    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        const local = readLocal();
        const remote = await fetchRemote(u.id);
        const merged = Array.from(new Set([...(remote || []), ...local]));
        setCompleted(merged);
        const missing = local.filter((id) => !(remote || []).includes(id));
        if (missing.length) pushRemote(u.id, missing);
      } else {
        setCompleted(readLocal());
      }
    });
    return () => { alive = false; sub?.subscription?.unsubscribe(); };
  }, []);

  const complete = useCallback((id) => {
    setCompleted((prev) => {
      const cur = prev || [];
      if (cur.includes(id)) return cur;
      const next = [...cur, id];
      writeLocal(next);
      if (user) pushRemote(user.id, [id]);
      return next;
    });
  }, [user]);

  const reset = useCallback(async () => {
    clearLocal();
    if (user) await clearRemote(user.id);
    setCompleted([]);
  }, [user]);

  const signIn = useCallback(async (provider) => {
    if (!isSupabaseReady) return { error: 'not-configured' };
    return supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: typeof window !== 'undefined' ? window.location.origin + '/universe' : undefined },
    });
  }, []);

  const signOut = useCallback(async () => {
    if (isSupabaseReady) await supabase.auth.signOut();
    setUser(null);
    setCompleted(readLocal());
  }, []);

  return { completed, user, complete, reset, signIn, signOut, loaded, ready: true, isSupabaseReady };
}
