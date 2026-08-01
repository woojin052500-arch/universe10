// ─────────────────────────────────────────────
//  월드 좌표계
//
//  각도 θ = 적경(RA)          → 같은 방향의 천체가 같은 쪽에 모입니다
//  반지름 r = log₁₀(거리)      → 바깥으로 갈수록 먼 우주
//  크기   = 실제 겉보기 지름(분각)을 압축 매핑
//
//  즉 "화면을 줌아웃한다 = 내 우주가 넓어진다" 가 문자 그대로 성립합니다.
// ─────────────────────────────────────────────

import { OBJECTS } from '@/data/content';
import { SKY } from '@/data/sky';

export const LY_MIN = 1e-8;      // 달보다 조금 안쪽
export const LY_MAX = 3e9;       // 퀘이사보다 조금 바깥
const L0 = Math.log10(LY_MIN);
const L1 = Math.log10(LY_MAX);

export const R_IN  = 190;        // 중심 여백 (내가 서 있는 자리)
export const R_OUT = 2100;       // 가장 먼 천체까지

/** 거리(광년) → 월드 반지름 */
export function lyToRadius(ly) {
  const t = (Math.log10(Math.max(ly, LY_MIN)) - L0) / (L1 - L0);
  return R_IN + Math.min(Math.max(t, 0), 1) * (R_OUT - R_IN);
}

/** 월드 반지름 → 거리(광년) — HUD 표시용 */
export function radiusToLy(r) {
  const t = (r - R_IN) / (R_OUT - R_IN);
  return Math.pow(10, L0 + Math.min(Math.max(t, 0), 1) * (L1 - L0));
}

/** 겉보기 지름(분각) → 월드 픽셀 지름
 *  실제 비율을 그대로 쓰면 행성이 1px도 안 되므로 제곱근으로 압축했습니다.
 *  (팝업에는 진짜 겉보기 크기를 그대로 표시합니다) */
export function arcminToSize(arcmin, isPoint) {
  const a = isPoint ? 2.0 : Math.max(arcmin, 0.22);
  return 14 * Math.sqrt(a);
}

/** 광년 → 사람이 읽는 거리 문자열 */
export function lyText(ly) {
  if (ly < 1 / 31557600)      return `${(ly * 31557600).toFixed(1)}광초`;
  if (ly < 1 / 8766)          return `${(ly * 8766).toFixed(1)}광분`;
  if (ly < 1 / 365.25)        return `${(ly * 365.25).toFixed(1)}광시`;
  if (ly < 1)                 return `${(ly * 365.25).toFixed(0)}광일`;
  if (ly < 10000)             return `${Math.round(ly).toLocaleString()} 광년`;
  if (ly < 1e8)               return `${(ly / 10000).toFixed(ly < 1e6 ? 1 : 0)}만 광년`;
  return `${(ly / 1e8).toFixed(1)}억 광년`;
}

/* ── 배치 ──────────────────────────────────
   반지름(거리)은 절대 건드리지 않고 각도만 조정합니다.
     1) 기본 각도 = 적경(RA)
     2) 적위(Dec)로 살짝 벌림 — 같은 적경이라도 남/북이 다르면 떨어지도록
     3) 그래도 겹치는 것들만 각도를 미세하게 밀어냄
   거리 축은 정확하게 유지되고, 방향만 읽기 쉽게 완화한 배치입니다. */
const DEC_SPREAD = 0.34;   // 적위 ±90° 가 만드는 최대 각도 편차(rad)

const base = OBJECTS.map((o) => {
  const s = SKY[o.id] || { ra: 0, dec: 0, arcmin: 5 };
  return {
    obj: o, sky: s,
    r: lyToRadius(o.ly),
    size: arcminToSize(s.arcmin, s.point),
    theta: (s.ra / 24) * Math.PI * 2 - Math.PI / 2 + (s.dec / 90) * DEC_SPREAD,
  };
});

/* 겹침 완화 — 각도만 이동 */
for (let step = 0; step < 90; step++) {
  for (let i = 0; i < base.length; i++) {
    for (let j = i + 1; j < base.length; j++) {
      const a = base[i], b = base[j];
      const ax = Math.cos(a.theta) * a.r, ay = Math.sin(a.theta) * a.r;
      const bx = Math.cos(b.theta) * b.r, by = Math.sin(b.theta) * b.r;
      const d = Math.hypot(ax - bx, ay - by);
      const need = (a.size + b.size) * 0.62 + 26;
      if (d >= need || d === 0) continue;
      const push = ((need - d) / need) * 0.02;
      let diff = b.theta - a.theta;
      while (diff >  Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      const dir = diff >= 0 ? 1 : -1;
      a.theta -= dir * push * (b.size / (a.size + b.size) + 0.5);
      b.theta += dir * push * (a.size / (a.size + b.size) + 0.5);
    }
  }
}

export const NODES = base.map((n) => ({
  obj: n.obj, sky: n.sky, r: n.r, size: n.size,
  x: Math.cos(n.theta) * n.r,
  y: Math.sin(n.theta) * n.r,
}));

/** 레벨 경계 반지름 (링 그리기용) */
export function levelRing(objectsOfLevel) {
  const list = objectsOfLevel;
  if (!list.length) return R_IN;
  return lyToRadius(Math.max(...list.map((o) => o.ly)));
}
