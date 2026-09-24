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
