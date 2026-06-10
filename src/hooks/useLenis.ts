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
      removers = Array.from(sections).map((el) => {
        // The hero snaps to the absolute top of the page (scroll 0) so
        // settling there never tucks the navbar out of view. Every
        // other section snaps a little lower — past most of its own
        // top padding — so the settle centres the content instead of
        // leaving a band of padding at the top with the content cut
        // off below. Snap has no offset option, so each section gets
        // an invisible marker placed where its top should land (all
        // sections are position: relative).
        if (el.classList.contains('hero')) {
          return snap.add(0)
        }
        const padTop = parseFloat(getComputedStyle(el).paddingTop) || 0
        const offset = Math.max(0, padTop - 28)
        const marker = document.createElement('span')
        marker.style.cssText = `position:absolute;top:${offset}px;left:0;width:1px;height:1px;visibility:hidden;pointer-events:none;`
        el.appendChild(marker)
        const removeSnap = snap.addElement(marker, { align: 'start' })
        return () => {
          removeSnap()
          marker.remove()
        }
      })

      // Settling near the end of the page rests at the very bottom
      // (footer fully in view) instead of being pulled back up to the
      // final CTA's snap point.
      const footer = document.querySelector<HTMLElement>('.site-footer')
      if (footer) {
        removers.push(snap.addElement(footer, { align: 'end' }))
      }
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
