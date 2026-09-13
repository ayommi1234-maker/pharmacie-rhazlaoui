/**
 * Types miroir des données de `js/products-data.js` (source unique de vérité).
 * Aucun champ n'est inventé : ils correspondent exactement au fichier existant.
 */

export type Produit = {
  id: string;
  nom: string;
  marque: string;
  gamme: string;
  /** Chaîne libre, souvent vide ("") : dans ce cas le prix n'est PAS affiché. */
  prix: string;
  ancienPrix: string;
  badge: string;
  image: string;
  /** Photo prise par la pharmacie ; prioritaire sur `image`. */
  imagePerso: string;
  description: string;
  bienfaits: string[];
  utilisation: string;
  composition: string;
};

/** Produit enrichi de sa clé de catégorie d'origine (`cosmetiques`, `complements`, …). */
export type ProduitIndexe = Produit & { categorie: string };

export type Gamme = {
  id: string;
  nom: string;
  logo: string;
  description: string;
  /** Marques rattachées : le filtrage se fait par correspondance sur `produit.marque`. */
  marques: string[];
  /** Classe Font Awesome de l'ancien site — convertie en icône lucide côté v2. */
  icon: string;
};

export type Offre = {
  id: string;
  titre: string;
  description: string;
  image: string;
  dateDebut: string;
  dateFin: string;
  actif: boolean;
};

export type Horaires = {
  lundi_vendredi_matin: string;
  lundi_vendredi_soir: string;
  samedi: string;
  garde: string;
};

export type PharmacieInfo = {
  nom: string;
  sousNom: string;
  adresse: string;
  telephone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  tiktok: string;
  horaires: Horaires;
};

export type Photo = {
  src: string;
  thumb: string;
  category: string;
  caption: string;
};
