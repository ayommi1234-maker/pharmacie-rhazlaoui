/**
 * Rendu image par image de scene.html.
 * Le navigateur ne « joue » pas l'animation : on appelle window.poser(t) pour
 * chaque image, donc aucune image n'est sautée ni dupliquée, quelle que soit
 * la vitesse de la machine.
 *
 *   node rendu.mjs [dossier_sortie] [fps] [duree]
 */
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const SORTIE = process.argv[2] ?? "images";
const FPS    = Number(process.argv[3] ?? 30);
const DUREE  = Number(process.argv[4] ?? 10);
const TOTAL  = Math.round(FPS * DUREE);
const CALQUE = process.argv[5] === "calque";   // superposition transparente
const COTE   = Number(process.argv[6] ?? 1080); // côté de sortie (960 pour coller à la source)

await mkdir(SORTIE, { recursive: true });

const nav = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});
const page = await nav.newPage({ viewport: { width: COTE, height: COTE } });
const erreurs = [];
page.on("pageerror", (e) => erreurs.push(String(e)));

await page.goto("http://127.0.0.1:4400/scene.html" + (CALQUE ? "?calque=1" : ""), { waitUntil: "networkidle" });
if (COTE !== 1080) {
  // La scène est dessinée en 1080 : on la réduit à l'échelle demandée.
  await page.addStyleTag({ content: `#scene{transform:scale(${COTE / 1080});transform-origin:0 0} html,body{width:${COTE}px;height:${COTE}px}` });
}
await page.waitForTimeout(400);   // laisse les polices se poser avant la mesure

const t0 = Date.now();
for (let i = 0; i < TOTAL; i++) {
  const t = i / FPS;
  await page.evaluate((tt) => window.poser(tt), t);
  await page.screenshot({
    path: `${SORTIE}/img-${String(i).padStart(4, "0")}.png`,
    animations: "disabled",
    omitBackground: CALQUE,   // PNG avec transparence
  });
  if (i % 50 === 0) {
    const ecoule = (Date.now() - t0) / 1000;
    console.log(`  ${i}/${TOTAL} images — ${ecoule.toFixed(0)} s`);
  }
}

await nav.close();
console.log(erreurs.length ? "ERREURS JS : " + erreurs.join(" | ") : "aucune erreur JS");
console.log(`${TOTAL} images rendues en ${((Date.now() - t0) / 1000).toFixed(0)} s`);
