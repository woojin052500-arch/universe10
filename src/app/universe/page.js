'use client';
import { useState } from 'react';
import Link from 'next/link';
import TabBar from '@/components/TabBar';
import SkyMap from '@/components/SkyMap';
import ObjectModal from '@/components/ObjectModal';
import { IconOrbit } from '@/components/Icons';
import useProgress from '@/lib/useProgress';

export default function UniversePage() {
  const { completed } = useProgress();
  const [picked, setPicked] = useState(null);

  return (
    <>
      <SkyMap completed={completed} onOpen={setPicked} />

      <header className="sky-top">
        <Link href="/" className="logo">
          <IconOrbit size={19} style={{ color: 'var(--lv3)' }} /> universe10
        </Link>
        <nav className="gnav">
          <Link href="/universe" className="on">우주</Link>
          <Link href="/columns">관측 칼럼</Link>
          <Link href="/me">MY</Link>
        </nav>
      </header>

      <ObjectModal payload={picked} onClose={() => setPicked(null)} />
      <TabBar />
    </>
  );
}
