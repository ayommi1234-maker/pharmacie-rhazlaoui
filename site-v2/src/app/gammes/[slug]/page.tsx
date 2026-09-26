import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { CarteProduit } from "@/components/site/carte-produit";
import { IconeGamme } from "@/components/site/icone-gamme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { gammeParSlug, gammes, produitsDeGamme, slugGamme } from "@/data/source";

export function generateStaticParams() {
  return gammes().map((g) => ({ slug: slugGamme(g) }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = gammeParSlug(params.slug);
  if (!g) return { title: "Gamme introuvable" };
  return { title: g.nom, description: g.description };
}

export default function PageGamme({ params }: { params: { slug: string } }) {
  const gamme = gammeParSlug(params.slug);
  if (!gamme) notFound();

  const produits = produitsDeGamme(gamme);

  return (
    <div className="container py-10">
      <Button asChild variant="ghost" className="mb-6 -ml-3">
        <Link href="/gammes/">
          <ArrowLeft aria-hidden="true" />
          Toutes les gammes
        </Link>
      </Button>

      <header className="mb-10 flex flex-wrap items-start gap-5">
        <span className="grid size-16 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
          <IconeGamme icon={gamme.icon} className="size-8" />
        </span>
        <div className="min-w-0">
          <h1 className="font-display text-4xl font-bold">{gamme.nom}</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{gamme.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {gamme.marques.map((m) => (
              <li key={m}>
                <Badge variant="outline">{m}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {produits.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
          Aucun produit de cette gamme n’est actuellement listé sur le site.
          Contactez la pharmacie : le rayon est plus large que le catalogue en ligne.
        </p>
      ) : (
        <>
          <p className="mb-5 text-sm text-muted-foreground">
            <strong className="text-foreground">{produits.length}</strong> produit
            {produits.length > 1 ? "s" : ""} dans cette gamme
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produits.map((p) => (
              <li key={p.id}>
                <CarteProduit produit={p} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
