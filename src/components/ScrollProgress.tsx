import { useEffect, useRef } from "react"

/**
 * Thin terracotta bar at the top of the viewport. Fills 0 → 1 as
 * the user scrolls the page. Uses transform: scaleX (GPU) and a
 * raf-throttled scroll listener so it doesn't add jank.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio =
        max <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / max))
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${ratio.toFixed(4)})`
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  )
}
