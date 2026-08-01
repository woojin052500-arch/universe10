import { redirect } from 'next/navigation';

/** 탐색 탭이 우주 지도로 합쳐졌습니다. 예전 주소는 그대로 이어집니다. */
export default function Collection() {
  redirect('/universe');
}
