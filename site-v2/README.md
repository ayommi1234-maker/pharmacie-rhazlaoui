# Para Rhazlaoui — nouveau site (`site-v2`)

Refonte du site de la **Pharmacie Rhazlaoui / La Para Rhazlaoui** (Khouribga) avec une
bibliothèque de design moderne.

> **Le site actuel n'est pas supprimé.** Il continue de vivre à la racine du dépôt
> (`index.html`, `css/`, `js/`, `admin/`). Ce dossier est une version parallèle.
> La bascule en production est une décision à prendre séparément (voir *Déploiement*).

---

## Ce qui a été choisi, et pourquoi

| Brique | Choix | Raison |
|---|---|---|
| Framework | **Next.js 14** (App Router), export statique | Sortie 100 % HTML/CSS/JS → même hébergement Netlify qu'aujourd'hui, aucun serveur |
| Design | **shadcn/ui** (Radix UI + CVA + lucide-react) | Composants accessibles par construction, code **copié dans le dépôt** (aucune dépendance à un thème imposé) |
| CSS | **Tailwind CSS 3** avec variables de thème | Mode sombre gratuit, retinter tout le site = 10 lignes de CSS |
| Polices | **polices système** | Zéro requête réseau, affichage instantané, CSP plus simple |
| Carte | **OpenStreetMap** | Pas de clé d'API, pas de traceur publicitaire |
| Types/tests | TypeScript strict + Vitest | La logique de recherche et de données est testée |

Alternatives écartées : **DaisyUI** (design générique, accessibilité à la charge du
développeur), **Flowbite** / **Preline** (catalogues volumineux, thème marqué),
**Tailwind UI** (payant).

---

## Le point important : une seule source de données

`site-v2` **ne duplique pas** le catalogue. Au moment du build, il lit directement
les fichiers du site historique :

```
js/products-data.js   →  PRODUCTS, GAMMES, OFFRES, PHARMACIE_INFO
js/gallery-data.js    →  GALLERY_PHOTOS
images/               →  copiées dans `out/images` par `scripts/copier-images.mjs`
```

**Conséquence pratique :** rien ne change pour la propriétaire. `GUIDE.md` et le
panneau `admin/` restent valables. On modifie **un seul fichier**, `js/products-data.js`,
et les deux sites se mettent à jour.

Le chargement est fait par `src/data/source.ts` (bac à sable `node:vm`).
Deux fichiers de tests vérifient que ce couplage fonctionne toujours.

---

## Installation et lancement

```bash
cd site-v2
npm install

npm run dev        # http://localhost:3000
npm run build      # génère out/ (site complet, images incluses)
npm run start      # sert out/ sur http://localhost:3000
```

Vérifications :

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm test           # Vitest
```

> `public/images` est un **lien symbolique** vers `../images`, uniquement pour le mode
> `dev`. Il est ignoré par git : les 65 Mo de photos ne sont pas dupliqués dans le dépôt.
> Au build, `scripts/copier-images.mjs` copie réellement les images dans `out/`.

---

## Pages

| URL | Contenu |
|---|---|
| `/` | Accueil : accroche, chiffres réels, services, gammes, sélection, mises en avant, horaires |
| `/produits/` | Catalogue complet — recherche instantanée, filtres rayon + marque, pagination |
| `/produits/<id>/` | Fiche produit : bienfaits, utilisation, composition, WhatsApp, suggestions |
| `/gammes/` et `/gammes/<slug>/` | Les 13 univers et leurs produits |
| `/galerie/` | Photos de la pharmacie, filtrables, visionneuse accessible |
| `/conseils/` | Conseils santé généraux (accordéon) + avertissement médical |
| `/contact/` | Horaires, téléphone, WhatsApp, adresse, carte |
| `/sitemap.xml`, `/robots.txt` | Générés automatiquement |

---

## Règles de contenu respectées

- **Aucun faux avis, aucune fausse promotion, aucun prix inventé.**
  Un produit sans prix dans les données affiche « Prix sur demande ».
- Les « chiffres » de la page d'accueil (107 produits, 13 gammes, 51 marques) sont
  **calculés** depuis le fichier de données, pas écrits à la main.
- Les mises en avant viennent de `OFFRES` — rien n'est ajouté par le site.
- Avertissement médical sur chaque fiche produit et sur la page Conseils.
- Aucune donnée personnelle collectée : pas de formulaire, pas de compte,
  pas de base de données, pas de traceur. Le contact se fait par téléphone ou WhatsApp,
  toujours à l'initiative du visiteur.

---

## Accessibilité

- Contrastes conformes **WCAG 2.2 AA**, focus visible sur tous les éléments interactifs.
- Lien « Aller au contenu principal », points de repère ARIA, titres hiérarchisés.
- Menus et fenêtres bâtis sur **Radix** : piège de focus, fermeture au clavier.
- Cibles tactiles ≥ 44 px, `aria-pressed` sur les filtres, `aria-live` sur le compteur
  de résultats, `prefers-reduced-motion` respecté.

---

## Modifier le site

| Je veux… | Fichier |
|---|---|
| Ajouter/modifier un produit, un prix, une gamme, une offre, les horaires | `../js/products-data.js` |
| Ajouter une photo à la galerie | `../js/gallery-data.js` + `../images/gallery/` **et** la miniature dans `thumbs/` |
| Changer les couleurs du site | `src/app/globals.css` (bloc `:root`) |
| Changer les rubriques du menu | `src/lib/site.ts` |
| Changer les textes des conseils santé | `src/app/conseils/page.tsx` |
| Changer le domaine du sitemap | variable `NEXT_PUBLIC_SITE_URL` au build |

---

## Déploiement

Le site actuel reste publié tant que la configuration Netlify n'est pas changée.

Pour publier `site-v2` :

1. Netlify → *Site settings* → *Build & deploy* → *Build settings*
2. **Base directory** : `site-v2` · **Build command** : `npm run build` · **Publish directory** : `site-v2/out`
3. Déployer.

`site-v2/netlify.toml` contient déjà les en-têtes de sécurité, la CSP adaptée
(OpenStreetMap au lieu de Google Maps, aucune police externe) et les règles de cache.

**Recommandation :** tester d'abord via une *Deploy Preview* ou une branche,
pour comparer les deux versions avant de basculer.

---

## Limites connues

- Beaucoup de produits partagent la même photo de rayon : c'est ce que contiennent les
  données actuelles. Ajouter des photos produit dans `imagePerso` améliorera nettement
  le rendu du catalogue.
- Site en français uniquement. L'arabe (et le RTL) reste à faire.
- La carte de la page Contact montre une vue générale de Khouribga : les coordonnées
  GPS exactes de la pharmacie ne figurent pas dans les données.
- Pas de vente en ligne ni de panier — voulu : la commande passe par WhatsApp ou sur place.
