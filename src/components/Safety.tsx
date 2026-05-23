import { useReveal } from '../hooks/useReveal'

const PILLARS = [
  {
    n: '01',
    h: 'No ads, no clutter',
    p: 'We block the banners, pop-ups, and tracking scripts that make modern websites overwhelming. Pages look clean from the moment your parent arrives.',
  },
  {
    n: '02',
    h: "Scam links blocked before they're clicked",
    p: 'When a known phishing or scam site is loaded, the page is replaced with a clear warning. You can choose: block automatically, warn first, or turn off.',
  },
  {
    n: '03',
    h: 'No accidental downloads',
    p: "Files don't download by mistake. If a website tries, nothing happens. You can change this from settings.",
  },
  {
    n: '04',
    h: 'A history kept for you, only on their computer',
    p: 'Every visit is logged so you can review it during your weekly check-in.',
    precise: 'The history stays on their machine. We never see it, send it anywhere, or analyse it.',
  },
]

export default function Safety() {
  const head = useReveal<HTMLElement>(0.3)
  const grid = useReveal<HTMLDivElement>(0.12)

  return (
    <section className="safety" id="safety" aria-labelledby="safety-h">
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
            <span className="numeral" aria-hidden="true">{p.n}</span>
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
