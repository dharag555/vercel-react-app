import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e, targetHash) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname === '/') {
      if (!targetHash || targetHash === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      history.replaceState(null, '', '/' + (targetHash ? targetHash : ''));
    } else {
      navigate('/' + targetHash);
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`header ${isScrolled || menuOpen ? 'is-scrolled' : ''}`} id="header">
        <div className="container header__inner">
          <Link to="/" className="logo" aria-label="SVK — home" onClick={(e) => handleNavClick(e, '')}>
            <svg aria-hidden="true">
              <use href="#i-logo" />
            </svg>
            <span className="logo__word">SVK</span>
          </Link>

          <nav className="nav" aria-label="Primary">
            <ul>
              <li>
                <Link to="/" onClick={(e) => handleNavClick(e, '')}>
                  Home
                </Link>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#diamonds" onClick={(e) => handleNavClick(e, '#diamonds')}>
                  Diamonds
                </a>
              </li>
              <li>
                <a href="#jewellery" onClick={(e) => handleNavClick(e, '#jewellery')}>
                  Jewellery
                </a>
              </li>
              <li>
                <a href="#collections" onClick={(e) => handleNavClick(e, '#collections')}>
                  Collections
                </a>
              </li>
              <li>
                <a href="#why" onClick={(e) => handleNavClick(e, '#why')}>
                  Why SVK
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="header__actions">
            <a className="btn btn--sm header__cta" href="#diamonds" onClick={(e) => handleNavClick(e, '#diamonds')}>
              Explore Diamonds
            </a>
            <button
              className="menu-btn"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} id="mobile-nav" aria-label="Mobile">
        <ul>
          <li>
            <Link className="m-link" to="/" onClick={(e) => handleNavClick(e, '')}>
              Home <small>01</small>
            </Link>
          </li>
          <li>
            <a className="m-link" href="#about" onClick={(e) => handleNavClick(e, '#about')}>
              About Us <small>02</small>
            </a>
          </li>
          <li>
            <a className="m-link" href="#diamonds" onClick={(e) => handleNavClick(e, '#diamonds')}>
              Diamonds <small>03</small>
            </a>
          </li>
          <li>
            <a className="m-link" href="#jewellery" onClick={(e) => handleNavClick(e, '#jewellery')}>
              Jewellery <small>04</small>
            </a>
          </li>
          <li>
            <a className="m-link" href="#collections" onClick={(e) => handleNavClick(e, '#collections')}>
              Collections <small>05</small>
            </a>
          </li>
          <li>
            <a className="m-link" href="#why" onClick={(e) => handleNavClick(e, '#why')}>
              Why SVK <small>06</small>
            </a>
          </li>
          <li>
            <a className="m-link" href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
              Contact <small>07</small>
            </a>
          </li>
        </ul>
        <a className="btn btn--block" href="#diamonds" onClick={(e) => handleNavClick(e, '#diamonds')}>
          Explore Diamonds{' '}
          <svg aria-hidden="true">
            <use href="#i-arrow" />
          </svg>
        </a>
      </div>
    </>
  );
}
