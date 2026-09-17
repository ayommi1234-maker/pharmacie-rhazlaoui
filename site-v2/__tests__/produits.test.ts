import { describe, expect, it } from "vitest";

import {
  etendreTermes,
  filtrer,
  imageProduit,
  lienWhatsApp,
  messageProduit,
  normaliser,
  prixAffichable,
  texteIndexe,
  versListe,
  type ProduitListe,
} from "@/lib/produits";
import type { ProduitIndexe } from "@/data/types";

function produit(p: Partial<ProduitIndexe> = {}): ProduitIndexe {
  return {
    id: "test-1",
    nom: "Vitamine D3",
    marque: "MGD",
    gamme: "Vitamines",
    prix: "",
    ancienPrix: "",
    badge: "",
    image: "images/gallery/photo-001.jpg",
    imagePerso: "",
    description: "Complément de vitamine D",
    bienfaits: ["Contribue au maintien d’une ossature normale"],
    utilisation: "1 comprimé par jour",
    composition: "Cholécalciférol",
    categorie: "complements",
    ...p,
  };
}

describe("imageProduit", () => {
  it("préfère la photo de la pharmacie à l’image générique", () => {
    expect(imageProduit({ image: "images/a.jpg", imagePerso: "images/perso.jpg" })).toBe(
      "/images/perso.jpg",
    );
  });

  it("retombe sur l’image générique quand il n’y a pas de photo perso", () => {
    expect(imageProduit({ image: "images/a.jpg", imagePerso: "" })).toBe("/images/a.jpg");
  });

  it("renvoie une chaîne vide quand aucune image n’est renseignée", () => {
    expect(imageProduit({ image: "", imagePerso: "" })).toBe("");
  });

  it("ne double jamais la barre oblique initiale", () => {
    expect(imageProduit({ image: "/images/a.jpg", imagePerso: "" })).toBe("/images/a.jpg");
  });
});

describe("prixAffichable", () => {
  it("n’invente aucun prix quand le champ est vide", () => {
    expect(prixAffichable("")).toBeNull();
    expect(prixAffichable("   ")).toBeNull();
  });

  it("ajoute la devise DH à un prix purement numérique", () => {
    expect(prixAffichable("149")).toBe("149 DH");
    expect(prixAffichable("149,50")).toBe("149,50 DH");
  });

  it("respecte la saisie quand elle contient déjà du texte", () => {
    expect(prixAffichable("À partir de 99 DH")).toBe("À partir de 99 DH");
  });
});

describe("normaliser / texteIndexe", () => {
  it("supprime les accents et la casse", () => {
    expect(normaliser("Complément ALIMENTAIRE")).toBe("complement alimentaire");
  });

  it("réduit la ponctuation à des espaces", () => {
    expect(normaliser("Oméga-3 (1000 mg)")).toBe("omega 3 1000 mg");
  });

  it("indexe aussi la composition et les bienfaits", () => {
    const index = texteIndexe(produit());
    expect(index).toContain("cholecalciferol");
    expect(index).toContain("ossature");
  });
});

describe("filtrer", () => {
  const liste: ProduitListe[] = [
    versListe(produit({ id: "a", nom: "Vitamine D3", marque: "MGD", categorie: "complements" })),
    versListe(
      produit({
        id: "b",
        nom: "Crème hydratante",
        marque: "CeraVe",
        categorie: "cerave",
        description: "Peau sèche à très sèche",
        bienfaits: [],
        composition: "Céramides",
      }),
    ),
    versListe(
      produit({
        id: "c",
        nom: "Tensiomètre bras",
        marque: "Omron",
        categorie: "appareils",
        description: "Mesure de la tension artérielle",
        bienfaits: [],
        composition: "",
      }),
    ),
  ];

  it("renvoie tout quand aucun critère n’est fourni", () => {
    expect(filtrer(liste, {})).toHaveLength(3);
  });

  it("trouve un produit malgré les accents et la casse", () => {
    expect(filtrer(liste, { recherche: "CRÈME" }).map((p) => p.id)).toEqual(["b"]);
    expect(filtrer(liste, { recherche: "creme" }).map((p) => p.id)).toEqual(["b"]);
  });

  it("exige que TOUS les mots saisis correspondent", () => {
    expect(filtrer(liste, { recherche: "tensiometre omron" }).map((p) => p.id)).toEqual(["c"]);
    expect(filtrer(liste, { recherche: "tensiometre cerave" })).toHaveLength(0);
  });

  it("cherche aussi dans la composition", () => {
    expect(filtrer(liste, { recherche: "ceramides" }).map((p) => p.id)).toEqual(["b"]);
  });

  it("classe par pertinence : le nom passe avant la composition", () => {
    const avecPertinence: ProduitListe[] = [
      // Ne correspond QUE par sa composition : doit finir dernier.
      versListe(
        produit({
          id: "creme",
          nom: "Crème anti-tâches",
          marque: "Oxyskin",
          description: "Unifie le teint",
          bienfaits: [],
          composition: "Niacinamide, Vitamine C, Arbutine",
        }),
      ),
      versListe(
        produit({
          id: "vitamine-d3",
          nom: "Vitamine D3",
          marque: "MGD",
          description: "Complément",
          bienfaits: [],
          composition: "Cholécalciférol",
        }),
      ),
      versListe(
        produit({
          id: "pack",
          nom: "Pack vitalité",
          marque: "Indoka",
          description: "Contient de la vitamine B12",
          bienfaits: [],
          composition: "",
        }),
      ),
    ];
    // Le produit qui s’APPELLE « Vitamine … » d’abord, la crème (composition seule) en dernier.
    expect(filtrer(avecPertinence, { recherche: "vitamine" }).map((p) => p.id)).toEqual([
      "vitamine-d3",
      "pack",
      "creme",
    ]);
  });

  it("trouve un tensiomètre en cherchant « tension » (synonymes de besoin)", () => {
    const appareils: ProduitListe[] = [
      versListe(
        produit({
          id: "tensio",
          nom: "Tensiomètre bras",
          marque: "Omron",
          description: "Mesure automatique au bras",
          bienfaits: [],
          composition: "",
        }),
      ),
      versListe(
        produit({
          id: "gluco",
          nom: "Glucomètre",
          marque: "Accu-Chek",
          description: "Lecteur de glycémie",
          bienfaits: [],
          composition: "",
        }),
      ),
    ];
    expect(filtrer(appareils, { recherche: "tension" }).map((p) => p.id)).toEqual(["tensio"]);
    expect(filtrer(appareils, { recherche: "sucre" }).map((p) => p.id)).toEqual(["gluco"]);
    expect(filtrer(appareils, { recherche: "diabete" }).map((p) => p.id)).toEqual(["gluco"]);
  });

  it("classe la correspondance exacte devant la correspondance par synonyme", () => {
    const mixte: ProduitListe[] = [
      versListe(
        produit({
          id: "par-synonyme",
          nom: "Tensiomètre poignet",
          marque: "Microlife",
          description: "",
          bienfaits: [],
          composition: "",
        }),
      ),
      versListe(
        produit({
          id: "exact",
          nom: "Tension artérielle — guide",
          marque: "",
          description: "",
          bienfaits: [],
          composition: "",
        }),
      ),
    ];
    expect(filtrer(mixte, { recherche: "tension" })[0].id).toBe("exact");
  });

  it("n’élargit rien quand le mot n’est dans aucun groupe de synonymes", () => {
    expect(etendreTermes("cerave")).toEqual([{ terme: "cerave", alternatives: [] }]);
  });

  it("conserve l’ordre du catalogue à pertinence égale (tri stable)", () => {
    const egaux: ProduitListe[] = [
      versListe(produit({ id: "x1", nom: "Magnésium marin", bienfaits: [], composition: "" })),
      versListe(produit({ id: "x2", nom: "Magnésium marin", bienfaits: [], composition: "" })),
    ];
    expect(filtrer(egaux, { recherche: "magnesium" }).map((p) => p.id)).toEqual(["x1", "x2"]);
  });

  it("combine recherche, catégorie et marque", () => {
    expect(filtrer(liste, { categorie: "appareils" }).map((p) => p.id)).toEqual(["c"]);
    expect(filtrer(liste, { marque: "CeraVe" }).map((p) => p.id)).toEqual(["b"]);
    expect(filtrer(liste, { marque: "CeraVe", recherche: "tension" })).toHaveLength(0);
  });
});

describe("versListe", () => {
  it("retire les champs longs mais conserve leur contenu dans l’index", () => {
    const allege = versListe(produit());
    expect(allege).not.toHaveProperty("composition");
    expect(allege).not.toHaveProperty("bienfaits");
    expect(allege.index).toContain("cholecalciferol");
  });
});

describe("lienWhatsApp", () => {
  it("ne garde que les chiffres du numéro", () => {
    expect(lienWhatsApp("+212 701-065553", "salut")).toContain("wa.me/212701065553");
  });

  it("encode le message", () => {
    const lien = lienWhatsApp("212701065553", "Bonjour & merci");
    expect(lien).toContain("Bonjour%20%26%20merci");
  });
});

describe("messageProduit", () => {
  it("mentionne le produit et sa marque, sans prix quand il n’y en a pas", () => {
    const message = messageProduit(produit());
    expect(message).toContain("Produit : Vitamine D3");
    expect(message).toContain("Marque : MGD");
    expect(message).not.toContain("Prix affiché");
  });

  it("mentionne le prix quand il est renseigné", () => {
    expect(messageProduit(produit({ prix: "149" }))).toContain("Prix affiché : 149 DH");
  });

  it("ne contient aucune donnée personnelle", () => {
    const message = messageProduit(produit());
    expect(message).not.toMatch(/\d{6,}/); // aucun numéro, aucune référence client
  });
});
