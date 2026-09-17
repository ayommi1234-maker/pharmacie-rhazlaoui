# Habillage vidéo — LA PARA RHAZLAOUI

Animation du nom en lettres capitales dorées qui **sortent de la mer en tournant
en hélice**, inspirée de la vidéo de référence fournie par la propriétaire.

## Deux versions

### 1. Sur la vidéo d'origine (celle retenue)
La **vraie** vidéo de référence (mer, rayons, éclaboussures, musique) avec le nom
par-dessus. La sculpture dorée du centre n'est pas effacée — c'est de l'inpainting
vidéo, hors de portée de ffmpeg — mais **fondue en colonne de lumière** : un flou
fort limité à une ellipse centrale la rend illisible comme objet ; elle devient un
halo doré derrière le nom.

| Fichier | Format |
|---|---|
| `la-para-rhazlaoui-sur-video.mp4` | 960×960, 24 i/s (format d'origine) |
| `la-para-rhazlaoui-sur-video-vertical.mp4` | 1080×1920 |

Ce qu'il en reste de visible : quelques petites sphères d'or flottantes (haut et
bords). Elles passent pour des gouttes décoratives ; les effacer proprement
demanderait un outil d'inpainting.

### 2. Entièrement synthétique (première version)
Mer, ciel et rayons redessinés en CSS/canvas. Moins réaliste : conservée pour
référence et parce qu'elle ne dépend d'aucune vidéo tierce.

| Fichier | Format |
|---|---|
| `la-para-rhazlaoui.mp4` | 1080×1080, 30 i/s |
| `la-para-rhazlaoui-vertical.mp4` | 1080×1920 |
| `affiche.jpg` | vignette |

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

## Refabriquer

### Version sur la vidéo d'origine
```bash
cd video-para
python3 -m http.server 4400 &                        # sert scene.html
node rendu.mjs calque 24 10.04 calque 960            # 241 PNG transparents (~1 min)
ffmpeg -i "Séquence 02 2.mp4" -framerate 24 -i calque/img-%04d.png -filter_complex \
 "[0:v]split[a][b];[b]gblur=sigma=42,format=rgba,\
  geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='255*clip((0.95-(pow((X-480)/270,2)+pow((Y-460)/470,2)))/0.5,0,1)'[halo];\
  [a][halo]overlay=0:0[fond];[fond][1:v]overlay=0:0:shortest=1[v]" \
 -map "[v]" -map 0:a -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a copy \
 -movflags +faststart la-para-rhazlaoui-sur-video.mp4
```
`?calque=1` sur `scene.html` masque le décor et ne rend que le nom, son reflet et
les éclaboussures, avec la ligne d'eau calée sur celle de la vidéo (65,6 %).
L'ellipse du halo (`X-480`, `Y-460`, rayons 270 × 470) épouse la sculpture.

### Version synthétique
```bash
node rendu.mjs images 30 10                          # 300 images (~2 min 30)
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
