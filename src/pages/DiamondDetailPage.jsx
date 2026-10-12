import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DIAMONDS, SHAPES } from '../data/diamonds';
import DiamondCard from '../components/DiamondCard';
import EnquiryForm from '../components/EnquiryForm';

export default function DiamondDetailPage() {
  const { id } = useParams();

  const diamond = useMemo(() => {
    if (!id) return DIAMONDS[0];
    return DIAMONDS.find((x) => x.id.toLowerCase() === id.toLowerCase());
  }, [id]);

  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [lensStyle, setLensStyle] = useState({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('enquiry');

  const zoomBoxRef = useRef(null);

  // Gallery views
  const views = useMemo(() => {
    if (!diamond) return [];
    return [
      { src: diamond.image, thumb: diamond.thumb, alt: `${diamond.title}, face-up view` },
      {
        src: '/assets/img/j-engagement.webp',
        thumb: '/assets/img/j-engagement.webp',
        alt: 'Setting inspiration: solitaire diamond ring with eternity band'
      },
      {
        src: '/assets/img/trust.webp',
        thumb: '/assets/img/trust.webp',
        alt: 'Presentation with grading documentation'
      }
    ];
  }, [diamond]);

  // Related diamonds
  const relatedDiamonds = useMemo(() => {
    if (!diamond) return [];
    return DIAMONDS.filter((x) => x.id !== diamond.id)
      .map((x) => ({
        x,
        score:
          (x.shape === diamond.shape ? 0 : 3) +
          Math.abs(x.carat - diamond.carat) * 2 +
          (x.origin === diamond.origin ? 0 : 1)
      }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 4)
      .map((o) => o.x);
  }, [diamond]);

  // Reset view index when diamond changes
  useEffect(() => {
    setCurrentViewIndex(0);
    setLightboxOpen(false);
    setLightboxZoomed(false);
    setModalOpen(false);
  }, [diamond]);

  // Handle ESC key for modal and lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) setLightboxOpen(false);
        if (modalOpen) setModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, modalOpen]);

  // Lock body scroll when lightbox or modal is open
  useEffect(() => {
    if (lightboxOpen || modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, modalOpen]);

  // Lens hover movement
  const handlePointerMove = (e) => {
    if (!zoomBoxRef.current) return;
    const r = zoomBoxRef.current.getBoundingClientRect();
    const x = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
    const y = Math.min(Math.max((e.clientY - r.top) / r.height, 0), 1);
    const Z = 2.4;

    setLensStyle({
      backgroundImage: `url("${views[currentViewIndex]?.src}")`,
      backgroundSize: `${r.width * Z}px ${r.height * Z}px`,
      backgroundPosition: `${x * 100}% ${y * 100}%`
    });
  };

  if (!diamond) {
    return (
      <main id="main">
        <div className="container pd">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/#diamonds">Diamonds</Link>
              </li>
              <li aria-current="page">Not found</li>
            </ol>
          </nav>
          <div className="empty" style={{ marginBlock: 'var(--space-12)' }}>
            <svg aria-hidden="true">
              <use href="#i-gem-empty" />
            </svg>
            <h1 className="h-section" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
              This diamond is no longer available
            </h1>
            <p>
              It may have been reserved or the link may be incorrect. Explore our current collection, or ask a
              specialist to source a similar stone.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link className="btn" to="/#diamonds">
                View all diamonds
              </Link>
              <Link className="btn btn--ghost" to="/#contact">
                Contact a specialist
              </Link>
            </div>
          </div>
          <section className="related" style={{ marginTop: 'var(--section)' }}>
            <div className="section-head section-head--split">
              <div>
                <span className="eyebrow">Explore available stones</span>
                <h2 className="h-section" style={{ marginTop: '1.25rem' }}>
                  Featured <em>diamonds</em>
                </h2>
              </div>
            </div>
            <div className="grid-d">
              {DIAMONDS.slice(0, 4).map((d, i) => (
                <DiamondCard key={d.id} diamond={d} delayIndex={i} />
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  }

  const d = diamond;
  const currentView = views[currentViewIndex] || views[0];

  const specRows = [
    ['Shape', d.shape],
    ['Carat weight', `${d.carat.toFixed(2)} ct`],
    ['Cut', d.cut],
    ['Colour', d.color],
    ['Clarity', d.clarity],
    [
      'Certification',
      <>
        {d.cert} <span style={{ color: 'var(--faint)', fontWeight: 400 }}>· sample</span>
      </>
    ],
    [
      'Report number',
      <span style={{ color: 'var(--faint)', fontWeight: 400 }}>[To be added]</span>
    ],
    ['Measurements', d.measurements],
    ['Fluorescence', d.fluorescence],
    ['Polish', d.polish],
    ['Symmetry', d.symmetry],
    ['Depth', `${d.depth.toFixed(1)}%`],
    ['Table', `${d.table}%`],
    ['Length-to-width ratio', d.ratio],
    ['Origin', d.origin]
  ];

  return (
    <main id="main">
      <div className="container pd">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/#diamonds">Diamonds</Link>
            </li>
            <li aria-current="page">{d.title}</li>
          </ol>
        </nav>

        {/* Product Grid */}
        <div className="pd__grid">
          {/* Gallery */}
          <div className="gallery">
            <div className="thumbs">
              {views.map((v, i) => (
                <button
                  key={i}
                  className="thumb"
                  type="button"
                  aria-pressed={i === currentViewIndex}
                  aria-label={`View image ${i + 1}: ${v.alt}`}
                  onClick={() => setCurrentViewIndex(i)}
                >
                  <img src={v.thumb} alt="" loading="lazy" />
                </button>
              ))}
            </div>

            <div
              className={`zoom ${isZooming ? 'is-zooming' : ''}`}
              ref={zoomBoxRef}
              tabIndex={0}
              aria-label="Diamond image. Hover or move to magnify; press Enter to view full screen."
              onPointerEnter={(e) => {
                setIsZooming(true);
                handlePointerMove(e);
              }}
              onPointerMove={handlePointerMove}
              onPointerLeave={() => setIsZooming(false)}
              onClick={() => setLightboxOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxOpen(true);
                }
              }}
            >
              <img src={currentView.src} alt={currentView.alt} width="1254" height="1254" />
              <div className="zoom__lens" style={lensStyle} aria-hidden="true" />
              <span className="zoom__hint" aria-hidden="true">
                <svg>
                  <use href="#i-zoom" />
                </svg>{' '}
                Hover to zoom
              </span>
              <button
                className="zoom__full"
                type="button"
                aria-label="View image full screen"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(true);
                }}
              >
                <svg aria-hidden="true">
                  <use href="#i-expand" />
                </svg>
              </button>
            </div>
          </div>

          {/* Info & Specs */}
          <div className="pd__info">
            <span className="eyebrow">{d.origin} Diamond</span>
            <h1>{d.title}</h1>
            <p className="pd__sku">
              Stock No. {d.id} · {d.cert} report (sample)
            </p>

            <dl className="pd__key">
              <div>
                <dt>Carat</dt>
                <dd>{d.carat.toFixed(2)}</dd>
              </div>
              <div>
                <dt>Colour</dt>
                <dd>{d.color}</dd>
              </div>
              <div>
                <dt>Clarity</dt>
                <dd>{d.clarity}</dd>
              </div>
              <div>
                <dt>Cut</dt>
                <dd>{d.cut === 'Very Good' ? 'V. Good' : d.cut}</dd>
              </div>
            </dl>

            <div className="pd__actions">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setModalType('enquiry');
                  setModalOpen(true);
                }}
              >
                Enquire Now{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </button>
              <button
                className="btn btn--ghost"
                type="button"
                onClick={() => {
                  setModalType('consultation');
                  setModalOpen(true);
                }}
              >
                Request Consultation
              </button>
            </div>

            <ul className="pd__assure">
              <li>
                <svg aria-hidden="true">
                  <use href="#i-check" />
                </svg>
                <span>Private viewing in person or by video consultation</span>
              </li>
              <li>
                <svg aria-hidden="true">
                  <use href="#i-check" />
                </svg>
                <span>Grading report shared in full where one accompanies the stone</span>
              </li>
              <li>
                <svg aria-hidden="true">
                  <use href="#i-check" />
                </svg>
                <span>Can be set into a ring, pendant or bespoke design</span>
              </li>
            </ul>

            <h2 className="pd__h">Specifications</h2>
            <table className="spec-table">
              <caption className="sr-only">Diamond specifications</caption>
              <tbody>
                {specRows.map(([label, val], idx) => (
                  <tr key={idx}>
                    <th scope="row">{label}</th>
                    <td>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="pd__h">About this diamond</h2>
            <p className="pd__desc">
              {SHAPES[d.shape]?.blurb} This {d.carat.toFixed(2)} carat {d.shape.toLowerCase()}{' '}
              {d.origin === 'Natural' ? 'natural' : 'laboratory-grown'} diamond pairs {d.color} colour with {d.clarity}{' '}
              clarity and a {d.cut.toLowerCase()} cut for lively brilliance. It can be presented as a loose stone or
              set into a ring, pendant or bespoke design by our atelier.
            </p>
            <p className="note">
              <svg aria-hidden="true">
                <use href="#i-info" />
              </svg>
              <span>
                Illustrative listing for design preview. Final specifications, pricing and grading report details will
                reflect SVK's verified inventory.
              </span>
            </p>
          </div>
        </div>

        {/* Similar Diamonds Section */}
        <section className="related" aria-labelledby="related-title" style={{ marginTop: 'var(--section)' }}>
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow">You may also consider</span>
              <h2 className="h-section" id="related-title" style={{ marginTop: '1.25rem' }}>
                Similar <em>diamonds</em>
              </h2>
            </div>
            <p style={{ alignSelf: 'end' }}>
              <Link className="link-arrow" to="/#diamonds">
                View all diamonds{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </Link>
            </p>
          </div>
          <div className="grid-d">
            {relatedDiamonds.map((rel, i) => (
              <DiamondCard key={rel.id} diamond={rel} delayIndex={i} />
            ))}
          </div>
        </section>
      </div>

      {/* Enquiry / Consultation Modal Dialog */}
      {modalOpen && (
        <div
          className="modal is-open"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(10, 10, 10, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            style={{
              background: 'var(--paper, #171513)',
              border: '1px solid var(--line, #332d29)',
              borderRadius: 'var(--radius-md, 8px)',
              maxWidth: 580,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px 28px',
              position: 'relative'
            }}
          >
            <div className="modal__head" style={{ marginBottom: 20 }}>
              <div>
                <h2 id="modal-title" style={{ fontSize: '1.5rem', marginBottom: 4 }}>
                  {modalType === 'consultation' ? 'Request a Consultation' : 'Enquire Now'}
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  {d.title} · {d.color} · {d.clarity} · {d.id}
                </p>
              </div>
              <button
                className="modal__close"
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <svg aria-hidden="true">
                  <use href="#i-close" />
                </svg>
              </button>
            </div>

            <EnquiryForm
              prefix="modal"
              initialRequirement="Loose Diamond"
              initialMessage={
                modalType === 'consultation'
                  ? `I would like to arrange a consultation to view ${d.title} (${d.id}).`
                  : `I am interested in ${d.title} (${d.id}). Please share availability and further details.`
              }
              onSuccess={() => {}}
            />
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="lightbox is-open"
          role="dialog"
          aria-modal="true"
          aria-label="Diamond image, full screen"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
            <img
              className={lightboxZoomed ? 'is-zoomed' : ''}
              src={currentView.src}
              alt={currentView.alt}
              onClick={() => setLightboxZoomed(!lightboxZoomed)}
              style={{ cursor: lightboxZoomed ? 'zoom-out' : 'zoom-in' }}
            />
          </div>
          <button
            className="lightbox__close"
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close full screen view"
          >
            <svg aria-hidden="true">
              <use href="#i-close" />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
}
