# Continuer le travail sur Mac (MacBook Air M4)

> Tout le projet **La Para Rhazlaoui** est sauvegardé dans le dépôt GitHub.
> Ce guide explique comment le récupérer sur ton Mac et reprendre. iCloud n'est pas utilisé (inaccessible depuis Claude Code).

- **Dépôt** : https://github.com/ayommi1234-maker/pharmacie-rhazlaoui
- **Branche de travail** : `claude/exciting-cray-wkrq3z`
- **Le projet est dans le sous-dossier** : `la-para-rhazlaoui/`
- **Mémoire du projet** : `la-para-rhazlaoui/REPRISE.md` (concept, palette, typos, liens des pages, prochaines étapes)

---

## Option A — Le plus simple (sans rien installer) : télécharger le ZIP
1. Ouvre https://github.com/ayommi1234-maker/pharmacie-rhazlaoui
2. Change de branche : bouton **« main »** en haut à gauche → choisis **`claude/exciting-cray-wkrq3z`**
3. Bouton vert **« Code »** → **« Download ZIP »**
4. Dézippe. Le site est dans le dossier **`la-para-rhazlaoui/`**.
5. Pour voir une page : **double-clique** sur `homepage.html`, `boutique.html`, `catalogue.html`, `produit.html`, `panier.html` (s'ouvrent dans Safari/Chrome).

## Option B — Avec Git (pour continuer à versionner)
Ouvre le **Terminal** (Cmd+Espace → « Terminal ») et colle :

```bash
# 1. Installer git si besoin (macOS le propose automatiquement)
git --version

# 2. Cloner le dépôt
cd ~/Documents
git clone https://github.com/ayommi1234-maker/pharmacie-rhazlaoui.git
cd pharmacie-rhazlaoui

# 3. Se placer sur la branche de travail
git checkout claude/exciting-cray-wkrq3z

# 4. Ouvrir le projet
cd la-para-rhazlaoui
open homepage.html      # ou boutique.html, catalogue.html, produit.html, panier.html
```

Pour prévisualiser proprement (recommandé) :
```bash
# depuis le dossier la-para-rhazlaoui
python3 -m http.server 8000
# puis ouvre http://localhost:8000 dans le navigateur
```

## Option C — Continuer AVEC Claude Code sur ton Mac
1. Installe Claude Code (voir claude.ai/code).
2. Dans le Terminal : `cd ~/Documents/pharmacie-rhazlaoui` puis lance `claude`.
3. Tape **« reprise »** — Claude lira `la-para-rhazlaoui/REPRISE.md` et continuera exactement où on s'est arrêtés.

---

## Contenu du projet
| Fichier (dans `la-para-rhazlaoui/`) | Ce que c'est |
|---|---|
| `homepage.html` | Page d'accueil (hero, rituel interactif, besoins, best-sellers…) |
| `boutique.html` | Compléments & bien-être avec **vraies photos produits retouchées** |
| `catalogue.html` | Catalogue Soins Visage avec filtres |
| `produit.html` | Fiche produit détaillée |
| `panier.html` | Panier + tunnel de commande (4 étapes) |
| `brand-book.html` | Charte de marque + design system |
| `logo-banner.html` | Bannière-logo premium |
| `REPRISE.md` | **La mémoire** : tout le contexte pour reprendre |

Photos produits retouchées : dossier `../images/products-clean/` (à la racine du dépôt).

## Sauvegarder ton travail depuis le Mac (Option B/C)
```bash
git add -A
git commit -m "Mes modifications"
git push
```
