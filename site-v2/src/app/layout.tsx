import type { Metadata, Viewport } from "next";

import "./globals.css";
import { BarreContactMobile } from "@/components/site/barre-contact-mobile";
import { EnTete } from "@/components/site/en-tete";
import { PiedDePage } from "@/components/site/pied-de-page";
import { infos } from "@/data/source";
import { VILLE } from "@/lib/site";

const pharmacie = infos();

export const metadata: Metadata = {
  title: {
    default: `${pharmacie.nom} — Parapharmacie à ${VILLE}`,
    template: `%s | ${pharmacie.nom}`,
  },
  description:
    `${pharmacie.sousNom} à ${VILLE} : compléments alimentaires, soins du visage et du corps, ` +
    `appareils médicaux, orthopédie, bébé et maternité. Conseil en pharmacie et retrait sur place.`,
  applicationName: pharmacie.nom,
  authors: [{ name: pharmacie.nom }],
  keywords: [
    "parapharmacie",
    VILLE,
    "pharmacie",
    "compléments alimentaires",
    "soins visage",
    "orthopédie",
    "appareils médicaux",
    "Maroc",
  ],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: pharmacie.nom,
    title: `${pharmacie.nom} — Parapharmacie à ${VILLE}`,
    description: `Compléments, cosmétiques, orthopédie et appareils médicaux à ${VILLE}.`,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1a17" },
  ],
};

/**
 * Applique le thème AVANT le premier rendu pour éviter le flash de couleurs.
 * Script minimal, sans dépendance, exécuté de façon synchrone dans le <head>.
 */
const SCRIPT_THEME = `
try {
  var t = localStorage.getItem('theme');
  if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Données structurées : aide Google à afficher adresse, horaires et téléphone.
  // Toutes les valeurs viennent de `PHARMACIE_INFO` — rien n'est inventé.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: pharmacie.nom,
    alternateName: pharmacie.sousNom,
    telephone: pharmacie.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: pharmacie.adresse,
      addressLocality: VILLE,
      addressCountry: "MA",
    },
    openingHours: [
      `Mo-Fr ${pharmacie.horaires.lundi_vendredi_matin.replace(/h/g, ":").replace(/\s*–\s*/, "-")}`,
      `Mo-Fr ${pharmacie.horaires.lundi_vendredi_soir.replace(/h/g, ":").replace(/\s*–\s*/, "-")}`,
      `Sa ${pharmacie.horaires.samedi.replace(/h/g, ":").replace(/\s*–\s*/, "-")}`,
    ],
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_THEME }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh pb-16 lg:pb-0">
        <a href="#contenu" className="lien-evitement">
          Aller au contenu principal
        </a>
        <EnTete
          nom={pharmacie.nom}
          sousNom={pharmacie.sousNom}
          telephone={pharmacie.telephone}
        />
        <main id="contenu">{children}</main>
        <PiedDePage infos={pharmacie} />
        <BarreContactMobile infos={pharmacie} />
      </body>
    </html>
  );
}
