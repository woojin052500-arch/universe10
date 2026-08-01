// ─────────────────────────────────────────────
//  universe10 — 콘텐츠 데이터
//  isTemp: true  → 임시 텍스트 (곽준성 회장 감수 후 false 로)
//  image.status  → 'ready'(public/objects/{slug}.jpg) | 'placeholder'
// ─────────────────────────────────────────────

export const LEVELS = [
  { id: 1, name: '태양계',      scaleLabel: '1 AU',      color: '#E8D9C0', unlockAt: 0,
    desc: '우리 동네부터. 맨눈과 작은 망원경으로 닿는 거리.' },
  { id: 2, name: '딥스카이',    scaleLabel: '수천 광년',  color: '#7FA8FF', unlockAt: 3,
    desc: '우리은하 안쪽. 별이 태어나고 죽는 현장.' },
  { id: 3, name: '심우주',      scaleLabel: '수백만 광년', color: '#E8737F', unlockAt: 6,
    desc: '은하 너머. 지금 보는 빛은 인류가 없던 시절 출발했다.' },
];

const O = (o) => o;

export const OBJECTS = [
  // ══════════ Lv.1 태양계 ══════════
  O({ id:'moon', level:1, nameKo:'달', nameEn:'Moon', catalog:null,
    distance:'약 38만 km', scaleLabel:'1.3 광초', ly:4.0e-8,
    image:{status:'ready', slug:'moon'},
    log:'달은 망원경으로 관측할 때마다 새로운 모습을 보여주는 천체입니다. 특히 밝은 부분과 어두운 부분의 경계에서는 크레이터와 산맥이 더욱 선명하게 보이며, 같은 달이라도 관측 시기에 따라 다른 모습을 확인할 수 있습니다.',
    quiz:{q:'달에서 가장 많이 볼 수 있는 지형은 무엇일까요?', options:['화산','크레이터','강'], answer:1,
      explain:'운석 충돌로 생긴 <b>크레이터</b>가 표면을 덮고 있습니다.'}, isTemp:false }),

  O({ id:'sun', level:1, nameKo:'태양', nameEn:'Sun', catalog:null,
    distance:'약 1억 5천만 km', scaleLabel:'1 AU', ly:1.58e-5,
    image:{status:'placeholder', tint:'#FFD98A'},
    log:'태양은 항상 같은 모습처럼 보이지만 실제로는 계속 변화하는 천체입니다. 흑점의 이동과 변화를 관측하면 태양의 자전과 활동 변화를 직접 확인할 수 있습니다.',
    quiz:{q:'태양 표면에 나타나는 검은 영역은 무엇일까요?', options:['흑점','구름','운석'], answer:0,
      explain:'주변보다 온도가 낮아 어둡게 보이는 <b>흑점</b>입니다.'}, isTemp:false }),

  O({ id:'mars', level:1, nameKo:'화성', nameEn:'Mars', catalog:null,
    distance:'약 2억 3천만 km', scaleLabel:'1.5 AU', ly:2.4e-5,
    image:{status:'ready', slug:'mars'},
    log:'화성은 붉은 산화철 먼지 때문에 맨눈으로도 주황빛으로 보입니다. 지구와 가까워지는 시기에 망원경을 들이대면 극지방의 하얀 극관과 표면의 어두운 무늬를 확인할 수 있습니다.',
    quiz:{q:'화성이 붉게 보이는 이유는 무엇일까요?', options:['표면의 산화철','대기의 불꽃','태양빛 반사각'], answer:0,
      explain:'표면을 덮은 <b>산화철(녹슨 철) 먼지</b> 때문입니다.'}, isTemp:true }),

  O({ id:'jupiter', level:1, nameKo:'목성', nameEn:'Jupiter', catalog:null,
    distance:'약 7억 8천만 km', scaleLabel:'5.2 AU', ly:8.2e-5,
    image:{status:'ready', slug:'jupiter'},
    log:'태양계에서 가장 큰 행성으로 강력한 자기장과 거대한 대기를 가지고 있습니다. 대적점이라는 거대한 폭풍이 존재하며 갈릴레이 위성들이 유명합니다.',
    quiz:{q:'목성의 가장 큰 위성은?', options:['유로파','가니메데','이오'], answer:1,
      explain:'<b>가니메데</b>는 태양계 최대의 위성으로 수성보다 큽니다.'}, isTemp:false }),

  O({ id:'saturn', level:1, nameKo:'토성', nameEn:'Saturn', catalog:null,
    distance:'약 14억 km', scaleLabel:'9.5 AU', ly:1.5e-4,
    image:{status:'ready', slug:'saturn'},
    log:'아름다운 고리를 가진 가스 행성입니다. 고리는 얼음과 암석 조각으로 이루어져 있으며 수많은 위성을 가지고 있습니다.',
    quiz:{q:'토성의 가장 큰 위성은?', options:['타이탄','엔셀라두스','미마스'], answer:0,
      explain:'<b>타이탄</b>은 두꺼운 대기를 가진 유일한 위성입니다.'}, isTemp:false }),

  // ══════════ Lv.2 딥스카이 ══════════
  O({ id:'m45', level:2, nameKo:'플레이아데스 성단', nameEn:'Pleiades Cluster', catalog:'M45 · NGC1432',
    distance:'약 444광년', scaleLabel:'444 광년', ly:444,
    image:{status:'ready', slug:'m45'},
    log:'황소자리에 위치한 산개성단으로, 맨눈으로도 여러 개의 별을 확인할 수 있습니다. 젊은 푸른 별들이 모여 있으며 아름다운 반사성운 구조를 가지고 있습니다.',
    quiz:{q:'플레이아데스 성단의 종류는?', options:['산개성단','구상성단','은하'], answer:0,
      explain:'별들이 느슨하게 모인 <b>산개성단</b>입니다.'}, isTemp:false }),

  O({ id:'orion', level:2, nameKo:'오리온자리', nameEn:'Orion', catalog:null,
    distance:'약 640광년', scaleLabel:'640 광년', ly:640,
    image:{status:'placeholder', tint:'#AEC6FF'},
    log:'겨울철 밤하늘을 대표하는 가장 유명한 별자리 중 하나입니다. 베텔게우스와 리겔이라는 밝은 별을 포함하고 있으며, 내부에는 오리온 대성운이라는 거대한 별 탄생 지역이 존재합니다.',
    quiz:{q:'오리온자리의 α별(가장 밝은 별)은 무엇일까요?', options:['리겔','베텔게우스','벨라트릭스'], answer:1,
      explain:'<b>베텔게우스</b>가 α별입니다. 실제 밝기는 리겔이 더 밝습니다.'}, isTemp:false }),

  O({ id:'m42', level:2, nameKo:'오리온 대성운', nameEn:'Orion Nebula', catalog:'M42',
    distance:'약 1,344광년', scaleLabel:'1,344 광년', ly:1344,
    image:{status:'ready', slug:'m42'},
    log:'오리온자리 방향에 있는 거대한 발광성운입니다. 내부에서는 새로운 별이 탄생하고 있으며, 천문학자들이 별 형성 과정을 연구하는 중요한 대상입니다.',
    quiz:{q:'오리온 대성운에서 주로 관측되는 빛은?', options:['수소 방출선','감마선','전파만 존재'], answer:0,
      explain:'달궈진 수소가 내는 <b>수소 방출선</b>이 붉은빛의 정체입니다.'}, isTemp:false }),

  O({ id:'horsehead', level:2, nameKo:'말머리 성운', nameEn:'Horsehead Nebula', catalog:'IC 434 · B33',
    distance:'약 1,375광년', scaleLabel:'1,375 광년', ly:1375,
    image:{status:'ready', slug:'horsehead'},
    log:'오리온자리 방향에 있는 유명한 암흑성운입니다. 밝은 성운 앞을 지나가는 차가운 먼지가 말 머리 모양으로 보이는 독특한 구조를 가지고 있습니다.',
    quiz:{q:'말머리 성운은 어떤 종류인가요?', options:['암흑성운','행성상성운','구상성단'], answer:0,
      explain:'스스로 빛나지 않고 뒤쪽 빛을 가리는 <b>암흑성운</b>입니다.'}, isTemp:false }),

  O({ id:'veil', level:2, nameKo:'베일 성운', nameEn:'Veil Nebula', catalog:'NGC 6960',
    distance:'약 2,400광년', scaleLabel:'2,400 광년', ly:2400,
    image:{status:'ready', slug:'veil'},
    log:'약 1만 년 전 폭발한 초신성의 잔해입니다. 폭발한 가스가 주변 성간물질과 부딪히며 얇은 실 같은 구조를 만들었고, 그 모습이 하늘에 드리운 베일처럼 보입니다.',
    quiz:{q:'베일 성운의 가느다란 실 같은 구조는 무엇 때문일까요?', options:['초신성 폭발 잔해가 퍼지며','별이 태어나며','혜성이 지나가며'], answer:0,
      explain:'<b>초신성 잔해</b>가 성간물질과 충돌하며 만든 충격파의 흔적입니다.'}, isTemp:true }),

  O({ id:'ngc7000', level:2, nameKo:'북아메리카 성운', nameEn:'North America Nebula', catalog:'NGC 7000',
    distance:'약 2,600광년', scaleLabel:'2,600 광년', ly:2600,
    image:{status:'ready', slug:'ngc7000'},
    log:'백조자리 방향에 있는 거대한 발광성운입니다. 앞을 가로막은 암흑성운이 만든 윤곽이 북아메리카 대륙 지도와 꼭 닮아 이런 이름이 붙었습니다. 멕시코만에 해당하는 부분이 특히 뚜렷합니다.',
    quiz:{q:'북아메리카 성운의 대륙 모양은 무엇 때문에 생겼을까요?', options:['앞을 가린 암흑성운','성운의 실제 모양','망원경의 왜곡'], answer:0,
      explain:'앞쪽 <b>암흑성운</b>이 빛을 가려 대륙 윤곽처럼 보입니다.'}, isTemp:true }),

  O({ id:'cygnus', level:2, nameKo:'백조자리', nameEn:'Cygnus', catalog:null,
    distance:'약 2,600광년', scaleLabel:'2,600 광년', ly:2601,
    image:{status:'placeholder', tint:'#C7D6FF'},
    log:'여름철 대표적인 별자리로, 은하수가 흐르는 방향에 위치합니다. 데네브를 포함하며 다양한 성운과 성단이 존재하는 천체 관측의 보고입니다.',
    quiz:{q:'백조자리의 가장 밝은 별은 무엇일까요?', options:['데네브','베가','알타이르'], answer:0,
      explain:'<b>데네브</b>. 베가·알타이르와 함께 여름철 대삼각형을 이룹니다.'}, isTemp:false }),

  O({ id:'m57', level:2, nameKo:'고리 성운', nameEn:'Ring Nebula', catalog:'M57 · NGC 6720',
    distance:'약 2,600광년', scaleLabel:'2,600 광년', ly:2602,
    image:{status:'placeholder', tint:'#8FE3C8'},
    log:'태양과 비슷한 질량의 별이 생을 마치며 방출한 가스로 만들어진 행성상성운입니다. 중심에는 백색왜성이 남아 있습니다.',
    quiz:{q:'고리 성운은 어떤 천체의 마지막 모습인가요?', options:['별','은하','행성'], answer:0,
      explain:'태양 정도 질량의 <b>별</b>이 죽으며 껍질을 벗어던진 모습입니다.'}, isTemp:false }),

  O({ id:'ic2177', level:2, nameKo:'갈매기 성운', nameEn:'Seagull Nebula', catalog:'IC 2177',
    distance:'약 3,800광년', scaleLabel:'3,800 광년', ly:3800,
    image:{status:'ready', slug:'ic2177'},
    log:'외뿔소자리와 큰개자리 경계에 걸쳐 있는 대형 발광성운입니다. 좌우로 길게 뻗은 날개와 머리 부분이 하늘을 나는 갈매기를 닮아 이 이름이 붙었으며, 폭이 보름달 여러 개를 늘어놓은 것만큼 넓습니다.',
    quiz:{q:'갈매기 성운이 붉게 보이는 이유는 무엇일까요?', options:['수소 가스가 빛을 내서','먼지가 노을을 반사해서','온도가 낮아서'], answer:0,
      explain:'뜨거운 별에 달궈진 <b>수소 가스</b>가 붉은빛을 냅니다.'}, isTemp:true }),

  O({ id:'ic443', level:2, nameKo:'해파리 성운', nameEn:'Jellyfish Nebula', catalog:'IC 443',
    distance:'약 5,000광년', scaleLabel:'5,000 광년', ly:5000,
    image:{status:'ready', slug:'ic443'},
    log:'해파리 성운은 별이 태어나는 곳이 아니라 별이 죽은 자리입니다. 수천 년 전 폭발한 초신성의 잔해가 지금도 사방으로 퍼져나가고 있으며, 길게 늘어진 가스 필라멘트가 해파리의 촉수처럼 보여 이런 이름이 붙었습니다.',
    quiz:{q:'해파리 성운은 무엇의 흔적일까요?', options:['별의 탄생','초신성 폭발','혜성의 꼬리'], answer:1,
      explain:'거대한 별이 수명을 다하며 폭발한 <b>초신성 잔해</b>입니다.'}, isTemp:true }),

  O({ id:'rosette', level:2, nameKo:'장미 성운', nameEn:'Rosette Nebula', catalog:'NGC 2237',
    distance:'약 5,200광년', scaleLabel:'5,200 광년', ly:5199,
    image:{status:'ready', slug:'rosette'},
    log:'외뿔소자리 방향에 있는 거대한 발광성운입니다. 가운데 갓 태어난 별들이 뿜어내는 항성풍이 주변 가스를 밀어내면서 한가운데가 뻥 뚫린 구멍이 생겼고, 그 모습이 활짝 핀 장미를 닮았습니다.',
    quiz:{q:'장미 성운 한가운데가 비어 있는 이유는 무엇일까요?', options:['어린 별들이 가스를 밀어내서','블랙홀이 빨아들여서','원래 가스가 없어서'], answer:0,
      explain:'중심의 <b>어린 별들이 뿜는 항성풍</b>이 가스를 밀어냈습니다.'}, isTemp:true }),

  O({ id:'m20', level:2, nameKo:'삼렬성운', nameEn:'Trifid Nebula', catalog:'M20 · NGC 6514',
    distance:'약 5,200광년', scaleLabel:'5,200 광년', ly:5200,
    image:{status:'ready', slug:'m20'},
    log:'삼렬성운은 궁수자리 방향에 있는 성운으로, 붉은 발광성운과 푸른 반사성운이 한 화면에 같이 담기는 보기 드문 대상입니다. 성운 가운데를 가로지르는 어두운 먼지 띠가 전체를 세 갈래로 나누는 것처럼 보여 삼렬(三裂)이라는 이름이 붙었습니다.',
    quiz:{q:'삼렬성운의 이름은 무엇에서 유래했을까요?', options:['별 세 개가 모여 있어서','어두운 먼지 띠가 성운을 세 갈래로 나눠서','세 번에 걸쳐 발견돼서'], answer:1,
      explain:'<b>어두운 먼지 띠</b>가 성운을 셋으로 갈라놓은 것처럼 보입니다.'}, isTemp:true }),

  O({ id:'m17', level:2, nameKo:'오메가 성운', nameEn:'Omega Nebula', catalog:'M17 · NGC6618',
    distance:'약 5,500광년', scaleLabel:'5,500 광년', ly:5500,
    image:{status:'ready', slug:'m17'},
    log:'오메가 성운은 우리은하에서 가장 활발하게 별이 만들어지고 있는 곳 중 하나입니다. 밝은 부분의 형태가 그리스 문자 오메가처럼 보인다고 해서 이 이름이 붙었지만, 물 위에 뜬 백조를 닮았다고 해서 백조 성운으로도 불립니다.',
    quiz:{q:'오메가 성운의 또 다른 이름은 무엇일까요?', options:['백조 성운','독수리 성운','말머리 성운'], answer:0,
      explain:'물 위에 뜬 백조를 닮아 <b>백조 성운</b>이라고도 부릅니다.'}, isTemp:true }),

  O({ id:'lobster', level:2, nameKo:'랍스터 성운과 버블 성운', nameEn:'Lobster & Bubble Nebula', catalog:'NGC 6357 · NGC 7635',
    distance:'약 5,500광년', scaleLabel:'5,500 광년', ly:5501,
    image:{status:'ready', slug:'lobster'},
    log:'한 화면에 성격이 다른 두 성운이 함께 담겼습니다. 넓게 퍼진 랍스터 성운은 무거운 별들이 태어나는 산실이고, 오른쪽 아래의 동그란 버블 성운은 거대한 별이 뿜어낸 항성풍이 주변 가스를 풍선처럼 부풀린 결과입니다.',
    quiz:{q:'버블 성운의 동그란 거품은 어떻게 만들어졌을까요?', options:['거대한 별의 항성풍이 가스를 밀어내서','블랙홀이 회전해서','두 은하가 충돌해서'], answer:0,
      explain:'중심 별이 뿜는 <b>항성풍</b>이 주변 가스를 풍선처럼 부풀렸습니다.'}, isTemp:true }),

  O({ id:'m1', level:2, nameKo:'게 성운', nameEn:'Crab Nebula', catalog:'M1 · NGC 1952',
    distance:'약 6,500광년', scaleLabel:'6,500 광년', ly:6500,
    image:{status:'placeholder', tint:'#FF9E7A'},
    log:'1054년에 발생한 초신성 폭발의 잔해입니다. 중심에는 빠르게 회전하는 중성자별인 펄서가 존재합니다.',
    quiz:{q:'게 성운 중심의 천체는?', options:['백색왜성','펄서','적색거성'], answer:1,
      explain:'1초에 30번 회전하는 <b>펄서</b>가 중심에 있습니다.'}, isTemp:false }),

  O({ id:'ic1805', level:2, nameKo:'하트 성운', nameEn:'Heart Nebula', catalog:'IC 1805',
    distance:'약 7,500광년', scaleLabel:'7,500 광년', ly:7500,
    image:{status:'ready', slug:'ic1805'},
    log:'하트 성운은 카시오페이아자리 방향에 있는 거대한 발광성운입니다. 성운 한가운데 있는 젊고 뜨거운 별들이 주변 수소 가스를 달구면서 붉은빛을 내고, 그 형태가 심장을 닮아 하트 성운이라 불립니다.',
    quiz:{q:'하트 성운이 붉게 보이는 이유는 무엇일까요?', options:['수소 가스가 빛을 내기 때문','온도가 아주 낮기 때문','먼지가 노을을 반사하기 때문'], answer:0,
      explain:'뜨거운 별에 달궈진 <b>수소 가스</b>가 붉은빛을 냅니다.'}, isTemp:true }),

  O({ id:'m13', level:2, nameKo:'헤라클레스 구상성단', nameEn:'Hercules Globular Cluster', catalog:'M13 · NGC6205',
    distance:'약 22,000광년', scaleLabel:'22,000 광년', ly:22000,
    image:{status:'ready', slug:'m13'},
    log:'M13은 수십만 개의 별이 공 모양으로 빽빽하게 뭉쳐 있는 구상성단입니다. 우리은하가 만들어지던 초기에 함께 태어난 아주 오래된 별들의 집단이라, 이 성단을 본다는 건 우리은하의 가장 나이 든 부분을 들여다보는 일과 같습니다.',
    quiz:{q:'구상성단의 가장 큰 특징은 무엇일까요?', options:['별들이 공 모양으로 빽빽하게 모여 있다','가스로만 이루어져 있다','행성들이 모여 있다'], answer:0,
      explain:'수십만 개의 별이 <b>공 모양</b>으로 뭉쳐 있습니다.'}, isTemp:true }),

  // ══════════ Lv.3 심우주 ══════════
  O({ id:'neutron', level:3, nameKo:'중성자별', nameEn:'Neutron Star', catalog:null,
    distance:'가장 가까운 것도 수백 광년', scaleLabel:'6,500 광년', ly:6499,
    image:{status:'placeholder', tint:'#BFE9FF'},
    log:'거대한 별이 초신성 폭발 후 남기는 매우 밀도 높은 천체입니다. 작은 크기지만 태양과 비슷한 질량을 가지고 있습니다.',
    quiz:{q:'중성자별은 어떻게 만들어질까요?', options:['초신성 폭발 후 남은 핵','행성 충돌','은하 분열'], answer:0,
      explain:'<b>초신성 폭발</b> 후 남은 중심핵이 극한으로 압축된 것입니다.'}, isTemp:false }),

  O({ id:'blackhole', level:3, nameKo:'블랙홀', nameEn:'Black Hole', catalog:'Sgr A*',
    distance:'우리은하 중심까지 약 2만 6천 광년', scaleLabel:'26,000 광년', ly:26000,
    image:{status:'placeholder', tint:'#9B8CFF'},
    log:'강한 중력으로 인해 빛조차 빠져나올 수 없는 천체입니다. 일반상대성이론에 의해 예측되었으며, 현재 실제 관측을 통해 존재가 확인되었습니다.',
    quiz:{q:'블랙홀의 경계면을 무엇이라고 할까요?', options:['사건의 지평선','광구','성간운'], answer:0,
      explain:'한번 넘으면 빛조차 못 돌아오는 <b>사건의 지평선</b>입니다.'}, isTemp:false }),

  O({ id:'m31', level:3, nameKo:'안드로메다 은하', nameEn:'Andromeda Galaxy', catalog:'M31',
    distance:'약 250만 광년', scaleLabel:'250만 광년', ly:2.5e6,
    image:{status:'ready', slug:'m31'},
    log:'우리은하와 가장 가까운 대형 나선은하입니다. 약 250만 광년 떨어져 있으며 미래에는 우리은하와 충돌할 것으로 예상됩니다.',
    quiz:{q:'안드로메다 은하는 어떤 종류의 은하인가요?', options:['나선은하','타원은하','불규칙은하'], answer:0,
      explain:'나선팔을 가진 <b>나선은하</b>입니다.'}, isTemp:false }),

  O({ id:'m33', level:3, nameKo:'삼각형자리 은하', nameEn:'Triangulum Galaxy', catalog:'M33 · NGC 598',
    distance:'약 270만 광년', scaleLabel:'270만 광년', ly:2.7e6,
    image:{status:'ready', slug:'m33'},
    log:'M33은 우리은하, 안드로메다 은하와 함께 국부은하군을 이루는 세 번째로 큰 나선은하입니다. 정면을 보고 있어 나선팔이 활짝 펼쳐진 모습으로 촬영되지만, 표면이 넓게 퍼져 있어 실제 관측에서는 안드로메다보다 훨씬 흐릿하게 보입니다.',
    quiz:{q:'M33이 속한 은하 집단의 이름은 무엇일까요?', options:['국부은하군','처녀자리 은하단','마젤란 은하군'], answer:0,
      explain:'우리은하·안드로메다와 함께 <b>국부은하군</b>을 이룹니다.'}, isTemp:true }),

  O({ id:'m81', level:3, nameKo:'보데 은하', nameEn:"Bode's Galaxy", catalog:'M81 · NGC3031',
    distance:'약 1,200만 광년', scaleLabel:'1,200만 광년', ly:1.2e7,
    image:{status:'ready', slug:'m81'},
    log:'보데 은하는 북두칠성 근처에 위치한 아름다운 나선은하입니다. 장노출 촬영을 통해 은하의 구조와 희미한 나선팔을 확인할 수 있으며, 아마추어 천체사진가들에게 인기 있는 대상입니다.',
    quiz:{q:'M81은 어떤 종류의 천체일까요?', options:['구상성단','나선은하','행성상성운'], answer:1,
      explain:'나선팔을 가진 <b>나선은하</b>입니다.'}, isTemp:false }),

  O({ id:'m82', level:3, nameKo:'시가 은하', nameEn:'Cigar Galaxy', catalog:'M82',
    distance:'약 1,200만 광년', scaleLabel:'1,200만 광년', ly:1.2001e7,
    image:{status:'ready', slug:'m82'},
    log:'M82는 바로 옆 보데 은하(M81)와 중력으로 서로를 끌어당기며 지나간 흔적이 남은 은하입니다. 그 충격으로 지금 우리은하보다 훨씬 빠른 속도로 별을 만들어내고 있어, 폭발적 항성생성 은하로 불립니다.',
    quiz:{q:'M82에서 지금 활발하게 일어나고 있는 일은 무엇일까요?', options:['별이 아주 빠르게 만들어지고 있다','은하가 사라지고 있다','아무 변화도 없다'], answer:0,
      explain:'우리은하보다 훨씬 빠르게 <b>별을 만들어내고</b> 있습니다.'}, isTemp:true }),

  O({ id:'m101', level:3, nameKo:'바람개비 은하', nameEn:'Pinwheel Galaxy', catalog:'M101 · NGC 5457',
    distance:'약 2,100만 광년', scaleLabel:'2,100만 광년', ly:2.1e7,
    image:{status:'ready', slug:'m101'},
    log:'정면을 향하고 있어 나선팔이 바람개비처럼 활짝 펼쳐진 모습으로 보이는 은하입니다. 우리은하보다 두 배 가까이 크며, 나선팔을 따라 점점이 박힌 푸른 덩어리들은 모두 별이 새로 태어나고 있는 지역입니다.',
    quiz:{q:'M101의 나선팔에 보이는 푸른 덩어리들은 무엇일까요?', options:['별이 태어나는 지역','블랙홀','다른 은하'], answer:0,
      explain:'갓 태어난 뜨거운 별들이 모인 <b>별 탄생 지역</b>입니다.'}, isTemp:true }),

  O({ id:'quasar', level:3, nameKo:'퀘이사', nameEn:'Quasar', catalog:'3C 273',
    distance:'약 24억 광년', scaleLabel:'24억 광년', ly:2.4e9,
    image:{status:'placeholder', tint:'#FFD1E8'},
    log:'아주 먼 우주에서 발견되는 매우 밝은 천체입니다. 은하 중심의 초대질량 블랙홀 주변 물질이 방출하는 강력한 에너지로 설명됩니다.',
    quiz:{q:'퀘이사의 에너지원은 무엇일까요?', options:['초대질량 블랙홀','핵융합 행성','별빛 반사'], answer:0,
      explain:'은하 중심 <b>초대질량 블랙홀</b>로 빨려드는 물질이 내는 빛입니다.'}, isTemp:false }),
];

export const getObject  = (id) => OBJECTS.find((o) => o.id === id);
export const getLevel   = (id) => LEVELS.find((l) => l.id === id);
export const objectsOfLevel = (id) =>
  OBJECTS.filter((o) => o.level === id).sort((a, b) => a.ly - b.ly);
