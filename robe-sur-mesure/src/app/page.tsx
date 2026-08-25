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
        <section className="overflow-hidden bg-creme">
          <Container className="grid min-h-[720px] items-center gap-12 py-12 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
            <div className="order-2 text-left lg:order-1">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-bordeaux">Confection artisanale · Maroc</p>
              <h1 className="max-w-3xl font-serif text-6xl font-semibold leading-[0.88] tracking-[-0.045em] text-encre sm:text-7xl lg:text-[94px]">
                Une robe pensée pour vous. <em className="font-medium text-bordeaux">Cousue à vos mesures.</em>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-encre/65">
                Choisissez chaque détail, renseignez vos mensurations et recevez une confirmation personnalisée sur WhatsApp.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/configurateur" className={btn("primary")}>Créer ma robe <span aria-hidden>→</span></Link>
                <Link href="/configurateur?guide=mesures" className={btn("secondary")}>Guide des mesures</Link>
              </div>
              <p className="mt-4 text-[11px] text-encre/45">Demande gratuite · Aucun paiement en ligne</p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-[2/3] w-full max-w-[480px] overflow-hidden rounded-t-[15rem] rounded-b-2xl bg-ivoire shadow-[22px_24px_0_rgba(122,46,51,.12)]">
                <Image src="/products/hero-caftan-bordeaux.png" alt="Femme portant un caftan bordeaux confectionné sur mesure" fill sizes="(max-width:1024px) 90vw, 480px" className="object-cover" priority />
                <span className="absolute bottom-5 left-5 rounded-full bg-creme/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-encre backdrop-blur">Fait avec soin</span>
              </div>
            </div>
          </Container>
        </section>

        {/* Processus */}
        <section className="border-y border-encre/10 bg-ivoire py-16">
          <Container>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-bordeaux">Simple et personnel</p>
            <h2 className="mt-3 font-serif text-5xl font-semibold">Comment ça marche</h2>
            <ol className="mt-10 grid gap-px bg-encre/10 md:grid-cols-4">
              {ETAPES.map((e, i) => (
                <li key={e.t} className="min-h-52 bg-ivoire p-7">
                  <span className="text-xs font-bold text-bordeaux">0{i + 1}</span>
                  <div className="mt-16">
                    <p className="font-serif text-2xl font-semibold leading-tight">{e.t}</p>
                    <p className="mt-2 text-xs leading-5 text-encre/55">{e.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* Réassurance */}
        <section className="py-20">
          <Container>
            <Card className="border-0 bg-encre p-8 text-creme shadow-none sm:p-12">
              <h2 className="mb-8 font-serif text-4xl font-semibold">Notre engagement</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {REASSURANCE.map((r) => (
                  <li key={r} className="flex items-start gap-3 border-t border-creme/15 pt-4 text-sm">
                    <span aria-hidden className="mt-0.5 text-dore">✦</span>
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
