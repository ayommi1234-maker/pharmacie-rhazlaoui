import type { ResumeCommande } from "@/lib/resume";
import { lignesMesuresTexte } from "@/lib/resume";
import { formatDH } from "@/lib/prix";
import { BOUTIQUE } from "@/config/boutique";

/**
 * Construit le message WhatsApp structuré et lisible.
 * Les mensurations n'apparaissent QUE dans ce message (déclenché par la cliente),
 * jamais dans une URL publique.
 */
export function construireMessageWhatsApp(r: ResumeCommande): string {
  const l: string[] = [];
  l.push("Bonjour, je souhaite commander une robe sur mesure.");
  l.push("");
  l.push(`Modèle : ${r.modeleNom} (${r.reference})`);
  l.push(`Tissu : ${r.tissu}`);
  l.push(`Couleur : ${r.couleur}`);
  if (r.ville) l.push(`Ville : ${r.ville}`);
  l.push("");
  l.push("Coupe :");
  l.push(`- Coupe : ${r.coupe}`);
  l.push(`- Longueur : ${r.longueur}`);
  l.push(`- Manches : ${r.manches}`);
  l.push(`- Col : ${r.col}`);
  l.push(`- Dos : ${r.dos}`);
  if (r.decorations.length) {
    l.push("");
    l.push(`Décorations : ${r.decorations.join(", ")}`);
    if (r.emplacements.length) l.push(`Emplacements : ${r.emplacements.join(", ")}`);
    if (r.notesDecorations) l.push(`Détails déco : ${r.notesDecorations}`);
  }
  l.push("");
  l.push("Mensurations :");
  const mesures = lignesMesuresTexte(r);
  if (mesures.length) l.push(...mesures);
  else l.push("- (à compléter)");
  if (r.tailleHabituelle) l.push(`- Taille habituelle : ${r.tailleHabituelle}`);
  if (r.preferenceCoupe) l.push(`- Préférence de coupe : ${r.preferenceCoupe}`);
  if (r.talons !== undefined) l.push(`- Portée avec talons : ${r.talons ? "oui" : "non"}`);
  if (r.notesMesures) l.push(`- Notes mesures : ${r.notesMesures}`);
  l.push("");
  l.push(`Occasion : ${r.occasion}`);
  if (r.dateEvenement) l.push(`Date de l'événement : ${r.dateEvenement}`);
  if (r.dateSouhaitee) l.push(`Date souhaitée : ${r.dateSouhaitee}`);
  l.push("");
  l.push(
    `Prix estimatif : ${formatDH(r.prix.total)}${r.prix.aConfirmer ? " (à confirmer)" : ""}`
  );
  if (r.prenom || r.nom) l.push(`Cliente : ${[r.prenom, r.nom].filter(Boolean).join(" ")}`);
  if (r.notes) l.push(`Notes : ${r.notes}`);
  l.push("");
  l.push("Merci de me confirmer le prix, le délai et les prochaines étapes.");
  return l.join("\n");
}

/** Construit le lien wa.me avec le message encodé. */
export function lienWhatsApp(numero: string, message: string): string {
  const num = (numero || "").replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

/** Lien WhatsApp prêt à l'emploi à partir d'un résumé. */
export function lienCommande(r: ResumeCommande): string {
  return lienWhatsApp(BOUTIQUE.whatsapp, construireMessageWhatsApp(r));
}
