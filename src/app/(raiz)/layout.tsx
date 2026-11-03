import type { Metadata } from "next";
import { localeRedirectScript } from "@/content/i18n";
import { pt } from "@/content/pt";
import { shareMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata: Metadata = {
  ...shareMetadata(pt, "/"),
  robots: { index: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeRedirectScript() }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
