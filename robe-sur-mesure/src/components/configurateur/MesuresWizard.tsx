"use client";

import { useState } from "react";
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
  zone: number; // 0..1 hauteur du corps pour le schéma
  horizontal: boolean; // bande horizontale (tour) ou ligne verticale (longueur)
}

const MESURES: DefMesure[] = [
  { cle: "tailleTotale", label: "Taille totale", instruction: "Debout, du sommet de la tête jusqu'au sol.", obligatoire: true, zone: 0.5, horizontal: false },
  { cle: "poitrine", label: "Tour de poitrine", instruction: "Autour de la partie la plus forte de la poitrine.", obligatoire: true, zone: 0.28, horizontal: true },
  { cle: "sousPoitrine", label: "Tour sous-poitrine", instruction: "Juste sous la poitrine (facultatif).", obligatoire: false, zone: 0.34, horizontal: true },
  { cle: "taille", label: "Tour de taille", instruction: "À l'endroit le plus étroit du buste.", obligatoire: true, zone: 0.42, horizontal: true },
  { cle: "hanches", label: "Tour de hanches", instruction: "Autour de la partie la plus forte des hanches.", obligatoire: true, zone: 0.55, horizontal: true },
  { cle: "epaules", label: "Largeur des épaules", instruction: "D'une épaule à l'autre, dans le dos.", obligatoire: true, zone: 0.2, horizontal: true },
  { cle: "longueurManche", label: "Longueur de manche", instruction: "De l'épaule jusqu'au poignet, bras légèrement plié.", obligatoire: true, zone: 0.4, horizontal: false },
  { cle: "tourBras", label: "Tour de bras", instruction: "Autour de la partie la plus forte du bras (facultatif).", obligatoire: false, zone: 0.3, horizontal: true },
  { cle: "tourPoignet", label: "Tour de poignet", instruction: "Autour du poignet (facultatif).", obligatoire: false, zone: 0.5, horizontal: true },
  { cle: "longueurRobe", label: "Longueur de robe", instruction: "De l'épaule jusqu'au bas souhaité de la robe.", obligatoire: true, zone: 0.7, horizontal: false },
];

function Schema({ zone, horizontal }: { zone: number; horizontal: boolean }) {
  const y = 20 + zone * 200;
  return (
    <svg viewBox="0 0 160 260" className="mx-auto h-40 w-auto" role="img" aria-label="Schéma de mesure">
      <g fill="none" stroke="#B9975B" strokeWidth="2">
        <circle cx="80" cy="24" r="14" />
        <path d="M80 38 L52 66 L60 78 L60 150 Q80 162 100 150 L100 78 L108 66 Z" />
        <path d="M60 78 L40 150 M100 78 L120 150" />
        <path d="M62 150 L58 235 M98 150 L102 235" />
      </g>
      {horizontal ? (
        <line x1="30" y1={y} x2="130" y2={y} stroke="#7A2E33" strokeWidth="3" strokeDasharray="5 4" />
      ) : (
        <line x1="80" y1="20" x2="80" y2={20 + zone * 210} stroke="#7A2E33" strokeWidth="3" strokeDasharray="5 4" />
      )}
    </svg>
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
        mètre ruban et portez des vêtements fins.
      </Notice>

      <p className="text-xs text-encre/50">Mesure {Math.min(idx + 1, total)} sur {total}</p>

      {!surInfos ? (
        <div className="space-y-3">
          <Schema zone={m.zone} horizontal={m.horizontal} />
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
