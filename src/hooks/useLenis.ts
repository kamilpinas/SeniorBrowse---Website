import { useEffect } from 'react'
import Lenis from 'lenis'
import Snap from 'lenis/snap'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Sections that should frame themselves when you settle near them. */
const SNAP_SELECTOR =
  '.hero, .see-it, .beforeafter, .founder-scene, .safety, .setup, .pricing, .faq, .final-cta'

/**
 * Mount once at the app root. Sets up Lenis smooth scroll, wires it into
 * GSAP's ScrollTrigger, and adds a gentle section-snap helper.
 *
 * The snap runs in 'proximity' mode: when you stop scrolling near the
 * start of a section, it smoothly eases so the whole section frames
 * itself. If you stop deep inside a long section (reading), nothing
 * happens — it never fights you or hijacks the scroll.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    })

    // Lenis -> ScrollTrigger refresh
    lenis.on('scroll', ScrollTrigger.update)

    // GSAP ticker drives Lenis raf (so they share one frame loop)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // ── gentle section snap ──────────────────────────────────────────
    const snap = new Snap(lenis, {
      type: 'proximity',
      duration: 1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      distanceThreshold: '32%',
      debounce: 450,
    })

    // Register after layout settles so ScrollTrigger pins are measured.
    let removers: Array<() => void> = []
    const registerId = window.setTimeout(() => {
      ScrollTrigger.refresh()
      const sections = document.querySelectorAll<HTMLElement>(SNAP_SELECTOR)
      removers = Array.from(sections).map((el) =>
        snap.addElement(el, { align: 'start' }),
      )
    }, 300)

    return () => {
      window.clearTimeout(registerId)
      removers.forEach((r) => r())
      snap.destroy()
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}
