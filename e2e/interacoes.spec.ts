import { expect, test } from "@playwright/test";

test("LEC continua depois de recarregar, sem piscar o azul", async ({ page }) => {
  await page.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => {
      (window as unknown as { teamAtDcl?: string }).teamAtDcl = document.documentElement.dataset.team;
    });
  });
  await page.goto("/pt/");
  await page.getByRole("button", { name: "LEC" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-team", "lec");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-team", "lec");
  expect(await page.evaluate(() => (window as unknown as { teamAtDcl?: string }).teamAtDcl)).toBe("lec");
  await expect(page.getByRole("button", { name: "LEC" })).toHaveAttribute("aria-pressed", "true");
});

test("trocar o idioma mantém a seção", async ({ page }) => {
  await page.goto("/pt/#projetos");
  await page.getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en\/#projects$/);
});

test("linha do Painel do DualSense abre e fecha", async ({ page }) => {
  await page.goto("/pt/");
  const row = page.getByRole("button", { name: /Painel do DualSense/ });
  const image = page.getByRole("img", { name: /Aba Controle do Painel do DualSense/ });
  await expect(image).not.toBeInViewport();
  await row.click();
  await expect(row).toHaveAttribute("aria-expanded", "true");
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();
  await row.click();
  await expect(row).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#d-dualsense > div")).toHaveCSS("min-height", "0px");
  await expect.poll(() => page.locator("#d-dualsense").evaluate((el) => el.getBoundingClientRect().height)).toBe(0);
});

test("copiar o e-mail coloca o endereço na área de transferência", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/pt/");
  await page.getByRole("button", { name: "Copiar" }).click();
  await expect(page.getByRole("status")).toHaveText("E-mail copiado");
  await expect(page.getByRole("button", { name: "Copiado" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("ayrames.teodosio@hotmail.com");
});

test("sem Clipboard API, copiar mantém o foco no botão", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "clipboard", { get: () => undefined, configurable: true });
  });
  await page.goto("/pt/");
  await page.getByRole("button", { name: "Copiar" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText("E-mail copiado");
  await expect(page.getByRole("button", { name: "Copiado" })).toBeFocused();
});

test("seções na ordem certa, com a Experiência entre Sobre e Projetos", async ({ page }) => {
  await page.goto("/pt/");
  const ids = await page.locator("main > section").evaluateAll((sections) => sections.map((s) => s.id));
  expect(ids).toEqual(["inicio", "sobre", "experiencia", "projetos", "stack", "contato"]);
  await page.getByRole("navigation").getByRole("link", { name: "Experiência" }).click();
  await expect(page).toHaveURL(/#experiencia$/);
  await expect(page.getByRole("heading", { level: 2, name: "Experiência" })).toBeInViewport();
});
