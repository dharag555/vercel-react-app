import React from 'react';
import { Link } from 'react-router-dom';

export default function DiamondCard({ diamond, delayIndex = 0 }) {
  const d = diamond;
  const delay = (delayIndex % 4) + 1;

  return (
    <article className="dcard is-visible" data-delay={delay}>
      <Link
        className="dcard__link"
        to={`/diamond/${d.id}`}
        aria-label={`View details: ${d.title}`}
      />
      <div className="dcard__media">
        <img
          src={d.thumb}
          alt={`${d.carat.toFixed(2)} carat ${d.shape.toLowerCase()} ${d.origin.toLowerCase()} diamond`}
          width="560"
          height="560"
          loading="lazy"
        />
        <span className="dcard__tag">{d.origin}</span>
      </div>
      <div className="dcard__body">
        <div className="dcard__title">
          <h3>
            {d.carat.toFixed(2)} ct {d.shape}
          </h3>
          <span className="dcard__cert">
            {d.cert} · {d.id}
          </span>
        </div>
        <dl className="specs">
          <div>
            <dt>Cut</dt>
            <dd>{d.cut === 'Very Good' ? 'V. Good' : d.cut}</dd>
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
            <dt>Carat</dt>
            <dd>{d.carat.toFixed(2)}</dd>
          </div>
        </dl>
        <div className="dcard__foot">
          <Link
            className="btn btn--ghost btn--sm"
            to={`/diamond/${d.id}`}
            tabIndex="-1"
            aria-hidden="true"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
