// ─────────────────────────────────────────────
//  실제 천구 좌표 + 겉보기 크기
//
//  ra   : 적경 (시간, 0~24)
//  dec  : 적위 (도)
//  arcmin : 겉보기 지름 (분각). 하늘에서 실제로 차지하는 크기.
//           참고 — 보름달이 약 31′ 입니다.
//
//  ※ 태양계 천체는 하늘에서 계속 움직이므로 대표 위치를 씁니다.
//    (황도 위에 적당히 분산 배치)
// ─────────────────────────────────────────────

export const SKY = {
  // ── 태양계 (위치는 대표값) ──
  moon:      { ra: 4.2,  dec:  18, arcmin: 31,    moving: true },
  sun:       { ra: 6.4,  dec:  23, arcmin: 32,    moving: true },
  mars:      { ra: 10.1, dec:  12, arcmin: 0.42,  moving: true },
  jupiter:   { ra: 13.8, dec:  -5, arcmin: 0.75,  moving: true },
  saturn:    { ra: 17.9, dec: -22, arcmin: 0.31,  moving: true },

  // ── 딥스카이 ──
  m45:       { ra: 3.79,  dec:  24.1, arcmin: 110 },
  orion:     { ra: 5.50,  dec:   0.0, arcmin: 600 },   // 별자리 전체
  m42:       { ra: 5.59,  dec:  -5.4, arcmin: 85  },
  horsehead: { ra: 5.68,  dec:  -2.5, arcmin: 60  },
  veil:      { ra: 20.76, dec:  30.7, arcmin: 180 },
  ngc7000:   { ra: 20.98, dec:  44.5, arcmin: 120 },
  cygnus:    { ra: 20.60, dec:  42.0, arcmin: 900 },   // 별자리 전체
  m57:       { ra: 18.89, dec:  33.0, arcmin: 1.4 },
  ic2177:    { ra: 7.09,  dec: -10.6, arcmin: 120 },
  ic443:     { ra: 6.29,  dec:  22.5, arcmin: 50  },
  rosette:   { ra: 6.53,  dec:   4.9, arcmin: 80  },
  m20:       { ra: 18.04, dec: -23.0, arcmin: 28  },
  m17:       { ra: 18.34, dec: -16.2, arcmin: 11  },
  lobster:   { ra: 17.42, dec: -34.2, arcmin: 50  },
  m1:        { ra: 5.58,  dec:  22.0, arcmin: 7   },
  ic1805:    { ra: 2.55,  dec:  61.5, arcmin: 150 },
  m13:       { ra: 16.69, dec:  36.5, arcmin: 20  },

  // ── 심우주 ──
  neutron:   { ra: 5.58,  dec:  22.0, arcmin: 0.0000002, point: true }, // 게성운 펄서
  blackhole: { ra: 17.76, dec: -29.0, arcmin: 0.00008,   point: true }, // 궁수자리 A*
  m31:       { ra: 0.71,  dec:  41.3, arcmin: 190 },
  m33:       { ra: 1.56,  dec:  30.7, arcmin: 70  },
  m81:       { ra: 9.93,  dec:  69.1, arcmin: 27  },
  m82:       { ra: 9.93,  dec:  69.7, arcmin: 11  },
  m101:      { ra: 14.05, dec:  54.3, arcmin: 29  },
  quasar:    { ra: 12.49, dec:   2.1, arcmin: 0.0004, point: true },    // 3C 273
};

/* 겉보기 크기를 사람이 읽는 문자열로 */
export function apparentSize(arcmin) {
  if (arcmin >= 60) return `${(arcmin / 60).toFixed(1)}°`;
  if (arcmin >= 1)  return `${arcmin.toFixed(arcmin < 10 ? 1 : 0)}′`;
  if (arcmin >= 1 / 60) return `${(arcmin * 60).toFixed(1)}″`;
  return '점광원';
}

/* 적경을 시:분 표기로 */
export function raText(ra) {
  const h = Math.floor(ra);
  const m = Math.round((ra - h) * 60);
  return `${h}h ${String(m).padStart(2, '0')}m`;
}
export const decText = (dec) => `${dec >= 0 ? '+' : '−'}${Math.abs(dec).toFixed(1)}°`;
