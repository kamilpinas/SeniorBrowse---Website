import { Check, PuzzlePiece } from '@phosphor-icons/react'

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

export default function Pricing() {
  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-h">
      <header className="pricing-head">
        <p className="eyebrow-c">Pricing</p>
        <h2 id="pricing-h">One simple price.</h2>
        <p className="pricing-sub">
          Try it free for 7 days. Decide if it's worth it. No card needed to start.
        </p>
      </header>

      <div className="pricing-grid">
        <article className="price-card price-annual">
          <span className="save-badge">Save 33%</span>
          <p className="plan-name">Annual</p>
          <p className="price">$39.99</p>
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

        <article className="price-card">
          <p className="plan-name">Monthly</p>
          <p className="price">$4.99</p>
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

      <div className="pricing-cta">
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
