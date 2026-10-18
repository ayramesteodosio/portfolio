import type { Metadata } from "next";
import { site } from "@/content/site";
import "../globals.css";

export const metadata: Metadata = {
  title: site.name,
  robots: { index: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
