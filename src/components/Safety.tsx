export default function Safety() {
  return (
    <section className="safety" aria-labelledby="safety-h">
      <header className="safety-head">
        <p className="eyebrow-c">Safety &amp; Control</p>
        <h2 id="safety-h">You decide what's safe. We make sure they stay there.</h2>
        <p className="subhead">Four protections built in. None of them require you to think about it after setup.</p>
      </header>

      <div className="pillars">
        <article className="pillar">
          <span className="numeral" aria-hidden="true">01</span>
          <h3>No ads, no clutter</h3>
          <p>We block the banners, pop-ups, and tracking scripts that make modern websites overwhelming. Pages look clean from the moment your parent arrives.</p>
        </article>

        <article className="pillar">
          <span className="numeral" aria-hidden="true">02</span>
          <h3>Scam links blocked before they're clicked</h3>
          <p>When a known phishing or scam site is loaded, the page is replaced with a clear warning. You can choose: block automatically, warn first, or turn off.</p>
        </article>

        <article className="pillar">
          <span className="numeral" aria-hidden="true">03</span>
          <h3>No accidental downloads</h3>
          <p>Files don't download by mistake. If a website tries, nothing happens. You can change this from settings.</p>
        </article>

        <article className="pillar">
          <span className="numeral" aria-hidden="true">04</span>
          <h3>A history kept for you, only on their computer</h3>
          <p>Every visit is logged so you can review it during your weekly check-in. <span className="precise">The history stays on their machine. We never see it, send it anywhere, or analyse it.</span></p>
        </article>
      </div>
    </section>
  )
}
