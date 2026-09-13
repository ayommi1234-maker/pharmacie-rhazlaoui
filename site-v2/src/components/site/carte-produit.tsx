import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Produit } from "@/data/types";
import { imageProduit, prixAffichable } from "@/lib/produits";

/** Champs strictement nécessaires à la carte — compatible produit complet ET version allégée. */
export type ProduitCarte = Pick<
  Produit,
  "id" | "nom" | "marque" | "badge" | "prix" | "ancienPrix" | "image" | "imagePerso" | "description"
>;

/** Carte produit. Module neutre : rendue côté serveur ET réutilisée par le catalogue client. */
export function CarteProduit({ produit }: { produit: ProduitCarte }) {
  const image = imageProduit(produit);
  const prix = prixAffichable(produit.prix);
  const ancien = prixAffichable(produit.ancienPrix);

  return (
    <Card className="group h-full overflow-hidden hover:shadow-md">
      <Link
        href={`/produits/${produit.id}/`}
        className="flex h-full flex-col rounded-xl focus-visible:ring-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {image ? (
            <img
              src={image}
              alt={`${produit.nom} — ${produit.marque}`}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="grid size-full place-items-center text-sm text-muted-foreground">
              Photo à venir
            </span>
          )}
          {produit.badge ? (
            <Badge variant="accent" className="absolute left-3 top-3 shadow-sm">
              {produit.badge}
            </Badge>
          ) : null}
        </div>

        <CardContent className="flex flex-1 flex-col gap-2 p-4">
          {produit.marque ? (
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {produit.marque}
            </p>
          ) : null}
          <h3 className="font-display text-base font-semibold leading-snug">{produit.nom}</h3>
          {produit.description ? (
            <p className="line-clamp-2 text-sm text-muted-foreground">{produit.description}</p>
          ) : null}

          <div className="mt-auto pt-2">
            {prix ? (
              <p className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-primary">{prix}</span>
                {ancien ? (
                  <span className="text-sm text-muted-foreground line-through">{ancien}</span>
                ) : null}
              </p>
            ) : (
              /* Aucun prix inventé : on invite simplement à demander. */
              <p className="text-sm font-medium text-muted-foreground">Prix sur demande</p>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
