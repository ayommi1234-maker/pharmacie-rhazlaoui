import { Header, Footer, Container } from "@/components/Chrome";
import { EffacerDonnees } from "@/components/EffacerDonnees";

export const metadata = { title: "Confidentialité — Robe sur mesure" };

export default function Confidentialite() {
  return (
    <>
      <Header />
      <main className="py-6">
        <Container className="space-y-4 text-sm leading-relaxed">
          <h1 className="font-serif text-2xl font-bold">Confidentialité</h1>

          <p>
            Cette application vous aide à préparer une <strong>demande</strong> de robe sur mesure. Il ne
            s&apos;agit pas d&apos;un paiement : la commande ne devient définitive qu&apos;après confirmation
            avec la boutique.
          </p>

          <h2 className="font-semibold text-base">Vos données</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Vos choix et mensurations sont enregistrés <strong>uniquement sur votre appareil</strong> (stockage local du navigateur), pour ne pas perdre votre formulaire.</li>
            <li>Aucune donnée n&apos;est envoyée automatiquement. Vos informations ne quittent votre appareil que lorsque <strong>vous</strong> appuyez sur « Envoyer sur WhatsApp ».</li>
            <li>Vos mensurations et coordonnées ne sont jamais affichées publiquement ni placées dans une adresse web publique.</li>
            <li>Nous n&apos;utilisons aucun traceur publicitaire.</li>
            <li>Le seul service tiers utilisé pour l&apos;envoi est WhatsApp, à votre initiative.</li>
          </ul>

          <h2 className="font-semibold text-base">Supprimer vos informations</h2>
          <p>Vous pouvez effacer à tout moment les informations enregistrées sur cet appareil :</p>
          <EffacerDonnees />
        </Container>
      </main>
      <Footer />
    </>
  );
}
