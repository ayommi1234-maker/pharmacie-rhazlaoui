# CLAUDE.md — Robe sur mesure

Guidance pour Claude Code sur ce sous-projet.

## Règle mémoire de l'utilisateur (tous projets)
À CHAQUE création/évolution de projet demandée par l'utilisateur :
1. Faire une **vraie recherche web** (jamais superficielle, jamais une seule source ni une seule référence IA).
2. **Comparer plusieurs solutions/concurrents** et en tirer les meilleures pratiques.
3. **Proposer des améliorations** au-delà du minimum demandé (fonctionnalités, UX, design, performance).
4. Rester **honnête et factuel** : « inventer mieux » = de meilleures solutions, JAMAIS de faux faits, faux avis ou fausses données.
5. Si le réseau est bloqué, le **dire** et continuer avec mes meilleures connaissances.
Répondre en **français** par défaut ; prévoir l'arabe (+ RTL) pour les projets destinés au Maroc.

## Projet
App mobile-first (Next.js 14 App Router + TypeScript + Tailwind) pour vendre des robes sur mesure
**via WhatsApp** (aucune base de données). Publicité vidéo verticale via **Remotion**. Devise **DH**.
Projet **isolé** dans `robe-sur-mesure/` — ne pas toucher au site pharmacie à la racine du dépôt.

## Points clés
- **Config centrale** : `src/config/boutique.ts` (nom, WhatsApp, ville, prix…). Placeholders si non renseigné.
- **Données éditables** : `src/data/*` (modèles, tissus, couleurs, options, décorations).
- **Logique testée** : `src/lib/*` (mesures cm/m, prix, message WhatsApp, sanitize). Tests dans `__tests__/`.
- **Mesures** : toujours normalisées en **cm** en interne ; accepter virgule et point.
- **Confidentialité** : aucune donnée envoyée automatiquement ; envoi seulement au clic WhatsApp ;
  mensurations jamais dans une URL publique ; effacement local après envoi.
- **Pub Remotion** : `src/remotion/` — n'ajouter aucun média sous copyright.

## Vérifs avant de conclure
`npm run lint` · `npm run typecheck` · `npm test` · `npm run build`. Commits et UI en **français**.
