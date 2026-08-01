import Link from 'next/link';
import Background from '@/components/Background';
import TabBar from '@/components/TabBar';
import SiteHeader from '@/components/SiteHeader';
import ObjectImage from '@/components/ObjectImage';
import { COLUMNS } from '@/data/columns';
import { getObject } from '@/data/content';

export const metadata = { title: '관측 칼럼 — universe10' };

export default function ColumnsPage() {
  return (
    <>
      <Background variant="max" />
      <main className="page with-tabs">
        <SiteHeader active="관측 칼럼" />

        <div className="fade" style={{ marginTop: 4, marginBottom: 22 }}>
          <div className="eyebrow" style={{ color: 'var(--muted)' }}>OBSERVATION LOG</div>
          <h1 style={{ fontSize: 'clamp(24px,5vw,34px)', fontWeight: 800, color: '#fff',
            letterSpacing: '-.045em', margin: '6px 0 8px' }}>관측 칼럼</h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75, maxWidth: 560 }}>
            산꼭대기에서 밤을 새운 사람이 아니면 쓸 수 없는 이야기.<br />
            사진 뒤에 있던 시간을 기록합니다.
          </p>
        </div>

        <div className="col-list fade" style={{ paddingBottom: 42, animationDelay: '.06s' }}>
          {COLUMNS.map((c) => {
            const cover = getObject(c.cover);
            return (
              <Link key={c.id} href={`/columns/${c.id}`} className="col-card">
                <div className="col-cover">
                  {cover && <ObjectImage obj={cover} fill />}
                  <div style={{ position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg,rgba(5,7,14,.15),rgba(5,7,14,.86))' }} />
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#fff',
                    lineHeight: 1.5, letterSpacing: '-.02em' }}>
                    {c.title}
                    {c.isTemp && <span className="tmp">임시</span>}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75,
                    marginTop: 9 }}>{c.excerpt}</p>
                  <div style={{ fontSize: 11.5, color: '#69718a', marginTop: 14 }}>
                    {c.author} · {c.date} · {c.readMin}분
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <TabBar />
    </>
  );
}
