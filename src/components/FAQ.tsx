import { CaretRight } from '@phosphor-icons/react'
import { useReveal } from '../hooks/useReveal'

const FAQS = [
  {
    q: 'Will the senior need to learn anything new?',
    a: 'After you set it up, they see one screen: their home page with a few big tiles. The side panel does everything else. No menus, no toolbars, no learning curve.',
  },
  {
    q: 'What if they already have a browser set up — will it break their bookmarks?',
    a: 'No. SeniorBrowse installs as an extension. Their existing bookmarks, saved passwords, and history stay exactly where they are. You can choose to show or hide the regular browser interface.',
  },
  {
    q: "Can I see what they've been browsing?",
    a: "Yes. The Activity Log inside Settings shows every page they've visited, with timestamps. You'll see it during your weekly check-in, or whenever you visit them.",
  },
  {
    q: 'Is their browsing data private? Do you track them?',
    a: "The browsing history stays on the senior's computer — it's stored locally and never leaves the machine. There's no account and no sign-in, so there's nothing for us to collect. We don't analyse, sell, or look at their browsing — we can't.",
  },
  {
    q: 'Does it work on their computer?',
    a: 'Yes — on Mac, Windows, or any modern computer. Anywhere a modern browser runs, SeniorBrowse runs.',
  },
  {
    q: 'Can I install it on their computer remotely?',
    a: 'Yes, if they let you log into their computer over a video call or remote desktop session. Setup is just clicking "Add to Browser" and following the wizard — you can do it for them in five minutes.',
  },
  {
    q: 'Is it really free? What’s the catch?',
    a: "It's genuinely free — no trial that expires, no card, no account. If it helps someone you love and you'd like to chip in to keep it going, you can pay what feels right, any time. You never have to.",
  },
  {
    q: "What if they decide they don't like it?",
    a: 'You can uninstall the extension at any time — their normal browser comes back exactly as it was. Nothing to cancel, nothing to pay.',
  },
]

export default function FAQ() {
  const head = useReveal<HTMLElement>(0.3)
  const list = useReveal<HTMLDivElement>(0.05)

  return (
    <section className="faq" id="faq" aria-labelledby="faq-h">
      <header
        ref={head.ref}
        className={`faq-head reveal-cascade${head.shown ? ' shown' : ''}`}
      >
        <p className="eyebrow-c">Common questions</p>
        <h2 id="faq-h">Questions caregivers <em>actually</em> ask.</h2>
      </header>

      <div
        ref={list.ref}
        className={`faq-list reveal-stagger${list.shown ? ' shown' : ''}`}
      >
        {FAQS.map((f, i) => (
          <details
            key={i}
            className="faq-row"
            style={{ ['--i' as string]: i } as React.CSSProperties}
          >
            <summary className="faq-q">
              <span>{f.q}</span>
              <CaretRight weight="bold" size={20} className="chev" aria-hidden="true" />
            </summary>
            <div className="faq-a">
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
