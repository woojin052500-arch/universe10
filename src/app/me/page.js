'use client';
import { useEffect, useState } from 'react';
import Background from '@/components/Background';
import TabBar from '@/components/TabBar';
import { IconOrbit, IconLock } from '@/components/Icons';
import { LEVELS, OBJECTS } from '@/data/content';
import { readProgress, resetProgress, isLevelUnlocked, currentScale, levelStats } from '@/lib/progress';

export default function MePage() {
  const [completed, setCompleted] = useState(null);
  useEffect(() => { setCompleted(readProgress().completed); }, []);
  if (completed === null) return <><Background variant="max" /><main className="page" /></>;

  return (
    <>
      <Background variant="max" />
      <main className="page with-tabs" style={{ minHeight: '100dvh' }}>
        <header className="top">
          <div className="logo"><IconOrbit size={20} style={{ color: 'var(--lv3)' }} /> universe10</div>
        </header>

        <div style={{ textAlign: 'center', margin: '14px 0 26px' }}>
          <div style={{ width: 66, height: 66, borderRadius: '50%', margin: '0 auto 14px',
            background: 'linear-gradient(135deg,var(--lv1),var(--lv3))',
            boxShadow: '0 0 34px rgba(232,115,127,.28)' }} />
          <div style={{ fontSize: 16, color: '#fff', fontWeight: 700 }}>우주여행자</div>
          <div className="eyebrow" style={{ color: 'var(--muted)', marginTop: 16 }}>MY UNIVERSE</div>
          <div style={{ fontSize: 'clamp(30px,7vw,44px)', fontWeight: 800, color: '#fff',
            letterSpacing: '-.045em', marginTop: 4 }}>{currentScale(completed)}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9,
          maxWidth: 460, width: '100%', margin: '0 auto' }}>
          {LEVELS.map((lv) => {
            const s = levelStats(lv.id, completed);
            const open = isLevelUnlocked(lv.id, completed);
            return (
              <div key={lv.id} className="panel"
                style={{ padding: '14px 17px', opacity: open ? 1 : .45 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', fontSize: 11.5, fontWeight: 600 }}>
                  <span style={{ color: lv.color }}>Lv.{lv.id} {lv.name}</span>
                  {open
                    ? <span style={{ color: 'var(--muted)' }}>{s.done} / {s.total}</span>
                    : <IconLock size={13} style={{ color: 'var(--muted)' }} />}
                </div>
                <div className="prog" style={{ marginTop: 10 }}>
                  <i style={{ width: `${s.ratio * 100}%`, background: lv.color }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', margin: '30px auto 40px', maxWidth: 460, width: '100%' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>
            수집한 천체 {completed.length} / {OBJECTS.length}
          </div>
          <button className="btn"
            onClick={() => { resetProgress(); setCompleted([]); }}
            style={{ fontSize: 13 }}>진도 초기화</button>
        </div>
      </main>
      <TabBar />
    </>
  );
}
