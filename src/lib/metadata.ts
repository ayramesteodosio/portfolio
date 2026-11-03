import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Dictionary } from "@/content/types";

export function shareMetadata(dict: Dictionary, path: string): Metadata {
  return {
    metadataBase: new URL(`${site.url}${site.basePath}/`),
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      type: "website",
      title: dict.meta.title,
      description: dict.meta.description,
      url: path,
      siteName: site.name,
      locale: dict.htmlLang === "en" ? "en_US" : "pt_BR",
      images: [{ url: "og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["og.png"],
    },
  };
}
