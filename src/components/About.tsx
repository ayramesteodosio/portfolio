import type { Dictionary } from "@/content/types";
import { secTitle } from "./styles";

export function About({ dict }: { dict: Dictionary }) {
  const { about, sections } = dict;
  const titleId = `${sections.about.id}-titulo`;
  return (
    <section id={sections.about.id} aria-labelledby={titleId} className="sec">
      <div className="wrap grid grid-cols-[280px_minmax(0,1fr)] gap-12 max-[860px]:grid-cols-1 max-[860px]:gap-7">
        <h2 id={titleId} className={`${secTitle} sticky top-[104px] self-start max-[860px]:static`}>
          {sections.about.title}
        </h2>
        <div>
          <p className="mt-0 mb-[52px] max-w-[34em] text-[clamp(22px,2.05vw,29px)] leading-[1.42] tracking-[-0.01em]">
            {about.lead}
          </p>
          <dl className="m-0 grid grid-cols-3 border-t border-rule-strong max-[860px]:grid-cols-1">
            {about.facts.map((fact) => (
              <div
                key={fact.term}
                className="pt-[18px] pr-6 not-first:border-l not-first:border-border not-first:pl-6 max-[860px]:border-b max-[860px]:border-border max-[860px]:px-0 max-[860px]:py-4 max-[860px]:not-first:border-l-0 max-[860px]:not-first:pl-0"
              >
                <dt className="font-mono text-xs leading-[1.4] font-medium tracking-[0.08em] text-muted uppercase">
                  {fact.term}
                </dt>
                <dd className="mt-2 mb-0 ml-0 text-lg leading-[1.4] font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-[52px] mb-0 max-w-[62ch] border-t border-border pt-[22px] text-muted">
            <strong className="font-semibold text-fg">{about.offTrackLabel}</strong> {about.offTrack}
          </p>
        </div>
      </div>
    </section>
  );
}
