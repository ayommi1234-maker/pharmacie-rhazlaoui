/** Constantes de navigation et petits utilitaires de liens. Aucun accès disque. */

export const NAV = [
  { href: "/", libelle: "Accueil" },
  { href: "/produits/", libelle: "Produits" },
  { href: "/gammes/", libelle: "Nos gammes" },
  { href: "/galerie/", libelle: "Galerie" },
  { href: "/conseils/", libelle: "Conseils santé" },
  { href: "/contact/", libelle: "Contact & horaires" },
] as const;

/** Lien téléphone : on retire tout sauf les chiffres et un éventuel « + ». */
export function lienTel(numero: string): string {
  return `tel:${(numero ?? "").replace(/[^\d+]/g, "")}`;
}

/** Recherche de l'adresse sur OpenStreetMap (pas de clé d'API, pas de traceur). */
export function lienCarte(adresse: string): string {
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(adresse)}`;
}

/** Ville extraite de l'adresse pour le référencement local. */
export const VILLE = "Khouribga";
