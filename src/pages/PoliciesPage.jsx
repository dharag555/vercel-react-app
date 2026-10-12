import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PoliciesPage() {
  const [activeSection, setActiveSection] = useState('privacy');

  useEffect(() => {
    const sections = ['privacy', 'terms', 'shipping'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', '#' + id);
    }
  };

  return (
    <main id="main" className="policy">
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li aria-current="page">Policies</li>
            </ol>
          </nav>
          <h1>Policies</h1>
          <p className="lead">Privacy, terms and shipping information for SVK clients.</p>
          <p className="placeholder-note" style={{ maxWidth: '70ch' }}>
            <strong>For SVK:</strong> These sections are placeholders. Replace them with policies reviewed by your
            legal advisor before launch.
          </p>
        </div>
      </section>

      <div className="container article">
        <aside className="toc" aria-label="On this page">
          <h2>On this page</h2>
          <ul data-toc>
            <li>
              <a
                href="#privacy"
                className={activeSection === 'privacy' ? 'is-active' : ''}
                onClick={(e) => scrollTo(e, 'privacy')}
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#terms"
                className={activeSection === 'terms' ? 'is-active' : ''}
                onClick={(e) => scrollTo(e, 'terms')}
              >
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a
                href="#shipping"
                className={activeSection === 'shipping' ? 'is-active' : ''}
                onClick={(e) => scrollTo(e, 'shipping')}
              >
                Shipping &amp; Returns
              </a>
            </li>
          </ul>
        </aside>

        <article className="prose">
          <section id="privacy">
            <h2>Privacy Policy</h2>
            <p>
              [Placeholder] Describe what personal information SVK collects through enquiries and consultations (such as
              name, email, phone number and message), how it is used, how long it is retained and how clients can request
              access or deletion.
            </p>
            <p>
              [Placeholder] Include contact details for privacy requests and any applicable legal basis for processing.
            </p>
          </section>

          <section id="terms">
            <h2>Terms &amp; Conditions</h2>
            <p>
              [Placeholder] Set out the terms governing use of this website, product descriptions and pricing,
              quotations, payment, bespoke commissions and limitations of liability.
            </p>
          </section>

          <section id="shipping">
            <h2>Shipping &amp; Returns</h2>
            <p>
              [Placeholder] Explain delivery methods, insurance during transit, delivery timeframes, collection by
              appointment, and the conditions and timeframe for returns or exchanges, including any exclusions for bespoke
              pieces.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
