"use client";

import { useState } from "react";
import Image from "next/image";
import type { StepProps } from "./Configurateur";
import { Button, Field, TextInput, TextArea, Notice } from "@/components/ui";
import { saisieEnCm, validerMesure, formatCm, type Unite } from "@/lib/mesures";
import type { Mesures } from "@/lib/types";
import { nettoyerTexte } from "@/lib/sanitize";

interface DefMesure {
  cle: keyof Mesures;
  label: string;
  instruction: string;
  obligatoire: boolean;
  horizontal: boolean; // bande horizontale (tour) ou ligne verticale (longueur)
  depart: string;
  arrivee: string;
  trace: string;
  a: [number, number];
  b: [number, number];
  vue?: "face" | "dos";
  departCourt?: string;
  arriveeCourt?: string;
}

const MESURES: DefMesure[] = [
  { cle: "tailleTotale", label: "Taille totale", instruction: "Debout, du sommet de la tête jusqu'au sol.", obligatoire: true, horizontal: false, depart: "Sommet de la tête", arrivee: "Sol, entre les pieds", trace: "M16 5 L16 94", a: [16,5], b: [16,94], departCourt: "Sommet tête", arriveeCourt: "Sol" },
  { cle: "poitrine", label: "Tour de poitrine", instruction: "Autour de la partie la plus forte de la poitrine.", obligatoire: true, horizontal: true, depart: "Point le plus fort, devant", arrivee: "Tour complet jusqu'au point de départ", trace: "M27 34 Q50 38 73 34", a: [27,34], b: [73,34], departCourt: "Pointe poitrine", arriveeCourt: "Tour complet" },
  { cle: "sousPoitrine", label: "Tour sous-poitrine", instruction: "Juste sous la poitrine (facultatif).", obligatoire: false, horizontal: true, depart: "Sous la poitrine, devant", arrivee: "Tour complet jusqu'au point de départ", trace: "M29 39 Q50 42 71 39", a: [29,39], b: [71,39], departCourt: "Sous-poitrine", arriveeCourt: "Tour complet" },
  { cle: "taille", label: "Tour de taille", instruction: "À l'endroit le plus étroit du buste.", obligatoire: true, horizontal: true, depart: "Creux naturel de la taille", arrivee: "Tour complet jusqu'au point de départ", trace: "M32 45 Q50 48 68 45", a: [32,45], b: [68,45], departCourt: "Taille naturelle", arriveeCourt: "Tour complet" },
  { cle: "hanches", label: "Tour de hanches", instruction: "Autour de la partie la plus forte des hanches.", obligatoire: true, horizontal: true, depart: "Partie la plus forte, devant", arrivee: "Tour complet autour des fesses", trace: "M28 53 Q50 57 72 53", a: [28,53], b: [72,53], departCourt: "Hanches larges", arriveeCourt: "Tour des fesses" },
  { cle: "epaules", label: "Largeur des épaules", instruction: "Dans le dos, d'une pointe d'épaule à l'autre en suivant la courbe naturelle.", obligatoire: true, horizontal: true, depart: "Pointe de l'épaule gauche, dans le dos", arrivee: "Pointe de l'épaule droite, dans le dos", trace: "M28 25 Q50 22 72 25", a: [28,25], b: [72,25], vue: "dos", departCourt: "Épaule gauche", arriveeCourt: "Épaule droite" },
  { cle: "longueurManche", label: "Longueur de manche", instruction: "De la pointe de l'épaule, en passant par le coude légèrement plié, jusqu'au poignet.", obligatoire: true, horizontal: false, depart: "Pointe de l'épaule", arrivee: "Os du poignet, après passage par le coude", trace: "M71 25 Q76 38 82 56", a: [71,25], b: [82,56], vue: "dos", departCourt: "Pointe épaule", arriveeCourt: "Os du poignet" },
  { cle: "tourBras", label: "Tour de bras", instruction: "Autour de la partie la plus forte du bras (facultatif).", obligatoire: false, horizontal: true, depart: "Partie la plus forte du bras", arrivee: "Tour complet jusqu'au point de départ", trace: "M66 33 Q72 35 78 33", a: [66,33], b: [78,33], departCourt: "Biceps large", arriveeCourt: "Tour complet" },
  { cle: "tourPoignet", label: "Tour de poignet", instruction: "Autour du poignet (facultatif).", obligatoire: false, horizontal: true, depart: "Autour de l'os du poignet", arrivee: "Tour complet jusqu'au point de départ", trace: "M77 56 Q82 57 87 56", a: [77,56], b: [87,56], departCourt: "Os du poignet", arriveeCourt: "Tour complet" },
  { cle: "longueurRobe", label: "Longueur de robe", instruction: "De l'épaule jusqu'au bas souhaité de la robe.", obligatoire: true, horizontal: false, depart: "Sommet de l'épaule, près du cou", arrivee: "Bas souhaité de la robe", trace: "M63 24 L63 92", a: [63,24], b: [63,92], departCourt: "Épaule près du cou", arriveeCourt: "Bas souhaité" },
];

function GuidePhoto({ mesure }: { mesure: DefMesure }) {
  return (
    <figure className="mx-auto w-full max-w-[280px]">
      <div className="rounded-lg border border-encre/15 bg-white p-4 shadow-[0_12px_35px_rgba(43,35,32,0.08)]">
        <Image
          src="/products/guide-mesures-reference.png"
          alt={`Guide de prise de mesure : ${mesure.label}`}
          width={126}
          height={251}
          className="mx-auto h-auto w-full object-contain [image-rendering:auto]"
          priority
        />
      </div>
      <figcaption className="mt-2 text-center text-xs font-semibold text-bordeaux">{mesure.label}</figcaption>
    </figure>
  );
}

export function MesuresWizard({ config, patchMesures }: StepProps) {
  const total = MESURES.length + 1; // +1 écran d'infos complémentaires
  const [idx, setIdx] = useState(0);
  // état local des saisies (texte + unité) par mesure
  const [textes, setTextes] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    MESURES.forEach((m) => {
      const v = config.mesures[m.cle];
      if (typeof v === "number") init[m.cle] = String(v);
    });
    return init;
  });
  const [unites, setUnites] = useState<Record<string, Unite>>({});

  const surInfos = idx >= MESURES.length;
  const m = MESURES[idx];

  const texte = m ? textes[m.cle] ?? "" : "";
  const unite = m ? unites[m.cle] ?? "cm" : "cm";
  const cm = m ? saisieEnCm(texte, unite) : null;
  const validation = m && texte.trim() !== "" ? validerMesure(m.cle, cm) : { niveau: "ok" as const };

  const majMesure = (val: string, u: Unite) => {
    if (!m) return;
    setTextes((t) => ({ ...t, [m.cle]: val }));
    setUnites((us) => ({ ...us, [m.cle]: u }));
    const c = saisieEnCm(val, u);
    const ok = c !== null && validerMesure(m.cle, c).niveau !== "erreur";
    patchMesures({ [m.cle]: ok ? c : undefined } as Partial<Mesures>);
  };

  const peutSuivant =
    surInfos ||
    !m.obligatoire ||
    (texte.trim() !== "" && validation.niveau !== "erreur");

  return (
    <div className="space-y-4">
      <Notice tone="attention">
        Pour un résultat précis, demandez si possible à une autre personne de prendre vos mesures. Ne serrez pas le
        mètre ruban, gardez-le parallèle au sol pour les tours et portez des vêtements fins.
      </Notice>

      <p className="text-xs text-encre/50">Mesure {Math.min(idx + 1, total)} sur {total}</p>

      {!surInfos ? (
        <div className="space-y-3">
          <GuidePhoto mesure={m} />
          <div>
            <h2 className="font-serif text-lg font-bold">{m.label}{!m.obligatoire && <span className="text-xs font-normal text-encre/50"> (facultatif)</span>}</h2>
            <p className="text-sm text-encre/60">{m.instruction}</p>
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Field label="Votre mesure" htmlFor="mesure-input">
                <TextInput
                  id="mesure-input"
                  inputMode="decimal"
                  value={texte}
                  onChange={(e) => majMesure(e.target.value, unite)}
                  placeholder={unite === "m" ? "ex : 1,65" : "ex : 92"}
                />
              </Field>
            </div>
            <div className="flex overflow-hidden rounded-xl2 border border-encre/20">
              {(["cm", "m"] as Unite[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  aria-pressed={unite === u}
                  onClick={() => majMesure(texte, u)}
                  className={`px-3 py-3 text-sm min-h-[48px] ${unite === u ? "bg-bordeaux text-creme" : "bg-white"}`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {texte.trim() !== "" && cm !== null && (
            <p className="text-xs text-encre/60">Enregistré : <strong>{formatCm(cm)}</strong></p>
          )}
          {validation.niveau === "erreur" && <Notice tone="erreur">{validation.message}</Notice>}
          {validation.niveau === "avertissement" && <Notice tone="attention">{validation.message}</Notice>}
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-bold">Informations complémentaires</h2>
          <Field label="Taille habituelle" htmlFor="taille-hab">
            <div className="flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL", "XXL", "Autre"].map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={config.mesures.tailleHabituelle === s}
                  onClick={() => patchMesures({ tailleHabituelle: s })}
                  className={`rounded-full border px-3 py-2 text-sm min-h-[44px] ${
                    config.mesures.tailleHabituelle === s ? "border-bordeaux bg-bordeaux text-creme" : "border-encre/20 bg-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Préférence de coupe" htmlFor="pref-coupe">
            <div className="flex gap-2">
              {(["ajustee", "normale", "ample"] as const).map((pc) => (
                <button
                  key={pc}
                  type="button"
                  aria-pressed={config.mesures.preferenceCoupe === pc}
                  onClick={() => patchMesures({ preferenceCoupe: pc })}
                  className={`rounded-full border px-3 py-2 text-sm min-h-[44px] ${
                    config.mesures.preferenceCoupe === pc ? "border-bordeaux bg-bordeaux text-creme" : "border-encre/20 bg-white"
                  }`}
                >
                  {pc === "ajustee" ? "Ajustée" : pc === "normale" ? "Normale" : "Ample"}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Porterez-vous des talons avec la robe ?" htmlFor="talons">
            <div className="flex gap-2">
              {[{ v: true, l: "Oui" }, { v: false, l: "Non" }].map((o) => (
                <button
                  key={o.l}
                  type="button"
                  aria-pressed={config.mesures.talons === o.v}
                  onClick={() => patchMesures({ talons: o.v })}
                  className={`rounded-full border px-4 py-2 text-sm min-h-[44px] ${
                    config.mesures.talons === o.v ? "border-bordeaux bg-bordeaux text-creme" : "border-encre/20 bg-white"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Notes particulières (facultatif)" htmlFor="notes-mesures">
            <TextArea
              id="notes-mesures"
              value={config.mesures.notesMesures ?? ""}
              onChange={(e) => patchMesures({ notesMesures: nettoyerTexte(e.target.value) })}
              placeholder="ex : épaule droite plus basse, préférence de longueur…"
            />
          </Field>

          <Notice tone="info">Toutes les mesures sont enregistrées en centimètres.</Notice>
        </div>
      )}

      {/* Navigation interne des mesures */}
      <div className="flex items-center justify-between gap-3 border-t border-encre/10 pt-4">
        <Button variante="ghost" onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0}>
          ← Mesure précédente
        </Button>
        {idx < total - 1 ? (
          <Button variante="secondary" onClick={() => setIdx((i) => i + 1)} disabled={!peutSuivant}>
            Mesure suivante →
          </Button>
        ) : (
          <span className="text-xs text-encre/50">Utilisez « Suivant » en bas pour le récapitulatif.</span>
        )}
      </div>
    </div>
  );
}
