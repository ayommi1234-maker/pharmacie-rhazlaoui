// node rendu-logo.mjs <nom>  → logo-<nom>.png (420×432, fond transparent)
import { chromium } from "playwright-core";
const nom = process.argv[2];
const T = Number(process.argv[3] || 0);   // taille carrée optionnelle
const navigateur = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-sandbox", "--force-device-scale-factor=1"] });
const page = await navigateur.newPage({ viewport: { width: T || 420, height: T || 432 }, deviceScaleFactor: 1 });
await page.goto("http://127.0.0.1:4400/logos.html?logo=" + nom + (T ? "&taille=" + T : ""), { waitUntil: "networkidle" });
await page.waitForFunction(() => window.pret === true, null, { timeout: 20000 });
await page.screenshot({ path: T ? `logo-${nom}-${T}.png` : `logo-${nom}.png`, omitBackground: true });
await navigateur.close();
console.log(T ? `logo-${nom}-${T}.png` : `logo-${nom}.png`);
