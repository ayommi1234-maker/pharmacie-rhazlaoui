import type { Gamme, PharmacieInfo, Photo, ProduitIndexe } from "@/data/types";

/** Tout ce dont une proposition de page d'accueil a besoin. Données réelles uniquement. */
export type DonneesAccueil = {
  pharmacie: PharmacieInfo;
  gammes: (Gamme & { slug: string; total: number })[];
  produits: ProduitIndexe[];
  selection: ProduitIndexe[];
  photos: Photo[];
  rayons: { cle: string; libelle: string; total: number }[];
  marques: string[];
  offres: { id: string; titre: string; description: string; image: string }[];
};

/**
 * Raccourcis de recherche proposés sur plusieurs variantes.
 * Chaque libellé est un **besoin** exprimé par la cliente ; le `q` est envoyé
 * au catalogue, où la table de synonymes fait le lien avec les produits.
 */
export const BESOINS = [
  { libelle: "Tension", q: "tension" },
  { libelle: "Vitamines", q: "vitamine" },
  { libelle: "Peau sèche", q: "peau seche" },
  { libelle: "Cheveux", q: "cheveux" },
  { libelle: "Bébé", q: "bebe" },
  { libelle: "Articulations", q: "articulation" },
  { libelle: "Sommeil", q: "sommeil" },
  { libelle: "Fatigue", q: "fatigue" },
] as const;

export const lienRecherche = (q: string) => `/produits/?q=${encodeURIComponent(q)}`;
