import type { EmplacementDecoration, OptionPrix } from "@/lib/types";

/** Options de personnalisation de la coupe (étape 4). Le supplément est facultatif. */

export interface Option extends OptionPrix {}

export const COUPES: Option[] = [
  { id: "ajustee", nom: "Ajustée", supplementDH: 0 },
  { id: "droite", nom: "Droite", supplementDH: 0 },
  { id: "evasee", nom: "Évasée", supplementDH: 0 },
  { id: "ample", nom: "Ample", supplementDH: 0 },
  { id: "empire", nom: "Coupe empire", supplementDH: 0 },
  { id: "sirene", nom: "Coupe sirène", supplementDH: 150 },
];

export const LONGUEURS: Option[] = [
  { id: "courte", nom: "Courte", supplementDH: 0 },
  { id: "midi", nom: "Midi", supplementDH: 0 },
  { id: "longue", nom: "Longue", supplementDH: 0 },
  { id: "sol", nom: "Jusqu'au sol", supplementDH: 0 },
  { id: "perso", nom: "Longueur personnalisée (cm)", supplementDH: 0 },
];

export const MANCHES: Option[] = [
  { id: "sans", nom: "Sans manches", supplementDH: 0 },
  { id: "courtes", nom: "Manches courtes", supplementDH: 0 },
  { id: "trois_quarts", nom: "Manches trois-quarts", supplementDH: 0 },
  { id: "longues", nom: "Manches longues", supplementDH: 0 },
  { id: "bouffantes", nom: "Manches bouffantes", supplementDH: 50 },
  { id: "evasees", nom: "Manches évasées", supplementDH: 50 },
  { id: "perso", nom: "Manches personnalisées", supplementDH: 0 },
];

export const COLS: Option[] = [
  { id: "rond", nom: "Rond", supplementDH: 0 },
  { id: "v", nom: "En V", supplementDH: 0 },
  { id: "carre", nom: "Carré", supplementDH: 0 },
  { id: "montant", nom: "Montant", supplementDH: 0 },
  { id: "bateau", nom: "Bateau", supplementDH: 0 },
  { id: "cache_coeur", nom: "Cache-cœur", supplementDH: 0 },
  { id: "perso", nom: "Col personnalisé", supplementDH: 0 },
];

export const DOS: Option[] = [
  { id: "ferme", nom: "Fermé", supplementDH: 0 },
  { id: "decollete", nom: "Décolleté", supplementDH: 0 },
  { id: "fermeture", nom: "Avec fermeture", supplementDH: 0 },
  { id: "boutons", nom: "Avec boutons", supplementDH: 40 },
  { id: "lacage", nom: "Avec laçage", supplementDH: 60 },
];

export const EMPLACEMENTS: { id: EmplacementDecoration; nom: string }[] = [
  { id: "col", nom: "Col" },
  { id: "poitrine", nom: "Poitrine" },
  { id: "manches", nom: "Manches" },
  { id: "taille", nom: "Taille" },
  { id: "dos", nom: "Dos" },
  { id: "bas", nom: "Bas de la robe" },
  { id: "toute", nom: "Toute la robe" },
  { id: "personnalise", nom: "Emplacement personnalisé" },
];

/** Retrouve le libellé d'une option par liste + id. */
export function libelle(liste: Option[], id?: string): string {
  return liste.find((o) => o.id === id)?.nom ?? "—";
}

export function supplementOption(liste: Option[], id?: string): number {
  return liste.find((o) => o.id === id)?.supplementDH ?? 0;
}

