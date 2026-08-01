import Link from 'next/link';
import Background from '@/components/Background';
import { IconOrbit } from '@/components/Icons';
import { LEVELS, OBJECTS } from '@/data/content';

export default function Landing() {
  return (
    <>
      <Background variant="hero" />
      <main className="page" style={{ minHeight: '100dvh' }}>
        <header className="top">
          <div className="logo">
            <IconOrbit size={20} style={{ color: 'var(--lv3)' }} /> universe10
          </div>
          <nav className="gnav">
            <Link href="/universe">우주 지도</Link>
            <Link href="/collection">탐색</Link>
            <Link href="/columns">관측 칼럼</Link>
          </nav>
          <Link href="/login" style={{ fontSize: 13, color: '#B4BCCB', fontWeight: 600 }}>
            로그인
          </Link>
        </header>

        {/* 하단 정렬 — 위쪽은 사진이 살고, 아래쪽에 정보가 밀집 */}
        <section className="fade" style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', paddingBottom: 40, maxWidth: 620,
        }}>
          <div className="eyebrow" style={{ color: 'var(--lv3)', marginBottom: 18 }}>
            EXPANDING YOUR OWN UNIVERSE
          </div>
          <h1 style={{
            fontSize: 'clamp(33px,7.2vw,62px)', fontWeight: 800, color: '#fff',
            lineHeight: 1.32, letterSpacing: '-.05em',
            textShadow: '0 2px 30px rgba(5,7,14,.8)',
          }}>내가 아는 만큼이<br />나의 우주입니다</h1>

          <p style={{ fontSize: 'clamp(13.5px,2vw,16px)', color: '#B4BCCB',
            lineHeight: 1.8, marginTop: 18 }}>
            10대 천문학자가 영하 20도 산꼭대기에서 직접 담아온 밤하늘.<br />
            퀴즈를 풀수록 당신이 아는 우주가 넓어집니다.
          </p>

          {/* 본문 → CTA 간격을 좁혀 하단을 안정시킴 */}
          <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
            <Link href="/universe" style={{ flex: '1 1 220px' }}>
              <span className="btn btn-p">우주 넓히러 가기</span>
            </Link>
            <Link href="/columns" style={{ flex: '0 1 auto' }}>
              <span className="btn" style={{ padding: '16px 26px' }}>관측 칼럼</span>
            </Link>
          </div>

          <div style={{
            display: 'flex', gap: 'clamp(20px,5vw,48px)', marginTop: 32, paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,.10)', fontSize: 12, color: '#8A92A4',
            flexWrap: 'wrap',
          }}>
            {LEVELS.map((l) => (
              <div key={l.id}>
                <b style={{ display: 'block', color: l.color, fontSize: 16.5, fontWeight: 800,
                  letterSpacing: '-.02em' }}>{l.scaleLabel}</b>
                {l.name}
              </div>
            ))}
            <div style={{ marginLeft: 'auto', alignSelf: 'flex-end', fontSize: 11,
              color: '#69718a' }}>
              천체 {OBJECTS.length}개 · Photo 곽준성
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
