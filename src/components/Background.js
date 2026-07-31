/**
 * 배경 사진 + 스크림.
 * public/bg.jpg 를 넣으면 자동 적용, 없으면 CSS 그라디언트 폴백.
 * variant: 'hero' | 'map' | 'max'
 */
import { asset } from '@/lib/path';

export default function Background({ variant = 'map' }) {
  const cls = { hero: 'scrim-hero', map: 'scrim-map', max: 'scrim-max' }[variant];
  return (
    <>
      <div className="bg" style={{ '--bg-img': `url('${asset('/bg.jpg')}')` }} />
      <div className={`bg-scrim ${cls}`} />
    </>
  );
}
