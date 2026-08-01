'use client';
import Link from 'next/link';
import Background from '@/components/Background';
import TabBar from '@/components/TabBar';
import SiteHeader from '@/components/SiteHeader';
import ObjectImage from '@/components/ObjectImage';
import { IconLock, IconNext, IconCheck } from '@/components/Icons';
import { LEVELS, objectsOfLevel } from '@/data/content';
import useProgress from '@/lib/useProgress';
import { isLevelUnlocked, currentScale, levelStats } from '@/lib/progress';

/* 동심원 반지름 (레벨 1이 가장 안쪽) */
const RADIUS = [78, 138, 196];   // Lv.2에 천체가 17개라 간격을 넓혔습니다

export default function UniversePage() {
  const { completed } = useProgress();

  const scale = currentScale(completed);
  // 열려 있는 레벨 중 가장 높은 것 = 현재 레벨
  const currentLevel = [...LEVELS].reverse().find((l) => isLevelUnlocked(l.id, completed)) || LEVELS[0];
  const stats = levelStats(currentLevel.id, completed);
  const next = objectsOfLevel(currentLevel.id).find((o) => !completed.includes(o.id))
    || objectsOfLevel(currentLevel.id)[0];

  return (
    <>
      <Background variant="map" />
      <main className="page with-tabs">
        <SiteHeader active="우주 지도" completed={completed} />

        <div style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginTop: 6 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--muted)' }}>MY UNIVERSE</div>
            <div style={{ fontSize: 'clamp(26px,5vw,40px)', fontWeight: 800,
              color: '#fff', letterSpacing: '-.045em', marginTop: 3 }}>{scale}</div>
          </div>
          <span className="badge" style={{ color: currentLevel.color }}>
            Lv.{currentLevel.id} {currentLevel.name}
          </span>
        </div>

        {/* ── 동심원 지도 ── */}
        <div className="rings">
          {LEVELS.map((lv, i) => {
            const unlocked = isLevelUnlocked(lv.id, completed);
            const r = RADIUS[i];
            return (
              <div key={lv.id} className="ring"
                style={{
                  width: r * 2, height: r * 2,
                  border: unlocked ? `1.5px solid ${lv.color}` : `1px dashed ${lv.color}55`,
                  boxShadow: unlocked && lv.id === currentLevel.id
                    ? `0 0 44px ${lv.color}40` : 'none',
                }} />
            );
          })}

          {/* 천체 노드 */}
          {LEVELS.map((lv, li) => {
            const unlocked = isLevelUnlocked(lv.id, completed);
            const list = objectsOfLevel(lv.id);
            return list.map((o, oi) => {
              const a = (oi / list.length) * Math.PI * 2 - Math.PI / 2 + li * 0.55;
              const r = RADIUS[li];
              const done = completed.includes(o.id);
              return (
                <Link key={o.id} href={unlocked ? `/object/${o.id}` : '#'}
                  className="node" aria-label={o.nameKo}
                  title={unlocked ? o.nameKo : '잠김'}
                  style={{
                    left: `calc(50% + ${Math.cos(a) * r}px)`,
                    top: `calc(47% + ${Math.sin(a) * r}px)`,
                    width: done ? 12 : 7, height: done ? 12 : 7,
                    background: unlocked ? lv.color : `${lv.color}3A`,
                    boxShadow: done ? `0 0 0 4px ${lv.color}2E, 0 0 14px ${lv.color}88` : 'none',
                    pointerEvents: unlocked ? 'auto' : 'none',
                  }} />
              );
            });
          })}

          <div className="core" />
          <div className="ring-label" style={{
            top: 'calc(47% + 20px)', color: '#B4BCCB', fontSize: 10.5 }}>나</div>

          {/* 레벨 라벨 */}
          {LEVELS.map((lv, i) => {
            const unlocked = isLevelUnlocked(lv.id, completed);
            return (
              <div key={lv.id} className="ring-label"
                style={{ top: `calc(47% - ${RADIUS[i] + 20}px)`,
                  color: unlocked ? lv.color : `${lv.color}9E`,
                  fontWeight: unlocked ? 700 : 500 }}>
                {!unlocked && <IconLock size={11} />}
                Lv.{lv.id} {lv.name}
              </div>
            );
          })}
        </div>

        {/* ── 다음 대상 카드 ── */}
        <div className="panel" style={{ padding: 18, marginBottom: 24, maxWidth: 520 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            fontSize: 11.5, color: 'var(--muted)', marginBottom: 11 }}>
            <span>Lv.{currentLevel.id} {currentLevel.name}</span>
            <span>{stats.done} / {stats.total}</span>
          </div>
          <div className="prog" style={{ marginBottom: 16 }}>
            <i style={{ width: `${stats.ratio * 100}%`, background: currentLevel.color }} />
          </div>
          <Link href={`/object/${next.id}`}
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 46, height: 46, flexShrink: 0 }}>
              <ObjectImage obj={next} fill radius={11} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14.5, color: '#fff', fontWeight: 700 }}>
                {next.nameKo}
                {next.isTemp && <span className="tmp">임시</span>}
                {completed.includes(next.id) &&
                  <IconCheck size={14} style={{ color: 'var(--ok)', marginLeft: 6,
                    verticalAlign: '-2px' }} />}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                {next.scaleLabel} · {next.catalog || next.distance}
              </div>
            </div>
            <IconNext style={{ color: 'var(--muted)' }} />
          </Link>
        </div>
      </main>
      <TabBar />
    </>
  );
}
