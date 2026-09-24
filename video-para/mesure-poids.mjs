// Mesure le poids reellement telecharge par la page, par ressource locale.
import { chromium } from "playwright-core";
const nav = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-sandbox"] });
const page = await nav.newPage({ viewport: { width: 390, height: 780 } });
const poids = new Map();
page.on("response", async (r) => {
  const u = r.url();
  if (!u.includes("127.0.0.1")) return;
  try { const b = await r.body(); poids.set(u.split("/").pop(), b.length); } catch {}
});
await page.goto("http://127.0.0.1:8123/index.html", { waitUntil: "load" });
await page.waitForTimeout(3000);
const marques = [...poids.entries()].filter(([n]) => n.includes("lapara-marque"));
console.log("Images de marque reellement telechargees :");
marques.forEach(([n, o]) => console.log(`  ${n.padEnd(28)} ${(o/1024).toFixed(1)} Ko`));
console.log(`  TOTAL : ${(marques.reduce((a,[,o])=>a+o,0)/1024).toFixed(1)} Ko`);
await nav.close();
