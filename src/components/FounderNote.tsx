import { useRef } from "react"
import { Heart } from "@phosphor-icons/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import signatureImg from "../assets/signature-kamil.png"
import GrandmaPortrait from "./desk/GrandmaPortrait"
import CoffeeCup from "./desk/CoffeeCup"
import KidsDrawing from "./desk/KidsDrawing"
import ReadingGlasses from "./desk/ReadingGlasses"
import TeaCup from "./desk/TeaCup"
import Knitting from "./desk/Knitting"
import LetterEnvelope from "./desk/LetterEnvelope"
import PocketWatch from "./desk/PocketWatch"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * The pinned founder letter scene.
 *
 * Scroll structure: the .founder-scene wrapper is 240vh tall.
 * The .founder-pin inside is position: sticky and pins for 140vh of
 * scroll while the page advances. Inside that pinned canvas, a GSAP
 * scrubbed timeline runs:
 *   0.00 → 0.10  card settles in
 *   0.10 → 0.60  paragraphs cascade in one-by-one
 *   0.45 → 0.65  wavy underline draws under "meet her halfway"
 *   0.70 → 0.85  signature ink-fades in
 *   0.85 → 1.00  card tilts and floats up, ready to scroll past
 * Desk props parallax independently throughout.
 */
export default function FounderNote() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sceneRef.current || !pinRef.current) return

      // On phones (≤720px) the CSS un-pins the letter into a normal
      // static section, so the scrubbed timeline only exists above
      // that width. gsap.matchMedia reverts everything on resize.
      const mm = gsap.matchMedia()

      mm.add("(min-width: 721px)", () => {
      // Master scrubbed timeline. The start point is set to 'top 75%'
      // (well before the pin engages) so the card and first prop can
      // appear DURING the approach — when the section is first sliding
      // into view — rather than after the pin clicks in. This kills
      // the "empty page" feeling between sections.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top 75%",
          end: "bottom bottom",
          scrub: 1,
        },
      })

      // 1. Card swings into place — like a note being pinned to the
      //    wall and settling. Elastic-out gives the pendulum overshoot
      //    so it rocks past -0.4° before resting there.
      tl.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 90, rotate: -7 },
        {
          autoAlpha: 1,
          y: 0,
          rotate: -0.4,
          ease: "elastic.out(0.9, 0.45)",
          duration: 0.18,
        },
        0,
      )

      // 2. Paragraphs reveal — wait until the pin has engaged so the
      //    card is stationary while the words appear (0.20 → 0.68)
      tl.fromTo(
        ".founder-body > p",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          stagger: { each: 0.07, from: "start" },
          duration: 0.1,
        },
        0.2,
      )

      // 3. Wavy underline draws under "meet her halfway" (0.54 → 0.68)
      tl.fromTo(
        ".sb-mark",
        { backgroundSize: "0% 0.42em" },
        { backgroundSize: "100% 0.42em", ease: "power2.inOut", duration: 0.14 },
        0.54,
      )

      // 4. Sign-off + signature fade in (0.72 → 0.89)
      tl.fromTo(
        ".letter-signoff",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.12 },
        0.72,
      )
      tl.fromTo(
        ".signature .name-img",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.15 },
        0.78,
      )

      // 5. Card tilts away on exit (0.90 → 1.0)
      tl.to(
        cardRef.current,
        {
          y: -60,
          rotate: -1.6,
          autoAlpha: 0.95,
          ease: "power2.in",
          duration: 0.1,
        },
        0.9,
      )

      // ── Desk props — each appears at its OWN moment in the timeline,
      //    drifts down past the natural position, then fades out before
      //    the next prop arrives. The room slowly fills with memories
      //    as the letter reveals — they're not all there at once.
      gsap.set(".desk-prop", { autoAlpha: 0, y: -300 })

      const drift = (
        selector: string,
        fromY: number,
        toY: number,
        fromRot: number,
        toRot: number,
        at: number,
        dur = 0.5,
      ) => {
        // Fade in + drift down over `dur` of the scroll timeline
        tl.fromTo(
          selector,
          { y: fromY, autoAlpha: 0, rotate: fromRot },
          {
            y: toY,
            autoAlpha: 0.85,
            rotate: toRot,
            duration: dur,
            ease: "none",
          },
          at,
        )
        // Fade out near the end of its arc so it doesn't pile up
        // with the next arrival
        tl.to(
          selector,
          { autoAlpha: 0, duration: dur * 0.18, ease: "none" },
          at + dur * 0.82,
        )
      }

      // Props cascade — first one appears RIGHT as the section starts
      // arriving (during the approach, alongside the card), then they
      // continue rolling in through the pin window.
      drift(".desk-grandma", -200, 220, -8, -2, 0.02, 0.55)
      drift(".desk-drawing", -220, 200, 8, 12, 0.1, 0.5)
      drift(".desk-tea", -180, 240, 4, 1, 0.2, 0.5)
      drift(".desk-envelope", -200, 220, -6, 5, 0.3, 0.45)
      drift(".desk-glasses", -160, 240, -4, -10, 0.4, 0.45)
      drift(".desk-coffee", -180, 240, 0, 3, 0.5, 0.45)
      drift(".desk-watch", -200, 220, 6, -4, 0.58, 0.42)
      drift(".desk-knitting", -180, 260, -6, -2, 0.66, 0.42)
      })
    },
    { scope: sceneRef },
  )

  return (
    <section
      ref={sceneRef}
      className="founder-scene"
      aria-labelledby="founder-h"
    >
      {/* Sticky pin canvas — card stays centred while scene scrolls.
          Desk props live INSIDE the pin so they remain in viewport
          for the whole reading window. */}
      <div ref={pinRef} className="founder-pin">
        {/* Desk props float around the card. Absolutely positioned
            inside the pin so they share its fixed viewport canvas. */}
        <div className="desk-prop desk-grandma">
          <GrandmaPortrait />
        </div>
        <div className="desk-prop desk-drawing">
          <KidsDrawing />
        </div>
        <div className="desk-prop desk-coffee">
          <CoffeeCup />
        </div>
        <div className="desk-prop desk-glasses">
          <ReadingGlasses />
        </div>
        <div className="desk-prop desk-tea">
          <TeaCup />
        </div>
        <div className="desk-prop desk-knitting">
          <Knitting />
        </div>
        <div className="desk-prop desk-envelope">
          <LetterEnvelope />
        </div>
        <div className="desk-prop desk-watch">
          <PocketWatch />
        </div>

        <article ref={cardRef} className="founder">
          {/* Thumbtacks holding the note to the "wall" */}
          <span className="founder-tack founder-tack-l" aria-hidden="true" />
          <span className="founder-tack founder-tack-r" aria-hidden="true" />

          <header className="letterhead">
            <span className="letterhead-l">
              <span className="mk" aria-hidden="true">
                <Heart weight="fill" size={13} />
              </span>
              A note from the founder
            </span>
          </header>

          <h2 id="founder-h" className="letter-greeting">
            Dear friend,
          </h2>

          <div className="founder-body">
            <p>
              My grandmother told me more than once that the internet wasn't
              made for people like her.
            </p>
            <p>
              The text was too small to read without squinting. Buttons appeared
              and disappeared. Pop-ups ambushed her from nowhere. Error messages
              made no sense. After enough failed attempts, she just&hellip;
              stopped trying.
            </p>
            <p>
              What broke my heart wasn't the technical struggle&mdash;it was
              watching her feel left behind.
            </p>
            <p>
              Her grandchildren shared photos she couldn't see. News she wanted
              to read was trapped behind interfaces she couldn't navigate.
              Friends from her building were chatting in groups she couldn't
              access. She was standing outside a door everyone else had walked
              through, and no one had thought to hold it open.
            </p>
            <p>
              She didn't need a computer science degree. She just needed the
              internet to <span className="sb-mark">meet her halfway</span>.
            </p>
            <p>
              So I built this for her. And for everyone else who's been told,
              implicitly or explicitly, that technology isn't &ldquo;for
              them.&rdquo;
            </p>
            <p>Because it should be. For everyone.</p>
          </div>
        </article>
      </div>
    </section>
  )
}
