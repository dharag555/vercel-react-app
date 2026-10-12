import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { WHATSAPP } from '../data/diamonds';

export default function Footer() {
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSubmitted, setNewsSubmitted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, targetHash) => {
    e.preventDefault();
    if (location.pathname === '/') {
      if (!targetHash || targetHash === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(targetHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      history.replaceState(null, '', '/' + (targetHash ? targetHash : ''));
    } else {
      navigate('/' + targetHash);
    }
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRe.test(newsEmail.trim())) {
      alert('Please enter a valid email address.');
      return;
    }
    setNewsSubmitted(true);
  };

  const waText = encodeURIComponent('Hello SVK, I would like to enquire about your diamonds.');

  return (
    <>
      <footer className="footer" aria-labelledby="footer-title">
        <h2 id="footer-title" className="sr-only">
          SVK footer
        </h2>
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <Link to="/" className="logo" aria-label="SVK — home" onClick={(e) => handleNavClick(e, '')}>
                <svg aria-hidden="true">
                  <use href="#i-logo" />
                </svg>
                <span className="logo__word">SVK</span>
              </Link>
              <p>
                A house of exceptional diamonds — selected for brilliance, presented with transparency and crafted into
                jewellery designed to be treasured for generations.
              </p>
              <div className="social" aria-label="SVK on social media">
                <a href="#" aria-label="Instagram (link to be added)">
                  <svg aria-hidden="true">
                    <use href="#i-instagram" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook (link to be added)">
                  <svg aria-hidden="true">
                    <use href="#i-facebook" />
                  </svg>
                </a>
                <a href="#" aria-label="Pinterest (link to be added)">
                  <svg aria-hidden="true">
                    <use href="#i-pinterest" />
                  </svg>
                </a>
                <a href="#" aria-label="YouTube (link to be added)">
                  <svg aria-hidden="true">
                    <use href="#i-youtube" />
                  </svg>
                </a>
              </div>
              <div className="footer__news">
                {newsSubmitted ? (
                  <p style={{ padding: '12px 0', color: 'var(--champagne)', fontSize: 'var(--text-sm)' }}>
                    Thank you — you are on the list.
                  </p>
                ) : (
                  <form onSubmit={handleNewsletter} noValidate>
                    <label className="sr-only" htmlFor="news-email">
                      Email for private previews
                    </label>
                    <input
                      id="news-email"
                      type="email"
                      placeholder="Email for private previews"
                      autoComplete="email"
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
                      required
                    />
                    <button type="submit">Join</button>
                  </form>
                )}
              </div>
            </div>

            <div className="footer__cols">
              <div>
                <h4>Quick Links</h4>
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
                    <a href="#why" onClick={(e) => handleNavClick(e, '#why')}>
                      Why SVK
                    </a>
                  </li>
                  <li>
                    <a href="#bespoke" onClick={(e) => handleNavClick(e, '#bespoke')}>
                      Bespoke
                    </a>
                  </li>
                  <li>
                    <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4>Diamond Collections</h4>
                <ul>
                  <li>
                    <a href="#diamonds" onClick={(e) => handleNavClick(e, '#diamonds')}>
                      All Diamonds
                    </a>
                  </li>
                  <li>
                    <a href="#diamonds" onClick={(e) => handleNavClick(e, '#diamonds')}>
                      Natural Diamonds
                    </a>
                  </li>
                  <li>
                    <a href="#diamonds" onClick={(e) => handleNavClick(e, '#diamonds')}>
                      Lab-Grown Diamonds
                    </a>
                  </li>
                  <li>
                    <a href="#shapes" onClick={(e) => handleNavClick(e, '#shapes')}>
                      Shop by Shape
                    </a>
                  </li>
                  <li>
                    <a href="#collections" onClick={(e) => handleNavClick(e, '#collections')}>
                      Collections
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4>Jewellery</h4>
                <ul>
                  <li>
                    <a href="#jewellery" onClick={(e) => handleNavClick(e, '#jewellery')}>
                      Engagement Rings
                    </a>
                  </li>
                  <li>
                    <a href="#jewellery" onClick={(e) => handleNavClick(e, '#jewellery')}>
                      Diamond Rings
                    </a>
                  </li>
                  <li>
                    <a href="#jewellery" onClick={(e) => handleNavClick(e, '#jewellery')}>
                      Bangles
                    </a>
                  </li>
                  <li>
                    <a href="#jewellery" onClick={(e) => handleNavClick(e, '#jewellery')}>
                      Necklaces
                    </a>
                  </li>
                  <li>
                    <a href="#jewellery" onClick={(e) => handleNavClick(e, '#jewellery')}>
                      Bracelets
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4>Diamond Education</h4>
                <ul>
                  <li>
                    <Link to="/education#four-cs">The 4Cs</Link>
                  </li>
                  <li>
                    <Link to="/education#natural-vs-lab">Natural vs Lab-Grown</Link>
                  </li>
                  <li>
                    <Link to="/education#certification">Certification</Link>
                  </li>
                  <li>
                    <Link to="/education#choosing">How to Choose</Link>
                  </li>
                  <li>
                    <Link to="/education#care">Diamond Care</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <p>© {new Date().getFullYear()} SVK. All rights reserved.</p>
            <ul>
              <li>
                <Link to="/policies#privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/policies#terms">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link to="/policies#shipping">Shipping &amp; Returns</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__word" aria-hidden="true">
          DIAMORA
        </div>
      </footer>

      <a
        className="wa"
        href={`https://wa.me/${WHATSAPP}?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SVK on WhatsApp"
      >
        <svg aria-hidden="true">
          <use href="#i-whatsapp" />
        </svg>
        <span>Chat with us</span>
      </a>
    </>
  );
}
