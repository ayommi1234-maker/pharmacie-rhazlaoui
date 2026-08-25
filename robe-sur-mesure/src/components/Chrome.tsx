import Link from "next/link";
import { BOUTIQUE, estPlaceholder } from "@/config/boutique";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Header() {
  const nom = estPlaceholder(BOUTIQUE.nom) ? "Votre Boutique" : BOUTIQUE.nom;
  return (
    <header className="sticky top-0 z-20 border-b border-encre/10 bg-creme/90 backdrop-blur-xl">
      <Container className="flex min-h-[74px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 font-serif text-xl font-bold text-encre">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-encre text-[10px] font-sans font-bold tracking-[0.15em] transition-colors group-hover:bg-encre group-hover:text-creme">AB</span>
          {nom}
        </Link>
        <nav className="flex items-center gap-5 text-xs font-bold uppercase tracking-[0.12em]">
          <Link href="/catalogue" className="text-encre/70 hover:text-bordeaux">Catalogue</Link>
          <Link href="/configurateur" className="hidden border-b border-bordeaux pb-1 text-bordeaux sm:block">Créer ma robe</Link>
        </nav>
      </Container>
    </header>
  );
}

export function Footer() {
  const social = estPlaceholder(BOUTIQUE.reseauSocial) ? null : BOUTIQUE.reseauSocial;
  const ville = estPlaceholder(BOUTIQUE.ville) ? null : BOUTIQUE.ville;
  return (
    <footer className="mt-16 border-t border-encre/10 bg-encre py-10 text-xs text-creme/60">
      <Container className="grid gap-6 text-center sm:grid-cols-3 sm:text-left">
        <div><p className="font-serif text-2xl font-semibold text-creme">{estPlaceholder(BOUTIQUE.nom) ? "Atelier Bounna" : BOUTIQUE.nom}</p><p className="mt-2">Confection sur mesure, pensée pour vous.</p></div>
        <div><p className="mb-2 font-bold uppercase tracking-widest text-creme">L’atelier</p><p>Confirmation avant fabrication</p><p>Accompagnement WhatsApp</p></div>
        <div className="sm:text-right">
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
        <p className="mt-3 text-creme/35">Données d&apos;exemple — démonstration.</p></div>
      </Container>
    </footer>
  );
}
