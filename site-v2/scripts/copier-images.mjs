/**
 * Copie les images du site historique (`../images`) dans la sortie du build (`out/images`).
 *
 * Pourquoi pas `public/images` ? Pour ne PAS dupliquer 65 Mo de photos dans le dépôt.
 * Les images restent à un seul endroit : `images/` à la racine. Ce script les place
 * dans le dossier publié au moment du build.
 *
 * Usage : `node scripts/copier-images.mjs [destination]` (destination par défaut : `out`).
 */

import { cp, mkdir, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ici = dirname(fileURLToPath(import.meta.url));
const racineProjet = resolve(ici, "..");
const racineDepot = resolve(racineProjet, "..");

const destination = resolve(racineProjet, process.argv[2] ?? "out");
const source = join(racineDepot, "images");

async function existe(chemin) {
  try {
    await stat(chemin);
    return true;
  } catch {
    return false;
  }
}

if (!(await existe(source))) {
  console.error(`✗ Dossier introuvable : ${source}`);
  process.exit(1);
}

await mkdir(destination, { recursive: true });
await cp(source, join(destination, "images"), { recursive: true });

console.log(`✓ Images copiées vers ${join(destination, "images")}`);
