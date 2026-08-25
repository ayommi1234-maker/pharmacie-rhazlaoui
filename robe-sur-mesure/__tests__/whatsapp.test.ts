import { describe, it, expect } from "vitest";
import { construireResume } from "@/lib/resume";
import { construireMessageWhatsApp, lienWhatsApp } from "@/lib/whatsapp";
import { configurationVide } from "@/lib/types";

function configExemple() {
  const c = configurationVide();
  c.modeleId = "caftan";
  c.tissuId = "satin";
  c.couleurId = "bordeaux";
  c.personnalisation = {
    coupe: "ajustee", longueur: "sol", manches: "longues", col: "rond", dos: "boutons",
    decorations: ["broderie_trad", "ceinture"], emplacements: ["col", "poitrine"],
  };
  c.occasion = { type: "mariage", dateEvenement: "2026-09-01", dateSouhaitee: "2026-08-25" };
  c.mesures = {
    tailleTotale: 165, poitrine: 92, taille: 74, hanches: 98,
    epaules: 40, longueurManche: 58, longueurRobe: 140,
    tailleHabituelle: "M", preferenceCoupe: "ajustee", talons: true,
  };
  c.infos = { prenom: "Sara", nom: "B.", ville: "Casablanca", telephone: "+212600000000", consentement: true };
  return c;
}

describe("message WhatsApp", () => {
  const resume = construireResume(configExemple());
  const message = construireMessageWhatsApp(resume);

  it("contient le modèle et sa référence", () => {
    expect(message).toContain("Caftan marocain");
    expect(message).toContain("CAF-001");
  });
  it("contient les mensurations en cm", () => {
    expect(message).toContain("Taille totale : 165 cm");
    expect(message).toContain("Poitrine : 92 cm");
  });
  it("contient le prix estimatif", () => {
    expect(message).toContain("Prix estimatif");
    expect(message).toContain("DH");
  });
  it("contient les décorations et emplacements", () => {
    expect(message).toContain("Broderie traditionnelle");
    expect(message).toContain("Emplacements");
  });
});

describe("lienWhatsApp", () => {
  it("encode le message et nettoie le numéro", () => {
    const url = lienWhatsApp("+212 600-000-000", "Bonjour à vous");
    expect(url.startsWith("https://wa.me/212600000000?text=")).toBe(true);
    expect(url).toContain("Bonjour%20%C3%A0%20vous");
  });
});

