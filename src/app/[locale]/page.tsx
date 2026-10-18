import { notFound } from "next/navigation";
import { isLocale } from "@/content/i18n";
import { site } from "@/content/site";

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <main id="conteudo">
      <h1>{site.name}</h1>
    </main>
  );
}
