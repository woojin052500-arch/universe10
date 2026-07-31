// ─────────────────────────────────────────────
//  universe10 — MVP 콘텐츠 데이터
//  isTemp: true → 임시 텍스트 (곽준성 회장 감수 후 교체)
//  image.status: "ready" = public/objects/{slug}.jpg
//                "placeholder" = 사진 없음 → 기본화면 컴포넌트
// ─────────────────────────────────────────────

export const LEVELS = [
  {
    id: 1,
    name: '태양계',
    scaleLabel: '1 AU',
    color: '#E8D9C0',
    desc: '우리 동네부터. 맨눈과 작은 망원경으로 닿는 거리.',
    unlockAt: 0,  // 이 레벨을 열기 위해 이전 레벨에서 완료해야 하는 개수
  },
  {
    id: 2,
    name: '딥스카이 입문',
    scaleLabel: '수천 광년',
    color: '#7FA8FF',
    desc: '우리은하 안쪽. 별이 태어나고 죽는 현장.',
    unlockAt: 3,
  },
  {
    id: 3,
    name: '심우주',
    scaleLabel: '수백만 광년',
    color: '#E8737F',
    desc: '은하 너머. 지금 보는 빛은 인류가 없던 시절 출발했다.',
    unlockAt: 4,
  },
];

export const OBJECTS = [
  // ── Lv.1 태양계 ──
  {
    id: 'moon', level: 1, nameKo: '달', nameEn: 'Moon', catalog: null,
    distance: '약 38만 km', scaleLabel: '1.3 광초', ly: 4.0e-8,
    image: { status: 'ready', slug: 'moon' },
    log: '달은 망원경으로 관측할 때마다 새로운 모습을 보여주는 천체입니다. 특히 밝은 부분과 어두운 부분의 경계에서는 크레이터와 산맥이 더욱 선명하게 보이며, 같은 달이라도 관측 시기에 따라 다른 모습을 확인할 수 있습니다.',
    quiz: { q: '달에서 가장 많이 볼 수 있는 지형은 무엇일까요?', options: ['화산', '크레이터', '강'], answer: 1,
      explain: '달 표면에는 운석 충돌로 생긴 <b>크레이터</b>가 셀 수 없이 많습니다.' },
    isTemp: false,
  },
  {
    id: 'sun', level: 1, nameKo: '태양', nameEn: 'Sun', catalog: null,
    distance: '약 1억 5천만 km', scaleLabel: '1 AU', ly: 1.58e-5,
    image: { status: 'placeholder', tint: '#FFD98A' },
    log: '태양은 항상 같은 모습처럼 보이지만 실제로는 계속 변화하는 천체입니다. 흑점의 이동과 변화를 관측하면 태양의 자전과 활동 변화를 직접 확인할 수 있습니다.',
    quiz: { q: '태양 표면에 나타나는 검은 영역은 무엇일까요?', options: ['흑점', '구름', '운석'], answer: 0,
      explain: '주변보다 온도가 낮아 어둡게 보이는 <b>흑점</b>입니다.' },
    isTemp: false,
  },
  {
    id: 'jupiter', level: 1, nameKo: '목성', nameEn: 'Jupiter', catalog: null,
    distance: '약 7억 8천만 km', scaleLabel: '5.2 AU', ly: 8.2e-5,
    image: { status: 'ready', slug: 'jupiter' },
    log: '목성은 태양계에서 가장 큰 행성으로, 망원경으로 보면 표면의 줄무늬와 함께 갈릴레이 위성들을 관측할 수 있습니다. 위성들의 위치는 매일 변하기 때문에 같은 목성이라도 관측할 때마다 새로운 모습을 보여줍니다.',
    quiz: { q: '목성의 가장 큰 위성은 무엇일까요?', options: ['이오', '유로파', '가니메데'], answer: 2,
      explain: '<b>가니메데</b>는 태양계에서 가장 큰 위성으로, 수성보다도 큽니다.' },
    isTemp: false,
  },
  {
    id: 'saturn', level: 1, nameKo: '토성', nameEn: 'Saturn', catalog: null,
    distance: '약 14억 km', scaleLabel: '9.5 AU', ly: 1.5e-4,
    image: { status: 'ready', slug: 'saturn' },
    log: '토성은 망원경을 처음 들여다본 사람이 가장 크게 놀라는 천체입니다. 작은 망원경으로도 고리가 뚜렷하게 보이며, 고리는 지구에서 보는 각도가 해마다 조금씩 달라져 어떤 해에는 활짝 열려 보이고 어떤 해에는 거의 선처럼 가늘게 보입니다.',
    quiz: { q: '토성의 고리는 주로 무엇으로 이루어져 있을까요?', options: ['얼음과 암석 조각', '기체', '액체'], answer: 0,
      explain: '토성의 고리는 대부분 <b>얼음 조각</b>과 약간의 암석 부스러기입니다.' },
    isTemp: true,
  },

  // ── Lv.2 딥스카이 입문 ──
  {
    id: 'm45', level: 2, nameKo: '플레이아데스 성단', nameEn: 'Pleiades Cluster', catalog: 'M45 · NGC1432',
    distance: '약 444광년', scaleLabel: '444 광년', ly: 444,
    image: { status: 'ready', slug: 'm45' },
    log: '플레이아데스 성단은 맨눈으로도 볼 수 있는 대표적인 산개성단입니다. 여러 개의 푸른 별들이 모여 있는 모습 때문에 오래전부터 다양한 문화에서 신화와 이야기의 소재가 되어왔습니다.',
    quiz: { q: '플레이아데스 성단의 종류는 무엇일까요?', options: ['은하', '산개성단', '성운'], answer: 1,
      explain: '별들이 느슨하게 모여 있는 <b>산개성단</b>입니다.' },
    isTemp: false,
  },
  {
    id: 'm42', level: 2, nameKo: '오리온 대성운', nameEn: 'Orion Nebula', catalog: 'M42',
    distance: '약 1,344광년', scaleLabel: '1,344 광년', ly: 1344,
    image: { status: 'ready', slug: 'm42' },
    log: '오리온 대성운은 새로운 별들이 태어나고 있는 거대한 성운입니다. 망원경과 카메라를 이용하면 붉게 빛나는 가스 구조와 내부의 어린 별들을 확인할 수 있으며, 대표적인 겨울철 딥스카이 대상입니다.',
    quiz: { q: '오리온 대성운은 어떤 천체가 만들어지는 장소일까요?', options: ['별', '행성', '블랙홀'], answer: 0,
      explain: '성운 안쪽의 가스가 뭉치면서 새로운 <b>별</b>이 만들어집니다.' },
    isTemp: false,
  },
  {
    id: 'ic443', level: 2, nameKo: '해파리 성운', nameEn: 'Jellyfish Nebula', catalog: 'IC 443',
    distance: '약 5,000광년', scaleLabel: '5,000 광년', ly: 5000,
    image: { status: 'ready', slug: 'ic443' },
    log: '해파리 성운은 별이 태어나는 곳이 아니라 별이 죽은 자리입니다. 수천 년 전 폭발한 초신성의 잔해가 지금도 사방으로 퍼져나가고 있으며, 길게 늘어진 가스 필라멘트가 해파리의 촉수처럼 보여 이런 이름이 붙었습니다.',
    quiz: { q: '해파리 성운은 무엇의 흔적일까요?', options: ['별의 탄생', '초신성 폭발', '혜성의 꼬리'], answer: 1,
      explain: '거대한 별이 수명을 다하며 폭발한 <b>초신성 잔해</b>입니다.' },
    isTemp: true,
  },
  {
    id: 'm20', level: 2, nameKo: '삼렬성운', nameEn: 'Trifid Nebula', catalog: 'M20 · NGC 6514',
    distance: '약 5,200광년', scaleLabel: '5,200 광년', ly: 5200,
    image: { status: 'ready', slug: 'm20' },
    log: '삼렬성운은 궁수자리 방향에 있는 성운으로, 붉은 발광성운과 푸른 반사성운이 한 화면에 같이 담기는 보기 드문 대상입니다. 성운 가운데를 가로지르는 어두운 먼지 띠가 전체를 세 갈래로 나누는 것처럼 보여 삼렬(三裂)이라는 이름이 붙었습니다.',
    quiz: { q: '삼렬성운의 이름은 무엇에서 유래했을까요?', options: ['별 세 개가 모여 있어서', '어두운 먼지 띠가 성운을 세 갈래로 나눠서', '세 번에 걸쳐 발견돼서'], answer: 1,
      explain: '<b>어두운 먼지 띠</b>가 성운을 셋으로 갈라놓은 것처럼 보입니다.' },
    isTemp: true,
  },
  {
    id: 'm17', level: 2, nameKo: '오메가 성운', nameEn: 'Omega Nebula', catalog: 'M17 · NGC6618',
    distance: '약 5,500광년', scaleLabel: '5,500 광년', ly: 5500,
    image: { status: 'ready', slug: 'm17' },
    log: '오메가 성운은 우리은하에서 가장 활발하게 별이 만들어지고 있는 곳 중 하나입니다. 밝은 부분의 형태가 그리스 문자 오메가처럼 보인다고 해서 이 이름이 붙었지만, 물 위에 뜬 백조를 닮았다고 해서 백조 성운으로도 불립니다.',
    quiz: { q: '오메가 성운의 또 다른 이름은 무엇일까요?', options: ['백조 성운', '독수리 성운', '말머리 성운'], answer: 0,
      explain: '물 위에 뜬 백조를 닮아 <b>백조 성운</b>이라고도 부릅니다.' },
    isTemp: true,
  },
  {
    id: 'ic1805', level: 2, nameKo: '하트 성운', nameEn: 'Heart Nebula', catalog: 'IC 1805',
    distance: '약 7,500광년', scaleLabel: '7,500 광년', ly: 7500,
    image: { status: 'ready', slug: 'ic1805' },
    log: '하트 성운은 카시오페이아자리 방향에 있는 거대한 발광성운입니다. 성운 한가운데 있는 젊고 뜨거운 별들이 주변 수소 가스를 달구면서 붉은빛을 내고, 그 형태가 심장을 닮아 하트 성운이라 불립니다.',
    quiz: { q: '하트 성운이 붉게 보이는 이유는 무엇일까요?', options: ['수소 가스가 빛을 내기 때문', '온도가 아주 낮기 때문', '먼지가 노을을 반사하기 때문'], answer: 0,
      explain: '뜨거운 별에 달궈진 <b>수소 가스</b>가 붉은빛을 냅니다.' },
    isTemp: true,
  },
  {
    id: 'm13', level: 2, nameKo: '헤라클레스 구상성단', nameEn: 'Hercules Globular Cluster', catalog: 'M13 · NGC6205',
    distance: '약 22,000광년', scaleLabel: '22,000 광년', ly: 22000,
    image: { status: 'ready', slug: 'm13' },
    log: 'M13은 수십만 개의 별이 공 모양으로 빽빽하게 뭉쳐 있는 구상성단입니다. 우리은하가 만들어지던 초기에 함께 태어난 아주 오래된 별들의 집단이라, 이 성단을 본다는 건 우리은하의 가장 나이 든 부분을 들여다보는 일과 같습니다.',
    quiz: { q: '구상성단의 가장 큰 특징은 무엇일까요?', options: ['별들이 공 모양으로 빽빽하게 모여 있다', '가스로만 이루어져 있다', '행성들이 모여 있다'], answer: 0,
      explain: '수십만 개의 별이 <b>공 모양</b>으로 뭉쳐 있습니다.' },
    isTemp: true,
  },

  // ── Lv.3 심우주 ──
  {
    id: 'm31', level: 3, nameKo: '안드로메다 은하', nameEn: 'Andromeda Galaxy', catalog: 'M31',
    distance: '약 250만 광년', scaleLabel: '250만 광년', ly: 2.5e6,
    image: { status: 'ready', slug: 'm31' },
    log: '안드로메다 은하는 우리은하와 가장 가까운 거대 나선은하입니다. 약 250만 년 전에 출발한 빛을 우리가 지금 보고 있으며, 망원경을 통해 먼 우주의 과거를 관측할 수 있는 대표적인 심우주 천체입니다.',
    quiz: { q: '안드로메다 은하는 지구에서 약 얼마나 떨어져 있을까요?', options: ['25만 광년', '250만 광년', '2500만 광년'], answer: 1,
      explain: '<b>250만 광년</b>. 지금 보는 빛은 인류가 등장하기도 전에 출발했습니다.' },
    isTemp: false,
  },
  {
    id: 'm33', level: 3, nameKo: '삼각형자리 은하', nameEn: 'Triangulum Galaxy', catalog: 'M33 · NGC 598',
    distance: '약 270만 광년', scaleLabel: '270만 광년', ly: 2.7e6,
    image: { status: 'ready', slug: 'm33' },
    log: 'M33은 우리은하, 안드로메다 은하와 함께 국부은하군을 이루는 세 번째로 큰 나선은하입니다. 정면을 보고 있어 나선팔이 활짝 펼쳐진 모습으로 촬영되지만, 표면이 넓게 퍼져 있어 실제 관측에서는 안드로메다보다 훨씬 흐릿하게 보입니다.',
    quiz: { q: 'M33이 속한 은하 집단의 이름은 무엇일까요?', options: ['국부은하군', '처녀자리 은하단', '마젤란 은하군'], answer: 0,
      explain: '우리은하·안드로메다와 함께 <b>국부은하군</b>을 이룹니다.' },
    isTemp: true,
  },
  {
    id: 'm81', level: 3, nameKo: '보데 은하', nameEn: "Bode's Galaxy", catalog: 'M81 · NGC3031',
    distance: '약 1,200만 광년', scaleLabel: '1,200만 광년', ly: 1.2e7,
    image: { status: 'ready', slug: 'm81' },
    log: '보데 은하는 북두칠성 근처에 위치한 아름다운 나선은하입니다. 장노출 촬영을 통해 은하의 구조와 희미한 나선팔을 확인할 수 있으며, 아마추어 천체사진가들에게 인기 있는 대상입니다.',
    quiz: { q: 'M81은 어떤 종류의 천체일까요?', options: ['구상성단', '나선은하', '행성상성운'], answer: 1,
      explain: '나선팔을 가진 <b>나선은하</b>입니다.' },
    isTemp: false,
  },
  {
    id: 'm82', level: 3, nameKo: '시가 은하', nameEn: 'Cigar Galaxy', catalog: 'M82',
    distance: '약 1,200만 광년', scaleLabel: '1,200만 광년', ly: 1.2e7,
    image: { status: 'ready', slug: 'm82' },
    log: 'M82는 바로 옆 보데 은하(M81)와 중력으로 서로를 끌어당기며 지나간 흔적이 남은 은하입니다. 그 충격으로 지금 우리은하보다 훨씬 빠른 속도로 별을 만들어내고 있어, 폭발적 항성생성 은하로 불립니다. 옆으로 길쭉한 모습 때문에 시가 은하라는 별명이 붙었습니다.',
    quiz: { q: 'M82에서 지금 활발하게 일어나고 있는 일은 무엇일까요?', options: ['별이 아주 빠르게 만들어지고 있다', '은하가 사라지고 있다', '아무 변화도 없다'], answer: 0,
      explain: '우리은하보다 훨씬 빠르게 <b>별을 만들어내고</b> 있습니다.' },
    isTemp: true,
  },
];

export const getObject = (id) => OBJECTS.find((o) => o.id === id);
export const getLevel = (id) => LEVELS.find((l) => l.id === id);
export const objectsOfLevel = (id) => OBJECTS.filter((o) => o.level === id);
