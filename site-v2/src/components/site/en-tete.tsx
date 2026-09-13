"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Search } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BasculeTheme } from "@/components/site/bascule-theme";
import { NAV, lienTel } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = { nom: string; sousNom: string; telephone: string };

export function EnTete({ nom, sousNom, telephone }: Props) {
  const chemin = usePathname();
  const [ouvert, setOuvert] = React.useState(false);

  const estActif = (href: string) =>
    href === "/" ? chemin === "/" : chemin.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center gap-3">
        <Link href="/" className="flex items-center gap-3 rounded-md" aria-label={`${nom} — accueil`}>
          <span
            className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground"
            aria-hidden="true"
          >
            {/* Croix de pharmacie dessinée en CSS : aucune dépendance d'image. */}
            <span className="relative block size-5">
              <span className="absolute left-1/2 top-0 h-full w-[30%] -translate-x-1/2 rounded-[2px] bg-current" />
              <span className="absolute left-0 top-1/2 h-[30%] w-full -translate-y-1/2 rounded-[2px] bg-current" />
            </span>
          </span>
          {/*
            `whitespace-nowrap` : le nom doit tenir sur UNE ligne, sinon l'en-tête
            dépasse 64 px et décale la barre de recherche collante (`top-16`) du catalogue.
          */}
          <span className="min-w-0 leading-tight">
            <span className="block whitespace-nowrap font-display text-[13px] font-bold sm:text-base lg:text-lg">
              {nom}
            </span>
            <span className="block whitespace-nowrap text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
              {sousNom}
            </span>
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={estActif(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    estActif(item.href)
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {item.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          {/* Masqué sur très petits écrans : « Produits » est déjà dans le menu. */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="Rechercher un produit"
          >
            <Link href="/produits/">
              <Search aria-hidden="true" />
            </Link>
          </Button>
          <BasculeTheme />
          <Button asChild className="hidden sm:inline-flex">
            <a href={lienTel(telephone)}>
              <Phone aria-hidden="true" />
              {telephone}
            </a>
          </Button>

          <Sheet open={ouvert} onOpenChange={setOuvert}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Ouvrir le menu">
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent titre="Menu">
              <nav aria-label="Navigation mobile">
                <ul className="flex flex-col gap-1">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          aria-current={estActif(item.href) ? "page" : undefined}
                          className={cn(
                            "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                            estActif(item.href)
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-secondary",
                          )}
                        >
                          {item.libelle}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <Button asChild className="mt-2 w-full" size="lg">
                <a href={lienTel(telephone)}>
                  <Phone aria-hidden="true" />
                  Appeler {telephone}
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
