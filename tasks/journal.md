# Journal des discussions — Para Rhazlaoui

## 2026-09-17 (mercredi)
**Fait aujourd'hui**
- Vidéo logo : reçu la vidéo de référence (mer, sculpture dorée) puis le logo LR (monogramme + ruban) et son animation.
- Retiré la sculpture d'origine : plaque « une seule pièce » par miroir d'une bande mesurée propre (300 px) — plus de plans recollés.
- Monogramme LR qui sort de l'eau (montée en S 0,5→5,5 s, ondes, gouttes, écume, reflet), nom « LA PARA RHAZLAOUI » en fondu.
- Livrables : `video-para/la-para-rhazlaoui-monogramme.mp4` (carré) et `-vertical.mp4` (Statut/Reels) ; `la-para-rhazlaoui-ruban-sur-mer.mp4` (animation reçue posée sur la mer, sans émergence).
- Sauvegardes : GitHub (branche `claude/reprise-m5zgzn`), archive ZIP datée envoyée dans la discussion, dossier Google Drive « 2026-09-17 Para Rhazlaoui » (notice ; les vidéos ne passent pas par ce connecteur). iCloud : pas d'accès — le ZIP est à y glisser à la main.

**À retenir**
- ⚠ Le logo et l'animation reçus épellent « LAPRA » : à faire corriger en « LA PARA » avant impression/diffusion.
- Musique de la vidéo de référence : droits inconnus, à vérifier avant diffusion publique.
- Les 5 propositions de page d'accueil du site v2 attendent un choix (`/propositions/`).

**Prochaine fois**
- Choisir la page d'accueil (A–E) ou une combinaison.
- Mettre le monogramme LR dans l'en-tête du site et en favicon.
- Éventuellement : faire sortir l'animation « ruban » de l'eau comme le monogramme (≈ 20 min).

### 2026-09-17 (soir) — intros « logo jaillissant + rubans »
- **Fait** : 2 intros monogramme LR (« Jaillissement » 1 s avec rebond, « Élégante » 5 s), rubans dorés avant/arrière autour du logo, gerbe renforcée ; 3 logos dorés dessinés (croix « R », monogramme « PR », feuille « LA PARA ») → 3 intros de plus ; versions verticales ; tout documenté dans `video-para/README.md`.
- **Corrigé** : reflet visible sous l'eau avant la sortie (élégante) ; jointures sur la croix.
- **À décider par le propriétaire** : quel logo garder (LR reçu, ou un des 3 dessinés) ; envoyer d'autres logos si besoin — le pipeline accepte n'importe quel PNG transparent 420×432.
- **Prochaine fois** : intégrer le logo choisi au site v2 (en-tête + favicon), Reels 15 s avec produits.

### 2026-09-17 (nuit) — intros v2 : eau réelle, gouttelettes d'or, fond animé
- **Mesuré** : ligne d'eau réelle à y=785 (les intros précédentes plaçaient le logo sur l'horizon à 630, d'où l'effet « flottant ») ; sculpture absente au-delà de 240 px du bord gauche.
- **Fait** : fond entièrement animé (nuages, brume, mer) reconstruit depuis la bande de 240 px de l'image courante ; rayons lumineux redessinés et animés ; gouttelettes d'or en relief qui jaillissent, retombent et font des anneaux ; logo agrandi et calé sur l'eau ; 3 nouveaux logos (mortier et pilon, coupe d'Hygie, blason R).
- **À décider** : quel logo garder pour l'identité de la pharmacie.
- **Prochaine fois** : intégrer le logo choisi au site (en-tête + favicon).

### 2026-09-20 — logotype LAPARA
- **Fait** : logo « LAPARA » en lettres d'or (filets à losange, RHAZLAOUI et PARAPHARMACIE dessous), intro carrée et verticale montées avec le même décor (eau réelle, gouttelettes d'or, rubans, nuages animés).
- **Corrigé** : le reflet blanc diagonal argentait certaines lettres ; adouci pour tous les logos.
- **Note** : génération vidéo « réaliste » via les bibliothèques connectées non lancée — Higgsfield à 0 crédit, ElevenLabs estimé à ~5 090 crédits (≈0,51 $) pour 10 s. En attente d'accord explicite. Aucun crédit dépensé.

### 2026-09-20 (suite) — polices locales, 5 designs LAPARA, feuilles dorées
- **Découvert et corrigé** : Google Fonts inaccessible depuis le navigateur de rendu (certificat du proxy) — tous les logos précédents utilisaient une police de secours. Polices désormais téléchargées dans `video-para/polices/`.
- **Fait** : 5 designs du logo LAPARA (filets, emblème rond, plaque gravée, moderne, signature manuscrite) + intros vidéo pour chacun.
- **Choix du propriétaire** : la **signature manuscrite**, enrichie d'une branche de petites feuilles dorées.
- **Prochaine fois** : décliner la signature pour le site (en-tête, favicon) et vérifier le rendu en petite taille.

### 2026-09-20 (suite) — bouteille tournante
- **Fait** : logo Lapara imprimé sur une bouteille en verre ambré qui tourne sur elle-même en sortant lentement de l'eau (comme la sculpture de la vidéo de référence) ; rubans dorés en dégradé parcourus par une lumière blanche.
- **Corrigé** : fantôme du reflet au-dessus de l'eau (reflet désormais découpé sous la ligne d'eau) ; rayures verticales de l'étiquette (tranches chevauchées) ; logo trop large pour l'arc visible.
- **Prochaine fois** : décliner la signature sur le site (en-tête, favicon).

### 2026-09-20 (fin) — logo courbé tournant
- **Malentendu levé** : « tourner comme écrit sur une bouteille » voulait dire le **logo seul courbé** sur un cylindre invisible, pas une bouteille visible. Question posée, réponse obtenue, version refaite.
- **Fait** : `logo-cylindre.html` — logo courbé qui tourne et finit face caméra, deux exemplaires opposés pour ne jamais avoir d'image vide, effacement des bords et éclairage cylindrique appliqués aux seules lettres.
- **En attente** : sens de « styl alpham » ; pose de l'identité Lapara sur le site.
