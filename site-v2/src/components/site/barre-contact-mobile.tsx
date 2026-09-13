import { MapPin, MessageCircle, Phone } from "lucide-react";

import type { PharmacieInfo } from "@/data/types";
import { lienWhatsApp } from "@/lib/produits";
import { lienCarte, lienTel } from "@/lib/site";

/**
 * Barre d'actions fixe en bas d'écran sur mobile : appeler, WhatsApp, itinéraire.
 * C'est le raccourci le plus utile pour une pharmacie de quartier.
 * Le `padding-bottom` du `<body>` (layout) réserve la place pour ne rien masquer.
 */
export function BarreContactMobile({ infos }: { infos: PharmacieInfo }) {
  const actions = [
    { href: lienTel(infos.telephone), libelle: "Appeler", Icone: Phone, externe: false },
    {
      href: lienWhatsApp(
        infos.whatsapp,
        "Bonjour, je vous contacte depuis votre site. J’aurais besoin d’un renseignement.",
      ),
      libelle: "WhatsApp",
      Icone: MessageCircle,
      externe: true,
    },
    { href: lienCarte(infos.adresse), libelle: "Itinéraire", Icone: MapPin, externe: true },
  ];

  return (
    <nav
      aria-label="Contact rapide"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-3">
        {actions.map(({ href, libelle, Icone, externe }) => (
          <li key={libelle}>
            <a
              href={href}
              {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex min-h-[56px] flex-col items-center justify-center gap-1 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <Icone className="size-5" aria-hidden="true" />
              {libelle}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
