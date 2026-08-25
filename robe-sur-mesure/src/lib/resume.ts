import type { Configuration, Mesures } from "@/lib/types";
import { modeleParId } from "@/data/modeles";
import { tissuParId } from "@/data/tissus";
import { couleurParId, ID_COULEUR_PERSO } from "@/data/couleurs";
import { occasionParId } from "@/data/occasions";
import {
  COUPES, LONGUEURS, MANCHES, COLS, DOS, EMPLACEMENTS,
  libelle, supplementOption,
} from "@/data/options";
import { decorationParId } from "@/data/decorations";
import { estimerPrix, type DetailPrix } from "@/lib/prix";
import { formatCm } from "@/lib/mesures";
import { nettoyerTexte } from "@/lib/sanitize";

export interface LigneMesure {
  cle: string;
  label: string;
  cm?: number;
}

export interface ResumeCommande {
  modeleNom: string;
  reference: string;
  aImageInspiration: boolean;
  tissu: string;
  couleur: string;
  coupe: string;
  longueur: string;
  manches: string;
  col: string;
  dos: string;
  decorations: string[];
  emplacements: string[];
  notesDecorations?: string;
  occasion: string;
  dateEvenement?: string;
  dateSouhaitee?: string;
  mesures: LigneMesure[];
  tailleHabituelle?: string;
  preferenceCoupe?: string;
  talons?: boolean;
  notesMesures?: string;
  prenom?: string;
  nom?: string;
  ville?: string;
  telephone?: string;
  notes?: string;
  prix: DetailPrix;
}

const LIBELLES_MESURES: { cle: keyof Mesures; label: string }[] = [
  { cle: "tailleTotale", label: "Taille totale" },
  { cle: "poitrine", label: "Poitrine" },
  { cle: "sousPoitrine", label: "Sous-poitrine" },
  { cle: "taille", label: "Taille" },
  { cle: "hanches", label: "Hanches" },
  { cle: "epaules", label: "Épaules" },
  { cle: "longueurManche", label: "Longueur de manche" },
  { cle: "tourBras", label: "Tour de bras" },
  { cle: "tourPoignet", label: "Tour de poignet" },
  { cle: "longueurRobe", label: "Longueur de robe" },
];

const PREF_COUPE: Record<string, string> = {
  ajustee: "Ajustée",
  normale: "Normale",
  ample: "Ample",
};

export function couleurLisible(config: Configuration): string {
  if (config.couleurId === ID_COULEUR_PERSO) {
    const nom = nettoyerTexte(config.couleurPersoNom || "", 40);
    return nom ? `Personnalisée : ${nom}` : "Personnalisée (à préciser)";
  }
  return couleurParId(config.couleurId)?.nom ?? "—";
}

export function construireResume(config: Configuration): ResumeCommande {
  const modele = modeleParId(config.modeleId);
  const tissu = tissuParId(config.tissuId);
  const p = config.personnalisation;

  const decorations = p.decorations
    .filter((id) => id !== "sans")
    .map((id) => decorationParId(id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  const supplementsPerso =
    supplementOption(COUPES, p.coupe) +
    supplementOption(MANCHES, p.manches) +
    supplementOption(COLS, p.col) +
    supplementOption(DOS, p.dos);

  const prix = estimerPrix({ modele, tissu, decorations, supplementsPerso });

  const mesures: LigneMesure[] = LIBELLES_MESURES.map(({ cle, label }) => ({
    cle,
    label,
    cm: config.mesures[cle] as number | undefined,
  })).filter((m) => typeof m.cm === "number");

  let longueur = libelle(LONGUEURS, p.longueur);
  if (p.longueur === "perso" && p.longueurCm) longueur = `Personnalisée : ${p.longueurCm} cm`;

  return {
    modeleNom: modele?.nom ?? "—",
    reference: modele?.reference ?? "—",
    aImageInspiration: Boolean(config.imageInspiration || config.couleurPersoImage),
    tissu: tissu?.nom ?? "—",
    couleur: couleurLisible(config),
    coupe: libelle(COUPES, p.coupe),
    longueur,
    manches: libelle(MANCHES, p.manches),
    col: libelle(COLS, p.col),
    dos: libelle(DOS, p.dos),
    decorations: decorations.map((d) => d.nom),
    emplacements: p.emplacements.map(
      (e) => EMPLACEMENTS.find((x) => x.id === e)?.nom ?? e
    ),
    notesDecorations: p.notesDecorations ? nettoyerTexte(p.notesDecorations) : undefined,
    occasion: occasionParId(config.occasion.type),
    dateEvenement: config.occasion.dateEvenement,
    dateSouhaitee: config.occasion.dateSouhaitee,
    mesures,
    tailleHabituelle: config.mesures.tailleHabituelle,
    preferenceCoupe: config.mesures.preferenceCoupe
      ? PREF_COUPE[config.mesures.preferenceCoupe]
      : undefined,
    talons: config.mesures.talons,
    notesMesures: config.mesures.notesMesures
      ? nettoyerTexte(config.mesures.notesMesures)
      : undefined,
    prenom: config.infos.prenom ? nettoyerTexte(config.infos.prenom, 40) : undefined,
    nom: config.infos.nom ? nettoyerTexte(config.infos.nom, 40) : undefined,
    ville: config.infos.ville ? nettoyerTexte(config.infos.ville, 60) : undefined,
    telephone: config.infos.telephone,
    notes: config.infos.notes ? nettoyerTexte(config.infos.notes) : undefined,
    prix,
  };
}

/** Version texte des mesures (utilisée par le récap et WhatsApp). */
export function lignesMesuresTexte(resume: ResumeCommande): string[] {
  return resume.mesures.map((m) => `- ${m.label} : ${formatCm(m.cm)}`);
}
