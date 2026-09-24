import { chromium } from "playwright-core";
const nav = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-sandbox"] });
for (const page_url of ["index.html", "index-avant.html"]) {
  const page = await nav.newPage({ viewport: { width: 390, height: 780 } });
  await page.goto("http://127.0.0.1:8123/" + page_url, { waitUntil: "load" });
  await page.waitForTimeout(3000);
  const r = await page.evaluate(() => {
    const vw = window.innerWidth, out = [];
    document.querySelectorAll("*").forEach((el) => {
      const b = el.getBoundingClientRect();
      if (b.width > 0 && b.right > vw + 1) {
        out.push({ tag: el.tagName.toLowerCase(), cls: (el.className && el.className.toString().slice(0, 40)) || "", id: el.id || "",
                   right: Math.round(b.right), w: Math.round(b.width) });
      }
    });
    return { docW: document.documentElement.scrollWidth, vw, coupables: out.slice(0, 8) };
  });
  console.log(`\n=== ${page_url} : doc ${r.docW}px pour ${r.vw}px de fenetre ===`);
  r.coupables.forEach((c) => console.log(`  <${c.tag}> .${c.cls}${c.id ? " #" + c.id : ""}  droite=${c.right}px largeur=${c.w}px`));
  if (!r.coupables.length) console.log("  aucun element ne depasse");
  await page.close();
}
await nav.close();
