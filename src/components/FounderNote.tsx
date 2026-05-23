import { Heart } from '@phosphor-icons/react'
import signatureImg from '../assets/signature-kamil.png'
import { useReveal } from '../hooks/useReveal'
import { useParallax } from '../hooks/useParallax'

export default function FounderNote() {
  const reveal = useReveal<HTMLElement>()
  const parallaxRef = useParallax<HTMLElement>(0.12)

  return (
    <section
      ref={reveal.ref}
      className={`founder-wrap reveal tilt-left${reveal.shown ? ' shown' : ''}`}
      aria-labelledby="founder-h"
    >
      <article ref={parallaxRef} className="founder parallax">
        <header className="letterhead">
          <span className="letterhead-l">
            <span className="mk" aria-hidden="true"><Heart weight="fill" size={13} /></span>
            A note from the founder
          </span>
          <span className="letterhead-r">For Babcia.</span>
        </header>

        <h2 id="founder-h">Why I Built This</h2>

        <div className="founder-body">
          <p>My grandmother told me more than once that the internet wasn't made for people like her.</p>

          <p>The text was too small to read without squinting. Buttons appeared and disappeared. Pop-ups ambushed her from nowhere. Error messages made no sense. After enough failed attempts, she just&hellip; stopped trying.</p>

          <p>What broke my heart wasn't the technical struggle&mdash;it was watching her feel left behind.</p>

          <p>Her grandchildren shared photos she couldn't see. News she wanted to read was trapped behind interfaces she couldn't navigate. Friends from her building were chatting in groups she couldn't access. She was standing outside a door everyone else had walked through, and no one had thought to hold it open.</p>

          <p>She didn't need a computer science degree. She just needed the internet to <span className="sb-mark">meet her halfway</span>.</p>

          <p>So I built this for her. And for everyone else who's been told, implicitly or explicitly, that technology isn't &ldquo;for them.&rdquo;</p>

          <p>Because it should be. For everyone.</p>
        </div>

        <p className="signature">
          <img className="name-img" src={signatureImg} alt="Kamil Pinas" />
        </p>
      </article>
    </section>
  )
}
