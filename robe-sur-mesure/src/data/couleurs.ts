import type { Couleur } from "@/lib/types";

/** Couleurs disponibles (données de démonstration). Modifiez librement. */
export const COULEURS: Couleur[] = [
  { id: "noir", nom: "Noir", hex: "#1A1A1A" },
  { id: "blanc_casse", nom: "Blanc cassé", hex: "#F3ECE1" },
  { id: "beige", nom: "Beige", hex: "#D9C7A7" },
  { id: "marron", nom: "Marron", hex: "#6B4A2B" },
  { id: "bordeaux", nom: "Bordeaux", hex: "#7A2E33" },
  { id: "rouge", nom: "Rouge", hex: "#B3242B" },
  { id: "rose_poudre", nom: "Rose poudré", hex: "#E4C1C1" },
  { id: "vert_emeraude", nom: "Vert émeraude", hex: "#1F6E5A" },
  { id: "vert_olive", nom: "Vert olive", hex: "#6E6B3A" },
  { id: "bleu_marine", nom: "Bleu marine", hex: "#26324D" },
  { id: "bleu_ciel", nom: "Bleu ciel", hex: "#A9C7DE" },
  { id: "violet", nom: "Violet", hex: "#6C4A73" },
  { id: "dore", nom: "Doré", hex: "#B9975B" },
  { id: "argente", nom: "Argenté", hex: "#C7C7CC" },
];

export const ID_COULEUR_PERSO = "personnalisee";

export function couleurParId(id?: string): Couleur | undefined {
  return COULEURS.find((c) => c.id === id);
}

