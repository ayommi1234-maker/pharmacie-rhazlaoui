import Link from "next/link";
import { EnTeteProposition, PiedProposition } from "./chrome";
import { ArrowRight, ChevronDown, MessageCircle, Phone } from "lucide-react";

import { CarteProduit } from "@/components/site/carte-produit";
import { Button } from "@/components/ui/button";
import { lienWhatsApp } from "@/lib/produits";
import { lienTel, VILLE } from "@/lib/site";
import { type DonneesAccueil } from "./donnees";

/**
 * VARIANTE E — « Vitrine ».
 *
 * Parti pris : l'image d'abord. Bandeau photo plein écran, angles très arrondis,
 * gammes présentées en grandes tuiles photo. C'est le registre des marques de
 * beauté et de parapharmacie premium.
 *
 * ⚠️ C'est la variante la plus **dépendante de la qualité des photos**. Avec les
 * photos de rayon actuelles elle rend correctement ; avec de vraies photos de
 * produits elle serait la plus spectaculaire — et sans, la plus décevante.
 */
export function VarianteE({ d }: { d: DonneesAccueil }) {
  const { pharmacie } = d;
  const fond = d.photos.find((p) => p.category === "pharmacie") ?? d.photos[0];
  const tuiles = d.gammes.filter((g) => g.logo).slice(0, 6);

  return (
    <div className="variante-e relative bg-background text-foreground">
      {/* ── Bandeau photo plein écran ── */}
      <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden">
        <EnTeteProposition pharmacie={pharmacie} ton="transparent" />
        {fond ? (
          <img
            src={`/${fond.src}`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        ) : null}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/70 to-black/50"
          aria-hidden="true"
        />

        <div className="container pb-16 pt-28 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            {pharmacie.sousNom} — {VILLE}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Prendre soin de soi,
            <span className="block text-white/85">ça commence par un bon conseil.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85">
            {d.produits.length} références en rayon : compléments, soins de la peau,
            orthopédie, appareils médicaux, bébé et maternité.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/produits/">
                Découvrir le rayon
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/70 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <a href={lienTel(pharmacie.telephone)}>
                <Phone aria-hidden="true" />
                {pharmacie.telephone}
              </a>
            </Button>
          </div>

          <p className="mt-12 flex items-center gap-2 text-sm text-white/70">
            <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
            Nos univers
          </p>
        </div>
      </section>

      {/* ── Gammes en grandes tuiles photo ── */}
      <section className="container py-16" aria-labelledby="e-univers">
        <h2 id="e-univers" className="font-display text-3xl font-bold sm:text-4xl">
          Nos univers
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Chaque gamme regroupe les marques d’un même besoin.
        </p>

        <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tuiles.map((g) => (
            <li key={g.id}>
              <Link
                href={`/gammes/${g.slug}/`}
                className="group relative block overflow-hidden rounded-3xl"
              >
                <img
                  src={`/${g.logo}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="block font-display text-xl font-bold">{g.nom}</span>
                  <span className="mt-1 block text-sm text-white/80">
                    {g.total} produit{g.total > 1 ? "s" : ""}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/gammes/">
              Les {d.gammes.length} gammes
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ── Sélection produits ── */}
      <section className="border-y bg-secondary/50 py-16" aria-labelledby="e-selection">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="e-selection" className="font-display text-3xl font-bold sm:text-4xl">
              À découvrir
            </h2>
            <Button asChild variant="ghost">
              <Link href="/produits/">
                Tout le catalogue
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {d.selection.slice(0, 4).map((p) => (
              <li key={p.id}>
                <CarteProduit produit={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Bandeau de contact, sobre après tant d'images ── */}
      <section className="container py-20 text-center">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold sm:text-4xl">
          Une question ? On répond nous-mêmes.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          {pharmacie.adresse}
          <br />
          Lun – Ven {pharmacie.horaires.lundi_vendredi_matin} et{" "}
          {pharmacie.horaires.lundi_vendredi_soir} · Samedi {pharmacie.horaires.samedi}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <a
              href={lienWhatsApp(pharmacie.whatsapp, "Bonjour, je vous écris depuis votre site.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle aria-hidden="true" />
              Écrire sur WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={lienTel(pharmacie.telephone)}>
              <Phone aria-hidden="true" />
              Appeler
            </a>
          </Button>
        </div>
      </section>
      <PiedProposition pharmacie={pharmacie} />
    </div>
  );
}
