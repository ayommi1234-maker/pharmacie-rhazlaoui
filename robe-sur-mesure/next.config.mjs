/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Photos locales + SVG placeholder : pas besoin de l'optimiseur d'images.
  images: { unoptimized: true },
  eslint: { dirs: ["src"] },
};

export default nextConfig;
