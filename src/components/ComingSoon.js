import Background from '@/components/Background';
import TabBar from '@/components/TabBar';
import { IconOrbit } from '@/components/Icons';

export default function ComingSoon({ title, desc }) {
  return (
    <>
      <Background variant="max" />
      <main className="page with-tabs" style={{ minHeight: '100dvh' }}>
        <header className="top">
          <div className="logo"><IconOrbit size={20} style={{ color: 'var(--lv3)' }} /> universe10</div>
        </header>
        <div style={{ flex: 1, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{title}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 10, lineHeight: 1.8 }}>
              {desc}
            </div>
          </div>
        </div>
      </main>
      <TabBar />
    </>
  );
}
