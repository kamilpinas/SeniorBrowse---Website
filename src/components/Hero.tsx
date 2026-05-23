import {
  Heart,
  PuzzlePiece,
  LockSimple,
  MagnifyingGlass,
  Play,
  Newspaper,
  Image,
  Envelope,
  Sun,
  VideoCamera,
  House,
  ArrowLeft,
  ArrowRight,
  SpeakerHigh,
  ArrowsDownUp,
  ArrowUp,
  ArrowDown,
  ArrowLineUp,
  TextAa,
  BookmarkSimple,
  ArrowsOut,
  ArrowClockwise,
  XCircle,
  DotsThreeVertical,
} from "@phosphor-icons/react"

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

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow anim-up d1">
          For the parent or grandparent you love
        </p>

        <h1 className="hero-h1 anim-up d2">
          <span className="l1">You set it up.</span>
          <span className="l2">
            They just <em>browse</em>.
          </span>
        </h1>

        <p className="hero-sub anim-up d3">
          Make the internet feel simple for the people you love. A calm home
          screen, big buttons, and a helper panel on every page&nbsp;— so they
          spend time with what matters, not figuring out tabs.
        </p>

        <div className="cta-row anim-up d4">
          <a href="#install" className="btn-primary">
            <PuzzlePiece weight="bold" size={22} aria-hidden="true" />
            Add to Browser
          </a>
          <div className="cta-meta">
            <span className="meta-1">7 days free</span>
            <span className="meta-2">
              No card required · Works with Chrome &amp; Edge
            </span>
          </div>
        </div>
      </div>

      <div className="product-wrap anim-up d5" aria-hidden="true">
        <div className="window">
          <div className="titlebar">
            <div className="lights">
              <span className="light r" />
              <span className="light y" />
              <span className="light g" />
            </div>
            <div className="tabs">
              <div className="tab">
                <span className="tab-icon">
                  <Heart weight="fill" size={10} />
                </span>
                Maria's home
              </div>
            </div>
            <div className="urlbar">
              <LockSimple weight="fill" size={14} />
              <span>seniorbrowse&nbsp;·&nbsp;new&nbsp;tab</span>
            </div>
            <div className="titlebar-end">
              <DotsThreeVertical size={18} />
            </div>
          </div>

          <div className="window-body">
            <div className="newtab">
              <div className="nt-head">
                <h2 className="greeting">
                  Good morning, <em>Maria</em>!
                  <span className="sub">What would you like to do today?</span>
                </h2>
                <div className="clock">
                  9:24<span className="ampm">am</span>
                  <span className="date">Fri 22 May</span>
                </div>
              </div>

              <div className="searchbar">
                <MagnifyingGlass
                  size={18}
                  style={{ color: "var(--color-accent)" }}
                />
                <span>Search the web</span>
              </div>

              <div className="tile-grid">
                {[
                  { cls: "ic-yt", Icon: Play, label: "YouTube" },
                  { cls: "ic-bbc", Icon: Newspaper, label: "BBC News" },
                  { cls: "ic-photos", Icon: Image, label: "Photos" },
                  { cls: "ic-mail", Icon: Envelope, label: "Email" },
                  { cls: "ic-wx", Icon: Sun, label: "Weather" },
                  { cls: "ic-calls", Icon: VideoCamera, label: "Calls" },
                ].map(({ cls, Icon, label }) => (
                  <div className="tile" key={label}>
                    <span className={`icon ${cls}`}>
                      <Icon weight="fill" size={22} />
                    </span>
                    <span className="tile-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="sidepanel" aria-label="Helper panel">
              <div className="sp-home">
                <House weight="bold" size={20} /> HOME
              </div>

              <div className="sp-row">
                <div className="sp-tile">
                  <ArrowLeft weight="bold" size={18} />
                  BACK
                </div>
                <div className="sp-tile">
                  <ArrowRight weight="bold" size={18} />
                  FORWARD
                </div>
              </div>

              <div className="sp-group">
                <div className="sp-group-head">
                  <span className="lhs">
                    <SpeakerHigh weight="bold" size={14} /> VOLUME
                  </span>
                  <span className="rhs">100%</span>
                </div>
                <div className="vol-bars">
                  {VOL_COLORS.map((c, i) => (
                    <span key={i} style={{ background: c }} />
                  ))}
                </div>
                <div className="sp-row">
                  <div className="sp-sm">− LESS</div>
                  <div className="sp-sm muted">+ MORE</div>
                </div>
                <div className="sp-sm" style={{ width: "100%" }}>
                  <SpeakerHigh weight="bold" size={13} /> MUTE
                </div>
              </div>

              <div className="sp-group">
                <div className="sp-group-head">
                  <span className="lhs">
                    <ArrowsDownUp weight="bold" size={14} /> MOVE PAGE
                  </span>
                  <span className="rhs accent">Top</span>
                </div>
                <div className="move-dots">
                  <span className="on" />
                  <span className="on" />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="sp-row">
                  <div className="sp-sm">
                    <ArrowUp weight="bold" size={13} /> UP
                  </div>
                  <div className="sp-sm">
                    <ArrowDown weight="bold" size={13} /> DOWN
                  </div>
                </div>
                <div className="sp-sm muted" style={{ width: "100%" }}>
                  <ArrowLineUp weight="bold" size={13} /> BACK TO TOP
                </div>
              </div>

              <div className="sp-row">
                <div className="sp-tile">
                  <TextAa weight="bold" size={18} />
                  TEXT SIZE
                </div>
                <div className="sp-tile">
                  <BookmarkSimple weight="bold" size={18} />
                  SAVE PAGE
                </div>
              </div>

              <div className="sp-row">
                <div className="sp-tile">
                  <ArrowsOut weight="bold" size={18} />
                  FULLSCREEN
                </div>
                <div className="sp-tile">
                  <ArrowClockwise weight="bold" size={18} />
                  REFRESH
                </div>
              </div>

              <div className="sp-close">
                <XCircle weight="bold" size={16} /> CLOSE PAGE
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
