import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function PageIntrouvable() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">Cette page n’existe pas</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Le lien est peut-être ancien, ou le produit n’est plus référencé sur le site.
        Le catalogue complet reste accessible.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/produits/">Voir les produits</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">Retour à l’accueil</Link>
        </Button>
      </div>
    </div>
  );
}
