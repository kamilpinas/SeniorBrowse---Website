import { Heart, PuzzlePiece } from '@phosphor-icons/react'
import { EXTENSION_URL } from '../constants'

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
        <a href="#see-it" className="nav-link">How it works</a>
        <a href="#safety" className="nav-link">Safety</a>
        <a href="#free" className="nav-link">Free</a>
        <a href="#faq" className="nav-link">FAQ</a>
        <a href={EXTENSION_URL} className="btn-primary btn-nav">
          <PuzzlePiece weight="bold" size={16} aria-hidden="true" />
          Add to Browser
        </a>
      </nav>
    </header>
  )
}
