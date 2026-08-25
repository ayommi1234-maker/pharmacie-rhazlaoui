"use client";

import Image from "next/image";
import { useRef } from "react";
import type { StepProps } from "./Configurateur";
import {
  SelectCard, Chip, Notice, Field, TextInput, TextArea, Button,
} from "@/components/ui";
import { MODELES } from "@/data/modeles";
import { TISSUS, tissuParId, tissuCommandable } from "@/data/tissus";
import { COULEURS, ID_COULEUR_PERSO } from "@/data/couleurs";
import { COUPES, LONGUEURS, MANCHES, COLS, DOS, EMPLACEMENTS, type Option } from "@/data/options";
import { DECORATIONS } from "@/data/decorations";
import { OCCASIONS } from "@/data/occasions";
import { formatDH } from "@/lib/prix";
import type { Disponibilite } from "@/lib/types";
import { nettoyerTexte } from "@/lib/sanitize";

function DispoBadge({ d }: { d: Disponibilite }) {
  if (d === "en_stock") return <Chip tone="ok">En stock</Chip>;
  if (d === "sur_commande") return <Chip tone="neutre">Sur commande</Chip>;
  if (d === "indisponible") return <Chip tone="attention">Indisponible</Chip>;
  return <Chip tone="attention">À confirmer</Chip>;
}

async function lireImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

/* Groupe de choix unique (chips) */
function ChoixGroupe({
  legende, options, valeur, onChange,
}: {
  legende: string;
  options: Option[];
  valeur?: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold">{legende}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const actif = valeur === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={actif}
              onClick={() => onChange(o.id)}
              className={`rounded-full border px-3 py-2 text-sm min-h-[44px] transition-colors ${
                actif ? "border-bordeaux bg-bordeaux text-creme" : "border-encre/20 bg-white hover:border-bordeaux/40"
              }`}
            >
              {o.nom}
              {o.supplementDH > 0 && <span className={actif ? "opacity-80" : "text-encre/50"}> +{o.supplementDH} DH</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ÉTAPE 1 — Modèle */
export function StepModele({ config, patch }: StepProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const perso = MODELES.find((m) => m.id === config.modeleId)?.personnalisableParPhoto;
  return (
    <div className="space-y-4">
      <p className="text-sm text-encre/70">Choisissez un modèle. Chaque robe est confectionnée à vos mesures.</p>
      <div className="grid grid-cols-2 gap-3">
        {MODELES.map((m) => (
          <SelectCard key={m.id} selected={config.modeleId === m.id} onClick={() => patch({ modeleId: m.id })} ariaLabel={m.nom}>
            <div className="relative mb-2 aspect-[4/5] w-full overflow-hidden rounded-lg bg-ivoire">
              <Image src={m.photo} alt={m.nom} fill className="object-cover" sizes="180px" />
            </div>
            <p className="text-sm font-semibold leading-tight">{m.nom}</p>
            <p className="text-xs text-encre/50">{m.reference}</p>
            <p className="mt-0.5 text-xs font-semibold text-bordeaux">
              {m.prixBaseDH > 0 ? `Dès ${formatDH(m.prixBaseDH)}` : "Prix à confirmer"}
            </p>
          </SelectCard>
        ))}
      </div>

      {perso && (
        <div className="space-y-3">
          <Notice tone="attention">
            La reproduction exacte n&apos;est pas garantie. Le modèle sera confirmé par la couturière avant
            fabrication.
          </Notice>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (f) patch({ imageInspiration: await lireImage(f) });
            }}
          />
          <Button variante="secondary" onClick={() => fileRef.current?.click()}>
            {config.imageInspiration ? "Changer l'image d'inspiration" : "Ajouter une image d'inspiration"}
          </Button>
          {config.imageInspiration && (
            <div className="relative aspect-[4/5] w-32 overflow-hidden rounded-lg border border-encre/10">
              <Image src={config.imageInspiration} alt="Inspiration" fill className="object-cover" sizes="128px" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ÉTAPE 2 — Tissu */
export function StepTissu({ config, patch }: StepProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-encre/70">Sélectionnez un tissu. Le supplément éventuel s&apos;ajoute au prix.</p>
      {TISSUS.map((t) => {
        const commandable = tissuCommandable(t);
        return (
          <SelectCard
            key={t.id}
            selected={config.tissuId === t.id}
            disabled={!commandable}
            onClick={() => {
              // réinitialise la couleur si elle n'existe pas pour ce tissu
              const couleurOk = config.couleurId && (config.couleurId === ID_COULEUR_PERSO || t.couleursDisponibles.includes(config.couleurId));
              patch({ tissuId: t.id, couleurId: couleurOk ? config.couleurId : undefined });
            }}
            ariaLabel={t.nom}
          >
            <div className="flex gap-3">
              <div className="relative h-20 w-20 flex-none overflow-hidden rounded-lg bg-ivoire">
                <Image src={t.photo} alt={t.nom} fill className="object-cover" sizes="80px" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold">{t.nom}</p>
                  <DispoBadge d={t.disponibilite} />
                </div>
                <p className="text-xs text-encre/60">{t.description}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Chip>{t.opacite.replace("_", "-")}</Chip>
                  <Chip>{t.epaisseur}</Chip>
                  <Chip>{t.souplesse}</Chip>
                </div>
                <p className="mt-1 text-xs">
                  <span className="text-encre/50">Saison : {t.saison.join(", ")}</span>
                  {" · "}
                  <span className="font-semibold text-bordeaux">
                    {t.supplementDH > 0 ? `+${formatDH(t.supplementDH)}` : "inclus"}
                  </span>
                </p>
              </div>
            </div>
          </SelectCard>
        );
      })}
    </div>
  );
}

/* ÉTAPE 3 — Couleur (dépend du tissu) */
export function StepCouleur({ config, patch }: StepProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const tissu = tissuParId(config.tissuId);
  const dispo = tissu ? COULEURS.filter((c) => tissu.couleursDisponibles.includes(c.id)) : COULEURS;

  return (
    <div className="space-y-4">
      {!tissu && <Notice tone="attention">Choisissez d&apos;abord un tissu à l&apos;étape précédente.</Notice>}
      <p className="text-sm text-encre/70">Couleurs disponibles pour ce tissu :</p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {dispo.map((c) => {
          const actif = config.couleurId === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={actif}
              onClick={() => patch({ couleurId: c.id })}
              className="flex flex-col items-center gap-1"
            >
              <span
                className={`h-12 w-12 rounded-full border ${actif ? "ring-2 ring-bordeaux ring-offset-2" : "border-encre/20"}`}
                style={{ backgroundColor: c.hex }}
                aria-hidden
              />
              <span className="text-xs">{c.nom}</span>
            </button>
          );
        })}
      </div>

      <div className="border-t border-encre/10 pt-4">
        <SelectCard
          selected={config.couleurId === ID_COULEUR_PERSO}
          onClick={() => patch({ couleurId: ID_COULEUR_PERSO })}
          ariaLabel="Couleur personnalisée"
        >
          <p className="font-semibold">Couleur personnalisée</p>
          <p className="text-xs text-encre/60">Nommez la couleur, ajoutez une photo, ou choisissez une teinte approximative.</p>
        </SelectCard>

        {config.couleurId === ID_COULEUR_PERSO && (
          <div className="mt-3 space-y-3">
            <Field label="Nom de la couleur" htmlFor="coul-nom">
              <TextInput
                id="coul-nom"
                value={config.couleurPersoNom ?? ""}
                onChange={(e) => patch({ couleurPersoNom: nettoyerTexte(e.target.value, 40) })}
                placeholder="ex : vieux rose, bleu pétrole…"
              />
            </Field>
            <Field label="Teinte approximative" htmlFor="coul-picker">
              <input
                id="coul-picker"
                type="color"
                value={config.couleurPersoHex ?? "#7A2E33"}
                onChange={(e) => patch({ couleurPersoHex: e.target.value })}
                className="h-12 w-16 rounded border border-encre/20 bg-white"
              />
            </Field>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) patch({ couleurPersoImage: await lireImage(f) });
              }}
            />
            <Button variante="secondary" onClick={() => fileRef.current?.click()}>
              {config.couleurPersoImage ? "Changer la photo de référence" : "Ajouter une photo de référence"}
            </Button>
          </div>
        )}
      </div>

      <Notice tone="attention">
        La couleur affichée à l&apos;écran peut différer légèrement du tissu réel. La disponibilité et la teinte
        seront confirmées avant la confection.
      </Notice>
    </div>
  );
}

/* ÉTAPE 4 — Coupe */
export function StepCoupe({ config, patchPerso }: StepProps) {
  const p = config.personnalisation;
  return (
    <div className="space-y-5">
      <ChoixGroupe legende="Type de coupe" options={COUPES} valeur={p.coupe} onChange={(id) => patchPerso({ coupe: id })} />
      <ChoixGroupe legende="Longueur" options={LONGUEURS} valeur={p.longueur} onChange={(id) => patchPerso({ longueur: id })} />
      {p.longueur === "perso" && (
        <Field label="Longueur personnalisée (cm)" htmlFor="lg-perso" description="Mesure de l'épaule jusqu'au bas souhaité.">
          <TextInput
            id="lg-perso"
            inputMode="numeric"
            value={p.longueurCm ?? ""}
            onChange={(e) => patchPerso({ longueurCm: Number(e.target.value.replace(/\D/g, "")) || undefined })}
            placeholder="ex : 140"
          />
        </Field>
      )}
      <ChoixGroupe legende="Manches" options={MANCHES} valeur={p.manches} onChange={(id) => patchPerso({ manches: id })} />
      <ChoixGroupe legende="Col" options={COLS} valeur={p.col} onChange={(id) => patchPerso({ col: id })} />
      <ChoixGroupe legende="Dos" options={DOS} valeur={p.dos} onChange={(id) => patchPerso({ dos: id })} />
    </div>
  );
}

/* ÉTAPE 5 — Détails et décorations (multi-sélection) */
export function StepDecorations({ config, patchPerso }: StepProps) {
  const p = config.personnalisation;
  const toggle = (id: string) => {
    if (id === "sans") {
      patchPerso({ decorations: p.decorations.includes("sans") ? [] : ["sans"] });
      return;
    }
    const sans = p.decorations.filter((d) => d !== "sans");
    const next = sans.includes(id) ? sans.filter((d) => d !== id) : [...sans, id];
    patchPerso({ decorations: next });
  };
  const toggleEmpl = (id: (typeof EMPLACEMENTS)[number]["id"]) => {
    const next = p.emplacements.includes(id) ? p.emplacements.filter((e) => e !== id) : [...p.emplacements, id];
    patchPerso({ emplacements: next });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-encre/70">Sélectionnez une ou plusieurs options (facultatif).</p>
      <div className="grid grid-cols-1 gap-2">
        {DECORATIONS.map((d) => (
          <SelectCard key={d.id} selected={p.decorations.includes(d.id)} onClick={() => toggle(d.id)} ariaLabel={d.nom}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="font-semibold">{d.nom}</p>
                <p className="text-xs text-encre/60">{d.description}</p>
              </div>
              <div className="flex-none text-right">
                <DispoBadge d={d.disponibilite} />
                {d.supplementDH > 0 && <p className="mt-1 text-xs font-semibold text-bordeaux">+{formatDH(d.supplementDH)}</p>}
              </div>
            </div>
          </SelectCard>
        ))}
      </div>

      {p.decorations.some((d) => d !== "sans") && p.decorations.length > 0 && (
        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold">Où placer les décorations ?</legend>
          <div className="flex flex-wrap gap-2">
            {EMPLACEMENTS.map((e) => {
              const actif = p.emplacements.includes(e.id);
              return (
                <button
                  key={e.id}
                  type="button"
                  aria-pressed={actif}
                  onClick={() => toggleEmpl(e.id)}
                  className={`rounded-full border px-3 py-2 text-sm min-h-[44px] ${
                    actif ? "border-bordeaux bg-bordeaux text-creme" : "border-encre/20 bg-white"
                  }`}
                >
                  {e.nom}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <Field label="Notes sur les décorations (facultatif)" htmlFor="deco-notes">
        <TextArea
          id="deco-notes"
          value={p.notesDecorations ?? ""}
          onChange={(e) => patchPerso({ notesDecorations: nettoyerTexte(e.target.value) })}
          placeholder="Précisez vos souhaits de décoration…"
        />
      </Field>
    </div>
  );
}

/* ÉTAPE 6 — Occasion et date */
export function StepOccasion({ config, patchOccasion }: StepProps) {
  const o = config.occasion;
  return (
    <div className="space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold">Occasion</legend>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((oc) => {
            const actif = o.type === oc.id;
            return (
              <button
                key={oc.id}
                type="button"
                aria-pressed={actif}
                onClick={() => patchOccasion({ type: oc.id })}
                className={`rounded-full border px-3 py-2 text-sm min-h-[44px] ${
                  actif ? "border-bordeaux bg-bordeaux text-creme" : "border-encre/20 bg-white"
                }`}
              >
                {oc.nom}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field label="Date de l'événement (facultatif)" htmlFor="date-ev">
        <TextInput id="date-ev" type="date" value={o.dateEvenement ?? ""} onChange={(e) => patchOccasion({ dateEvenement: e.target.value })} />
      </Field>
      <Field label="Date de livraison souhaitée (facultatif)" htmlFor="date-liv">
        <TextInput id="date-liv" type="date" value={o.dateSouhaitee ?? ""} onChange={(e) => patchOccasion({ dateSouhaitee: e.target.value })} />
      </Field>

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold">Priorité</legend>
        <div className="flex gap-2">
          {(["normale", "elevee"] as const).map((pr) => (
            <button
              key={pr}
              type="button"
              aria-pressed={o.priorite === pr}
              onClick={() => patchOccasion({ priorite: pr })}
              className={`rounded-full border px-3 py-2 text-sm min-h-[44px] ${
                o.priorite === pr ? "border-bordeaux bg-bordeaux text-creme" : "border-encre/20 bg-white"
              }`}
            >
              {pr === "normale" ? "Normale" : "Élevée"}
            </button>
          ))}
        </div>
      </fieldset>

      <Notice tone="attention">
        La date et le délai de confection seront confirmés par la boutique avant la commande définitive.
      </Notice>
    </div>
  );
}
