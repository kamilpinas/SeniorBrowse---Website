/**
 * A teacup on a saucer with a hanging tea-bag tag. More grandma than
 * the coffee mug — a different ritual on the same desk.
 */
export default function TeaCup() {
  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  }
  return (
    <svg viewBox="0 0 120 110" aria-hidden="true" className="prop-tea">
      {/* steam wisps */}
      <path d="M 44 14 Q 38 24 44 34" {...stroke} strokeWidth="1.3" opacity="0.55" />
      <path d="M 60 10 Q 66 22 60 34" {...stroke} strokeWidth="1.3" opacity="0.45" />
      <path d="M 76 14 Q 70 24 76 34" {...stroke} strokeWidth="1.3" opacity="0.45" />
      {/* cup */}
      <path
        d="M 30 46 L 32 78 Q 32 86 60 86 Q 88 86 88 78 L 90 46 Z"
        {...stroke}
        fill="rgba(245, 224, 212, 0.35)"
      />
      {/* tea surface */}
      <ellipse cx="60" cy="46" rx="30" ry="3.5" {...stroke} strokeWidth="1.6" />
      {/* handle */}
      <path d="M 90 56 Q 104 60 104 70 Q 104 80 88 78" {...stroke} />
      {/* saucer */}
      <ellipse cx="60" cy="92" rx="44" ry="6" {...stroke} fill="rgba(245, 224, 212, 0.25)" />
      {/* tea bag string + tag */}
      <line x1="60" y1="46" x2="64" y2="64" {...stroke} strokeWidth="1.1" />
      <rect x="61" y="64" width="9" height="6" {...stroke} strokeWidth="1.2" fill="rgba(253, 249, 244, 0.8)" />
    </svg>
  )
}
