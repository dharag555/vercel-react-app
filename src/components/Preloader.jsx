import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reduce ? 150 : 1200;
    const timer = setTimeout(() => {
      setDone(true);
      document.documentElement.classList.add('is-ready');
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${done ? 'is-done' : ''}`} aria-hidden="true">
      <div className="preloader__inner">
        <svg viewBox="0 0 32 32">
          <path
            d="M9 7h14l6 6.5L16 28 3 13.5 9 7Z M3 13.5h26 M9 7l4 6.5L16 28 M23 7l-4 6.5L16 28 M13 13.5 16 7l3 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
        <div className="preloader__word">SVK</div>
        <div className="preloader__bar">
          <span />
        </div>
      </div>
    </div>
  );
}
