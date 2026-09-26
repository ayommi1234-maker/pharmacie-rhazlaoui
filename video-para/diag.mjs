import { chromium } from "playwright-core";
const nav = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-sandbox"] });
const page = await nav.newPage({ viewport: { width: 420, height: 432 } });
page.on("pageerror", (e) => console.log("ERREUR PAGE:", String(e)));
page.on("console", (m) => { if (m.type() === "error") console.log("CONSOLE:", m.text()); });
await page.goto("http://127.0.0.1:4400/logos.html?logo=" + process.argv[2], { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
console.log("pret =", await page.evaluate(() => window.pret), "| erreur =", await page.evaluate(() => window.erreur));
await nav.close();
