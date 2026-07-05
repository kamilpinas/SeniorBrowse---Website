import { useRef } from 'react'
import { PuzzlePiece, Heart } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReveal } from '../hooks/useReveal'
import { EXTENSION_URL } from '../constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Free() {
  const head = useReveal<HTMLElement>(0.3)
  const body = useReveal<HTMLDivElement>(0.2)
  const sectionRef = useRef<HTMLElement>(null)

  // "No strings attached" — the ribbon bow unties itself and drifts
  // away once, leaving the heart to float free forever after.
  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const bow = section.querySelector('.ns-bow')
      const heart = section.querySelector('.ns-heart')
      if (!bow || !heart) return

      // Always animate — gentle scroll-triggered reveals run regardless
      // of the OS reduced-motion preference throughout this codebase
      // (they're vestibular-safe one-shot transitions, not parallax).
      gsap.set(bow, { autoAlpha: 1, x: 0, y: 0, rotate: 0, scale: 1 })

      ScrollTrigger.create({
        trigger: section,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline()
          tl.to(bow, {
            y: -36,
            x: 28,
            rotate: 22,
            scale: 0.7,
            autoAlpha: 0,
            duration: 0.9,
            ease: 'power2.in',
          })
          tl.to(heart, { scale: 1.08, duration: 0.35, ease: 'power2.out' }, 0.3)
          tl.to(heart, { scale: 1, duration: 0.5, ease: 'elastic.out(1.1, 0.5)' })
          tl.call(() => heart.classList.add('ns-floating'))
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="freeplan"
      id="free"
      aria-labelledby="free-h"
    >
      <header
        ref={head.ref}
        className={`freeplan-head reveal-cascade${head.shown ? ' shown' : ''}`}
      >
        <p className="eyebrow-c">What it costs</p>
        <h2 id="free-h">
          It's <em>free</em>.
        </h2>
        <p className="freeplan-sub">
          No trial that expires, no card, no account. SeniorBrowse is free for
          everyone — because being shut out of the internet shouldn't cost
          anyone anything.
        </p>
      </header>

      <div
        ref={body.ref}
        className={`freeplan-cta reveal${body.shown ? ' shown' : ''}`}
      >
        <a href={EXTENSION_URL} className="btn-primary btn-xl">
          <PuzzlePiece weight="bold" size={26} aria-hidden="true" />
          Add to Browser — it's free
        </a>

        <p className="freeplan-support">
          <Heart weight="fill" size={15} aria-hidden="true" />
          If it helps someone you love and you'd like to chip in, you can — pay
          what feels right, any time. Never required.
        </p>
      </div>
    </section>
  )
}
