import { useRef, useState, useEffect } from "react"
import {
  Heart,
  Play,
  Pause,
  CornersOut,
  LockSimple,
  Check,
  PuzzlePiece,
  Envelope,
  Star,
  Palette,
  House,
  SpeakerHigh,
  SpeakerSlash,
} from "@phosphor-icons/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useReveal } from "../hooks/useReveal"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ── Drop your real configuration walkthrough here ───────────────────
   Put the file in /public and point VIDEO_SRC at it, e.g.
     VIDEO_SRC  = "/walkthrough.mp4"
     POSTER_SRC = "/walkthrough-poster.jpg"                          */
const VIDEO_SRC = "movie.mp4"
const POSTER_SRC = ""

/* The setup steps that tick off as the video plays. Optionally give
   each a timestamp (seconds) to sync exactly with your recording;
   leave STEP_TIMES empty to split evenly across the video length. */
const STEPS = [
  { Icon: PuzzlePiece, text: "Add SeniorBrowse to your browser" },
  { Icon: Envelope, text: "Enter yours & their name" },
  { Icon: Star, text: "Pick a few favourite sites" },
  { Icon: Palette, text: "Choose the theme & text size" },
  { Icon: LockSimple, text: "Set a caregiver PIN" },
  { Icon: House, text: "Hand over a ready home screen" },
]
const STEP_TIMES: number[] = [8, 17, 19, 20, 27, 52] // e.g. [0, 9, 21, 34, 46, 54]

function fmt(s: number) {
  if (!isFinite(s)) s = 0
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return `${m}:${String(r).padStart(2, "0")}`
}

export default function WalkthroughVideo() {
  const reveal = useReveal<HTMLDivElement>(0.05)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const entranceRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)

  // Keep the video element in sync with the volume/mute UI state.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.volume = volume
    v.muted = muted
  }, [volume, muted])

  // E1 — focus-pull entrance: the window fades in slightly blurred and
  // scaled, then "pulls into focus" as it settles.
  useGSAP(
    () => {
      if (!entranceRef.current) return
      gsap.from(entranceRef.current, {
        y: 70,
        scale: 0.92,
        autoAlpha: 0,
        filter: "blur(16px)",
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: entranceRef.current,
          start: "top 82%",
          once: true,
        },
      })
    },
    { scope: rootRef },
  )

  // Mouse-driven 3D tilt — the window leans toward the cursor.
  useEffect(() => {
    const frame = tiltRef.current
    if (!frame) return

    let raf = 0
    let queued = false
    let mx = 0
    let my = 0

    const apply = () => {
      queued = false
      const r = frame.getBoundingClientRect()
      const dx = (mx - (r.left + r.width / 2)) / (r.width / 2)
      const dy = (my - (r.top + r.height / 2)) / (r.height / 2)
      frame.style.setProperty("--ry", `${(dx * 4).toFixed(2)}deg`)
      frame.style.setProperty("--rx", `${(-dy * 4).toFixed(2)}deg`)
    }
    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!queued) {
        queued = true
        raf = requestAnimationFrame(apply)
      }
    }
    const onLeave = () => {
      frame.style.setProperty("--rx", "0deg")
      frame.style.setProperty("--ry", "0deg")
    }

    frame.addEventListener("pointermove", onMove)
    frame.addEventListener("pointerleave", onLeave)
    return () => {
      frame.removeEventListener("pointermove", onMove)
      frame.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  const hasVideo = Boolean(VIDEO_SRC)

  const toggle = () => {
    const v = videoRef.current
    if (!v || !hasVideo) return
    if (v.paused) void v.play()
    else v.pause()
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current
    if (!v || !duration) return
    const r = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - r.left) / r.width) * duration
  }

  const goFullscreen = () => {
    tiltRef.current?.requestFullscreen?.()
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    setVolume(val)
    setMuted(val === 0)
  }

  const toggleMute = () => setMuted((m) => !m)

  const pct = duration ? (current / duration) * 100 : 0

  // T3 — how many steps are "done" given the current playback time.
  let stepsDone = 0
  if (duration > 0) {
    if (STEP_TIMES.length === STEPS.length) {
      stepsDone = STEP_TIMES.filter((t) => current >= t).length
    } else {
      stepsDone = Math.min(
        STEPS.length,
        Math.floor((current / duration) * STEPS.length),
      )
    }
  }

  return (
    <div
      ref={(el) => {
        reveal.ref.current = el
        rootRef.current = el
      }}
      className={`walkthrough reveal from-right${reveal.shown ? " shown" : ""}${playing ? " playing-theater" : ""}`}
    >
      <div className="walk-head">
        <p className="eyebrow-c">The 60-second walkthrough</p>
        <h3 className="walk-h3">
          Watch a full setup, <em>start to finish</em>.
        </h3>
      </div>

      <div className="walk-stage3d">
        <span className="walk-glow" aria-hidden="true" />

        <div ref={entranceRef} className="walk-entrance">
          <div ref={tiltRef} className="walk-tilt video-frame">
            {/* Browser-style chrome */}
            <div className="walk-titlebar">
              <div className="lights">
                <span className="light r" />
                <span className="light y" />
                <span className="light g" />
              </div>
              <div className="urlbar">
                <LockSimple weight="fill" size={14} />
                <span>seniorbrowse&nbsp;·&nbsp;setup</span>
              </div>
            </div>

            <div className="video-stage">
              <video
                ref={videoRef}
                className="walk-video"
                src={VIDEO_SRC || undefined}
                poster={POSTER_SRC || undefined}
                playsInline
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              />

              {/* Branded placeholder — shows until a real video plays */}
              {(!hasVideo || !playing) && (
                <div className="poster walk-poster" aria-hidden="true">
                  <div className="poster-head">
                    <span className="poster-eyebrow">SeniorBrowse</span>
                    <span className="poster-mark">
                      <Heart weight="fill" size={26} color="#fff" />
                    </span>
                  </div>
                  <div className="poster-body">
                    <h2 className="poster-title">
                      <span className="line-1">The internet,</span>
                      <span className="line-2">finally easy.</span>
                    </h2>
                    <p className="poster-sub">
                      A real walkthrough — install, name them, pick sites, set a
                      PIN, done.
                    </p>
                  </div>
                  <div className="poster-foot">
                    <span>SeniorBrowse.com</span>
                    <span>{hasVideo ? "Press play" : "Video coming soon"}</span>
                  </div>
                </div>
              )}

              <button
                className={`play-badge${playing ? " is-playing" : ""}`}
                aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}
                onClick={toggle}
              >
                {playing ? (
                  <Pause weight="fill" size={42} aria-hidden="true" />
                ) : (
                  <Play weight="fill" size={42} aria-hidden="true" />
                )}
              </button>
            </div>

            <div className="video-controls">
              <button
                className="vc-btn"
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <Pause weight="fill" size={16} />
                ) : (
                  <Play weight="fill" size={16} />
                )}
              </button>
              <div className="vc-progress" onClick={seek}>
                <div className="vc-bar" style={{ width: `${pct}%` }} />
              </div>
              <span className="vc-time">
                {fmt(current)} / {fmt(duration)}
              </span>
              <div className="vc-volume">
                <button
                  className="vc-btn vc-mute"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted || volume === 0 ? (
                    <SpeakerSlash weight="fill" size={16} />
                  ) : (
                    <SpeakerHigh weight="fill" size={16} />
                  )}
                </button>
                <input
                  className="vc-vol-slider"
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={changeVolume}
                  aria-label="Volume"
                  style={{
                    background: `linear-gradient(to right, var(--color-accent) ${
                      (muted ? 0 : volume) * 100
                    }%, rgba(255, 255, 255, 0.14) ${(muted ? 0 : volume) * 100}%)`,
                  }}
                />
              </div>
              <button
                className="vc-fs"
                aria-label="Fullscreen"
                onClick={goFullscreen}
              >
                <CornersOut weight="bold" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* T3 — steps tick off in sequence as the video plays */}
      <div className="what-list">
        <p className="what-title">Follow along</p>
        <ul>
          {STEPS.map(({ Icon, text }, i) => (
            <li key={text} className={i < stepsDone ? "done" : ""}>
              <span className="marker" aria-hidden="true">
                <Icon weight="fill" size={15} className="marker-icon" />
                <Check weight="bold" size={15} className="marker-check" />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
