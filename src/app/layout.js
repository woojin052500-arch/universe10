import './globals.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://universe10.vercel.app'),
  title: 'universe10 — 나만의 우주 넓히기',
  description: '내가 아는 만큼이 나의 우주입니다. 10대 천문학자가 직접 촬영한 밤하늘로 우주를 넓혀보세요.',
  openGraph: {
    title: 'universe10 — 나만의 우주 넓히기',
    description: '내가 아는 만큼이 나의 우주입니다.',
    images: ['/og.jpg'],
  },
};

export const viewport = { themeColor: '#05070E' };

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
