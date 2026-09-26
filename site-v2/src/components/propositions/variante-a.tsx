import Link from "next/link";
import { EnTeteProposition, PiedProposition } from "./chrome";
import { ArrowRight, Clock, MapPin, MessageCircle, Phone, Search, Stethoscope } from "lucide-react";

import { CarteProduit } from "@/components/site/carte-produit";
import { IconeGamme } from "@/components/site/icone-gamme";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BESOINS, lienRecherche, type DonneesAccueil } from "./donnees";
import { lienWhatsApp } from "@/lib/produits";
import { lienCarte, lienTel, VILLE } from "@/lib/site";

/**
 * VARIANTE A — « Comptoir ».
 *
 * Parti pris : **structure orientée service**, le motif que les audits 2026 des
 * meilleurs sites de pharmacie donnent gagnant devant les pages « notre histoire ».
 * On mène par l'action (appeler, écrire, venir) puis par le besoin, et seulement
 * ensuite par le produit. Zéro esbroufe : c'est une pharmacie de quartier.
 */
export function VarianteA({ d }: { d: DonneesAccueil }) {
  const { pharmacie } = d;

  const actions = [
    {
      Icone: Phone,
      titre: "Appeler",
      detail: pharmacie.telephone,
      href: lienTel(pharmacie.telephone),
      externe: false,
    },
    {
      Icone: MessageCircle,
      titre: "WhatsApp",
      detail: "Vérifier une disponibilité",
      href: lienWhatsApp(pharmacie.whatsapp, "Bonjour, je vous écris depuis votre site."),
      externe: true,
    },
    {
      Icone: MapPin,
      titre: "Venir",
      detail: "Hay Fath, " + VILLE,
      href: lienCarte(pharmacie.adresse),
      externe: true,
    },
    {
      Icone: Search,
      titre: "Chercher",
      detail: `${d.produits.length} produits`,
      href: "/produits/",
      externe: false,
    },
  ];

  return (
    <div className="variante-a bg-background text-foreground">
      <EnTeteProposition pharmacie={pharmacie} ton="clair" />
      {/* ── Accroche courte, puis l'action tout de suite ── */}
      <section className="fond-soin border-b">
        <div className="container py-14 md:py-16">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
            <MapPin className="size-4" aria-hidden="true" />
            {VILLE} — Hay Fath
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.1] sm:text-5xl">
            {pharmacie.nom}
            <span className="mt-2 block text-primary">
              Le conseil d’un pharmacien, à deux pas de chez vous.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Compléments, soins de la peau, orthopédie, appareils médicaux, bébé et maternité.
            Vous demandez, on vérifie, vous passez récupérer.
          </p>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map(({ Icone, titre, detail, href, externe }) => (
              <li key={titre}>
                <a
                  href={href}
                  {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex h-full items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-primary hover:bg-primary-soft"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <Icone className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display font-semibold">{titre}</span>
                    <span className="block truncate text-sm text-muted-foreground">{detail}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Entrée par le besoin, pas par la marque ── */}
      <section className="container py-14" aria-labelledby="a-besoin">
        <h2 id="a-besoin" className="font-display text-2xl font-bold sm:text-3xl">
          Vous cherchez quelque chose de précis ?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Dites-le avec vos mots. « Tension », « peau sèche », « fatigue »…
        </p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {BESOINS.map((b) => (
            <li key={b.q}>
              <Link
                href={lienRecherche(b.q)}
                className="inline-flex min-h-[44px] items-center rounded-full border-2 border-border bg-card px-5 text-sm font-semibold transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                {b.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Horaires mis en avant : première question d'une pharmacie de quartier ── */}
      <section className="border-y bg-secondary/40 py-14" aria-labelledby="a-horaires">
        <div className="container grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h2
              id="a-horaires"
              className="flex items-center gap-2 font-display text-2xl font-bold sm:text-3xl"
            >
              <Clock className="size-7 text-primary" aria-hidden="true" />
              Quand venir
            </h2>
            <dl className="mt-6 space-y-3">
              {[
                ["Lundi – Vendredi", `${pharmacie.horaires.lundi_vendredi_matin} · ${pharmacie.horaires.lundi_vendredi_soir}`],
                ["Samedi", pharmacie.horaires.samedi],
                ["Dimanche", "Fermé"],
              ].map(([jour, h]) => (
                <div key={jour} className="flex justify-between gap-6 border-b pb-3 text-sm">
                  <dt className="font-semibold">{jour}</dt>
                  <dd className="text-right text-muted-foreground">{h}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {pharmacie.adresse}
            </p>
          </div>

          <Card className="border-primary/25 bg-card">
            <CardContent className="p-6 sm:p-8">
              <Stethoscope className="size-8 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl font-semibold">
                Une question avant d’acheter ?
              </h3>
              <p className="mt-3 text-muted-foreground">
                Un dosage, une interaction avec votre traitement, un doute pendant la
                grossesse : posez la question. C’est gratuit et c’est notre métier.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a
                    href={lienWhatsApp(
                      pharmacie.whatsapp,
                      "Bonjour, j’ai une question pour le pharmacien.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle aria-hidden="true" />
                    Poser ma question
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/conseils/">Lire les conseils</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Gammes, en second plan ── */}
      <section className="container py-14" aria-labelledby="a-gammes">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <h2 id="a-gammes" className="font-display text-2xl font-bold sm:text-3xl">
            Nos rayons
          </h2>
          <Button asChild variant="ghost">
            <Link href="/gammes/">
              Toutes les gammes
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {d.gammes.slice(0, 6).map((g) => (
            <li key={g.id}>
              <Link
                href={`/gammes/${g.slug}/`}
                className="flex h-full items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-primary"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                  <IconeGamme icon={g.icon} className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold">{g.nom}</span>
                  <span className="block text-sm text-muted-foreground">
                    {g.total} produit{g.total > 1 ? "s" : ""}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container pb-16" aria-labelledby="a-selection">
        <h2 id="a-selection" className="mb-6 font-display text-2xl font-bold sm:text-3xl">
          À découvrir en rayon
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.selection.slice(0, 4).map((p) => (
            <li key={p.id}>
              <CarteProduit produit={p} />
            </li>
          ))}
        </ul>
      </section>
      <PiedProposition pharmacie={pharmacie} />
    </div>
  );
}
