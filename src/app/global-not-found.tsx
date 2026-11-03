import type { Metadata } from "next";
import { localeHref } from "@/content/i18n";
import { site } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { teamBootstrapScript } from "@/lib/team";
import "./globals.css";

export const metadata: Metadata = {
  title: `Página não encontrada · ${site.name}`,
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" data-team="ver" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: teamBootstrapScript }} />
      </head>
      <body>
        <main className="grid min-h-dvh place-content-center gap-6 px-6 text-center">
          <p className="m-0 font-mono text-sm tracking-[0.08em] text-muted">404</p>
          <h1 className="stretch-wide m-0 font-display text-[clamp(32px,5vw,56px)] leading-[1.05] font-[640] tracking-[-0.02em]">
            Página não encontrada
          </h1>
          <p lang="en" className="m-0 text-muted">
            Page not found
          </p>
          <p className="m-0 flex justify-center gap-6 font-mono text-sm">
            <a href={localeHref("pt")} lang="pt-BR">
              Português
            </a>
            <a href={localeHref("en")} lang="en">
              English
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
