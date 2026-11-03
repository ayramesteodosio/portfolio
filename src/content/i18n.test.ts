import { expect, test, vi } from "vitest";
import { isLocale, localeHref, localeRedirectScript, pickLocale, translateHash } from "./i18n";

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
  expect(translateHash("#experiencia", "pt", "en")).toBe("#experience");
  expect(translateHash("#xyz", "pt", "en")).toBe("");
  expect(translateHash("", "pt", "en")).toBe("");
});

test("isLocale", () => {
  expect(isLocale("pt")).toBe(true);
  expect(isLocale("fr")).toBe(false);
});

test.each([
  [["pt-BR"], "/portfolio/pt/"],
  [["en-US", "pt-BR"], "/portfolio/en/"],
  [["es-ES", "EN"], "/portfolio/en/"],
  [["fr"], "/portfolio/pt/"],
  [undefined, "/portfolio/pt/"],
])("script de redirecionamento com %j vai para %s", (languages, expected) => {
  const replace = vi.fn();
  new Function("navigator", "location", localeRedirectScript("/portfolio"))({ languages, language: languages?.[0] }, { replace });
  expect(replace).toHaveBeenCalledExactlyOnceWith(expected);
});
