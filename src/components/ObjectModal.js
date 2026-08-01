'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import ObjectImage from './ObjectImage';
import { IconClose, IconCheck, IconLock, IconNext } from './Icons';
import { getLevel } from '@/data/content';
import { apparentSize, raText, decText } from '@/data/sky';

export default function ObjectModal({ payload, onClose }) {
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [onClose]);

  if (!payload) return null;
  const { node, unlocked, done } = payload;
  const o = node.obj, s = node.sky, lv = getLevel(o.level);

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="닫기"><IconClose size={18} /></button>

        <div className="modal-photo">
          <ObjectImage obj={o} fill />
          <div className="modal-photo-veil" />
          <div className="modal-photo-meta">
            <span className="badge" style={{ color: lv.color }}>
              Lv.{lv.id} {lv.name}
            </span>
            {done && (
              <span className="badge" style={{ color: 'var(--ok)', marginLeft: 6 }}>
                <IconCheck size={11} style={{ verticalAlign: -2, marginRight: 3 }} />수집함
              </span>
            )}
          </div>
        </div>

        <div className="modal-body">
          <h2 style={{ fontSize: 'clamp(21px,4.6vw,27px)', fontWeight: 800, color: '#fff',
            letterSpacing: '-.04em' }}>
            {o.nameKo}{o.isTemp && <span className="tmp">임시</span>}
          </h2>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
            {o.nameEn}{o.catalog ? ` · ${o.catalog}` : ''}
          </div>

          {/* 실제 관측 제원 */}
          <div className="spec">
            <div><b>거리</b><span>{o.distance}</span></div>
            <div><b>겉보기 크기</b><span>{apparentSize(s.arcmin)}</span></div>
            <div><b>적경 · 적위</b><span>{raText(s.ra)} · {decText(s.dec)}</span></div>
          </div>
          {s.moving && (
            <p className="note-line">태양계 천체라 하늘에서의 위치가 계속 바뀝니다. 지도에는 대표 위치로 표시했습니다.</p>
          )}
          {s.point && (
            <p className="note-line">망원경으로도 크기가 보이지 않는 점광원입니다. 지도에서는 찾기 쉽게 키워 그렸습니다.</p>
          )}

          <p style={{ fontSize: 14.5, lineHeight: 1.9, color: 'var(--text)', marginTop: 18 }}>
            {o.log}
          </p>
          <div style={{ fontSize: 11, color: '#69718a', marginTop: 14 }}>
            촬영 · 곽준성 (대한천문회)
          </div>

          <div style={{ marginTop: 22, display: 'flex', gap: 9 }}>
            {unlocked ? (
              <Link href={`/quiz/${o.id}`} style={{ flex: 1 }}>
                <span className="btn btn-p">
                  {done ? '퀴즈 다시 풀기' : '퀴즈 풀고 영역 넓히기'}
                  <IconNext size={15} style={{ verticalAlign: -3, marginLeft: 5 }} />
                </span>
              </Link>
            ) : (
              <div className="btn" style={{ flex: 1, opacity: .55, cursor: 'default' }}>
                <IconLock size={14} style={{ verticalAlign: -2, marginRight: 6 }} />
                Lv.{lv.id - 1}을 더 탐사하면 열립니다
              </div>
            )}
            <Link href={`/object/${o.id}`} className="btn" style={{ width: 'auto', padding: '16px 20px' }}>
              자세히
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
