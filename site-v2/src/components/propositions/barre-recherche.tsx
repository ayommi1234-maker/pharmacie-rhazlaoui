"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { lienRecherche } from "./donnees";
import { cn } from "@/lib/utils";

/**
 * Barre de recherche de page d'accueil : envoie vers `/produits/?q=…`,
 * que le catalogue lit au chargement. Un vrai `<form>` pour que la touche
 * Entrée fonctionne et que le champ soit annoncé comme une recherche.
 */
export function BarreRecherche({
  className,
  placeholder = "Un produit, une marque, un besoin…",
  taille = "grande",
}: {
  className?: string;
  placeholder?: string;
  taille?: "grande" | "normale";
}) {
  const router = useRouter();
  const [valeur, setValeur] = React.useState("");

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(valeur.trim() ? lienRecherche(valeur.trim()) : "/produits/");
      }}
      className={cn("flex w-full gap-2", className)}
    >
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <label htmlFor="recherche-accueil" className="sr-only">
          Rechercher un produit, une marque ou un besoin
        </label>
        <input
          id="recherche-accueil"
          type="search"
          value={valeur}
          onChange={(e) => setValeur(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className={cn(
            "w-full rounded-xl border border-input bg-background pl-12 pr-4 text-base",
            "placeholder:text-muted-foreground focus-visible:outline-none",
            taille === "grande" ? "h-14 sm:h-16 sm:text-lg" : "h-12",
          )}
        />
      </div>
      <Button type="submit" size={taille === "grande" ? "lg" : "default"} className="shrink-0 sm:px-8">
        Rechercher
      </Button>
    </form>
  );
}
