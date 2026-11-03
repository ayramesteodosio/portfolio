import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const locales = ["pt", "en"] as const;

for (const locale of locales) {
  for (const width of [320, 390, 1440, 1920]) {
    test(`/${locale}/ sem rolagem horizontal em ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/`);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBe(0);
    });
  }

  for (const team of ["ver", "lec"] as const) {
    test(`/${locale}/ sem violações de acessibilidade com ${team}`, async ({ page }) => {
      await page.addInitScript((value) => localStorage.setItem("portfolio-equipe", value), team);
      await page.goto(`/${locale}/`);
      await expect(page.locator("html")).toHaveAttribute("data-team", team);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  }
}

test("primeiro Tab foca o link de pular conteúdo", async ({ page }) => {
  await page.goto("/pt/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Pular para o conteúdo" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#conteudo")).toBeFocused();
});

test("em inglês o link de pular conteúdo está traduzido", async ({ page }) => {
  await page.goto("/en/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});

test("movimento reduzido desliga a rolagem suave", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/pt/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  await context.close();
});

test("sem movimento reduzido a rolagem é suave", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "no-preference" });
  const page = await context.newPage();
  await page.goto("/pt/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("smooth");
  await context.close();
});

for (const path of ["/", "/pt/", "/en/"]) {
  test(`${path} carrega sem erros no console nem requisições falhas`, async ({ page }) => {
    const problems: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") problems.push(message.text());
    });
    page.on("response", (response) => {
      if (response.status() >= 400) problems.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    expect(problems).toEqual([]);
  });
}

for (const path of ["/", "/pt/", "/en/"]) {
  test(`${path} declara um ícone que existe`, async ({ page, request }) => {
    await page.goto(path);
    const href = await page.locator('link[rel="icon"]').first().getAttribute("href");
    expect(href).toBeTruthy();
    const response = await request.get(new URL(href!, page.url()).toString());
    expect(response.status()).toBe(200);
  });
}
