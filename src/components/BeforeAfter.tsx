import { useRef, useState, useEffect } from "react"
import {
  ArrowsLeftRight,
  X,
  ArrowLeft,
  ArrowRight,
  ArrowClockwise,
  House,
  LockSimple,
  DotsThreeVertical,
  TextAa,
  BookmarkSimple,
  SpeakerHigh,
  SpeakerX,
  ArrowsDownUp,
  ArrowUp,
  ArrowDown,
  ArrowLineUp,
  ArrowsOut,
  XCircle,
} from "@phosphor-icons/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useReveal } from "../hooks/useReveal"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const HEADLINE =
  "Local gardener wins national rose prize for third year running"
const PARA_1 =
  "Margaret Hill, 74, has taken the top award at this year's national rose championship — her third consecutive win — for a deep-crimson bloom she spent six years cultivating in her back garden."
const PARA_2 =
  "“I never expected any of this,” she said. “I just love being out there with the roses every morning. It keeps me going.”"

const VOL_COLORS = [
  "#c44a30", "#b85a2c", "#ad6a28", "#a17924", "#958722", "#8a951f",
  "#7e9a1f", "#73a022", "#6ba12c", "#63a334", "#5ca53b", "#56a542",
]

// Browser chrome with small nav icons — identical on both panes.
const chrome = (
  <div className="ba-chrome">
    <span className="bw-ic"><ArrowLeft weight="bold" size={11} /></span>
    <span className="bw-ic"><ArrowRight weight="bold" size={11} /></span>
    <span className="bw-ic"><ArrowClockwise weight="bold" size={11} /></span>
    <span className="bw-ic"><House weight="bold" size={11} /></span>
    <span className="bw-url">
      <LockSimple weight="fill" size={9} />
      dailynews.co.uk/lifestyle/rose-prize
    </span>
    <span className="bw-ic"><DotsThreeVertical weight="bold" size={11} /></span>
  </div>
)

export default function BeforeAfter() {
  const reveal = useReveal<HTMLElement>(0.2)
  const rootRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const [split, setSplit] = useState(50)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const setFromX = (clientX: number) => {
      const r = stage.getBoundingClientRect()
      const p = ((clientX - r.left) / r.width) * 100
      setSplit(Math.max(6, Math.min(94, p)))
    }
    const onDown = (e: PointerEvent) => {
      draggingRef.current = true
      setFromX(e.clientX)
    }
    const onMove = (e: PointerEvent) => {
      if (draggingRef.current) setFromX(e.clientX)
    }
    const onUp = () => {
      draggingRef.current = false
    }

    stage.addEventListener("pointerdown", onDown)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      stage.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [])

  useGSAP(
    () => {
      if (!stageRef.current) return
      const o = { v: 50 }
      ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top 72%",
        once: true,
        onEnter: () => {
          gsap.to(o, {
            v: 68,
            duration: 0.7,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1,
            onUpdate: () => setSplit(o.v),
          })
        },
      })
    },
    { scope: rootRef },
  )

  return (
    <section
      ref={(el) => {
        reveal.ref.current = el
        rootRef.current = el
      }}
      className={`beforeafter reveal-cascade${reveal.shown ? " shown" : ""}`}
      id="before-after"
      aria-labelledby="ba-h"
    >
      <header className="ba-head">
        <p className="eyebrow-c">Before &amp; after</p>
        <h2 id="ba-h">
          The same page — <em>without the noise</em>.
        </h2>
        <p className="ba-sub">
          Drag the slider. Left is the website as it comes. Right is the same
          page with SeniorBrowse — the clutter cleared and the helper panel on
          hand.
        </p>
      </header>

      {/* Labels above the window */}
      <div className="ba-labels">
        <span className="ba-tag ba-tag-before">As it comes</span>
        <span className="ba-tag ba-tag-after">With SeniorBrowse</span>
      </div>

      <div className="ba-frame">
        <div
          ref={stageRef}
          className="ba-stage"
          style={{ ["--split" as string]: `${split}%` } as React.CSSProperties}
        >
          {/* BEFORE — the website as it normally comes */}
          <div className="ba-pane ba-before" aria-hidden="true">
            <div className="bw">
              {chrome}
              <div className="bw-page">
                <div className="bw-topnav">
                  <span className="bw-logo">Daily<b>News</b></span>
                  <span className="bw-links">
                    {["Home", "UK", "World", "Sport", "Money", "Tech", "Health"].map(
                      (l) => (
                        <span key={l}>{l}</span>
                      ),
                    )}
                  </span>
                </div>
                <span className="bw-kicker">UK · LIFESTYLE</span>
                <h4 className="bw-title">{HEADLINE}</h4>
                <span className="bw-byline">
                  By Sarah Whitcombe · 2 hours ago · 4 min read · 312 comments
                </span>
                <p className="bw-text">{PARA_1}</p>
                <div className="bw-ad">
                  <span>ADVERTISEMENT</span>
                  <span className="bw-ad-headline">
                    One weird trick to cut your energy bill →
                  </span>
                </div>
                <p className="bw-text">{PARA_2}</p>
                <p className="bw-text">{PARA_1}</p>
              </div>
              <div className="bw-popup">
                <span className="bw-popup-x"><X weight="bold" size={9} /></span>
                <strong>Subscribe &amp; save 50%!</strong>
                <span>Don't miss out — limited offer</span>
              </div>
            </div>
          </div>

          {/* AFTER — same site, cleaned, with the SeniorBrowse panel */}
          <div className="ba-pane ba-after" aria-hidden="true">
            <div className="aw">
              {chrome}
              <div className="aw-split">
                <div className="aw-main">
                  <div className="aw-topnav">
                    <span className="bw-logo">Daily<b>News</b></span>
                    <span className="aw-links">
                      {["Home", "UK", "World", "Sport", "Money", "Tech", "Health"].map(
                        (l) => (
                          <span key={l}>{l}</span>
                        ),
                      )}
                    </span>
                  </div>
                  <div className="aw-body">
                    <span className="aw-kicker">UK · LIFESTYLE</span>
                    <h4 className="aw-title">{HEADLINE}</h4>
                    <span className="aw-byline">
                      By Sarah Whitcombe · 2 hours ago · 4 min read
                    </span>
                    <p className="aw-text">{PARA_1}</p>
                    <p className="aw-text">{PARA_2}</p>
                  </div>
                </div>

                {/* Exact SeniorBrowse helper panel, static (non-interactive) */}
                <aside className="sidepanel" aria-label="Helper panel">
                  <div className="sp-home">
                    <House weight="bold" size={20} /> HOME
                  </div>
                  <div className="sp-row">
                    <div className="sp-tile">
                      <ArrowLeft weight="bold" size={18} />
                      BACK
                    </div>
                    <div className="sp-tile">
                      <ArrowRight weight="bold" size={18} />
                      FORWARD
                    </div>
                  </div>
                  <div className="sp-group">
                    <div className="sp-group-head">
                      <span className="lhs">
                        <SpeakerHigh weight="bold" size={14} /> VOLUME
                      </span>
                      <span className="rhs">100%</span>
                    </div>
                    <div className="vol-bars">
                      {VOL_COLORS.map((c, i) => (
                        <span key={i} style={{ background: c }} />
                      ))}
                    </div>
                    <div className="sp-row">
                      <div className="sp-sm">− LESS</div>
                      <div className="sp-sm muted">+ MORE</div>
                    </div>
                    <div className="sp-sm" style={{ width: "100%" }}>
                      <SpeakerX weight="bold" size={13} /> MUTE
                    </div>
                  </div>
                  <div className="sp-group">
                    <div className="sp-group-head">
                      <span className="lhs">
                        <ArrowsDownUp weight="bold" size={14} /> MOVE PAGE
                      </span>
                      <span className="rhs accent">Top</span>
                    </div>
                    <div className="move-dots">
                      <span className="on" />
                      <span className="on" />
                      <span /><span /><span /><span /><span />
                      <span /><span /><span /><span /><span />
                    </div>
                    <div className="sp-row">
                      <div className="sp-sm">
                        <ArrowUp weight="bold" size={13} /> UP
                      </div>
                      <div className="sp-sm">
                        <ArrowDown weight="bold" size={13} /> DOWN
                      </div>
                    </div>
                    <div className="sp-sm muted" style={{ width: "100%" }}>
                      <ArrowLineUp weight="bold" size={13} /> BACK TO TOP
                    </div>
                  </div>
                  <div className="sp-row">
                    <div className="sp-tile">
                      <TextAa weight="bold" size={18} />
                      TEXT SIZE
                    </div>
                    <div className="sp-tile">
                      <BookmarkSimple weight="bold" size={18} />
                      SAVE PAGE
                    </div>
                  </div>
                  <div className="sp-row">
                    <div className="sp-tile">
                      <ArrowsOut weight="bold" size={18} />
                      FULLSCREEN
                    </div>
                    <div className="sp-tile">
                      <ArrowClockwise weight="bold" size={18} />
                      REFRESH
                    </div>
                  </div>
                  <div className="sp-close">
                    <XCircle weight="bold" size={16} /> CLOSE PAGE
                  </div>
                </aside>
              </div>
            </div>
          </div>

          {/* Divider + handle */}
          <div className="ba-divider">
            <span className="ba-knob">
              <ArrowsLeftRight weight="bold" size={18} />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
