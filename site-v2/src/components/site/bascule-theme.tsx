"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Bascule clair / sombre. Le choix est mémorisé dans `localStorage` et appliqué
 * avant le premier rendu par le script inline de `layout.tsx` (pas de clignotement).
 */
export function BasculeTheme() {
  const [sombre, setSombre] = React.useState(false);
  const [monte, setMonte] = React.useState(false);

  React.useEffect(() => {
    setMonte(true);
    setSombre(document.documentElement.classList.contains("dark"));
  }, []);

  function basculer() {
    const suivant = !sombre;
    setSombre(suivant);
    document.documentElement.classList.toggle("dark", suivant);
    try {
      localStorage.setItem("theme", suivant ? "dark" : "light");
    } catch {
      // Navigation privée ou stockage refusé : on ignore, le thème reste valable pour la session.
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={basculer}
      aria-label={sombre ? "Passer en thème clair" : "Passer en thème sombre"}
      aria-pressed={monte ? sombre : undefined}
    >
      {/* Avant hydratation on affiche une icône neutre pour éviter tout décalage. */}
      {monte && sombre ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}
