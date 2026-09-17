import Link from "next/link";
import { Clock, Instagram, Mail, MapPin, Music2, Phone } from "lucide-react";

import type { PharmacieInfo } from "@/data/types";
import { NAV, lienCarte, lienTel } from "@/lib/site";

/** Pied de page : uniquement des informations réelles issues de `PHARMACIE_INFO`. */
export function PiedDePage({ infos }: { infos: PharmacieInfo }) {
  const h = infos.horaires;
  const reseaux = [
    { href: infos.instagram, libelle: "Instagram", Icone: Instagram },
    { href: infos.tiktok, libelle: "TikTok", Icone: Music2 },
  ].filter((r) => {
    // On n'affiche un réseau que si l'URL pointe vers un vrai profil,
    // pas vers la page d'accueil du réseau (valeur par défaut du fichier de données).
    try {
      return new URL(r.href).pathname.replace(/\/+$/, "").length > 0;
    } catch {
      return false;
    }
  });

  return (
    <footer className="mt-20 border-t bg-secondary/40">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h2 className="font-display text-lg font-bold">{infos.nom}</h2>
          <p className="mt-1 text-sm uppercase tracking-widest text-muted-foreground">
            {infos.sousNom}
          </p>
          <address className="mt-4 space-y-3 text-sm not-italic text-muted-foreground">
            <a
              className="flex items-start gap-2 hover:text-foreground"
              href={lienCarte(infos.adresse)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{infos.adresse}</span>
            </a>
            <a className="flex items-center gap-2 hover:text-foreground" href={lienTel(infos.telephone)}>
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              <span>{infos.telephone}</span>
            </a>
            {infos.email ? (
              <a className="flex items-center gap-2 hover:text-foreground" href={`mailto:${infos.email}`}>
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                <span>{infos.email}</span>
              </a>
            ) : null}
          </address>

          {reseaux.length > 0 ? (
            <ul className="mt-5 flex gap-2">
              {reseaux.map(({ href, libelle, Icone }) => (
                <li key={libelle}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={libelle}
                    className="grid size-10 place-items-center rounded-lg border bg-background transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icone className="size-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Clock className="size-5 text-primary" aria-hidden="true" />
            Horaires d’ouverture
          </h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4 border-b pb-2">
              <dt className="text-muted-foreground">Lundi – Vendredi (matin)</dt>
              <dd className="font-medium">{h.lundi_vendredi_matin}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b pb-2">
              <dt className="text-muted-foreground">Lundi – Vendredi (après-midi)</dt>
              <dd className="font-medium">{h.lundi_vendredi_soir}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b pb-2">
              <dt className="text-muted-foreground">Samedi</dt>
              <dd className="font-medium">{h.samedi}</dd>
            </div>
          </dl>
          {h.garde ? <p className="mt-3 text-sm text-primary">{h.garde}</p> : null}
        </div>

        <div>
          <h2 className="font-display text-lg font-bold">Navigation</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                  {item.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {infos.nom}. Tous droits réservés.
          </p>
          <p className="max-w-xl sm:text-right">
            Les informations de ce site sont fournies à titre indicatif et ne remplacent pas
            l’avis d’un professionnel de santé. Demandez conseil à votre pharmacien.
          </p>
        </div>
      </div>
    </footer>
  );
}
