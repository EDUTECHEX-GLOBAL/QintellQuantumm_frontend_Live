import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/Qintell.png';
import './Header.css';

function Logo({ light = false }) {
  return (
    <Link className={`logo ${light ? 'logoLight' : ''}`} to="/" aria-label="Qintell Quantum home">
      <img src={logoImg} alt="Qintell Quantum" className="logoImg" />
    </Link>
  );
}

function ChipIcon() {
  return (
    <svg className="chipIcon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 1.5V4M15 1.5V4M9 20V22.5M15 20V22.5M1.5 9H4M1.5 15H4M20 9H22.5M20 15H22.5"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="globeIcon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 2.8c3.1 2.4 3.1 16 0 18.4M12 2.8c-3.1 2.4-3.1 16 0 18.4"
        stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.8 12h18.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="home" className="siteHeader">
      <div className="announcement">
        <div className="announceItem">
          <ChipIcon />
          <strong>Website under transformation</strong>
        </div>
        <p>Building the foundational hardware for a scalable quantum future.</p>
        <div className="announceItem right">
          <GlobeIcon />
          <span>Our new website launches in 4-6 weeks.</span>
        </div>
      </div>

      <nav className="navbar">
        <Logo />

        <button
          type="button"
          className="menuToggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primaryNav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`menuIcon ${menuOpen ? 'isOpen' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div
          id="primaryNav"
          className={`navLinks ${menuOpen ? 'isOpen' : ''}`}
          aria-label="Primary navigation"
        >
          <Link to="/#vision" onClick={closeMenu}>Vision</Link>
          <Link to="/#platform" onClick={closeMenu}>Platform</Link>
          <Link to="/#roadmap" onClick={closeMenu}>Roadmap</Link>
          <Link to="/#application" onClick={closeMenu}>Application</Link>
          <Link className="navCta navCtaMobile" to="/contact" onClick={closeMenu}>
            PARTNER WITH US
          </Link>
        </div>

        <Link className="navCta navCtaDesktop" to="/contact">PARTNER WITH US</Link>
      </nav>

      {menuOpen && <div className="navScrim" onClick={closeMenu} aria-hidden="true" />}
    </header>
  );
}