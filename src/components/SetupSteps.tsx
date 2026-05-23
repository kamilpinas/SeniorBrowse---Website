import { Heart, PuzzlePiece, LockSimple, Play, Newspaper, Image, Envelope, Sun, VideoCamera, Book, Globe } from '@phosphor-icons/react'

function StepArrow() {
  return (
    <span className="step-arrow" aria-hidden="true">
      <svg viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2.5 5">
        <path d="M4 12 L 64 12" />
        <path d="M56 4 L 64 12 L 56 20" strokeDasharray="0" />
      </svg>
    </span>
  )
}

export default function SetupSteps() {
  return (
    <section className="setup" aria-labelledby="setup-h">
      <header className="setup-head">
        <p className="eyebrow-c">Getting started</p>
        <h2 id="setup-h">Five minutes to set up. Done in <em>one</em>.</h2>
        <p className="subhead">Add the extension, enter a few names and favourite sites, set a PIN. That's the entire installation.</p>
      </header>

      <div className="steps">

        <article className="step">
          <div className="step-thumb" aria-hidden="true">
            <div className="tc tc-add">
              <div className="app">
                <span className="mk"><Heart weight="fill" size={18} /></span>
                <span className="label">
                  <span className="t">SeniorBrowse</span>
                  <span className="s">By kamilpinas.com</span>
                </span>
              </div>
              <button className="btn-add" type="button">
                <PuzzlePiece weight="bold" size={13} /> Add to Browser
              </button>
            </div>
          </div>
          <p className="step-num">Step 01</p>
          <h3>Add to Chrome</h3>
          <p>One click. Free 7-day trial begins automatically.</p>
        </article>

        <StepArrow />

        <article className="step">
          <div className="step-thumb" aria-hidden="true">
            <div className="tc tc-names">
              <div className="field">
                <span className="lab">Your name</span>
                <span className="input">Anna</span>
              </div>
              <div className="field">
                <span className="lab">Their name</span>
                <span className="input">Maria<span className="caret" /></span>
              </div>
            </div>
          </div>
          <p className="step-num">Step 02</p>
          <h3>Name yourself and them</h3>
          <p>Just first names. We use them in greetings and confirmations.</p>
        </article>

        <StepArrow />

        <article className="step">
          <div className="step-thumb" aria-hidden="true">
            <div className="tc tc-favs">
              {[
                { cls: 'ic-yt', Icon: Play, selected: true },
                { cls: 'ic-bbc', Icon: Newspaper, selected: true },
                { cls: 'ic-photos', Icon: Image, selected: true },
                { cls: 'ic-mail', Icon: Envelope, selected: true },
                { cls: 'ic-wx', Icon: Sun, selected: false },
                { cls: 'ic-calls', Icon: VideoCamera, selected: false },
                { cls: '', Icon: Book, selected: false, style: { background: '#a89078' } },
                { cls: '', Icon: Globe, selected: false, style: { background: '#a89078' } },
              ].map(({ cls, Icon, selected, style }, i) => (
                <div className={`tc-fav${selected ? ' selected' : ''}`} key={i}>
                  <span className={`ic${cls ? ` ${cls}` : ''}`} style={style}>
                    <Icon weight="fill" size={13} />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="step-num">Step 03</p>
          <h3>Pick a few favourite sites</h3>
          <p>YouTube, BBC, family photo album. Suggest 4&ndash;6. You can add more later.</p>
        </article>

        <StepArrow />

        <article className="step">
          <div className="step-thumb" aria-hidden="true">
            <div className="tc tc-pin">
              <div className="pin-row">
                <div className="pin-box filled"><span className="dot" /></div>
                <div className="pin-box filled"><span className="dot" /></div>
                <div className="pin-box filled"><span className="dot" /></div>
                <div className="pin-box filled"><span className="dot" /></div>
              </div>
              <span className="pin-lock">
                <LockSimple weight="fill" size={12} /> Caregiver PIN set
              </span>
            </div>
          </div>
          <p className="step-num">Step 04</p>
          <h3>Set a PIN</h3>
          <p>A 4-digit code. Only you can change settings. They can't accidentally turn things off.</p>
        </article>

      </div>
    </section>
  )
}
