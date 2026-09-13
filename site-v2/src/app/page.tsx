import Link from "next/link";
import {
  ArrowRight,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
} from "lucide-react";

import { CarteProduit } from "@/components/site/carte-produit";
import { IconeGamme } from "@/components/site/icone-gamme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  gammes,
  infos,
  marques,
  offres,
  photos,
  produitsDeGamme,
  slugGamme,
  tousLesProduits,
} from "@/data/source";
import { lienWhatsApp } from "@/lib/produits";
import { lienCarte, lienTel, VILLE } from "@/lib/site";

export default function Accueil() {
  const pharmacie = infos();
  const produits = tousLesProduits();
  const listeGammes = gammes();
  const listeOffres = offres();
  const photoVitrine = photos().find((p) => p.category === "pharmacie");

  // Mise en avant : produits porteurs d'un badge réel dans les données, complétés
  // par les premiers produits disposant d'une photo. Aucun « best-seller » inventé.
  const avecBadge = produits.filter((p) => p.badge);
  const selection = [
    ...avecBadge,
    ...produits.filter((p) => !p.badge && (p.imagePerso || p.image)),
  ].slice(0, 8);

  // Chiffres factuels, calculés depuis le fichier de données.
  const chiffres = [
    { valeur: `${produits.length}`, libelle: "produits référencés" },
    { valeur: `${listeGammes.length}`, libelle: "gammes" },
    { valeur: `${marques().length}`, libelle: "marques" },
  ];

  const services = [
    {
      Icone: Stethoscope,
      titre: "Conseil du pharmacien",
      texte: "Une question sur un complément, un dosage, une interaction ? On vous répond en face à face.",
    },
    {
      Icone: Store,
      titre: "Retrait sur place",
      texte: `Vous réservez par téléphone ou WhatsApp, vous passez récupérer à ${VILLE}.`,
    },
    {
      Icone: ShieldCheck,
      titre: "Produits de marques connues",
      texte: "CeraVe, Omron, Doppel Herz, MGD Bio, Vitabiotics… référencés en rayon.",
    },
    {
      Icone: MessageCircle,
      titre: "Disponibilité par WhatsApp",
      texte: "Un doute sur le stock ? Écrivez-nous, on vérifie avant que vous vous déplaciez.",
    },
  ];

  return (
    <>
      {/* ───────── Bandeau d'accroche ───────── */}
      <section className="fond-soin border-b">
        <div className="container grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2">
          <div className="animate-apparition-douce">
            <Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1">
              <MapPin className="size-3.5" aria-hidden="true" />
              {VILLE} — Hay Fath
            </Badge>
            <h1 className="font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              Votre parapharmacie
              <span className="block text-primary">de confiance à {VILLE}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Compléments alimentaires, soins du visage et du corps, orthopédie, appareils
              médicaux, bébé et maternité. Un rayon complet et surtout un vrai conseil —
              celui d’un pharmacien, pas d’un moteur de recherche.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/produits/">
                  Découvrir les produits
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={lienTel(pharmacie.telephone)}>
                  <Phone aria-hidden="true" />
                  {pharmacie.telephone}
                </a>
              </Button>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {chiffres.map((c) => (
                <div key={c.libelle}>
                  <dt className="sr-only">{c.libelle}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-bold text-primary">
                      {c.valeur}
                    </span>
                    <span className="text-sm text-muted-foreground">{c.libelle}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            {photoVitrine ? (
              <img
                src={`/${photoVitrine.src}`}
                alt={`Intérieur de ${pharmacie.nom} à ${VILLE}`}
                className="aspect-[4/3] w-full rounded-2xl border object-cover shadow-lg"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            ) : null}
            <Card className="absolute -bottom-6 left-4 right-4 shadow-xl sm:left-8 sm:right-auto sm:max-w-xs">
              <CardContent className="flex items-start gap-3 p-4">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-semibold">Aujourd’hui</p>
                  <p className="text-muted-foreground">
                    {pharmacie.horaires.lundi_vendredi_matin} ·{" "}
                    {pharmacie.horaires.lundi_vendredi_soir}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Samedi : {pharmacie.horaires.samedi}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ───────── Services ───────── */}
      <section className="container py-16" aria-labelledby="titre-services">
        <h2 id="titre-services" className="sr-only">
          Nos services
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ Icone, titre, texte }) => (
            <li key={titre}>
              <Card className="h-full">
                <CardContent className="p-5">
                  <span className="mb-4 grid size-11 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Icone className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-semibold">{titre}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{texte}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── Gammes ───────── */}
      <section className="border-y bg-secondary/30 py-16" aria-labelledby="titre-gammes">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="titre-gammes" className="font-display text-3xl font-bold">
                Nos gammes
              </h2>
              <p className="mt-2 text-muted-foreground">
                Parcourez le rayon par univers plutôt que marque par marque.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/gammes/">
                Toutes les gammes
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listeGammes.map((g) => {
              const total = produitsDeGamme(g).length;
              return (
                <li key={g.id}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <Link
                      href={`/gammes/${slugGamme(g)}/`}
                      className="flex h-full gap-4 rounded-xl p-5"
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                        <IconeGamme icon={g.icon} className="size-6" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display font-semibold">{g.nom}</span>
                        <span className="mt-1 block line-clamp-2 text-sm text-muted-foreground">
                          {g.description}
                        </span>
                        <span className="mt-2 block text-xs font-semibold text-primary">
                          {total} produit{total > 1 ? "s" : ""}
                        </span>
                      </span>
                    </Link>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────── Sélection produits ───────── */}
      <section className="container py-16" aria-labelledby="titre-selection">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="titre-selection" className="font-display text-3xl font-bold">
              À découvrir en rayon
            </h2>
            <p className="mt-2 text-muted-foreground">
              Une sélection de références disponibles à la pharmacie.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/produits/">
              Voir les {produits.length} produits
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {selection.map((p) => (
            <li key={p.id}>
              <CarteProduit produit={p} />
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── Mises en avant (OFFRES du fichier de données) ───────── */}
      {listeOffres.length > 0 ? (
        <section className="border-y bg-secondary/30 py-16" aria-labelledby="titre-offres">
          <div className="container">
            <h2
              id="titre-offres"
              className="mb-2 flex items-center gap-2 font-display text-3xl font-bold"
            >
              <Sparkles className="size-7 text-accent" aria-hidden="true" />
              En ce moment
            </h2>
            <p className="mb-8 text-muted-foreground">
              Passez en pharmacie ou écrivez-nous pour connaître les conditions.
            </p>
            <ul className="grid gap-4 md:grid-cols-3">
              {listeOffres.map((o) => (
                <li key={o.id}>
                  <Card className="h-full overflow-hidden">
                    {o.image ? (
                      <img
                        src={`/${o.image}`}
                        alt={o.titre}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/9] w-full object-cover"
                      />
                    ) : null}
                    <CardContent className="p-5">
                      <h3 className="font-display text-lg font-semibold">{o.titre}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{o.description}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ───────── Venir nous voir ───────── */}
      <section className="container py-16" aria-labelledby="titre-venir">
        <Card className="overflow-hidden">
          <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
            <div>
              <h2 id="titre-venir" className="font-display text-3xl font-bold">
                Venez nous voir
              </h2>
              <p className="mt-3 text-muted-foreground">
                {pharmacie.nom} vous accueille du lundi au samedi. Pour une question rapide,
                le plus simple reste le téléphone ou WhatsApp.
              </p>

              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold">Adresse</dt>
                    <dd className="text-muted-foreground">{pharmacie.adresse}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold">Horaires</dt>
                    <dd className="text-muted-foreground">
                      Lun – Ven : {pharmacie.horaires.lundi_vendredi_matin} et{" "}
                      {pharmacie.horaires.lundi_vendredi_soir}
                      <br />
                      Samedi : {pharmacie.horaires.samedi}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <a
                    href={lienWhatsApp(
                      pharmacie.whatsapp,
                      "Bonjour, je vous écris depuis votre site. J’aurais une question.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle aria-hidden="true" />
                    Écrire sur WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={lienCarte(pharmacie.adresse)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin aria-hidden="true" />
                    Voir sur la carte
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-xl bg-primary-soft p-6">
              <h3 className="font-display text-lg font-semibold">Bon à savoir</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  Les prix ne sont affichés que lorsqu’ils sont renseignés par la pharmacie.
                  Pour les autres références, demandez-nous — c’est immédiat.
                </li>
                <li>
                  Les informations produits (bienfaits, utilisation, composition) sont
                  indicatives et ne remplacent pas l’avis d’un professionnel de santé.
                </li>
                <li>{pharmacie.horaires.garde}</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
