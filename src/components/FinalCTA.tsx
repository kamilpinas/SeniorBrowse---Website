import { PuzzlePiece } from '@phosphor-icons/react'
import { useReveal } from '../hooks/useReveal'
import DustParticles from './DustParticles'

export default function FinalCTA() {
  const cta = useReveal<HTMLElement>()
  const footer = useReveal<HTMLElement>(0.05)

  return (
    <>
      <section
        ref={cta.ref}
        className={`final-cta reveal-cascade${cta.shown ? ' shown' : ''}`}
        aria-labelledby="final-cta-h"
      >
        <DustParticles density={60} maxSize={3.5} driftY={-7} swayX={26} />
        <h2 id="final-cta-h" className="final-cta-h">
          You set it up. They just <em>browse</em>.
        </h2>
        <p className="final-cta-sub">
          Try SeniorBrowse free for 7 days. Cancel any time.
        </p>
        <a href="#install" className="btn-primary btn-xl">
          <PuzzlePiece weight="bold" size={26} aria-hidden="true" />
          Add to Chrome — 7 days free
        </a>
        <p className="final-cta-note">
          No card. No commitment. Done in 5 minutes.
        </p>
      </section>

      <footer
        ref={footer.ref}
        className={`site-footer reveal${footer.shown ? ' shown' : ''}`}
      >
        <div className="footer-grid">
          <div className="footer-l">
            <span className="brand-name-sm">
              Senior<span className="br">Browse</span>
            </span>
            <p className="footer-meta">© 2026 SeniorBrowse. Made with care.</p>
          </div>

          <nav className="footer-c" aria-label="Footer">
            <a href="#see-it">How it works</a>
            <span aria-hidden="true">·</span>
            <a href="#safety">Safety</a>
            <span aria-hidden="true">·</span>
            <a href="#pricing">Pricing</a>
            <span aria-hidden="true">·</span>
            <a href="#faq">FAQ</a>
          </nav>

          <p className="footer-r">
            Built for grandmothers, by their grandchildren.
          </p>
        </div>
      </footer>
    </>
  )
}
