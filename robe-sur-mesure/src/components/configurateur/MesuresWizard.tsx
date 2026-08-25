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

/* ---------- Schéma de prise de mesures (dessin au trait) ----------
   Silhouette féminine dessinée au trait, tours de mesure figurés par des
   ellipses (arc avant plein, arc arrière en pointillé) et cotes repérées
   par les lettres a → g. La cote correspondant à la mesure en cours est
   mise en évidence. */

const TRAIT = "#8C8C8C";
const ROUGE = "#D33A31";
const VERT = "#2FA02F";
const ACTIF = "#7A2E33";

/** Contour du corps (viewBox 200×390). */
const CORPS =
  "M94,54 C86,57 80,62 78,70 C76,82 78,92 80,100 " +
  "C82,115 79,125 78,135 C77,145 75,152 74,162 " +
  "C72,175 73,185 76,195 C78,215 80,240 82,265 " +
  "C83,290 84,315 85,340 C86,355 86,365 87,372 L95,372 " +
  "C95,350 94,320 96,290 C97,265 99,240 100,215 " +
  "C101,240 103,265 104,290 C106,320 105,350 105,372 L113,372 " +
  "C114,365 114,355 115,340 C116,315 117,290 118,265 " +
  "C120,240 122,215 124,195 C127,185 128,175 126,162 " +
  "C125,152 123,145 122,135 C121,125 118,115 120,100 " +
  "C122,92 124,82 122,70 C120,62 114,57 106,54 Z";
const BRAS_G = "M78,70 C68,85 63,105 61,125 C59,145 58,165 60,182 C61,190 64,195 67,196";
const BRAS_D = "M122,70 C132,85 137,105 139,125 C141,145 142,165 140,182 C139,190 136,195 133,196";

/** Lettre du schéma correspondant à chaque mesure. */
const LETTRE: Partial<Record<keyof Mesures, string>> = {
  epaules: "a",
  longueurRobe: "b",
  longueurManche: "b",
  sousPoitrine: "c",
  poitrine: "d",
  taille: "e",
  hanches: "f",
  tailleTotale: "g",
  tourBras: "b",
  tourPoignet: "b",
};

function SchemaMesures({ mesure }: { mesure: DefMesure }) {
  const actif = LETTRE[mesure.cle];
  const on = (id: string) => actif === id;
  const c = (id: string, base: string) => (on(id) ? ACTIF : base);
  const w = (id: string) => (on(id) ? 2.6 : 1.4);
  const o = (id: string) => (on(id) ? 1 : 0.75);
  const mk = (id: string, base: string) =>
    on(id) ? "url(#fA)" : base === VERT ? "url(#fV)" : "url(#fR)";

  /** Tour de corps : arc avant plein + arc arrière pointillé. */
  const tour = (id: string, x1: number, x2: number, y: number, k: number) => (
    <g opacity={o(id)}>
      <path
        d={`M${x1},${y} Q${(x1 + x2) / 2},${y - k} ${x2},${y}`}
        fill="none"
        stroke={c(id, ROUGE)}
        strokeWidth={w(id)}
        strokeDasharray="3 3"
      />
      <path
        d={`M${x1},${y} Q${(x1 + x2) / 2},${y + k} ${x2},${y}`}
        fill="none"
        stroke={c(id, ROUGE)}
        strokeWidth={w(id)}
        markerStart={mk(id, ROUGE)}
        markerEnd={mk(id, ROUGE)}
      />
    </g>
  );

  return (
    <figure className="mx-auto w-full max-w-[280px]">
      <div className="rounded-lg border border-encre/15 bg-white p-4 shadow-[0_12px_35px_rgba(43,35,32,0.08)]">
        <svg viewBox="0 0 200 390" className="mx-auto h-auto w-full" role="img"
             aria-label={`Schéma de prise de mesure : ${mesure.label}`}>
          <defs>
            <marker id="fR" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
              <path d="M0.5,0.5 L6.5,3.5 L0.5,6.5 Z" fill={ROUGE} />
            </marker>
            <marker id="fV" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
              <path d="M0.5,0.5 L6.5,3.5 L0.5,6.5 Z" fill={VERT} />
            </marker>
            <marker id="fA" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0.5,0.5 L7.5,4 L0.5,7.5 Z" fill={ACTIF} />
            </marker>
          </defs>

          {/* silhouette au trait */}
          <g fill="none" stroke={TRAIT} strokeWidth="1.3" strokeLinecap="round">
            <ellipse cx="100" cy="30" rx="13" ry="17" />
            <path d="M94,45 L94,55 M106,45 L106,55" />
            <path d={CORPS} />
            <path d={BRAS_G} />
            <path d={BRAS_D} />
          </g>

          {/* sol */}
          <line x1="70" y1="378" x2="130" y2="378" stroke={TRAIT} strokeWidth="1.3" />

          {/* a — largeur d'épaules */}
          <g opacity={o("a")}>
            <line x1="76" y1="62" x2="124" y2="62" stroke={c("a", ROUGE)} strokeWidth={w("a")}
                  markerStart={mk("a", ROUGE)} markerEnd={mk("a", ROUGE)} />
            <text x="88" y="56" fontSize="14" fontStyle="italic" fontWeight="700"
                  fill={c("a", ROUGE)} textAnchor="middle">a</text>
          </g>

          {/* étoile verte (point d'épaule) */}
          <text x="134" y="56" fontSize="13" fill={VERT} textAnchor="middle">✳</text>

          {/* c — hauteur d'encolure */}
          <g opacity={o("c")}>
            <line x1="110" y1="50" x2="110" y2="74" stroke={c("c", VERT)} strokeWidth={w("c")}
                  markerStart={mk("c", VERT)} markerEnd={mk("c", VERT)} />
            <text x="120" y="64" fontSize="14" fontStyle="italic" fontWeight="700"
                  fill={c("c", VERT)} textAnchor="middle">c</text>
          </g>

          {/* d — tour de poitrine */}
          {tour("d", 78, 122, 100, 8)}
          <text x="68" y="103" fontSize="14" fontStyle="italic" fontWeight="700"
                fill={c("d", ROUGE)} opacity={o("d")} textAnchor="middle">d</text>

          {/* e — tour de taille */}
          {tour("e", 78, 122, 137, 7)}
          <text x="68" y="140" fontSize="14" fontStyle="italic" fontWeight="700"
                fill={c("e", ROUGE)} opacity={o("e")} textAnchor="middle">e</text>

          {/* f — tour de hanches */}
          {tour("f", 73, 127, 172, 9)}
          <text x="63" y="175" fontSize="14" fontStyle="italic" fontWeight="700"
                fill={c("f", ROUGE)} opacity={o("f")} textAnchor="middle">f</text>

          {/* b — longueur de côté (épaule → bas) */}
          <g opacity={o("b")}>
            <line x1="142" y1="64" x2="152" y2="192" stroke={c("b", ROUGE)} strokeWidth={w("b")}
                  markerStart={mk("b", ROUGE)} markerEnd={mk("b", ROUGE)} />
            <text x="163" y="130" fontSize="14" fontStyle="italic" fontWeight="700"
                  fill={c("b", ROUGE)} textAnchor="middle">b</text>
          </g>

          {/* g — hauteur totale */}
          <g opacity={o("g")}>
            <line x1="100" y1="12" x2="100" y2="377" stroke={c("g", ROUGE)} strokeWidth={w("g")}
                  markerStart={mk("g", ROUGE)} markerEnd={mk("g", ROUGE)} />
            <text x="110" y="300" fontSize="14" fontStyle="italic" fontWeight="700"
                  fill={c("g", ROUGE)} textAnchor="middle">g</text>
          </g>
        </svg>
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
          <SchemaMesures mesure={m} />
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
