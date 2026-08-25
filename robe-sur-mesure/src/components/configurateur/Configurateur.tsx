"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header, Container } from "@/components/Chrome";
import { Button, ProgressBar, btn } from "@/components/ui";
import { chargerConfig, sauvegarderConfig } from "@/lib/storage";
import { configurationVide, type Configuration, type Personnalisation, type Mesures, type Occasion, type InfosCommande } from "@/lib/types";
import { modeleParId } from "@/data/modeles";
import { tissuParId, tissuCommandable } from "@/data/tissus";
import { StepModele, StepTissu, StepCouleur, StepCoupe, StepDecorations, StepOccasion } from "./steps";
import { MesuresWizard } from "./MesuresWizard";
import { StepRecap } from "./StepRecap";

export interface StepProps {
  config: Configuration;
  patch: (p: Partial<Configuration>) => void;
  patchPerso: (p: Partial<Personnalisation>) => void;
  patchMesures: (p: Partial<Mesures>) => void;
  patchOccasion: (p: Partial<Occasion>) => void;
  patchInfos: (p: Partial<InfosCommande>) => void;
}

const TITRES = ["Modèle", "Tissu", "Couleur", "Coupe", "Détails", "Occasion", "Mesures", "Récapitulatif"];

function valideEtape(c: Configuration, i: number): boolean {
  const p = c.personnalisation;
  switch (i) {
    case 0:
      return Boolean(c.modeleId);
    case 1: {
      const t = tissuParId(c.tissuId);
      return Boolean(t && tissuCommandable(t));
    }
    case 2:
      if (!c.couleurId) return false;
      if (c.couleurId === "personnalisee") return Boolean(c.couleurPersoNom || c.couleurPersoHex);
      return true;
    case 3:
      return Boolean(
        p.coupe && p.longueur && p.manches && p.col && p.dos &&
        (p.longueur !== "perso" || (p.longueurCm && p.longueurCm > 0))
      );
    case 4:
      return true; // décorations optionnelles
    case 5:
      return Boolean(c.occasion.type);
    case 6:
      return (["tailleTotale", "poitrine", "taille", "hanches", "longueurRobe"] as const).every(
        (k) => typeof c.mesures[k] === "number"
      );
    default:
      return true;
  }
}

export function Configurateur() {
  const params = useSearchParams();
  const [config, setConfig] = useState<Configuration>(configurationVide());
  const [charge, setCharge] = useState(false);

  // Chargement initial + application des paramètres d'URL
  useEffect(() => {
    const initial = chargerConfig();
    const modeleParam = params.get("modele");
    const guide = params.get("guide");
    if (modeleParam && modeleParId(modeleParam)) {
      initial.modeleId = modeleParam;
      if (initial.etape < 1) initial.etape = 1;
    }
    if (guide === "mesures") initial.etape = 6;
    setConfig(initial);
    setCharge(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persistance locale à chaque changement
  useEffect(() => {
    if (charge) sauvegarderConfig(config);
  }, [config, charge]);

  const patch = (p: Partial<Configuration>) => setConfig((c) => ({ ...c, ...p }));
  const patchPerso = (p: Partial<Personnalisation>) =>
    setConfig((c) => ({ ...c, personnalisation: { ...c.personnalisation, ...p } }));
  const patchMesures = (p: Partial<Mesures>) =>
    setConfig((c) => ({ ...c, mesures: { ...c.mesures, ...p } }));
  const patchOccasion = (p: Partial<Occasion>) =>
    setConfig((c) => ({ ...c, occasion: { ...c.occasion, ...p } }));
  const patchInfos = (p: Partial<InfosCommande>) =>
    setConfig((c) => ({ ...c, infos: { ...c.infos, ...p } }));

  const etape = Math.min(Math.max(config.etape, 0), TITRES.length - 1);
  const setEtape = (i: number) => patch({ etape: Math.min(Math.max(i, 0), TITRES.length - 1) });

  const peutAvancer = useMemo(() => valideEtape(config, etape), [config, etape]);

  const stepProps: StepProps = { config, patch, patchPerso, patchMesures, patchOccasion, patchInfos };

  if (!charge) {
    return (
      <>
        <Header />
        <Container className="py-10 text-center text-encre/60">Chargement…</Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="py-5">
        <Container>
          <div className="mb-2 flex items-center justify-between">
            <h1 className="font-serif text-xl font-bold">{TITRES[etape]}</h1>
            <Link href="/catalogue" className="text-xs text-encre/50 underline">
              Voir le catalogue
            </Link>
          </div>
          <ProgressBar current={etape} total={TITRES.length} />

          <div className="mt-5">
            {etape === 0 && <StepModele {...stepProps} />}
            {etape === 1 && <StepTissu {...stepProps} />}
            {etape === 2 && <StepCouleur {...stepProps} />}
            {etape === 3 && <StepCoupe {...stepProps} />}
            {etape === 4 && <StepDecorations {...stepProps} />}
            {etape === 5 && <StepOccasion {...stepProps} />}
            {etape === 6 && <MesuresWizard {...stepProps} />}
            {etape === 7 && <StepRecap {...stepProps} goTo={setEtape} />}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <Button variante="ghost" onClick={() => setEtape(etape - 1)} disabled={etape === 0}>
              ← Précédent
            </Button>
            {etape < TITRES.length - 1 ? (
              <Button
                variante="primary"
                onClick={() => setEtape(etape + 1)}
                disabled={!peutAvancer}
                aria-disabled={!peutAvancer}
              >
                Suivant →
              </Button>
            ) : (
              <span />
            )}
          </div>
          {!peutAvancer && etape < TITRES.length - 1 && (
            <p className="mt-2 text-right text-xs text-encre/50">Complétez cette étape pour continuer.</p>
          )}
        </Container>
      </main>
    </>
  );
}
