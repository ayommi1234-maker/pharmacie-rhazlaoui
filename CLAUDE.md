# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Règle mémoire de l'utilisateur (tous projets)
À CHAQUE création/évolution de projet demandée par l'utilisateur :
1. Faire une **vraie recherche web** (jamais superficielle, jamais une seule source ni une seule référence IA).
2. **Comparer plusieurs solutions/concurrents** et en tirer les meilleures pratiques.
3. **Proposer des améliorations** au-delà du minimum demandé (fonctionnalités, UX, design, performance).
4. Rester **honnête et factuel** : « inventer mieux » = de meilleures solutions, JAMAIS de faux faits, faux avis ou fausses données.
5. Si le réseau est bloqué, le **dire** et continuer avec mes meilleures connaissances (ne pas prétendre avoir cherché).
6. **Suivi & continuité** : garder le contexte des discussions, faire le point régulièrement, reprendre là où on s'est arrêté — ne pas repartir de zéro ni oublier les décisions prises.
Répondre en **français** par défaut.

## Préférences globales de Baounna Abdellah (AGENTS.md v1.11, 23/09/2026)
Copie de référence : `.claude/AGENTS-baounna.md` — à lire en entier au premier
travail non trivial d'une session. Ce qui s'applique **ici** :

- **Chemin le plus court d'abord.** Quand l'objectif est de livrer ou publier,
  la première phrase donne la voie la plus courte qui marche aujourd'hui, avec
  son coût en minutes. Les améliorations viennent après, optionnelles et chiffrées.
- **Preuve, jamais affirmation.** Aucun « c'est fait » sans la méthode et le
  résultat observé. Vérifier (est-ce ce qui a été demandé) et tester (est-ce que
  ça marche pour le destinataire) sont deux passes distinctes. Pages web testées
  à 390 px et en large.
- **Travailler sur la matière réelle** : ouvrir et lire les fichiers de
  l'utilisateur en entier avant de produire. Ne jamais inventer un contenu manquant.
- **Périmètre strict** : un ordre précis ne modifie que l'élément demandé.
- **Ne jamais supprimer** un fichier sans demande explicite. « Sauvegarder » ne
  vaut jamais autorisation de détruire. Les doublons se listent, ils ne s'effacent pas.
- **« L'autre »** désigne un livrable déjà produit dans la session, jamais une
  variante nouvelle : lister et demander.
- **Correction = règle écrite.** Après chaque correction de l'utilisateur, écrire
  la règle dans `tasks/lessons.md` et montrer où elle est écrite. Pas de promesse.
- **Rien de payant sans accord écrit.** Arrêt net devant tout écran de paiement,
  avec le coût exact et son objet.
- **Outils payants d'abord** dans les recommandations (Adobe CC, Suno, Kling,
  Creative Fabrica, Envato, iCloud). Le gratuit ne vient qu'en complément.
- **Design** : étudier 5 à 8 références réelles du secteur avant toute décision
  visuelle ; prendre le principe, jamais la composition.
- **Trois directions divergentes** pour un produit créatif ou stratégique : une
  pour le volume, une pour la marge, une sur le terrain inoccupé. Puis critique
  adversariale sans compliment, recommandation, et **arrêt** jusqu'au choix.
- **Deuxième fois = outil.** À la deuxième demande du même type, construire le
  script ou le gabarit, l'exécuter, donner la commande exacte.
- **Interdits de création** : aucune forme d'étoile ; « star, starburst » dans le
  prompt négatif de toute génération d'image ou de vidéo. Tout arabe destiné à une
  voix de synthèse porte les diacritiques complets.
- **Rappel des priorités** : si une idée neuve arrive alors qu'un projet
  prioritaire est près d'aboutir, le signaler en deux lignes, puis exécuter.

### Ce que cet environnement ne permet pas (à dire, jamais à contourner en silence)
- **iCloud inaccessible depuis le nuage** : registre des connecteurs vérifié le
  24/09/2026 sur les mots-clés icloud, apple, icloud drive, apple notes/reminders —
  **aucun connecteur Apple n'existe**, ni installé ni installable. `mdfind` n'existe
  pas non plus (conteneur Linux). La règle « chercher dans iCloud avec mdfind »
  suppose une session **sur le Mac**.
  **Ce qui débloque** : ouvrir la session depuis le Mac — application Claude Desktop,
  ou `claude remote-control` dans un terminal placé sur le dossier voulu. iCloud Drive
  y est un simple dossier local, lisible directement :
  `~/Library/Mobile Documents/com~apple~CloudDocs/`. `mdfind` y fonctionne.
  Depuis le nuage, la sauvegarde réelle reste GitHub, plus une archive à déposer
  soi-même dans iCloud, ou Google Drive qui, lui, est connecté.
- **`~/.Codex/` absent** : ni `reprise/`, ni `rules/`, ni les skills Codex.
  Les mots-clés `REPRISE`, `RRR`, `humain` n'ont pas de fichiers cibles ici.
- **Stack payante non connectée** : Adobe, Suno, Kling, Creative Fabrica et Envato
  ne sont pas utilisables depuis ce conteneur. Higgsfield est connecté mais à 0 crédit.

## Project

Static marketing website for **Pharmacie Rhazlaoui** (a pharmacy/parapharmacy in Khouribga, Morocco). Single-page site in French — no build step, no framework, no package manager. Plain HTML + CSS + vanilla JS, deployed on **Netlify** (`publish = "."`). The content owner is non-technical; see `GUIDE.md` for the end-user editing instructions (French).

### Sous-projets du dépôt
- **`site-v2/`** — refonte du site pharmacie avec Next.js 14 + **shadcn/ui** (export statique).
  Il **ne duplique pas** les données : `src/data/source.ts` lit `js/products-data.js` et
  `js/gallery-data.js` au moment du build (bac à sable `node:vm`). Donc **toute modification
  de `js/products-data.js` met à jour les deux sites**, et `GUIDE.md` + `admin/` restent valables.
  Le site racine reste celui publié tant que la configuration Netlify n'est pas changée.
  Plan et vérifications : `tasks/todo.md`. Détails : `site-v2/README.md`.
- **`robe-sur-mesure/`** — application indépendante (robes sur mesure via WhatsApp) ;
  voir son propre `CLAUDE.md`. Ne pas mélanger avec le site pharmacie.

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
