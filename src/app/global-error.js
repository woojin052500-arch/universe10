'use client';
export default function GlobalError({ reset }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center',
        background: '#05070E', color: '#DCE1EA',
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', textAlign: 'center' }}>
        <div style={{ padding: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>화면을 불러오지 못했습니다</h1>
          <p style={{ fontSize: 13.5, color: '#98A0B2', marginTop: 10 }}>다시 시도해 주세요.</p>
          <button onClick={reset} style={{ marginTop: 22, padding: '14px 28px', borderRadius: 12,
            border: 'none', background: '#fff', color: '#0A0D14', fontWeight: 700,
            fontSize: 14, cursor: 'pointer' }}>다시 시도</button>
        </div>
      </body>
    </html>
  );
}
