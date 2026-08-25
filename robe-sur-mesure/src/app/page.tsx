import Link from "next/link";
import Image from "next/image";
import { Header, Footer, Container } from "@/components/Chrome";
import { Card } from "@/components/ui";
import { btn } from "@/components/ui/btn";

const ETAPES = [
  { t: "Choisissez votre modèle", d: "Parmi nos modèles ou à partir d'une photo." },
  { t: "Prenez vos mesures", d: "Guidé pas à pas, en cm ou en mètres." },
  { t: "Envoyez votre demande", d: "Un message clair, directement sur WhatsApp." },
  { t: "Nous confirmons la commande", d: "Prix et délai confirmés avant fabrication." },
];

const REASSURANCE = [
  "Confection sur mesure",
  "Confirmation avant fabrication",
  "Accompagnement par WhatsApp",
  "Coordonnées et mensurations confidentielles",
];

export default function Accueil() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-ivoire">
          <Container className="py-8 text-center">
            <div className="relative mx-auto mb-6 aspect-[4/5] w-full max-w-xs overflow-hidden rounded-xl2 border border-encre/10">
              <Image src="/products/placeholder.svg" alt="Robe confectionnée sur mesure" fill className="object-cover" priority />
            </div>
            <h1 className="font-serif text-3xl font-bold leading-tight text-encre">
              Votre robe, confectionnée à vos mesures
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-encre/70">
              Choisissez un modèle, indiquez vos mensurations et envoyez votre demande. La confection
              démarre seulement après confirmation avec vous.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/configurateur" className={btn("primary")}>
                Choisir ma robe
              </Link>
              <Link href="/configurateur?guide=mesures" className={btn("secondary")}>
                Comment prendre mes mesures ?
              </Link>
            </div>
          </Container>
        </section>

        {/* Processus */}
        <section className="py-8">
          <Container>
            <h2 className="mb-4 font-serif text-xl font-bold">Comment ça marche</h2>
            <ol className="space-y-3">
              {ETAPES.map((e, i) => (
                <li key={e.t} className="flex gap-3">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-bordeaux text-sm font-bold text-creme">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{e.t}</p>
                    <p className="text-sm text-encre/60">{e.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* Réassurance */}
        <section className="pb-8">
          <Container>
            <Card className="p-5">
              <h2 className="mb-3 font-serif text-lg font-bold">Notre engagement</h2>
              <ul className="space-y-2">
                {REASSURANCE.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm">
                    <span aria-hidden className="mt-0.5 text-bordeaux">✓</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
