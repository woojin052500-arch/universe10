'use client';
import { useState } from 'react';
import { asset } from '@/lib/path';

/**
 * 천체 사진.
 * 사진이 없거나(placeholder) 로드 실패하면 톤에 맞춘 기본화면으로 대체합니다.
 * 워터마크는 원본 사진 안에 있으므로 별도 처리하지 않습니다.
 */
export default function ObjectImage({ obj, fill = false, radius = 0, dim = false }) {
  const [failed, setFailed] = useState(false);
  const isPh = obj.image.status !== 'ready' || failed;

  const box = {
    position: 'relative', width: '100%',
    height: fill ? '100%' : undefined,
    aspectRatio: fill ? undefined : '1',
    borderRadius: radius, overflow: 'hidden', background: '#07060B',
  };

  if (isPh) {
    const t = obj.image.tint || '#8A93A8';
    return (
      <div style={{ ...box, display: 'grid', placeItems: 'center',
        background: `radial-gradient(circle at 50% 44%, ${t}1F, #07060B 68%)` }}>
        {/* 별 */}
        <div style={{ position: 'absolute', inset: 0, opacity: .5,
          backgroundImage: `
            radial-gradient(1px 1px at 14% 18%,#fff,transparent),
            radial-gradient(1px 1px at 72% 12%,#fff,transparent),
            radial-gradient(1.4px 1.4px at 86% 62%,#fff,transparent),
            radial-gradient(1px 1px at 24% 74%,#fff,transparent),
            radial-gradient(1px 1px at 58% 88%,#fff,transparent),
            radial-gradient(1px 1px at 92% 30%,#fff,transparent)` }} />
        {/* 궤도 링 */}
        <div style={{ position: 'absolute', width: '58%', aspectRatio: 1,
          borderRadius: '50%', border: `1px solid ${t}26`, top: '44%',
          left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div style={{ position: 'absolute', width: '40%', aspectRatio: 1,
          borderRadius: '50%', border: `1px dashed ${t}33`, top: '44%',
          left: '50%', transform: 'translate(-50%,-50%)' }} />
        {/* 코어 */}
        <div style={{ position: 'absolute', top: '44%', left: '50%',
          transform: 'translate(-50%,-50%)', width: '19%', aspectRatio: 1,
          borderRadius: '50%',
          background: `radial-gradient(circle at 38% 32%, #fff, ${t} 34%, ${t}44 68%, transparent 78%)`,
          boxShadow: `0 0 60px ${t}55, 0 0 140px ${t}22` }} />
        <div style={{ position: 'absolute', bottom: '11%', left: 0, right: 0,
          textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(11px,2.6vw,15px)', color: '#fff', fontWeight: 700 }}>
            {obj.nameKo}
          </div>
          <div style={{ fontSize: 'clamp(9px,2vw,11.5px)', color: '#7A8296', marginTop: 5,
            letterSpacing: '.5px' }}>
            관측 사진 준비 중
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={box}>
      <img
        src={asset(`/objects/${obj.image.slug}.jpg`)}
        alt={`${obj.nameKo} — 촬영 곽준성`}
        loading="lazy"
        onError={() => setFailed(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          filter: dim ? 'brightness(.72)' : undefined,
          transition: 'transform .5s cubic-bezier(.16,1,.3,1), filter .3s' }}
      />
    </div>
  );
}
