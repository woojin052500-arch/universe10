[ public/ 구성 ]

bg.jpg          말머리·불꽃성운 배경 (전 화면 공통, 1503x1503)
og.jpg          공유용 1200x630
startrail.jpg   별 궤적 + 관측소 (보조, 현재 미사용)

objects/ — 파일명은 src/data/content.js 의 image.slug 와 같아야 합니다.
  horsehead.jpg    말머리 성운
  ic1805.jpg       하트 성운
  ic2177.jpg       갈매기 성운
  ic443.jpg        해파리 성운   ※ 원본에 워터마크 없음
  jupiter.jpg      목성   ※ 중앙 확대 크롭 → 워터마크 없음
  lobster.jpg      랍스터·버블 성운
  m101.jpg         바람개비 은하
  m13.jpg          헤라클레스 구상성단
  m17.jpg          오메가 성운
  m20.jpg          삼렬성운   ※ 하단 UI 아이콘 42px 잘라냄, 워터마크 유지
  m31.jpg          안드로메다 은하   ※ 하단 UI 아이콘 62px 잘라냄, 워터마크 유지
  m33.jpg          삼각형자리 은하
  m42.jpg          오리온 대성운
  m45.jpg          플레이아데스 성단   ※ 원본에 워터마크 없음
  m81.jpg          보데 은하
  m82.jpg          시가 은하   ※ 중앙 확대 크롭 → 워터마크 없음
  mars.jpg         화성   ※ 중앙 확대 크롭 → 워터마크 없음
  moon.jpg         달
  ngc7000.jpg      북아메리카 성운
  rosette.jpg      장미 성운
  saturn.jpg       토성   ※ 중앙 확대 크롭 → 워터마크 없음
  veil.jpg         베일 성운

전부 JPEG q88 / 긴 변 최대 1800px 로 변환했습니다.
확대 크롭한 사진은 워터마크가 잘렸으므로, 천체 상세 화면에
"촬영 · 곽준성 (대한천문회)" 크레딧을 따로 표시합니다.


[ 아직 사진이 없는 천체 — 8개 ]

  태양, 오리온자리, 백조자리, 게 성운(M1), 고리 성운(M57),
  중성자별, 블랙홀, 퀘이사

content.js 에서 image.status 가 'placeholder' 인 항목들입니다.
톤에 맞춘 기본화면(코어 + 궤도링 + 별)으로 자동 대체되므로 앱은 깨지지 않습니다.

사진을 구하면 objects/ 에 넣고 content.js 를 아래처럼 바꾸세요.
  image: { status: 'ready', slug: 'sun' }
