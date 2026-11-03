import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const card = new URL("./card.html", import.meta.url);
const output = fileURLToPath(new URL("../../public/og.png", import.meta.url));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(card.href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: output, type: "png" });
await browser.close();
console.log(output);
