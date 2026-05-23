import { useState, useRef, useEffect, useCallback } from "react"
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
  Pause,
  MagnifyingGlass,
  Newspaper,
  Image,
  Envelope,
  Sun,
  VideoCamera,
  LockSimple,
  HandPointing,
  DotsThreeVertical,
  PencilSimple,
  SidebarSimple,
  SquaresFour,
  ListBullets,
  ShieldCheck,
  CornersOut,
  Heart,
} from "@phosphor-icons/react"

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
const CAPTIONS = [
  "Big-tile home screen — named for them.",
  "Side panel mid-browsing — there on every page.",
  "Caregiver admin mode — quietly configurable.",
  "Activity log — see what they visited and saved.",
  "Safe-site warnings — a calm pause, not an alarm.",
  "Saved pages — straight to the caregiver's inbox.",
]

function fmt(s: number) {
  const m = Math.floor(s / 60),
    r = Math.floor(s % 60)
  return `${m}:${String(r).padStart(2, "0")}`
}
const TOTAL = 62

export default function SeeItInAction() {
  // ── demo state ────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState<PageKey>("news")
  const [urlText, setUrlText] = useState(PAGE_URLS.news)
  const [volume, setVolume] = useState(100)
  const [muted, setMuted] = useState(false)
  const [textSizeIdx, setTextSizeIdx] = useState(0)
  const [showSaveToast, setShowSaveToast] = useState(false)
  const [showVolumeInd, setShowVolumeInd] = useState(false)
  const [showRefreshFlash, setShowRefreshFlash] = useState(false)
  const [tooltipDismissed, setTooltipDismissed] = useState(false)
  const [scrollRatio, setScrollRatio] = useState(0)
  const [closingPage, setClosingPage] = useState<PageKey | null>(null)

  // ── video state ───────────────────────────────────────────────────
  const [playing, setPlayingState] = useState(false)
  const [progress, setProgress] = useState(18)
  const [ccOn, setCcOn] = useState(true)
  const [captionText, setCaptionText] = useState(CAPTIONS[0])

  const historyRef = useRef<{ pages: PageKey[]; idx: number }>({
    pages: ["news"],
    idx: 0,
  })
  const currentPageRef = useRef<PageKey>("news")
  const pageRefs = useRef<Partial<Record<PageKey, HTMLDivElement | null>>>({})
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const volTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const videoTimerRef = useRef<ReturnType<typeof setInterval>>()

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

  const dismissTooltip = useCallback(() => setTooltipDismissed(true), [])

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
      dismissTooltip()
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
      dismissTooltip,
      flashVolume,
      flashSave,
      flashRefresh,
      flashClose,
    ],
  )

  // video player
  const setPlaying = useCallback((on: boolean) => {
    setPlayingState(on)
    clearInterval(videoTimerRef.current)
    if (on) {
      videoTimerRef.current = setInterval(() => {
        setProgress((prev) => {
          const next = Math.min(100, prev + 1.2)
          const seg = Math.min(
            CAPTIONS.length - 1,
            Math.floor((next / 100) * CAPTIONS.length),
          )
          setCaptionText(CAPTIONS[seg])
          if (next >= 100) {
            setPlayingState(false)
            clearInterval(videoTimerRef.current)
          }
          return next
        })
      }, 350)
    }
  }, [])

  useEffect(
    () => () => {
      clearTimeout(saveTimerRef.current)
      clearTimeout(volTimerRef.current)
      clearInterval(videoTimerRef.current)
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
  const vidSeconds = Math.round((progress / 100) * TOTAL)

  return (
    <section className="see-it" aria-labelledby="see-h">
      <header className="see-head">
        <p className="eyebrow-c">Try it yourself</p>
        <h2 id="see-h" className="see-h2">
          The side panel does <em>the work</em>.
        </h2>
        <p className="see-sub">
          This is the actual side panel. Click any button.
        </p>
      </header>

      {/* ── Interactive Demo ── */}
      <div className="demo" id="demo">
        <div className={`demo-tooltip${tooltipDismissed ? " fade" : ""}`}>
          <HandPointing
            weight="fill"
            size={18}
            className="hand"
            aria-hidden="true"
          />
          Try clicking <strong>HOME</strong>
        </div>
        <svg
          className={`demo-arrow${tooltipDismissed ? " fade" : ""}`}
          viewBox="0 0 90 70"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 5"
          aria-hidden="true"
        >
          <path d="M5 4 C 30 8, 55 26, 76 56" />
          <path d="M68 50 L 76 56 L 70 62" strokeDasharray="0" />
        </svg>

        <div className="demo-window">
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
                      onClick={() => {
                        dismissTooltip()
                        navigate(page, true)
                      }}
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
                      from: "Anna (your daughter)",
                      subject:
                        "Lovely photos from Sunday — also Tom said hi xx",
                      time: "9:14 am",
                      unread: true,
                    },
                    {
                      av: "T",
                      cls: "a3",
                      from: "Tom (your grandson)",
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

      {/* ── Walkthrough video ── */}
      <div className="walkthrough">
        <p className="walk-eyebrow">The 60-second walkthrough</p>
        <h3 className="walk-h3">
          See SeniorBrowse on <em>your parent's</em> screen.
        </h3>

        <div className="video-frame">
          <div className="video-stage">
            <div className="poster" aria-hidden="true">
              <div className="poster-head">
                <span className="poster-eyebrow">SeniorBrowse</span>
                <span className="poster-mark">
                  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="8"
                      y="12"
                      width="48"
                      height="42"
                      rx="5"
                      fill="#fff"
                    />
                    <line
                      x1="8"
                      y1="22"
                      x2="56"
                      y2="22"
                      stroke="#9c3520"
                      strokeWidth="1.5"
                    />
                    <circle cx="13" cy="17" r="1.4" fill="#9c3520" />
                    <circle cx="18" cy="17" r="1.4" fill="#9c3520" />
                    <circle cx="23" cy="17" r="1.4" fill="#9c3520" />
                    <path
                      d="M32 31 C 28 26, 21 28, 21 34 C 21 40, 32 47, 32 47 C 32 47, 43 40, 43 34 C 43 28, 36 26, 32 31 Z"
                      fill="#9c3520"
                    />
                  </svg>
                </span>
              </div>
              <div className="poster-body">
                <h2 className="poster-title">
                  <span className="line-1">The internet,</span>
                  <span className="line-2">finally easy.</span>
                </h2>
                <p className="poster-sub">
                  A Chrome extension that turns the web into something the
                  people you love can actually use.
                </p>
              </div>
              <div className="poster-foot">
                <span>SeniorBrowse.com</span>
                <span>01 / 06</span>
              </div>
            </div>

            <button
              className="play-badge"
              aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}
              style={{
                opacity: playing ? 0 : 1,
                pointerEvents: playing ? "none" : "auto",
              }}
              onClick={() => setPlaying(true)}
            >
              <Play weight="fill" size={42} aria-hidden="true" />
            </button>

            {ccOn && <div className="caption-box">{captionText}</div>}
          </div>

          <div className="video-controls">
            <button
              className="vc-btn"
              onClick={() => setPlaying(!playing)}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <Pause weight="fill" size={16} />
              ) : (
                <Play weight="fill" size={16} />
              )}
            </button>
            <div className="vc-progress">
              <div className="vc-bar" style={{ width: `${progress}%` }} />
            </div>
            <span className="vc-time">
              {fmt(vidSeconds)} / {fmt(TOTAL)}
            </span>
            <button
              className="vc-cc"
              aria-pressed={ccOn}
              aria-label="Captions"
              onClick={() => setCcOn((c) => !c)}
            >
              CC
            </button>
            <button className="vc-fs" aria-label="Fullscreen">
              <CornersOut weight="bold" size={16} />
            </button>
          </div>
        </div>

        <div className="what-list">
          <p className="what-title">What you'll see</p>
          <ul>
            {[
              { Icon: SquaresFour, text: "Big-tile home screen." },
              { Icon: SidebarSimple, text: "Side panel mid-browsing." },
              { Icon: PencilSimple, text: "Caregiver admin mode." },
              { Icon: ListBullets, text: "Activity log review." },
              { Icon: ShieldCheck, text: "Safe-site warnings." },
              { Icon: BookmarkSimple, text: "Saved pages → caregiver inbox." },
            ].map(({ Icon, text }) => (
              <li key={text}>
                <span className="marker" aria-hidden="true">
                  <Icon weight="fill" size={15} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
