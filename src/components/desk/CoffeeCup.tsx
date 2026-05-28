export default function CoffeeCup() {
  return (
    <svg viewBox="0 0 100 110" aria-hidden="true" className="prop-coffee">
      {/* steam */}
      <path d="M 36 12 Q 30 22 36 32 Q 42 42 36 52" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M 52 8 Q 58 18 52 28 Q 46 38 52 48" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M 68 14 Q 62 24 68 34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* cup body */}
      <path
        d="M 22 56 L 28 96 Q 28 102 34 102 L 66 102 Q 72 102 72 96 L 78 56 Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(245, 224, 212, 0.35)"
      />
      {/* coffee surface */}
      <ellipse cx="50" cy="56" rx="28" ry="4" stroke="currentColor" strokeWidth="1.6" fill="none" />
      {/* handle */}
      <path d="M 78 64 Q 92 68 92 80 Q 92 92 76 90" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </svg>
  )
}
