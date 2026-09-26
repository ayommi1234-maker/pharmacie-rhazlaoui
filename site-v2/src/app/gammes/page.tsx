import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { IconeGamme } from "@/components/site/icone-gamme";
import { Card } from "@/components/ui/card";
import { gammes, produitsDeGamme, slugGamme } from "@/data/source";

export const metadata: Metadata = {
  title: "Nos gammes",
  description:
    "Les univers de la parapharmacie : phytothérapie bio, compléments, soins beauté, appareils médicaux, orthopédie, bébé et maternité.",
};

export default function PageGammes() {
  const listeGammes = gammes();

  return (
    <div className="container py-10">
      <header className="mb-10">
        <h1 className="font-display text-4xl font-bold">Nos gammes</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Chaque gamme regroupe les marques d’un même univers. C’est souvent plus rapide que
          de chercher un produit précis quand on ne connaît pas encore la référence.
        </p>
      </header>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {listeGammes.map((g) => {
          const total = produitsDeGamme(g).length;
          return (
            <li key={g.id}>
              <Card className="group h-full overflow-hidden transition-shadow hover:shadow-md">
                <Link href={`/gammes/${slugGamme(g)}/`} className="flex h-full flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    {g.logo ? (
                      <img
                        src={`/${g.logo}`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                    <span className="absolute bottom-3 left-3 grid size-11 place-items-center rounded-lg bg-primary text-primary-foreground shadow-lg">
                      <IconeGamme icon={g.icon} className="size-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display text-lg font-semibold">{g.nom}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{g.description}</p>
                    <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {total} produit{total > 1 ? "s" : ""}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </p>
                  </div>
                </Link>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
