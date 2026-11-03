import { en } from "./en";
import { pt } from "./pt";
import { site } from "./site";
import type { Dictionary, Locale, SectionKey } from "./types";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export const locales: readonly Locale[] = ["pt", "en"];
export const defaultLocale: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function pickLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const base = language.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function localeHref(locale: Locale, basePath: string = site.basePath): string {
  return `${basePath}/${locale}/`;
}

export function translateHash(hash: string, from: Locale, to: Locale): string {
  const id = hash.replace(/^#/, "");
  if (!id) return "";
  const sections = dictionaries[from].sections;
  const key = (Object.keys(sections) as SectionKey[]).find((k) => sections[k].id === id);
  return key ? `#${dictionaries[to].sections[key].id}` : "";
}

export function localeRedirectScript(basePath: string = site.basePath): string {
  const hrefs = JSON.stringify(Object.fromEntries(locales.map((locale) => [locale, localeHref(locale, basePath)])));
  return `(function(){var h=${hrefs},l=navigator.languages||[navigator.language||""];for(var i=0;i<l.length;i++){var b=String(l[i]).toLowerCase().split("-")[0];if(Object.prototype.hasOwnProperty.call(h,b)){location.replace(h[b]);return}}location.replace(h.${defaultLocale})})()`;
}
