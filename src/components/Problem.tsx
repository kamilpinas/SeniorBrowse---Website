import { useEffect, useRef, useState } from 'react'

const PRE = 'Modern browsers were built for people who grew up '
const ACCENT = 'online'

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

/**
 * The Problem section — types itself out the way a senior types:
 * uneven speed, one stumble where two characters are deleted and
 * retyped before continuing, a brief pause, then the italic accent
 * word, then a beat, then the quiet punchline.
 *
 * IMPORTANT: state-machine state and the entire `run` async function
 * live inside useEffect so each effect invocation gets its own
 * fresh `cancelled`/`triggered` closure. Without this, React 18's
 * StrictMode (which double-invokes effects in dev) leaves
 * cancelled=true from the first cleanup and the typing never plays.
 */
export default function Problem() {
  const ref = useRef<HTMLElement>(null)

  const [appeared, setAppeared] = useState(false)
  const [stage, setStage] = useState<'idle' | 'pre' | 'accent' | 'done'>('idle')
  const [typedPre, setTypedPre] = useState('')
  const [typedAccent, setTypedAccent] = useState('')
  const [showPeriod, setShowPeriod] = useState(false)
  const [showSigh, setShowSigh] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let cancelled = false
    let triggered = false

    async function run() {
      setAppeared(true)
      await sleep(700)
      if (cancelled) return

      setStage('pre')

      let s = ''
      const base = 52
      for (let i = 0; i < PRE.length; i++) {
        s += PRE[i]
        setTypedPre(s)
        const jitter = Math.random() * 30 - 12
        await sleep(base + jitter)
        if (cancelled) return
      }

      // The senior stumble — pause, backspace 2, pause, retype
      await sleep(560)
      if (cancelled) return
      for (let i = 0; i < 2; i++) {
        s = s.slice(0, -1)
        setTypedPre(s)
        await sleep(150)
        if (cancelled) return
      }
      await sleep(420)
      if (cancelled) return
      for (const c of PRE.slice(-2)) {
        s += c
        setTypedPre(s)
        await sleep(base + Math.random() * 25)
        if (cancelled) return
      }

      // Beat, then the italic accent word
      await sleep(280)
      if (cancelled) return
      setStage('accent')

      let a = ''
      for (let i = 0; i < ACCENT.length; i++) {
        a += ACCENT[i]
        setTypedAccent(a)
        await sleep(base + Math.random() * 20)
        if (cancelled) return
      }

      await sleep(220)
      if (cancelled) return
      setShowPeriod(true)
      setStage('done')

      // Pause, then the sigh
      await sleep(1500)
      if (cancelled) return
      setShowSigh(true)
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true
          run()
          obs.disconnect()
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
    )
    obs.observe(node)

    return () => {
      cancelled = true
      obs.disconnect()
    }
  }, [])

  return (
    <section
      ref={ref}
      className={`problem problem-typed${appeared ? ' appeared' : ''}${
        showSigh ? ' sigh-in' : ''
      }`}
      aria-labelledby="problem-h"
    >
      <p className="eyebrow-c">The Problem</p>
      <h2 id="problem-h">
        {typedPre}
        {stage === 'pre' && <span className="type-caret" aria-hidden="true" />}
        <em>
          {typedAccent}
          {stage === 'accent' && (
            <span className="type-caret type-caret-accent" aria-hidden="true" />
          )}
        </em>
        {showPeriod && '.'}
      </h2>
      <p className="sigh">Your parent didn't have that chance.</p>
    </section>
  )
}
