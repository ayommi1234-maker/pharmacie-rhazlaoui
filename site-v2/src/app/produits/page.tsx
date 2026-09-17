import type { Metadata } from "next";

import { Catalogue } from "@/components/site/catalogue";
import { categories, marques, tousLesProduits } from "@/data/source";
import { versListe } from "@/lib/produits";
import { VILLE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tous les produits",
  description: `Catalogue complet de la parapharmacie à ${VILLE} : compléments alimentaires, cosmétiques, orthopédie, appareils médicaux, bébé et maternité.`,
};

export default function PageProduits() {
  const produits = tousLesProduits().map(versListe);

  return (
    <div className="container py-10">
      <header className="mb-2">
        <h1 className="font-display text-4xl font-bold">Nos produits</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {produits.length} références en rayon. Utilisez la recherche pour trouver un produit,
          une marque ou un besoin — « vitamine », « tension », « peau sèche »…
        </p>
      </header>

      <Catalogue produits={produits} categories={categories()} marques={marques()} />
    </div>
  );
}
