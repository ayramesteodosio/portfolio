import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { getDictionary, isLocale } from "@/content/i18n";

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
        <Hero dict={dict} />
        <About dict={dict} />
        <Experience dict={dict} />
        <Projects dict={dict} locale={locale} />
        <Stack dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
