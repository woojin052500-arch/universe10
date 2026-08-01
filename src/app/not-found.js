import Link from 'next/link';
import Background from '@/components/Background';

export default function NotFound() {
  return (
    <>
      <Background variant="max" />
      <main className="page" style={{ minHeight: '100dvh', justifyContent: 'center',
        alignItems: 'center', textAlign: 'center' }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--muted)' }}>404</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '12px 0 10px',
            letterSpacing: '-.04em' }}>여기엔 아무것도 없습니다</h1>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.8 }}>
            아직 관측되지 않은 영역이에요.
          </p>
          <Link href="/collection" style={{ display: 'block', marginTop: 26, maxWidth: 260,
            marginLeft: 'auto', marginRight: 'auto' }}>
            <span className="btn btn-p">탐색으로 돌아가기</span>
          </Link>
        </div>
      </main>
    </>
  );
}
