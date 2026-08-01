'use client';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import ObjectImage from './ObjectImage';
import { IconLock, IconCheck } from './Icons';
import { LEVELS, objectsOfLevel } from '@/data/content';
import { NODES, R_IN, R_OUT, lyToRadius, radiusToLy, lyText } from '@/lib/mapProjection';
import { isLevelUnlocked, currentScale } from '@/lib/progress';
import { OBJECTS } from '@/data/content';

const MIN_K = 0.16;      // 전체 우주가 한눈에
const MAX_K = 14;        // 행성 표면까지
const PHOTO_AT = 30;     // 화면상 지름이 이보다 커지면 사진으로 전환

export default function SkyMap({ completed, onOpen }) {
  const wrapRef = useRef(null);
  const [view, setView] = useState({ x: 0, y: 0, k: 0.42 });
  const [size, setSize] = useState({ w: 0, h: 0 });
  const drag = useRef(null);
  const pinch = useRef(null);

  /* 컨테이너 크기 */
  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  /* 커서 지점을 고정한 채 확대/축소 */
  const zoomAt = useCallback((cx, cy, factor) => {
    setView((v) => {
      const k = Math.min(MAX_K, Math.max(MIN_K, v.k * factor));
      const f = k / v.k;
      return { k, x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f };
    });
  }, []);

  /* 휠 줌 */
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

  /* 드래그 / 핀치 */
  const pointers = useRef(new Map());
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

  /* 초기 위치를 중앙으로 */
  useEffect(() => {
    if (size.w && view.x === 0 && view.y === 0)
      setView((v) => ({ ...v, x: size.w / 2, y: size.h / 2 }));
  }, [size.w, size.h]);          // eslint-disable-line

  const fit = () => setView({ x: size.w / 2, y: size.h / 2, k: 0.42 });
  const flyTo = (n, k = 2.2) =>
    setView({ x: size.w / 2 - n.x * k, y: size.h / 2 - n.y * k, k });

  /* 현재 화면에 보이는 가장 먼 거리 = 지금 내가 보고 있는 우주의 크기 */
  const fovLy = useMemo(() => {
    if (!size.w) return 0;
    const corner = Math.hypot(
      Math.max(Math.abs(-view.x), Math.abs(size.w - view.x)),
      Math.max(Math.abs(-view.y), Math.abs(size.h - view.y)),
    ) / view.k;
    return radiusToLy(corner);
  }, [view, size]);

  /* 내 우주 경계 (완료한 천체 중 가장 먼 곳) */
  const frontierR = useMemo(() => {
    const done = OBJECTS.filter((o) => completed.includes(o.id));
    return done.length ? lyToRadius(Math.max(...done.map((o) => o.ly))) : R_IN;
  }, [completed]);

  return (
    <div className="sky" ref={wrapRef}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>

      <div className="sky-world"
        style={{ transform: `translate(${view.x}px,${view.y}px) scale(${view.k})` }}>

        {/* 레벨 경계 링 */}
        {LEVELS.map((lv) => {
          const list = objectsOfLevel(lv.id);
          const r = lyToRadius(Math.max(...list.map((o) => o.ly)));
          const open = isLevelUnlocked(lv.id, completed);
          return (
            <div key={lv.id} className="sky-ring" style={{
              width: r * 2, height: r * 2,
              border: `${1 / view.k}px ${open ? 'solid' : 'dashed'} ${lv.color}${open ? '2E' : '1A'}`,
            }} />
          );
        })}

        {/* 내 우주 경계 */}
        <div className="sky-frontier" style={{
          width: frontierR * 2, height: frontierR * 2,
          border: `${1.6 / view.k}px solid rgba(232,115,127,.55)`,
          boxShadow: `0 0 ${90 / view.k}px rgba(232,115,127,.18) inset`,
        }} />

        {/* 중심 = 나 */}
        <div className="sky-me" style={{ width: 14 / view.k, height: 14 / view.k }} />

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
                  style={{
                    width: n.size, height: n.size,
                    opacity: open ? (done ? 1 : .62) : .22,
                    boxShadow: done ? `0 0 ${34 * inv}px ${lv.color}55` : 'none',
                    borderWidth: 1.2 * inv,
                    borderColor: done ? `${lv.color}88` : 'rgba(255,255,255,.14)',
                  }}>
                  <ObjectImage obj={o} fill radius={9999} />
                </div>
              ) : (
                <span className="sky-dot" style={{
                  width: Math.max(4, onScreen) * inv,
                  height: Math.max(4, onScreen) * inv,
                  background: open ? lv.color : `${lv.color}44`,
                  opacity: done ? 1 : .55,
                  boxShadow: done ? `0 0 ${9 * inv}px ${lv.color}` : 'none',
                }} />
              )}

              {/* 이름표 — 줌과 무관하게 같은 크기로 */}
              {(view.k > 0.3 || n.size > 130) && (
                <span className="sky-label" style={{
                  transform: `translate(-50%, ${(asPhoto ? n.size / 2 : 8) + 6 * inv}px) scale(${inv})`,
                  color: done ? '#fff' : open ? '#9AA3B6' : '#4E5566',
                }}>
                  {o.nameKo}
                  {done && <IconCheck size={10} style={{ color: lv.color, marginLeft: 3, verticalAlign: -1 }} />}
                  {!open && <IconLock size={9} style={{ marginLeft: 3, verticalAlign: -1 }} />}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── HUD ── */}
      <div className="sky-hud-tl">
        <div className="eyebrow" style={{ color: 'var(--muted)' }}>MY UNIVERSE</div>
        <div className="sky-scale">{currentScale(completed)}</div>
        <div className="sky-fov">보고 있는 범위 · {lyText(fovLy)}</div>
      </div>

      <div className="sky-hud-br">
        <button className="sky-btn" onClick={() => zoomAt(size.w / 2, size.h / 2, 1.45)} aria-label="확대">＋</button>
        <button className="sky-btn" onClick={() => zoomAt(size.w / 2, size.h / 2, 1 / 1.45)} aria-label="축소">−</button>
        <button className="sky-btn wide" onClick={fit}>전체</button>
      </div>

      <div className="sky-hud-b">
        <span>드래그로 이동 · 휠/핀치로 확대 · 천체를 누르면 정보가 열립니다</span>
      </div>

      {/* 빠른 이동 */}
      <div className="sky-jump">
        {LEVELS.map((lv) => {
          const list = objectsOfLevel(lv.id);
          const r = lyToRadius(list[Math.floor(list.length / 2)].ly);
          const open = isLevelUnlocked(lv.id, completed);
          return (
            <button key={lv.id} className="chip" disabled={!open}
              style={{ color: open ? lv.color : '#4E5566',
                borderColor: open ? `${lv.color}44` : 'var(--line)',
                opacity: open ? 1 : .45 }}
              onClick={() => setView({ x: size.w / 2, y: size.h / 2, k: (R_IN + 60) / r * 1.1 })}>
              Lv.{lv.id} {lv.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
