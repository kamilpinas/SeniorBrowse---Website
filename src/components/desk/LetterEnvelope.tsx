/**
 * A handwritten letter envelope with a postage stamp. The thing the
 * founder wishes he could send his grandmother — but couldn't.
 */
export default function LetterEnvelope() {
  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  }
  return (
    <svg viewBox="0 0 150 100" aria-hidden="true" className="prop-envelope">
      {/* envelope body */}
      <rect x="6" y="20" width="138" height="72" rx="3" {...stroke} fill="#fdf9f4" />
      {/* envelope inner flap (closed, shown as crease) */}
      <path d="M 6 20 L 75 64 L 144 20" {...stroke} />
      {/* address lines (faint) */}
      <line x1="22" y1="76" x2="80" y2="76" {...stroke} strokeWidth="1.2" opacity="0.45" />
      <line x1="22" y1="82" x2="64" y2="82" {...stroke} strokeWidth="1.2" opacity="0.45" />
      {/* stamp */}
      <rect
        x="108"
        y="28"
        width="26"
        height="28"
        {...stroke}
        strokeDasharray="2 1.5"
        fill="rgba(156, 53, 32, 0.18)"
      />
      {/* stamp X / heart inside */}
      <path d="M 121 38 Q 116 32 113 38 Q 113 44 121 50 Q 129 44 129 38 Q 126 32 121 38 Z" fill="currentColor" opacity="0.6" />
    </svg>
  )
}
