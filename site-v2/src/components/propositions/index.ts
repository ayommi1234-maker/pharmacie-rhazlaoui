import type { DonneesAccueil } from "./donnees";
import { VarianteA } from "./variante-a";
import { VarianteB } from "./variante-b";
import { VarianteC } from "./variante-c";
import { VarianteD } from "./variante-d";
import { VarianteE } from "./variante-e";

/** Catalogue des 5 propositions, avec leur justification issue de la recherche. */
export const PROPOSITIONS = [
  {
    cle: "a",
    nom: "Comptoir",
    accroche: "Le service d’abord",
    Composant: VarianteA,
    fondement:
      "Les audits 2026 des meilleurs sites de pharmacie donnent gagnante la structure orientée service (appeler, réserver, venir) devant les pages « notre histoire ».",
    pour: ["Le plus efficace pour une pharmacie de quartier", "Actions immédiates dès le premier écran", "Entrée par le besoin, pas par la marque"],
    contre: ["Le moins spectaculaire visuellement", "Peu d’effet « vitrine »"],
  },
  {
    cle: "b",
    nom: "Recherche d’abord",
    accroche: "Les codes de la parapharmacie en ligne",
    Composant: VarianteB,
    fondement:
      "Le motif dominant des grandes parapharmacies (Newpharma, Atida, Easypara) : une barre de recherche géante comme point d’entrée, un bandeau de réassurance, puis les rayons en grille dense.",
    pour: ["Idéal avec 107 produits et 51 marques", "Familier : tout le monde sait s’en servir", "Bleu clinique = codes santé"],
    contre: ["Ressemble à un site de vente en ligne… alors qu’on ne vend pas en ligne", "Moins de personnalité"],
  },
  {
    cle: "c",
    nom: "Bento",
    accroche: "Tout en un écran",
    Composant: VarianteC,
    fondement:
      "La grille bento est le standard de mise en page 2026 : des tuiles de tailles inégales, chacune portant une information ou une action.",
    pour: ["Horaires, contact et recherche visibles d’un coup d’œil", "Très moderne", "Excellent sur mobile (les tuiles s’empilent)"],
    contre: ["Moins de place pour un discours", "Demande des tuiles bien remplies pour ne pas paraître vide"],
  },
  {
    cle: "d",
    nom: "Éditorial",
    accroche: "Le conseil comme signature",
    Composant: VarianteD,
    fondement:
      "Typographie surdimensionnée comme identité de marque et minimalisme calme : deux tendances 2026 confirmées. Positionne la pharmacie contre les pure-players de prix.",
    pour: ["La plus distinctive : aucune parapharmacie marocaine ne ressemble à ça", "Valorise le conseil, pas le prix", "Superbe sans dépendre des photos"],
    contre: ["Moins direct pour trouver un produit", "Demande d’assumer un ton"],
  },
  {
    cle: "e",
    nom: "Vitrine",
    accroche: "L’image d’abord",
    Composant: VarianteE,
    fondement:
      "Le registre des marques de beauté et de parapharmacie premium : bandeau photo plein écran, grandes tuiles, angles très arrondis.",
    pour: ["La plus séduisante au premier coup d’œil", "Met en valeur la pharmacie elle-même", "Parfaite pour Instagram / TikTok"],
    contre: ["Dépend entièrement de la qualité des photos", "Avec les photos de rayon actuelles, elle donne moins que son potentiel", "La plus lourde à charger"],
  },
] as const;

export type Proposition = (typeof PROPOSITIONS)[number];
export type { DonneesAccueil };
