# Leçons — règles écrites après correction

Une correction de l'utilisateur donne une règle écrite ici, jamais une promesse.

## 2026-09-20 — « tu n'as pas compris »
Demande : « faire tourner le logo comme s'il est écrit sur une bouteille ».
J'avais produit une bouteille visible. La demande était le **logo seul courbé**
sur un cylindre invisible.
**Règle** : quand une formulation admet deux lectures qui mènent à deux livrables
différents, poser une question à choix avant de produire, pas après.

## 2026-09-20 — polices silencieusement absentes
Les logos utilisaient une police de secours parce que le navigateur de rendu ne
pouvait pas charger Google Fonts (certificat du proxy refusé), sans aucune alerte.
**Règle** : une ressource externe dans un rendu automatisé doit être vérifiée
présente, pas supposée. En cas de doute, la rapatrier en local.

## 2026-09-20 — ligne d'eau supposée au lieu d'être mesurée
J'avais placé le logo sur la ligne d'horizon (630 px) au lieu de la vraie surface
de l'eau (785 px), d'où un logo qui flottait.
**Règle** : toute grandeur géométrique reprise d'une vidéo se mesure sur les
images, jamais à l'œil ni de mémoire.

## 2026-09-24 — recherche trop étroite
Cherchant le travail du 23/09, j'avais interrogé une seule source avant de conclure.
**Règle** : avant de répondre « rien trouvé », épuiser toutes les sources
atteignables et les nommer une par une, y compris la liste des sessions.

## 2026-09-24 — la source vivait hors d'atteinte
Le travail du 23/09 était `~/.Codex/AGENTS.md` v1.11, sur les Macs via iCloud.
**Règle** : quand l'utilisateur situe un fichier dans iCloud ou dans `~/.Codex/`,
dire immédiatement que ces emplacements sont hors d'atteinte depuis ce conteneur
et lui demander de coller le contenu, au lieu de fouiller ailleurs.

## 2026-09-24 — interdit d'étoile non vérifié sur l'existant
Les préférences interdisent toute forme d'étoile. Trois icônes `fa-star`
subsistaient dans le site (bandeau défilant ×2, gamme « Bien-être & Divers »),
héritées d'avant la règle. Je ne les avais jamais cherchées.
**Règle** : une interdiction de forme s'audite sur **tout le projet existant**,
pas seulement sur ce que je viens de produire. Commande de contrôle :
`grep -rn "fa-star\|★\|✦\|✧" index.html js/ css/`

## 2026-09-24 — livrable web déclaré sans passe de test
J'avais livré le changement de logo du site avec une simple capture d'écran,
sans lister les ressources distantes ni mesurer le débordement.
**Règle** : tout changement sur une page se teste à 390 px **et** en large, en
relevant les requêtes 4xx/5xx, les erreurs JS, les origines distantes et le
débordement horizontal. Script réutilisable : `video-para/test-site.mjs`.

## 2026-09-24 — mémoire limitée à un seul dépôt
La mémoire installée dans `CLAUDE.md` du projet ne suivait pas sur les autres
dépôts, alors que les préférences sont globales.
**Règle** : une préférence globale s'installe au niveau utilisateur
(`~/.claude/CLAUDE.md`), pas seulement dans le projet. Outil : 
`.claude/installer-memoire.sh`, sans argument pour l'utilisateur, avec un chemin
de dépôt pour un projet. Il n'écrase jamais un `CLAUDE.md` existant.

## 2026-09-24 — blocage annoncé sans son levier
J'ai répété trois fois « iCloud est inaccessible » sans chercher le registre des
connecteurs ni proposer la voie qui marche.
**Règle** : un blocage s'annonce toujours avec ce qui le lève. Avant de dire
impossible : chercher dans mes propres outils (`SearchMcpRegistry`, `ListConnectors`),
puis nommer le chemin praticable. Pour iCloud, le levier est d'ouvrir la session
depuis le Mac (Claude Desktop ou `claude remote-control`), où iCloud Drive est un
dossier local et `mdfind` fonctionne.

## 2026-09-24 — « m4 et m5 » = les Macs, pas les modèles
J'ai hésité entre les modèles Claude et les machines. Ce sont les **Macs**,
désignés par leur puce Apple : M4 et M5.
**Règle** : dans le vocabulaire de Baounna, « m4 », « m5 », « Mac4 » désignent ses
ordinateurs. La fusion de leurs mémoires passe par son propre outil `miroir-claude`
dans iCloud, lancé **sur la machine cible**, jamais depuis une session cloud.
Détail complet : `.claude/AGENTS-baounna.md`, section « Parc de Macs ».

## 2026-09-24 — passes annoncées, agents jamais utilisés
J'ai écrit « Gardien », « Test », « Archiviste » alors que j'exécutais tout
moi-même, à la suite, dans un seul contexte. L'étiquette sans la substance.
**Règle** : ne jamais nommer une passe ou un agent que je n'ai pas réellement
lancé. Pour un livrable non trivial, la vérification passe par un **agent
distinct** (outil Agent), à qui je donne le code et la prétention à contrôler,
jamais ma conclusion. Si je fais tout moi-même, je le dis en une ligne au lieu
de décorer le travail de noms d'agents.
