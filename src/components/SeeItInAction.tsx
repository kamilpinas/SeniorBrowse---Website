import { useState, useRef, useEffect, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import {
  House,
  ArrowLeft,
  ArrowRight,
  SpeakerHigh,
  SpeakerX,
  ArrowsDownUp,
  ArrowUp,
  ArrowDown,
  ArrowLineUp,
  TextAa,
  BookmarkSimple,
  ArrowsOut,
  ArrowClockwise,
  XCircle,
  Play,
  MagnifyingGlass,
  Newspaper,
  Image,
  Envelope,
  LockSimple,
  HandPointing,
  DotsThreeVertical,
  PencilSimple,
} from "@phosphor-icons/react"
import { useReveal } from "../hooks/useReveal"
import WalkthroughVideo from "./WalkthroughVideo"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

type PageKey = "news" | "home" | "youtube" | "photos" | "email"

const PAGE_URLS: Record<PageKey, string> = {
  news: "bbc.co.uk/news",
  home: "seniorbrowse — your home",
  youtube: "dailytube.com",
  photos: "photos.seniorbrowse.com",
  email: "mail.dailymail.com/inbox",
}

const TEXT_LABELS = ["TEXT SIZE", "LARGE", "X-LARGE", "XX-LARGE"]
const TEXT_SCALES = [1, 1.18, 1.36, 1.55]
const VOL_COLORS = [
  "#c44a30",
  "#b85a2c",
  "#ad6a28",
  "#a17924",
  "#958722",
  "#8a951f",
  "#7e9a1f",
  "#73a022",
  "#6ba12c",
  "#63a334",
  "#5ca53b",
  "#56a542",
]
export default function SeeItInAction() {
  // ── scroll reveals ────────────────────────────────────────────────
  const headReveal = useReveal<HTMLElement>()
  const demoReveal = useReveal<HTMLDivElement>(0.05)

  // ── auto-demo (ghost cursor) ──────────────────────────────────────
  const sectionRef = useRef<HTMLElement>(null)
  const demoRootRef = useRef<HTMLDivElement | null>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const rippleRef = useRef<HTMLSpanElement>(null)
  const autoRanRef = useRef(false)

  // ── demo state ────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState<PageKey>("news")
  const [urlText, setUrlText] = useState(PAGE_URLS.news)
  const [volume, setVolume] = useState(100)
  const [muted, setMuted] = useState(false)
  const [textSizeIdx, setTextSizeIdx] = useState(0)
  const [showSaveToast, setShowSaveToast] = useState(false)
  const [showVolumeInd, setShowVolumeInd] = useState(false)
  const [showRefreshFlash, setShowRefreshFlash] = useState(false)
  const [autoPlaying, setAutoPlaying] = useState(false)
  const [demoHint, setDemoHint] = useState<string | null>(null)
  const [scrollRatio, setScrollRatio] = useState(0)
  const [closingPage, setClosingPage] = useState<PageKey | null>(null)

  const historyRef = useRef<{ pages: PageKey[]; idx: number }>({
    pages: ["news"],
    idx: 0,
  })
  const currentPageRef = useRef<PageKey>("news")
  const pageRefs = useRef<Partial<Record<PageKey, HTMLDivElement | null>>>({})
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const volTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const updateScrollRatio = useCallback(() => {
    const el = pageRefs.current[currentPageRef.current]
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    const ratio = max <= 0 ? 0 : Math.min(1, Math.max(0, el.scrollTop / max))
    setScrollRatio(ratio)
  }, [])

  const navigate = useCallback((page: PageKey, push: boolean) => {
    currentPageRef.current = page
    setCurrentPage(page)
    setUrlText(PAGE_URLS[page])
    const el = pageRefs.current[page]
    if (el) el.scrollTop = 0
    setScrollRatio(0)
    if (push) {
      const h = historyRef.current
      h.pages = h.pages.slice(0, h.idx + 1)
      h.pages.push(page)
      h.idx = h.pages.length - 1
    }
  }, [])

  const goBack = useCallback(() => {
    const h = historyRef.current
    if (h.idx <= 0) return
    h.idx--
    const page = h.pages[h.idx]
    currentPageRef.current = page
    setCurrentPage(page)
    setUrlText(PAGE_URLS[page])
  }, [])

  const goForward = useCallback(() => {
    const h = historyRef.current
    if (h.idx >= h.pages.length - 1) return
    h.idx++
    const page = h.pages[h.idx]
    currentPageRef.current = page
    setCurrentPage(page)
    setUrlText(PAGE_URLS[page])
  }, [])

  const flashSave = useCallback(() => {
    setShowSaveToast(true)
    clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => setShowSaveToast(false), 2400)
  }, [])

  const flashVolume = useCallback(() => {
    setShowVolumeInd(true)
    clearTimeout(volTimerRef.current)
    volTimerRef.current = setTimeout(() => setShowVolumeInd(false), 1400)
  }, [])

  const flashRefresh = useCallback(() => {
    setShowRefreshFlash(true)
    setTimeout(() => setShowRefreshFlash(false), 500)
  }, [])

  const flashClose = useCallback(() => {
    const p = currentPageRef.current
    setClosingPage(p)
    setTimeout(() => setClosingPage(null), 700)
  }, [])

  // scroll tracking on current page
  useEffect(() => {
    const el = pageRefs.current[currentPage]
    if (!el) return
    el.addEventListener("scroll", updateScrollRatio)
    return () => el.removeEventListener("scroll", updateScrollRatio)
  }, [currentPage, updateScrollRatio])

  // action handler
  const handleAction = useCallback(
    (action: string) => {
      switch (action) {
        case "home":
          if (currentPageRef.current !== "home") navigate("home", true)
          break
        case "back":
          goBack()
          break
        case "forward":
          goForward()
          break
        case "vol-less":
          setMuted(false)
          setVolume((v) => Math.max(0, v - 10))
          flashVolume()
          break
        case "vol-more":
          setMuted(false)
          setVolume((v) => Math.min(100, v + 10))
          flashVolume()
          break
        case "mute":
          setMuted((m) => !m)
          flashVolume()
          break
        case "up":
          pageRefs.current[currentPageRef.current]?.scrollBy({
            top: -240,
            behavior: "smooth",
          })
          break
        case "down":
          pageRefs.current[currentPageRef.current]?.scrollBy({
            top: 240,
            behavior: "smooth",
          })
          break
        case "top":
          pageRefs.current[currentPageRef.current]?.scrollTo({
            top: 0,
            behavior: "smooth",
          })
          break
        case "text-size":
          setTextSizeIdx((i) => (i + 1) % TEXT_LABELS.length)
          break
        case "save":
          flashSave()
          break
        case "refresh":
          flashRefresh()
          break
        case "close":
          flashClose()
          break
      }
    },
    [
      navigate,
      goBack,
      goForward,
      flashVolume,
      flashSave,
      flashRefresh,
      flashClose,
    ],
  )

  useEffect(
    () => () => {
      clearTimeout(saveTimerRef.current)
      clearTimeout(volTimerRef.current)
    },
    [],
  )

  const volLevel = muted ? 0 : Math.round((volume / 100) * VOL_COLORS.length)
  const moveDotCount = 12
  const activeDots = Math.round(scrollRatio * (moveDotCount - 1))
  const posLabel =
    scrollRatio < 0.05
      ? "Top"
      : scrollRatio > 0.95
        ? "Bottom"
        : `${Math.round(scrollRatio * 100)}%`
  const textScale = TEXT_SCALES[textSizeIdx]

  // Auto-demo: a ghost cursor drives the real panel when the demo
  // first scrolls into view — moving to each button, clicking it, and
  // letting the browser respond. Bails the moment the user touches it.
  useGSAP(
    () => {
      const demo = demoRootRef.current
      const cursor = cursorRef.current
      if (!demo || !cursor) return

      let cancelled = false
      const onPointer = () => {
        cancelled = true
        setAutoPlaying(false)
        setDemoHint(null)
        gsap.to(cursor, { autoAlpha: 0, duration: 0.3 })
      }
      demo.addEventListener("pointerdown", onPointer)

      const centerOf = (el: Element) => {
        const c = demo.getBoundingClientRect()
        const r = el.getBoundingClientRect()
        return { x: r.left - c.left + r.width / 2, y: r.top - c.top + r.height / 2 }
      }
      const tween = (vars: gsap.TweenVars) =>
        new Promise<void>((res) => {
          gsap.to(cursor, { ...vars, onComplete: res })
        })

      const moveTo = async (sel: string) => {
        const el = demo.querySelector(sel)
        if (!el) return
        const { x, y } = centerOf(el)
        await tween({ x, y, duration: 0.85, ease: "power3.inOut" })
      }
      const ripple = () => {
        const ring = rippleRef.current
        if (!ring) return
        gsap.fromTo(
          ring,
          { autoAlpha: 0.55, scale: 0.2 },
          { autoAlpha: 0, scale: 1.7, duration: 0.55, ease: "power2.out" },
        )
      }
      const clickEl = async (sel: string) => {
        const el = demo.querySelector(sel) as HTMLElement | null
        if (!el) return
        await tween({ scale: 0.7, duration: 0.12, ease: "power2.in" })
        ripple()
        el.click()
        await tween({ scale: 1, duration: 0.32, ease: "back.out(2.6)" })
      }

      // Quietly return the demo to its opening state between loops.
      const resetDemo = () => {
        setTextSizeIdx(0)
        historyRef.current = { pages: ["news"], idx: 0 }
        currentPageRef.current = "news"
        setCurrentPage("news")
        setUrlText(PAGE_URLS.news)
        const el = pageRefs.current.news
        if (el) el.scrollTop = 0
        setScrollRatio(0)
      }

      const run = async () => {
        const rect = demo.getBoundingClientRect()
        gsap.set(cursor, {
          x: rect.width * 0.52,
          y: rect.height * 0.62,
          scale: 1,
          autoAlpha: 0,
        })
        setAutoPlaying(true)
        await sleep(600)
        if (cancelled) return
        await tween({ autoAlpha: 1, duration: 0.3 })

        // Each step: show a caption, move the cursor, click, pause so
        // the user can read what just happened, then move on.
        const step = async (
          hint: string,
          act: () => Promise<void>,
          pause = 950,
        ) => {
          if (cancelled) return
          setDemoHint(hint)
          await act()
          await sleep(pause)
        }

        // Loop the tour until the user takes over.
        while (!cancelled) {
          resetDemo()
          await sleep(800)
          if (cancelled) break

          await step("Tapping HOME to go back", async () => {
            await moveTo('[data-action="home"]')
            await clickEl('[data-action="home"]')
          })
          await step("Opening a favourite — YouTube", async () => {
            await moveTo(".ho-tile")
            await clickEl(".ho-tile")
          })
          await step(
            "Making the words bigger",
            async () => {
              await moveTo('[data-action="text-size"]')
              await clickEl('[data-action="text-size"]')
              await sleep(550)
              await clickEl('[data-action="text-size"]')
            },
            1100,
          )
          await step("Scrolling down the page", async () => {
            await moveTo('[data-action="down"]')
            await clickEl('[data-action="down"]')
          })
          await step(
            "Saving it — straight to the family's inbox",
            async () => {
              await moveTo('[data-action="save"]')
              await clickEl('[data-action="save"]')
            },
            1800,
          )
          await step(
            "Back to the calm home screen",
            async () => {
              await moveTo('[data-action="home"]')
              await clickEl('[data-action="home"]')
            },
            700,
          )

          if (cancelled) break
          setDemoHint("That's it — now you try, or watch again")
          await sleep(1700)
        }
      }

      const st = ScrollTrigger.create({
        trigger: demo,
        start: "top 62%",
        once: true,
        onEnter: () => {
          if (autoRanRef.current) return
          autoRanRef.current = true
          void run()
        },
      })

      return () => {
        demo.removeEventListener("pointerdown", onPointer)
        st.kill()
      }
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="see-it" id="see-it" aria-labelledby="see-h">
      <header
        ref={headReveal.ref}
        className={`see-head reveal-cascade${headReveal.shown ? " shown" : ""}`}
      >
        <p className="eyebrow-c">See it in action</p>
        <h2 id="see-h" className="see-h2">
          Watch the side panel do <em>the work</em>.
        </h2>
        <p className="see-sub">
          This is the real panel — it'll play itself. Jump in any time and try.
        </p>
      </header>

      {/* ── Interactive Demo ── */}
      <div
        ref={(el) => {
          demoReveal.ref.current = el
          demoRootRef.current = el
        }}
        className={`demo reveal zoom${demoReveal.shown ? " shown" : ""}${autoPlaying ? " auto-playing" : ""}`}
        id="demo"
      >
        {/* Ghost cursor — driven by GSAP during the auto-demo */}
        <div ref={cursorRef} className="demo-cursor" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26">
            <path
              d="M5 3 L5 19 L9 15 L12 21 L15 20 L12 14 L18 14 Z"
              fill="#fff"
              stroke="#7a2614"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          <span ref={rippleRef} className="demo-cursor-ripple" />
        </div>

        {/* Live caption — appears/disappears with each auto-demo action */}
        <div className={`demo-hint${demoHint ? " show" : ""}`} aria-live="polite">
          {demoHint}
        </div>

        {/* "Take over" prompt — pulses during auto-play, vanishes on click */}
        <div className={`demo-tooltip${autoPlaying ? "" : " fade"}`}>
          <HandPointing
            weight="fill"
            size={18}
            className="hand"
            aria-hidden="true"
          />
          Click anywhere to <strong>try it yourself</strong>
        </div>

        <div className="demo-window">
          {/* LIVE badge — shown while the auto-demo is running */}
          <span
            className={`demo-live${autoPlaying ? " show" : ""}`}
            aria-hidden="true"
          >
            <span className="demo-live-dot" />
            LIVE DEMO
          </span>
          <div className="demo-titlebar">
            <div className="lights">
              <span className="light r" />
              <span className="light y" />
              <span className="light g" />
            </div>
            <div className="urlbar">
              <LockSimple weight="fill" size={14} />
              <span>{urlText}</span>
            </div>
            <div className="titlebar-end">
              <DotsThreeVertical size={18} />
            </div>
          </div>

          <div className="demo-body">
            {/* fake browser content */}
            <main className="fake-page" id="fakePage">
              {/* News page */}
              <div
                ref={(el) => {
                  pageRefs.current.news = el
                }}
                className={`page${currentPage === "news" ? " show" : ""}${closingPage === "news" ? " closing" : ""}`}
                style={
                  { "--demo-text-scale": textScale } as React.CSSProperties
                }
              >
                <div className="fp-scroll">
                  <header className="fp-head">
                    <span className="fp-brand">
                      Daily <span className="fp-brand-ld">News</span>
                    </span>
                    <nav className="fp-nav">
                      <a>Home</a>
                      <a>UK</a>
                      <a>World</a>
                      <a>Business</a>
                      <a>Tech</a>
                    </nav>
                  </header>
                  <article className="fp-lead">
                    <div className="fp-thumb-lead" aria-hidden="true" />
                    <div className="fp-body">
                      <p className="fp-tag">UK</p>
                      <h3>
                        Heavy rain forecast across south coast this weekend
                      </h3>
                      <p>
                        Forecasters warn of disruption to travel and minor
                        flooding in low-lying areas. The Met Office has issued
                        an amber warning&hellip;
                      </p>
                      <p className="fp-meta">12 minutes ago · 4 min read</p>
                    </div>
                  </article>
                  <div className="fp-ad" aria-hidden="true">
                    <span>
                      Advertisement · One weird trick to lower your energy
                      bill&hellip;
                    </span>
                    <span className="ad-close">×</span>
                  </div>
                  <div className="fp-grid">
                    {[
                      {
                        cls: "t-green",
                        tag: "World",
                        title:
                          "Climate summit reaches surprise agreement on shipping fuel",
                      },
                      {
                        cls: "t-amber",
                        tag: "Sport",
                        title:
                          "Local football club marks 100th anniversary with parade",
                      },
                      {
                        cls: "t-blue",
                        tag: "Health",
                        title:
                          "Hospital trust announces £2m funding boost for cardiac unit",
                      },
                      {
                        cls: "t-rose",
                        tag: "Lifestyle",
                        title:
                          "Pensioner gardener wins national rose competition for third year",
                      },
                      {
                        cls: "t-olive",
                        tag: "Local",
                        title:
                          "New cycle lane opens through Bedford city centre after long delay",
                      },
                      {
                        cls: "",
                        tag: "Culture",
                        title:
                          "Council approves library refurbishment plans for 2026 opening",
                      },
                    ].map(({ cls, tag, title }) => (
                      <article className="fp-card" key={title}>
                        <div
                          className={`fp-thumb${cls ? ` ${cls}` : ""}`}
                          aria-hidden="true"
                        />
                        <p className="fp-tag">{tag}</p>
                        <h4>{title}</h4>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              {/* Home page */}
              <div
                ref={(el) => {
                  pageRefs.current.home = el
                }}
                className={`page page-home${currentPage === "home" ? " show" : ""}${closingPage === "home" ? " closing" : ""}`}
                style={
                  { "--demo-text-scale": textScale } as React.CSSProperties
                }
              >
                <div className="ho-head">
                  <h3 className="ho-greeting">
                    Good morning, <em>Maria</em>!
                    <span className="sub">
                      What would you like to do today?
                    </span>
                  </h3>
                  <div className="ho-clock">
                    9:24<span className="ampm">am</span>
                    <span className="date">Fri 22 May</span>
                  </div>
                </div>
                <div className="ho-search">
                  <MagnifyingGlass size={22} />
                  <span>Search the web</span>
                </div>
                <div className="ho-tiles">
                  {(
                    [
                      {
                        page: "youtube",
                        cls: "ic-yt",
                        Icon: Play,
                        label: "YouTube",
                      },
                      {
                        page: "news",
                        cls: "ic-bbc",
                        Icon: Newspaper,
                        label: "BBC News",
                      },
                      {
                        page: "photos",
                        cls: "ic-photos",
                        Icon: Image,
                        label: "Photos",
                      },
                      {
                        page: "email",
                        cls: "ic-mail",
                        Icon: Envelope,
                        label: "Email",
                      },
                    ] as const
                  ).map(({ page, cls, Icon, label }) => (
                    <button
                      key={page}
                      className="ho-tile"
                      type="button"
                      onClick={() => navigate(page, true)}
                    >
                      <span className={`icon ${cls}`}>
                        <Icon weight="fill" size={36} />
                      </span>
                      <span className="ho-tile-label">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* YouTube page */}
              <div
                ref={(el) => {
                  pageRefs.current.youtube = el
                }}
                className={`page page-yt${currentPage === "youtube" ? " show" : ""}${closingPage === "youtube" ? " closing" : ""}`}
                style={
                  { "--demo-text-scale": textScale } as React.CSSProperties
                }
              >
                <header className="yt-head">
                  <span className="yt-logo">
                    <span className="mk">
                      <Play weight="fill" size={11} />
                    </span>
                    Daily<span className="red">Tube</span>
                  </span>
                  <span className="yt-search">
                    <MagnifyingGlass size={16} />
                    <span>Search videos</span>
                  </span>
                </header>
                <div className="yt-chips">
                  {[
                    "All",
                    "For you",
                    "Gardening",
                    "Music",
                    "Cooking",
                    "Travel",
                  ].map((c, i) => (
                    <span
                      key={c}
                      className={`yt-chip${i === 0 ? " active" : ""}`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="yt-grid">
                  {[
                    {
                      cls: "t-leaf",
                      title: "Easy tomato plants for first-time gardeners",
                      meta: "Garden with Grace · 124K views",
                      dur: "8:12",
                    },
                    {
                      cls: "t-warm",
                      title:
                        "Sunday roast — the foolproof way (with crackling)",
                      meta: "Home Cooking UK · 88K views",
                      dur: "14:36",
                    },
                    {
                      cls: "t-rose",
                      title: '"Moon River" — gentle piano, one hour',
                      meta: "Quiet Keys · 2.1M views",
                      dur: "3:48",
                    },
                    {
                      cls: "t-deep",
                      title: "Walking through the Lake District in autumn",
                      meta: "Slow TV · 510K views",
                      dur: "22:05",
                    },
                  ].map(({ cls, title, meta, dur }) => (
                    <div className="yt-card" key={title}>
                      <div className={`yt-thumb ${cls}`}>
                        <span className="yt-play">
                          <Play weight="fill" size={18} />
                        </span>
                        <span className="yt-duration">{dur}</span>
                      </div>
                      <h4>{title}</h4>
                      <p className="yt-meta">{meta}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photos page */}
              <div
                ref={(el) => {
                  pageRefs.current.photos = el
                }}
                className={`page page-photos${currentPage === "photos" ? " show" : ""}${closingPage === "photos" ? " closing" : ""}`}
                style={
                  { "--demo-text-scale": textScale } as React.CSSProperties
                }
              >
                <header className="ph-head">
                  <h3 className="ph-title">
                    Photos from <em>your family</em>
                  </h3>
                  <span className="ph-count">428 photos · 6 albums</span>
                </header>
                {[
                  {
                    label: "This month · May 2026",
                    thumbs: ["p1", "p2", "p3", "p4"],
                  },
                  {
                    label: "April 2026 · Easter weekend",
                    thumbs: ["p5", "p6", "p7", "p8"],
                  },
                  { label: "March 2026", thumbs: ["p2", "p4", "p6", "p8"] },
                ].map(({ label, thumbs }) => (
                  <div key={label}>
                    <p className="ph-section-title">{label}</p>
                    <div className="ph-grid">
                      {thumbs.map((t) => (
                        <div key={t} className={`ph-thumb ${t}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Email page */}
              <div
                ref={(el) => {
                  pageRefs.current.email = el
                }}
                className={`page page-email${currentPage === "email" ? " show" : ""}${closingPage === "email" ? " closing" : ""}`}
                style={
                  { "--demo-text-scale": textScale } as React.CSSProperties
                }
              >
                <header className="em-head">
                  <span className="em-brand">
                    Daily <em>Mail</em>
                  </span>
                  <span className="em-meta">Inbox · 3 unread</span>
                  <button className="em-compose" type="button">
                    <PencilSimple weight="bold" size={14} /> Compose
                  </button>
                </header>
                <div className="em-list">
                  {[
                    {
                      av: "A",
                      cls: "",
                      from: "Anna",
                      subject:
                        "Lovely photos from Sunday — also Tom said hi xx",
                      time: "9:14 am",
                      unread: true,
                    },
                    {
                      av: "T",
                      cls: "a3",
                      from: "Tom",
                      subject: "Maths homework — can I ring you later?",
                      time: "Yesterday",
                      unread: true,
                    },
                    {
                      av: "M",
                      cls: "a2",
                      from: "Margaret (book club)",
                      subject: "Wednesday: changed to 3pm at the library",
                      time: "Yesterday",
                      unread: true,
                    },
                    {
                      av: "B",
                      cls: "a4",
                      from: "Boots Pharmacy",
                      subject: "Your prescription is ready for collection",
                      time: "Mon",
                      unread: false,
                    },
                    {
                      av: "G",
                      cls: "a5",
                      from: "Garden Centre Newsletter",
                      subject: "May sale — 20% off all rose bushes",
                      time: "Mon",
                      unread: false,
                    },
                    {
                      av: "N",
                      cls: "a2",
                      from: "NHS Appointments",
                      subject: "Reminder — flu jab booked for 14 June, 10:30am",
                      time: "Last week",
                      unread: false,
                    },
                  ].map(({ av, cls, from, subject, time, unread }) => (
                    <div
                      key={from}
                      className={`em-item${unread ? " unread" : ""}`}
                    >
                      <span className={`em-avatar${cls ? ` ${cls}` : ""}`}>
                        {av}
                      </span>
                      <div className="em-body">
                        <p className="em-from">{from}</p>
                        <p className="em-subject">{subject}</p>
                      </div>
                      <span className="em-time">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* overlays */}
              <div
                className={`refresh-flash${showRefreshFlash ? " on" : ""}`}
                aria-hidden="true"
              >
                <span className="spin" aria-hidden="true" />
              </div>
              <div
                className={`save-toast${showSaveToast ? " show" : ""}`}
                role="status"
              >
                <BookmarkSimple weight="fill" size={18} />
                <span>
                  Saved! <strong>Anna</strong> will see this in her panel.
                </span>
              </div>
              <div
                className={`volume-ind${showVolumeInd ? " show" : ""}`}
                role="status"
              >
                {muted ? (
                  <SpeakerX weight="bold" size={18} />
                ) : (
                  <SpeakerHigh weight="bold" size={18} />
                )}
                <div className="vol-track">
                  <div
                    className="vol-fill"
                    style={{ width: `${muted ? 0 : volume}%` }}
                  />
                </div>
                <span>{muted ? "Muted" : `${volume}%`}</span>
              </div>
            </main>

            {/* side panel */}
            <aside className="sidepanel demo-panel" aria-label="Helper panel">
              <div
                className="sp-home"
                data-action="home"
                role="button"
                tabIndex={0}
                onClick={() => handleAction("home")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleAction("home")
                  }
                }}
              >
                <House weight="bold" size={22} /> HOME
              </div>

              <div className="sp-row">
                <div
                  className="sp-tile"
                  data-action="back"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleAction("back")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleAction("back")
                    }
                  }}
                >
                  <ArrowLeft weight="bold" size={20} />
                  BACK
                </div>
                <div
                  className="sp-tile"
                  data-action="forward"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleAction("forward")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleAction("forward")
                    }
                  }}
                >
                  <ArrowRight weight="bold" size={20} />
                  FORWARD
                </div>
              </div>

              <div className="sp-group">
                <div className="sp-group-head">
                  <span className="lhs">
                    <SpeakerHigh weight="bold" size={16} /> VOLUME
                  </span>
                  <span className="rhs value">
                    {muted ? "Muted" : `${volume}%`}
                  </span>
                </div>
                <div className="vol-bars">
                  {VOL_COLORS.map((c, i) => (
                    <span
                      key={i}
                      style={{
                        background: c,
                        opacity: i < volLevel ? 1 : 0.16,
                      }}
                    />
                  ))}
                </div>
                <div className="sp-row">
                  <div
                    className="sp-sm"
                    data-action="vol-less"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleAction("vol-less")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleAction("vol-less")
                      }
                    }}
                  >
                    − LESS
                  </div>
                  <div
                    className="sp-sm"
                    data-action="vol-more"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleAction("vol-more")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleAction("vol-more")
                      }
                    }}
                  >
                    + MORE
                  </div>
                </div>
                <div
                  className={`sp-sm${muted ? " active" : ""}`}
                  data-action="mute"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleAction("mute")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleAction("mute")
                    }
                  }}
                  style={{ width: "100%" }}
                >
                  {muted ? (
                    <SpeakerX weight="bold" size={13} />
                  ) : (
                    <SpeakerHigh weight="bold" size={13} />
                  )}{" "}
                  MUTE
                </div>
              </div>

              <div className="sp-group">
                <div className="sp-group-head">
                  <span className="lhs">
                    <ArrowsDownUp weight="bold" size={16} /> MOVE PAGE
                  </span>
                  <span className="rhs value">{posLabel}</span>
                </div>
                <div className="move-dots">
                  {Array.from({ length: moveDotCount }, (_, i) => (
                    <span key={i} className={i <= activeDots ? "on" : ""} />
                  ))}
                </div>
                <div className="sp-row">
                  <div
                    className="sp-sm"
                    data-action="up"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleAction("up")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleAction("up")
                      }
                    }}
                  >
                    <ArrowUp weight="bold" size={13} /> UP
                  </div>
                  <div
                    className="sp-sm"
                    data-action="down"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleAction("down")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleAction("down")
                      }
                    }}
                  >
                    <ArrowDown weight="bold" size={13} /> DOWN
                  </div>
                </div>
                <div
                  className="sp-sm muted"
                  data-action="top"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleAction("top")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleAction("top")
                    }
                  }}
                  style={{ width: "100%" }}
                >
                  <ArrowLineUp weight="bold" size={13} /> BACK TO TOP
                </div>
              </div>

              <div className="sp-row">
                <div
                  className="sp-tile"
                  data-action="text-size"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleAction("text-size")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleAction("text-size")
                    }
                  }}
                >
                  <TextAa weight="bold" size={20} />
                  {TEXT_LABELS[textSizeIdx]}
                </div>
                <div
                  className="sp-tile"
                  data-action="save"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleAction("save")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleAction("save")
                    }
                  }}
                >
                  <BookmarkSimple weight="bold" size={20} />
                  SAVE PAGE
                </div>
              </div>

              <div className="sp-row">
                <div
                  className="sp-tile"
                  data-action="fullscreen"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleAction("fullscreen")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleAction("fullscreen")
                    }
                  }}
                >
                  <ArrowsOut weight="bold" size={20} />
                  FULLSCREEN
                </div>
                <div
                  className="sp-tile"
                  data-action="refresh"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleAction("refresh")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleAction("refresh")
                    }
                  }}
                >
                  <ArrowClockwise weight="bold" size={20} />
                  REFRESH
                </div>
              </div>

              <div
                className="sp-close"
                data-action="close"
                role="button"
                tabIndex={0}
                onClick={() => handleAction("close")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleAction("close")
                  }
                }}
              >
                <XCircle weight="bold" size={16} /> CLOSE PAGE
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ── Walkthrough video (animated time-lapse montage) ── */}
      <WalkthroughVideo />
    </section>
  )
}
