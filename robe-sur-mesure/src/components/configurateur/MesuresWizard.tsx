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
}

const MESURES: DefMesure[] = [
  { cle: "tailleTotale", label: "Taille totale", instruction: "Debout, du sommet de la tête jusqu'au sol.", obligatoire: true },
  { cle: "epaules", label: "Largeur des épaules", instruction: "D'une épaule à l'autre, dans le dos.", obligatoire: true },
  { cle: "poitrine", label: "Tour de poitrine", instruction: "Autour de la partie la plus forte de la poitrine.", obligatoire: true },
  { cle: "sousPoitrine", label: "Tour sous-poitrine", instruction: "Juste sous la poitrine (facultatif).", obligatoire: false },
  { cle: "taille", label: "Tour de taille", instruction: "À l'endroit le plus étroit du buste.", obligatoire: true },
  { cle: "hanches", label: "Tour de hanches", instruction: "Autour de la partie la plus forte des hanches.", obligatoire: true },
  { cle: "longueurManche", label: "Longueur de manche", instruction: "De l'épaule jusqu'au poignet, bras légèrement plié.", obligatoire: true },
  { cle: "tourBras", label: "Tour de bras", instruction: "Autour de la partie la plus forte du bras (facultatif).", obligatoire: false },
  { cle: "tourPoignet", label: "Tour de poignet", instruction: "Autour du poignet (facultatif).", obligatoire: false },
  { cle: "longueurRobe", label: "Longueur de robe", instruction: "De l'épaule jusqu'au bas souhaité de la robe.", obligatoire: true },
];

/* --- Schéma de mesures : reproduction d'un schéma standard (silhouette + lettres a–g) --- */

const CORPS = "#C9B8D6";
const CONTOUR = "#A992BE";
const ROUGE = "#E23B32";
const VERT = "#35A835";
const ACTIF = "#7A2E33";

// Silhouette féminine de face (viewBox 200x400) : épaules, poitrine, taille
// marquée, hanches, jambes. Proportions de croquis de mode.
const TORSO =
  "M88,50 L74,60 C68,64 66,76 68,92 C70,110 76,120 78,132 " +
  "C79,140 78,150 74,162 C68,178 66,190 70,205 " +
  "C72,232 76,260 78,290 C79,320 80,350 80,372 L94,372 " +
  "C94,340 92,300 94,270 C95,250 98,226 100,210 " +
  "C102,226 105,250 106,270 C108,300 106,340 106,372 L120,372 " +
  "C120,350 121,320 122,290 C124,260 128,232 130,205 " +
  "C134,190 132,178 126,162 C122,150 121,140 122,132 " +
  "C124,120 130,110 132,92 C134,76 132,64 126,60 L112,50 Z";
const BRAS_G =
  "M74,60 C62,72 56,96 54,126 C53,146 54,162 56,178 L66,178 " +
  "C66,160 66,140 68,122 C70,100 72,80 78,66 Z";
const BRAS_D =
  "M126,60 C138,72 144,96 146,126 C147,146 146,162 144,178 L134,178 " +
  "C134,160 134,140 132,122 C130,100 128,80 122,66 Z";

// Chaque mesure surligne une lettre du schéma.
const LETTRE: Partial<Record<keyof Mesures, string>> = {
  epaules: "a",
  poitrine: "d",
  sousPoitrine: "d",
  taille: "e",
  hanches: "f",
  tailleTotale: "g",
  longueurRobe: "b",
  longueurManche: "b",
};

function Schema({ cle }: { cle: keyof Mesures }) {
  const act = LETTRE[cle];
  const on = (id: string) => act === id;
  const w = (id: string) => (on(id) ? 3 : 1.6);
  const col = (id: string, base: string) => (on(id) ? ACTIF : base);
  const lab = (id: string, base: string) => (on(id) ? ACTIF : base);
  const fw = (id: string) => (on(id) ? 800 : 700);

  return (
    <svg viewBox="0 0 200 400" className="mx-auto h-60 w-auto" role="img" aria-label="Schéma de mesure">
      <defs>
        <marker id="rA" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M1,1 L6,3.5 L1,6 Z" fill={ROUGE} />
        </marker>
        <marker id="vA" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M1,1 L6,3.5 L1,6 Z" fill={VERT} />
        </marker>
        <marker id="bA" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M1,1 L6,3.5 L1,6 Z" fill={ACTIF} />
        </marker>
      </defs>

      {/* corps */}
      <path d={BRAS_G} fill={CORPS} stroke={CONTOUR} strokeWidth="1" />
      <path d={BRAS_D} fill={CORPS} stroke={CONTOUR} strokeWidth="1" />
      <path d="M92,38 L108,38 L107,52 L93,52 Z" fill={CORPS} stroke={CONTOUR} strokeWidth="1" />
      <path d={TORSO} fill={CORPS} stroke={CONTOUR} strokeWidth="1" />
      <circle cx="100" cy="24" r="16" fill={CORPS} stroke={CONTOUR} strokeWidth="1" />

      {(() => {
        const mk = (id: string) => (on(id) ? "url(#bA)" : id === "b" || id === "c" || id === "d" ? "url(#vA)" : "url(#rA)");
        return (
          <>
            {/* a — épaules (rouge) + étoile verte */}
            <line x1="74" y1="58" x2="126" y2="58" stroke={col("a", ROUGE)} strokeWidth={w("a")} markerStart={mk("a")} markerEnd={mk("a")} />
            <text x="100" y="50" fontSize="13" fontWeight={fw("a")} fill={lab("a", ROUGE)} textAnchor="middle">a</text>
            <text x="136" y="50" fontSize="12" fill={VERT} textAnchor="middle">✳</text>
            {/* c — encolure (vert) */}
            <line x1="100" y1="40" x2="100" y2="56" stroke={col("c", VERT)} strokeWidth={w("c")} markerStart={mk("c")} markerEnd={mk("c")} />
            <text x="112" y="48" fontSize="13" fontWeight={fw("c")} fill={lab("c", VERT)} textAnchor="middle">c</text>
            {/* d — poitrine (vert) */}
            <line x1="68" y1="92" x2="132" y2="92" stroke={col("d", VERT)} strokeWidth={w("d")} markerStart={mk("d")} markerEnd={mk("d")} />
            <text x="59" y="96" fontSize="13" fontWeight={fw("d")} fill={lab("d", VERT)} textAnchor="middle">d</text>
            {/* e — taille (rouge) */}
            <line x1="78" y1="134" x2="122" y2="134" stroke={col("e", ROUGE)} strokeWidth={w("e")} markerStart={mk("e")} markerEnd={mk("e")} />
            <text x="69" y="138" fontSize="13" fontWeight={fw("e")} fill={lab("e", ROUGE)} textAnchor="middle">e</text>
            {/* f — hanches (rouge) */}
            <line x1="68" y1="176" x2="132" y2="176" stroke={col("f", ROUGE)} strokeWidth={w("f")} markerStart={mk("f")} markerEnd={mk("f")} />
            <text x="59" y="180" fontSize="13" fontWeight={fw("f")} fill={lab("f", ROUGE)} textAnchor="middle">f</text>
            {/* b — longueur de côté (vert) */}
            <line x1="158" y1="62" x2="166" y2="186" stroke={col("b", VERT)} strokeWidth={w("b")} markerStart={mk("b")} markerEnd={mk("b")} />
            <text x="176" y="126" fontSize="13" fontWeight={fw("b")} fill={lab("b", VERT)} textAnchor="middle">b</text>
            {/* g — hauteur totale (rouge) */}
            <line x1="100" y1="10" x2="100" y2="378" stroke={col("g", ROUGE)} strokeWidth={w("g")} markerStart={mk("g")} markerEnd={mk("g")} />
            <text x="110" y="300" fontSize="13" fontWeight={fw("g")} fill={lab("g", ROUGE)} textAnchor="middle">g</text>
          </>
        );
      })()}
    </svg>
  );
}

export function MesuresWizard({ config, patchMesures }: StepProps) {
  const total = MESURES.length + 1; // +1 écran d'infos complémentaires
  const [idx, setIdx] = useState(0);
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
    surInfos || !m.obligatoire || (texte.trim() !== "" && validation.niveau !== "erreur");

  return (
    <div className="space-y-4">
      <Notice tone="attention">
        Pour un résultat précis, demandez si possible à une autre personne de prendre vos mesures. Ne serrez pas le
        mètre ruban et portez des vêtements fins.
      </Notice>

      <p className="text-xs text-encre/50">Mesure {Math.min(idx + 1, total)} sur {total}</p>

      {!surInfos ? (
        <div className="space-y-3">
          <Schema cle={m.cle} />
          <div>
            <h2 className="font-serif text-lg font-bold">
              {m.label}
              {!m.obligatoire && <span className="text-xs font-normal text-encre/50"> (facultatif)</span>}
            </h2>
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
