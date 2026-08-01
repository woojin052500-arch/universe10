'use client';

import { OBJECTS, LEVELS, objectsOfLevel } from '@/data/content';
import { supabase, isSupabaseReady } from './supabase';

const KEY = 'universe10.progress.v1';

/* ─────────── 로컬 (비로그인) ─────────── */
export function readLocal() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    const p = raw ? JSON.parse(raw) : null;
    return Array.isArray(p?.completed) ? p.completed : [];
  } catch { return []; }
}
export function writeLocal(completed) {
  if (typeof window !== 'undefined')
    localStorage.setItem(KEY, JSON.stringify({ completed }));
}
export function clearLocal() {
  if (typeof window !== 'undefined') localStorage.removeItem(KEY);
}

/* 하위호환 (기존 코드에서 쓰던 이름) */
export const readProgress  = () => ({ completed: readLocal() });
export const resetProgress = clearLocal;

/* ─────────── 서버 (로그인) ─────────── */
export async function fetchRemote(userId) {
  if (!isSupabaseReady || !userId) return null;
  const { data, error } = await supabase
    .from('progress').select('object_id').eq('user_id', userId);
  if (error) { console.warn('progress fetch failed', error.message); return null; }
  return data.map((r) => r.object_id);
}

export async function pushRemote(userId, ids) {
  if (!isSupabaseReady || !userId || !ids.length) return;
  const rows = ids.map((object_id) => ({ user_id: userId, object_id }));
  const { error } = await supabase.from('progress').upsert(rows, { onConflict: 'user_id,object_id' });
  if (error) console.warn('progress push failed', error.message);
}

export async function clearRemote(userId) {
  if (!isSupabaseReady || !userId) return;
  await supabase.from('progress').delete().eq('user_id', userId);
}

/* ─────────── 계산 로직 ─────────── */
export function isLevelUnlocked(levelId, completed) {
  const lv = LEVELS.find((l) => l.id === levelId);
  if (!lv || lv.unlockAt === 0) return true;
  const prev = objectsOfLevel(levelId - 1);
  return prev.filter((o) => completed.includes(o.id)).length >= lv.unlockAt;
}

export function currentScale(completed) {
  if (!completed?.length) return '5 m';
  const done = OBJECTS.filter((o) => completed.includes(o.id));
  if (!done.length) return '5 m';
  return done.reduce((a, b) => (b.ly > a.ly ? b : a), done[0]).scaleLabel;
}

export function levelStats(levelId, completed) {
  const list = objectsOfLevel(levelId);
  const done = list.filter((o) => completed.includes(o.id)).length;
  return { done, total: list.length, ratio: list.length ? done / list.length : 0 };
}

/** 이 천체를 풀면 새로 열리는 레벨 id (없으면 null) */
export function willUnlockNext(objId, before) {
  const obj = OBJECTS.find((o) => o.id === objId);
  if (!obj) return null;
  const next = obj.level + 1;
  if (!LEVELS.some((l) => l.id === next)) return null;
  return !isLevelUnlocked(next, before) && isLevelUnlocked(next, [...before, objId])
    ? next : null;
}
