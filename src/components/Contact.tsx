import { site } from "@/content/site";
import type { Dictionary } from "@/content/types";
import { CopyEmailButton } from "./CopyEmailButton";
import { monoLabel, secTitle } from "./styles";

const links = [
  { key: "GitHub", ...site.github },
  { key: "LinkedIn", ...site.linkedin },
];

export function Contact({ dict }: { dict: Dictionary }) {
  const { contact, sections } = dict;
  const titleId = `${sections.contact.id}-titulo`;
  return (
    <section id={sections.contact.id} aria-labelledby={titleId} className="sec">
      <div className="wrap">
        <h2 id={titleId} className={secTitle}>
          {sections.contact.title}
        </h2>
        <p className="mt-[18px] mb-10 max-w-[46ch] text-[19px] text-muted">{contact.lead}</p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4 border-b border-rule-strong pb-9">
          <a
            href={`mailto:${site.email}`}
            className="stretch-wide bg-[linear-gradient(currentColor,currentColor)] bg-size-[0_3px] bg-left-bottom bg-no-repeat pb-1.5 font-display text-[clamp(14px,4.4vw,64px)] leading-[1.05] font-[640] tracking-[-0.035em] wrap-anywhere no-underline transition-[background-size] duration-300 ease-telemetry hover:bg-size-[100%_3px]"
          >
            {site.email}
          </a>
          <CopyEmailButton email={site.email} labels={contact} />
        </div>
        <ul className="m-0 grid list-none grid-cols-2 p-0 max-[860px]:grid-cols-1">
          {links.map((link) => (
            <li
              key={link.key}
              className="not-first:border-l not-first:border-border max-[860px]:not-first:border-t max-[860px]:not-first:border-l-0"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener"
                className="group grid grid-cols-[120px_minmax(0,1fr)_auto] items-center gap-4 px-5 py-6 no-underline transition-colors duration-150 ease-telemetry hover:bg-surface max-[860px]:grid-cols-[minmax(0,1fr)_auto] max-[860px]:px-0 max-[860px]:py-5"
              >
                <span className={`${monoLabel} max-[860px]:col-span-full`}>{link.key}</span>
                <span className="text-lg font-medium wrap-anywhere">{link.label}</span>
                <span
                  aria-hidden="true"
                  className="font-mono transition-transform duration-200 ease-telemetry group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
