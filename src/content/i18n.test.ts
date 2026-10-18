import { expect, test } from "vitest";
import { isLocale, localeHref, pickLocale, translateHash } from "./i18n";

test.each([
  [["pt-BR"], "pt"],
  [["PT-pt"], "pt"],
  [["en-US", "pt-BR"], "en"],
  [["es-ES", "en"], "en"],
  [["es"], "pt"],
  [[], "pt"],
])("pickLocale(%j) = %s", (langs, expected) => {
  expect(pickLocale(langs)).toBe(expected);
});

test("localeHref", () => {
  expect(localeHref("en", "")).toBe("/en/");
  expect(localeHref("pt", "/portfolio")).toBe("/portfolio/pt/");
});

test("translateHash", () => {
  expect(translateHash("#projetos", "pt", "en")).toBe("#projects");
  expect(translateHash("#inicio", "pt", "en")).toBe("#top");
  expect(translateHash("#contact", "en", "pt")).toBe("#contato");
  expect(translateHash("#xyz", "pt", "en")).toBe("");
  expect(translateHash("", "pt", "en")).toBe("");
});

test("isLocale", () => {
  expect(isLocale("pt")).toBe(true);
  expect(isLocale("fr")).toBe(false);
});
