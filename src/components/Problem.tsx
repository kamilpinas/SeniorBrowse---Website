import { useReveal } from '../hooks/useReveal'

export default function Problem() {
  const { ref, shown } = useReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      className={`problem reveal-cascade${shown ? ' shown' : ''}`}
      aria-labelledby="problem-h"
    >
      <p className="eyebrow-c">The Problem</p>
      <h2 id="problem-h">
        Modern browsers were built for people who grew up <em>online</em>.
      </h2>
      <p className="sigh">Your parent didn't have that chance.</p>
    </section>
  )
}
