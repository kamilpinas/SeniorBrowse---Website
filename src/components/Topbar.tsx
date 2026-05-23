import { Heart } from '@phosphor-icons/react'

export default function Topbar() {
  return (
    <header className="topbar">
      <a href="#" className="brand" aria-label="SeniorBrowse home">
        <span className="brand-mark" aria-hidden="true">
          <Heart weight="fill" size={20} />
        </span>
        <span className="brand-name">Senior<span className="br">Browse</span></span>
      </a>
      <nav className="topnav" aria-label="Primary">
        <a href="#how" className="nav-link">How it works</a>
        <a href="#features" className="nav-link">For families</a>
        <a href="#pricing" className="nav-link">Pricing</a>
        <a href="#signin" className="signin">Sign in</a>
      </nav>
    </header>
  )
}
