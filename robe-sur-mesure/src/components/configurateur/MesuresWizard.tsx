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

/* --- Schéma de mesures : silhouette féminine + repère de la mesure active --- */

const OR = "#B9975B"; // doré (repères faibles)
const BX = "#7A2E33"; // bordeaux (repère actif)

// Silhouette (viewBox 200x380) construite à partir d'un profil symétrique.
const SILHOUETTE =
  "M91,56 C74,58 60,66 58,76 C52,92 52,104 54,112 C56,128 52,148 66,168 " +
  "C60,182 58,196 56,208 C52,232 60,250 62,270 C66,308 68,336 76,362 " +
  "L90,362 C92,340 96,312 100,300 C104,312 108,340 110,362 L124,362 " +
  "C132,336 134,308 138,270 C140,250 148,232 144,208 C142,196 140,182 134,168 " +
  "C148,148 144,128 146,112 C148,104 148,92 142,76 C140,66 126,58 109,56 Z";

type Guide =
  | { t: "h"; y: number; x1: number; x2: number; lettre?: string }
  | { t: "v"; x: number; y1: number; y2: number; lettre?: string }
  | { t: "l"; x1: number; y1: number; x2: number; y2: number; lettre?: string };

const GUIDES: Partial<Record<keyof Mesures, Guide>> = {
  epaules: { t: "h", y: 78, x1: 56, x2: 144, lettre: "a" },
  poitrine: { t: "h", y: 112, x1: 52, x2: 148, lettre: "d" },
  sousPoitrine: { t: "h", y: 138, x1: 60, x2: 140 },
  taille: { t: "h", y: 166, x1: 66, x2: 134, lettre: "e" },
  hanches: { t: "h", y: 206, x1: 54, x2: 146, lettre: "f" },
  tailleTotale: { t: "v", x: 100, y1: 20, y2: 364, lettre: "g" },
  longueurRobe: { t: "v", x: 162, y1: 78, y2: 300, lettre: "b" },
  longueurManche: { t: "l", x1: 150, y1: 84, x2: 158, y2: 196, lettre: "c" },
  tourBras: { t: "h", y: 120, x1: 150, x2: 172 },
  tourPoignet: { t: "h", y: 196, x1: 150, x2: 170 },
};

// Repères toujours visibles (faibles), comme sur un schéma de couture pro.
const FIXES: (keyof Mesures)[] = ["epaules", "poitrine", "taille", "hanches", "tailleTotale"];

function ligne(g: Guide, actif: boolean) {
  const col = actif ? BX : OR;
  const w = actif ? 2.4 : 1.2;
  const op = actif ? 1 : 0.4;
  const marker = actif ? "url(#aB)" : "url(#aO)";
  const common = { stroke: col, strokeWidth: w, opacity: op, markerStart: marker, markerEnd: marker };
  let el: JSX.Element;
  let lx = 0, ly = 0;
  if (g.t === "h") {
    el = <line x1={g.x1} y1={g.y} x2={g.x2} y2={g.y} {...common} />;
    lx = (g.x1 + g.x2) / 2; ly = g.y - 6;
  } else if (g.t === "v") {
    el = <line x1={g.x} y1={g.y1} x2={g.x} y2={g.y2} {...common} />;
    lx = g.x + 8; ly = (g.y1 + g.y2) / 2;
  } else {
    el = <line x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} {...common} />;
    lx = (g.x1 + g.x2) / 2 + 8; ly = (g.y1 + g.y2) / 2;
  }
  return (
    <g key={`${g.t}-${g.lettre ?? Math.round(lx)}-${Math.round(ly)}`}>
      {el}
      {g.lettre && (
        <text x={lx} y={ly} fontSize="13" fontWeight="700" fill={col} opacity={op} textAnchor="middle">
          {g.lettre}
        </text>
      )}
    </g>
  );
}

function Schema({ cle }: { cle: keyof Mesures }) {
  const actif = GUIDES[cle];
  const fixes = FIXES.filter((k) => k !== cle);
  return (
    <svg viewBox="0 0 200 384" className="mx-auto h-48 w-auto" role="img" aria-label="Schéma de mesure">
      <defs>
        <marker id="aO" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 Z" fill={OR} />
        </marker>
        <marker id="aB" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto">
          <path d="M1,1 L8,4.5 L1,8 Z" fill={BX} />
        </marker>
      </defs>
      {/* corps */}
      <circle cx="100" cy="36" r="17" fill="#F3ECE1" stroke={OR} strokeWidth="1.5" />
      <path d="M92,52 L108,52 L106,62 L94,62 Z" fill="#F3ECE1" stroke={OR} strokeWidth="1.5" />
      <path d={SILHOUETTE} fill="#F3ECE1" stroke={OR} strokeWidth="1.5" />
      {/* bras (repères de manche/bras) */}
      <path d="M58,80 C44,110 44,150 52,196" fill="none" stroke={OR} strokeWidth="1.5" opacity="0.7" />
      <path d="M142,80 C156,110 156,150 148,196" fill="none" stroke={OR} strokeWidth="1.5" opacity="0.7" />
      {/* repères fixes (faibles) */}
      {fixes.map((k) => (GUIDES[k] ? ligne(GUIDES[k] as Guide, false) : null))}
      {/* repère actif (bordeaux) */}
      {actif && ligne(actif, true)}
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
