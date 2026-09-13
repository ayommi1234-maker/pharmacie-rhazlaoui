"use client";

import * as React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { CarteProduit } from "@/components/site/carte-produit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { filtrer, type ProduitListe } from "@/lib/produits";
import { cn } from "@/lib/utils";

type Categorie = { cle: string; libelle: string; total: number };

const PAS = 24; // produits ajoutés à chaque « Afficher plus »

export function Catalogue({
  produits,
  categories,
  marques,
}: {
  produits: ProduitListe[];
  categories: Categorie[];
  marques: string[];
}) {
  const [recherche, setRecherche] = React.useState("");
  const [categorie, setCategorie] = React.useState("");
  const [marque, setMarque] = React.useState("");
  const [filtresOuverts, setFiltresOuverts] = React.useState(false);
  const [limite, setLimite] = React.useState(PAS);

  const resultats = React.useMemo(
    () => filtrer(produits, { recherche, categorie, marque }),
    [produits, recherche, categorie, marque],
  );

  // Toute modification des critères ramène la pagination au début.
  React.useEffect(() => {
    setLimite(PAS);
  }, [recherche, categorie, marque]);

  const filtresActifs = Boolean(recherche || categorie || marque);

  function toutEffacer() {
    setRecherche("");
    setCategorie("");
    setMarque("");
  }

  return (
    <div>
      {/* ── Barre de recherche ── */}
      <div className="sticky top-16 z-30 -mx-4 border-b bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor="recherche-produit" className="sr-only">
              Rechercher un produit, une marque ou un besoin
            </label>
            <Input
              id="recherche-produit"
              type="search"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher : vitamine, CeraVe, tensiomètre…"
              className="pl-10"
              autoComplete="off"
            />
          </div>
          <Button
            variant={filtresOuverts ? "default" : "outline"}
            onClick={() => setFiltresOuverts((v) => !v)}
            aria-expanded={filtresOuverts}
            aria-controls="panneau-filtres"
            /* Le libellé est masqué sur mobile : sans ce nom accessible, le bouton
               serait annoncé « bouton » sans plus de précision. */
            aria-label={filtresOuverts ? "Masquer les filtres" : "Afficher les filtres"}
          >
            <SlidersHorizontal aria-hidden="true" />
            <span className="hidden sm:inline">Filtres</span>
          </Button>
        </div>

        {/* ── Panneau de filtres ── */}
        <div id="panneau-filtres" hidden={!filtresOuverts} className="pt-4">
          <fieldset className="mb-4">
            <legend className="mb-2 text-sm font-semibold">Rayon</legend>
            <div className="flex flex-wrap gap-2">
              <Puce actif={!categorie} onClick={() => setCategorie("")}>
                Tous ({produits.length})
              </Puce>
              {categories.map((c) => (
                <Puce
                  key={c.cle}
                  actif={categorie === c.cle}
                  onClick={() => setCategorie(categorie === c.cle ? "" : c.cle)}
                >
                  {c.libelle} ({c.total})
                </Puce>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="filtre-marque" className="mb-2 block text-sm font-semibold">
              Marque
            </label>
            <select
              id="filtre-marque"
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              className="h-11 w-full max-w-sm rounded-lg border border-input bg-background px-3 text-base"
            >
              <option value="">Toutes les marques</option>
              {marques.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Résumé + réinitialisation ── */}
      <div className="flex flex-wrap items-center gap-3 py-5">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          <strong className="text-foreground">{resultats.length}</strong> produit
          {resultats.length > 1 ? "s" : ""}
          {filtresActifs ? " correspondant à votre recherche" : " au catalogue"}
        </p>
        {filtresActifs ? (
          <Button variant="ghost" size="sm" onClick={toutEffacer}>
            <X aria-hidden="true" />
            Tout effacer
          </Button>
        ) : null}
      </div>

      {/* ── Résultats ── */}
      {resultats.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="font-display text-lg font-semibold">Aucun produit ne correspond</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Essayez un mot plus court (par exemple « vitamine » au lieu de « vitamine D3 1000 »),
            ou appelez-nous : nous avons aussi des références non listées sur le site.
          </p>
          <Button className="mt-5" variant="outline" onClick={toutEffacer}>
            Réinitialiser la recherche
          </Button>
        </div>
      ) : (
        <>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {resultats.slice(0, limite).map((p) => (
              <li key={p.id}>
                <CarteProduit produit={p} />
              </li>
            ))}
          </ul>

          {resultats.length > limite ? (
            <div className="mt-8 text-center">
              <Button size="lg" variant="outline" onClick={() => setLimite((l) => l + PAS)}>
                Afficher plus ({resultats.length - limite} restants)
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

/** Bouton-filtre. `aria-pressed` annonce l'état aux lecteurs d'écran. */
function Puce({
  actif,
  onClick,
  children,
}: {
  actif: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actif}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        actif
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}
