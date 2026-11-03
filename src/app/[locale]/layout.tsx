import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/content/i18n";
import { fontVariables } from "@/lib/fonts";
import { shareMetadata } from "@/lib/metadata";
import { teamBootstrapScript } from "@/lib/team";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    ...shareMetadata(getDictionary(locale), `/${locale}/`),
    alternates: {
      canonical: `/${locale}/`,
      languages: { "pt-BR": "/pt/", en: "/en/" },
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return (
    <html lang={dict.htmlLang} data-team="ver" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: teamBootstrapScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
