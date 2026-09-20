# Habillage vidéo — LA PARA RHAZLAOUI

Animation du nom en lettres capitales dorées qui **sortent de la mer en tournant
en hélice**, inspirée de la vidéo de référence fournie par la propriétaire.

## Quatre versions

### ★ Monogramme LR (celle retenue)
Le logo fourni par la propriétaire — monogramme **LR** doré au ruban hélicoïdal —
à la place exacte de l'ancienne sculpture. Il sort de la vraie mer, se reflète sur
l'eau, puis le nom apparaît dessous. Ancienne sculpture réellement retirée (plaque
propre, voir plus bas).

| Fichier | Format |
|---|---|
| `la-para-rhazlaoui-monogramme.mp4` | 960×960, 24 i/s |
| `la-para-rhazlaoui-monogramme-vertical.mp4` | 1080×1920 |

- `monogramme.png` : le logo détouré (alpha = luminance : l'or devient opaque, le
  noir transparent), **sans le texte du logo d'origine**, qui contenait une faute
  (« LAPRA »). Le nom est réécrit par `drawtext` : « LA PARA RHAZLAOUI ».
- `montage-logo.txt` : le graphe ffmpeg complet (plaque → halo → montée du
  monogramme → cache de la partie immergée → reflet → réaction de l'eau → nom).
- **Montée** : de 0,5 s à 5,5 s, courbe en S (`smoothstep`), pour qu'on voie
  réellement le logo traverser la surface (la première version, avec une sortie
  cubique, avait fait 75 % du trajet en 2,5 s : il « surgissait »).
- **Réaction de l'eau** (`scene.html?emergence=1`, rendu par `rendu.mjs … emergence`) :
  ondes concentriques émises toutes les 0,3 s pendant la montée, gerbe de gouttes
  avec gravité, écume lumineuse à la base proportionnelle à la vitesse de sortie,
  filets de ruissellement le long du logo. Calque transparent superposé en dernier.

### 0. Logo formé par les lettres
Les lettres **forment elles-mêmes le logo** : une colonne en spirale à la place
exacte de l'ancienne sculpture, qui sort de la vraie mer et tourne en continu ;
sphère d'or au sommet, en écho à l'original. On lit le nom au fil de la rotation,
et le sous-titre le donne en clair.

**Fond d'une seule pièce** (`plaque2.txt`) : la propriétaire avait repéré que la
première plaque « recollait des plans » (deux traits verticaux, texture différente
au centre). Nouvelle méthode, sans aucune couture : on ne garde que la bande gauche
de 300 px — mesurée comme toujours propre sur les 241 images (la sculpture descend
jusqu'à 248 px du bord) — mise en **miroir autour de son bord** (continuité
parfaite), puis étirée à la largeur du cadre. Ciel/brume/montagnes pris à l'image 0,
eau prise à l'image courante (elle bouge), faisceau de lumière remis depuis
l'image 0. Résultat : scène symétrique, rayons convergents, traînée dorée naturelle
dans l'eau sous le logo.

Ancienne méthode (`plaque.txt`, conservée pour mémoire) — « plaque propre » par
bandes étirées :
- au-dessus de y=130 (source de lumière) : l'image 0, où la sculpture est encore
  basse, donc cette zone est propre ;
- en dessous : les bandes latérales de l'image **courante** (x 0–200 et 760–960,
  toujours propres), étirées et retournées pour remplir la colonne centrale
  x 200–760. Le retournement garantit la continuité aux bords (pas de couture) ;
  l'eau continue donc de bouger.
Le filtre est dans `plaque.txt`. Effets visibles et assumés : les montagnes du
centre sont un miroir des bords (elles changent de forme au fil du plan, comme
celles de la source, générée par IA) ; les rayons font un léger « V » aux bords
de la colonne.

| Fichier | Format |
|---|---|
| `la-para-rhazlaoui-logo-helice.mp4` | 960×960, 24 i/s (format d'origine) |
| `la-para-rhazlaoui-logo-helice-vertical.mp4` | 1080×1920 |

Réglages dans `scene.html`, objet `HELICE` : `taille` (corps des lettres),
`pas` (montée par lettre), `rayon`, `tours`, `vitesse` (°/s), `montee` (durée
d'émergence). Rendu : `node rendu.mjs helice 24 10.04 helice 960`, puis le même
montage ffmpeg que la version 1 avec `helice/` au lieu de `calque/`
(halo réglé à `brightness=-0.05`).

### 1. Nom en deux lignes sur la vidéo d'origine
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

## Intros « logo qui jaillit de l'eau + ruban » (17 septembre 2026)

Demande : des intros comme la vidéo de référence — logo en or qui **jaillit** de l'eau,
avec des **rubans dorés qui tournent autour**. Pipeline 100 % local (ffmpeg + Chromium).

Calques rendus par `rendu.mjs` (transparents, 960×960, 24 i/s) :

| commande | rôle |
|---|---|
| `node rendu.mjs em-jaillir 24 10.04 emergence 960 "courbe=jaillir"` | gerbe, anneaux, écume (sortie brusque 0,4→1,7 s, rebond) |
| `node rendu.mjs em-douce 24 10.04 emergence 960 "courbe=douce"` | idem, montée lente 0,5→5,5 s |
| `node rendu.mjs rub-ar 24 10.04 rubans 960 "rubans=arriere&debut=1.4"` | moitié du ruban **derrière** le logo |
| `node rendu.mjs rub-av 24 10.04 rubans 960 "rubans=avant&debut=1.4"` | moitié du ruban **devant** le logo |

Le ruban est coupé en deux moitiés (`sin(angle)` > 0 = devant) pour qu'il tourne vraiment
*autour* du logo. Montage : `montage-jaillissement.txt`, `montage-elegante.txt`,
`montage-logos.txt` (inputs : 0 seq.mp4, 1 plein-00.png en boucle, 2 le logo PNG,
3 gerbe, 4 ruban arrière, 5 ruban avant). Dans « élégante », le reflet n'apparaît qu'à
4,2 s (avant, il se voyait sous l'eau avant la sortie du logo).

Logos dessinés en or (Canvas, police Cinzel via Google Fonts, extrusion + dégradé + brillance)
dans `logos.html`, rendus par `node rendu-logo.mjs croix|pr|feuille` → `logo-*.png` (420×432).

Livrables : `intro-jaillissement.mp4`, `intro-elegante.mp4` (monogramme LR),
`intro-croix.mp4`, `intro-pr.mp4`, `intro-feuille.mp4` (+ `-vertical.mp4` 1080×1920).

Limites honnêtes : les logos sont des images plates (pas de vraie 3D tournante) ; la mer
est celle de la référence (droits de la musique à vérifier avant diffusion publique).

## Version 2 des intros — ligne d'eau réelle, gouttelettes d'or, fond animé (17 sept. 2026)

Trois corrections mesurées sur la vidéo source, et non estimées à l'œil :

1. **Ligne d'eau à y = 785** (et non 630). Vérifiée en agrandissant la base de la
   sculpture image par image : c'est là que l'or rencontre son reflet. Les versions
   précédentes plaçaient le logo sur la ligne d'horizon, d'où l'impression qu'il flottait.
2. **Fond entièrement animé** (`plaque3.txt`). Mesure `signalstats` sur toutes les images :
   au-delà de 240 px depuis le bord gauche, la sculpture apparaît (or max 235 à 260 px,
   16 à 240 px). On prend donc la bande de 240 px de **l'image courante**, on la
   symétrise puis on l'étire à 960. Nuages, brume et mer bougent ; aucune image figée.
3. **Rayons redessinés** (`?rayons=1`) : le haut de l'image contient de l'or à toutes les
   hauteurs (les billes montent très haut), impossible de le reprendre de la source.
   7 faisceaux translucides, floutés à 34 px, qui dérivent et « respirent ».

Gouttelettes d'**or** (`dessineEmergence`) : 150 sphères métalliques avec dégradé,
éclat spéculaire, halo chaud et traînée orientée selon la vitesse. Trajectoire
parabolique réelle (montée puis chute) ; à la retombée, un anneau doré s'ouvre sur l'eau.

Montage : `montage-v2.txt`. Logo agrandi à 560×576, base calée sur y = 785,
course de 800 → 218 px. Reflet dégradé par `geq` (plus de rectangle visible).

Logos ajoutés dans `logos.html` : `mortier`, `coupe` (coupe d'Hygie), `blason`.
Livrables : `intro2-{mortier,coupe,blason,monogramme}.mp4` + `-vertical.mp4`.

## Logotype « LAPARA » (20 sept. 2026)

`logos.html?logo=lapara` — le mot **LAPARA** traité comme logotype : filets dorés à
losange, mot ajusté automatiquement à la largeur (`tailleAjustee` mesure le texte et
en déduit la taille de police), puis RHAZLAOUI et PARAPHARMACIE dessous.
Reflet spéculaire du texte adouci (0,16 au lieu de 0,35) pour que les lettres restent
dorées et ne virent pas à l'argent.

Livrables : `logo-lapara.png` (420×432, fond transparent), `intro2-lapara.mp4`,
`intro2-lapara-vertical.mp4`.
