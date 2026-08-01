'use client';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import ObjectImage from './ObjectImage';
import { IconLock, IconCheck } from './Icons';
import { LEVELS, objectsOfLevel } from '@/data/content';
import { NODES, R_IN, lyToRadius, radiusToLy, lyText } from '@/lib/mapProjection';
import { makeStars } from '@/lib/starfield';
import { isLevelUnlocked, currentScale } from '@/lib/progress';

const MIN_K = 0.16;
const MAX_K = 16;
const PHOTO_AT = 26;     // 화면상 지름이 이보다 커지면 사진으로 전환

const STARS = makeStars();

export default function SkyMap({ completed, onOpen }) {
  const wrapRef = useRef(null);
  const [view, setView] = useState({ x: 0, y: 0, k: 0.42 });
  const [size, setSize] = useState({ w: 0, h: 0 });
  const drag = useRef(null);
  const pinch = useRef(null);
  const pointers = useRef(new Map());

  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const set = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    const ro = new ResizeObserver(set); ro.observe(el); set();
    return () => ro.disconnect();
  }, []);

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
      const [a, b] = [...pointers.current.values()];
      pinch.current = { d: Math.hypot(a.x - b.x, a.y - b.y), k: view.k };
      drag.current = null;
    }
  }
  function move(e) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const rect = wrapRef.current.getBoundingClientRect();
      const cx = (a.x + b.x) / 2 - rect.left, cy = (a.y + b.y) / 2 - rect.top;
      setView((v) => {
        const k = Math.min(MAX_K, Math.max(MIN_K, pinch.current.k * (d / pinch.current.d)));
        const f = k / v.k;
        return { k, x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f };
      });
      return;
    }
    if (!drag.current) return;
    const dx = e.clientX - drag.current.sx, dy = e.clientY - drag.current.sy;
    drag.current.moved = Math.max(drag.current.moved, Math.hypot(dx, dy));
    setView((v) => ({ ...v, x: drag.current.vx + dx, y: drag.current.vy + dy }));
  }
  function up(e) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) setTimeout(() => { drag.current = null; }, 0);
  }

  useEffect(() => {
    if (size.w && view.x === 0 && view.y === 0)
      setView((v) => ({ ...v, x: size.w / 2, y: size.h / 2 }));
  }, [size.w, size.h]); // eslint-disable-line

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

      <div className="sky-world"
        style={{ transform: `translate(${view.x}px,${view.y}px) scale(${view.k})` }}>

        {/* 배경 별 — 월드에 박혀 있어 이동·확대에 같이 반응합니다 */}
        <svg className="sky-stars" width="5200" height="5200" viewBox="-2600 -2600 5200 5200"
          style={{ left: -2600, top: -2600 }}>
          {STARS.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.s} fill={s.c} opacity={s.o} />
          ))}
        </svg>

        {/* 천체 */}
        {NODES.map((n) => {
          const o = n.obj;
          const lv = LEVELS.find((l) => l.id === o.level);
          const open = isLevelUnlocked(o.level, completed);
          const done = completed.includes(o.id);
          const onScreen = n.size * view.k;
          const asPhoto = onScreen >= PHOTO_AT;
          const inv = 1 / view.k;

          return (
            <button key={o.id} className="sky-node"
              style={{ left: n.x, top: n.y }}
              onClick={(e) => {
                if (drag.current && drag.current.moved > 6) return;
                e.stopPropagation();
                onOpen({ node: n, unlocked: open, done });
              }}
              aria-label={o.nameKo}>

              {asPhoto ? (
                <div className="sky-photo"
                  style={{ width: n.size, height: n.size,
                    opacity: open ? (done ? 1 : .5) : .16 }}>
                  <ObjectImage obj={o} fill />
                </div>
              ) : (
                <span className="sky-dot" style={{
                  width: Math.max(3.4, onScreen) * inv,
                  height: Math.max(3.4, onScreen) * inv,
                  background: open ? '#fff' : 'rgba(255,255,255,.34)',
                  opacity: done ? 1 : .62,
                  boxShadow: `0 0 ${(done ? 9 : 5) * inv}px ${done ? lv.color : 'rgba(255,255,255,.6)'}`,
                }} />
              )}

              <span className="sky-label" style={{
                transform: `translate(-50%, ${(asPhoto ? n.size / 2 : 6) + 7 * inv}px) scale(${inv})`,
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
      </div>

      {/* ── HUD ── */}
      <div className="sky-hud-tl">
        <div className="sky-scale">{currentScale(completed)}</div>
        <div className="sky-fov">시야 {lyText(fovLy)}</div>
      </div>

      <div className="sky-hud-br">
        <button className="sky-btn" onClick={() => zoomAt(size.w / 2, size.h / 2, 1.5)} aria-label="확대">＋</button>
        <button className="sky-btn" onClick={() => zoomAt(size.w / 2, size.h / 2, 1 / 1.5)} aria-label="축소">−</button>
      </div>

      <div className="sky-jump">
        {LEVELS.map((lv) => {
          const list = objectsOfLevel(lv.id);
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
