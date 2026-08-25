/**
 * i18n minimal — français par défaut, prêt pour l'ajout de l'arabe.
 * Pour ajouter l'arabe : dupliquer le bloc `fr` en `ar`, traduire, puis
 * passer LANGUE_ACTIVE à "ar" (et gérer `dir="rtl"` dans le layout).
 * Le MVP reste volontairement simple : un seul dictionnaire plat.
 */

export type Langue = "fr" | "ar";
export const LANGUE_ACTIVE: Langue = "fr";

export const dictionnaires: Record<Langue, Record<string, string>> = {
  fr: {
    "app.titre": "Votre robe, confectionnée à vos mesures",
    "cta.choisir": "Choisir ma robe",
    "cta.mesures": "Comment prendre mes mesures ?",
  },
  ar: {
    // À traduire ultérieurement. Laisser vide bascule sur le français.
  },
};

export function t(cle: string): string {
  return (
    dictionnaires[LANGUE_ACTIVE][cle] ??
    dictionnaires.fr[cle] ??
    cle
  );
}

