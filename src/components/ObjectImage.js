'use client';
import { useState } from 'react';

/**
 * 천체 사진. image.status === 'placeholder' 이거나
 * 파일이 없어서 로드 실패하면 기본화면(실루엣)으로 대체합니다.
 * 워터마크는 원본 사진 안에 있으므로 별도 처리하지 않습니다.
 */
export default function ObjectImage({ obj, fill = false, radius = 0 }) {
  const [failed, setFailed] = useState(false);
  const isPlaceholder = obj.image.status !== 'ready' || failed;

  const box = {
    position: 'relative', width: '100%',
    height: fill ? '100%' : undefined,
    aspectRatio: fill ? undefined : '1',
    borderRadius: radius, overflow: 'hidden', background: '#08060B',
  };

  if (isPlaceholder) {
    const tint = obj.image.tint || '#8A93A8';
    return (
      <div style={{ ...box, display: 'grid', placeItems: 'center',
        background: `radial-gradient(circle at 50% 46%, ${tint}22, #05070E 70%)` }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 92, height: 92, borderRadius: '50%', margin: '0 auto 16px',
            background: `radial-gradient(circle at 38% 34%, ${tint}, ${tint}22 62%, transparent)`,
            boxShadow: `0 0 60px ${tint}33`,
          }} />
          <div style={{ fontSize: 15, color: '#fff', fontWeight: 700 }}>{obj.nameKo}</div>
          <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 6 }}>
            관측 사진 준비 중
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={box}>
      {/* next/image 대신 img — 외부 최적화 설정 없이 바로 동작 */}
      <img
        src={`/objects/${obj.image.slug}.jpg`}
        alt={`${obj.nameKo} — 촬영 곽준성`}
        onError={() => setFailed(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}
