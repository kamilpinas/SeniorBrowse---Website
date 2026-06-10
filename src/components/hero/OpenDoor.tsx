import { Heart } from '@phosphor-icons/react'

/**
 * The closing illustration — a door swinging open as the section
 * reveals, warm light spilling out. The promise of the headline made
 * visible: the way back in is open, and the people they love are on
 * the other side. The panel is an HTML overlay (not SVG) so it can
 * rotate in real 3D.
 */
export default function OpenDoor() {
  return (
    <div className="opendoor" aria-hidden="true">
      <svg viewBox="0 0 320 310" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="od-halo">
            <stop offset="0%" stopColor="#ffe2a4" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffe2a4" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="od-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff8e6" />
            <stop offset="100%" stopColor="#ffd98f" />
          </linearGradient>
          <linearGradient id="od-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffdf9e" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffdf9e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* glow + floor spill — fade in as the door opens */}
        <g className="od-lightwrap">
          <ellipse
            className="od-glow"
            cx="160"
            cy="150"
            rx="140"
            ry="124"
            fill="url(#od-halo)"
          />
          <polygon
            className="od-spill"
            points="104,272 216,272 296,308 24,308"
            fill="url(#od-floor)"
          />
        </g>

        {/* frame + bright doorway */}
        <rect x="88" y="30" width="144" height="246" rx="14" fill="#2a1c0e" />
        <rect x="102" y="44" width="116" height="232" rx="8" fill="url(#od-light)" />
      </svg>

      {/* the door itself — starts closed, swings open on reveal */}
      <div className="od-panel" />

      <span className="od-heart h1"><Heart weight="fill" size={16} /></span>
      <span className="od-heart h2"><Heart weight="fill" size={21} /></span>
      <span className="od-heart h3"><Heart weight="fill" size={13} /></span>
    </div>
  )
}
