import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { getDictionary, isLocale } from "@/content/i18n";
import { site } from "@/content/site";

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return (
    <>
      <a
        href="#conteudo"
        className="absolute -top-20 left-4 z-50 bg-fg px-4 py-3 font-semibold text-bg no-underline focus:top-3"
      >
        {dict.skipLink}
      </a>
      <Header dict={dict} locale={locale} />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <h1>{site.name}</h1>
      </main>
    </>
  );
}
