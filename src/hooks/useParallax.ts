import { useEffect, useRef } from 'react'

/**
 * Light scroll-linked parallax. Writes the CSS custom property
 * `--parallax-y` on the element so the consuming CSS can do
 * `translate: 0 var(--parallax-y, 0)` without stomping any
 * existing transform on the element.
 *
 * @param speed - positive = element drifts opposite the scroll
 *                (so a 0.1 speed at 200px past viewport center
 *                shifts the element down by ~20px).
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.1,
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false
    const update = () => {
      ticking = false
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.bottom < -240 || rect.top > vh + 240) return
      const centerOffset = rect.top + rect.height / 2 - vh / 2
      const y = centerOffset * -speed
      el.style.setProperty('--parallax-y', `${y.toFixed(2)}px`)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [speed])

  return ref
}
