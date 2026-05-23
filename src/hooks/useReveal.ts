import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element once when it scrolls into view.
 * Returns a ref to attach and a `shown` boolean for class toggling.
 *
 * The .shown flip is deferred by two animation frames so the browser
 * paints the initial state first — without that, React batching merges
 * the mount and the setShown(true) commit into one paint and the CSS
 * transition has nothing to interpolate from.
 *
 * Note: reveals are gentle opacity/translate fades — safe for users
 * with prefers-reduced-motion (they don't cause vestibular issues).
 * Parallax is the part that respects that preference.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.15,
) {
  const ref = useRef<T | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf1 = 0
    let raf2 = 0

    const reveal = () => {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setShown(true))
      })
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal()
            obs.disconnect()
            break
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [threshold])

  return { ref, shown }
}
