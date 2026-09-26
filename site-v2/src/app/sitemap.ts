import type { MetadataRoute } from "next";

import { gammes, slugGamme, tousLesProduits } from "@/data/source";
import { URL_SITE } from "@/lib/url";

/** Sitemap généré au build : pages fixes + une entrée par produit et par gamme. */
export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date();

  const fixes = ["", "/produits/", "/gammes/", "/galerie/", "/conseils/", "/contact/"].map(
    (chemin) => ({
      url: `${URL_SITE}${chemin || "/"}`,
      lastModified: maintenant,
      changeFrequency: "monthly" as const,
      priority: chemin === "" ? 1 : 0.8,
    }),
  );

  const produits = tousLesProduits().map((p) => ({
    url: `${URL_SITE}/produits/${p.id}/`,
    lastModified: maintenant,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const listeGammes = gammes().map((g) => ({
    url: `${URL_SITE}/gammes/${slugGamme(g)}/`,
    lastModified: maintenant,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...fixes, ...listeGammes, ...produits];
}
