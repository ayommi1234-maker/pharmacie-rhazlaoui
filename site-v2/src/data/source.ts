/**
 * Chargement des données AU MOMENT DU BUILD depuis les fichiers du site historique.
 *
 * Pourquoi : `js/products-data.js` reste la **source unique de vérité**. La propriétaire
 * continue d'éditer ce seul fichier (voir `GUIDE.md` et le panneau `admin/`) et le nouveau
 * site se régénère à partir de lui — aucune copie à maintenir en double.
 *
 * Ces fichiers déclarent des `const` globales sans `export`. On les évalue donc dans un
 * bac à sable `node:vm` et on récupère la dernière expression du script.
 *
 * ⚠️ Module réservé au serveur (prérendu). Ne jamais l'importer depuis un composant client.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createContext, runInNewContext } from "node:vm";
import type {
  Gamme,
  Offre,
  PharmacieInfo,
  Photo,
  Produit,
  ProduitIndexe,
} from "./types";

/** Racine du dépôt = dossier parent de `site-v2/`. */
const RACINE = join(process.cwd(), "..");

function evaluer<T>(fichier: string, expressionFinale: string): T {
  const code = readFileSync(join(RACINE, "js", fichier), "utf8");
  // Les `const` de premier niveau ne deviennent pas des propriétés du global :
  // on ajoute une expression finale dans la même portée pour les récupérer.
  return runInNewContext(`${code}\n;(${expressionFinale});`, createContext({}), {
    filename: fichier,
    timeout: 5000,
  }) as T;
}

type BrutProduits = {
  PRODUCTS: Record<string, Produit[]>;
  GAMMES: Gamme[];
  OFFRES: Offre[];
  PHARMACIE_INFO: PharmacieInfo;
};

let cache: BrutProduits | null = null;

function brut(): BrutProduits {
  if (!cache) {
    cache = evaluer<BrutProduits>(
      "products-data.js",
      "{ PRODUCTS, GAMMES, OFFRES, PHARMACIE_INFO }",
    );
  }
  return cache;
}

/** Libellés lisibles des clés de catégorie du fichier source. */
export const LIBELLE_CATEGORIE: Record<string, string> = {
  cosmetiques: "Cosmétiques & soins",
  complements: "Compléments alimentaires",
  doppelherz: "Doppel Herz Aktiv",
  appareils: "Appareils médicaux",
  orthopediques: "Orthopédie",
  medicaments: "Pharmacie & médication",
  enfants: "Bébé & enfants",
  femmes: "Femmes & maternité",
  divers: "Bien-être & divers",
  cerave: "CeraVe",
};

/** Tous les produits, aplatis, avec leur catégorie d'origine. */
export function tousLesProduits(): ProduitIndexe[] {
  const { PRODUCTS } = brut();
  return Object.entries(PRODUCTS).flatMap(([categorie, liste]) =>
    (liste ?? []).map((p) => ({ ...p, categorie })),
  );
}

export function produitParId(id: string): ProduitIndexe | undefined {
  return tousLesProduits().find((p) => p.id === id);
}

export function categories(): { cle: string; libelle: string; total: number }[] {
  const { PRODUCTS } = brut();
  return Object.keys(PRODUCTS).map((cle) => ({
    cle,
    libelle: LIBELLE_CATEGORIE[cle] ?? cle,
    total: PRODUCTS[cle]?.length ?? 0,
  }));
}

export function gammes(): Gamme[] {
  return brut().GAMMES;
}

/** Slug d'URL d'une gamme : `gam-mgdbio` → `mgdbio`. */
export function slugGamme(g: Gamme): string {
  return g.id.replace(/^gam-/, "");
}

export function gammeParSlug(slug: string): Gamme | undefined {
  return gammes().find((g) => slugGamme(g) === slug);
}

/**
 * Produits d'une gamme : correspondance **par sous-chaîne** entre `gamme.marques[]`
 * et `produit.marque` — même règle que `getGammeProducts()` de l'ancien site,
 * pour que l'ajout d'une marque à une gamme continue de fonctionner à l'identique.
 */
export function produitsDeGamme(g: Gamme): ProduitIndexe[] {
  const marques = g.marques.map((m) => m.toLowerCase());
  return tousLesProduits().filter((p) => {
    const marque = (p.marque ?? "").toLowerCase();
    return marques.some((m) => marque.includes(m) || m.includes(marque));
  });
}

/** Offres actives uniquement. Aucune promotion n'est inventée ici. */
export function offres(): Offre[] {
  return brut().OFFRES.filter((o) => o.actif);
}

export function infos(): PharmacieInfo {
  return brut().PHARMACIE_INFO;
}

export function photos(): Photo[] {
  return evaluer<Photo[]>("gallery-data.js", "GALLERY_PHOTOS");
}

/** Marques distinctes, triées, telles qu'elles apparaissent dans les données. */
export function marques(): string[] {
  const vues = new Set<string>();
  for (const p of tousLesProduits()) {
    if (p.marque) vues.add(p.marque);
  }
  return [...vues].sort((a, b) => a.localeCompare(b, "fr"));
}
