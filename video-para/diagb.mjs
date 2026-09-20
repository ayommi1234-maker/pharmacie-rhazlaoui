import { chromium } from "playwright-core";
const nav = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-sandbox"] });
const page = await nav.newPage({ viewport: { width: 960, height: 960 } });
page.on("pageerror", (e) => console.log("ERREUR:", String(e)));
await page.goto("http://127.0.0.1:4400/bouteille.html", { waitUntil: "networkidle" });
await page.waitForFunction(() => window.pret === true, null, { timeout: 15000 });
for (const t of [1.5, 3.0, 6.0, 9.0]) {
  await page.evaluate((tt) => window.poser(tt), t);
  await page.screenshot({ path: `/tmp/b-${t}.png`, omitBackground: true });
}
await nav.close(); console.log("captures ok");
