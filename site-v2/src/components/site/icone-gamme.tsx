import {
  Baby,
  Bone,
  Droplets,
  Flower2,
  Heart,
  HeartPulse,
  Leaf,
  PackageOpen,
  PersonStanding,
  Pill,
  Sprout,
  Star,
  Tablets,
  type LucideIcon,
} from "lucide-react";

/**
 * Les gammes de `js/products-data.js` portent une classe Font Awesome (ancien site).
 * On la traduit en icône lucide plutôt que d'ajouter une police d'icônes externe
 * — moins de poids, aucune origine supplémentaire à autoriser dans la CSP.
 */
const CORRESPONDANCE: Record<string, LucideIcon> = {
  "fa-leaf": Leaf,
  "fa-capsules": Pill,
  "fa-heart": Heart,
  "fa-pills": Tablets,
  "fa-seedling": Sprout,
  "fa-box-open": PackageOpen,
  "fa-spa": Flower2,
  "fa-heartbeat": HeartPulse,
  "fa-bone": Bone,
  "fa-baby": Baby,
  "fa-female": PersonStanding,
  "fa-pump-medical": Droplets,
  "fa-star": Star,
};

export function IconeGamme({ icon, className }: { icon: string; className?: string }) {
  const cle = Object.keys(CORRESPONDANCE).find((k) => (icon ?? "").includes(k));
  const Icone = cle ? CORRESPONDANCE[cle] : Star;
  return <Icone className={className} aria-hidden="true" />;
}
