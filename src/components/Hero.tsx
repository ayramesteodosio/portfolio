import Image from "next/image";
import { site } from "@/content/site";
import type { Dictionary } from "@/content/types";
import { btn, btnGhost, btnPrimary } from "./styles";

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero, sections } = dict;
  const [first, ...rest] = site.name.split(" ");
  return (
    <section id={sections.top.id} aria-labelledby="hero-nome" className="pt-[clamp(48px,8vh,92px)]">
      <div className="wrap grid grid-cols-[minmax(0,1fr)_360px] items-end gap-[clamp(40px,6vw,96px)] pb-16 max-[860px]:grid-cols-1">
        <div>
          <p className="m-0 flex flex-wrap items-center gap-x-4 gap-y-2.5 font-mono text-[13px] leading-[1.4] font-medium tracking-[0.03em] text-muted">
            <span className="inline-flex items-center gap-2.5 text-fg before:size-2 before:flex-none before:animate-[blink_1.6s_var(--ease)_3] before:bg-s-green before:content-['']">
              {hero.status}
            </span>
            <span aria-hidden="true" className="h-3.5 w-px bg-rule" />
            <span>{hero.location}</span>
          </p>
          <h1
            id="hero-nome"
            className="stretch-wide my-[30px] font-display text-[clamp(46px,7.3vw,108px)] leading-[0.98] font-[640] tracking-[-0.028em] max-[520px]:[font-stretch:112%]"
          >
            <span className="block">{first}</span> <span className="block">{rest.join(" ")}</span>
          </h1>
          <p className="m-0 max-w-[36ch] text-[clamp(19px,1.65vw,23px)] leading-[1.45] text-muted">
            <strong className="block font-semibold text-fg">{hero.role}</strong>
            <span>{hero.tagline}</span>
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`#${sections.projects.id}`} className={`${btn} ${btnPrimary}`}>
              {hero.ctaProjects}
              <span
                aria-hidden="true"
                className="font-mono font-medium transition-transform duration-200 ease-telemetry group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
            <a href={`#${sections.contact.id}`} className={`${btn} ${btnGhost}`}>
              {hero.ctaContact}
            </a>
          </div>
        </div>
        <figure className="portrait-ruler relative m-0 pb-5 pl-5 max-[860px]:max-w-[280px]">
          <Image
            src={site.portrait.src}
            width={site.portrait.width}
            height={site.portrait.height}
            alt={hero.portraitAlt}
            priority
            sizes="(max-width: 860px) 280px, 360px"
            className="block aspect-square h-auto w-full"
          />
        </figure>
      </div>
      <div aria-hidden="true" className="ruler">
        <span className="ruler-mark" />
      </div>
    </section>
  );
}
