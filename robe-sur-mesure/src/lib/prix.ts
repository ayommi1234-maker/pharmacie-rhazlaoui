import type { Modele, Tissu, Decoration } from "@/lib/types";

export interface DetailPrix {
  base: number;
  tissu: number;
  decorations: number;
  personnalisations: number;
  total: number;
  /** true si un élément a un prix « à confirmer » (base 0 ou dispo à confirmer). */
  aConfirmer: boolean;
}

/**
 * Prix estimatif = base modèle + supplément tissu + suppléments décorations
 * + suppléments personnalisations. TOUJOURS présenté comme estimatif.
 */
export function estimerPrix(args: {
  modele?: Modele;
  tissu?: Tissu;
  decorations: Decoration[];
  supplementsPerso: number;
}): DetailPrix {
  const base = args.modele?.prixBaseDH ?? 0;
  const tissu = args.tissu?.supplementDH ?? 0;
  const decorations = args.decorations.reduce((s, d) => s + (d.supplementDH || 0), 0);
  const personnalisations = Math.max(0, args.supplementsPerso || 0);
  const total = base + tissu + decorations + personnalisations;

  const aConfirmer =
    base <= 0 ||
    args.tissu?.disponibilite === "a_confirmer" ||
    args.decorations.some((d) => d.disponibilite === "a_confirmer");

  return { base, tissu, decorations, personnalisations, total, aConfirmer };
}

export function formatDH(montant: number): string {
  return `${montant.toLocaleString("fr-FR")} DH`;
}
