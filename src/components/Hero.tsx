import { useEffect, useRef } from "react"
import { PuzzlePiece } from "@phosphor-icons/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useParallax } from "../hooks/useParallax"
import GrandmaAtComputer from "./hero/GrandmaAtComputer"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const illustrationRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useParallax<HTMLDivElement>(0.12)

  // Cursor tracking — pupils follow the mouse, head subtly tilts.
  // CSS variables on the illustration drive the SVG transforms.
  useEffect(() => {
    const node = illustrationRef.current
    if (!node) return

    let raf = 0
    let queued = false
    let lastX = 0
    let lastY = 0

    const apply = () => {
      queued = false
      const rect = node.getBoundingClientRect()
      // Anchor on the face centre (~upper third of the illustration)
      const cx = rect.left + rect.width * 0.4
      const cy = rect.top + rect.height * 0.35
      const dx = Math.max(-1, Math.min(1, (lastX - cx) / 360))
      const dy = Math.max(-1, Math.min(1, (lastY - cy) / 360))
      node.style.setProperty("--pupil-x", `${(dx * 2).toFixed(2)}px`)
      node.style.setProperty("--pupil-y", `${(dy * 1.6).toFixed(2)}px`)
      node.style.setProperty("--head-tilt", `${(dx * 2.6).toFixed(2)}deg`)
    }

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      if (!queued) {
        queued = true
        raf = requestAnimationFrame(apply)
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Scroll-out: as user scrolls past hero, Babcia drifts down + tilts
  // slightly and fades. The hero copy fades out on the same scroll
  // window so the whole stage exits together.
  useGSAP(
    () => {
      if (!illustrationRef.current || !heroRef.current) return

      const trigger = {
        trigger: heroRef.current,
        start: "bottom 85%",
        end: "bottom 20%",
        scrub: 1.2,
      }

      gsap.to(illustrationRef.current, {
        y: 80,
        autoAlpha: 0.15,
        scrollTrigger: trigger,
      })

      if (copyRef.current) {
        gsap.to(copyRef.current, {
          y: 60,
          autoAlpha: 0.15,
          scrollTrigger: trigger,
        })
      }
    },
    { scope: heroRef },
  )

  return (
    <section ref={heroRef} className="hero">
      <div ref={copyRef} className="hero-copy">
        <p className="eyebrow anim-up d1">
          For the senior you're helping
        </p>

        <h1 className="hero-h1 anim-up d2">
          <span className="l1">You set it up.</span>
          <span className="l2">
            They just <em>browse</em>.
          </span>
        </h1>

        <p className="hero-sub anim-up d3">
          Make the internet feel simple for the people you love. A calm home
          screen, big buttons, and a helper panel on every page&nbsp;— so they
          spend time with what matters, not figuring out tabs.
        </p>

        <div className="cta-row anim-up d4">
          <a href="#install" className="btn-primary">
            <PuzzlePiece weight="bold" size={22} aria-hidden="true" />
            Add to Browser
          </a>
          <div className="cta-meta">
            <span className="meta-1">7 days free</span>
            <span className="meta-2">
              No card required · Works with any browser
            </span>
          </div>
        </div>
      </div>

      {/* Hand-drawn illustration of Babcia next to her laptop.
          Blink, pupil-follow, head tilt, heart pulse all CSS-driven
          from the variables this component writes. */}
      <div
        ref={parallaxRef}
        className="grandma-wrap anim-up d5 parallax"
        aria-hidden="true"
      >
        <div ref={illustrationRef} className="grandma-illustration">
          <GrandmaAtComputer />
        </div>
      </div>
    </section>
  )
}
