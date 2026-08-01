'use client';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import ObjectImage from './ObjectImage';
import { IconLock, IconCheck } from './Icons';
import { LEVELS, objectsOfLevel } from '@/data/content';
import { NODES, R_IN, lyToRadius, radiusToLy, lyText } from '@/lib/mapProjection';
import { makeStars } from '@/lib/starfield';
import { isLevelUnlocked, currentScale } from '@/lib/progress';

const MIN_K = 0.16;
const MAX_K = 260;      // 행성 표면까지 들어갈 수 있게
const PHOTO_AT = 26;    // 화면상 지름이 이보다 커지면 사진으로 전환
const MAX_PX = 6000;    // 한 이미지가 이보다 커지지 않도록 (레이어 한계 회피)

const STARS = makeStars();

/**
 * 월드를 통째로 CSS transform 하지 않고,
 * 천체마다 화면 좌표를 직접 계산해 배치합니다.
 *
 *   화면 = 월드 * k + 이동
 *
 * 이렇게 하면 확대해도 거대한 합성 레이어가 생기지 않아
 * 브라우저 텍스처 한계로 화면이 통째로 사라지는 문제가 없습니다.
 * 화면 밖 천체는 그리지 않으므로 확대할수록 오히려 가벼워집니다.
 */
export default function SkyMap({ completed, onOpen }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [view, setView] = useState({ x: 0, y: 0, k: 0.42 });
  const [size, setSize] = useState({ w: 0, h: 0 });
  const drag = useRef(null);
  const pinch = useRef(null);
  const pointers = useRef(new Map());

  /* 컨테이너 크기 */
  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const set = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    const ro = new ResizeObserver(set); ro.observe(el); set();
    return () => ro.disconnect();
  }, []);

  /* 처음엔 화면 중앙을 원점으로 */
  useEffect(() => {
    if (size.w && view.x === 0 && view.y === 0)
      setView((v) => ({ ...v, x: size.w / 2, y: size.h / 2 }));
  }, [size.w, size.h]); // eslint-disable-line

  /* 배경 별 — 캔버스에 직접 그립니다 (화면 크기만큼만) */
  useEffect(() => {
    const cv = canvasRef.current; if (!cv || !size.w) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = size.w * dpr; cv.height = size.h * dpr;
    cv.style.width = size.w + 'px'; cv.style.height = size.h + 'px';
    const g = cv.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, size.w, size.h);

    const grow = Math.pow(view.k, 0.34);   // 확대해도 별이 사라지지 않도록 완만히 키움
    for (let i = 0; i < STARS.length; i++) {
      const s = STARS[i];
      const sx = s.x * view.k + view.x;
      if (sx < -6 || sx > size.w + 6) continue;
      const sy = s.y * view.k + view.y;
      if (sy < -6 || sy > size.h + 6) continue;
      const r = Math.min(s.s * grow, 3.4);
      g.globalAlpha = s.o;
      g.fillStyle = s.c;
      g.beginPath(); g.arc(sx, sy, r, 0, 6.2832); g.fill();
    }
    g.globalAlpha = 1;
  }, [view, size]);

  /* 커서 지점을 고정한 채 확대 */
  const zoomAt = useCallback((cx, cy, factor) => {
    setView((v) => {
      const k = Math.min(MAX_K, Math.max(MIN_K, v.k * factor));
      const f = k / v.k;
      return { k, x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f };
    });
  }, []);

  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const b = el.getBoundingClientRect();
      zoomAt(e.clientX - b.left, e.clientY - b.top, Math.exp(-e.deltaY * 0.0016));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomAt]);

  function down(e) {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      drag.current = { sx: e.clientX, sy: e.clientY, vx: view.x, vy: view.y, moved: 0 };
    } else if (pointers.current.size === 2) {
      const pts = [...pointers.current.values()];
      const a = pts[0], b = pts[1];
      const d = a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 0;
      pinch.current = d > 0 ? { d, k: view.k } : null;
      drag.current = null;
    }
  }

  function move(e) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // ref 값을 지역 변수로 복사한 뒤 setView 를 호출합니다.
    // 업데이터 안에서 ref 를 직접 읽으면 포인터가 떨어지는 순간 null 이 되어 터집니다.
    if (pointers.current.size === 2) {
      const p = pinch.current;
      if (!p || !p.d) return;
      const pts = [...pointers.current.values()];
      const a = pts[0], b = pts[1];
      if (!a || !b) return;
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const el = wrapRef.current;
      if (!d || !el) return;
      const rect = el.getBoundingClientRect();
      const cx = (a.x + b.x) / 2 - rect.left;
      const cy = (a.y + b.y) / 2 - rect.top;
      const target = Math.min(MAX_K, Math.max(MIN_K, p.k * (d / p.d)));
      setView((v) => {
        const f = target / v.k;
        return { k: target, x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f };
      });
      return;
    }

    const dg = drag.current;
    if (!dg) return;
    const dx = e.clientX - dg.sx, dy = e.clientY - dg.sy;
    dg.moved = Math.max(dg.moved, Math.hypot(dx, dy));
    const nx = dg.vx + dx, ny = dg.vy + dy;
    setView((v) => ({ ...v, x: nx, y: ny }));
  }

  function up(e) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) setTimeout(() => { drag.current = null; }, 0);
  }

  /* 화면에 실제로 그릴 천체만 추리기 */
  const visible = useMemo(() => {
    if (!size.w) return [];
    const out = [];
    for (const n of NODES) {
      const sx = n.x * view.k + view.x;
      const sy = n.y * view.k + view.y;
      const px = Math.min(n.size * view.k, MAX_PX);
      const half = Math.max(px / 2, 40);
      if (sx + half < -80 || sx - half > size.w + 80) continue;
      if (sy + half < -80 || sy - half > size.h + 80) continue;
      out.push({ n, sx, sy, px });
    }
    // 큰 것부터 그려서 작은 천체가 위에 오도록
    return out.sort((a, b) => b.px - a.px);
  }, [view, size]);

  const fovLy = useMemo(() => {
    if (!size.w) return 0;
    const corner = Math.hypot(
      Math.max(Math.abs(-view.x), Math.abs(size.w - view.x)),
      Math.max(Math.abs(-view.y), Math.abs(size.h - view.y)),
    ) / view.k;
    return radiusToLy(corner);
  }, [view, size]);

  return (
    <div className="sky" ref={wrapRef}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>

      <canvas ref={canvasRef} className="sky-canvas" />

      {visible.map(({ n, sx, sy, px }) => {
        const o = n.obj;
        const lv = LEVELS.find((l) => l.id === o.level) || LEVELS[0];
        const open = isLevelUnlocked(o.level, completed);
        const done = completed.includes(o.id);
        const asPhoto = px >= PHOTO_AT;
        const dot = Math.max(3.4, px);

        return (
          <button key={o.id} className="sky-node"
            style={{ left: sx, top: sy }}
            onClick={(e) => {
              if (drag.current && drag.current.moved > 6) return;
              e.stopPropagation();
              onOpen({ node: n, unlocked: open, done });
            }}
            aria-label={o.nameKo}>

            {asPhoto ? (
              <div className="sky-photo"
                style={{ width: px, height: px, opacity: open ? (done ? 1 : .5) : .16 }}>
                <ObjectImage obj={o} fill />
              </div>
            ) : (
              <span className="sky-dot" style={{
                width: dot, height: dot,
                background: open ? '#fff' : 'rgba(255,255,255,.34)',
                opacity: done ? 1 : .62,
                boxShadow: `0 0 ${done ? 9 : 5}px ${done ? lv.color : 'rgba(255,255,255,.6)'}`,
              }} />
            )}

            <span className="sky-label" style={{
              top: `calc(50% + ${(asPhoto ? Math.min(px, size.h) / 2 : 6) + 7}px)`,
              color: done ? '#EEF2F8' : open ? '#8892A6' : '#4A5164',
              opacity: view.k > 0.26 || n.size > 120 ? 1 : 0,
            }}>
              {o.nameKo}
              {done && <IconCheck size={9} style={{ color: lv.color, marginLeft: 3, verticalAlign: -1 }} />}
              {!open && <IconLock size={8} style={{ marginLeft: 3, verticalAlign: -1 }} />}
            </span>
          </button>
        );
      })}

      {/* ── HUD ── */}
      <div className="sky-hud-tl">
        <div className="sky-scale">{currentScale(completed)}</div>
        <div className="sky-fov">시야 {lyText(fovLy)} · {view.k.toFixed(view.k < 10 ? 1 : 0)}×</div>
      </div>

      <div className="sky-hud-br">
        <button className="sky-btn" onClick={() => zoomAt(size.w / 2, size.h / 2, 1.6)} aria-label="확대">＋</button>
        <button className="sky-btn" onClick={() => zoomAt(size.w / 2, size.h / 2, 1 / 1.6)} aria-label="축소">−</button>
      </div>

      <div className="sky-jump">
        {LEVELS.map((lv) => {
          const list = objectsOfLevel(lv.id);
          if (!list.length) return null;
          const r = lyToRadius(list[Math.floor(list.length / 2)].ly);
          const open = isLevelUnlocked(lv.id, completed);
          return (
            <button key={lv.id} className="jump" disabled={!open}
              style={{ color: open ? '#C3CAD8' : '#454C5C' }}
              onClick={() => setView({ x: size.w / 2, y: size.h / 2, k: (R_IN + 70) / r * 1.15 })}>
              {lv.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
