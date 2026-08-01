'use client';
import Link from 'next/link';
import Background from '@/components/Background';
import TabBar from '@/components/TabBar';
import SiteHeader from '@/components/SiteHeader';
import { IconLock, IconUser } from '@/components/Icons';
import { LEVELS, OBJECTS } from '@/data/content';
import useProgress from '@/lib/useProgress';
import { isLevelUnlocked, currentScale, levelStats } from '@/lib/progress';

export default function MePage() {
  const { completed, user, reset, signOut, isSupabaseReady } = useProgress();

  const got = OBJECTS.filter((o) => completed.includes(o.id)).length;

  return (
    <>
      <Background variant="max" />
      <main className="page with-tabs">
        <SiteHeader active="MY" />

        <div className="fade" style={{ textAlign: 'center', margin: '18px 0 30px' }}>
          <div style={{ width: 76, height: 76, borderRadius: '50%', margin: '0 auto 16px',
            display: 'grid', placeItems: 'center',
            background: 'linear-gradient(135deg,var(--lv1),var(--lv3))',
            boxShadow: '0 0 44px rgba(232,115,127,.30)' }}>
            <IconUser size={30} style={{ color: 'rgba(5,7,14,.55)' }} />
          </div>
          <div style={{ fontSize: 16.5, color: '#fff', fontWeight: 700 }}>
            {user?.user_metadata?.name || user?.email || '우주여행자'}
          </div>
          <div className="eyebrow" style={{ color: 'var(--muted)', marginTop: 18 }}>MY UNIVERSE</div>
          <div style={{ fontSize: 'clamp(32px,8vw,48px)', fontWeight: 800, color: '#fff',
            letterSpacing: '-.05em', marginTop: 4 }}>{currentScale(completed)}</div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 8 }}>
            수집한 천체 {got} / {OBJECTS.length}
          </div>
        </div>

        <div className="fade" style={{ display: 'flex', flexDirection: 'column', gap: 10,
          maxWidth: 480, width: '100%', margin: '0 auto', animationDelay: '.06s' }}>
          {LEVELS.map((lv) => {
            const s = levelStats(lv.id, completed);
            const open = isLevelUnlocked(lv.id, completed);
            return (
              <div key={lv.id} className="panel" style={{ padding: '16px 18px', opacity: open ? 1 : .45 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', fontSize: 12, fontWeight: 700 }}>
                  <span style={{ color: lv.color }}>Lv.{lv.id} {lv.name}</span>
                  {open
                    ? <span style={{ color: 'var(--muted)' }}>{s.done} / {s.total}</span>
                    : <IconLock size={14} style={{ color: 'var(--muted)' }} />}
                </div>
                <div className="prog" style={{ marginTop: 11 }}>
                  <i style={{ width: `${s.ratio * 100}%`, background: lv.color }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ maxWidth: 480, width: '100%', margin: '30px auto 46px',
          display: 'flex', flexDirection: 'column', gap: 10 }}>
          {isSupabaseReady && !user && (
            <Link href="/login"><span className="btn btn-p">로그인하고 진도 저장하기</span></Link>
          )}
          {!isSupabaseReady && (
            <div style={{ padding: '13px 16px', borderRadius: 12, background: 'var(--card)',
              border: '1px solid var(--line)', fontSize: 12, color: 'var(--muted)',
              lineHeight: 1.8, textAlign: 'center' }}>
              진도가 이 브라우저에만 저장됩니다.<br />
              Supabase를 연결하면 기기 간 동기화가 됩니다.
            </div>
          )}
          {user && (
            <button className="btn" onClick={signOut} style={{ fontSize: 13.5 }}>로그아웃</button>
          )}
          <button className="btn" onClick={reset}
            style={{ fontSize: 13, color: 'var(--muted)' }}>진도 초기화</button>
        </div>
      </main>
      <TabBar />
    </>
  );
}
