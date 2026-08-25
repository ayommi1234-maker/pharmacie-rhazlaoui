"use client";

import { useState } from "react";
import type { StepProps } from "./Configurateur";
import { Button, Card, Field, TextInput, TextArea, Notice, Chip } from "@/components/ui";
import { construireResume, lignesMesuresTexte } from "@/lib/resume";
import { construireMessageWhatsApp, lienWhatsApp } from "@/lib/whatsapp";
import { BOUTIQUE, whatsappPret } from "@/config/boutique";
import { formatDH } from "@/lib/prix";
import { effacerConfig } from "@/lib/storage";
import { nettoyerTexte, nettoyerTelephone, telephoneValide, nomValide } from "@/lib/sanitize";

function Ligne({ label, valeur, onEdit }: { label: string; valeur: string; onEdit?: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-encre/10 py-2 last:border-0">
      <div className="min-w-0">
        <p className="text-xs text-encre/50">{label}</p>
        <p className="text-sm">{valeur || "—"}</p>
      </div>
      {onEdit && (
        <button type="button" onClick={onEdit} className="flex-none text-xs font-semibold text-bordeaux underline">
          Modifier
        </button>
      )}
    </div>
  );
}

export function StepRecap({ config, patchInfos, goTo }: StepProps & { goTo: (i: number) => void }) {
  const resume = construireResume(config);
  const message = construireMessageWhatsApp(resume);
  const [copie, setCopie] = useState(false);
  const [envoye, setEnvoye] = useState(false);

  const infos = config.infos;
  const infosCompletes =
    nomValide(infos.prenom ?? "") &&
    telephoneValide(infos.telephone ?? "") &&
    (infos.ville ?? "").trim().length >= 2;
  const pretAEnvoyer = infosCompletes && infos.consentement;
  const waConfigure = whatsappPret();

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopie(true);
      setTimeout(() => setCopie(false), 2500);
    } catch {
      setCopie(false);
    }
  };

  const envoyer = () => {
    if (!pretAEnvoyer || !waConfigure) return;
    const url = lienWhatsApp(BOUTIQUE.whatsapp, message);
    window.open(url, "_blank", "noopener,noreferrer");
    // Suppression des données locales après l'envoi (confidentialité)
    effacerConfig();
    setEnvoye(true);
  };

  return (
    <div className="space-y-5">
      {/* Récapitulatif visuel */}
      <Card className="p-4">
        <h2 className="mb-1 font-serif text-lg font-bold">Récapitulatif</h2>
        <Ligne label="Modèle" valeur={`${resume.modeleNom} (${resume.reference})`} onEdit={() => goTo(0)} />
        <Ligne label="Tissu" valeur={resume.tissu} onEdit={() => goTo(1)} />
        <Ligne label="Couleur" valeur={resume.couleur} onEdit={() => goTo(2)} />
        <Ligne label="Coupe" valeur={resume.coupe} onEdit={() => goTo(3)} />
        <Ligne label="Longueur" valeur={resume.longueur} onEdit={() => goTo(3)} />
        <Ligne label="Manches" valeur={resume.manches} onEdit={() => goTo(3)} />
        <Ligne label="Col" valeur={resume.col} onEdit={() => goTo(3)} />
        <Ligne label="Dos" valeur={resume.dos} onEdit={() => goTo(3)} />
        <Ligne
          label="Décorations"
          valeur={resume.decorations.length ? `${resume.decorations.join(", ")}${resume.emplacements.length ? ` — ${resume.emplacements.join(", ")}` : ""}` : "Sans décoration"}
          onEdit={() => goTo(4)}
        />
        <Ligne label="Occasion" valeur={[resume.occasion, resume.dateEvenement].filter(Boolean).join(" · ")} onEdit={() => goTo(5)} />
      </Card>

      {/* Mensurations */}
      <Card className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="font-serif text-base font-bold">Mensurations (cm)</h3>
          <button type="button" onClick={() => goTo(6)} className="text-xs font-semibold text-bordeaux underline">Modifier</button>
        </div>
        {resume.mesures.length ? (
          <ul className="text-sm">
            {lignesMesuresTexte(resume).map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-encre/50">Aucune mesure saisie.</p>
        )}
        {(resume.tailleHabituelle || resume.preferenceCoupe || resume.talons !== undefined) && (
          <p className="mt-2 text-xs text-encre/60">
            {resume.tailleHabituelle && `Taille : ${resume.tailleHabituelle}. `}
            {resume.preferenceCoupe && `Coupe : ${resume.preferenceCoupe}. `}
            {resume.talons !== undefined && `Talons : ${resume.talons ? "oui" : "non"}.`}
          </p>
        )}
      </Card>

      {/* Prix estimatif */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base font-bold">Prix estimatif</h3>
          <span className="text-lg font-bold text-bordeaux">
            {resume.prix.total > 0 ? formatDH(resume.prix.total) : "À confirmer"}
          </span>
        </div>
        <Notice tone="info">
          Prix estimatif : le prix final sera confirmé par la boutique après vérification du modèle, du tissu, des
          détails et des mensurations.
        </Notice>
      </Card>

      {/* Coordonnées */}
      <Card className="p-4 space-y-3">
        <h3 className="font-serif text-base font-bold">Vos coordonnées</h3>
        <p className="text-xs text-encre/60">Il s&apos;agit d&apos;une demande, pas d&apos;un paiement.</p>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Prénom" htmlFor="prenom">
            <TextInput id="prenom" value={infos.prenom ?? ""} onChange={(e) => patchInfos({ prenom: nettoyerTexte(e.target.value, 40) })} />
          </Field>
          <Field label="Nom" htmlFor="nom">
            <TextInput id="nom" value={infos.nom ?? ""} onChange={(e) => patchInfos({ nom: nettoyerTexte(e.target.value, 40) })} />
          </Field>
        </div>
        <Field label="Téléphone (WhatsApp)" htmlFor="tel">
          <TextInput id="tel" inputMode="tel" value={infos.telephone ?? ""} onChange={(e) => patchInfos({ telephone: nettoyerTelephone(e.target.value) })} placeholder="+212 6 00 00 00 00" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Ville" htmlFor="ville">
            <TextInput id="ville" value={infos.ville ?? ""} onChange={(e) => patchInfos({ ville: nettoyerTexte(e.target.value, 60) })} />
          </Field>
          <Field label="Quartier / adresse (facultatif)" htmlFor="adresse">
            <TextInput id="adresse" value={infos.adresse ?? ""} onChange={(e) => patchInfos({ adresse: nettoyerTexte(e.target.value, 120) })} />
          </Field>
        </div>
        <Field label="Notes complémentaires (facultatif)" htmlFor="notes">
          <TextArea id="notes" value={infos.notes ?? ""} onChange={(e) => patchInfos({ notes: nettoyerTexte(e.target.value) })} />
        </Field>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={infos.consentement}
            onChange={(e) => patchInfos({ consentement: e.target.checked })}
            className="mt-1 h-5 w-5 flex-none accent-bordeaux"
          />
          <span>
            J&apos;accepte d&apos;envoyer mes coordonnées et mes mensurations à la boutique afin d&apos;obtenir une
            confirmation de commande.
          </span>
        </label>
      </Card>

      {/* Envoi */}
      {!waConfigure && (
        <Notice tone="attention">
          Le numéro WhatsApp de la boutique n&apos;est pas encore configuré. Vous pouvez copier le récapitulatif en
          attendant.
        </Notice>
      )}
      {envoye && (
        <Notice tone="info">
          Votre demande a été ouverte dans WhatsApp. La commande ne devient définitive qu&apos;après confirmation du
          vendeur. Vos informations ont été effacées de cet appareil.
        </Notice>
      )}
      {!pretAEnvoyer && !envoye && (
        <p className="text-xs text-encre/50">Renseignez prénom, téléphone, ville et cochez le consentement pour envoyer.</p>
      )}

      <div className="flex flex-col gap-3">
        <Button variante="secondary" onClick={copier}>
          {copie ? "Copié ✓" : "Copier le récapitulatif"}
        </Button>
        <Button variante="primary" onClick={envoyer} disabled={!pretAEnvoyer || !waConfigure}>
          Envoyer sur WhatsApp
        </Button>
      </div>
      <p className="text-center text-xs text-encre/50">
        La commande ne devient définitive qu&apos;après confirmation du vendeur.
      </p>
      {config.modeleId && <div className="pt-2 text-center"><Chip>Demande de démonstration</Chip></div>}
    </div>
  );
}
