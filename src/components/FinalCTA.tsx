import { PuzzlePiece } from '@phosphor-icons/react'

export default function FinalCTA() {
  return (
    <>
      <section className="final-cta" aria-labelledby="final-cta-h">
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

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-l">
            <span className="brand-name-sm">
              Senior<span className="br">Browse</span>
            </span>
            <p className="footer-meta">© 2026 SeniorBrowse. Made with care.</p>
          </div>

          <nav className="footer-c" aria-label="Footer">
            <a href="#privacy">Privacy</a>
            <span aria-hidden="true">·</span>
            <a href="#terms">Terms</a>
            <span aria-hidden="true">·</span>
            <a href="#contact">Contact</a>
            <span aria-hidden="true">·</span>
            <a href="#support">Support</a>
          </nav>

          <p className="footer-r">
            Built for grandmothers, by their grandchildren.
          </p>
        </div>
      </footer>
    </>
  )
}
