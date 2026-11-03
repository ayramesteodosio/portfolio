import { localeHref } from "@/content/i18n";

export default function Page() {
  return (
    <main className="grid min-h-dvh place-content-center gap-4 text-center">
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${localeHref("pt")}`} />
      </noscript>
      <p className="flex gap-6 font-mono text-sm">
        <a href={localeHref("pt")} lang="pt-BR">
          Português
        </a>
        <a href={localeHref("en")} lang="en">
          English
        </a>
      </p>
    </main>
  );
}
