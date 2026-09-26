/** Nettoyage/validation des entrées utilisateur (anti-injection, longueurs). */

/** Retire les caractères de contrôle, réduit les espaces, borne la longueur. */
export function nettoyerTexte(entree: unknown, maxLen = 500): string {
  if (typeof entree !== "string") return "";
  // eslint-disable-next-line no-control-regex
  const sansControle = entree.replace(/[\x00-\x1F\x7F]/g, " ");
  return sansControle.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

/** Nettoie un numéro de téléphone : garde chiffres et un éventuel « + » en tête. */
export function nettoyerTelephone(entree: unknown): string {
  if (typeof entree !== "string") return "";
  const trim = entree.trim();
  const plus = trim.startsWith("+") ? "+" : "";
  return (plus + trim.replace(/\D/g, "")).slice(0, 20);
}

/** Vérifie qu'un téléphone a une longueur plausible. */
export function telephoneValide(tel: string): boolean {
  const chiffres = tel.replace(/\D/g, "");
  return chiffres.length >= 8 && chiffres.length <= 15;
}

/** Valide un nom/prénom (lettres, espaces, tirets, apostrophes). */
export function nomValide(nom: string): boolean {
  const n = nettoyerTexte(nom, 60);
  return n.length >= 2 && /^[\p{L}][\p{L}\s'-]*$/u.test(n);
}

