/**
 * URL publique du site, utilisée par le sitemap et `robots.txt`.
 * Valeur par défaut = le domaine Netlify déjà déclaré dans le `robots.txt` historique.
 * Surchargeable par la variable d'environnement `NEXT_PUBLIC_SITE_URL` lors du build
 * (utile le jour où un nom de domaine propre sera branché).
 */
export const URL_SITE = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pharmacie-rhazlaoui.netlify.app"
).replace(/\/+$/, "");
