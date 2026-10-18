import { expect, test } from "@playwright/test";
import { en } from "../src/content/en";
import { pt } from "../src/content/pt";

test("/pt/ em português com links para o outro idioma", async ({ page }) => {
  await page.goto("/pt/");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator("html")).toHaveAttribute("data-team", "ver");
  await expect(page).toHaveTitle(pt.meta.title);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en\/$/);
  await expect(page.locator('link[rel="alternate"][hreflang="pt-BR"]')).toHaveAttribute("href", /\/pt\/$/);
});

test("/en/ em inglês", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle(en.meta.title);
});

for (const [locale, expected] of [
  ["en-US", /\/en\/$/],
  ["pt-BR", /\/pt\/$/],
] as const) {
  test(`raiz com navegador em ${locale}`, async ({ browser }) => {
    const context = await browser.newContext({ locale });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(expected);
    await context.close();
  });
}

test("raiz sem JavaScript leva para /pt/", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/pt\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await context.close();
});
