import Link from "next/link";
import { BOUTIQUE, estPlaceholder } from "@/config/boutique";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-md px-4 ${className}`}>{children}</div>;
}

export function Header() {
  const nom = estPlaceholder(BOUTIQUE.nom) ? "Votre Boutique" : BOUTIQUE.nom;
  return (
    <header className="border-b border-encre/10 bg-creme/80 backdrop-blur sticky top-0 z-10">
      <Container className="flex items-center justify-between py-3">
        <Link href="/" className="font-serif text-lg font-bold text-bordeaux">
          {nom}
        </Link>
        <Link href="/catalogue" className="text-sm font-semibold text-encre/80 hover:text-bordeaux">
          Catalogue
        </Link>
      </Container>
    </header>
  );
}

export function Footer() {
  const social = estPlaceholder(BOUTIQUE.reseauSocial) ? null : BOUTIQUE.reseauSocial;
  const ville = estPlaceholder(BOUTIQUE.ville) ? null : BOUTIQUE.ville;
  return (
    <footer className="mt-10 border-t border-encre/10 py-6 text-center text-xs text-encre/60">
      <Container>
        <p className="mb-1">Confection sur mesure · Confirmation avant fabrication · Accompagnement WhatsApp</p>
        {ville && <p>{ville}</p>}
        <p className="mt-2 space-x-3">
          <Link href="/confidentialite" className="underline hover:text-bordeaux">
            Confidentialité
          </Link>
          {social && (
            <a href={social} target="_blank" rel="noopener noreferrer" className="underline hover:text-bordeaux">
              Nous suivre
            </a>
          )}
        </p>
        <p className="mt-3 text-encre/40">Données d&apos;exemple — démonstration.</p>
      </Container>
    </footer>
  );
}
