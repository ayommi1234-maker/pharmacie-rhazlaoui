// node rendu-logo.mjs <nom>  → logo-<nom>.png (420×432, fond transparent)
import { chromium } from "playwright-core";
const nom = process.argv[2];
const navigateur = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-sandbox", "--force-device-scale-factor=1"] });
const page = await navigateur.newPage({ viewport: { width: 420, height: 432 }, deviceScaleFactor: 1 });
await page.goto("http://127.0.0.1:4400/logos.html?logo=" + nom, { waitUntil: "networkidle" });
await page.waitForFunction(() => window.pret === true, null, { timeout: 20000 });
await page.screenshot({ path: `logo-${nom}.png`, omitBackground: true });
await navigateur.close();
console.log(`logo-${nom}.png`);
