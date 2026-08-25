import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BOUTIQUE, estPlaceholder } from "@/config/boutique";

export const metadata: Metadata = {
  title: "Robe sur mesure — confectionnée à vos mesures",
  description:
    "Choisissez votre robe, saisissez vos mensurations et envoyez votre demande par WhatsApp. Confection sur mesure, confirmation avant fabrication.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBF7F0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nomAConfigurer = estPlaceholder(BOUTIQUE.nom);
  return (
    <html lang="fr">
      <body className="antialiased">
        {nomAConfigurer && (
          <div className="bg-terracotta/15 text-encre text-xs px-4 py-1.5 text-center">
            Démo — pensez à renseigner votre boutique dans{" "}
            <code className="font-mono">src/config/boutique.ts</code>.
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
