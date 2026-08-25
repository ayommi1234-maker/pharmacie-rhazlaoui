/** Helper de classes de bouton — module NEUTRE (utilisable côté serveur ET client). */
export type Variante = "primary" | "secondary" | "ghost" | "danger";

export function btn(variante: Variante = "primary", extra = ""): string {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl2 px-5 py-3 text-base font-semibold min-h-[48px] transition-colors focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  const styles: Record<Variante, string> = {
    primary: "bg-bordeaux text-creme hover:bg-[#651f24]",
    secondary: "bg-transparent text-bordeaux border border-bordeaux hover:bg-bordeaux/10",
    ghost: "bg-transparent text-encre hover:bg-encre/5",
    danger: "bg-transparent text-bordeaux border border-bordeaux/40 hover:bg-bordeaux/10",
  };
  return `${base} ${styles[variante]} ${extra}`;
}
