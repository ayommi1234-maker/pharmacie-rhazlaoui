# Plan — Robe sur mesure (MVP)

Application mobile-first pour vendre des robes sur mesure via WhatsApp + publicité vidéo Remotion.
Projet **isolé** dans `robe-sur-mesure/` (le site pharmacie à la racine n'est pas touché).

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3
- Remotion 4 (pub vidéo verticale 1080×1920)
- Envoi final via WhatsApp (`wa.me`), **aucune base de données**
- Persistance locale temporaire (`localStorage`)
- Vitest pour les tests logiques
- FR par défaut, architecture prête pour l'arabe (dictionnaire i18n simple)
- Devise : **DH**

## Décisions
- Données d'exemple **clairement marquées** (`demo: true`).
- Identité boutique = **placeholders** dans `src/config/boutique.ts` (non inventés).
- Aucune donnée perso envoyée automatiquement ; consentement obligatoire ; envoi seulement via clic WhatsApp.
- Mesures normalisées en **cm** en interne (accepte m/cm, virgule et point).

## Tâches
- [ ] 1. Scaffold : package.json, tsconfig, next.config, tailwind, postcss, eslint, .gitignore, .env.example
- [ ] 2. Config centrale `src/config/boutique.ts` (placeholders) + i18n minimal
- [ ] 3. Types `src/lib/types.ts`
- [ ] 4. Données : modeles, tissus, couleurs (par tissu), coupe, decorations, prix
- [ ] 5. Lib : mesures (conversion/validation), sanitize, prix (estimatif), whatsapp (message + wa.me), storage
- [ ] 6. Tests Vitest : conversion m/cm, virgule décimale, message WhatsApp, calcul prix
- [ ] 7. UI de base : Button, Card, Field, ProgressBar/Stepper, Warning, Consent
- [ ] 8. Page Accueil (hero, process, réassurance)
- [ ] 9. Page Catalogue (4 modèles démo)
- [ ] 10. Configurateur 8 étapes : modèle → tissu → couleur → coupe → décorations → occasion/date → mesures → récap
- [ ] 11. Assistant mesures (progressif, illustrations, validation douce, unités)
- [ ] 12. Récapitulatif + prix estimatif + consentement + Copier + Envoyer WhatsApp
- [ ] 13. Page Confidentialité + action « Effacer mes informations »
- [ ] 14. Remotion : composition 20–25 s, 6 scènes, textes lisibles sans son, emplacements photos
- [ ] 15. README (installation, photos, WhatsApp, robes/prix, lancement, export vidéo, déploiement)
- [ ] 16. Vérification : lint, tsc, tests, mobile, accessibilité de base ; documenter résultats ci-dessous

## Sécurité / confidentialité (checklist)
- [ ] Aucune sortie réseau hors WhatsApp (déclenché par la cliente)
- [ ] Mensurations jamais dans une URL publique (seulement dans le lien wa.me au clic)
- [ ] Nettoyage/validation de toutes les entrées
- [ ] Suppression des données locales après envoi + bouton « Effacer »
- [ ] Aucun tracker publicitaire
- [ ] Page confidentialité FR

## Résultats de vérification (24/08/2026)
- ✅ **Lint** (`npm run lint`) : aucun warning ni erreur.
- ✅ **TypeScript** (`npm run typecheck`) : 0 erreur.
- ✅ **Tests** (`npm test`) : 18/18 passent (3 fichiers).
  - Conversions m→cm (1,65 m = 165 cm ; 0,92 m = 92 cm) ✔
  - Virgule ET point décimal acceptés ✔
  - Validation douce (avertissement sans blocage) ✔
  - Calcul du prix estimatif (base + tissu + déco + perso) ✔
  - Génération du message WhatsApp (modèle, mensurations en cm, prix) ✔
  - Encodage du lien `wa.me` + nettoyage du numéro ✔
- ✅ **Build** (`npm run build`) : 7 pages générées, aucune erreur SSR/prérendu.
- ✅ **Serveur de prod** : `/`, `/catalogue`, `/configurateur`, `/confidentialite` → HTTP 200.
- ✅ **Mobile** : meta viewport présente, layout `max-w-md`, boutons ≥ 48px, cibles tactiles.
- ✅ **Accessibilité de base** : labels de champs, `aria-pressed`, `role=progressbar`,
  focus visible, `role=alert` sur erreurs.
- ✅ **Aucune donnée envoyée automatiquement** : envoi uniquement au clic WhatsApp ;
  mensurations jamais dans une URL publique ; effacement local après envoi + bouton dédié.
- ✅ **Remotion** : composition `PubRobe` listée (1080×1920, 30 fps, 690 frames / 23 s) ;
  rendu d'une image fixe réussi.

### Limites connues (MVP)
- Pas de tableau de bord admin : l'édition passe par les fichiers `src/data/*` et `src/config/boutique.ts`.
- Pas de base de données : chaque demande part par WhatsApp (voulu).
- Arabe préparé (i18n) mais non traduit ; RTL non activé.
- Les photos sont des placeholders tant que la boutique n'ajoute pas ses images.
- Le rendu vidéo télécharge un navigateur la 1re fois (option `--browser-executable` sinon).

