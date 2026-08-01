'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import ObjectImage from '@/components/ObjectImage';
import { IconBack, IconCheck } from '@/components/Icons';
import { getObject, getLevel, objectsOfLevel } from '@/data/content';
import useProgress from '@/lib/useProgress';
import { levelStats } from '@/lib/progress';

export default function ObjectDetail() {
  const { id } = useParams();
  const router = useRouter();
  const obj = getObject(id);
  const { completed: prog } = useProgress();
  const completed = prog || [];

  if (!obj) {
    return (
      <main className="page" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: 'var(--muted)' }}>존재하지 않는 천체입니다.</p>
        <Link href="/universe" style={{ marginTop: 16, color: 'var(--lv2)' }}>우주 지도로</Link>
      </main>
    );
  }

  const lv = getLevel(obj.level);
  const stats = levelStats(obj.level, completed);
  const done = completed.includes(obj.id);

  return (
    <div className="detail">
      {/* 사진 */}
      <div className="detail-photo" style={{ position: 'relative', minHeight: 380 }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <ObjectImage obj={obj} fill />
        </div>
        {/* 모바일: 아래로 떨어지는 스크림 / 데스크톱은 사진 그대로 */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg,rgba(0,0,0,.6) 0%,transparent 22%,transparent 44%,var(--ink) 100%)',
        }} className="photo-scrim" />
        <button onClick={() => router.back()}
          style={{ position: 'absolute', top: 24, left: 22, color: '#fff' }}
          aria-label="뒤로">
          <IconBack />
        </button>

        {/* 모바일에서만 사진 위에 타이틀 */}
        <div className="mobile-title" style={{
          position: 'absolute', left: 22, right: 22, bottom: 24 }}>
          <span className="badge" style={{ color: lv.color }}>Lv.{lv.id} {lv.name}</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff',
            letterSpacing: '-.04em', marginTop: 11 }}>{obj.nameKo}</h1>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
            {obj.catalog ? `${obj.catalog} · ` : ''}{obj.distance}
          </div>
        </div>
      </div>

      {/* 텍스트 */}
      <div className="detail-text" style={{ padding: '26px 22px 34px' }}>
        <div className="desktop-title" style={{ display: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span className="badge" style={{ color: lv.color }}>Lv.{lv.id} {lv.name}</span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              {stats.done} / {stats.total}
            </span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', letterSpacing: '-.04em' }}>
            {obj.nameKo}
          </h1>
          <div style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 8 }}>
            {obj.nameEn}{obj.catalog ? ` · ${obj.catalog}` : ''} · {obj.distance}
          </div>
          <div style={{ height: 1, background: 'var(--line)', margin: '30px 0' }} />
        </div>

        <div style={{ fontSize: 11, color: '#6B7383', marginBottom: 22 }}>
          촬영 · 곽준성 (대한천문회)
        </div>

        <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 14 }}>
          관측 일지
          {obj.isTemp && <span className="tmp" style={{ letterSpacing: 0 }}>임시</span>}
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.95, color: 'var(--text)', flex: 1 }}>
          {obj.log}
        </p>

        <div style={{ marginTop: 30, display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link href={`/quiz/${obj.id}`} style={{ flex: 1 }}>
            <span className="btn btn-p">
              {done ? '퀴즈 다시 풀기' : '확장 퀴즈 풀기'}
            </span>
          </Link>
          {done && (
            <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              display: 'grid', placeItems: 'center',
              border: '1px solid rgba(95,214,154,.4)', background: 'rgba(95,214,154,.12)' }}>
              <IconCheck size={22} style={{ color: 'var(--ok)' }} />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          .photo-scrim { display: none; }
          .mobile-title { display: none; }
          .desktop-title { display: block !important; }
        }
      `}</style>
    </div>
  );
}
