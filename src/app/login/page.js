'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Background from '@/components/Background';
import { IconBack } from '@/components/Icons';
import useProgress from '@/lib/useProgress';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, isSupabaseReady } = useProgress();

  async function go(provider) {
    if (!isSupabaseReady) return;
    await signIn(provider);
  }

  return (
    <>
      <Background variant="hero" />
      <main className="page" style={{ minHeight: '100dvh', maxWidth: 460 }}>
        <div className="top">
          <button onClick={() => router.back()} aria-label="뒤로" style={{ color: '#fff' }}>
            <IconBack />
          </button>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', paddingBottom: 40 }}>
          <div className="fade">
            <div className="eyebrow" style={{ color: 'var(--lv3)', marginBottom: 16 }}>
              START YOUR UNIVERSE
            </div>
            <h1 style={{ fontSize: 'clamp(24px,5.4vw,30px)', fontWeight: 800, color: '#fff',
              lineHeight: 1.5, letterSpacing: '-.04em' }}>
              우주 확장을<br />시작할 준비가 됐나요?
            </h1>
            <p style={{ fontSize: 14, color: '#B4BCCB', margin: '12px 0 38px', lineHeight: 1.75 }}>
              로그인하면 진도가 저장돼서<br />다른 기기에서도 이어서 볼 수 있어요.
            </p>
          </div>

          <div className="fade" style={{ display: 'flex', flexDirection: 'column',
            gap: 11, animationDelay: '.08s' }}>
            <button className="oauth" onClick={() => go('kakao')}
              style={{ background: '#FEE500', color: '#191600' }}>
              카카오로 계속하기
            </button>
            <button className="oauth" onClick={() => go('google')}
              style={{ background: '#fff', color: '#1B1B1B' }}>
              Google로 계속하기
            </button>
          </div>

          {!isSupabaseReady && (
            <div style={{ marginTop: 20, padding: '14px 16px', borderRadius: 12,
              background: 'rgba(232,115,127,.10)', borderLeft: '2.5px solid var(--lv3)',
              fontSize: 12.5, lineHeight: 1.8, color: '#c8ced9' }}>
              <b style={{ color: '#fff' }}>아직 로그인이 연결되지 않았습니다.</b><br />
              Supabase 환경변수를 넣으면 바로 동작합니다.
              그 전까지 진도는 이 브라우저에만 저장돼요.
            </div>
          )}

          <Link href="/universe" style={{ marginTop: 22 }}>
            <span className="link" style={{ display: 'block' }}>로그인 없이 둘러보기</span>
          </Link>

          <p style={{ fontSize: 10.5, color: '#7A8296', textAlign: 'center',
            marginTop: 26, lineHeight: 1.85 }}>
            계속하면 이용약관 및 개인정보처리방침에<br />동의하는 것으로 간주합니다
          </p>
        </div>
      </main>
    </>
  );
}
