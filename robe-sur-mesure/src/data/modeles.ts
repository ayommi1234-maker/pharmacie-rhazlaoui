import type { Modele } from "@/lib/types";

/**
 * Modèles de robes (étape 1 + catalogue). DONNÉES DE DÉMONSTRATION (`demo: true`).
 * Remplacez `photo` par vos vraies images placées dans /public/products.
 * `prixBaseDH: 0` => affiché « À partir de … DH » (à confirmer).
 */
export const MODELES: Modele[] = [
  { id: "caftan", nom: "Caftan marocain", reference: "CAF-001", description: "Caftan traditionnel, coupe fluide et col travaillé.", photo: "/products/hero-caftan-bordeaux.png", prixBaseDH: 900, tissusConseilles: ["brocart","satin","velours"], delaiEstime: "10 à 20 jours", demo: true },
  { id: "takchita", nom: "Takchita", reference: "TAK-002", description: "Deux pièces de cérémonie avec ceinture (mdamma).", photo: "/products/placeholder.svg", prixBaseDH: 1200, tissusConseilles: ["brocart","satin","dentelle"], delaiEstime: "14 à 25 jours", demo: true },
  { id: "djellaba", nom: "Djellaba femme", reference: "DJE-003", description: "Djellaba élégante à capuche, port quotidien ou fête.", photo: "/products/placeholder.svg", prixBaseDH: 600, tissusConseilles: ["lin","coton","crepe"], delaiEstime: "7 à 14 jours", demo: true },
  { id: "abaya", nom: "Abaya", reference: "ABA-004", description: "Abaya moderne, coupe droite et sobre.", photo: "/products/placeholder.svg", prixBaseDH: 500, tissusConseilles: ["crepe","satin","coton"], delaiEstime: "7 à 14 jours", demo: true },
  { id: "soiree", nom: "Robe de soirée", reference: "SOI-005", description: "Robe de soirée ajustée, finitions raffinées.", photo: "/products/placeholder.svg", prixBaseDH: 800, tissusConseilles: ["satin","soie","velours"], delaiEstime: "10 à 20 jours", demo: true },
  { id: "longue", nom: "Robe longue", reference: "LON-006", description: "Robe longue fluide, polyvalente.", photo: "/products/placeholder.svg", prixBaseDH: 550, tissusConseilles: ["mousseline","crepe","satin"], delaiEstime: "7 à 15 jours", demo: true },
  { id: "mariage", nom: "Robe de mariage", reference: "MAR-007", description: "Robe de mariée sur mesure, broderies et traîne possibles.", photo: "/products/placeholder.svg", prixBaseDH: 2500, tissusConseilles: ["dentelle","satin","tulle"], delaiEstime: "20 à 40 jours", demo: true },
  { id: "traditionnelle", nom: "Robe traditionnelle", reference: "TRA-008", description: "Robe traditionnelle marocaine, motifs et broderies.", photo: "/products/placeholder.svg", prixBaseDH: 1000, tissusConseilles: ["brocart","velours","satin"], delaiEstime: "14 à 25 jours", demo: true },
  { id: "perso", nom: "Modèle personnalisé (à partir d'une photo)", reference: "PERSO-000", description: "Envoyez une image d'inspiration. La reproduction exacte n'est pas garantie ; le modèle sera confirmé par la couturière.", photo: "/products/placeholder.svg", prixBaseDH: 0, tissusConseilles: [], delaiEstime: "À confirmer", demo: true, personnalisableParPhoto: true },
];

export function modeleParId(id?: string): Modele | undefined {
  return MODELES.find((m) => m.id === id);
}

/** 4 modèles mis en avant dans le catalogue (démonstration). */
export const MODELES_VEDETTES = MODELES.filter((m) =>
  ["caftan", "takchita", "soiree", "mariage"].includes(m.id)
);
