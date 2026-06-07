import { useEffect, useRef } from 'react'
import { PuzzlePiece } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReveal } from '../hooks/useReveal'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// two 0-9 cycles so every digit rolls a full turn before landing
const DIGITS = '01234567890123456789'.split('')

/** Odometer: each digit reel rolls up and settles on the price. */
function Odometer({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const chars = ('$' + value.toFixed(2)).split('')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let triggered = false
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !triggered) {
          triggered = true
          const reels = el.querySelectorAll<HTMLElement>('.od-reel-inner')
          reels.forEach((reel, i) => {
            const d = Number(reel.dataset.d)
            gsap.fromTo(
              reel,
              { yPercent: 0 },
              {
                yPercent: -(10 + d) * 5,
                duration: 2 + i * 0.2,
                ease: 'power3.out',
              },
            )
          })
          obs.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return (
    <span className="od" ref={ref} aria-hidden="true">
      {chars.map((c, i) =>
        c >= '0' && c <= '9' ? (
          <span className="od-reel" key={i}>
            <span className="od-reel-inner" data-d={c}>
              {DIGITS.map((d, j) => (
                <span className="od-digit" key={j}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span className="od-char" key={i}>{c}</span>
        ),
      )}
    </span>
  )
}

/** A check mark whose stroke draws itself in. */
function DrawCheck() {
  return (
    <span className="check" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <polyline
          className="check-path"
          points="20 6 9 17 4 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

const ANNUAL_BULLETS = [
  '7 days free, no card required',
  'Cancel any time',
  'Family discount: install on multiple computers for one license',
]
const MONTHLY_BULLETS = [
  '7 days free, no card required',
  'Cancel any time',
  'Switch to annual any time',
]

function spotlight(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
}

export default function Pricing() {
  const head = useReveal<HTMLElement>(0.3)
  const grid = useReveal<HTMLDivElement>(0.1)
  const cta = useReveal<HTMLDivElement>(0.3)
  const sectionRef = useRef<HTMLElement>(null)

  // Badge stamp-press + checkmarks draw, when the grid scrolls in.
  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const badge = section.querySelector('.save-badge')
      const paths = section.querySelectorAll<SVGGeometryElement>('.check-path')

      // hide until their cue
      if (badge) gsap.set(badge, { autoAlpha: 0 })
      paths.forEach((p) => {
        const len = p.getTotalLength?.() || 40
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })

      ScrollTrigger.create({
        trigger: '.pricing-grid',
        start: 'top 75%',
        once: true,
        onEnter: () => {
          // stamp the Save badge in — straight, with a soft settle
          if (badge) {
            const tl = gsap.timeline({ delay: 0.5 })
            tl.fromTo(
              badge,
              { autoAlpha: 0, scale: 2.1 },
              { autoAlpha: 1, scale: 1, duration: 0.85, ease: 'power3.out' },
            )
            tl.to(badge, {
              scale: 1.06,
              duration: 0.32,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: 1,
            })
          }
          // draw the checkmarks in sequence
          gsap.to(paths, {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
            delay: 0.7,
          })
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="pricing" id="pricing" aria-labelledby="pricing-h">
      <header
        ref={head.ref}
        className={`pricing-head reveal-cascade${head.shown ? ' shown' : ''}`}
      >
        <p className="eyebrow-c">Pricing</p>
        <h2 id="pricing-h">One simple price.</h2>
        <p className="pricing-sub">
          Try it free for 7 days. Decide if it's worth it. No card needed to start.
        </p>
      </header>

      <div
        ref={grid.ref}
        className={`pricing-grid reveal-stagger${grid.shown ? ' shown' : ''}`}
      >
        <article
          className="price-card price-annual from-left"
          style={{ ['--i' as string]: 0 } as React.CSSProperties}
          onMouseMove={spotlight}
        >
          <span className="card-spotlight" aria-hidden="true" />
          <span className="card-sheen" aria-hidden="true" />
          <div className="plan-row">
            <p className="plan-name">Annual</p>
            <span className="save-badge">Save 33%</span>
          </div>
          <p className="price"><Odometer value={39.99} /></p>
          <p className="price-unit">per year</p>
          <p className="price-note">That's $3.33 a month, billed once.</p>
          <ul className="price-bullets">
            {ANNUAL_BULLETS.map(b => (
              <li key={b}>
                <DrawCheck />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </article>

        <article
          className="price-card from-right"
          style={{ ['--i' as string]: 1 } as React.CSSProperties}
          onMouseMove={spotlight}
        >
          <span className="card-spotlight" aria-hidden="true" />
          <div className="plan-row">
            <p className="plan-name">Monthly</p>
          </div>
          <p className="price"><Odometer value={4.99} /></p>
          <p className="price-unit">per month</p>
          <p className="price-note">Billed monthly. Cancel any time.</p>
          <ul className="price-bullets">
            {MONTHLY_BULLETS.map(b => (
              <li key={b}>
                <DrawCheck />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div
        ref={cta.ref}
        className={`pricing-cta reveal${cta.shown ? ' shown' : ''}`}
      >
        <a href="#install" className="btn-primary">
          <PuzzlePiece weight="bold" size={22} aria-hidden="true" />
          Add to Browser — 7 days free
        </a>
        <p className="pricing-cta-note">
          No payment until day 8. We'll remind you the day before.
        </p>
      </div>
    </section>
  )
}
