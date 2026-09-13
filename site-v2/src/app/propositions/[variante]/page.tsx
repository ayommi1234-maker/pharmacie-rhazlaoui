import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PROPOSITIONS } from "@/components/propositions";
import { donneesAccueil } from "@/data/accueil";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return PROPOSITIONS.map((p) => ({ variante: p.cle }));
}

export function generateMetadata({ params }: { params: { variante: string } }): Metadata {
  const p = PROPOSITIONS.find((x) => x.cle === params.variante);
  if (!p) return { title: "Proposition introuvable" };
  return {
    title: `Proposition ${p.cle.toUpperCase()} — ${p.nom}`,
    description: p.accroche,
    // Ces pages sont des maquettes de travail : elles ne doivent pas être indexées.
    robots: { index: false, follow: false },
  };
}

export default function PageProposition({ params }: { params: { variante: string } }) {
  const proposition = PROPOSITIONS.find((p) => p.cle === params.variante);
  if (!proposition) notFound();

  const { Composant } = proposition;
  const d = donneesAccueil();

  return (
    <>
      {/* Barre de comparaison, présente sur chaque maquette pour passer de l'une à l'autre. */}
      <nav
        aria-label="Changer de proposition"
        className="sticky top-0 z-40 border-b bg-foreground text-background"
      >
        <div className="container flex flex-wrap items-center gap-x-4 gap-y-2 py-2.5 text-sm">
          <Link href="/propositions/" className="font-semibold hover:underline">
            ← Comparatif
          </Link>
          <ul className="flex flex-wrap gap-1.5">
            {PROPOSITIONS.map((p) => (
              <li key={p.cle}>
                <Link
                  href={`/propositions/${p.cle}/`}
                  aria-current={p.cle === proposition.cle ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-[32px] items-center rounded-full px-3 text-xs font-semibold transition-colors",
                    p.cle === proposition.cle
                      ? "bg-background text-foreground"
                      : "bg-background/15 hover:bg-background/25",
                  )}
                >
                  {p.cle.toUpperCase()} · {p.nom}
                </Link>
              </li>
            ))}
          </ul>
          <span className="ml-auto hidden text-xs opacity-70 lg:block">
            Maquette — mêmes données réelles pour les 5
          </span>
        </div>
      </nav>

      <Composant d={d} />
    </>
  );
}
