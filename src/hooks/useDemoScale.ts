import { useEffect, useRef } from 'react'

/**
 * Below `breakpoint`px the demo's two columns (browser + side panel) would
 * cramp, so the window is pinned to `designWidth`px and — taken out of flow
 * via CSS — scaled down to fit its wrapper. This writes `--demo-scale-factor`
 * and `--demo-scale-h` on the wrapper, both consumed by CSS inside the
 * matching media query, so a stale value can never reach the desktop layout.
 *
 * The fit factor can't be expressed in pure CSS (you can't divide by the
 * container width), so it's computed here. Because the window is out of flow,
 * the wrapper reports the true available width without feeding back on the
 * scale.
 *
 * Returns the two refs to attach: `wrapRef` on the wrapper, `windowRef` on
 * the pinned-width window inside it.
 */
export function useDemoScale(designWidth: number, breakpoint: number) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const win = windowRef.current
    if (!wrap || !win) return

    const apply = () => {
      if (window.innerWidth > breakpoint) {
        wrap.style.removeProperty('--demo-scale-factor')
        wrap.style.removeProperty('--demo-scale-h')
        return
      }
      const avail = wrap.clientWidth
      if (avail < 40) return // ignore degenerate transient measurements
      const factor = Math.min(1, avail / designWidth)
      wrap.style.setProperty('--demo-scale-factor', String(factor))
      wrap.style.setProperty('--demo-scale-h', `${win.offsetHeight * factor}px`)
    }

    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [designWidth, breakpoint])

  return { wrapRef, windowRef }
}
