/**
 * A ball of yarn with two knitting needles. The slow-craft prop.
 */
export default function Knitting() {
  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  }
  return (
    <svg viewBox="0 0 150 130" aria-hidden="true" className="prop-knitting">
      {/* yarn ball */}
      <circle cx="60" cy="78" r="38" {...stroke} fill="rgba(245, 224, 212, 0.3)" />
      {/* yarn wrap lines for texture */}
      <path d="M 26 64 Q 60 48 94 70" {...stroke} strokeWidth="1.3" opacity="0.7" />
      <path d="M 22 78 Q 60 56 98 82" {...stroke} strokeWidth="1.3" opacity="0.7" />
      <path d="M 24 94 Q 56 86 96 98" {...stroke} strokeWidth="1.3" opacity="0.7" />
      <path d="M 40 50 Q 70 70 60 110" {...stroke} strokeWidth="1.3" opacity="0.55" />
      {/* loose strand trailing */}
      <path d="M 95 88 Q 110 96 122 88 Q 130 84 140 96" {...stroke} strokeWidth="1.4" />
      {/* needle 1 — pointing up-left */}
      <line x1="44" y1="56" x2="14" y2="22" {...stroke} strokeWidth="2.2" />
      <circle cx="14" cy="22" r="2.6" fill="currentColor" />
      {/* needle 2 — pointing up-right */}
      <line x1="75" y1="50" x2="115" y2="14" {...stroke} strokeWidth="2.2" />
      <circle cx="115" cy="14" r="2.6" fill="currentColor" />
    </svg>
  )
}
