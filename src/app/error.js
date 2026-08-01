'use client';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="page" style={{ minHeight: '100dvh', justifyContent: 'center',
      alignItems: 'center', textAlign: 'center' }}>
      <div style={{ maxWidth: 400 }}>
        <div className="eyebrow" style={{ color: 'var(--lv3)' }}>SIGNAL LOST</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '12px 0 10px',
          letterSpacing: '-.04em' }}>화면을 불러오지 못했습니다</h1>
        <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.8 }}>
          일시적인 문제일 수 있습니다.<br />다시 시도해 주세요.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
          <button className="btn btn-p" onClick={reset} style={{ flex: 1 }}>다시 시도</button>
          <Link href="/" style={{ flex: 1 }}><span className="btn">처음으로</span></Link>
        </div>
      </div>
    </main>
  );
}
