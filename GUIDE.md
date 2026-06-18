# GUIDE — Site Web Pharmacie Rhazlaoui

## Pour ouvrir le site
Double-cliquez sur **index.html** — s'ouvre dans votre navigateur.

## Pour modifier les PRIX et PHOTOS
### Option 1 — Panneau Admin (le plus simple)
1. Ouvrez **admin/index.html**
2. Modifiez les prix dans les champs
3. Cliquez **Sauvegarder**
4. Onglet **Exporter** → copiez le code → collez-le dans `js/products-data.js`

### Option 2 — Modifier directement le fichier
Ouvrez `js/products-data.js` avec le Bloc-notes et cherchez le produit à modifier.

## Pour ajouter vos PHOTOS
1. Copiez votre photo dans le dossier `images/`
2. Dans `products-data.js`, trouvez le produit et mettez le chemin dans `imagePerso`
   - Exemple : `imagePerso: "images/ma-creme.jpg"`

## Pour les PHOTOS de la pharmacie
Remplacez les placeholders dans la section "Notre Pharmacie" du site :
Dans `index.html`, cherchez `gallery-ph` et remplacez par `<img src="images/votre-photo.jpg"/>`

## Pour les RÉSEAUX SOCIAUX
Dans `js/products-data.js`, tout en bas, mettez vos vrais liens :
- `instagram: "https://www.instagram.com/VOTRE_COMPTE"`
- `tiktok: "https://www.tiktok.com/@VOTRE_COMPTE"`

## Structure des fichiers
```
PHARMACIE RHAZLAOUI/
├── index.html          ← Page principale
├── css/style.css       ← Styles (ne pas modifier sauf si sûr)
├── js/
│   ├── products-data.js ← MODIFIEZ ICI : prix, photos, offres
│   └── script.js        ← Animations (ne pas modifier)
├── admin/index.html    ← Panneau de gestion
└── images/             ← Mettez vos photos ici
```
