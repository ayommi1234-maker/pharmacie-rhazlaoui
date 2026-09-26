import { describe, it, expect } from "vitest";
import { estimerPrix, formatDH } from "@/lib/prix";
import type { Modele, Tissu, Decoration } from "@/lib/types";

const modele: Modele = {
  id: "x", nom: "X", reference: "R", description: "", photo: "",
  prixBaseDH: 900, tissusConseilles: [], delaiEstime: "", demo: true,
};
const tissu: Tissu = {
  id: "t", nom: "T", photo: "", description: "", opacite: "opaque",
  epaisseur: "moyen", souplesse: "moyen", saison: [], couleursDisponibles: [],
  supplementDH: 200, disponibilite: "en_stock",
};
const deco = (supp: number): Decoration => ({
  id: "d", nom: "D", description: "", image: "", supplementDH: supp, disponibilite: "en_stock",
});

describe("estimerPrix", () => {
  it("additionne base + tissu + décorations + personnalisations", () => {
    const r = estimerPrix({ modele, tissu, decorations: [deco(80), deco(150)], supplementsPerso: 50 });
    expect(r.base).toBe(900);
    expect(r.tissu).toBe(200);
    expect(r.decorations).toBe(230);
    expect(r.personnalisations).toBe(50);
    expect(r.total).toBe(1380);
    expect(r.aConfirmer).toBe(false);
  });
  it("marque « à confirmer » si le modèle n'a pas de prix de base", () => {
    const r = estimerPrix({ modele: { ...modele, prixBaseDH: 0 }, tissu, decorations: [], supplementsPerso: 0 });
    expect(r.aConfirmer).toBe(true);
  });
});

describe("formatDH", () => {
  it("affiche la devise DH", () => {
    expect(formatDH(1380)).toContain("DH");
  });
});

