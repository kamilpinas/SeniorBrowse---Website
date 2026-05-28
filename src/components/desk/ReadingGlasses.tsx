export default function ReadingGlasses() {
  return (
    <svg viewBox="0 0 130 50" aria-hidden="true" className="prop-glasses">
      {/* shadow */}
      <ellipse cx="65" cy="44" rx="56" ry="3" fill="rgba(94, 64, 48, 0.12)" />
      {/* left lens */}
      <circle cx="30" cy="25" r="18" fill="rgba(253, 249, 244, 0.4)" stroke="currentColor" strokeWidth="2.4" />
      {/* right lens */}
      <circle cx="100" cy="25" r="18" fill="rgba(253, 249, 244, 0.4)" stroke="currentColor" strokeWidth="2.4" />
      {/* bridge */}
      <path d="M 48 25 Q 65 18 82 25" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      {/* earpieces */}
      <path d="M 13 22 L 4 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M 117 22 L 126 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}
