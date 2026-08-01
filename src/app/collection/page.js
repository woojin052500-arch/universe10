'use client';
import { useState } from 'react';
import Link from 'next/link';
import Background from '@/components/Background';
import TabBar from '@/components/TabBar';
import SiteHeader from '@/components/SiteHeader';
import ObjectImage from '@/components/ObjectImage';
import { IconLock, IconCheck } from '@/components/Icons';
import { LEVELS, OBJECTS, objectsOfLevel } from '@/data/content';
import useProgress from '@/lib/useProgress';
import { isLevelUnlocked } from '@/lib/progress';

export default function CollectionPage() {
  const { completed } = useProgress();
  const [filter, setFilter] = useState(0); // 0 = 전체

  const list = (filter ? objectsOfLevel(filter) : LEVELS.flatMap((l) => objectsOfLevel(l.id)));
  const got = OBJECTS.filter((o) => completed.includes(o.id)).length;

  return (
    <>
      <Background variant="max" />
      <main className="page with-tabs">
        <SiteHeader active="도감" completed={completed} />

        <div className="fade" style={{ marginTop: 4 }}>
          <div className="eyebrow" style={{ color: 'var(--muted)' }}>COLLECTION</div>
          <h1 style={{ fontSize: 'clamp(24px,5vw,34px)', fontWeight: 800, color: '#fff',
            letterSpacing: '-.045em', margin: '6px 0 4px' }}>
            수집한 천체 <span style={{ color: 'var(--lv3)' }}>{got}</span>
            <span style={{ color: '#4E5566', fontWeight: 500 }}> / {OBJECTS.length}</span>
          </h1>
          <p style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 20 }}>
            퀴즈를 맞히면 도감에 기록됩니다
          </p>

          <div className="filters" style={{ marginBottom: 20 }}>
            <button className={`chip ${filter === 0 ? 'on' : ''}`} onClick={() => setFilter(0)}>
              전체
            </button>
            {LEVELS.map((l) => (
              <button key={l.id} className={`chip ${filter === l.id ? 'on' : ''}`}
                onClick={() => setFilter(l.id)}
                style={filter === l.id ? {} : { color: l.color, borderColor: `${l.color}44` }}>
                Lv.{l.id} {l.name}
              </button>
            ))}
          </div>
        </div>

        <div className="dex fade" style={{ paddingBottom: 40, animationDelay: '.06s' }}>
          {list.map((o) => {
            const lv = LEVELS.find((l) => l.id === o.level);
            const open = isLevelUnlocked(o.level, completed);
            const done = completed.includes(o.id);
            const Card = (
              <div className="dex-card" style={done ? { borderColor: `${lv.color}55` } : {}}>
                <ObjectImage obj={o} fill dim={!done} />
                <div className="veil" />
                {done && (
                  <div className="dex-chip" style={{ color: lv.color }}>
                    <IconCheck size={13} />
                  </div>
                )}
                <div className="dex-meta">
                  <div className="dex-name">{o.nameKo}</div>
                  <div className="dex-sub" style={done ? { color: lv.color } : {}}>
                    {done ? o.scaleLabel : (o.catalog || `Lv.${o.level}`)}
                  </div>
                </div>
                {!open && <div className="dex-lock"><IconLock size={24} /></div>}
              </div>
            );
            return open
              ? <Link key={o.id} href={`/object/${o.id}`}>{Card}</Link>
              : <div key={o.id}>{Card}</div>;
          })}
        </div>
      </main>
      <TabBar />
    </>
  );
}
