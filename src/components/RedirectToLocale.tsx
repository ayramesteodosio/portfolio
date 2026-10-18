"use client";

import { useEffect } from "react";
import { localeHref, pickLocale } from "@/content/i18n";

export function RedirectToLocale() {
  useEffect(() => {
    window.location.replace(localeHref(pickLocale(navigator.languages)));
  }, []);
  return null;
}
