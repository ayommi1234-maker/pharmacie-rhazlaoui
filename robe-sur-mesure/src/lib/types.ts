/** Types du domaine — configurateur de robe sur mesure. */

export type Disponibilite = "en_stock" | "sur_commande" | "indisponible" | "a_confirmer";

export interface Modele {
  id: string;
  nom: string;
  reference: string;
  description: string;
  photo: string; // chemin sous /public/products
  prixBaseDH: number; // 0 => « À partir de … DH » à confirmer
  tissusConseilles: string[]; // ids de tissus
  delaiEstime: string;
  demo: boolean; // donnée de démonstration
  personnalisableParPhoto?: boolean;
}

export interface Tissu {
  id: string;
  nom: string;
  photo: string;
  description: string;
  opacite: "opaque" | "semi_transparent" | "transparent";
  epaisseur: "leger" | "moyen" | "epais";
  souplesse: "fluide" | "moyen" | "rigide";
  saison: string[];
  couleursDisponibles: string[]; // ids de couleurs
  supplementDH: number; // supplément (0 = inclus)
  disponibilite: Disponibilite;
  fourniParCliente?: boolean;
}

export interface Couleur {
  id: string;
  nom: string;
  hex: string;
}

export interface Decoration {
  id: string;
  nom: string;
  description: string;
  image: string;
  supplementDH: number;
  disponibilite: Disponibilite;
}

export type EmplacementDecoration =
  | "col"
  | "poitrine"
  | "manches"
  | "taille"
  | "dos"
  | "bas"
  | "toute"
  | "personnalise";

export interface OptionPrix {
  id: string;
  nom: string;
  supplementDH: number;
}

/** Mesures — TOUJOURS stockées en centimètres en interne. */
export interface Mesures {
  tailleTotale?: number;
  poitrine?: number;
  sousPoitrine?: number;
  taille?: number;
  hanches?: number;
  epaules?: number;
  longueurManche?: number;
  tourBras?: number;
  tourPoignet?: number;
  longueurRobe?: number; // épaule -> bas
  tailleHabituelle?: string; // XS..XXL / autre
  preferenceCoupe?: "ajustee" | "normale" | "ample";
  talons?: boolean;
  notesMesures?: string;
}

export interface Personnalisation {
  coupe?: string;
  longueur?: string;
  longueurCm?: number; // si « personnalisée »
  manches?: string;
  col?: string;
  dos?: string;
  decorations: string[]; // ids
  emplacements: EmplacementDecoration[];
  notesDecorations?: string;
}

export interface InfosCommande {
  prenom?: string;
  nom?: string;
  telephone?: string;
  ville?: string;
  adresse?: string;
  moyenContact?: "whatsapp" | "appel" | "sms";
  notes?: string;
  consentement: boolean;
}

export interface Occasion {
  type?: string;
  dateEvenement?: string;
  dateSouhaitee?: string;
  priorite?: "normale" | "elevee";
}

/** État complet du configurateur (persisté en localStorage). */
export interface Configuration {
  modeleId?: string;
  imageInspiration?: string; // data-url locale (modèle personnalisé)
  tissuId?: string;
  couleurId?: string;
  couleurPersoNom?: string;
  couleurPersoHex?: string;
  couleurPersoImage?: string;
  personnalisation: Personnalisation;
  occasion: Occasion;
  mesures: Mesures;
  infos: InfosCommande;
  etape: number;
  maj: number; // timestamp
}

export function configurationVide(): Configuration {
  return {
    personnalisation: { decorations: [], emplacements: [] },
    occasion: {},
    mesures: {},
    infos: { consentement: false },
    etape: 0,
    maj: 0,
  };
}

