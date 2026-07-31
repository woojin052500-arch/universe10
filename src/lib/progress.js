'use client';

import { OBJECTS, LEVELS, objectsOfLevel } from '@/data/content';

const KEY = 'universe10.progress.v1';

/** 저장된 진도 읽기 → { completed: string[] } */
export function readProgress() {
  if (typeof window === 'undefined') return { completed: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { completed: [] };
    const parsed = JSON.parse(raw);
    return { completed: Array.isArray(parsed.completed) ? parsed.completed : [] };
  } catch {
    return { completed: [] };
  }
}

export function writeProgress(p) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

/** 천체 완료 처리 → 새 진도 반환 */
export function completeObject(id) {
  const p = readProgress();
  if (!p.completed.includes(id)) p.completed = [...p.completed, id];
  writeProgress(p);
  return p;
}

export function resetProgress() {
  if (typeof window !== 'undefined') localStorage.removeItem(KEY);
}

/** 레벨이 열렸는지 — 이전 레벨에서 unlockAt개 이상 완료해야 함 */
export function isLevelUnlocked(levelId, completed) {
  const lv = LEVELS.find((l) => l.id === levelId);
  if (!lv || lv.unlockAt === 0) return true;
  const prev = objectsOfLevel(levelId - 1);
  const done = prev.filter((o) => completed.includes(o.id)).length;
  return done >= lv.unlockAt;
}

/** 현재 도달한 최대 거리 라벨 = "나의 우주" */
export function currentScale(completed) {
  if (!completed.length) return '5 m';
  const done = OBJECTS.filter((o) => completed.includes(o.id));
  const far = done.reduce((a, b) => (b.ly > a.ly ? b : a), done[0]);
  return far.scaleLabel;
}

/** 레벨별 진행률 */
export function levelStats(levelId, completed) {
  const list = objectsOfLevel(levelId);
  const done = list.filter((o) => completed.includes(o.id)).length;
  return { done, total: list.length, ratio: list.length ? done / list.length : 0 };
}

/** 이 천체를 풀면 다음 레벨이 열리는가 (레벨업 연출 판단용) */
export function willUnlockNext(objId, completedBefore) {
  const obj = OBJECTS.find((o) => o.id === objId);
  if (!obj) return null;
  const next = obj.level + 1;
  if (!LEVELS.some((l) => l.id === next)) return null;
  const before = isLevelUnlocked(next, completedBefore);
  const after = isLevelUnlocked(next, [...completedBefore, objId]);
  return !before && after ? next : null;
}
