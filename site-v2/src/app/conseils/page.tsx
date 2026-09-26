import type { Metadata } from "next";
import { Info, MessageCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { infos } from "@/data/source";
import { lienWhatsApp } from "@/lib/produits";

export const metadata: Metadata = {
  title: "Conseils santé",
  description:
    "Réponses aux questions les plus fréquentes posées au comptoir : compléments alimentaires, automesure de la tension, soins de la peau, orthopédie.",
};

/**
 * Contenu volontairement **général et prudent** : on explique des principes,
 * on ne pose aucun diagnostic et on ne promet aucun résultat.
 */
const SUJETS = [
  {
    titre: "Les compléments alimentaires : comment bien les choisir ?",
    reponse: [
      "Un complément alimentaire complète l’alimentation, il ne la remplace pas et ne soigne pas une maladie.",
      "Regardez d’abord la forme et la dose du nutriment, pas seulement le nom commercial : deux produits « magnésium » peuvent contenir des sels très différents.",
      "Respectez la durée de cure indiquée sur la boîte plutôt que de prolonger indéfiniment.",
      "Signalez toujours vos traitements en cours : certains compléments interagissent avec des médicaments courants (anticoagulants, thyroïde, contraception…).",
      "En cas de grossesse, d’allaitement, ou pour un enfant, demandez systématiquement l’avis du pharmacien avant d’acheter.",
    ],
  },
  {
    titre: "Mesurer sa tension à la maison : les bons réflexes",
    reponse: [
      "Restez assis et au calme 5 minutes avant la mesure, dos appuyé et pieds à plat.",
      "Placez le brassard sur le bras nu, au niveau du cœur, et ne parlez pas pendant la mesure.",
      "Faites plusieurs mesures espacées de 1 à 2 minutes et notez-les : c’est la moyenne qui compte, pas un chiffre isolé.",
      "Évitez le café, le tabac et l’effort physique dans la demi-heure qui précède.",
      "Une mesure élevée isolée ne signifie pas grand-chose. Des chiffres élevés répétés doivent être montrés à un médecin.",
    ],
  },
  {
    titre: "Prendre soin d’une peau sèche ou sensible",
    reponse: [
      "Préférez un nettoyant doux sans savon et de l’eau tiède — l’eau très chaude aggrave la sécheresse.",
      "Appliquez la crème hydratante sur peau encore légèrement humide, juste après la douche.",
      "Introduisez un seul produit nouveau à la fois : en cas de réaction, vous saurez lequel est en cause.",
      "La protection solaire reste utile toute l’année, y compris par temps couvert.",
      "Une rougeur qui persiste, démange fortement ou s’étend justifie un avis médical plutôt qu’un nouveau cosmétique.",
    ],
  },
  {
    titre: "Genouillère, ceinture lombaire, chevillère : que choisir ?",
    reponse: [
      "La taille se choisit en mesurant le tour du membre à l’endroit indiqué sur l’emballage, pas d’après la taille de vêtement.",
      "Un maintien doit être ferme mais ne jamais couper la circulation : si vous ressentez des fourmillements, il est trop serré.",
      "Ces dispositifs accompagnent la récupération ; ils ne remplacent ni le repos ni la rééducation prescrite.",
      "Passez en pharmacie pour l’essayage : un modèle bien ajusté fait toute la différence.",
    ],
  },
  {
    titre: "Conserver correctement ses produits",
    reponse: [
      "La salle de bain est l’un des pires endroits : chaleur et humidité abîment beaucoup de produits.",
      "Vérifiez la date de péremption et, pour les cosmétiques ouverts, le symbole du petit pot avec « 6M », « 12M »…",
      "Les médicaments et compléments se gardent hors de portée des enfants, dans leur emballage d’origine avec leur notice.",
      "Ne jetez pas les médicaments non utilisés à la poubelle : rapportez-les à la pharmacie.",
    ],
  },
];

export default function PageConseils() {
  const pharmacie = infos();

  return (
    <div className="container py-10">
      <header className="mb-8 max-w-3xl">
        <h1 className="font-display text-4xl font-bold">Conseils santé</h1>
        <p className="mt-3 text-muted-foreground">
          Les questions qui reviennent le plus souvent au comptoir, et ce que nous répondons.
          Ce sont des repères généraux : votre situation personnelle mérite toujours une réponse
          personnelle.
        </p>
      </header>

      <Card className="mb-10 border-accent/40 bg-accent/5">
        <CardContent className="flex gap-3 p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Important.</strong> Ces informations sont
            générales et ne constituent pas un avis médical. Elles ne remplacent pas la
            consultation d’un médecin ou l’entretien avec un pharmacien. En cas de symptôme
            inhabituel, persistant ou qui s’aggrave, consultez sans attendre.
          </p>
        </CardContent>
      </Card>

      <div className="max-w-3xl">
        <Accordion type="single" collapsible className="border-t">
          {SUJETS.map((s) => (
            <AccordionItem key={s.titre} value={s.titre}>
              <AccordionTrigger>{s.titre}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-2 pl-5">
                  {s.reponse.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 rounded-xl bg-primary-soft p-6">
          <h2 className="font-display text-xl font-semibold">Une question précise ?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Écrivez-nous, on vous répond nous-mêmes. Pas de robot, pas de formulaire à rallonge.
          </p>
          <Button asChild className="mt-5">
            <a
              href={lienWhatsApp(
                pharmacie.whatsapp,
                "Bonjour, j’ai une question suite à la page « Conseils santé » de votre site.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle aria-hidden="true" />
              Poser ma question sur WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
