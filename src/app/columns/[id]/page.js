import Link from 'next/link';
import { notFound } from 'next/navigation';
import Background from '@/components/Background';
import ObjectImage from '@/components/ObjectImage';
import { IconBack } from '@/components/Icons';
import { COLUMNS, getColumn } from '@/data/columns';
import { getObject } from '@/data/content';

export function generateStaticParams() {
  return COLUMNS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const c = getColumn(id);
  return { title: c ? `${c.title} — universe10` : 'universe10' };
}

export default async function ColumnRead({ params }) {
  const { id } = await params;
  const c = getColumn(id);
  if (!c) notFound();
  const cover = getObject(c.cover);

  return (
    <>
      <Background variant="max" />
      {/* 커버 */}
      <div style={{ position: 'relative', height: 'clamp(240px,40vh,420px)', overflow: 'hidden' }}>
        {cover && <ObjectImage obj={cover} fill />}
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg,rgba(5,7,14,.6) 0%,rgba(5,7,14,.25) 40%,var(--ink) 100%)' }} />
        <Link href="/columns" aria-label="목록으로"
          style={{ position: 'absolute', top: 24, left: 22, color: '#fff' }}>
          <IconBack />
        </Link>
      </div>

      <main className="page" style={{ marginTop: -60, position: 'relative' }}>
        <article className="read fade" style={{ paddingBottom: 70 }}>
          <span className="badge" style={{ color: 'var(--lv2)' }}>관측 칼럼</span>
          <h1 style={{ fontSize: 'clamp(26px,5.4vw,42px)', fontWeight: 800, color: '#fff',
            lineHeight: 1.42, letterSpacing: '-.045em', margin: '20px 0 18px' }}>
            {c.title}
            {c.isTemp && <span className="tmp" style={{ verticalAlign: 'middle' }}>임시</span>}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 12.5,
            color: 'var(--muted)', paddingBottom: 24, borderBottom: '1px solid var(--line)' }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg,#7FA8FF,#E8737F)' }} />
            <span>{c.author} · {c.role}</span>
            <span style={{ color: '#4E5566' }}>·</span>{c.date}
            <span style={{ color: '#4E5566' }}>·</span>{c.readMin}분
          </div>

          <div style={{ marginTop: 32 }}>
            {c.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div style={{ marginTop: 44, paddingTop: 26, borderTop: '1px solid var(--line)',
            fontSize: 12, color: '#69718a' }}>
            사진 · 곽준성 (대한천문회)
          </div>
          <Link href="/columns" style={{ display: 'block', marginTop: 26 }}>
            <span className="btn">다른 칼럼 보기</span>
          </Link>
        </article>
      </main>
    </>
  );
}
