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

for (const [locale, ogLocale] of [
  ["pt", "pt_BR"],
  ["en", "en_US"],
] as const) {
  test(`/${locale}/ tem imagem de compartilhamento`, async ({ page, request }) => {
    await page.goto(`/${locale}/`);
    const image = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(image).toMatch(/\/og\.png$/);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", ogLocale);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    const response = await request.get(image!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/png");
  });
}
