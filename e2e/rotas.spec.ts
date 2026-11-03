import AxeBuilder from "@axe-core/playwright";
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

test("endereço inexistente mostra a página 404 do site", async ({ page }) => {
  const response = await page.goto("/nao-existe/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("link", { name: "Português" })).toHaveAttribute("href", /\/pt\/$/);
  await expect(page.getByRole("link", { name: "English" })).toHaveAttribute("href", /\/en\/$/);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});

test("a raiz tem prévia de compartilhamento e links para os dois idiomas", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).toMatch(/<meta property="og:image" content="[^"]*\/og\.png"/);
  expect(html).toMatch(/<meta property="og:description" content="[^"]+"/);
  expect(html).toMatch(/<meta name="twitter:card" content="summary_large_image"/);
  expect(html).toMatch(/<meta name="robots" content="noindex/);
  expect(html).toMatch(/<a href="\/pt\/"/);
  expect(html).toMatch(/<a href="\/en\/"/);
});

for (const [locale, expected] of [
  ["en-US", /\/en\/$/],
  ["pt-BR", /\/pt\/$/],
  ["es-ES", /\/pt\/$/],
] as const) {
  test(`raiz redireciona ${locale} sem esperar o JavaScript do Next`, async ({ browser }) => {
    const context = await browser.newContext({ locale });
    await context.route("**/_next/static/chunks/**", (route) => route.abort());
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(expected);
    await context.close();
  });
}
