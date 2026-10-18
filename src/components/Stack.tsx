import { site } from "@/content/site";
import type { Dictionary } from "@/content/types";
import { monoLabel, secTitle } from "./styles";

const item =
  "stretch-wide flex items-baseline gap-[18px] border-b border-border py-3 font-display leading-[1.1] tracking-[-0.02em] last:border-b-0";
const number = "w-[22px] flex-none font-mono text-[13px] leading-none font-medium tracking-normal text-muted";

export function Stack({ dict }: { dict: Dictionary }) {
  const { stack, sections } = dict;
  const titleId = `${sections.stack.id}-titulo`;
  const offset = site.stack.daily.length;
  return (
    <section id={sections.stack.id} aria-labelledby={titleId} className="sec">
      <div className="wrap">
        <h2 id={titleId} className={secTitle}>
          {sections.stack.title}
        </h2>
        <div className="mt-11 grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 border-t border-rule-strong max-[860px]:grid-cols-1 max-[860px]:gap-0">
          <div className="pt-5">
            <p className={`${monoLabel} mt-0 mb-[18px]`}>{stack.daily}</p>
            <ul className="m-0 list-none p-0">
              {site.stack.daily.map((tech, index) => (
                <li key={tech} className={`${item} text-[clamp(32px,4vw,56px)] font-[620]`}>
                  <span aria-hidden="true" className={number}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l border-border pt-5 pl-12 max-[860px]:mt-5 max-[860px]:border-t max-[860px]:border-l-0 max-[860px]:border-rule max-[860px]:pl-0">
            <p className={`${monoLabel} mt-0 mb-[18px]`}>{stack.also}</p>
            <ul className="m-0 list-none p-0">
              {site.stack.also.map((tech, index) => (
                <li key={tech} className={`${item} text-[clamp(22px,2.1vw,30px)] font-[520]`}>
                  <span aria-hidden="true" className={number}>
                    {String(offset + index + 1).padStart(2, "0")}
                  </span>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
