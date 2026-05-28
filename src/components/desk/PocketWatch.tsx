/**
 * A vintage pocket watch with a chain. Time, slow living.
 */
export default function PocketWatch() {
  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  }
  return (
    <svg viewBox="0 0 110 140" aria-hidden="true" className="prop-watch">
      {/* chain */}
      <path d="M 55 8 Q 38 12 36 22 Q 35 30 48 32" {...stroke} strokeWidth="1.4" />
      <circle cx="44" cy="10" r="1.8" fill="currentColor" />
      <circle cx="38" cy="16" r="1.8" fill="currentColor" />
      <circle cx="36" cy="24" r="1.8" fill="currentColor" />
      <circle cx="42" cy="30" r="1.8" fill="currentColor" />
      {/* crown / winder */}
      <rect x="50" y="30" width="10" height="8" rx="1" {...stroke} fill="rgba(245, 224, 212, 0.4)" />
      {/* watch case (outer) */}
      <circle cx="55" cy="78" r="40" {...stroke} fill="rgba(245, 224, 212, 0.3)" />
      {/* watch case (inner ring) */}
      <circle cx="55" cy="78" r="34" {...stroke} strokeWidth="1.4" />
      {/* hour marks */}
      <line x1="55" y1="46" x2="55" y2="51" {...stroke} strokeWidth="2.2" />
      <line x1="55" y1="105" x2="55" y2="110" {...stroke} strokeWidth="2.2" />
      <line x1="24" y1="78" x2="29" y2="78" {...stroke} strokeWidth="2.2" />
      <line x1="81" y1="78" x2="86" y2="78" {...stroke} strokeWidth="2.2" />
      {/* small marks */}
      <line x1="70" y1="51" x2="68" y2="55" {...stroke} strokeWidth="1.2" />
      <line x1="40" y1="51" x2="42" y2="55" {...stroke} strokeWidth="1.2" />
      <line x1="32" y1="62" x2="36" y2="64" {...stroke} strokeWidth="1.2" />
      <line x1="78" y1="62" x2="74" y2="64" {...stroke} strokeWidth="1.2" />
      <line x1="32" y1="94" x2="36" y2="92" {...stroke} strokeWidth="1.2" />
      <line x1="78" y1="94" x2="74" y2="92" {...stroke} strokeWidth="1.2" />
      <line x1="40" y1="105" x2="42" y2="101" {...stroke} strokeWidth="1.2" />
      <line x1="70" y1="105" x2="68" y2="101" {...stroke} strokeWidth="1.2" />
      {/* hands — pointing to roughly 10:08 (universal "happy" watch ad time) */}
      <line x1="55" y1="78" x2="40" y2="62" {...stroke} strokeWidth="2.4" />
      <line x1="55" y1="78" x2="68" y2="62" {...stroke} strokeWidth="2" />
      {/* center pin */}
      <circle cx="55" cy="78" r="2.2" fill="currentColor" />
    </svg>
  )
}
