import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Info, X } from "lucide-react";

import { PROPOSITIONS } from "@/components/propositions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "5 propositions de page d’accueil",
  description:
    "Cinq directions de design pour la page d’accueil, construites avec les mêmes données réelles.",
  robots: { index: false, follow: false },
};

/** Aperçu miniature : un schéma de la mise en page, pas une capture. */
const SCHEMAS: Record<string, React.ReactNode> = {
  a: (
    <>
      <div className="h-3 w-2/3 rounded bg-current opacity-80" />
      <div className="h-2 w-1/2 rounded bg-current opacity-30" />
      <div className="grid grid-cols-4 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-7 rounded bg-current opacity-45" />
        ))}
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-3 w-9 rounded-full bg-current opacity-25" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="h-10 rounded bg-current opacity-20" />
        <div className="h-10 rounded bg-current opacity-35" />
      </div>
    </>
  ),
  b: (
    <>
      <div className="space-y-1.5 rounded bg-current/80 p-2.5">
        <div className="mx-auto h-2.5 w-1/2 rounded bg-background opacity-90" />
        <div className="h-6 rounded bg-background opacity-95" />
        <div className="mx-auto flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-2 w-7 rounded-full bg-background opacity-60" />
          ))}
        </div>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-3 flex-1 rounded bg-current opacity-25" />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="h-7 rounded bg-current opacity-35" />
        ))}
      </div>
    </>
  ),
  c: (
    <div className="grid grid-cols-4 grid-rows-4 gap-1.5">
      <div className="col-span-2 row-span-2 rounded-lg bg-current opacity-80" />
      <div className="col-span-2 row-span-2 rounded-lg bg-current opacity-35" />
      <div className="rounded-lg bg-current opacity-25" />
      <div className="rounded-lg bg-current opacity-25" />
      <div className="col-span-2 rounded-lg bg-current opacity-45" />
      <div className="col-span-2 rounded-lg bg-current opacity-55" />
      <div className="rounded-lg bg-current opacity-25" />
      <div className="rounded-lg bg-current opacity-25" />
    </div>
  ),
  d: (
    <>
      <div className="h-1.5 w-1/4 rounded bg-current opacity-30" />
      <div className="h-4 w-11/12 rounded bg-current opacity-85" />
      <div className="h-4 w-3/4 rounded bg-current opacity-85" />
      <div className="h-4 w-4/5 rounded bg-current opacity-85" />
      <div className="mt-1 h-px w-full bg-current opacity-30" />
      <div className="h-1.5 w-2/3 rounded bg-current opacity-25" />
      <div className="h-1.5 w-1/2 rounded bg-current opacity-25" />
      <div className="mt-1 space-y-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-1.5 w-3 rounded bg-current opacity-25" />
            <div className="h-1.5 flex-1 rounded bg-current opacity-40" />
          </div>
        ))}
      </div>
    </>
  ),
  e: (
    <>
      <div className="relative h-20 overflow-hidden rounded-xl bg-current opacity-80">
        <div className="absolute inset-x-2 bottom-2 space-y-1">
          <div className="h-2.5 w-2/3 rounded bg-background opacity-90" />
          <div className="h-1.5 w-1/2 rounded bg-background opacity-60" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-12 rounded-xl bg-current opacity-40" />
        ))}
      </div>
    </>
  ),
};

export default function PagePropositions() {
  return (
    <div className="container py-10">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Maquettes de travail
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold">
          5 propositions de page d’accueil
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Cinq directions de design vraiment différentes — pas cinq variations de couleur.
          Les cinq utilisent <strong className="text-foreground">exactement les mêmes données
          réelles</strong> (107 produits, 13 gammes, vos horaires, votre adresse), pour que la
          comparaison porte sur la mise en page et le ton, pas sur le contenu.
        </p>
      </header>

      <Card className="mt-8 max-w-3xl border-accent/40 bg-accent/5">
        <CardContent className="flex gap-3 p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
          <div className="text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Sur quoi c’est fondé.</strong> Recherche faite
              sur les classements de sites de pharmacie 2026, les grandes parapharmacies
              francophones et les tendances de mise en page.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Réserve honnête :</strong> le proxy réseau de
              cette session bloque l’ouverture des sites concurrents et des articles de
              classement. Je n’ai donc pas pu les auditer visuellement — les partis pris viennent
              de ce que les sources en décrivent, pas d’un examen page par page.
            </p>
          </div>
        </CardContent>
      </Card>

      <ul className="mt-12 grid gap-6 lg:grid-cols-2">
        {PROPOSITIONS.map((p) => (
          <li key={p.cle}>
            <Card className="flex h-full flex-col">
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary font-display text-base font-bold text-primary-foreground">
                    {p.cle.toUpperCase()}
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-bold">{p.nom}</h2>
                    <p className="text-sm text-muted-foreground">{p.accroche}</p>
                  </div>
                </div>

                {/* Schéma de mise en page */}
                <div className="mt-5 flex flex-col gap-1.5 rounded-xl border bg-muted/50 p-4 text-primary">
                  {SCHEMAS[p.cle]}
                </div>

                <p className="mt-5 text-sm text-muted-foreground">{p.fondement}</p>

                <ul className="mt-4 space-y-1.5 text-sm">
                  {p.pour.map((x) => (
                    <li key={x} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{x}</span>
                    </li>
                  ))}
                  {p.contre.map((x) => (
                    <li key={x} className="flex gap-2 text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild className="mt-6 w-full sm:w-auto">
                  <Link href={`/propositions/${p.cle}/`}>
                    Voir la proposition {p.cle.toUpperCase()}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      <section className="mt-14 max-w-3xl rounded-xl bg-primary-soft p-6">
        <h2 className="font-display text-xl font-semibold">Et ensuite ?</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Choisissez-en une (ou dites-moi ce que vous voulez prendre dans chacune) : elle
          remplacera la page d’accueil actuelle. Les autres pages du site — catalogue, fiches
          produits, gammes, galerie, conseils, contact — ne changent pas.
        </p>
      </section>
    </div>
  );
}
