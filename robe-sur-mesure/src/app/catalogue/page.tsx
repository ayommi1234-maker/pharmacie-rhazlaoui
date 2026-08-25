import Link from "next/link";
import Image from "next/image";
import { Header, Footer, Container } from "@/components/Chrome";
import { Card, Chip } from "@/components/ui";
import { btn } from "@/components/ui/btn";
import { MODELES } from "@/data/modeles";
import { formatDH } from "@/lib/prix";
import { tissuParId } from "@/data/tissus";

export const metadata = { title: "Catalogue — Robe sur mesure" };

export default function Catalogue() {
  return (
    <>
      <Header />
      <main className="py-6">
        <Container>
          <h1 className="mb-1 font-serif text-2xl font-bold">Nos modèles</h1>
          <p className="mb-4 text-sm text-encre/60">
            Modèles de démonstration. Chaque robe est confectionnée à vos mesures.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {MODELES.map((m) => {
              const tissus = m.tissusConseilles
                .map((id) => tissuParId(id)?.nom)
                .filter(Boolean)
                .slice(0, 3);
              return (
                <Card key={m.id} className="overflow-hidden">
                  <div className="relative aspect-[4/5] w-full bg-ivoire">
                    <Image src={m.photo} alt={m.nom} fill className="object-cover" />
                    {m.demo && (
                      <span className="absolute left-2 top-2">
                        <Chip>Démo</Chip>
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-semibold leading-tight">{m.nom}</h2>
                      <span className="text-xs text-encre/50">{m.reference}</span>
                    </div>
                    <p className="text-sm font-semibold text-bordeaux">
                      {m.prixBaseDH > 0 ? `À partir de ${formatDH(m.prixBaseDH)}` : "Prix à confirmer"}
                    </p>
                    {tissus.length > 0 && (
                      <p className="text-xs text-encre/60">Tissus : {tissus.join(", ")}</p>
                    )}
                    <p className="text-xs text-encre/60">Délai estimé : {m.delaiEstime}</p>
                    <Link
                      href={`/configurateur?modele=${m.id}`}
                      className={btn("primary", "w-full text-sm")}
                    >
                      Choisir ce modèle
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
