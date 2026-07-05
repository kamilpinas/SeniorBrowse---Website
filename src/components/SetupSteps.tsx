import { useEffect, useRef, useState } from 'react'
import {
  Heart, Envelope, Play, Newspaper, Image, House,
  ArrowLeft, ArrowRight, HandPointing,
} from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReveal } from '../hooks/useReveal'
import { useParallax } from '../hooks/useParallax'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SWATCHES = ['#9c3520', '#1e6e4a', '#5878a0', '#6a5440']

function StepArrow({ idx }: { idx: number }) {
  return (
    <span
      className="step-arrow"
      aria-hidden="true"
      style={{ ['--i' as string]: idx } as React.CSSProperties}
    >
      <svg viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2.5 5">
        <path d="M4 12 L 64 12" />
        <path d="M56 4 L 64 12 L 56 20" strokeDasharray="0" />
      </svg>
    </span>
  )
}

export default function SetupSteps() {
  const head = useReveal<HTMLElement>(0.3)
  const grid = useReveal<HTMLDivElement>(0.1)
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedSwatch, setSelectedSwatch] = useState(0)
  const [textIdx, setTextIdx] = useState(1)
  const [safetyOn, setSafetyOn] = useState(true)
  // Three different parallax speeds — each thumb drifts on its own
  // plane as you scroll past, creating real depth.
  const thumb1 = useParallax<HTMLDivElement>(0.14)
  const thumb2 = useParallax<HTMLDivElement>(0.06)
  const thumb3 = useParallax<HTMLDivElement>(0.18)

  // Step 2 thumb — keep the controls alive while in view: the theme
  // swatch cycles, the text-size selection steps along, and the safety
  // toggle flips. Loops continuously while visible, pauses off-screen.
  useEffect(() => {
    if (!sectionRef.current) return
    let interval: ReturnType<typeof setInterval> | null = null
    let tick = 0
    const t = sectionRef.current.querySelector('.tc-customise')
    if (!t) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !interval) {
          interval = setInterval(() => {
            tick++
            setSelectedSwatch(s => (s + 1) % SWATCHES.length)
            setTextIdx(i => (i + 1) % 4)
            if (tick % 2 === 0) setSafetyOn(s => !s)
          }, 1150)
        } else if (!entry.isIntersecting && interval) {
          clearInterval(interval)
          interval = null
        }
      },
      { threshold: 0.5 },
    )
    obs.observe(t)
    return () => {
      if (interval) clearInterval(interval)
      obs.disconnect()
    }
  }, [])

  // Step 3 thumb — tooltip pops in, then keeps living: it bobs gently
  // and the HOME button taps itself on a loop, as if being demoed.
  useGSAP(
    () => {
      const tip = '.tc-tour .tour-tooltip'
      const home = '.tc-tour .tour-btn.home'
      gsap.set(tip, { scale: 0, autoAlpha: 0, rotate: -15 })

      ScrollTrigger.create({
        trigger: '.tc-tour',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(tip, {
            scale: 1,
            autoAlpha: 1,
            rotate: -3,
            duration: 0.9,
            ease: 'elastic.out(1.4, 0.5)',
          })
          // gentle continuous bob after it lands
          gsap.to(tip, {
            y: -4,
            duration: 1.3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 0.9,
          })
          // HOME taps itself on a loop
          const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.1, delay: 1.2 })
          tl.to(home, { scale: 0.84, duration: 0.16, ease: 'power2.in' })
          tl.to(home, { scale: 1, duration: 0.55, ease: 'elastic.out(1.3, 0.4)' })
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="setup" id="install" aria-labelledby="setup-h">
      <header
        ref={head.ref}
        className={`setup-head reveal-cascade${head.shown ? ' shown' : ''}`}
      >
        <p className="eyebrow-c">Getting started</p>
        <h2 id="setup-h">Three steps. Done in <em>five minutes</em>.</h2>
        <p className="subhead">Add it and name them, customise the experience, then walk through the tutorial together. That's the entire setup.</p>
      </header>

      <div
        ref={grid.ref}
        className={`steps reveal-stagger${grid.shown ? ' shown' : ''}`}
      >

        <article className="step from-left" style={{ ['--i' as string]: 0 } as React.CSSProperties}>
          <div ref={thumb1} className="step-thumb parallax" aria-hidden="true">
            <div className="tc tc-trial">
              <div className="trial-head">
                <span className="mk"><Heart weight="fill" size={14} /></span>
                <div className="brand-col">
                  <span className="t">SeniorBrowse</span>
                  <span className="s">Free · no account</span>
                </div>
              </div>
              <div className="trial-pair">
                <span className="pair-chip"><b>YOU</b>Anna</span>
                <span className="pair-chip"><b>SENIOR</b>Maria<span className="caret" /></span>
              </div>
            </div>
          </div>
          <p className="step-num">Step 01</p>
          <h3>Add it &amp; name them</h3>
          <p>Add SeniorBrowse to your browser, then enter the caregiver and senior's first names — used for greetings. It's free, no account needed.</p>
        </article>

        <StepArrow idx={1} />

        <article className="step" style={{ ['--i' as string]: 2 } as React.CSSProperties}>
          <div ref={thumb2} className="step-thumb parallax" aria-hidden="true">
            <div className="tc tc-customise">
              <div className="cu-row">
                <span className="cu-lab">Shortcuts</span>
                <span className="cu-vals">
                  <span className="mini-ic ic-yt"><Play weight="fill" size={8} /></span>
                  <span className="mini-ic ic-bbc"><Newspaper weight="fill" size={8} /></span>
                  <span className="mini-ic ic-photos"><Image weight="fill" size={8} /></span>
                  <span className="mini-ic ic-mail"><Envelope weight="fill" size={8} /></span>
                </span>
              </div>
              <div className="cu-row">
                <span className="cu-lab">Theme</span>
                <span className="cu-vals">
                  {SWATCHES.map((c, i) => (
                    <span
                      key={c}
                      className={`sw${i === selectedSwatch ? ' selected' : ''}`}
                      style={{ background: c }}
                    />
                  ))}
                </span>
              </div>
              <div className="cu-row">
                <span className="cu-lab">Text size</span>
                <span className="text-toggle">
                  {[0, 1, 2, 3].map(i => (
                    <span key={i} className={i === textIdx ? 'active' : ''}>A</span>
                  ))}
                </span>
              </div>
              <div className="cu-row">
                <span className="cu-lab">Safety</span>
                <span className="cu-vals">
                  <span className={`toggle${safetyOn ? ' on' : ''}`}><span className="knob" /></span>
                  <span className="toggle-label">{safetyOn ? 'Strict' : 'Standard'}</span>
                </span>
              </div>
            </div>
          </div>
          <p className="step-num">Step 02</p>
          <h3>Customise their experience</h3>
          <p>Pick starting shortcuts, theme colour, element size, and safety rules. Takes about a minute.</p>
        </article>

        <StepArrow idx={3} />

        <article className="step from-right" style={{ ['--i' as string]: 4 } as React.CSSProperties}>
          <div ref={thumb3} className="step-thumb parallax" aria-hidden="true">
            <div className="tc tc-tour">
              <div className="tour-panel">
                <span className="tour-btn home"><House weight="bold" size={11} /></span>
                <span className="tour-btn"><ArrowLeft weight="bold" size={10} /></span>
                <span className="tour-btn"><ArrowRight weight="bold" size={10} /></span>
              </div>
              <div className="tour-tooltip">
                <HandPointing weight="fill" size={11} />
                <span>Tap <b>HOME</b> to go back</span>
              </div>
            </div>
          </div>
          <p className="step-num">Step 03</p>
          <h3>Walk through the tutorial</h3>
          <p>A short guided tour shows them how the helper panel works. After that, they're ready.</p>
        </article>

      </div>
    </section>
  )
}
