import { OBJECTS } from '@/data/content';
import ObjectDetail from './ObjectDetail';

// static export용 — 천체 15개 페이지를 미리 생성
export function generateStaticParams() {
  return OBJECTS.map((o) => ({ id: o.id }));
}

export default function Page() {
  return <ObjectDetail />;
}
