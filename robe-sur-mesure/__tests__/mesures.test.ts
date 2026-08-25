import { describe, it, expect } from "vitest";
import {
  parseNombre, enCentimetres, saisieEnCm, validerMesure, formatCm,
} from "@/lib/mesures";

describe("parseNombre", () => {
  it("accepte la virgule et le point", () => {
    expect(parseNombre("1,65")).toBe(1.65);
    expect(parseNombre("1.65")).toBe(1.65);
  });
  it("ignore les espaces", () => {
    expect(parseNombre(" 92 ")).toBe(92);
  });
  it("rejette les entrées invalides", () => {
    expect(parseNombre("abc")).toBeNull();
    expect(parseNombre("")).toBeNull();
    expect(parseNombre("1,2,3")).toBeNull();
  });
});

describe("enCentimetres", () => {
  it("convertit les mètres en cm", () => {
    expect(enCentimetres(1.65, "m")).toBe(165);
    expect(enCentimetres(0.92, "m")).toBe(92); // pas 91.99999
  });
  it("laisse les cm inchangés", () => {
    expect(enCentimetres(92, "cm")).toBe(92);
  });
});

describe("saisieEnCm", () => {
  it("parse + convertit", () => {
    expect(saisieEnCm("1,65", "m")).toBe(165);
    expect(saisieEnCm("92", "cm")).toBe(92);
    expect(saisieEnCm("x", "cm")).toBeNull();
  });
});

describe("validerMesure", () => {
  it("valide une valeur normale", () => {
    expect(validerMesure("tailleTotale", 165).niveau).toBe("ok");
  });
  it("avertit (sans bloquer) pour une valeur inhabituelle", () => {
    expect(validerMesure("tailleTotale", 125).niveau).toBe("avertissement");
  });
  it("erreur pour une valeur absurde ou nulle", () => {
    expect(validerMesure("tailleTotale", 300).niveau).toBe("erreur");
    expect(validerMesure("tailleTotale", null).niveau).toBe("erreur");
  });
});

describe("formatCm", () => {
  it("formate en cm", () => {
    expect(formatCm(165)).toBe("165 cm");
    expect(formatCm(undefined)).toBe("—");
  });
});
