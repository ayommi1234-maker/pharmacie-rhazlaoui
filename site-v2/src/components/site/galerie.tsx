"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Photo } from "@/data/types";
import { cn } from "@/lib/utils";

const PAS = 24;

const LIBELLES: Record<string, string> = {
  pharmacie: "La pharmacie",
  rayons: "Nos rayons",
  produits: "Produits",
  equipe: "L’équipe",
};

/**
 * Galerie photo : miniatures (`thumbs/`) en grille, image pleine taille dans une
 * boîte de dialogue Radix (focus piégé, fermeture au clavier).
 */
export function Galerie({ photos }: { photos: Photo[] }) {
  const [categorie, setCategorie] = React.useState("");
  const [limite, setLimite] = React.useState(PAS);

  const categories = React.useMemo(() => {
    const vues = new Map<string, number>();
    for (const p of photos) vues.set(p.category, (vues.get(p.category) ?? 0) + 1);
    return [...vues.entries()].map(([cle, total]) => ({ cle, total }));
  }, [photos]);

  const visibles = React.useMemo(
    () => (categorie ? photos.filter((p) => p.category === categorie) : photos),
    [photos, categorie],
  );

  React.useEffect(() => {
    setLimite(PAS);
  }, [categorie]);

  return (
    <div>
      <fieldset className="mb-6">
        <legend className="sr-only">Filtrer les photos par catégorie</legend>
        <div className="flex flex-wrap gap-2">
          <Filtre actif={!categorie} onClick={() => setCategorie("")}>
            Toutes ({photos.length})
          </Filtre>
          {categories.map((c) => (
            <Filtre
              key={c.cle}
              actif={categorie === c.cle}
              onClick={() => setCategorie(categorie === c.cle ? "" : c.cle)}
            >
              {LIBELLES[c.cle] ?? c.cle} ({c.total})
            </Filtre>
          ))}
        </div>
      </fieldset>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visibles.slice(0, limite).map((photo) => (
          <li key={photo.src}>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="group block w-full overflow-hidden rounded-lg border bg-muted"
                >
                  <img
                    src={`/${photo.thumb}`}
                    alt={photo.caption}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="sr-only">Agrandir : {photo.caption}</span>
                </button>
              </DialogTrigger>
              <DialogContent titre={photo.caption} className="max-w-3xl">
                <img
                  src={`/${photo.src}`}
                  alt={photo.caption}
                  className="max-h-[75vh] w-full rounded-lg object-contain"
                  decoding="async"
                />
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>

      {visibles.length > limite ? (
        <div className="mt-8 text-center">
          <Button size="lg" variant="outline" onClick={() => setLimite((l) => l + PAS)}>
            <ChevronDown aria-hidden="true" />
            Afficher plus ({visibles.length - limite} photos)
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function Filtre({
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
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        actif
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}
