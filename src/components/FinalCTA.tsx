import { PuzzlePiece } from "@phosphor-icons/react"
import { useReveal } from "../hooks/useReveal"
import OpenDoor from "./hero/OpenDoor"

export default function FinalCTA() {
  const cta = useReveal<HTMLElement>()
  const footer = useReveal<HTMLElement>(0.05)

  return (
    <>
      <section
        ref={cta.ref}
        className={`final-cta reveal-cascade${cta.shown ? " shown" : ""}`}
        aria-labelledby="final-cta-h"
      >
        <OpenDoor />

        <p className="final-cta-eyebrow">And then — they're back in</p>
        <h2 id="final-cta-h" className="final-cta-h">
          Hold the door <em>open</em> for them.
        </h2>
        <p className="final-cta-sub">
          You set it up once. They get the people they love, the news they
          follow, the photos they've been missing — without the struggle.
        </p>
        <a href="#install" className="btn-primary btn-xl">
          <PuzzlePiece weight="bold" size={26} aria-hidden="true" />
          Add to Browser — 7 days free
        </a>
        <p className="final-cta-note">
          No card. No commitment. Done in 5 minutes.
        </p>
      </section>

      <footer
        ref={footer.ref}
        className={`site-footer reveal${footer.shown ? " shown" : ""}`}
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

          <p className="footer-r">Built for the people we care for.</p>
        </div>
      </footer>
    </>
  )
}
