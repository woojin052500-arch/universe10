'use client';
import { getLevel } from '@/data/content';

/**
 * 레벨업 줌아웃 연출 — 서비스 정체성.
 * 동심원이 화면 밖으로 확장되며 스케일 숫자가 바뀝니다.
 */
export default function LevelUpOverlay({ fromScale, toScale, levelId, onClose }) {
  const lv = getLevel(levelId);
  const color = lv?.color || 'var(--lv2)';
  const sizes = [560, 400, 260, 150];

  return (
    <div className="levelup">
      <div className="lu-rings">
        {sizes.map((s, i) => (
          <div key={s} className="lu-ring"
            style={{
              width: s, height: s,
              border: `${i === sizes.length - 1 ? 1.5 : 1}px solid ${color}`,
              opacity: 0,
              boxShadow: i === sizes.length - 1 ? `0 0 80px ${color}55` : 'none',
              animationDelay: `${i * 0.12}s`,
              // 바깥 원일수록 흐리게
              borderColor: color + ['1A', '2E', '4D', 'FF'][i],
            }} />
        ))}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)', width: 14, height: 14,
          borderRadius: '50%', background: '#fff', boxShadow: '0 0 30px #fff',
        }} />
      </div>

      <div className="lu-copy">
        <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 14 }}>
          나의 우주가 넓어졌습니다
        </div>
        <div style={{ fontSize: 13, color: '#6B7383', textDecoration: 'line-through' }}>
          {fromScale}
        </div>
        <div style={{
          fontSize: 'clamp(38px,9vw,76px)', fontWeight: 800, color: '#fff',
          letterSpacing: '-.04em', margin: '4px 0 22px',
        }}>{toScale}</div>
        <span className="badge" style={{ color }}>
          Lv.{levelId} {lv?.name} 해금
        </span>
        <div style={{ maxWidth: 380, margin: '30px auto 0' }}>
          <button className="btn btn-p" onClick={onClose}>계속 넓히기</button>
        </div>
      </div>
    </div>
  );
}
