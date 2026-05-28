/**
 * Hand-drawn line-art safety icons. Stroke-only so GSAP can animate
 * stroke-dashoffset for a "drawing in" effect. Sized 64×64, intended
 * to render at 64-80px in the pillar header.
 *
 * All paths use currentColor; the pillar styles colour with terracotta.
 */

const stroke = {
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  fill: 'none',
}

/** 01 — No ads, no clutter (browser window with banner ad crossed out) */
export function IconNoAds() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {/* browser frame */}
      <rect x="7" y="12" width="50" height="40" rx="3" {...stroke} />
      {/* address bar */}
      <line x1="7" y1="22" x2="57" y2="22" {...stroke} />
      <circle cx="12" cy="17" r="1.2" {...stroke} strokeWidth="1.4" />
      <circle cx="16.5" cy="17" r="1.2" {...stroke} strokeWidth="1.4" />
      <circle cx="21" cy="17" r="1.2" {...stroke} strokeWidth="1.4" />
      {/* banner ad with X */}
      <rect x="14" y="30" width="36" height="14" rx="1.5" {...stroke} />
      <line x1="18" y1="34" x2="32" y2="40" {...stroke} strokeWidth="2.8" />
      <line x1="32" y1="34" x2="18" y2="40" {...stroke} strokeWidth="2.8" />
    </svg>
  )
}

/** 02 — Scam links blocked (shield with check) */
export function IconShieldCheck() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M 32 7 L 12 13 L 12 30 Q 12 47 32 57 Q 52 47 52 30 L 52 13 Z"
        {...stroke}
      />
      {/* checkmark */}
      <path d="M 22 31 L 29 39 L 44 24" {...stroke} strokeWidth="3" />
    </svg>
  )
}

/** 03 — No accidental downloads (download arrow inside prohibit circle) */
export function IconNoDownload() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {/* prohibit circle */}
      <circle cx="32" cy="32" r="23" {...stroke} />
      {/* arrow shaft */}
      <line x1="32" y1="19" x2="32" y2="38" {...stroke} />
      {/* arrow head */}
      <path d="M 24 32 L 32 40 L 40 32" {...stroke} />
      {/* tray */}
      <line x1="22" y1="44" x2="42" y2="44" {...stroke} />
      {/* prohibit slash */}
      <line x1="16" y1="16" x2="48" y2="48" {...stroke} strokeWidth="3" />
    </svg>
  )
}

/** 04 — History kept on their machine (laptop with padlock) */
export function IconPrivateHistory() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {/* laptop screen */}
      <rect x="10" y="14" width="44" height="30" rx="2" {...stroke} />
      {/* laptop base */}
      <path d="M 5 50 L 59 50" {...stroke} />
      <path d="M 8 44 L 56 44" {...stroke} />
      {/* padlock body */}
      <rect x="26" y="28" width="12" height="10" rx="1.5" {...stroke} />
      {/* padlock shackle */}
      <path d="M 28 28 L 28 24 Q 28 20 32 20 Q 36 20 36 24 L 36 28" {...stroke} />
      {/* keyhole */}
      <circle cx="32" cy="32.5" r="1" {...stroke} strokeWidth="1.4" />
    </svg>
  )
}
