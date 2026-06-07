import { useRef } from 'react'
import { Warning, File, Prohibit, LockSimple } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReveal } from '../hooks/useReveal'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PILLARS = [
  {
    n: '01',
    h: 'No ads, no clutter',
    p: 'We block the banners, pop-ups, and tracking scripts that make modern websites overwhelming. Pages look clean from the moment they arrive.',
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

function Demo({ i }: { i: number }) {
  if (i === 0) {
    return (
      <div className="pd-inner demo-noads">
        <span className="nd-line w1" />
        <span className="nd-line w2" />
        <span className="nd-line w3" />
        <span className="nd-line w1" />
        <span className="nd-line w2" />
        <div className="nd-ad a1">AD</div>
        <div className="nd-ad a2">AD</div>
      </div>
    )
  }
  if (i === 1) {
    return (
      <div className="pd-inner demo-scam">
        <div className="sc-bar">
          <LockSimple weight="fill" size={8} />
          <span>free-prize-winner.xyz</span>
        </div>
        <div className="sc-body">
          <span className="nd-line w1" />
          <span className="nd-line w2" />
          <span className="nd-line w3" />
        </div>
        <div className="sc-warning">
          <Warning weight="fill" size={18} />
          <span>Site blocked</span>
        </div>
      </div>
    )
  }
  if (i === 2) {
    return (
      <div className="pd-inner demo-download">
        <div className="dl-file">
          <File weight="fill" size={11} /> setup.exe
        </div>
        <div className="dl-stop">
          <Prohibit weight="bold" size={22} />
        </div>
        <div className="dl-tray" />
      </div>
    )
  }
  return (
    <div className="pd-inner demo-history">
      <div className="hi-row"><span className="hi-fav" /><span className="hi-bar" /></div>
      <div className="hi-row"><span className="hi-fav" /><span className="hi-bar" /></div>
      <div className="hi-row"><span className="hi-fav" /><span className="hi-bar" /></div>
      <div className="hi-lock"><LockSimple weight="fill" size={11} /></div>
      <div className="hi-tag">Stays here</div>
    </div>
  )
}

export default function Safety() {
  const head = useReveal<HTMLElement>(0.3)
  const grid = useReveal<HTMLDivElement>(0.12)
  const sectionRef = useRef<HTMLElement>(null)

  // Each pillar runs a small looping demonstration of the protection.
  // Built paused, played only while the grid is in view (and reset on
  // every loop via fromTo so the cycle reads cleanly).
  useGSAP(
    () => {
      const demos = gsap.utils.toArray<HTMLElement>('.pillar-demo')
      const tls: gsap.core.Timeline[] = []

      // 01 — ads shrink away, leaving the page clean, then a new one
      //      tries and gets blocked again.
      if (demos[0]) {
        const ads = demos[0].querySelectorAll('.nd-ad')
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5, paused: true })
        tl.fromTo(
          ads,
          { opacity: 1, scale: 1 },
          { opacity: 0, scale: 0.6, transformOrigin: 'center', duration: 0.5, stagger: 0.16, ease: 'back.in(1.7)' },
          0.9,
        )
        tl.fromTo(
          ads,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(1.7)' },
          '+=1.0',
        )
        tls.push(tl)
      }

      // 02 — a scam page loads, a warning slides over it.
      if (demos[1]) {
        const warn = demos[1].querySelector('.sc-warning')
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, paused: true })
        tl.fromTo(warn, { yPercent: -110 }, { yPercent: 0, duration: 0.5, ease: 'power3.out' }, 0.8)
        tl.fromTo(warn, { yPercent: 0 }, { yPercent: -110, duration: 0.45, ease: 'power2.in' }, '+=1.1')
        tls.push(tl)
      }

      // 03 — a file tries to download, a stop appears, it bounces back.
      if (demos[2]) {
        const file = demos[2].querySelector('.dl-file')
        const stop = demos[2].querySelector('.dl-stop')
        gsap.set([file, stop], { xPercent: -50 })
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6, paused: true })
        tl.fromTo(file, { y: 0, opacity: 1 }, { y: 36, duration: 0.55, ease: 'power1.in' }, 0.5)
        tl.fromTo(stop, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out(3)' }, '>-0.12')
        tl.to(file, { y: 0, opacity: 0, duration: 0.45, ease: 'power2.out' }, '>0.05')
        tl.to(stop, { opacity: 0, duration: 0.3 }, '<0.15')
        tls.push(tl)
      }

      // 04 — history rows fill in, a padlock clicks shut, "Stays here".
      if (demos[3]) {
        const rows = gsap.utils.toArray<HTMLElement>(demos[3].querySelectorAll('.hi-row'))
        const lock = demos[3].querySelector('.hi-lock')
        const tag = demos[3].querySelector('.hi-tag')
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5, paused: true })
        tl.fromTo(rows, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.32, stagger: 0.14, ease: 'power2.out' }, 0.4)
        tl.fromTo(lock, { rotate: -32, scale: 0.7, transformOrigin: 'center' }, { rotate: 0, scale: 1, duration: 0.45, ease: 'back.out(2.2)' }, '>0.05')
        tl.fromTo(tag, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, '>-0.1')
        tl.to({}, { duration: 1.0 })
        tl.to([...rows, tag], { opacity: 0, duration: 0.35 })
        tls.push(tl)
      }

      // Play while the grid is on screen; pause when it isn't.
      ScrollTrigger.create({
        trigger: '.pillars',
        start: 'top 80%',
        end: 'bottom 20%',
        onToggle: (self) => {
          tls.forEach((t) => (self.isActive ? t.play() : t.pause()))
        },
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
            <span className="numeral" aria-hidden="true">{p.n}</span>
            <div className="pillar-demo" aria-hidden="true">
              <Demo i={i} />
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
