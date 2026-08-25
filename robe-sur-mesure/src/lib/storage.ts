import type { Configuration } from "@/lib/types";
import { configurationVide } from "@/lib/types";

const CLE = "robe_config_v1";

/** Charge la configuration sauvegardée (SSR-safe). */
export function chargerConfig(): Configuration {
  if (typeof window === "undefined") return configurationVide();
  try {
    const brut = window.localStorage.getItem(CLE);
    if (!brut) return configurationVide();
    const parsed = JSON.parse(brut) as Partial<Configuration>;
    return { ...configurationVide(), ...parsed };
  } catch {
    return configurationVide();
  }
}

/** Sauvegarde la configuration (SSR-safe). */
export function sauvegarderConfig(config: Configuration): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CLE, JSON.stringify({ ...config, maj: Date.now() }));
  } catch {
    /* quota / mode privé : on ignore silencieusement */
  }
}

/** Efface toutes les données locales (« Effacer mes informations »). */
export function effacerConfig(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CLE);
  } catch {
    /* ignore */
  }
}

