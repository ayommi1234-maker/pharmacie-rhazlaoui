import Link from "next/link";
import { EnTeteProposition, PiedProposition } from "./chrome";
import { ArrowRight, BadgeCheck, Clock, MessageCircle, Store, Truck } from "lucide-react";

import { CarteProduit } from "@/components/site/carte-produit";
import { IconeGamme } from "@/components/site/icone-gamme";
import { Button } from "@/components/ui/button";
import { BarreRecherche } from "./barre-recherche";
import { BESOINS, lienRecherche, type DonneesAccueil } from "./donnees";
import { VILLE } from "@/lib/site";

/**
 * VARIANTE B — « Recherche d'abord ».
 *
 * Parti pris : les codes des grandes parapharmacies en ligne (Newpharma, Atida,
 * Easypara) — une **barre de recherche géante** comme point d'entrée principal,
 * un bandeau de réassurance, puis les rayons en grille dense.
 * Palette bleu clinique + vert : les couleurs de confiance du secteur santé.
 *
 * Réserve honnête : ces sites n'ont pas pu être ouverts (proxy réseau), le motif
 * vient de leur positionnement décrit dans les sources, pas d'un audit visuel.
 */
export function VarianteB({ d }: { d: DonneesAccueil }) {
  const { pharmacie } = d;

  const reassurance = [
    { Icone: Store, titre: "Retrait sur place", texte: `Hay Fath, ${VILLE}` },
    { Icone: MessageCircle, titre: "Réponse WhatsApp", texte: "Stock vérifié avant déplacement" },
    { Icone: BadgeCheck, titre: `${d.marques.length} marques`, texte: "CeraVe, Omron, Doppel Herz…" },
    { Icone: Clock, titre: "Du lundi au samedi", texte: pharmacie.horaires.lundi_vendredi_matin },
  ];

  return (
    <div className="variante-b bg-background text-foreground">
      <EnTeteProposition pharmacie={pharmacie} ton="plein" />
      {/* ── Le moteur de recherche EST le héros ── */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 text-center md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">
            {pharmacie.sousNom} — {VILLE}
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Que cherchez-vous aujourd’hui&nbsp;?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">
            {d.produits.length} produits référencés, {d.gammes.length} gammes.
            Tapez un nom de produit, une marque, ou simplement votre besoin.
          </p>

          {/* Sur le bandeau bleu, le bouton d'envoi doit être blanc :
              en couleur primaire il serait bleu sur bleu, donc invisible. */}
          <div className="mx-auto mt-8 max-w-2xl [&_button]:bg-white [&_button]:text-primary [&_button:hover]:bg-white/90 [&_input]:border-transparent">
            <BarreRecherche />
          </div>

          <ul className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-2">
            {BESOINS.slice(0, 6).map((b) => (
              <li key={b.q}>
                <Link
                  href={lienRecherche(b.q)}
                  className="inline-flex min-h-[36px] items-center rounded-full bg-primary-foreground/15 px-4 text-sm font-medium transition-colors hover:bg-primary-foreground/25"
                >
                  {b.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Bandeau de réassurance : que des faits vérifiables ── */}
      <section className="border-b bg-secondary/60" aria-label="Nos engagements">
        <ul className="container grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {reassurance.map(({ Icone, titre, texte }) => (
            <li key={titre} className="flex items-center gap-3">
              <Icone className="size-6 shrink-0 text-accent" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{titre}</span>
                <span className="block truncate text-sm text-muted-foreground">{texte}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Les rayons, en grille dense ── */}
      <section className="container py-14" aria-labelledby="b-rayons">
        <h2 id="b-rayons" className="font-display text-2xl font-bold sm:text-3xl">
          Parcourir par rayon
        </h2>
        <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {d.gammes.map((g) => (
            <li key={g.id}>
              <Link
                href={`/gammes/${g.slug}/`}
                className="flex h-full flex-col items-center gap-3 rounded-xl border bg-card p-5 text-center transition-colors hover:border-primary hover:bg-primary-soft"
              >
                <span className="grid size-12 place-items-center rounded-full bg-primary-soft text-primary">
                  <IconeGamme icon={g.icon} className="size-6" />
                </span>
                <span className="text-sm font-semibold leading-snug">{g.nom}</span>
                <span className="mt-auto text-xs text-muted-foreground">{g.total} réf.</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Marques ── */}
      <section className="border-y bg-muted/60 py-10" aria-labelledby="b-marques">
        <div className="container">
          <h2 id="b-marques" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Marques disponibles en rayon
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {d.marques.slice(0, 22).map((m) => (
              <li key={m}>
                <Link
                  href={lienRecherche(m)}
                  className="inline-flex min-h-[40px] items-center rounded-lg border bg-card px-4 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  {m}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Produits ── */}
      <section className="container py-14" aria-labelledby="b-produits">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 id="b-produits" className="font-display text-2xl font-bold sm:text-3xl">
            À découvrir en rayon
          </h2>
          <Button asChild variant="outline">
            <Link href="/produits/">
              Voir les {d.produits.length} produits
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.selection.slice(0, 8).map((p) => (
            <li key={p.id}>
              <CarteProduit produit={p} />
            </li>
          ))}
        </ul>
      </section>

      {/* ── Rappel : on ne livre pas, on accueille ── */}
      <section className="container pb-16">
        <div className="flex flex-col items-start gap-4 rounded-xl border border-accent/30 bg-accent/5 p-6 sm:flex-row sm:items-center">
          <Truck className="size-8 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Pas de vente en ligne.</strong> Ce site est la
            vitrine de la pharmacie : vous réservez par téléphone ou WhatsApp, et vous récupérez
            sur place à {VILLE}. C’est plus rapide, et vous repartez avec le conseil.
          </p>
        </div>
      </section>
      <PiedProposition pharmacie={pharmacie} />
    </div>
  );
}
