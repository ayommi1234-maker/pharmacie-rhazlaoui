import Link from "next/link";
import { EnTeteProposition, PiedProposition } from "./chrome";
import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone, Search } from "lucide-react";

import { IconeGamme } from "@/components/site/icone-gamme";
import { imageProduit } from "@/lib/produits";
import { lienWhatsApp } from "@/lib/produits";
import { lienCarte, lienTel, VILLE } from "@/lib/site";
import { BESOINS, lienRecherche, type DonneesAccueil } from "./donnees";

/**
 * VARIANTE C — « Bento ».
 *
 * Parti pris : la grille bento, motif de mise en page dominant en 2026 — des
 * tuiles de tailles inégales, coins doux, chaque tuile = une information ou une
 * action. Tout l'essentiel tient dans un seul écran et demi, sans scroll long.
 * Adapté à une pharmacie : horaires, adresse, recherche et contact côte à côte.
 */
export function VarianteC({ d }: { d: DonneesAccueil }) {
  const { pharmacie } = d;
  const photo = d.photos.find((p) => p.category === "pharmacie");
  const produitVedette = d.selection.find((p) => imageProduit(p));

  /** Tuile générique : `className` porte la position dans la grille. */
  const Tuile = ({
    className = "",
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => (
    <div className={`rounded-3xl border bg-card p-6 ${className}`}>{children}</div>
  );

  return (
    <div className="variante-c min-h-screen bg-background text-foreground">
      <EnTeteProposition pharmacie={pharmacie} ton="clair" />
      <div className="container py-10">
        <h1 className="sr-only">
          {pharmacie.nom} — parapharmacie à {VILLE}
        </h1>

        <div className="grid auto-rows-[minmax(0,auto)] gap-4 md:grid-cols-4">
          {/* Accroche — 2 colonnes */}
          <Tuile className="md:col-span-2 md:row-span-2 flex flex-col justify-between bg-primary text-primary-foreground">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
                {pharmacie.sousNom}
              </p>
              <p className="mt-6 font-display text-3xl font-bold leading-[1.15] sm:text-4xl">
                Votre parapharmacie de confiance à {VILLE}.
              </p>
              <p className="mt-4 max-w-md opacity-90">
                Compléments, soins, orthopédie, appareils médicaux, bébé et maternité —
                avec le conseil en prime.
              </p>
            </div>
            <Link
              href="/produits/"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary-foreground px-5 py-3 font-semibold text-primary transition-transform hover:scale-[1.02]"
            >
              Voir les {d.produits.length} produits
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Tuile>

          {/* Photo */}
          {photo ? (
            <div className="overflow-hidden rounded-3xl border md:col-span-2 md:row-span-2">
              <img
                src={`/${photo.src}`}
                alt={`Intérieur de ${pharmacie.nom}`}
                className="size-full min-h-[240px] object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          ) : null}

          {/* Chiffres */}
          <Tuile>
            <p className="font-display text-4xl font-bold text-primary">{d.produits.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">produits référencés</p>
          </Tuile>
          <Tuile>
            <p className="font-display text-4xl font-bold text-primary">{d.marques.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">marques en rayon</p>
          </Tuile>

          {/* Horaires — 2 colonnes */}
          <Tuile className="md:col-span-2">
            <p className="flex items-center gap-2 font-display font-semibold">
              <Clock className="size-5 text-primary" aria-hidden="true" />
              Horaires
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Lun – Ven</dt>
                <dd className="text-right font-medium">
                  {pharmacie.horaires.lundi_vendredi_matin} ·{" "}
                  {pharmacie.horaires.lundi_vendredi_soir}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Samedi</dt>
                <dd className="font-medium">{pharmacie.horaires.samedi}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Dimanche</dt>
                <dd className="font-medium">Fermé</dd>
              </div>
            </dl>
          </Tuile>

          {/* Recherche par besoin — 2 colonnes */}
          <Tuile className="md:col-span-2">
            <p className="flex items-center gap-2 font-display font-semibold">
              <Search className="size-5 text-primary" aria-hidden="true" />
              Je cherche…
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {BESOINS.map((b) => (
                <li key={b.q}>
                  <Link
                    href={lienRecherche(b.q)}
                    className="inline-flex min-h-[38px] items-center rounded-full bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {b.libelle}
                  </Link>
                </li>
              ))}
            </ul>
          </Tuile>

          {/* WhatsApp — accent */}
          <a
            href={lienWhatsApp(pharmacie.whatsapp, "Bonjour, je vous écris depuis votre site.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between rounded-3xl border bg-accent p-6 text-accent-foreground transition-transform hover:scale-[1.01] md:col-span-2"
          >
            <MessageCircle className="size-7" aria-hidden="true" />
            <span className="mt-6">
              <span className="block font-display text-xl font-bold">
                Vérifier une disponibilité
              </span>
              <span className="mt-1 block text-sm opacity-90">
                On répond nous-mêmes, sur WhatsApp.
              </span>
            </span>
          </a>

          {/* Téléphone */}
          <a
            href={lienTel(pharmacie.telephone)}
            className="flex flex-col justify-between rounded-3xl border bg-card p-6 transition-colors hover:border-primary"
          >
            <Phone className="size-7 text-primary" aria-hidden="true" />
            <span className="mt-6">
              <span className="block text-sm text-muted-foreground">Appeler</span>
              <span className="block font-display text-lg font-bold">{pharmacie.telephone}</span>
            </span>
          </a>

          {/* Adresse */}
          <a
            href={lienCarte(pharmacie.adresse)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between rounded-3xl border bg-card p-6 transition-colors hover:border-primary"
          >
            <MapPin className="size-7 text-primary" aria-hidden="true" />
            <span className="mt-6">
              <span className="block text-sm text-muted-foreground">Venir</span>
              <span className="block font-medium leading-snug">Hay Fath, {VILLE}</span>
            </span>
          </a>

          {/* Produit vedette */}
          {produitVedette ? (
            <Link
              href={`/produits/${produitVedette.id}/`}
              className="group overflow-hidden rounded-3xl border bg-card transition-colors hover:border-primary md:col-span-2"
            >
              <div className="flex h-full flex-col sm:flex-row">
                <img
                  src={imageProduit(produitVedette)}
                  alt={produitVedette.nom}
                  loading="lazy"
                  decoding="async"
                  className="h-40 w-full object-cover sm:h-auto sm:w-40"
                />
                <div className="flex flex-1 flex-col justify-center p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {produitVedette.marque || "En rayon"}
                  </span>
                  <span className="mt-1 font-display text-lg font-semibold">
                    {produitVedette.nom}
                  </span>
                  <span className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {produitVedette.description}
                  </span>
                </div>
              </div>
            </Link>
          ) : null}

          {/* Gammes — pleine largeur */}
          <Tuile className="md:col-span-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <p className="font-display text-lg font-semibold">Nos {d.gammes.length} gammes</p>
              <Link
                href="/gammes/"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                Tout voir
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {d.gammes.map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/gammes/${g.slug}/`}
                    className="flex h-full items-center gap-2.5 rounded-2xl bg-secondary px-3 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <IconeGamme icon={g.icon} className="size-4 shrink-0" />
                    <span className="min-w-0 truncate">{g.nom}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Tuile>
        </div>
      </div>
      <PiedProposition pharmacie={pharmacie} />
    </div>
  );
}
