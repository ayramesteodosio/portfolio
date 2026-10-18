"use client";

import type { MouseEvent } from "react";
import { localeHref, translateHash } from "@/content/i18n";
import type { Locale } from "@/content/types";
import { segGroup, segItem } from "./seg";

const options: { locale: Locale; code: string; lang: string }[] = [
  { locale: "pt", code: "PT", lang: "pt-BR" },
  { locale: "en", code: "EN", lang: "en" },
];

export function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  function go(event: MouseEvent<HTMLAnchorElement>, target: Locale) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.location.assign(localeHref(target) + translateHash(window.location.hash, locale, target));
  }

  return (
    <div role="group" aria-label={label} className={segGroup}>
      {options.map((option) =>
        option.locale === locale ? (
          <span key={option.locale} aria-current="true" lang={option.lang} className={segItem}>
            {option.code}
          </span>
        ) : (
          <a
            key={option.locale}
            href={localeHref(option.locale)}
            hrefLang={option.lang}
            lang={option.lang}
            onClick={(event) => go(event, option.locale)}
            className={segItem}
          >
            {option.code}
          </a>
        ),
      )}
    </div>
  );
}
