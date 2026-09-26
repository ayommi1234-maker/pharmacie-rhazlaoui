"use client";

import { usePathname } from "next/navigation";

/**
 * Masque l'en-tête et le pied de page du site sur les maquettes `/propositions/*`.
 *
 * Raison : chaque proposition de page d'accueil a sa propre palette et son propre
 * en-tête. Imposer le bandeau vert du site par-dessus une maquette bleue ou crème
 * fausserait la comparaison. Ailleurs, le chrome s'affiche normalement.
 */
export function ChromeSite({ children }: { children: React.ReactNode }) {
  const chemin = usePathname();
  if (chemin.startsWith("/propositions")) return null;
  return <>{children}</>;
}
