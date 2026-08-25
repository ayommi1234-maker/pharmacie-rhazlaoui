import type { Decoration } from "@/lib/types";

/** Décorations (étape 5). Données de démonstration — modifiez librement. */
export const DECORATIONS: Decoration[] = [
  { id: "sans", nom: "Sans décoration", description: "Robe épurée, sans ornement.", image: "/products/placeholder.svg", supplementDH: 0, disponibilite: "en_stock" },
  { id: "broderie_simple", nom: "Broderie simple", description: "Broderie discrète sur une zone.", image: "/products/placeholder.svg", supplementDH: 80, disponibilite: "en_stock" },
  { id: "broderie_trad", nom: "Broderie traditionnelle", description: "Broderie marocaine travaillée (sfifa, aqqad).", image: "/products/placeholder.svg", supplementDH: 200, disponibilite: "en_stock" },
  { id: "perles", nom: "Perles", description: "Perles cousues à la main.", image: "/products/placeholder.svg", supplementDH: 150, disponibilite: "sur_commande" },
  { id: "strass", nom: "Strass", description: "Strass pour un effet lumineux.", image: "/products/placeholder.svg", supplementDH: 120, disponibilite: "en_stock" },
  { id: "sequins", nom: "Sequins", description: "Sequins scintillants.", image: "/products/placeholder.svg", supplementDH: 120, disponibilite: "en_stock" },
  { id: "dentelle", nom: "Dentelle", description: "Empiècements de dentelle.", image: "/products/placeholder.svg", supplementDH: 100, disponibilite: "sur_commande" },
  { id: "ceinture", nom: "Ceinture assortie", description: "Mdamma / ceinture coordonnée.", image: "/products/placeholder.svg", supplementDH: 90, disponibilite: "en_stock" },
  { id: "boutons_deco", nom: "Boutons décoratifs", description: "Boutons faits main (aqqad).", image: "/products/placeholder.svg", supplementDH: 60, disponibilite: "en_stock" },
  { id: "galon", nom: "Galon", description: "Galon/passementerie sur les bords.", image: "/products/placeholder.svg", supplementDH: 70, disponibilite: "en_stock" },
  { id: "doublure", nom: "Doublure", description: "Doublure intérieure pour le confort.", image: "/products/placeholder.svg", supplementDH: 110, disponibilite: "en_stock" },
  { id: "poches", nom: "Poches", description: "Poches latérales discrètes.", image: "/products/placeholder.svg", supplementDH: 40, disponibilite: "en_stock" },
  { id: "traine", nom: "Traîne", description: "Traîne à l'arrière.", image: "/products/placeholder.svg", supplementDH: 180, disponibilite: "sur_commande" },
  { id: "perso", nom: "Détails personnalisés", description: "À décrire dans les notes.", image: "/products/placeholder.svg", supplementDH: 0, disponibilite: "a_confirmer" },
];

export function decorationParId(id: string): Decoration | undefined {
  return DECORATIONS.find((d) => d.id === id);
}
