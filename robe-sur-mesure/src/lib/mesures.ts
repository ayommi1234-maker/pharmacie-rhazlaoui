/**
 * Conversion et validation des mesures.
 * Règle : tout est normalisé en CENTIMÈTRES en interne.
 * - Accepte la virgule ET le point décimal ("1,65" ou "1.65").
 * - Accepte les unités cm et m.
 * - Une valeur inhabituelle n'est JAMAIS bloquée : on renvoie un avertissement
 *   et on demande confirmation.
 */

export type Unite = "cm" | "m";

/** Parse un nombre saisi (virgule ou point). Renvoie null si invalide. */
export function parseNombre(entree: string): number | null {
  if (typeof entree !== "string") return null;
  const nettoye = entree.trim().replace(/\s+/g, "").replace(",", ".");
  if (nettoye === "" || !/^\d*\.?\d+$/.test(nettoye)) return null;
  const n = Number(nettoye);
  return Number.isFinite(n) ? n : null;
}

/** Normalise une valeur + unité en centimètres. */
export function enCentimetres(valeur: number, unite: Unite): number {
  const cm = unite === "m" ? valeur * 100 : valeur;
  // arrondi à 0,1 cm pour éviter le bruit flottant (0.92 * 100 = 91.99999)
  return Math.round(cm * 10) / 10;
}

/** Parse une saisie texte + unité directement en cm. */
export function saisieEnCm(entree: string, unite: Unite): number | null {
  const n = parseNombre(entree);
  if (n === null) return null;
  return enCentimetres(n, unite);
}

export interface PlageMesure {
  cle: string;
  label: string;
  plausibleMin: number;
  plausibleMax: number;
  hardMin: number; // en dessous => erreur (valeur absurde)
  hardMax: number; // au dessus => erreur
}

/** Plages réalistes (en cm) par mesure. */
export const PLAGES: Record<string, PlageMesure> = {
  tailleTotale: { cle: "tailleTotale", label: "Taille totale", plausibleMin: 130, plausibleMax: 200, hardMin: 90, hardMax: 230 },
  poitrine: { cle: "poitrine", label: "Tour de poitrine", plausibleMin: 65, plausibleMax: 150, hardMin: 40, hardMax: 200 },
  sousPoitrine: { cle: "sousPoitrine", label: "Tour sous-poitrine", plausibleMin: 55, plausibleMax: 140, hardMin: 35, hardMax: 190 },
  taille: { cle: "taille", label: "Tour de taille", plausibleMin: 50, plausibleMax: 140, hardMin: 35, hardMax: 190 },
  hanches: { cle: "hanches", label: "Tour de hanches", plausibleMin: 65, plausibleMax: 160, hardMin: 45, hardMax: 210 },
  epaules: { cle: "epaules", label: "Largeur des épaules", plausibleMin: 30, plausibleMax: 55, hardMin: 20, hardMax: 75 },
  longueurManche: { cle: "longueurManche", label: "Longueur de manche", plausibleMin: 40, plausibleMax: 72, hardMin: 20, hardMax: 90 },
  tourBras: { cle: "tourBras", label: "Tour de bras", plausibleMin: 20, plausibleMax: 50, hardMin: 12, hardMax: 70 },
  tourPoignet: { cle: "tourPoignet", label: "Tour de poignet", plausibleMin: 12, plausibleMax: 24, hardMin: 8, hardMax: 35 },
  longueurRobe: { cle: "longueurRobe", label: "Longueur de la robe", plausibleMin: 70, plausibleMax: 170, hardMin: 40, hardMax: 200 },
};

export type NiveauValidation = "ok" | "avertissement" | "erreur";

export interface ResultatValidation {
  niveau: NiveauValidation;
  message?: string;
}

/** Valide une mesure (en cm) contre sa plage. Ne bloque pas les valeurs inhabituelles. */
export function validerMesure(cle: string, cm: number | null): ResultatValidation {
  if (cm === null) return { niveau: "erreur", message: "Entrez un nombre valide (ex : 92 ou 1,65)." };
  const p = PLAGES[cle];
  if (!p) return cm > 0 ? { niveau: "ok" } : { niveau: "erreur", message: "La valeur doit être positive." };
  if (cm <= 0) return { niveau: "erreur", message: "La valeur doit être positive." };
  if (cm < p.hardMin || cm > p.hardMax) {
    return { niveau: "erreur", message: `Valeur peu réaliste pour « ${p.label} ». Vérifiez l'unité (cm/m).` };
  }
  if (cm < p.plausibleMin || cm > p.plausibleMax) {
    return {
      niveau: "avertissement",
      message: `« ${p.label} » = ${cm} cm semble inhabituel. Confirmez si c'est correct.`,
    };
  }
  return { niveau: "ok" };
}

/** Formate une valeur cm pour affichage (« 165 cm »). */
export function formatCm(cm?: number): string {
  if (cm === undefined || cm === null) return "—";
  const arr = Math.round(cm * 10) / 10;
  return `${Number.isInteger(arr) ? arr : arr.toFixed(1)} cm`;
}
