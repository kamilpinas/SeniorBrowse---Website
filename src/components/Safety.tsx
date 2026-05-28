import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReveal } from '../hooks/useReveal'
import {
  IconNoAds,
  IconShieldCheck,
  IconNoDownload,
  IconPrivateHistory,
} from './safety/SafetyIcons'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PILLARS = [
  {
    n: '01',
    Icon: IconNoAds,
    h: 'No ads, no clutter',
    p: 'We block the banners, pop-ups, and tracking scripts that make modern websites overwhelming. Pages look clean from the moment your parent arrives.',
  },
  {
    n: '02',
    Icon: IconShieldCheck,
    h: "Scam links blocked before they're clicked",
    p: 'When a known phishing or scam site is loaded, the page is replaced with a clear warning. You can choose: block automatically, warn first, or turn off.',
  },
  {
    n: '03',
    Icon: IconNoDownload,
    h: 'No accidental downloads',
    p: "Files don't download by mistake. If a website tries, nothing happens. You can change this from settings.",
  },
  {
    n: '04',
    Icon: IconPrivateHistory,
    h: 'A history kept for you, only on their computer',
    p: 'Every visit is logged so you can review it during your weekly check-in.',
    precise: 'The history stays on their machine. We never see it, send it anywhere, or analyse it.',
  },
]

export default function Safety() {
  const head = useReveal<HTMLElement>(0.3)
  const grid = useReveal<HTMLDivElement>(0.12)
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const iconWrappers = sectionRef.current?.querySelectorAll('.pillar-icon')
      if (!iconWrappers) return

      iconWrappers.forEach((wrapper, i) => {
        // Every stroked geometric element inside the icon SVG.
        const paths = wrapper.querySelectorAll<SVGGeometryElement>(
          'path, line, polyline, polygon, circle, rect, ellipse',
        )

        // Cache each element's natural length and start fully hidden.
        const lengths = new Map<SVGGeometryElement, number>()
        paths.forEach((el) => {
          let len = 200
          try {
            // getTotalLength works on path/line/polyline/circle/ellipse;
            // for rect/polygon some browsers throw — fall back.
            len = (el as SVGGeometryElement).getTotalLength?.() ?? 200
            if (!len || !isFinite(len)) len = 200
          } catch {
            // SVG type without getTotalLength — use the fallback.
          }
          lengths.set(el, len)
          gsap.set(el, {
            strokeDasharray: len,
            strokeDashoffset: len,
          })
        })

        // Draw each stroke in sequence as the pillar enters view.
        gsap.to(Array.from(paths), {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 82%',
            once: true,
          },
          delay: i * 0.06,
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="safety" id="safety" aria-labelledby="safety-h">
      <header
        ref={head.ref}
        className={`safety-head reveal-cascade${head.shown ? ' shown' : ''}`}
      >
        <p className="eyebrow-c">Safety &amp; Control</p>
        <h2 id="safety-h">You decide what's safe. We make sure they stay there.</h2>
        <p className="subhead">Four protections built in. None of them require you to think about it after setup.</p>
      </header>

      <div
        ref={grid.ref}
        className={`pillars reveal-stagger${grid.shown ? ' shown' : ''}`}
      >
        {PILLARS.map((p, i) => (
          <article
            className="pillar"
            key={p.n}
            style={{ ['--i' as string]: i } as React.CSSProperties}
          >
            <div className="pillar-row">
              <span className="numeral" aria-hidden="true">{p.n}</span>
              <span className="pillar-icon" aria-hidden="true">
                <p.Icon />
              </span>
            </div>
            <h3>{p.h}</h3>
            <p>
              {p.p}
              {p.precise && <> <span className="precise">{p.precise}</span></>}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
