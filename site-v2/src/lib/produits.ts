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
 * Synonymes de recherche : les clientes tapent leur BESOIN (« tension », « sucre »,
 * « fièvre »), pas le nom technique du produit (« tensiomètre », « glucomètre »,
 * « thermomètre »). Sans cette table, « tension » ne remontait qu'un seul appareil.
 *
 * Ce sont des **alias de recherche**, pas des données produit : rien n'est ajouté ni
 * modifié dans le catalogue, et un produit trouvé uniquement par synonyme est classé
 * après les correspondances directes.
 *
 * Chaque ligne est un groupe : chercher n'importe quel mot du groupe trouve les autres.
 * Les mots sont écrits normalisés (minuscules, sans accent).
 */
const GROUPES_SYNONYMES: string[][] = [
  ["tension", "tensiometre", "tensiometres", "arterielle", "hypertension"],
  ["sucre", "glycemie", "glucometre", "diabete", "diabetique"],
  ["fievre", "thermometre", "temperature"],
  ["oxygene", "oxymetre", "saturation"],
  ["poids", "minceur", "maigrir", "amincissant", "silhouette"],
  ["cheveux", "capillaire", "chute", "cheveu", "ongles"],
  ["peau", "cutane", "cutanee", "derme", "dermatologique", "teint"],
  ["hydratant", "hydratante", "hydratation", "seche", "secheresse"],
  ["dos", "lombaire", "lombaires", "ceinture", "vertebrale"],
  ["genou", "genouillere", "rotule"],
  ["cheville", "chevillere", "entorse"],
  ["bebe", "nourrisson", "enfant", "infantile", "couches"],
  ["grossesse", "enceinte", "maternite", "allaitement"],
  ["immunite", "defenses", "immunitaire", "immunitaires"],
  ["sommeil", "dormir", "insomnie", "melatonine"],
  ["fatigue", "energie", "vitalite", "tonus"],
  ["articulation", "articulations", "articulaire", "arthrose"],
  ["digestion", "digestif", "intestin", "transit", "probiotique", "probiotiques"],
  ["solaire", "soleil", "spf", "protection"],
];

/** Tous les mots liés à un terme (le terme lui-même exclu). */
function synonymes(terme: string): string[] {
  const lies = new Set<string>();
  for (const groupe of GROUPES_SYNONYMES) {
    // Le terme tapé peut être partiel (« tensio ») : on accepte le préfixe.
    if (groupe.some((mot) => mot === terme || mot.startsWith(terme))) {
      for (const mot of groupe) if (mot !== terme) lies.add(mot);
    }
  }
  return [...lies];
}

/** Un terme saisi + ses synonymes éventuels. */
type TermeEtendu = { terme: string; alternatives: string[] };

export function etendreTermes(recherche: string): TermeEtendu[] {
  return normaliser(recherche)
    .split(" ")
    .filter(Boolean)
    .map((terme) => ({ terme, alternatives: synonymes(terme) }));
}

/**
 * Pertinence d'un produit pour les termes cherchés.
 *
 * Sans ce classement, chercher « vitamine » remontait en tête des crèmes dont la
 * *composition* mentionne « Vitamine C » avant les produits qui s'appellent
 * réellement « Vitamine … » : techniquement juste, mais inutilisable.
 * On pondère donc selon l'endroit où le mot apparaît.
 */
export function scorePertinence(
  p: Pick<ProduitListe, "nom" | "marque" | "gamme" | "description">,
  termes: TermeEtendu[],
): number {
  const nom = normaliser(p.nom);
  const marque = normaliser(p.marque);
  const gamme = normaliser(p.gamme);
  const description = normaliser(p.description);

  /** Points d'un mot donné, selon l'endroit où il apparaît. */
  function points(mot: string): number {
    let n = 0;
    // Le nom pèse le plus lourd, et un nom qui COMMENCE par le mot encore davantage.
    if (nom === mot) n += 12;
    else if (nom.startsWith(mot)) n += 8;
    else if (nom.includes(mot)) n += 5;

    if (marque.includes(mot)) n += 3;
    if (gamme.includes(mot)) n += 2;
    if (description.includes(mot)) n += 1;
    // Une correspondance uniquement dans la composition ou les bienfaits vaut 0 :
    // le produit reste affiché, mais après tous les autres.
    return n;
  }

  let score = 0;
  for (const { terme, alternatives } of termes) {
    const direct = points(terme);
    if (direct > 0) {
      score += direct;
      continue;
    }
    // Trouvé seulement via un synonyme : moitié moins de poids, pour que les
    // correspondances exactes restent devant.
    const parSynonyme = Math.max(0, ...alternatives.map(points));
    score += parSynonyme / 2;
  }
  return score;
}

/**
 * Recherche « tous les mots » : chaque terme saisi (ou l'un de ses synonymes) doit
 * apparaître dans le produit. Plus prévisible qu'un OU, et tolérant aux accents,
 * à la casse et au vocabulaire courant.
 * Les résultats sont classés par pertinence (tri stable : à score égal, l'ordre
 * du catalogue est conservé).
 */
export function filtrer(produits: ProduitListe[], filtres: Filtres): ProduitListe[] {
  const termes = etendreTermes(filtres.recherche ?? "");

  const retenus = produits.filter((p) => {
    if (filtres.categorie && p.categorie !== filtres.categorie) return false;
    if (filtres.marque && p.marque !== filtres.marque) return false;
    if (termes.length === 0) return true;
    return termes.every(
      ({ terme, alternatives }) =>
        p.index.includes(terme) || alternatives.some((a) => p.index.includes(a)),
    );
  });

  if (termes.length === 0) return retenus;

  return retenus
    .map((p, rang) => ({ p, rang, score: scorePertinence(p, termes) }))
    .sort((a, b) => b.score - a.score || a.rang - b.rang)
    .map((x) => x.p);
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
