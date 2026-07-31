/**
 * GitHub Pages는 /universe10/ 하위 경로로 서빙되므로
 * public/ 자산 경로 앞에 basePath를 붙여야 합니다.
 * 로컬 개발(npm run dev)에서는 빈 문자열이라 그대로 동작합니다.
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (p) => `${BASE}${p}`;
