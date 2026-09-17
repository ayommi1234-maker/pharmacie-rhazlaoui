# Plan — Nouveau site Para Rhazlaoui (`site-v2/`)

Demande : *« en utilisant les bibliothèques et librairies de design, crée un nouveau site de Para Rhazlaoui »*.

## Règle de non-destruction
Le site actuel (racine : `index.html`, `css/`, `js/`, `admin/`, `netlify.toml`, `_headers`)
**n'est ni supprimé ni modifié**. Le nouveau site est construit **à côté**, dans `site-v2/`.
La bascule en production (changer `publish` dans `netlify.toml`) ne se fera qu'après validation.

## Recherche préalable (faite le 13/09/2026)

### Design de sites pharmacie / parapharmacie — points retenus
- Palette **simple et claire** (santé, propreté), beaucoup de blanc, typographie lisible.
- **Navigation par service / par besoin**, pas seulement par marque : chaque rubrique a sa page.
- **Signaux de confiance réels** : adresse, horaires, téléphone, carte — pas de faux avis.
- **Mobile-first** et performance : au Maroc l'essentiel du trafic est mobile.
- **Accessibilité WCAG 2.2 AA** : contrastes, navigation clavier, `alt` descriptifs, erreurs annoncées.
- **Recherche efficace** dans le catalogue (le point faible n°1 des sites pharma).
- Contenu **éducatif** (conseils santé) valorisé par les guides UX pharma.

### Concurrents marocains repérés
Côté Para, Mapara.ma, BtoBpara, 24hPara, Atelier Para, Parapharma.ma, Maparami.
⚠️ **Honnêteté** : `cotepara.ma` et `mapara.ma` sont **bloqués par le proxy réseau** de cette
session — je n'ai pas pu auditer leurs pages, seulement lire leur positionnement dans les résultats
de recherche. Constante du marché : catalogue large, prix affichés, livraison mise en avant.
Notre différenciation = **pharmacie de quartier réelle à Khouribga** : conseil, retrait sur place,
WhatsApp direct — pas un pure-player prix.

### Bibliothèques de design comparées
| Bibliothèque | Modèle | Pour | Contre |
|---|---|---|---|
| **shadcn/ui** | code copié chez soi (Radix + CVA) | accessible, 100 % personnalisable, aucune dépendance à un thème | React requis |
| DaisyUI | classes CSS sémantiques | sans JS, multi-framework | design générique, peu accessible par défaut |
| Flowbite | catalogue + JS | beaucoup de composants | thème marqué, JS propriétaire |
| Preline | blocs de pages | landing rapide | moins atomique, peu adapté à un catalogue |
| Tailwind UI | payant | qualité | **payant** — exclu (règle : pas d'API/outil payant) |

**Choix : shadcn/ui** (primitives **Radix UI** + `class-variance-authority` + **lucide-react**),
sur **Next.js 14 App Router + TypeScript + Tailwind CSS 3** → **export statique** (`output: "export"`).
Raisons : accessibilité native (Radix), code possédé (pas de lock-in), même stack que
`robe-sur-mesure/` déjà dans le dépôt, et sortie 100 % statique donc hébergement Netlify identique.

## Amélioration au-delà du minimum
`js/products-data.js` reste la **source unique de vérité**. `site-v2` le lit **au build**
(loader Node `vm`) au lieu d'en dupliquer une copie. Conséquence : `GUIDE.md` et le panneau
`admin/` restent valables, la propriétaire continue d'éditer **un seul fichier**.

## Tâches
- [x] 1. Examiner l'existant (données, images, CSP, contraintes propriétaire)
- [x] 2. Recherche web : UX pharmacie + comparatif bibliothèques de design
- [x] 3. Écrire ce plan
- [x] 4. Scaffold `site-v2/` : package.json, tsconfig, next.config (export), tailwind, postcss, eslint
- [x] 5. Loader build-time de `js/products-data.js` + `js/gallery-data.js` (`src/data/source.ts`)
- [x] 6. Thème design : palette pharmacie (vert soin + blanc), typo, tokens CSS, mode sombre
- [x] 7. Composants shadcn/ui : Button, Card, Badge, Input, Sheet, Dialog, Accordion
      (Tabs et Skeleton prévus au plan mais **non retenus** : aucun écran n'en avait besoin,
      inutile de laisser du code mort dans le dépôt)
- [x] 8. Layout : en-tête collant, nav mobile (Sheet), pied de page, barre WhatsApp mobile
- [x] 9. Page Accueil : hero, gammes, sélection produits, horaires réels, carte, conseils
- [x] 10. Page Catalogue `/produits` : recherche instantanée + filtres catégorie/marque/gamme
- [x] 11. Fiche produit `/produits/[id]` : bienfaits, utilisation, composition, WhatsApp
- [x] 12. Page Gamme `/gammes/[slug]`, Galerie `/galerie`, Contact `/contact`
- [x] 13. SEO : metadata par page, Open Graph, JSON-LD `Pharmacy`, sitemap, robots
- [x] 14. Accessibilité WCAG 2.2 AA + performance (images `next/image` désactivé en export → `<img>` optimisées)
- [x] 15. Tests (Vitest) sur la logique : recherche, filtres, normalisation des données
- [x] 16. Config Netlify dédiée (`site-v2/netlify.toml`) + CSP alignée, **sans toucher** celle de la racine
- [x] 17. README `site-v2/README.md` (FR) + vérifications lint/tsc/tests/build documentées ici

## Règles produit (rappel du brief utilisateur)
- ❌ **Aucun faux avis, aucune fausse promotion, aucun prix inventé.** `prix: ""` ⇒ prix masqué.
- ❌ Aucune donnée personnelle de client affichée publiquement.
- ✅ Textes en **français**, devise **DH**, contact **WhatsApp** réel.
- ✅ Aucune API payante, aucune base de données.

## Résultats de vérification (13/09/2026)

- ✅ **Lint** (`npm run lint`) : aucun avertissement ni erreur.
- ✅ **TypeScript** (`npm run typecheck`) : 0 erreur (mode `strict`).
- ✅ **Tests** (`npm test`) : **32/32** sur 2 fichiers.
  - `produits.test.ts` (21) : image perso prioritaire, prix jamais inventé, recherche
    sans accents, « tous les mots », filtres combinés, lien `wa.me` encodé,
    message WhatsApp sans donnée personnelle.
  - `source.test.ts` (11) : lecture réelle de `js/products-data.js` et `js/gallery-data.js`,
    identifiants et slugs uniques, offres actives seulement, miniatures présentes.
- ✅ **Build** (`npm run build`) : **131 pages statiques** générées, 0 erreur de prérendu.
  107 fiches produits + 13 gammes + 6 pages fixes + sitemap + robots.
  First Load JS partagé : **87,3 ko**.
- ✅ **Serveur statique** : `/`, `/produits/`, `/produits/<id>/`, `/gammes/`, `/gammes/<slug>/`,
  `/galerie/`, `/conseils/`, `/contact/`, `/sitemap.xml`, `/robots.txt`, images → **HTTP 200**.
- ✅ **Mobile 390 px** : `scrollWidth == 390` sur les 7 pages testées (aucun débordement
  horizontal), barre de contact fixe, menu latéral fonctionnel.
- ✅ **Contrastes WCAG 2.2 AA** (mesurés dans les deux thèmes) :

  | | clair | sombre | minimum |
  |---|---|---|---|
  | texte / fond | 15,68 | 16,24 | 4,5 |
  | texte secondaire / fond | 5,56 | 8,68 | 4,5 |
  | couleur primaire / fond | 6,59 | 9,07 | 4,5 |
  | texte du bouton primaire | 6,59 | 8,65 | 4,5 |
  | texte du badge accent | **5,51** | 7,90 | 4,5 |
  | contour de champ / fond | **3,36** | 4,06 | 3,0 |

### Défauts trouvés pendant la vérification et corrigés
1. **Badge accent à 3,07:1** (texte blanc sur ambre) — sous le seuil AA.
   → texte brun très foncé à la place du blanc : **5,51:1**.
2. **Contour des champs de saisie à 1,28:1** — WCAG 1.4.11 exige 3:1 pour délimiter
   un contrôle. → `--input` dissocié de `--border` : **3,36:1** (clair) / **4,06:1** (sombre).
3. **En-tête mobile sur 2 lignes** : le nom passait à la ligne, l'en-tête dépassait 64 px
   et décalait la barre de recherche collante (`top-16`). → `whitespace-nowrap` + taille
   réduite sur mobile, icône de recherche masquée sous `sm`.
4. **Bouton « Filtres » sans nom accessible sur mobile** : le libellé étant masqué sous `sm`,
   le bouton n'était annoncé que « bouton ». → `aria-label` explicite et dynamique.

### Ce qui n'a PAS pu être fait
- `cotepara.ma` et `mapara.ma` sont **bloqués par le proxy réseau** : leurs pages n'ont pas
  pu être auditées, seulement leur positionnement lu dans les résultats de recherche.

### Limites connues
- Beaucoup de produits partagent la même photo de rayon (c'est ce que contiennent les
  données actuelles) — remplir `imagePerso` améliorerait nettement le catalogue.
- Français uniquement : arabe + RTL restent à faire.
- Coordonnées GPS exactes absentes des données → la carte montre une vue générale de Khouribga.
- Le site actuel reste celui publié : la bascule Netlify est une décision à prendre.
