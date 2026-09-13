/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export 100 % statique : Netlify sert `out/` comme l'ancien site servait la racine.
  output: "export",
  // Chaque route devient un dossier avec `index.html` → URLs propres sans serveur.
  trailingSlash: true,
  // L'optimiseur d'images de Next exige un serveur : inutilisable en export statique.
  // Nos images sont déjà compressées (JPEG ~82, max 1200 px) et servies telles quelles.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
