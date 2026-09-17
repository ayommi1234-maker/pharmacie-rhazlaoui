import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";

import type { PharmacieInfo } from "@/data/types";
import { lienWhatsApp } from "@/lib/produits";
import { lienCarte, lienTel, NAV, VILLE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * En-tête et pied de page des maquettes. Volontairement bâtis sur les **jetons de
 * couleur** (`--primary`, `--background`…) : placés dans une variante, ils prennent
 * automatiquement sa palette. Une seule implémentation, cinq rendus.
 */
export function EnTeteProposition({
  pharmacie,
  ton = "clair",
}: {
  pharmacie: PharmacieInfo;
  /** `transparent` = posé sur une photo plein écran (variante E). */
  ton?: "clair" | "plein" | "transparent";
}) {
  const surPhoto = ton === "transparent";

  return (
    <header
      className={cn(
        "z-20 w-full",
        surPhoto && "absolute inset-x-0 top-0 text-white",
        ton === "clair" && "border-b bg-background/85 backdrop-blur",
        ton === "plein" && "bg-primary text-primary-foreground",
      )}
    >
      <div className="container flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label={`${pharmacie.nom} — accueil`}>
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-lg",
              surPhoto || ton === "plein"
                ? "bg-white/20 text-white"
                : "bg-primary text-primary-foreground",
            )}
            aria-hidden="true"
          >
            <span className="relative block size-5">
              <span className="absolute left-1/2 top-0 h-full w-[30%] -translate-x-1/2 rounded-[2px] bg-current" />
              <span className="absolute left-0 top-1/2 h-[30%] w-full -translate-y-1/2 rounded-[2px] bg-current" />
            </span>
          </span>
          <span className="leading-tight">
            <span className="block whitespace-nowrap font-display text-[13px] font-bold sm:text-base">
              {pharmacie.nom}
            </span>
            <span
              className={cn(
                "block whitespace-nowrap text-[10px] uppercase tracking-widest sm:text-[11px]",
                surPhoto || ton === "plein" ? "opacity-75" : "text-muted-foreground",
              )}
            >
              {pharmacie.sousNom}
            </span>
          </span>
        </Link>

        <nav aria-label="Navigation de la maquette" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    surPhoto || ton === "plein"
                      ? "hover:bg-white/15"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {item.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={lienTel(pharmacie.telephone)}
          className={cn(
            "ml-auto inline-flex h-11 items-center gap-2 rounded-lg px-4 text-sm font-semibold lg:ml-0",
            surPhoto || ton === "plein"
              ? "bg-white text-primary hover:bg-white/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          <Phone className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">{pharmacie.telephone}</span>
        </a>
      </div>
    </header>
  );
}

export function PiedProposition({ pharmacie }: { pharmacie: PharmacieInfo }) {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="container grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">{pharmacie.nom}</p>
          <p className="mt-1 text-sm uppercase tracking-widest text-muted-foreground">
            {pharmacie.sousNom}
          </p>
          <address className="mt-4 space-y-2 text-sm not-italic text-muted-foreground">
            <a
              className="flex items-start gap-2 hover:text-foreground"
              href={lienCarte(pharmacie.adresse)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {pharmacie.adresse}
            </a>
            <a className="flex items-center gap-2 hover:text-foreground" href={lienTel(pharmacie.telephone)}>
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              {pharmacie.telephone}
            </a>
            <a
              className="flex items-center gap-2 hover:text-foreground"
              href={lienWhatsApp(pharmacie.whatsapp, "Bonjour, je vous écris depuis votre site.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
              WhatsApp
            </a>
          </address>
        </div>

        <div>
          <p className="font-display text-lg font-bold">Horaires</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4 border-b pb-2">
              <dt className="text-muted-foreground">Lun – Ven</dt>
              <dd className="text-right font-medium">
                {pharmacie.horaires.lundi_vendredi_matin} ·{" "}
                {pharmacie.horaires.lundi_vendredi_soir}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b pb-2">
              <dt className="text-muted-foreground">Samedi</dt>
              <dd className="font-medium">{pharmacie.horaires.samedi}</dd>
            </div>
          </dl>
          {pharmacie.horaires.garde ? (
            <p className="mt-3 text-sm text-primary">{pharmacie.horaires.garde}</p>
          ) : null}
        </div>

        <div>
          <p className="font-display text-lg font-bold">Navigation</p>
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
        <p className="container py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {pharmacie.nom}, {VILLE}. Les informations de ce site sont
          indicatives et ne remplacent pas l’avis d’un professionnel de santé.
        </p>
      </div>
    </footer>
  );
}
