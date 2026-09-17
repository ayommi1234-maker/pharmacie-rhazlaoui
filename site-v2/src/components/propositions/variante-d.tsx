import Link from "next/link";
import { EnTeteProposition, PiedProposition } from "./chrome";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { lienWhatsApp } from "@/lib/produits";
import { lienTel, VILLE } from "@/lib/site";
import { type DonneesAccueil } from "./donnees";

/**
 * VARIANTE D — « Éditorial ».
 *
 * Parti pris : la typographie comme identité — titres surdimensionnés, colonne de
 * texte étroite, fond crème, filets fins, angles presque droits. C'est l'anti-site
 * de discount : on ne vend pas un prix, on vend un conseil et une adresse.
 * Les gammes sont présentées comme un **sommaire** numéroté, pas comme des vignettes.
 */
export function VarianteD({ d }: { d: DonneesAccueil }) {
  const { pharmacie } = d;
  // Bandeau pleine largeur : il faut une vue d'ENSEMBLE, pas un gros plan.
  // Les premières photos « rayons » sont des plans serrés illisibles en bandeau large.
  const vues = d.photos.filter((p) => p.category === "pharmacie");
  const photo = vues[2] ?? vues[0] ?? d.photos[0];

  return (
    <div className="variante-d bg-background text-foreground">
      <EnTeteProposition pharmacie={pharmacie} ton="clair" />
      {/* ── Ouverture typographique ── */}
      <section className="container pb-14 pt-16 md:pt-24">
        <p className="font-display text-sm uppercase tracking-[0.35em] text-muted-foreground">
          {pharmacie.sousNom} · {VILLE}
        </p>

        <h1 className="mt-8 max-w-5xl font-display text-[2.75rem] font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
          On ne vend pas
          <span className="block italic text-primary">des boîtes.</span>
          <span className="block">On donne un conseil.</span>
        </h1>

        <div className="mt-12 grid gap-10 border-t pt-10 lg:grid-cols-[1.1fr_1fr]">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Un complément alimentaire mal choisi ne sert à rien. Une crème mal adaptée
            irrite. Un brassard trop grand fausse la mesure. Chez {pharmacie.nom}, vous
            repartez avec le bon produit — et la raison pour laquelle c’est le bon.
          </p>

          <dl className="grid grid-cols-3 gap-6 self-start">
            {[
              [d.produits.length, "produits"],
              [d.gammes.length, "gammes"],
              [d.marques.length, "marques"],
            ].map(([n, libelle]) => (
              <div key={String(libelle)} className="border-l-2 border-primary pl-4">
                <dt className="sr-only">{libelle}</dt>
                <dd>
                  <span className="block font-display text-3xl font-bold sm:text-4xl">{n}</span>
                  <span className="text-sm text-muted-foreground">{libelle}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Image pleine largeur, traitée comme une photo de presse ── */}
      {photo ? (
        <figure className="border-y">
          <img
            src={`/${photo.src}`}
            alt={`Les rayons de ${pharmacie.nom} à ${VILLE}`}
            className="h-[300px] w-full object-cover sm:h-[440px]"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="container py-3 text-xs uppercase tracking-widest text-muted-foreground">
            {pharmacie.adresse}
          </figcaption>
        </figure>
      ) : null}

      {/* ── Les gammes en sommaire numéroté ── */}
      <section className="container py-16" aria-labelledby="d-sommaire">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b pb-5">
          <h2 id="d-sommaire" className="font-display text-3xl font-bold sm:text-4xl">
            Le rayon, en {d.gammes.length} chapitres
          </h2>
          <Link
            href="/gammes/"
            className="text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
          >
            Tout parcourir
          </Link>
        </div>

        <ol className="mt-2">
          {d.gammes.map((g, i) => (
            <li key={g.id} className="border-b">
              <Link
                href={`/gammes/${g.slug}/`}
                className="group flex flex-wrap items-baseline gap-x-6 gap-y-1 py-5 transition-colors hover:text-primary"
              >
                <span className="w-10 shrink-0 font-display text-sm tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl font-semibold sm:text-2xl">{g.nom}</span>
                <span className="hidden flex-1 text-sm text-muted-foreground lg:block">
                  {g.description}
                </span>
                <span className="ml-auto flex items-center gap-3 text-sm tabular-nums text-muted-foreground">
                  {g.total}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Une citation-manifeste, puis le contact ── */}
      <section className="border-y bg-secondary/60 py-16">
        <div className="container grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <blockquote className="max-w-2xl">
            <p className="font-display text-2xl leading-snug sm:text-3xl">
              « Les prix ne sont affichés que lorsqu’ils sont réellement renseignés.
              Pour le reste, demandez-nous : la réponse est immédiate, et elle est juste. »
            </p>
            <footer className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">
              {pharmacie.nom}
            </footer>
          </blockquote>

          <div className="self-center">
            <h2 className="font-display text-xl font-semibold">Nous joindre</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Adresse</dt>
                <dd className="mt-0.5 font-medium">{pharmacie.adresse}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Horaires</dt>
                <dd className="mt-0.5 font-medium">
                  Lun – Ven {pharmacie.horaires.lundi_vendredi_matin} et{" "}
                  {pharmacie.horaires.lundi_vendredi_soir}
                  <br />
                  Samedi {pharmacie.horaires.samedi}
                </dd>
              </div>
            </dl>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <a href={lienTel(pharmacie.telephone)}>
                  <Phone aria-hidden="true" />
                  {pharmacie.telephone}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={lienWhatsApp(
                    pharmacie.whatsapp,
                    "Bonjour, je vous écris depuis votre site.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle aria-hidden="true" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Renvoi vers les conseils : c'est la promesse de cette variante ── */}
      <section className="container py-16 text-center">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold sm:text-4xl">
          Avant d’acheter, lisez ce qu’on répond au comptoir.
        </h2>
        <Button asChild size="lg" className="mt-8">
          <Link href="/conseils/">
            Les conseils santé
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </section>
      <PiedProposition pharmacie={pharmacie} />
    </div>
  );
}
