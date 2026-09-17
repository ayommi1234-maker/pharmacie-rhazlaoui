import type { Metadata } from "next";

import { Galerie } from "@/components/site/galerie";
import { infos, photos } from "@/data/source";

export const metadata: Metadata = {
  title: "Galerie photos",
  description: "Découvrez la pharmacie, ses rayons et ses produits en images.",
};

export default function PageGalerie() {
  const liste = photos();
  const pharmacie = infos();

  return (
    <div className="container py-10">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-bold">Galerie</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {liste.length} photos de {pharmacie.nom} : la pharmacie, les rayons et les produits
          disponibles. Cliquez sur une image pour l’agrandir.
        </p>
      </header>

      <Galerie photos={liste} />
    </div>
  );
}
