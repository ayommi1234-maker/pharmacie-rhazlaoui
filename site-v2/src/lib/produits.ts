/**
 * Logique pure du catalogue : image à afficher, prix, recherche et filtres.
 * Aucun accès disque ni React ici — testable avec Vitest, utilisable client ET serveur.
 */

import type { Produit, ProduitIndexe } from "@/data/types";

/** Image retenue : la photo de la pharmacie prime sur l'image générique (règle de l'ancien site). */
export function imageProduit(p: Pick<Produit, "image" | "imagePerso">): string {
  const choisie = (p.imagePerso || p.image || "").trim();
  return choisie ? `/${choisie.replace(/^\/+/, "")}` : "";
}

/**
 * Prix affichable, ou `null` si le champ est vide.
 * Beaucoup de produits n'ont volontairement pas de prix : on n'en invente jamais.
 */
export function prixAffichable(valeur: string): string | null {
  const net = (valeur ?? "").trim();
  if (!net) return null;
  // Si le champ ne contient qu'un nombre, on ajoute la devise ; sinon on respecte la saisie.
  return /^[\d\s.,]+$/.test(net) ? `${net.replace(/\s+/g, " ")} DH` : net;
}

/** Normalise pour la recherche : minuscules, sans accents, sans ponctuation superflue. */
export function normaliser(texte: string): string {
  return (texte ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // diacritiques issus de la decomposition NFD
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Texte indexé d'un produit (nom, marque, gamme, description, bienfaits, composition). */
export function texteIndexe(p: Produit): string {
  return normaliser(
    [p.nom, p.marque, p.gamme, p.description, p.composition, ...(p.bienfaits ?? [])]
      .filter(Boolean)
      .join(" "),
  );
}

/**
 * Version allégée envoyée au navigateur pour le catalogue : on retire les champs
 * longs (bienfaits, utilisation, composition) mais on garde leur contenu **dans**
 * `index`, pour que la recherche reste complète sans alourdir la page.
 */
export type ProduitListe = Pick<
  ProduitIndexe,
  | "id"
  | "nom"
  | "marque"
  | "gamme"
  | "prix"
  | "ancienPrix"
  | "badge"
  | "image"
  | "imagePerso"
  | "description"
  | "categorie"
> & { index: string };

export function versListe(p: ProduitIndexe): ProduitListe {
  return {
    id: p.id,
    nom: p.nom,
    marque: p.marque,
    gamme: p.gamme,
    prix: p.prix,
    ancienPrix: p.ancienPrix,
    badge: p.badge,
    image: p.image,
    imagePerso: p.imagePerso,
    description: p.description,
    categorie: p.categorie,
    index: texteIndexe(p),
  };
}

export type Filtres = {
  recherche?: string;
  categorie?: string;
  marque?: string;
};

/**
 * Recherche « tous les mots » : chaque terme saisi doit apparaître dans le produit.
 * Plus prévisible qu'un OU, et tolérant aux accents et à la casse.
 */
export function filtrer(produits: ProduitListe[], filtres: Filtres): ProduitListe[] {
  const termes = normaliser(filtres.recherche ?? "").split(" ").filter(Boolean);

  return produits.filter((p) => {
    if (filtres.categorie && p.categorie !== filtres.categorie) return false;
    if (filtres.marque && p.marque !== filtres.marque) return false;
    if (termes.length === 0) return true;
    return termes.every((t) => p.index.includes(t));
  });
}

/** Numéro WhatsApp nettoyé (chiffres uniquement) puis lien `wa.me` encodé. */
export function lienWhatsApp(numero: string, message: string): string {
  const chiffres = (numero ?? "").replace(/\D/g, "");
  return `https://wa.me/${chiffres}?text=${encodeURIComponent(message)}`;
}

/** Message de demande de renseignement — ne contient QUE des informations produit. */
export function messageProduit(p: Produit): string {
  const lignes = [
    "Bonjour, je vous contacte depuis votre site.",
    "",
    `Produit : ${p.nom}`,
  ];
  if (p.marque) lignes.push(`Marque : ${p.marque}`);
  const prix = prixAffichable(p.prix);
  if (prix) lignes.push(`Prix affiché : ${prix}`);
  lignes.push("", "Est-il disponible ? Merci.");
  return lignes.join("\n");
}
