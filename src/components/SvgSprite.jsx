import React from 'react';

export default function SvgSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="i-logo" viewBox="0 0 32 32">
          <path d="M9 7h14l6 6.5L16 28 3 13.5 9 7Z M3 13.5h26 M9 7l4 6.5L16 28 M23 7l-4 6.5L16 28 M13 13.5 16 7l3 6.5" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-arrow" viewBox="0 0 16 16">
          <path d="M1 8h13M9.5 3.5 14 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </symbol>
        <symbol id="i-arrow-ne" viewBox="0 0 16 16">
          <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </symbol>
        <symbol id="i-search" viewBox="0 0 20 20">
          <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path d="m13 13 5 5" stroke="currentColor" strokeWidth="1.3" />
        </symbol>
        <symbol id="i-close" viewBox="0 0 16 16">
          <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.3" />
        </symbol>
        <symbol id="i-filter" viewBox="0 0 20 20">
          <path d="M2 5h16M5 10h10M8 15h4" stroke="currentColor" strokeWidth="1.3" fill="none" />
        </symbol>
        <symbol id="i-info" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M8 7v4.5M8 4.6v.1" stroke="currentColor" strokeWidth="1.3" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="m6.5 10.2 2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </symbol>
        <symbol id="i-sparkle" viewBox="0 0 24 24">
          <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" fill="currentColor" />
        </symbol>
        <symbol id="i-f-quality" viewBox="0 0 44 44">
          <path d="M12 10h20l7 8-17 18L5 18l7-8Z M5 18h34 M12 10l5 8 5 18 M32 10l-5 8-5 18 M17 18l5-8 5 8" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-f-cert" viewBox="0 0 44 44">
          <rect x="8" y="5" width="24" height="31" rx="1" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M13 12h14M13 17h14M13 22h8" stroke="currentColor" strokeWidth="1" />
          <circle cx="31" cy="31" r="6" fill="var(--ivory,#f7f3ec)" stroke="currentColor" strokeWidth="1" />
          <path d="m28.5 31 1.8 1.8 3.4-3.6" fill="none" stroke="currentColor" strokeWidth="1" />
        </symbol>
        <symbol id="i-f-source" viewBox="0 0 44 44">
          <path d="M22 38c-9-4-14-11-14-19V9l14-5 14 5v10c0 8-5 15-14 19Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M16 18h12l-6 9-6-9Z M16 18l2-3h8l2 3" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-f-craft" viewBox="0 0 44 44">
          <circle cx="22" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M17 8h10l2.5 3.5L22 18l-7.5-6.5L17 8Z M14.5 11.5h15" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-f-price" viewBox="0 0 44 44">
          <path d="M6 22 22 6h14v14L20 36 6 22Z" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          <circle cx="29" cy="13" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M15 23l6 6M18 20l6 6" stroke="currentColor" strokeWidth="1" />
        </symbol>
        <symbol id="i-f-service" viewBox="0 0 44 44">
          <circle cx="22" cy="15" r="7" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M8 38c1.5-8 7-12 14-12s12.5 4 14 12" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M33 6l1 2.5L36.5 9 34 10l-1 2.5-1-2.5-2.5-1 2.5-.5L33 6Z" fill="currentColor" />
        </symbol>
        <symbol id="i-quote" viewBox="0 0 28 28">
          <path d="M3 24V14C3 8 6 4.5 11 3.5l1 2.2C9 6.7 7.6 9 7.5 12H12v12H3Zm13 0V14c0-6 3-9.5 8-10.5l1 2.2c-3 1-4.4 3.3-4.5 6.3H25v12h-9Z" fill="currentColor" />
        </symbol>
        <symbol id="i-star" viewBox="0 0 12 12">
          <path d="m6 .8 1.6 3.4 3.7.4-2.8 2.5.8 3.7L6 8.9 2.7 10.8l.8-3.7L.7 4.6l3.7-.4L6 .8Z" fill="currentColor" />
        </symbol>
        <symbol id="i-pin" viewBox="0 0 20 20">
          <path d="M10 18s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="10" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </symbol>
        <symbol id="i-phone" viewBox="0 0 20 20">
          <path d="M4 2.5h3l1.5 4-2 1.3a9 9 0 0 0 5.7 5.7l1.3-2 4 1.5v3c0 .8-.7 1.5-1.5 1.5C8.5 17.5 2.5 11.5 2.5 4c0-.8.7-1.5 1.5-1.5Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-mail" viewBox="0 0 20 20">
          <rect x="2" y="4" width="16" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="m2.5 5 7.5 6 7.5-6" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </symbol>
        <symbol id="i-clock" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M10 5.5V10l3 2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </symbol>
        <symbol id="i-whatsapp" viewBox="0 0 24 24">
          <path d="M12 2.2A9.7 9.7 0 0 0 3.7 17l-1.3 4.8 4.9-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1c0 1.2.9 2.4 1 2.6.1.2 1.8 2.7 4.3 3.8 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.5-.2Z" fill="currentColor" />
        </symbol>
        <symbol id="i-instagram" viewBox="0 0 20 20">
          <rect x="2.5" y="2.5" width="15" height="15" rx="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="10" cy="10" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="14.6" cy="5.4" r=".8" fill="currentColor" />
        </symbol>
        <symbol id="i-facebook" viewBox="0 0 20 20">
          <path d="M11.5 18v-7h2.3l.4-2.8h-2.7V6.5c0-.8.2-1.3 1.4-1.3h1.4V2.7a19 19 0 0 0-2.1-.1c-2 0-3.5 1.3-3.5 3.6v2H6.5V11h2.3v7h2.7Z" fill="currentColor" />
        </symbol>
        <symbol id="i-pinterest" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 0 0-2.9 15.5c-.1-.7-.1-1.7 0-2.4l1-4.1s-.3-.5-.3-1.3c0-1.2.7-2.1 1.6-2.1.7 0 1.1.6 1.1 1.2 0 .7-.5 1.8-.7 2.8-.2.9.4 1.6 1.3 1.6 1.6 0 2.8-1.7 2.8-4.1 0-2.1-1.5-3.6-3.7-3.6-2.5 0-4 1.9-4 3.8 0 .8.3 1.6.7 2l.1.3-.3 1c0 .2-.1.2-.3.1-1.1-.5-1.8-2.1-1.8-3.4 0-2.8 2-5.3 5.8-5.3 3 0 5.4 2.2 5.4 5.1 0 3-1.9 5.5-4.6 5.5-.9 0-1.7-.5-2-1l-.5 2.1c-.2.7-.7 1.7-1.1 2.3A8 8 0 1 0 10 2Z" fill="currentColor" />
        </symbol>
        <symbol id="i-youtube" viewBox="0 0 20 20">
          <rect x="2" y="4.5" width="16" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="m8.5 7.5 4 2.5-4 2.5v-5Z" fill="currentColor" />
        </symbol>
        <symbol id="i-zoom" viewBox="0 0 16 16">
          <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="m11 11 3.5 3.5M7 4.8v4.4M4.8 7h4.4" stroke="currentColor" strokeWidth="1.2" />
        </symbol>
        <symbol id="i-expand" viewBox="0 0 16 16">
          <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </symbol>
        <symbol id="i-gem-empty" viewBox="0 0 40 40">
          <path d="M11 8h18l7 8-16 17L4 16l7-8Z M4 16h32" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="m27 27 8 8" stroke="currentColor" strokeWidth="1" />
        </symbol>
      </defs>
    </svg>
  );
}
