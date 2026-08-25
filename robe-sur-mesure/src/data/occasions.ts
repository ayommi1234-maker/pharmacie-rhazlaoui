/** Occasions (étape 6). */
export const OCCASIONS: { id: string; nom: string }[] = [
  { id: "quotidien", nom: "Quotidien" },
  { id: "travail", nom: "Travail" },
  { id: "fete", nom: "Fête" },
  { id: "mariage", nom: "Mariage" },
  { id: "fiancailles", nom: "Fiançailles" },
  { id: "ceremonie", nom: "Cérémonie" },
  { id: "autre", nom: "Autre" },
];

export function occasionParId(id?: string): string {
  return OCCASIONS.find((o) => o.id === id)?.nom ?? "—";
}

