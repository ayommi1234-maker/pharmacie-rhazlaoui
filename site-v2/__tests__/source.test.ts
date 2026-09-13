import { describe, expect, it } from "vitest";

import {
  categories,
  gammeParSlug,
  gammes,
  infos,
  marques,
  offres,
  photos,
  produitParId,
  produitsDeGamme,
  slugGamme,
  tousLesProduits,
} from "@/data/source";

/**
 * Ces tests vérifient que le chargement build-time des fichiers du site historique
 * fonctionne réellement — c'est le point de couplage le plus fragile du projet.
 */
describe("chargement de js/products-data.js", () => {
  it("charge tous les produits avec leur catégorie", () => {
    const produits = tousLesProduits();
    expect(produits.length).toBeGreaterThan(100);
    for (const p of produits.slice(0, 10)) {
      expect(p.id).toBeTruthy();
      expect(p.nom).toBeTruthy();
      expect(p.categorie).toBeTruthy();
    }
  });

  it("n’a aucun identifiant en double", () => {
    const ids = tousLesProduits().map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("retrouve un produit par son identifiant", () => {
    const premier = tousLesProduits()[0];
    expect(produitParId(premier.id)?.nom).toBe(premier.nom);
    expect(produitParId("inexistant-xyz")).toBeUndefined();
  });

  it("expose des catégories avec un libellé lisible", () => {
    const liste = categories();
    expect(liste.length).toBeGreaterThan(0);
    for (const c of liste) {
      expect(c.libelle).toBeTruthy();
      expect(c.total).toBeGreaterThanOrEqual(0);
    }
  });

  it("expose des marques distinctes et triées", () => {
    const liste = marques();
    expect(new Set(liste).size).toBe(liste.length);
    expect([...liste].sort((a, b) => a.localeCompare(b, "fr"))).toEqual(liste);
  });
});

describe("gammes", () => {
  it("génère un slug sans le préfixe gam-", () => {
    const g = gammes()[0];
    expect(slugGamme(g)).not.toContain("gam-");
    expect(gammeParSlug(slugGamme(g))?.id).toBe(g.id);
  });

  it("produit des slugs uniques (indispensable pour generateStaticParams)", () => {
    const slugs = gammes().map(slugGamme);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("associe au moins un produit à la majorité des gammes", () => {
    const remplies = gammes().filter((g) => produitsDeGamme(g).length > 0);
    expect(remplies.length).toBeGreaterThan(gammes().length / 2);
  });
});

describe("offres et infos", () => {
  it("ne retient que les offres actives", () => {
    expect(offres().every((o) => o.actif)).toBe(true);
  });

  it("lit les informations réelles de la pharmacie", () => {
    const i = infos();
    expect(i.nom).toBeTruthy();
    expect(i.adresse).toBeTruthy();
    expect(i.telephone).toBeTruthy();
    expect(i.whatsapp).toMatch(/^\d+$/);
  });
});

describe("chargement de js/gallery-data.js", () => {
  it("charge les photos avec leur miniature", () => {
    const liste = photos();
    expect(liste.length).toBeGreaterThan(0);
    for (const p of liste.slice(0, 10)) {
      expect(p.src).toMatch(/^images\//);
      expect(p.thumb).toMatch(/^images\/gallery\/thumbs\//);
      expect(p.caption).toBeTruthy();
    }
  });
});
