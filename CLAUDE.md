# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing website for **Pharmacie Rhazlaoui** (a pharmacy/parapharmacy in Khouribga, Morocco). Single-page site in French — no build step, no framework, no package manager. Plain HTML + CSS + vanilla JS, deployed on **Netlify** (`publish = "."`). The content owner is non-technical; see `GUIDE.md` for the end-user editing instructions (French).

## Running locally

No build. Open `index.html` directly in a browser, or serve it (needed so relative paths and the admin panel behave like production):

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

This is the same command wired into `.claude/launch.json`. There are no tests, linters, or CI.

## Architecture

The page is rendered **client-side from data files**. `index.html` contains empty section containers; `js/script.js` reads the global constants and injects product cards / gallery / offers into the DOM on load. Load order matters and is fixed in `index.html` (bottom of file):

1. `js/products-data.js` — defines globals `PRODUCTS`, `GAMMES`, `OFFRES`, `PHARMACIE_INFO`
2. `js/gallery-data.js` — defines global `GALLERY_PHOTOS`
3. `js/script.js` — rendering, animations, gallery lightbox, "gamme" overlays
4. `js/color-customizer.js` — live theme editor (writes CSS variables)

Everything communicates through **global constants** (no modules/imports). `script.js` calls `render*()` functions (`renderCosmetiques`, `renderComplements`, `renderMarques`, `renderOffres`, …), each filtering `PRODUCTS` and building HTML via `createProductCard()`.

### Data model (`js/products-data.js`)

- `PRODUCTS` — object keyed by category: `cosmetiques`, `complements`, `doppelherz`, `appareils`, `orthopediques`, `medicaments`, `enfants`, `femmes`, `divers`, `cerave`. Each product has `id`, `nom`, `marque`, `gamme`, `prix`/`ancienPrix`, `badge`, `image`, `imagePerso`, `description`, `bienfaits[]`, `utilisation`, `composition`.
- Image resolution: `getImage()` in `script.js` prefers `imagePerso` over `image`. `prix` is often empty (`""`) — the UI hides the price when blank, by design.
- `GAMMES` — the "navigation par gamme" cards. Each entry filters products by matching `marques[]` against each product's `marque` (substring match in `getGammeProducts()`), **not** by the `PRODUCTS` category key. Adding a brand to a gamme means adding it to that gamme's `marques` list.
- `PHARMACIE_INFO` — contact info, social links, opening hours. Edit here, not in HTML.

### Images & thumbnails

- Full images: `images/gallery/photo-NNN.jpg`. Thumbnails: `images/gallery/thumbs/photo-NNN.jpg` — `GALLERY_PHOTOS` and the hero "floaters" (`ORTHO_IMAGES` in `script.js`) reference the `thumbs/` path. **When adding a gallery image, add both the full image and a matching thumbnail.**
- Gallery images are JPEG-compressed for web (quality ~82, max ~1200px). Keep new images optimized — the gallery is the bulk of repo weight.

### Cache busting

Production caches assets aggressively (`netlify.toml`: images immutable 1y, CSS/JS 7d). The asset `?v=N` query strings in `index.html` are bumped manually to force clients to reload after a CSS/JS change. **After editing `css/style.css` or any `js/*.js`, increment the matching `?v=` in `index.html`** (CSS and JS currently use separate counters).

## Admin panel (`admin/index.html`)

Standalone page for the non-technical owner to edit prices/photos. It loads `products-data.js`, lets the user edit values, persists to **`localStorage`** (`pharma_*` keys) for preview, and the "Exporter" tab generates JS code to **manually paste back into `js/products-data.js`**. The admin panel does **not** write files — `products-data.js` is the source of truth and must be edited directly to make changes permanent. `admin/*` is `noindex`'d and not linked from the public site.

## Deployment / security notes

- `netlify.toml` is the canonical config; `_headers` is a backup of the same security headers. Keep both in sync when changing CSP/headers.
- The CSP in `netlify.toml` whitelists specific external origins (Google Fonts, cdnjs, OpenStreetMap tiles, Unsplash, Google Maps iframe). Adding a new external script/style/font/image source requires updating the CSP in **both** `netlify.toml` and `_headers`.

## Conventions

- All UI text and code comments are in **French** — match this.
- User-supplied strings rendered into the DOM go through `escapeHtml()` / `sanitizeUrl()` in `script.js`; keep using them when injecting product data.
- Commit messages are in French and descriptive of the change.
