import type { Tissu } from "@/lib/types";

/**
 * Tissus disponibles (étape 2). Données de démonstration.
 * `couleursDisponibles` référence les ids de src/data/couleurs.ts.
 * Un tissu `indisponible` ne doit jamais apparaître comme commandable.
 * Si le stock n'est pas renseigné => `a_confirmer` (affiché « À confirmer »).
 */
const TOUTES = [
  "noir","blanc_casse","beige","marron","bordeaux","rouge","rose_poudre",
  "vert_emeraude","vert_olive","bleu_marine","bleu_ciel","violet","dore","argente",
];

export const TISSUS: Tissu[] = [
  { id: "satin", nom: "Satin", photo: "/products/placeholder.svg", description: "Brillant et fluide, tombé élégant.", opacite: "opaque", epaisseur: "moyen", souplesse: "fluide", saison: ["printemps","été","automne"], couleursDisponibles: TOUTES, supplementDH: 0, disponibilite: "en_stock" },
  { id: "soie", nom: "Soie", photo: "/products/placeholder.svg", description: "Noble, douce, léger éclat naturel.", opacite: "semi_transparent", epaisseur: "leger", souplesse: "fluide", saison: ["printemps","été"], couleursDisponibles: ["blanc_casse","beige","bordeaux","bleu_marine","dore","noir","vert_emeraude"], supplementDH: 250, disponibilite: "sur_commande" },
  { id: "crepe", nom: "Crêpe", photo: "/products/placeholder.svg", description: "Aspect mat, texture granuleuse, structuré.", opacite: "opaque", epaisseur: "moyen", souplesse: "moyen", saison: ["toute saison"], couleursDisponibles: TOUTES, supplementDH: 0, disponibilite: "en_stock" },
  { id: "mousseline", nom: "Mousseline", photo: "/products/placeholder.svg", description: "Très légère et vaporeuse.", opacite: "transparent", epaisseur: "leger", souplesse: "fluide", saison: ["printemps","été"], couleursDisponibles: ["blanc_casse","rose_poudre","bleu_ciel","beige","vert_olive","violet"], supplementDH: 60, disponibilite: "en_stock" },
  { id: "velours", nom: "Velours", photo: "/products/placeholder.svg", description: "Chaud, dense, effet luxueux.", opacite: "opaque", epaisseur: "epais", souplesse: "moyen", saison: ["automne","hiver"], couleursDisponibles: ["noir","bordeaux","bleu_marine","vert_emeraude","marron","violet"], supplementDH: 200, disponibilite: "en_stock" },
  { id: "dentelle", nom: "Dentelle", photo: "/products/placeholder.svg", description: "Ajourée, romantique, souvent en empiècement.", opacite: "transparent", epaisseur: "leger", souplesse: "moyen", saison: ["toute saison"], couleursDisponibles: ["blanc_casse","noir","beige","bordeaux","rose_poudre"], supplementDH: 180, disponibilite: "sur_commande" },
  { id: "brocart", nom: "Brocart", photo: "/products/placeholder.svg", description: "Motifs tissés riches, idéal cérémonie.", opacite: "opaque", epaisseur: "epais", souplesse: "rigide", saison: ["automne","hiver"], couleursDisponibles: ["dore","bordeaux","vert_emeraude","bleu_marine","argente"], supplementDH: 300, disponibilite: "sur_commande" },
  { id: "lin", nom: "Lin", photo: "/products/placeholder.svg", description: "Naturel, respirant, aspect mat.", opacite: "opaque", epaisseur: "moyen", souplesse: "moyen", saison: ["printemps","été"], couleursDisponibles: ["blanc_casse","beige","vert_olive","bleu_ciel","marron"], supplementDH: 0, disponibilite: "en_stock" },
  { id: "coton", nom: "Coton", photo: "/products/placeholder.svg", description: "Confortable, quotidien, facile d'entretien.", opacite: "opaque", epaisseur: "moyen", souplesse: "moyen", saison: ["toute saison"], couleursDisponibles: TOUTES, supplementDH: 0, disponibilite: "en_stock" },
  { id: "tulle", nom: "Tulle", photo: "/products/placeholder.svg", description: "Léger et aérien, pour volumes et voiles.", opacite: "transparent", epaisseur: "leger", souplesse: "fluide", saison: ["printemps","été"], couleursDisponibles: ["blanc_casse","rose_poudre","bleu_ciel","beige"], supplementDH: 80, disponibilite: "a_confirmer" },
  { id: "fourni_cliente", nom: "Tissu fourni par la cliente", photo: "/products/placeholder.svg", description: "Vous fournissez votre propre tissu (à confirmer avec la boutique).", opacite: "opaque", epaisseur: "moyen", souplesse: "moyen", saison: ["toute saison"], couleursDisponibles: TOUTES, supplementDH: 0, disponibilite: "a_confirmer", fourniParCliente: true },
  { id: "autre", nom: "Autre tissu", photo: "/products/placeholder.svg", description: "Autre tissu — à préciser dans les notes.", opacite: "opaque", epaisseur: "moyen", souplesse: "moyen", saison: ["toute saison"], couleursDisponibles: TOUTES, supplementDH: 0, disponibilite: "a_confirmer" },
];

export function tissuParId(id?: string): Tissu | undefined {
  return TISSUS.find((t) => t.id === id);
}

/** Un tissu est-il proposable à la commande ? (jamais si indisponible) */
export function tissuCommandable(t: Tissu): boolean {
  return t.disponibilite !== "indisponible";
}
