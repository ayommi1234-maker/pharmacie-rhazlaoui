# Robe sur mesure — application + publicité vidéo

Application web **mobile-first** pour vendre des robes sur mesure : la cliente choisit un modèle,
le personnalise, saisit ses mensurations, puis envoie sa **demande par WhatsApp** (aucune base de
données, aucun paiement en ligne). Le projet inclut aussi une **publicité vidéo verticale**
(Remotion) pour Reels / TikTok / Facebook.

- **Stack** : Next.js 14 (App Router) · TypeScript · Tailwind CSS · Remotion · Vitest
- **Langue** : français (structure prête pour l'arabe)
- **Devise** : dirham marocain, affiché « DH »
- Données d'exemple **clairement marquées** (démonstration).

> ⚠️ Ce projet est isolé dans le dossier `robe-sur-mesure/`. Il n'a aucun lien avec le reste du
> dépôt. Toutes les commandes ci-dessous se lancent **depuis ce dossier**.

---

## 1. Installation

Prérequis : **Node.js 18+** (testé avec Node 22).

```bash
cd robe-sur-mesure
npm install
npm run dev
```

Ouvrez ensuite **http://localhost:3000** (idéalement en vue mobile : outils développeur → mode
responsive).

---

## 2. Personnaliser votre boutique (à faire en premier)

Tout est centralisé dans **`src/config/boutique.ts`**. Remplacez les valeurs entre crochets :

| Champ | Où | Exemple |
|------|----|---------|
| Nom de la boutique | `nom` | `"Atelier Yasmine"` |
| **Numéro WhatsApp** | `whatsapp` | `"212600000000"` (indicatif + numéro, chiffres uniquement) |
| Ville | `ville` | `"Casablanca"` |
| Délai moyen | `delaiMoyen` | `"7 à 14 jours"` |
| Prix de départ | `prixDepartDH` | `500` |
| Couleurs de marque | `couleursMarque` | `["#7A2E33", "#B9975B"]` |
| Réseau social | `reseauSocial` | `"https://instagram.com/..."` |

Vous pouvez aussi renseigner ces valeurs **sans toucher au code**, via un fichier `.env.local`
(voir `.env.example`) :

```
NEXT_PUBLIC_WHATSAPP=212600000000
NEXT_PUBLIC_BOUTIQUE_NOM=Atelier Yasmine
NEXT_PUBLIC_BOUTIQUE_VILLE=Casablanca
NEXT_PUBLIC_BOUTIQUE_SOCIAL=https://instagram.com/...
```

Tant que le numéro WhatsApp n'est pas renseigné, le bouton « Envoyer sur WhatsApp » reste désactivé
(la cliente peut quand même **copier** le récapitulatif).

---

## 3. Ajouter vos photos

- **Photos des modèles / tissus / décorations** → dossier `public/products/`.
  Placez vos images (`.jpg`/`.webp`, portrait), puis mettez à jour le champ `photo` dans les
  fichiers de données (voir §4). Une image `placeholder.svg` s'affiche par défaut.
- **Photos de la publicité** → dossier `public/video-assets/` (voir §6).

---

## 4. Modifier les robes, tissus, couleurs et prix

Tout est dans des fichiers **simples et documentés** sous `src/data/` :

| Fichier | Contenu |
|--------|---------|
| `src/data/modeles.ts` | Modèles de robes (nom, référence, photo, **prix de base**, tissus conseillés, délai) |
| `src/data/tissus.ts` | Tissus (photo, description, opacité, épaisseur, souplesse, saison, couleurs, **supplément**, disponibilité) |
| `src/data/couleurs.ts` | Couleurs (nom + code hex) |
| `src/data/options.ts` | Coupe, longueur, manches, col, dos, emplacements (+ suppléments) |
| `src/data/decorations.ts` | Décorations (description, **supplément**, disponibilité) |
| `src/data/occasions.ts` | Occasions |

**Prix estimatif** = prix de base du modèle + supplément tissu + suppléments décorations +
suppléments personnalisations. Modifiez les montants directement dans ces fichiers. Le prix est
toujours présenté comme **estimatif** (confirmé par la boutique).

**Disponibilité** : un tissu/décoration `indisponible` n'est jamais proposé comme commandable ; si
le stock est inconnu, mettez `"a_confirmer"` (affiché « À confirmer »).

---

## 5. Lancer / construire le site

```bash
npm run dev        # développement (http://localhost:3000)
npm run build      # build de production
npm run start      # sert le build de production
npm run lint       # ESLint
npm run typecheck  # vérification TypeScript
npm test           # tests (conversions, prix, message WhatsApp)
```

---

## 6. Publicité vidéo (Remotion)

Format **1080×1920**, 30 fps, ~23 s (6 scènes), texte lisible sans son, zones de sécurité
Reels/TikTok respectées. La vidéo s'exporte **sans aucune image** (fonds élégants de secours).

**Ajouter vos médias** : placez 5 à 8 photos dans `public/video-assets/` (ex : `robe-1.jpg`),
puis listez leurs noms dans le tableau `PHOTOS` en haut de `src/remotion/Video.tsx`.
N'ajoutez **aucun média protégé par des droits d'auteur**.

**Prévisualiser (studio)** :

```bash
npm run video:studio
```

**Exporter la vidéo (MP4)** :

```bash
npm run video:render
# => public/video-assets/pub-robe.mp4
```

> Remotion télécharge automatiquement un navigateur la première fois. Dans un environnement où ce
> n'est pas possible, ajoutez `--browser-executable=<chemin vers chrome-headless-shell>`.

**Musique** (facultatif) : placez un fichier libre de droits dans `public/video-assets/`
(ex : `music.mp3`) et décommentez le bloc `<Audio>` dans `src/remotion/Video.tsx`.

### Textes de la publicité

**Version storyboard** (par défaut dans la vidéo) :
1. « Une robe magnifique… mais jamais à votre taille ? »
2. « Choisissez votre modèle préféré »
3. « Entrez simplement vos mensurations »
4. « Envoyez votre demande en quelques minutes »
5. « Confectionnée spécialement pour vous »
6. « [Boutique] — Choisissez votre robe, commande et confirmation sur WhatsApp »

**Variante plus naturelle** (sans promesse mensongère) :
1. « Vous aimez une robe, mais elle ne tombe jamais parfaitement ? »
2. « Choisissez le modèle qui vous plaît »
3. « Prenez vos mesures, guidée pas à pas »
4. « Envoyez votre demande sur WhatsApp, tranquillement »
5. « Une robe pensée pour vous »
6. « [Boutique] — on en discute sur WhatsApp, sans engagement »

---

## 7. Déployer

Le site est une application Next.js standard.

- **Vercel** (recommandé, gratuit) : importez le dépôt, dossier racine = `robe-sur-mesure/`, puis
  déployez. Ajoutez vos variables d'environnement (§2) dans les réglages du projet.
- **Autre hébergeur Node** : `npm run build` puis `npm run start`.

La publicité vidéo se rend **en local** (`npm run video:render`) puis se téléverse manuellement sur
Facebook / Instagram / TikTok.

---

## 8. Confidentialité & sécurité

- Aucune donnée n'est envoyée automatiquement. Les informations ne quittent l'appareil que lorsque
  la cliente appuie sur « Envoyer sur WhatsApp ».
- Les mensurations ne figurent **jamais** dans une URL publique (uniquement dans le message WhatsApp
  déclenché par la cliente).
- Les données sont stockées **localement** (navigateur) et effacées après l'envoi ; un bouton
  « Effacer mes informations » est disponible sur la page Confidentialité.
- Aucun traceur publicitaire. Toutes les entrées sont nettoyées et validées.

---

Fait avec ❤️ — projet de démonstration. Remplacez les données d'exemple par les vôtres.
