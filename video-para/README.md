# Habillage vidéo — LA PARA RHAZLAOUI

Animation du nom en lettres capitales dorées qui **sortent de la mer en tournant
en hélice**, inspirée de la vidéo de référence fournie par la propriétaire.

| Fichier | Format | Usage |
|---|---|---|
| `la-para-rhazlaoui.mp4` | 1080×1080, 10 s, 30 i/s | Instagram, Facebook, en-tête de site |
| `la-para-rhazlaoui-vertical.mp4` | 1080×1920 | WhatsApp Statut, Reels, TikTok |
| `affiche.jpg` | image fixe | vignette d'aperçu |

## Comment c'est fait

Aucun service de génération payant : la scène est une **page web** rendue image
par image, puis encodée par ffmpeg.

- `scene.html` — toute l'animation (ciel, rayons, montagnes, mer, lettres en
  hélice, ruban de lumière, éclaboussures, reflet).
  Point clé : la page n'a **aucune horloge interne**. Tout passe par
  `window.poser(t)`, appelée une fois par image. Le rendu est donc strictement
  reproductible — aucune image sautée ni dupliquée, quelle que soit la machine.
- `rendu.mjs` — pilote un navigateur sans interface, appelle `poser(t)` et
  enregistre les 300 images dans `images/` (ignoré par git, régénérable).
- ffmpeg assemble les images et ajoute la bande-son.

## Refabriquer la vidéo

```bash
cd video-para
python3 -m http.server 4400 &          # sert scene.html
node rendu.mjs images 30 10            # 300 images (~2 min 30)
ffmpeg -framerate 30 -i images/img-%04d.png -i musique.m4a \
  -map 0:v -map 1:a -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -shortest -movflags +faststart la-para-rhazlaoui.mp4
```

## Modifier

| Je veux… | Où |
|---|---|
| Changer le texte | `const LIGNES = ["LA PARA", "RHAZLAOUI"]` dans `scene.html` |
| Changer le sous-titre | le `<div id="sous">` |
| Plus ou moins de tours d'hélice | `const spires` dans `poseLettres` |
| Lettres plus rapides / plus lentes | `dep`, `pas`, `duree` dans `poseLettres` |
| Autres teintes d'or | les variables `--or*` en haut du CSS |
| Autre durée | `DUREE` dans `scene.html` **et** l'argument de `rendu.mjs` |

La taille du texte s'ajuste **toute seule** pour tenir dans le cadre : un nom
plus long rétrécira automatiquement, sans débordement.

## Bande-son

`musique.m4a` est extraite de la vidéo fournie par la propriétaire
(`Séquence 02 2.mp4`) avec `ffmpeg -vn`. Elle n'est pas versionnée ici.

⚠️ **À vérifier avant toute publication** : cette musique provient d'une vidéo
générée ou téléchargée ailleurs — je ne connais pas ses droits. Pour une
diffusion publique (Instagram, TikTok, publicité), mieux vaut une piste dont
vous détenez les droits ou une musique libre. Remplacer le fichier suffit,
l'animation ne change pas.
