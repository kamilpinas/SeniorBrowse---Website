import { Heart } from '@phosphor-icons/react'

/** One friendly video-call face. */
function Face({ skin, hair }: { skin: string; hair: string }) {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true">
      <path d="M 13 32 Q 13 13 30 12 Q 47 13 47 32" fill={hair} />
      <circle cx="30" cy="33" r="15" fill={skin} />
      <path d="M 15 30 Q 13 16 30 14 Q 47 16 45 30 Q 40 22 30 22 Q 20 22 15 30 Z" fill={hair} />
      <circle cx="24.5" cy="33" r="1.9" fill="#3a2a1c" />
      <circle cx="35.5" cy="33" r="1.9" fill="#3a2a1c" />
      <path
        d="M 24 40 Q 30 45 36 40"
        stroke="#7a2614"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * The closing illustration — a family video call. The outcome of the
 * whole page: the people you love, connected again. Faces gently bob,
 * hearts drift up.
 */
export default function FamilyCall() {
  return (
    <div className="famcall" aria-hidden="true">
      <div className="fc-device">
        <div className="fc-screen">
          <div className="fc-tile" style={{ ['--d' as string]: '0s' }}>
            <Face skin="#fde0c8" hair="#6b4f3a" />
          </div>
          <div className="fc-tile" style={{ ['--d' as string]: '0.4s' }}>
            <Face skin="#f6cfa8" hair="#3a2a1c" />
          </div>
          <div className="fc-tile" style={{ ['--d' as string]: '0.8s' }}>
            <Face skin="#fde3d0" hair="#c4a04a" />
          </div>
          <div className="fc-tile" style={{ ['--d' as string]: '1.2s' }}>
            <Face skin="#f3c9a0" hair="#8a5a36" />
          </div>
        </div>
        <div className="fc-bar">
          <span className="fc-dot" />
          Family call · everyone's here
        </div>
      </div>

      <span className="fc-heart h1"><Heart weight="fill" size={16} /></span>
      <span className="fc-heart h2"><Heart weight="fill" size={22} /></span>
      <span className="fc-heart h3"><Heart weight="fill" size={13} /></span>
      <span className="fc-heart h4"><Heart weight="fill" size={18} /></span>
    </div>
  )
}
