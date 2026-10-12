import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  DIAMONDS,
  SHAPES,
  SHAPE_NAMES,
  getShapeSlug,
  ORDER
} from '../data/diamonds';
import DiamondCard from '../components/DiamondCard';
import EnquiryForm from '../components/EnquiryForm';

const CARAT_LIMITS = [
  Math.floor(Math.min(...DIAMONDS.map((d) => d.carat)) * 10) / 10,
  Math.ceil(Math.max(...DIAMONDS.map((d) => d.carat)) * 10) / 10
];



export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [origin, setOrigin] = useState(searchParams.get('origin') || 'All');
  const [selectedShapes, setSelectedShapes] = useState(() => {
    const s = searchParams.get('shape');
    return s ? new Set(s.split(',')) : new Set();
  });
  const [selectedCuts, setSelectedCuts] = useState(() => {
    const c = searchParams.get('cut');
    return c ? new Set(c.split(',')) : new Set();
  });
  const [selectedColors, setSelectedColors] = useState(() => {
    const clr = searchParams.get('color');
    return clr ? new Set(clr.split(',')) : new Set();
  });
  const [selectedClarity, setSelectedClarity] = useState(() => {
    const cla = searchParams.get('clarity');
    return cla ? new Set(cla.split(',')) : new Set();
  });
  const [selectedCerts, setSelectedCerts] = useState(() => {
    const cert = searchParams.get('cert');
    return cert ? new Set(cert.split(',')) : new Set();
  });
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [caratRange, setCaratRange] = useState([...CARAT_LIMITS]);

  // Drawer & pagination
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  // Close drawer on escape and lock scroll when open
  useEffect(() => {
    if (filterDrawerOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && filterDrawerOpen) {
        setFilterDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [filterDrawerOpen]);

  // Active 4Cs Tab in Education section
  const [activeTab, setActiveTab] = useState('cut');

  // Contact form pre-fill state
  const [contactRequirement, setContactRequirement] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Sparkles animation
  const sparklesRef = useRef(null);
  const heroImgRef = useRef(null);

  useEffect(() => {
    const sp = sparklesRef.current;
    const heroImg = heroImgRef.current;
    if (!sp || !heroImg) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const W = 1536,
      H = 1024;
    const pts = [
      [1068, 330, 0],
      [1262, 398, 1.6],
      [1128, 520, 3.1],
      [1300, 552, 4.2],
      [1010, 462, 2.3],
      [1190, 300, 3.8]
    ];

    sp.innerHTML = '';
    const sparkles = pts.map(([, , d], i) => {
      const s = document.createElement('span');
      s.className = 'sparkle';
      s.style.animationDelay = d + 's';
      if (i % 2) {
        s.style.width = '14px';
        s.style.height = '14px';
      }
      s.innerHTML = '<svg viewBox="0 0 24 24"><use href="#i-sparkle"/></svg>';
      sp.appendChild(s);
      return s;
    });

    const place = () => {
      const r = sp.getBoundingClientRect();
      const scale = Math.max(r.width / W, r.height / H);
      const op = getComputedStyle(heroImg).objectPosition.split(' ').map((v) => parseFloat(v) / 100);
      const posX = isNaN(op[0]) ? 0.72 : op[0];
      const posY = isNaN(op[1]) ? 0.5 : op[1];
      const offX = (r.width - W * scale) * posX;
      const offY = (r.height - H * scale) * posY;
      sparkles.forEach((s, i) => {
        s.style.left = offX + pts[i][0] * scale + 'px';
        s.style.top = offY + pts[i][1] * scale + 'px';
      });
    };

    place();
    window.addEventListener('resize', place, { passive: true });
    return () => window.removeEventListener('resize', place);
  }, []);

  // Filter diamonds
  const filteredDiamonds = useMemo(() => {
    return DIAMONDS.filter((d) => {
      if (origin !== 'All' && d.origin !== origin) return false;
      if (selectedShapes.size && !selectedShapes.has(d.shape)) return false;
      if (selectedCuts.size && !selectedCuts.has(d.cut)) return false;
      if (selectedColors.size && !selectedColors.has(d.color)) return false;
      if (selectedClarity.size && !selectedClarity.has(d.clarity)) return false;
      if (selectedCerts.size && !selectedCerts.has(d.cert)) return false;
      if (d.carat < caratRange[0] - 1e-9 || d.carat > caratRange[1] + 1e-9) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const hay = `${d.id} ${d.shape} ${d.carat.toFixed(2)} ${d.carat}ct ${d.carat} ct ${d.cut} ${d.color} ${d.clarity} ${d.cert} ${d.origin} ${d.origin === 'Lab-Grown' ? 'lab grown lab' : ''}`.toLowerCase();
        if (!q.split(/\s+/).every((w) => hay.includes(w))) return false;
      }
      return true;
    }).sort((a, b) => a.featured - b.featured);
  }, [
    origin,
    selectedShapes,
    selectedCuts,
    selectedColors,
    selectedClarity,
    selectedCerts,
    caratRange,
    searchQuery
  ]);

  const resetFilters = () => {
    setOrigin('All');
    setSelectedShapes(new Set());
    setSelectedCuts(new Set());
    setSelectedColors(new Set());
    setSelectedClarity(new Set());
    setSelectedCerts(new Set());
    setSearchQuery('');
    setCaratRange([...CARAT_LIMITS]);
    setVisibleCount(9);
  };

  const handleShapeSelect = (shapeName) => {
    resetFilters();
    setSelectedShapes(new Set([shapeName]));
    const el = document.getElementById('diamonds');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrefillRequirement = (req, msg = '') => {
    setContactRequirement(req);
    if (msg) setContactMessage(msg);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle set item helper
  const toggleSetItem = (set, setFn, item) => {
    const next = new Set(set);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    setFn(next);
    setVisibleCount(9);
  };

  return (
    <main id="main">
      {/* ============ HERO ============ */}
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero__media">
          <img
            ref={heroImgRef}
            src="/assets/img/hero.webp"
            alt="A brilliant round diamond resting on ivory silk, catching warm studio light"
            width="1536"
            height="1024"
            data-hero-img
          />
        </div>
        <div className="sparkles" ref={sparklesRef} aria-hidden="true" />
        <div className="hero__veil" aria-hidden="true" />
        <div className="container hero__content">
          <div className="hero__text">
            <span className="eyebrow reveal-in d1">Maison de Diamants</span>
            <h1 id="hero-title">
              <span className="line">
                <span>Where Every</span>
              </span>
              <span className="line">
                <span>Diamond Tells</span>
              </span>
              <span className="line">
                <span>
                  <em>a Story.</em>
                </span>
              </span>
            </h1>
            <p className="hero__sub reveal-in d2">
              Discover exceptional diamonds crafted by nature and selected for timeless brilliance.
            </p>
            <div className="hero__ctas reveal-in d3">
              <a
                className="btn"
                href="#diamonds"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('diamonds')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Diamonds{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>
              <a
                className="btn btn--ghost"
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Discover SVK
              </a>
            </div>
          </div>
        </div>
        <div className="hero__meta" aria-hidden="true">
          <span>Scroll</span>
          <span className="scroll-line" />
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="section about" id="about" aria-labelledby="about-title">
        <div className="container about__grid">
          <div className="about__media is-visible">
            <div className="frame img-reveal is-visible">
              <img
                src="/assets/img/about.webp"
                alt="A diamond specialist inspecting a loose diamond with tweezers and a loupe at an atelier bench"
                width="1024"
                height="1536"
                loading="lazy"
              />
            </div>
            <div className="about__badge">
              <div className="display">
                Selected by eye.
                <br />
                Verified by detail.
              </div>
              <p>Every stone is examined for brilliance, proportion and character before it carries our name.</p>
            </div>
          </div>
          <div className="about__body">
            <span className="eyebrow is-visible">About SVK</span>
            <h2 className="h-section is-visible" id="about-title" style={{ marginBlock: '1.25rem 1.5rem' }}>
              The Art of <em>Exceptional</em> Diamonds
            </h2>
            <p className="lead is-visible">
              SVK was founded on a simple belief: a diamond should be as honest as it is beautiful.
            </p>
            <p className="muted is-visible" style={{ marginTop: '1rem' }}>
              We work with a small circle of trusted partners to find stones of genuine distinction — then present each
              one with complete clarity on its grading, origin and value. From the first conversation to the final
              setting, our role is to guide you with knowledge, patience and care.
            </p>
            <ul className="pillars">
              <li className="pillar is-visible" data-delay="1">
                <span className="pillar__num">i.</span>
                <h3>Quality</h3>
                <p>Only stones with exceptional light performance and balanced proportions.</p>
              </li>
              <li className="pillar is-visible" data-delay="2">
                <span className="pillar__num">ii.</span>
                <h3>Authenticity</h3>
                <p>Grading documentation shared openly wherever a report accompanies the stone.</p>
              </li>
              <li className="pillar is-visible" data-delay="1">
                <span className="pillar__num">iii.</span>
                <h3>Transparency</h3>
                <p>Clear specifications and honest pricing, explained without pressure.</p>
              </li>
              <li className="pillar is-visible" data-delay="2">
                <span className="pillar__num">iv.</span>
                <h3>Craftsmanship</h3>
                <p>Settings finished by hand, with attention to every claw and curve.</p>
              </li>
              <li className="pillar is-visible" data-delay="1">
                <span className="pillar__num">v.</span>
                <h3>Responsible Sourcing</h3>
                <p>We ask where our diamonds come from, and we share what we learn.</p>
              </li>
              <li className="pillar is-visible" data-delay="2">
                <span className="pillar__num">vi.</span>
                <h3>Customer Trust</h3>
                <p>Long-term relationships built one considered decision at a time.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============ CATALOGUE ============ */}
      <section className="section catalogue" id="diamonds" aria-labelledby="diamonds-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow is-visible">The Diamond Collection</span>
              <h2 className="h-section is-visible" id="diamonds-title" style={{ marginTop: '1.25rem' }}>
                Find your <em>diamond</em>
              </h2>
            </div>
            <p className="lead is-visible">
              Search and refine by the characteristics that matter most to you. Every stone can be viewed privately with
              a specialist.
            </p>
          </div>

          <div className="cat-toolbar" role="search">
            <div className="search">
              <svg aria-hidden="true">
                <use href="#i-search" />
              </svg>
              <label className="sr-only" htmlFor="q">
                Search diamonds
              </label>
              <input
                id="q"
                type="search"
                placeholder="Search by shape, carat, colour, clarity or ID"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(9);
                }}
              />
            </div>
            <div className="toolbar-right">
              <span className="result-count" aria-live="polite">
                {filteredDiamonds.length} {filteredDiamonds.length === 1 ? 'diamond' : 'diamonds'}
              </span>
              <button
                className="btn btn--ghost btn--sm filter-toggle"
                type="button"
                aria-controls="filters"
                aria-expanded={filterDrawerOpen}
                onClick={() => setFilterDrawerOpen(true)}
              >
                <svg aria-hidden="true" style={{ width: 14, height: 14 }}>
                  <use href="#i-filter" />
                </svg>{' '}
                Filters
              </button>
            </div>
          </div>

          <div className="cat-layout">
            <aside className={`filters ${filterDrawerOpen ? 'is-open' : ''}`} id="filters" aria-label="Diamond filters">
              <div className="filters__head">
                <h3>Refine</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button className="filters__reset" type="button" onClick={resetFilters}>
                    Reset all
                  </button>
                  <button
                    className="filters__close"
                    type="button"
                    aria-label="Close filters"
                    onClick={() => setFilterDrawerOpen(false)}
                  >
                    <svg aria-hidden="true" style={{ width: 14, height: 14 }}>
                      <use href="#i-close" />
                    </svg>
                  </button>
                </div>
              </div>

              <div data-filter-groups>
                {/* Origin */}
                <div className="fgroup" style={{ borderTop: 0, paddingTop: 0 }}>
                  <fieldset>
                    <legend>Origin</legend>
                    <div className="seg">
                      {['All', 'Natural', 'Lab-Grown'].map((v) => (
                        <label key={v}>
                          <input
                            type="radio"
                            name="origin"
                            value={v}
                            checked={origin === v}
                            onChange={() => {
                              setOrigin(v);
                              setVisibleCount(9);
                            }}
                          />
                          <span>{v}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* Shape */}
                <div className="fgroup">
                  <fieldset>
                    <legend>Shape</legend>
                    <div className="chips">
                      {SHAPE_NAMES.map((s) => (
                        <label className="chip" key={s}>
                          <input
                            type="checkbox"
                            checked={selectedShapes.has(s)}
                            onChange={() => toggleSetItem(selectedShapes, setSelectedShapes, s)}
                          />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* Carat */}
                <div className="fgroup" data-range="carat">
                  <div className="fgroup__label" id="lbl-carat">
                    <span>Carat</span>
                  </div>
                  <div className="range">
                    <div className="range__track" />
                    <div
                      className="range__fill"
                      style={{
                        left: `${((caratRange[0] - CARAT_LIMITS[0]) / (CARAT_LIMITS[1] - CARAT_LIMITS[0])) * 100}%`,
                        width: `${((caratRange[1] - caratRange[0]) / (CARAT_LIMITS[1] - CARAT_LIMITS[0])) * 100}%`
                      }}
                    />
                    <input
                      type="range"
                      aria-label="Minimum carat"
                      min={CARAT_LIMITS[0]}
                      max={CARAT_LIMITS[1]}
                      step="0.05"
                      value={caratRange[0]}
                      onChange={(e) => {
                        const val = Math.min(Number(e.target.value), caratRange[1]);
                        setCaratRange([val, caratRange[1]]);
                        setVisibleCount(9);
                      }}
                    />
                    <input
                      type="range"
                      aria-label="Maximum carat"
                      min={CARAT_LIMITS[0]}
                      max={CARAT_LIMITS[1]}
                      step="0.05"
                      value={caratRange[1]}
                      onChange={(e) => {
                        const val = Math.max(Number(e.target.value), caratRange[0]);
                        setCaratRange([caratRange[0], val]);
                        setVisibleCount(9);
                      }}
                    />
                  </div>
                  <div className="range__vals">
                    <span>{caratRange[0].toFixed(2)} ct</span>
                    <span>{caratRange[1].toFixed(2)} ct</span>
                  </div>
                </div>

                {/* Cut */}
                <div className="fgroup">
                  <fieldset>
                    <legend>Cut</legend>
                    <div className="chips">
                      {ORDER.cut.map((c) => (
                        <label className="chip" key={c}>
                          <input
                            type="checkbox"
                            checked={selectedCuts.has(c)}
                            onChange={() => toggleSetItem(selectedCuts, setSelectedCuts, c)}
                          />
                          <span>{c}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* Colour */}
                <div className="fgroup">
                  <fieldset>
                    <legend>Colour</legend>
                    <div className="chips">
                      {ORDER.color.map((clr) => (
                        <label className="chip" key={clr}>
                          <input
                            type="checkbox"
                            checked={selectedColors.has(clr)}
                            onChange={() => toggleSetItem(selectedColors, setSelectedColors, clr)}
                          />
                          <span>{clr}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* Clarity */}
                <div className="fgroup">
                  <fieldset>
                    <legend>Clarity</legend>
                    <div className="chips">
                      {ORDER.clarity.map((cla) => (
                        <label className="chip" key={cla}>
                          <input
                            type="checkbox"
                            checked={selectedClarity.has(cla)}
                            onChange={() => toggleSetItem(selectedClarity, setSelectedClarity, cla)}
                          />
                          <span>{cla}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>



                {/* Certification */}
                <div className="fgroup">
                  <fieldset>
                    <legend>Certification</legend>
                    <div className="chips">
                      {ORDER.cert.map((cert) => (
                        <label className="chip" key={cert}>
                          <input
                            type="checkbox"
                            checked={selectedCerts.has(cert)}
                            onChange={() => toggleSetItem(selectedCerts, setSelectedCerts, cert)}
                          />
                          <span>{cert}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </div>

              <div className="filters__apply">
                <button className="btn btn--ghost" type="button" onClick={resetFilters}>
                  Reset
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => {
                    setFilterDrawerOpen(false);
                    document.getElementById('diamonds')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Show {filteredDiamonds.length} {filteredDiamonds.length === 1 ? 'result' : 'results'}
                </button>
              </div>
            </aside>

            <div>
              {/* Active Filter Chips */}
              <div className="active-filters" aria-label="Active filters">
                {origin !== 'All' && (
                  <span className="af">
                    {origin}
                    <button type="button" onClick={() => setOrigin('All')} aria-label={`Remove origin ${origin}`}>
                      <svg aria-hidden="true">
                        <use href="#i-close" />
                      </svg>
                    </button>
                  </span>
                )}
                {Array.from(selectedShapes).map((s) => (
                  <span className="af" key={s}>
                    {s}
                    <button
                      type="button"
                      onClick={() => toggleSetItem(selectedShapes, setSelectedShapes, s)}
                      aria-label={`Remove shape ${s}`}
                    >
                      <svg aria-hidden="true">
                        <use href="#i-close" />
                      </svg>
                    </button>
                  </span>
                ))}
                {Array.from(selectedCuts).map((c) => (
                  <span className="af" key={c}>
                    {c} cut
                    <button
                      type="button"
                      onClick={() => toggleSetItem(selectedCuts, setSelectedCuts, c)}
                      aria-label={`Remove cut ${c}`}
                    >
                      <svg aria-hidden="true">
                        <use href="#i-close" />
                      </svg>
                    </button>
                  </span>
                ))}
                {Array.from(selectedColors).map((clr) => (
                  <span className="af" key={clr}>
                    Colour {clr}
                    <button
                      type="button"
                      onClick={() => toggleSetItem(selectedColors, setSelectedColors, clr)}
                      aria-label={`Remove color ${clr}`}
                    >
                      <svg aria-hidden="true">
                        <use href="#i-close" />
                      </svg>
                    </button>
                  </span>
                ))}
                {Array.from(selectedClarity).map((cla) => (
                  <span className="af" key={cla}>
                    Clarity {cla}
                    <button
                      type="button"
                      onClick={() => toggleSetItem(selectedClarity, setSelectedClarity, cla)}
                      aria-label={`Remove clarity ${cla}`}
                    >
                      <svg aria-hidden="true">
                        <use href="#i-close" />
                      </svg>
                    </button>
                  </span>
                ))}
                {Array.from(selectedCerts).map((cert) => (
                  <span className="af" key={cert}>
                    {cert}
                    <button
                      type="button"
                      onClick={() => toggleSetItem(selectedCerts, setSelectedCerts, cert)}
                      aria-label={`Remove cert ${cert}`}
                    >
                      <svg aria-hidden="true">
                        <use href="#i-close" />
                      </svg>
                    </button>
                  </span>
                ))}
                {(caratRange[0] !== CARAT_LIMITS[0] || caratRange[1] !== CARAT_LIMITS[1]) && (
                  <span className="af">
                    {caratRange[0].toFixed(2)}–{caratRange[1].toFixed(2)} ct
                    <button
                      type="button"
                      onClick={() => setCaratRange([...CARAT_LIMITS])}
                      aria-label="Reset carat range"
                    >
                      <svg aria-hidden="true">
                        <use href="#i-close" />
                      </svg>
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="af">
                    “{searchQuery}”
                    <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">
                      <svg aria-hidden="true">
                        <use href="#i-close" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>

              {/* Diamonds Grid */}
              {filteredDiamonds.length === 0 ? (
                <div className="empty" style={{ gridColumn: '1/-1' }}>
                  <svg aria-hidden="true">
                    <use href="#i-gem-empty" />
                  </svg>
                  <h3>No diamonds match these filters</h3>
                  <p>Try widening your carat range or adjusting your filters, or let our specialists source a stone for you.</p>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="btn btn--ghost btn--sm" type="button" onClick={resetFilters}>
                      Reset filters
                    </button>
                    <a
                      className="btn btn--sm"
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Request a stone
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid-d" aria-live="polite">
                    {filteredDiamonds.slice(0, visibleCount).map((d, i) => (
                      <DiamondCard key={d.id} diamond={d} delayIndex={i} />
                    ))}
                  </div>

                  {filteredDiamonds.length > visibleCount && (
                    <div className="cat-more">
                      <small>
                        Showing {Math.min(visibleCount, filteredDiamonds.length)} of {filteredDiamonds.length}
                      </small>
                      <button
                        className="btn btn--ghost"
                        type="button"
                        onClick={() => setVisibleCount((prev) => prev + 9)}
                      >
                        Show more diamonds
                      </button>
                    </div>
                  )}
                </>
              )}

              <p className="note">
                <svg aria-hidden="true">
                  <use href="#i-info" />
                </svg>
                <span>
                  Illustrative inventory for design preview. Stones, grading laboratories and report
                  details shown are placeholders and will be replaced with SVK's verified stock.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SHAPES ============ */}
      <section className="section shapes" id="shapes" aria-labelledby="shapes-title">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow eyebrow--center is-visible">Diamond Shapes</span>
            <h2 className="h-section is-visible" id="shapes-title">
              Ten silhouettes, <em>one</em> brilliance
            </h2>
            <p className="lead is-visible" style={{ marginInline: 'auto' }}>
              Each shape carries its own personality. Select one to see matching diamonds.
            </p>
          </div>
          <div className="shapes__grid is-visible">
            {SHAPE_NAMES.map((s) => {
              const count = DIAMONDS.filter((d) => d.shape === s).length;
              return (
                <button
                  className="shape"
                  type="button"
                  key={s}
                  onClick={() => handleShapeSelect(s)}
                  aria-label={`Show ${s} diamonds`}
                >
                  <div className="shape__img">
                    <img
                      src={`/assets/img/s-${getShapeSlug(s)}-sm.webp`}
                      alt={`${s} cut diamond`}
                      width="560"
                      height="560"
                      loading="lazy"
                    />
                  </div>
                  <div className="shape__row">
                    <h3>{s}</h3>
                    <span className="shape__count">
                      {count} {count === 1 ? 'stone' : 'stones'}
                    </span>
                  </div>
                  <p>{SHAPES[s].blurb}</p>
                  <span className="shape__arrow" aria-hidden="true">
                    <svg>
                      <use href="#i-arrow-ne" />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ JEWELLERY ============ */}
      <section className="section jewellery" id="jewellery" aria-labelledby="jewellery-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow is-visible">Fine Jewellery</span>
              <h2 className="h-section is-visible" id="jewellery-title" style={{ marginTop: '1.25rem' }}>
                Diamonds, <em>worn</em> beautifully
              </h2>
            </div>
            <p className="lead is-visible">
              Settings designed to let the stone speak — refined proportions, precise craftsmanship and a finish made
              for everyday wear.
            </p>
          </div>
          <div className="jewel__grid">
            <a
              className="jw jw--a is-visible"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handlePrefillRequirement('Engagement Ring');
              }}
            >
              <img
                src="/assets/img/j-engagement.webp"
                alt="Solitaire diamond engagement ring with floral petal setting and diamond eternity band on black silk"
                width="1024"
                height="1024"
                loading="lazy"
                style={{ objectPosition: 'center 45%' }}
              />
              <div className="jw__cap">
                <div>
                  <small>Bridal</small>
                  <h3>Engagement Rings</h3>
                </div>
                <span className="jw__go" aria-hidden="true">
                  <svg>
                    <use href="#i-arrow-ne" />
                  </svg>
                </span>
              </div>
            </a>
            <a
              className="jw jw--b is-visible"
              data-delay="1"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handlePrefillRequirement('Diamond Ring');
              }}
            >
              <img
                src="/assets/img/j-rings.webp"
                alt="Yellow gold channel-set princess diamond ring band on natural stone surface"
                width="1024"
                height="1024"
                loading="lazy"
                style={{ objectPosition: 'center 50%' }}
              />
              <div className="jw__cap">
                <div>
                  <small>Signature</small>
                  <h3>Diamond Rings</h3>
                </div>
                <span className="jw__go" aria-hidden="true">
                  <svg>
                    <use href="#i-arrow-ne" />
                  </svg>
                </span>
              </div>
            </a>
            <a
              className="jw jw--c is-visible"
              data-delay="2"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handlePrefillRequirement('Diamond Bangles');
              }}
            >
              <img
                src="/assets/img/j-bangles.webp"
                alt="Pair of handcrafted yellow gold diamond bangles set against black silk"
                width="1024"
                height="1024"
                loading="lazy"
                style={{ objectPosition: 'center 50%' }}
              />
              <div className="jw__cap">
                <div>
                  <small>Radiance</small>
                  <h3>Diamond Bangles</h3>
                </div>
                <span className="jw__go" aria-hidden="true">
                  <svg>
                    <use href="#i-arrow-ne" />
                  </svg>
                </span>
              </div>
            </a>
            <a
              className="jw jw--d is-visible"
              data-delay="1"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handlePrefillRequirement('Diamond Necklace');
              }}
            >
              <img
                src="/assets/img/j-necklace.webp"
                alt="Bezel-set diamond tennis necklace draped on a black velvet bust display"
                width="1024"
                height="1024"
                loading="lazy"
                style={{ objectPosition: 'center 40%' }}
              />
              <div className="jw__cap">
                <div>
                  <small>Grace</small>
                  <h3>Diamond Necklaces</h3>
                </div>
                <span className="jw__go" aria-hidden="true">
                  <svg>
                    <use href="#i-arrow-ne" />
                  </svg>
                </span>
              </div>
            </a>
            <a
              className="jw jw--e is-visible"
              data-delay="2"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handlePrefillRequirement('Diamond Bracelet');
              }}
            >
              <img
                src="/assets/img/j-bracelet.webp"
                alt="Artisanal studded gold and diamond bracelet bangle on warm stone surface"
                width="1024"
                height="1024"
                loading="lazy"
                style={{ objectPosition: 'center 50%' }}
              />
              <div className="jw__cap">
                <div>
                  <small>Brilliance</small>
                  <h3>Diamond Bracelets</h3>
                </div>
                <span className="jw__go" aria-hidden="true">
                  <svg>
                    <use href="#i-arrow-ne" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ============ COLLECTIONS ============ */}
      <section className="section collections" id="collections" aria-labelledby="collections-title">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow eyebrow--center is-visible">Collections</span>
            <h2 className="h-section is-visible" id="collections-title">
              Curated <em>for every chapter</em>
            </h2>
          </div>
          <div className="coll__grid">
            <a
              className="coll is-visible"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handlePrefillRequirement('Engagement Ring');
              }}
            >
              <div className="coll__img img-reveal is-visible">
                <img
                  src="/assets/img/c-bridal.webp"
                  alt="Solitaire cathedral diamond engagement ring resting in bronze silk folds"
                  width="1024"
                  height="1024"
                  loading="lazy"
                />
              </div>
              <span className="coll__num">No. 01</span>
              <h3>Éternelle Bridal</h3>
              <p>Solitaires and cathedral bands for the promise of a lifetime, designed around the diamond you choose.</p>
              <span className="link-arrow">
                Explore the collection{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>

            <a
              className="coll is-visible"
              data-delay="1"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handlePrefillRequirement('Diamond Jewellery');
              }}
            >
              <div className="coll__img img-reveal is-visible">
                <img
                  src="/assets/img/c-everyday.webp"
                  alt="Delicate rose gold floral diamond necklace with matching drop earrings on bust"
                  width="1024"
                  height="1024"
                  loading="lazy"
                />
              </div>
              <span className="coll__num">No. 02</span>
              <h3>Lumière Flora</h3>
              <p>Delicate rose gold floral diamond necklace and earrings suite, engineered for everyday radiance.</p>
              <span className="link-arrow">
                Explore the collection{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>

            <a
              className="coll is-visible"
              data-delay="2"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handlePrefillRequirement('High Jewellery');
              }}
            >
              <div className="coll__img img-reveal is-visible">
                <img
                  src="/assets/img/c-haute.webp"
                  alt="High jewellery diamond and rubellite collar necklace with sapphire dangle earrings on black velvet"
                  width="1024"
                  height="1024"
                  loading="lazy"
                />
              </div>
              <span className="coll__num">No. 03</span>
              <h3>Haute Joaillerie</h3>
              <p>One-of-a-kind statement suites featuring rubellite pink tourmaline, blue sapphires and fine diamonds.</p>
              <span className="link-arrow">
                Explore the collection{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>

            <a
              className="coll is-visible"
              data-delay="1"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handlePrefillRequirement('Diamond Ring');
              }}
            >
              <div className="coll__img img-reveal is-visible">
                <img
                  src="/assets/img/c-signature.webp"
                  alt="Radiant double halo diamond ring and gold honeycomb filigree band on black velvet"
                  width="1024"
                  height="1024"
                  loading="lazy"
                />
              </div>
              <span className="coll__num">No. 04</span>
              <h3>Signature Halos & Bands</h3>
              <p>Architectural double halo radiant ring and honeycomb filigree cocktail band designed to catch every light.</p>
              <span className="link-arrow">
                Explore the collection{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>

            <a
              className="coll is-visible"
              data-delay="2"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handlePrefillRequirement('Bespoke Jewellery');
              }}
            >
              <div className="coll__img img-reveal is-visible">
                <img
                  src="/assets/img/c-heritage.webp"
                  alt="Art déco geometric pastel tourmaline and emerald-cut gemstone necklace with matching earrings"
                  width="1024"
                  height="1024"
                  loading="lazy"
                />
              </div>
              <span className="coll__num">No. 05</span>
              <h3>Heritage Art Déco</h3>
              <p>Geometric symmetry and pastel baguette-cut gemstones reimagined for the modern diamond connoisseur.</p>
              <span className="link-arrow">
                Explore the collection{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ============ WHY SVK ============ */}
      <section className="section why" id="why" aria-labelledby="why-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow is-visible">Why SVK</span>
              <h2 className="h-section is-visible" id="why-title" style={{ marginTop: '1.25rem' }}>
                A house built on <em>trust</em>
              </h2>
            </div>
            <p className="lead is-visible">
              What sets us apart is not only the diamonds we offer, but the way we help you choose them.
            </p>
          </div>
          <div className="why__grid">
            <article className="feature is-visible">
              <span className="feature__num">01</span>
              <div className="feature__icon">
                <svg aria-hidden="true">
                  <use href="#i-f-quality" />
                </svg>
              </div>
              <h3>Exceptional Quality</h3>
              <p>Diamonds chosen for their light performance and proportion — not only their paperwork.</p>
            </article>
            <article className="feature is-visible" data-delay="1">
              <span className="feature__num">02</span>
              <div className="feature__icon">
                <svg aria-hidden="true">
                  <use href="#i-f-cert" />
                </svg>
              </div>
              <h3>Certified Diamonds</h3>
              <p>Where a stone carries an independent grading report, you will see it in full before you decide.</p>
            </article>
            <article className="feature is-visible" data-delay="2">
              <span className="feature__num">03</span>
              <div className="feature__icon">
                <svg aria-hidden="true">
                  <use href="#i-f-source" />
                </svg>
              </div>
              <h3>Trusted Sourcing</h3>
              <p>Long-standing partners and open conversations about where each diamond comes from.</p>
            </article>
            <article className="feature is-visible">
              <span className="feature__num">04</span>
              <div className="feature__icon">
                <svg aria-hidden="true">
                  <use href="#i-f-craft" />
                </svg>
              </div>
              <h3>Expert Craftsmanship</h3>
              <p>Settings refined by skilled hands, so every piece is as secure as it is beautiful.</p>
            </article>
            <article className="feature is-visible" data-delay="1">
              <span className="feature__num">05</span>
              <div className="feature__icon">
                <svg aria-hidden="true">
                  <use href="#i-f-price" />
                </svg>
              </div>
              <h3>Honest &amp; Clear Guidance</h3>
              <p>Complete clarity and bespoke consultation for your stone and setting — with zero hidden surprises.</p>
            </article>
            <article className="feature is-visible" data-delay="2">
              <span className="feature__num">06</span>
              <div className="feature__icon">
                <svg aria-hidden="true">
                  <use href="#i-f-service" />
                </svg>
              </div>
              <h3>Personalized Service</h3>
              <p>Private consultations, in person or online, guided by a dedicated specialist.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ============ EDUCATION PREVIEW ============ */}
      <section className="section edu" id="education" aria-labelledby="edu-title">
        <div className="container">
          <div className="cs">
            <div className="cs__media img-reveal is-visible">
              <img
                src="/assets/img/education.webp"
                alt="Loose diamonds of different shapes on grading paper beside a loupe and tweezers"
                width="1024"
                height="1536"
                loading="lazy"
              />
            </div>
            <div>
              <span className="eyebrow is-visible">Diamond Education</span>
              <h2 className="h-section is-visible" id="edu-title" style={{ marginBlock: '1.25rem 1.25rem' }}>
                Understanding <em>the 4Cs</em>
              </h2>
              <p className="lead is-visible" style={{ marginBottom: '2.5rem' }}>
                Cut, colour, clarity and carat together shape a diamond's beauty and value. Knowing how they interact
                helps you choose with confidence.
              </p>
              <div className="is-visible">
                <div className="tabs" role="tablist" aria-label="The 4Cs of diamonds">
                  <button
                    className="tab"
                    role="tab"
                    id="tab-cut"
                    aria-controls="panel-cut"
                    aria-selected={activeTab === 'cut'}
                    onClick={() => setActiveTab('cut')}
                  >
                    Cut
                  </button>
                  <button
                    className="tab"
                    role="tab"
                    id="tab-colour"
                    aria-controls="panel-colour"
                    aria-selected={activeTab === 'colour'}
                    onClick={() => setActiveTab('colour')}
                  >
                    Colour
                  </button>
                  <button
                    className="tab"
                    role="tab"
                    id="tab-clarity"
                    aria-controls="panel-clarity"
                    aria-selected={activeTab === 'clarity'}
                    onClick={() => setActiveTab('clarity')}
                  >
                    Clarity
                  </button>
                  <button
                    className="tab"
                    role="tab"
                    id="tab-carat"
                    aria-controls="panel-carat"
                    aria-selected={activeTab === 'carat'}
                    onClick={() => setActiveTab('carat')}
                  >
                    Carat
                  </button>
                </div>

                {activeTab === 'cut' && (
                  <div className="tabpanel" role="tabpanel" id="panel-cut" aria-labelledby="tab-cut">
                    <h3>Cut — the source of sparkle</h3>
                    <p>
                      Cut describes how well a diamond's facets interact with light. Precise angles and proportions
                      return light to the eye as brilliance, fire and scintillation. It is the one C shaped entirely by
                      human skill — and often the most important to beauty.
                    </p>
                    <div className="scale">
                      <div className="scale__label">
                        <span>Cut grade</span>
                        <span>Higher performance →</span>
                      </div>
                      <div className="scale__bar">
                        <span>Fair</span>
                        <span>Good</span>
                        <span className="mid">Very Good</span>
                        <span className="hi">Excellent</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'colour' && (
                  <div className="tabpanel" role="tabpanel" id="panel-colour" aria-labelledby="tab-colour">
                    <h3>Colour — the absence of tint</h3>
                    <p>
                      White diamonds are graded from D (colourless) through to Z (light yellow or brown). The differences
                      between neighbouring grades are subtle and often invisible to the untrained eye, yet they have a
                      significant effect on value.
                    </p>
                    <div className="scale">
                      <div className="scale__label">
                        <span>Colour grade</span>
                        <span>More colourless →</span>
                      </div>
                      <div className="scale__bar">
                        <span>K–Z</span>
                        <span>J</span>
                        <span>I</span>
                        <span className="mid">H</span>
                        <span className="mid">G</span>
                        <span className="hi">F</span>
                        <span className="hi">E</span>
                        <span className="hi">D</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'clarity' && (
                  <div className="tabpanel" role="tabpanel" id="panel-clarity" aria-labelledby="tab-clarity">
                    <h3>Clarity — nature's fingerprint</h3>
                    <p>
                      Clarity measures the presence of tiny internal inclusions and surface blemishes. Most are
                      microscopic. A well-chosen VS or even SI diamond can appear perfectly clean to the naked eye,
                      offering exceptional value.
                    </p>
                    <div className="scale">
                      <div className="scale__label">
                        <span>Clarity grade</span>
                        <span>Fewer inclusions →</span>
                      </div>
                      <div className="scale__bar">
                        <span>SI2</span>
                        <span>SI1</span>
                        <span className="mid">VS2</span>
                        <span className="mid">VS1</span>
                        <span className="hi">VVS2</span>
                        <span className="hi">VVS1</span>
                        <span className="hi">IF</span>
                        <span className="hi">FL</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'carat' && (
                  <div className="tabpanel" role="tabpanel" id="panel-carat" aria-labelledby="tab-carat">
                    <h3>Carat — weight, not size</h3>
                    <p>
                      A carat is a unit of weight equal to 0.2 grams. Two diamonds of the same carat can look different in
                      size depending on their cut and shape. Rarity rises sharply at popular weights such as 1.00 ct —
                      choosing just below can offer exceptional value.
                    </p>
                    <div className="scale">
                      <div className="scale__label">
                        <span>Carat weight</span>
                        <span>Heavier →</span>
                      </div>
                      <div className="scale__bar">
                        <span>0.50</span>
                        <span>0.75</span>
                        <span className="mid">1.00</span>
                        <span className="mid">1.50</span>
                        <span className="hi">2.00</span>
                        <span className="hi">3.00+</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="cs__foot is-visible">
                <Link className="btn" to="/education">
                  Learn About Diamonds{' '}
                  <svg aria-hidden="true">
                    <use href="#i-arrow" />
                  </svg>
                </Link>
                <a
                  className="link-arrow"
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Speak with a specialist{' '}
                  <svg aria-hidden="true">
                    <use href="#i-arrow" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="topics">
            <Link className="topic is-visible" to="/education#natural-vs-lab">
              <span className="topic__n">01</span>
              <h3>Natural vs Lab-Grown</h3>
              <p>How they differ in origin, value and long-term appeal.</p>
              <span className="link-arrow">
                Read{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </Link>
            <Link className="topic is-visible" data-delay="1" to="/education#certification">
              <span className="topic__n">02</span>
              <h3>Diamond Certification</h3>
              <p>What a grading report tells you — and how to verify it.</p>
              <span className="link-arrow">
                Read{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </Link>
            <Link className="topic is-visible" data-delay="2" to="/education#choosing">
              <span className="topic__n">03</span>
              <h3>How to Choose</h3>
              <p>A calm, step-by-step approach to finding the right stone.</p>
              <span className="link-arrow">
                Read{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </Link>
            <Link className="topic is-visible" data-delay="3" to="/education#shapes">
              <span className="topic__n">04</span>
              <h3>Diamond Shapes</h3>
              <p>The character, proportions and setting ideas for each shape.</p>
              <span className="link-arrow">
                Read{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </Link>
            <Link className="topic is-visible" data-delay="4" to="/education#care">
              <span className="topic__n">05</span>
              <h3>Diamond Care</h3>
              <p>Simple habits to keep your jewellery brilliant for decades.</p>
              <span className="link-arrow">
                Read{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ TRUST ============ */}
      <section className="section trust" id="trust" aria-labelledby="trust-title">
        <div className="container trust__grid">
          <div>
            <span className="eyebrow is-visible">Certification &amp; Trust</span>
            <h2 className="h-section is-visible" id="trust-title" style={{ marginBlock: '1.25rem 1.25rem' }}>
              Confidence in <em>Every Carat.</em>
            </h2>
            <p className="lead is-visible">
              Buying a diamond should feel certain. That is why we put documentation, detail and honesty at the centre of
              every purchase.
            </p>
            <ul className="trust__list">
              <li className="is-visible">
                <svg aria-hidden="true">
                  <use href="#i-check" />
                </svg>
                <div>
                  <strong>Independent grading reports</strong>
                  <span>
                    When a diamond is accompanied by a report from a recognised gemological laboratory, we share the
                    original with you and show you how to verify it.
                  </span>
                </div>
              </li>
              <li className="is-visible">
                <svg aria-hidden="true">
                  <use href="#i-check" />
                </svg>
                <div>
                  <strong>Clear disclosure of origin</strong>
                  <span>Every stone is clearly identified as natural or laboratory-grown — always.</span>
                </div>
              </li>
              <li className="is-visible">
                <svg aria-hidden="true">
                  <use href="#i-check" />
                </svg>
                <div>
                  <strong>Full specification in writing</strong>
                  <span>
                    Measurements, fluorescence, polish and symmetry are listed on every diamond we present.
                  </span>
                </div>
              </li>
              <li className="is-visible">
                <svg aria-hidden="true">
                  <use href="#i-check" />
                </svg>
                <div>
                  <strong>View before you decide</strong>
                  <span>Inspect your diamond in person or over a private video consultation.</span>
                </div>
              </li>
            </ul>
            <p className="placeholder-note is-visible">
              <strong>For SVK</strong>Add your verified certifications, trade memberships, hallmarking details and any
              guarantees here. Only list credentials SVK actually holds.
            </p>
          </div>
          <div className="trust__media img-reveal is-visible">
            <img
              src="/assets/img/trust.webp"
              alt="A round brilliant diamond resting on an embossed ivory certificate folder"
              width="1024"
              height="1536"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ============ BESPOKE ============ */}
      <section className="bespoke" id="bespoke" aria-labelledby="bespoke-title">
        <div className="bespoke__media">
          <img
            src="/assets/img/bespoke.webp"
            alt="A jewellery designer sketching a bespoke diamond ring surrounded by loose diamonds and gold wire"
            width="1672"
            height="941"
            loading="lazy"
          />
        </div>
        <div className="container bespoke__content">
          <div className="bespoke__box">
            <span className="eyebrow is-visible">Bespoke Jewellery</span>
            <h2 className="is-visible" id="bespoke-title">
              Create Something <em>Uniquely Yours.</em>
            </h2>
            <p className="is-visible">
              Work with our experts to create a bespoke diamond jewellery piece designed around your story.
            </p>
            <ol className="steps is-visible">
              <li>
                <b>i.</b>Consult
              </li>
              <li>
                <b>ii.</b>Select
              </li>
              <li>
                <b>iii.</b>Design
              </li>
              <li>
                <b>iv.</b>Craft
              </li>
            </ol>
            <a
              className="btn btn--light is-visible"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handlePrefillRequirement(
                  'Bespoke Jewellery',
                  'Tell us about the bespoke piece you imagine — the occasion, style and timeline.'
                );
              }}
            >
              Request a Consultation{' '}
              <svg aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section testimonials" id="testimonials" aria-labelledby="testi-title">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow eyebrow--center is-visible">Client Stories</span>
            <h2 className="h-section is-visible" id="testi-title">
              In their <em>words</em>
            </h2>
          </div>
          <div className="testi__grid">
            <figure className="tcard is-visible">
              <span className="ph-tag">Placeholder</span>
              <svg className="tcard__quote" aria-hidden="true">
                <use href="#i-quote" />
              </svg>
              <blockquote>
                [Replace with a genuine customer review.] A short, specific quote about the experience of choosing a
                diamond with SVK.
              </blockquote>
              <figcaption>
                <footer>
                  <div>
                    <strong>Customer Name</strong>
                    <br />
                    <span>City · Engagement Ring</span>
                  </div>
                  <div className="stars" aria-label="Rating placeholder">
                    <svg>
                      <use href="#i-star" />
                    </svg>
                    <svg>
                      <use href="#i-star" />
                    </svg>
                    <svg>
                      <use href="#i-star" />
                    </svg>
                    <svg>
                      <use href="#i-star" />
                    </svg>
                    <svg>
                      <use href="#i-star" />
                    </svg>
                  </div>
                </footer>
              </figcaption>
            </figure>
            <figure className="tcard is-visible" data-delay="1">
              <span className="ph-tag">Placeholder</span>
              <svg className="tcard__quote" aria-hidden="true">
                <use href="#i-quote" />
              </svg>
              <blockquote>
                [Replace with a genuine customer review.] A quote highlighting transparency, guidance or the consultation
                process.
              </blockquote>
              <figcaption>
                <footer>
                  <div>
                    <strong>Customer Name</strong>
                    <br />
                    <span>City · Loose Diamond</span>
                  </div>
                  <div className="stars" aria-label="Rating placeholder">
                    <svg>
                      <use href="#i-star" />
                    </svg>
                    <svg>
                      <use href="#i-star" />
                    </svg>
                    <svg>
                      <use href="#i-star" />
                    </svg>
                    <svg>
                      <use href="#i-star" />
                    </svg>
                    <svg>
                      <use href="#i-star" />
                    </svg>
                  </div>
                </footer>
              </figcaption>
            </figure>
            <figure className="tcard is-visible" data-delay="2">
              <span className="ph-tag">Placeholder</span>
              <svg className="tcard__quote" aria-hidden="true">
                <use href="#i-quote" />
              </svg>
              <blockquote>
                [Replace with a genuine customer review.] A quote about a bespoke piece and the craftsmanship behind it.
              </blockquote>
              <figcaption>
                <footer>
                  <div>
                    <strong>Customer Name</strong>
                    <br />
                    <span>City · Bespoke Necklace</span>
                  </div>
                  <div className="stars" aria-label="Rating placeholder">
                    <svg>
                      <use href="#i-star" />
                    </svg>
                    <svg>
                      <use href="#i-star" />
                    </svg>
                    <svg>
                      <use href="#i-star" />
                    </svg>
                    <svg>
                      <use href="#i-star" />
                    </svg>
                    <svg>
                      <use href="#i-star" />
                    </svg>
                  </div>
                </footer>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="container contact__grid">
          <div>
            <span className="eyebrow is-visible">Contact</span>
            <h2 className="h-section is-visible" id="contact-title" style={{ marginBlock: '1.25rem 1.25rem' }}>
              Begin a <em>private</em> conversation
            </h2>
            <p className="lead is-visible">
              Share what you are looking for and a SVK specialist will be in touch personally.
            </p>
            <ul className="cinfo is-visible">
              <li>
                <svg aria-hidden="true">
                  <use href="#i-mail" />
                </svg>
                <div>
                  <small>Email</small>
                  <a href="mailto:svkdiamonds@gmail.com">svkdiamonds@gmail.com</a>
                </div>
              </li>
              <li>
                <svg aria-hidden="true">
                  <use href="#i-whatsapp" />
                </svg>
                <div>
                  <small>WhatsApp</small>
                  <a
                    href="https://wa.me/917718880577?text=Hello%20SVK%2C%20I%20would%20like%20to%20enquire%20about%20your%20diamonds."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +91 77188 80577
                  </a>
                </div>
              </li>

            </ul>
          </div>
          <div className="is-visible">
            <EnquiryForm
              prefix="c"
              initialRequirement={contactRequirement}
              initialMessage={contactMessage}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
