/**
 * Stylised line portrait. Sits in a "Polaroid" frame in the founder
 * scene desk. Single colour stroke — picks up currentColor.
 */
export default function GrandmaPortrait() {
  return (
    <div className="polaroid polaroid-grandma" aria-hidden="true">
      <div className="polaroid-photo">
        <svg viewBox="0 0 200 240" fill="none">
          {/* hair bun on top */}
          <ellipse cx="100" cy="40" rx="26" ry="20" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="32" r="6" stroke="currentColor" strokeWidth="2" />
          {/* face */}
          <ellipse cx="100" cy="120" rx="58" ry="72" stroke="currentColor" strokeWidth="2.2" />
          {/* hair sides */}
          <path d="M 44 95 Q 44 70 70 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 156 95 Q 156 70 130 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* reading glasses */}
          <circle cx="76" cy="112" r="15" stroke="currentColor" strokeWidth="2" />
          <circle cx="124" cy="112" r="15" stroke="currentColor" strokeWidth="2" />
          <line x1="91" y1="112" x2="109" y2="112" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="61" y1="112" x2="52" y2="108" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="139" y1="112" x2="148" y2="108" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* eyes inside glasses */}
          <circle cx="76" cy="112" r="2" fill="currentColor" />
          <circle cx="124" cy="112" r="2" fill="currentColor" />
          {/* nose */}
          <path d="M 100 124 Q 96 138 100 142" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* smile */}
          <path d="M 84 158 Q 100 168 116 158" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* earrings */}
          <circle cx="44" cy="128" r="2.4" fill="currentColor" />
          <circle cx="156" cy="128" r="2.4" fill="currentColor" />
          {/* pearl necklace */}
          <path d="M 64 198 Q 100 218 136 198" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="74" cy="202" r="2" fill="currentColor" />
          <circle cx="88" cy="208" r="2" fill="currentColor" />
          <circle cx="100" cy="212" r="2.4" fill="currentColor" />
          <circle cx="112" cy="208" r="2" fill="currentColor" />
          <circle cx="126" cy="202" r="2" fill="currentColor" />
        </svg>
      </div>
      <p className="polaroid-caption">Babcia, 2009</p>
      <span className="washi washi-tl" />
      <span className="washi washi-br" />
    </div>
  )
}
