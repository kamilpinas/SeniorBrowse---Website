import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Mount once at the app root. Sets up Lenis smooth scroll and wires
 * it into GSAP's ScrollTrigger so scrubbed animations stay in sync
 * with the eased scroll position.
 *
 * Lenis must drive GSAP's ticker — without that, ScrollTrigger reads
 * the browser's native scroll while Lenis is animating to a different
 * position, and you get jitter on scrubbed timelines.
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

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}
