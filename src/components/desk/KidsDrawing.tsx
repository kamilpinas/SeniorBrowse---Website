/**
 * A child's drawing — a scribbly heart with the word GRANDMA in
 * crayon. Held to the desk with washi tape on two corners.
 * The colour breaks the muted-monochrome rule by design: kids draw
 * in colour. It's the warmest, most human prop in the scene.
 */
export default function KidsDrawing() {
  return (
    <div className="kids-drawing" aria-hidden="true">
      <svg viewBox="0 0 180 140">
        {/* paper */}
        <rect x="2" y="2" width="176" height="136" fill="#fdf9f4" stroke="#c8b49a" strokeWidth="0.8" />
        {/* heart — scribbly, double-stroked for child hand feel */}
        <path
          d="M 90 50 Q 70 32 50 44 Q 32 60 50 82 Q 65 100 90 116 Q 115 100 130 82 Q 148 60 130 44 Q 110 32 90 50 Z"
          fill="rgba(156, 53, 32, 0.55)"
          stroke="#9c3520"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M 90 56 Q 76 44 62 52 Q 50 64 64 80"
          stroke="#7a2614"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        {/* GRANDMA — handwritten cap letters */}
        <text
          x="90"
          y="132"
          textAnchor="middle"
          fontFamily="'Comic Sans MS', 'Marker Felt', cursive"
          fontSize="13"
          fontWeight="700"
          fill="#7a2614"
          letterSpacing="1"
        >
          GRANDMA
        </text>
      </svg>
      <span className="washi washi-tl" />
      <span className="washi washi-tr" />
    </div>
  )
}
