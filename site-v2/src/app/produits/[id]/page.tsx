import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, Info, MessageCircle, Phone } from "lucide-react";

import { CarteProduit } from "@/components/site/carte-produit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LIBELLE_CATEGORIE, infos, produitParId, tousLesProduits } from "@/data/source";
import { imageProduit, lienWhatsApp, messageProduit, prixAffichable } from "@/lib/produits";
import { lienTel } from "@/lib/site";

/** Une page statique par produit (export `output: "export"`). */
export function generateStaticParams() {
  return tousLesProduits().map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = produitParId(params.id);
  if (!p) return { title: "Produit introuvable" };
  return {
    title: p.nom,
    description: p.description || `${p.nom} — ${p.marque}, disponible en pharmacie.`,
  };
}

export default function PageProduit({ params }: { params: { id: string } }) {
  const produit = produitParId(params.id);
  if (!produit) notFound();

  const pharmacie = infos();
  const image = imageProduit(produit);
  const prix = prixAffichable(produit.prix);
  const ancien = prixAffichable(produit.ancienPrix);

  // Suggestions : même marque d'abord, puis même rayon. Jamais de « produits sponsorisés ».
  const suggestions = tousLesProduits()
    .filter((p) => p.id !== produit.id)
    .sort((a, b) => {
      const score = (x: typeof a) =>
        (x.marque === produit.marque ? 2 : 0) + (x.categorie === produit.categorie ? 1 : 0);
      return score(b) - score(a);
    })
    .filter((p) => p.marque === produit.marque || p.categorie === produit.categorie)
    .slice(0, 4);

  return (
    <div className="container py-8">
      <nav aria-label="Fil d’Ariane" className="mb-6 text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/produits/" className="hover:text-foreground">
              Produits
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-foreground">{produit.nom}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-muted">
          {image ? (
            <img
              src={image}
              alt={`${produit.nom} — ${produit.marque}`}
              className="aspect-square w-full object-cover"
              decoding="async"
            />
          ) : (
            <div className="grid aspect-square place-items-center text-muted-foreground">
              Photo à venir
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {produit.badge ? <Badge variant="accent">{produit.badge}</Badge> : null}
            <Badge variant="secondary">
              {LIBELLE_CATEGORIE[produit.categorie] ?? produit.categorie}
            </Badge>
          </div>

          {produit.marque ? (
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-primary">
              {produit.marque}
            </p>
          ) : null}
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{produit.nom}</h1>
          {produit.description ? (
            <p className="mt-4 text-lg text-muted-foreground">{produit.description}</p>
          ) : null}

          <div className="mt-6">
            {prix ? (
              <p className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-primary">{prix}</span>
                {ancien ? (
                  <span className="text-lg text-muted-foreground line-through">{ancien}</span>
                ) : null}
              </p>
            ) : (
              <p className="text-muted-foreground">
                Prix non affiché en ligne — demandez-le nous, la réponse est immédiate.
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a
                href={lienWhatsApp(pharmacie.whatsapp, messageProduit(produit))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" />
                Demander sur WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={lienTel(pharmacie.telephone)}>
                <Phone aria-hidden="true" />
                Appeler la pharmacie
              </a>
            </Button>
          </div>

          {produit.bienfaits?.length ? (
            <section className="mt-8" aria-labelledby="titre-bienfaits">
              <h2 id="titre-bienfaits" className="font-display text-xl font-semibold">
                Bienfaits
              </h2>
              <ul className="mt-3 space-y-2">
                {produit.bienfaits.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {produit.utilisation ? (
            <section className="mt-8" aria-labelledby="titre-utilisation">
              <h2 id="titre-utilisation" className="font-display text-xl font-semibold">
                Conseils d’utilisation
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {produit.utilisation}
              </p>
            </section>
          ) : null}

          {produit.composition ? (
            <section className="mt-8" aria-labelledby="titre-composition">
              <h2 id="titre-composition" className="font-display text-xl font-semibold">
                Composition
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {produit.composition}
              </p>
            </section>
          ) : null}

          <Card className="mt-8 border-accent/40 bg-accent/5">
            <CardContent className="flex gap-3 p-4">
              <Info className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                Ces informations sont fournies à titre indicatif et ne constituent pas un avis
                médical. Elles ne remplacent pas la consultation d’un professionnel de santé.
                Demandez conseil à votre pharmacien, en particulier en cas de traitement en cours,
                de grossesse ou d’allaitement.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {suggestions.length > 0 ? (
        <section className="mt-16" aria-labelledby="titre-suggestions">
          <h2 id="titre-suggestions" className="mb-6 font-display text-2xl font-bold">
            Dans le même rayon
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {suggestions.map((p) => (
              <li key={p.id}>
                <CarteProduit produit={p} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-12">
        <Button asChild variant="ghost">
          <Link href="/produits/">
            <ArrowLeft aria-hidden="true" />
            Retour au catalogue
          </Link>
        </Button>
      </div>
    </div>
  );
}
