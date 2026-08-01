/* 결정적 난수 — 새로고침해도 별자리가 같도록 */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** 월드 좌표에 뿌릴 배경 별
 *  중심(가까운 우주)보다 바깥(먼 우주)이 조금 더 촘촘하게 */
export function makeStars(count = 1100, rMax = 2500, seed = 20260801) {
  const r = rng(seed);
  const out = [];
  for (let i = 0; i < count; i++) {
    const a = r() * Math.PI * 2;
    const rad = Math.sqrt(r()) * rMax;           // 면적 균등
    const mag = r();                              // 0=밝음 1=어두움
    const size = 0.45 + Math.pow(1 - mag, 3.2) * 2.6;
    // 실제 별색 — 대부분 흰~푸른, 일부 노랑·주황
    const t = r();
    const color = t > 0.90 ? '#FFD9B0' : t > 0.80 ? '#FFE9CE'
      : t > 0.36 ? '#FFFFFF' : '#DCE6FF';
    out.push({
      x: +(Math.cos(a) * rad).toFixed(1),
      y: +(Math.sin(a) * rad).toFixed(1),
      s: +size.toFixed(2),
      o: +(0.18 + Math.pow(1 - mag, 2.1) * 0.82).toFixed(2),
      c: color,
    });
  }
  return out;
}
