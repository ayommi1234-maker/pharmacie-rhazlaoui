# REPRISE — La Para Rhazlaoui (mémoire de projet)

> Fichier de reprise : tout ce qu'il faut pour continuer le projet dans une **nouvelle session**.
> Sauvegardé dans git car le dossier de travail est éphémère. iCloud n'est **pas** accessible depuis Claude Code.

## Le projet
Site e-commerce de parapharmacie premium **La Para Rhazlaoui** (marché marocain, MAD, bilingue FR/العربية).
Projet **distinct** de `pharmacie-rhazlaoui` — seulement hébergé ici temporairement pour la sauvegarde.
Objectif : plateforme élégante, premium, pensée conversion, évolutive.

## Direction artistique (design system)
- **Concept** : « apothicaire dermocosmétique feutré × luxe marocain ». Motif signature : niches en arche.
- **Palette** : ivoire `#F5F1E8` · sauge `#566B4D` · vert profond `#2F3A29` · sable `#E6D9C3` · laiton/or `#AC8A54`/`#C9A96A` · encre `#23261F`.
- **Typographies** : Cinzel Decorative (logo), **Cinzel** (grands titres), Fraunces (display/produits), Hanken Grotesk (UI/texte), IBM Plex Sans Arabic (RTL).
- **Logo** : médaillon sphère sauge glossy + monogramme **LPR** doré ; wordmark or Cinzel Decorative ; version bannière façon « ALPHAM ».
- Fonctionnalités transverses : bascule **FR ⇄ العربية** en direct (RTL), **thème clair/sombre**, micro-animations, grain subtil.

## Pages construites (source dans ce dossier)
| Fichier | Contenu | Artifact publié (même URL à mettre à jour) |
|---|---|---|
| `brand-book.html` | Présentation marque + design system | https://claude.ai/code/artifact/aa3d1f29-7223-408a-91c2-9125ebe85bca |
| `homepage.html` | Accueil : hero, réassurance, « rituel » interactif, concerns, best-sellers, marques, journal, club | https://claude.ai/code/artifact/3bd265cb-4419-4bcd-8d94-73eda0066334 |
| `produit.html` | Fiche produit : galerie niche, variantes, ajout panier live, actifs, routine, avis | https://claude.ai/code/artifact/cb2014b5-16d4-463c-af54-d86ba42dd761 |
| `catalogue.html` | Catalogue avec filtres fonctionnels (peau/besoin/type/marque/prix/note), tri, puces, ajout rapide | https://claude.ai/code/artifact/48f094e1-7609-4c73-8ab9-5bc380cd5b70 |
| `panier.html` | Panier + checkout 4 étapes (infos/livraison/paiement/confirmation), promo, livraison offerte | https://claude.ai/code/artifact/05a62749-ebfb-465c-ab1f-79cae25b4686 |
| `logo-banner.html` | Bannière-logo premium (rendu image) | — |

Pour **mettre à jour un artifact** : republier le même fichier en passant son URL comme `url` (garde le lien).

## Photos produits
- **Packshots retouchés** (détourage rembg u2net + fond ivoire + carré) dans le repo parent : `../images/products-clean/` (77 fichiers ; ~50-55 propres, ~20 sources floues à refaire).
- Photos brutes d'origine : `../images/products/` (packshots) et `../images/gallery/` (photos étagères/pharmacie — non détourables).
- **iCloud inaccessible** : pour de nouvelles photos, les déposer dans le chat ou Google Drive.

## Prochaines étapes prévues
1. **Intégrer les packshots retouchés** dans les cartes catalogue + fiches produits (remplacer les flacons dessinés). ← étape en cours
2. Pages restantes : **compte client** (dashboard : commandes, suivi, favoris, fidélité) puis **back-office admin**.
3. Décision d'archi technique pour la prod (proposé : Next.js + Medusa/Postgres) et vrai dépôt dédié.

## Reprise rapide
Dans une nouvelle session sur ce dépôt : lire ce fichier, rouvrir les artifacts via les URLs ci-dessus, et reprendre à « Prochaines étapes ».
