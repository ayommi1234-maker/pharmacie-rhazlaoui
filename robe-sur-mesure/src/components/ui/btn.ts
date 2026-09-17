/** Helper de classes de bouton — module NEUTRE (utilisable côté serveur ET client). */
export type Variante = "primary" | "secondary" | "ghost" | "danger";

export function btn(variante: Variante = "primary", extra = ""): string {
  const base =
    "inline-flex items-center justify-center gap-5 px-6 py-3 text-sm font-bold min-h-[52px] transition-all focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  const styles: Record<Variante, string> = {
    primary: "bg-encre text-creme hover:bg-bordeaux hover:-translate-y-0.5",
    secondary: "bg-transparent text-encre border border-encre hover:bg-encre hover:text-creme",
    ghost: "bg-transparent text-encre hover:bg-encre/5",
    danger: "bg-transparent text-bordeaux border border-bordeaux/40 hover:bg-bordeaux/10",
  };
  return `${base} ${styles[variante]} ${extra}`;
}
