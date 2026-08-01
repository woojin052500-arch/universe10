'use client';
import Link from 'next/link';
import { IconOrbit } from './Icons';
import { currentScale } from '@/lib/progress';

const NAV = [
  { href: '/universe', label: '우주' },
  { href: '/columns',  label: '관측 칼럼' },
  { href: '/me',       label: 'MY' },
];

export default function SiteHeader({ active, completed }) {
  return (
    <header className="top">
      <Link href="/" className="logo">
        <IconOrbit size={20} style={{ color: 'var(--lv3)' }} /> universe10
      </Link>
      <nav className="gnav">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={active === n.label ? 'on' : ''}>
            {n.label}
          </Link>
        ))}
      </nav>
      {completed && (
        <div style={{ fontSize: 12.5, color: '#B4BCCB', fontWeight: 600 }}>
          {currentScale(completed)}
        </div>
      )}
    </header>
  );
}
