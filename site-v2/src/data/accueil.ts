import type { DonneesAccueil } from "@/components/propositions/donnees";
import {
  categories,
  gammes,
  infos,
  marques,
  offres,
  photos,
  produitsDeGamme,
  slugGamme,
  tousLesProduits,
} from "./source";

/**
 * Assemble une fois les données réelles servies aux 5 propositions de page d'accueil,
 * pour qu'elles soient strictement comparables (même contenu, mise en page différente).
 */
export function donneesAccueil(): DonneesAccueil {
  const produits = tousLesProduits();

  // Mise en avant : produits réellement badgés, puis ceux qui ont une photo.
  // Aucun « best-seller » inventé.
  const avecBadge = produits.filter((p) => p.badge);
  const selection = [
    ...avecBadge,
    ...produits.filter((p) => !p.badge && (p.imagePerso || p.image)),
  ].slice(0, 8);

  return {
    pharmacie: infos(),
    gammes: gammes().map((g) => ({
      ...g,
      slug: slugGamme(g),
      total: produitsDeGamme(g).length,
    })),
    produits,
    selection,
    photos: photos(),
    rayons: categories(),
    marques: marques(),
    offres: offres().map(({ id, titre, description, image }) => ({
      id,
      titre,
      description,
      image,
    })),
  };
}
