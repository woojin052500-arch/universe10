import Link from 'next/link';
import Background from '@/components/Background';
import { IconOrbit } from '@/components/Icons';
import { LEVELS } from '@/data/content';

export default function Landing() {
  return (
    <>
      <Background variant="hero" />
      <main className="page" style={{ minHeight: '100dvh' }}>
        <header className="top">
          <div className="logo">
            <IconOrbit size={20} style={{ color: 'var(--lv3)' }} />
            universe10
          </div>
          <nav className="gnav"><a className="on">소개</a><a>우주 지도</a><a>관측 칼럼</a></nav>
        </header>

        <section style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', paddingBottom: 48, maxWidth: 620,
        }}>
          <div className="eyebrow" style={{ color: 'var(--lv3)', marginBottom: 18 }}>
            EXPANDING YOUR OWN UNIVERSE
          </div>
          <h1 style={{
            fontSize: 'clamp(34px,7vw,62px)', fontWeight: 800, color: '#fff',
            lineHeight: 1.32, letterSpacing: '-.045em',
            textShadow: '0 3px 34px rgba(0,0,0,.6)',
          }}>내가 아는 만큼이<br />나의 우주입니다</h1>

          <p style={{ fontSize: 'clamp(14px,2vw,17px)', color: '#B4BCCB',
            lineHeight: 1.8, marginTop: 22 }}>
            10대 천문학자가 영하 20도 산꼭대기에서 직접 담아온 밤하늘.<br />
            퀴즈를 풀수록 당신이 아는 우주가 넓어집니다.
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 34, flexWrap: 'wrap' }}>
            <Link href="/universe" style={{ flex: '1 1 200px' }}>
              <span className="btn btn-p">우주 넓히러 가기</span>
            </Link>
          </div>

          <div style={{
            display: 'flex', gap: 'clamp(24px,5vw,52px)', marginTop: 40,
            paddingTop: 26, borderTop: '1px solid rgba(255,255,255,.10)',
            fontSize: 12.5, color: '#8A92A4', flexWrap: 'wrap',
          }}>
            {LEVELS.map((l) => (
              <div key={l.id}>
                <b style={{ display: 'block', color: l.color, fontSize: 17, fontWeight: 800 }}>
                  {l.scaleLabel}
                </b>
                {l.name}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11.5, color: '#69718a', marginTop: 18 }}>
            Photo · 곽준성 (대한천문회)
          </div>
        </section>
      </main>
    </>
  );
}
