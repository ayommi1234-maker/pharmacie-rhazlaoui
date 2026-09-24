import { chromium } from "playwright-core";
const nav = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-sandbox"] });
for (const [nom, w, h] of [["mobile 390px", 390, 780], ["large 1280px", 1280, 900]]) {
  const page = await nav.newPage({ viewport: { width: w, height: h } });
  const distants = new Set(), echecs = [];
  page.on("request", (r) => { const u = new URL(r.url()); if (!u.hostname.startsWith("127.0.0.1")) distants.add(u.origin); });
  page.on("response", (r) => { if (r.status() >= 400) echecs.push(`${r.status()} ${r.url()}`); });
  const erreurs = [];
  page.on("pageerror", (e) => erreurs.push(String(e).slice(0, 120)));
  await page.goto("http://127.0.0.1:8123/index.html", { waitUntil: "load" });
  await page.waitForTimeout(3500);
  const m = await page.evaluate(() => {
    const img = document.querySelector(".nav-logo-img");
    const ico = document.querySelector('link[rel="icon"][sizes="32x32"]');
    return {
      logoSrc: img?.getAttribute("src") || null,
      logoCharge: img ? (img.naturalWidth > 0) : false,
      logoAffiche: img ? Math.round(img.getBoundingClientRect().width) : 0,
      favicon: ico?.getAttribute("href") || null,
      debordement: document.documentElement.scrollWidth > window.innerWidth + 1,
      largeurDoc: document.documentElement.scrollWidth,
    };
  });
  console.log(`\n--- ${nom} ---`);
  console.log("logo nav        :", m.logoSrc, "| charge:", m.logoCharge, "| affiche:", m.logoAffiche + "px");
  console.log("favicon 32      :", m.favicon);
  console.log("debordement lat.:", m.debordement ? `OUI (doc ${m.largeurDoc}px > ${w}px)` : "non");
  console.log("requetes 4xx/5xx:", echecs.length ? echecs.slice(0,5) : "aucune");
  console.log("erreurs JS      :", erreurs.length ? erreurs.slice(0,3) : "aucune");
  console.log("origines distantes :", [...distants].join(", ") || "aucune");
  await page.close();
}
await nav.close();
