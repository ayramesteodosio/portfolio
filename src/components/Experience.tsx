import { experience } from "@/content/experience";
import type { Dictionary } from "@/content/types";
import { chip, monoLabel, secTitle } from "./styles";

export function Experience({ dict }: { dict: Dictionary }) {
  const { experience: text, sections } = dict;
  const titleId = `${sections.experience.id}-titulo`;
  return (
    <section id={sections.experience.id} aria-labelledby={titleId} className="sec">
      <div className="wrap grid grid-cols-[280px_minmax(0,1fr)] gap-12 max-[860px]:grid-cols-1 max-[860px]:gap-7">
        <h2 id={titleId} className={`${secTitle} sticky top-[104px] self-start max-[860px]:static`}>
          {sections.experience.title}
        </h2>
        <div>
          <p className={`${monoLabel} m-0`}>{text.period}</p>
          <h3 className="stretch-wide mt-3 mb-0 font-display text-[clamp(28px,2.6vw,38px)] leading-[1.1] font-[640] tracking-[-0.02em]">
            {text.company}
          </h3>
          <p className="mt-1.5 mb-0 text-lg leading-[1.4] font-medium text-muted">{text.role}</p>
          <p className="mt-7 mb-[44px] max-w-[36em] text-[clamp(19px,1.6vw,22px)] leading-[1.5] tracking-[-0.005em]">
            {text.lead}
          </p>
          <dl className="m-0 grid grid-cols-4 border-t border-rule-strong max-[1100px]:grid-cols-2 max-[860px]:grid-cols-1">
            {text.facts.map((fact) => (
              <div
                key={fact.term}
                className="pt-[18px] pr-6 not-first:border-l not-first:border-border not-first:pl-6 max-[1100px]:pb-4 max-[1100px]:[&:nth-child(3)]:border-l-0 max-[1100px]:[&:nth-child(3)]:pl-0 max-[860px]:border-b max-[860px]:border-border max-[860px]:px-0 max-[860px]:py-4 max-[860px]:not-first:border-l-0 max-[860px]:not-first:pl-0"
              >
                <dt className={monoLabel}>{fact.term}</dt>
                <dd className="mt-2 mb-0 ml-0 font-display text-[26px] leading-[1.2] font-[620] tabular-nums">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <ol className="mt-12 mb-0 list-none border-t border-rule-strong p-0">
            {experience.items.map((item, index) => {
              const itemText = text.items[item.slug];
              return (
                <li
                  key={item.slug}
                  className="grid grid-cols-[44px_minmax(0,1fr)_auto] gap-x-5 gap-y-2 border-b border-border py-6 [grid-template-areas:'pos_body_period'] max-[860px]:grid-cols-[34px_minmax(0,1fr)] max-[860px]:gap-x-3 max-[860px]:[grid-template-areas:'pos_period'_'._body']"
                >
                  <span className="pt-1 font-mono text-[15px] leading-none font-semibold text-muted tabular-nums [grid-area:pos]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="[grid-area:body]">
                    <h4 className="stretch-wide m-0 font-display text-[clamp(19px,1.6vw,22px)] leading-[1.25] font-[620] tracking-[-0.01em]">
                      {itemText.name}
                    </h4>
                    <p className="mt-2 mb-0 max-w-[62ch] leading-[1.55] text-muted">{itemText.text}</p>
                    <p className="mt-3.5 mb-0 flex flex-wrap gap-1.5">
                      {item.stack.map((tag) => (
                        <span key={tag} className={chip}>
                          {tag}
                        </span>
                      ))}
                    </p>
                  </div>
                  <p className="m-0 pt-1 font-mono text-xs leading-[1.4] font-medium whitespace-nowrap text-muted tabular-nums [grid-area:period]">
                    {itemText.period}
                  </p>
                </li>
              );
            })}
          </ol>
          <p className="mt-[44px] mb-0 max-w-[62ch] border-t border-border pt-[22px] text-muted">
            <strong className="font-semibold text-fg">{text.practicesLabel}</strong> {text.practices}
          </p>
        </div>
      </div>
    </section>
  );
}
