/**
 * CONFIGURATION CENTRALE DE LA BOUTIQUE
 * -------------------------------------
 * Modifie ce fichier (ou renseigne les variables .env correspondantes) pour
 * personnaliser toute l'application. Les valeurs entre crochets [ ... ] sont
 * des PLACEHOLDERS : remplace-les par tes vraies informations.
 *
 * Le numéro WhatsApp doit être au format international, chiffres uniquement,
 * SANS "+", espaces ni tirets. Exemple pour le Maroc : 212600000000
 */

export interface BoutiqueConfig {
  nom: string;
  whatsapp: string; // chiffres uniquement, avec indicatif
  ville: string;
  delaiMoyen: string;
  prixDepartDH: number;
  couleursMarque: string[];
  reseauSocial: string;
  devise: string;
}

export const BOUTIQUE: BoutiqueConfig = {
  nom: process.env.NEXT_PUBLIC_BOUTIQUE_NOM || "[NOM_DE_LA_BOUTIQUE]",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP || "[NUMERO_WHATSAPP_AVEC_INDICATIF]").replace(/\D/g, "") ||
    "[NUMERO_WHATSAPP_AVEC_INDICATIF]",
  ville: process.env.NEXT_PUBLIC_BOUTIQUE_VILLE || "[VILLE]",
  delaiMoyen: "[DELAI]", // ex : "7 à 14 jours"
  prixDepartDH: 0, // 0 = affiché « [PRIX] DH » tant que non renseigné
  couleursMarque: ["#7A2E33", "#B9975B"], // [COULEURS] bordeaux + doré par défaut
  reseauSocial: process.env.NEXT_PUBLIC_BOUTIQUE_SOCIAL || "[LIEN_RESEAU_SOCIAL]",
  devise: "DH",
};

/** true si une valeur est encore un placeholder non renseigné. */
export function estPlaceholder(valeur: string | number): boolean {
  if (typeof valeur === "number") return valeur <= 0;
  return valeur.trim().startsWith("[") && valeur.trim().endsWith("]");
}

/** WhatsApp est-il utilisable (numéro réel renseigné) ? */
export function whatsappPret(): boolean {
  return /^\d{8,15}$/.test(BOUTIQUE.whatsapp);
}
