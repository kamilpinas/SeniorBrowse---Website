import {
  Heart, Envelope, Play, Newspaper, Image, House,
  ArrowLeft, ArrowRight, HandPointing,
} from '@phosphor-icons/react'

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
        <h2 id="setup-h">Three steps. Done in <em>five minutes</em>.</h2>
        <p className="subhead">Install and start your trial, customise the experience, then walk through the tutorial together. That's the entire setup.</p>
      </header>

      <div className="steps">

        <article className="step">
          <div className="step-thumb" aria-hidden="true">
            <div className="tc tc-trial">
              <div className="trial-head">
                <span className="mk"><Heart weight="fill" size={14} /></span>
                <div className="brand-col">
                  <span className="t">SeniorBrowse</span>
                  <span className="s">Start 7-day free trial</span>
                </div>
              </div>
              <div className="trial-field">
                <Envelope weight="fill" size={11} />
                <span>anna@family.com</span>
              </div>
              <div className="trial-pair">
                <span className="pair-chip"><b>YOU</b>Anna</span>
                <span className="pair-chip"><b>SENIOR</b>Maria<span className="caret" /></span>
              </div>
            </div>
          </div>
          <p className="step-num">Step 01</p>
          <h3>Install &amp; start trial</h3>
          <p>Add to Browser, drop in your email, and name the caregiver and the senior. Free 7-day trial begins right away.</p>
        </article>

        <StepArrow />

        <article className="step">
          <div className="step-thumb" aria-hidden="true">
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
                  <span className="sw selected" style={{ background: '#9c3520' }} />
                  <span className="sw" style={{ background: '#1e6e4a' }} />
                  <span className="sw" style={{ background: '#5878a0' }} />
                  <span className="sw" style={{ background: '#6a5440' }} />
                </span>
              </div>
              <div className="cu-row">
                <span className="cu-lab">Text size</span>
                <span className="text-toggle">
                  <span>A</span><span className="active">A</span><span>A</span><span>A</span>
                </span>
              </div>
              <div className="cu-row">
                <span className="cu-lab">Safety</span>
                <span className="cu-vals">
                  <span className="toggle on"><span className="knob" /></span>
                  <span className="toggle-label">Strict</span>
                </span>
              </div>
            </div>
          </div>
          <p className="step-num">Step 02</p>
          <h3>Customise their experience</h3>
          <p>Pick starting shortcuts, theme colour, element size, and safety rules. Takes about a minute.</p>
        </article>

        <StepArrow />

        <article className="step">
          <div className="step-thumb" aria-hidden="true">
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
