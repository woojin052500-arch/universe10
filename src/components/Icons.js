const base = {
  fill: 'none', stroke: 'currentColor', strokeWidth: 1.6,
  strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24',
};

export const IconOrbit = (p) => (
  <svg {...base} width={p.size || 22} height={p.size || 22} {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(-28 12 12)" />
  </svg>
);
export const IconGrid = (p) => (
  <svg {...base} width={p.size || 22} height={p.size || 22} {...p}>
    <rect x="3" y="3" width="7.6" height="7.6" rx="2" />
    <rect x="13.4" y="3" width="7.6" height="7.6" rx="2" />
    <rect x="3" y="13.4" width="7.6" height="7.6" rx="2" />
    <rect x="13.4" y="13.4" width="7.6" height="7.6" rx="2" />
  </svg>
);
export const IconArticle = (p) => (
  <svg {...base} width={p.size || 22} height={p.size || 22} {...p}>
    <path d="M5 3.5h9.5L19 8v12.5H5z" /><path d="M14.2 3.5V8H19" />
    <path d="M8 12.5h8M8 16.2h5.5" />
  </svg>
);
export const IconUser = (p) => (
  <svg {...base} width={p.size || 22} height={p.size || 22} {...p}>
    <circle cx="12" cy="8.4" r="3.8" />
    <path d="M4.6 20.2c0-4 3.3-6.2 7.4-6.2s7.4 2.2 7.4 6.2" />
  </svg>
);
export const IconLock = (p) => (
  <svg {...base} width={p.size || 22} height={p.size || 22} {...p}>
    <rect x="4.6" y="10.4" width="14.8" height="9.6" rx="2.6" />
    <path d="M8.2 10.4V7.6a3.8 3.8 0 017.6 0v2.8" />
  </svg>
);
export const IconCheck = (p) => (
  <svg {...base} strokeWidth="2.1" width={p.size || 20} height={p.size || 20} {...p}>
    <path d="M4.8 12.6l4.6 4.6L19.2 7.4" />
  </svg>
);
export const IconClose = (p) => (
  <svg {...base} strokeWidth="2" width={p.size || 20} height={p.size || 20} {...p}>
    <path d="M6.6 6.6l10.8 10.8M17.4 6.6L6.6 17.4" />
  </svg>
);
export const IconBack = (p) => (
  <svg {...base} strokeWidth="1.8" width={p.size || 22} height={p.size || 22} {...p}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);
export const IconNext = (p) => (
  <svg {...base} strokeWidth="1.9" width={p.size || 18} height={p.size || 18} {...p}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);
