import type { MetadataRoute } from "next";

import { URL_SITE } from "@/lib/url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Le panneau d'administration de la propriétaire ne doit jamais être indexé.
      disallow: ["/admin/", "/admin"],
    },
    sitemap: `${URL_SITE}/sitemap.xml`,
  };
}
