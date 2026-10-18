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
