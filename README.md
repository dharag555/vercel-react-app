# SVK — Website Source

Static website (HTML + CSS + vanilla JavaScript). No framework or npm install needed.

## Open & preview
1. Open this folder in VS Code.
2. Install the "Live Server" extension, right-click `index.html` → "Open with Live Server".
   (Or run `python3 -m http.server 8000` and visit http://localhost:8000)

## Folder structure
```
index.html, diamond.html, education.html, policies.html   ← built pages (ready to deploy)
assets/css/style.css      ← all styles (colours/fonts are CSS variables at the top)
assets/js/data.js         ← diamond inventory, prices, WhatsApp number, product card template
assets/js/main.js         ← menu, animations, sparkles, tabs, forms, WhatsApp links
assets/js/catalogue.js    ← search, filters, sorting, shape cards
assets/js/product.js      ← diamond detail page, zoom, lightbox, enquiry modal
assets/img/               ← all images (WebP) + favicon.svg + og.jpg
src/                      ← editable source parts
  header.html, footer.html, form.html, sprite.html (SVG icons)
  pages/index.html, pages/diamond.html, pages/education.html, pages/policies.html
build.py                  ← joins src/ parts into the root .html pages
```

## Editing workflow
- Edit page content in `src/pages/*.html`, and the shared header/footer/form in `src/*.html`.
- Then run `python3 build.py` to regenerate the root `index.html`, `diamond.html`, etc.
- CSS, JS and images are used directly — no build step needed for those.
- (If you prefer, you can edit the root `.html` files directly and ignore `src/` + `build.py`,
  but then don't run `build.py` again or your changes will be overwritten.)

## Things to replace before launch
- `assets/js/data.js`: real diamond inventory, prices, certificate labs; `WHATSAPP` number (country code, no +).
- Contact details in `src/pages/index.html` (address, phone, Instagram, hours).
- Testimonials (marked "Placeholder"), trust/certification note, policy text in `src/pages/policies.html`.
- Social links in `src/footer.html`.
- Forms are front-end only: connect the submit handler in `assets/js/main.js` (search "Front-end only")
  to a service such as Formspree, EmailJS or your own backend.
