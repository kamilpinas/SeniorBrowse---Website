import { useEffect, useRef } from 'react'
import { Check, PuzzlePiece } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { useReveal } from '../hooks/useReveal'

/** Count from 0 up to `target` when the element enters viewport. */
function PriceCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let triggered = false
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = '$' + obj.val.toFixed(2)
            },
          })
          obs.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>$0.00</span>
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

  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-h">
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
          <span className="save-badge">Save 33%</span>
          <p className="plan-name">Annual</p>
          <p className="price"><PriceCounter target={39.99} /></p>
          <p className="price-unit">per year</p>
          <p className="price-note">That's $3.33 a month, billed once.</p>
          <ul className="price-bullets">
            {ANNUAL_BULLETS.map(b => (
              <li key={b}>
                <Check weight="bold" size={16} className="check" />
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
          <p className="plan-name">Monthly</p>
          <p className="price"><PriceCounter target={4.99} /></p>
          <p className="price-unit">per month</p>
          <p className="price-note">Billed monthly. Cancel any time.</p>
          <ul className="price-bullets">
            {MONTHLY_BULLETS.map(b => (
              <li key={b}>
                <Check weight="bold" size={16} className="check" />
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
          Add to Chrome — 7 days free
        </a>
        <p className="pricing-cta-note">
          No payment until day 8. We'll remind you the day before.
        </p>
      </div>
    </section>
  )
}
