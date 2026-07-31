<div align="center">

# 🌌 universe10

### 나만의 우주 넓히기 — Expanding Your Own Universe

**"내가 아는 만큼이 나의 우주입니다."**

10대 천문학자가 직접 촬영한 밤하늘로<br>
퀴즈를 풀며 자신의 우주 스케일을 넓혀가는 게이미피케이션 에듀테크 웹앱

<br>

![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-준비중-3ECF8E?style=flat-square&logo=supabase)
![Status](https://img.shields.io/badge/status-MVP-E8737F?style=flat-square)

</div>

---

## 기획 배경

입시 위주의 교육 환경 속에서 10대 청소년들은 교과서 속 지식에 갇혀 넓은 세상을 경험할 기회가 부족합니다.

영하 20도의 산꼭대기에서 120kg의 장비를 이끌고 밤하늘을 기록하는 10대 천문학자의 사례처럼, 세상을 바라보는 **시각과 지식의 크기가 곧 개인의 세계관을 결정**합니다.

> 옆집 소식을 알면 나의 우주는 5미터,<br>
> 태양계의 운동을 알면 1AU,<br>
> 우주의 끝을 알면 1광년.<br>
> **내가 아는 만큼이 곧 나의 우주입니다.**
>
> — 곽준성 (대한천문회 회장)

## 팀

| 역할 | 담당 |
|---|---|
| 서비스 총괄 기획 · 프론트/백엔드 개발 · 인프라 · 마케팅 | **염우진** (WJedulab) |
| 천문 도메인 지식 · 천체 사진 · 관측 일지 · 전문성 감수 | **곽준성** (대한천문회 회장) |

---

## 핵심 기능

### 우주 확장 시스템

유저는 퀴즈를 풀며 자신의 **우주 스케일**을 단계별로 확장합니다. 도달한 가장 먼 천체의 거리가 곧 그 사람의 우주 크기가 됩니다.

| 레벨 | 이름 | 스케일 | 천체 수 | 해금 조건 |
|:---:|---|---|:---:|---|
| **Lv.1** | 태양계 | 1 AU | 4 | 처음부터 열림 |
| **Lv.2** | 딥스카이 입문 | 수천 광년 | 7 | Lv.1에서 3개 완료 |
| **Lv.3** | 심우주 | 수백만 광년 | 4 | Lv.2에서 4개 완료 |

### 화면 플로우

```
랜딩 → 우주 지도(동심원) → 천체 상세 → 확장 퀴즈 → 레벨업 줌아웃 연출 ↺
```

- **우주 지도** — 레벨이 동심원으로 표현되고, 중심의 흰 점이 '나'. 잠긴 레벨은 점선 처리
- **천체 상세** — 곽준성 회장이 촬영한 원본 사진 + 관측 일지
- **확장 퀴즈** — 3지선다. 선택 즉시 채점, 오답이면 정답도 함께 하이라이트
- **레벨업 연출** — 동심원이 화면 밖으로 확장되며 스케일 숫자가 바뀌는 줌아웃 애니메이션. **서비스 정체성**

---

## 시작하기

```bash
npm install
npm run dev
```

→ http://localhost:3000

빌드:

```bash
npm run build && npm start
```

---

## 프로젝트 구조

```
src/
├── app/
│   ├── page.js              랜딩
│   ├── universe/            우주 지도 (메인) — 동심원 3겹
│   ├── object/[id]/         천체 상세
│   ├── quiz/[id]/           퀴즈 + 레벨업 트리거
│   ├── me/                  마이페이지 (진도 초기화)
│   ├── collection/          도감 — Phase 2
│   ├── columns/             관측 칼럼 — Phase 2
│   └── globals.css          ★ 디자인 토큰 전부 여기
├── components/
│   ├── Icons.js             SVG 아이콘 9종
│   ├── Background.js        배경 + 스크림 (hero / map / max)
│   ├── ObjectImage.js       사진 없으면 기본화면으로 자동 대체
│   ├── LevelUpOverlay.js    ★ 줌아웃 연출
│   └── TabBar.js            모바일 하단 탭
├── data/
│   └── content.js           ★ 천체 15개 전체 데이터
└── lib/
    ├── progress.js          진도 (localStorage)
    └── supabase.js          연동 준비 — 현재 미사용
```

---

## 콘텐츠 관리

모든 천체 데이터는 **`src/data/content.js` 한 파일**에 있습니다.

```js
{
  id: 'm42',
  level: 2,
  nameKo: '오리온 대성운',
  catalog: 'M42',
  scaleLabel: '1,344 광년',
  ly: 1344,                                  // 우주 스케일 계산용
  image: { status: 'ready', slug: 'm42' },   // public/objects/m42.jpg
  log: '오리온 대성운은 새로운 별들이...',
  quiz: { q: '...', options: [...], answer: 0, explain: '...' },
  isTemp: false,                             // true면 화면에 '임시' 뱃지
}
```

### 임시 콘텐츠

`isTemp: true`인 항목 **9개**는 곽준성 회장 감수 전 임시 텍스트입니다. 화면에 `임시` 뱃지가 붙습니다.

감수 후 텍스트를 교체하고 `isTemp: false`로 바꿔주세요.

### 사진

`public/objects/{slug}.jpg` 로 넣으면 자동으로 붙습니다. **파일이 없으면 앱이 깨지지 않고 기본화면(실루엣)으로 대체**됩니다.

현재 없는 사진 3개: `sun` · `m13` · `m17`

자세한 목록은 [`public/README.txt`](public/README.txt) 참고.

---

## 디자인 시스템

배경 사진(말머리성운)의 발광색에서 팔레트를 추출했습니다.

| 토큰 | 값 | 용도 |
|---|---|---|
| `--ink` | `#05070E` | 배경 |
| `--lv1` | `#E8D9C0` | Lv.1 태양계 |
| `--lv2` | `#7FA8FF` | Lv.2 딥스카이 |
| `--lv3` | `#E8737F` | Lv.3 심우주 |
| `--text` | `#DCE1EA` | 본문 (**순백 금지** — 다크 배경에서 눈부심) |
| `--muted` | `#98A0B2` | 보조 텍스트 |

### 스크림 규칙

천체 사진 위에 흰 텍스트를 그냥 올리면 읽히지 않습니다. 화면별로 오버레이 강도를 다르게 적용합니다.

| 화면 | variant | 강도 | 블러 |
|---|---|---|---|
| 랜딩 | `hero` | 그라디언트 (하단 .99) | — |
| 우주 지도 | `map` | 0.89 | 14px |
| 퀴즈 · 마이 | `max` | 0.95 | 20px |

데스크톱(900px↑)에서는 랜딩 스크림이 **세로 → 가로 방향**으로 바뀝니다.

---

## 로드맵

- [x] **Phase 1** — 서비스 기획 확정, 파트너십 체결
- [x] **Phase 2-1** — 핵심 루프 (지도 → 상세 → 퀴즈 → 레벨업)
- [x] 천체 사진 12장 적용
- [ ] 태양 · M13 · M17 사진 확보
- [ ] 임시 콘텐츠 9개 감수
- [ ] 도감 · 관측 칼럼 화면
- [ ] Supabase 로그인 + 진도 서버 저장
- [ ] **Phase 3** — 클로즈 베타 (CBT)
- [ ] **Phase 4** — 정식 런칭

---

## 알려진 제약

- 진도는 **브라우저 localStorage**에 저장됩니다. 기기를 바꾸면 초기화됩니다. → Supabase 연동 시 해결
- `/universe`, `/me`는 localStorage를 읽어야 해서 첫 프레임이 잠깐 비어 있습니다.

---

## 크레딧

모든 천체 사진 촬영 · **곽준성** (대한천문회)

일부 사진은 대상이 작아 중앙 확대 크롭했으며, 이 과정에서 원본 워터마크가 잘렸습니다.
대신 천체 상세 화면에 촬영자 크레딧을 표시합니다.

<br>

<div align="center">

**@10s_interview** · WJedulab

</div>
