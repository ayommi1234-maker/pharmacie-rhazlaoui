import type { Metadata } from "next";
import { Clock, Instagram, MapPin, MessageCircle, Music2, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { infos } from "@/data/source";
import { lienWhatsApp } from "@/lib/produits";
import { lienCarte, lienTel, VILLE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & horaires",
  description: `Adresse, horaires et contact de la pharmacie à ${VILLE}. Téléphone et WhatsApp.`,
};

export default function PageContact() {
  const pharmacie = infos();
  const h = pharmacie.horaires;

  const jours = [
    { jour: "Lundi – Vendredi", matin: h.lundi_vendredi_matin, soir: h.lundi_vendredi_soir },
    { jour: "Samedi", matin: h.samedi, soir: "" },
    { jour: "Dimanche", matin: "Fermé", soir: "" },
  ];

  const reseaux = [
    { href: pharmacie.instagram, libelle: "Instagram", Icone: Instagram },
    { href: pharmacie.tiktok, libelle: "TikTok", Icone: Music2 },
  ].filter((r) => {
    try {
      return new URL(r.href).pathname.replace(/\/+$/, "").length > 0;
    } catch {
      return false;
    }
  });

  return (
    <div className="container py-10">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-display text-4xl font-bold">Contact & horaires</h1>
        <p className="mt-3 text-muted-foreground">
          {pharmacie.nom} — {pharmacie.sousNom}. Appelez-nous, écrivez-nous sur WhatsApp,
          ou passez directement : nous sommes à {VILLE}, Hay Fath.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
              <Clock className="size-5 text-primary" aria-hidden="true" />
              Horaires d’ouverture
            </h2>
            <table className="mt-5 w-full text-sm">
              <caption className="sr-only">Horaires d’ouverture de la pharmacie</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Jour</th>
                  <th scope="col">Matin</th>
                  <th scope="col">Après-midi</th>
                </tr>
              </thead>
              <tbody>
                {jours.map((j) => (
                  <tr key={j.jour} className="border-b last:border-0">
                    <th scope="row" className="py-3 text-left font-medium">
                      {j.jour}
                    </th>
                    <td className="py-3 text-right text-muted-foreground">{j.matin}</td>
                    <td className="py-3 text-right text-muted-foreground">{j.soir || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {h.garde ? (
              <p className="mt-4 rounded-lg bg-primary-soft p-3 text-sm text-primary">
                {h.garde}
              </p>
            ) : null}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-display text-xl font-semibold">Nous joindre</h2>
              <div className="mt-5 space-y-3">
                <Button asChild className="w-full justify-start" size="lg">
                  <a href={lienTel(pharmacie.telephone)}>
                    <Phone aria-hidden="true" />
                    {pharmacie.telephone}
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start" size="lg">
                  <a
                    href={lienWhatsApp(
                      pharmacie.whatsapp,
                      "Bonjour, je vous contacte depuis votre site.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle aria-hidden="true" />
                    WhatsApp
                  </a>
                </Button>
              </div>

              {reseaux.length > 0 ? (
                <>
                  <h3 className="mt-6 text-sm font-semibold">Nous suivre</h3>
                  <ul className="mt-3 flex gap-2">
                    {reseaux.map(({ href, libelle, Icone }) => (
                      <li key={libelle}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={libelle}
                          className="grid size-11 place-items-center rounded-lg border transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          <Icone className="size-5" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                <MapPin className="size-5 text-primary" aria-hidden="true" />
                Adresse
              </h2>
              <address className="mt-3 text-sm not-italic text-muted-foreground">
                {pharmacie.adresse}
              </address>
              <Button asChild variant="outline" className="mt-5 w-full">
                <a
                  href={lienCarte(pharmacie.adresse)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ouvrir dans la carte
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6 overflow-hidden">
        {/*
          Carte OpenStreetMap en iframe : pas de clé d'API, pas de traceur publicitaire.
          `loading="lazy"` évite de charger la carte tant qu'elle n'est pas à l'écran.
        */}
        <iframe
          title={`Emplacement de ${pharmacie.nom} sur la carte`}
          src="https://www.openstreetmap.org/export/embed.html?bbox=-6.925%2C32.870%2C-6.885%2C32.895&layer=mapnik"
          className="h-[420px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="border-t p-4 text-center text-sm text-muted-foreground">
          Vue générale de {VILLE}.{" "}
          <a
            className="font-medium text-primary underline underline-offset-4"
            href={lienCarte(pharmacie.adresse)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Rechercher l’adresse exacte sur OpenStreetMap
          </a>
        </div>
      </Card>
    </div>
  );
}
