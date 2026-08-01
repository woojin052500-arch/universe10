'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconOrbit, IconArticle, IconUser } from './Icons';

const items = [
  { href: '/universe', label: '우주',  Icon: IconOrbit },
  { href: '/columns',  label: '칼럼',  Icon: IconArticle },
  { href: '/me',       label: 'MY',    Icon: IconUser },
];

export default function TabBar() {
  const path = usePathname();
  return (
    <nav className="tabs">
      {items.map(({ href, label, Icon }) => (
        <Link key={href} href={href} className={path.startsWith(href) ? 'on' : ''}>
          <Icon /> {label}
        </Link>
      ))}
    </nav>
  );
}
