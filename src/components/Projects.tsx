import { projects } from "@/content/projects";
import type { Dictionary, Locale, StatusKind } from "@/content/types";
import { ProjectRow } from "./ProjectRow";
import { secTitle, square, statusColor } from "./styles";

const legendOrder: StatusKind[] = ["public", "running", "design"];

export function Projects({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { projects: text, sections } = dict;
  const titleId = `${sections.projects.id}-titulo`;
  return (
    <section id={sections.projects.id} aria-labelledby={titleId} className="sec">
      <div className="wrap">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h2 id={titleId} className={secTitle}>
            {sections.projects.title}
          </h2>
          <p className="m-0 flex flex-wrap gap-x-[22px] gap-y-2.5 font-mono text-xs leading-[1.4] font-medium tracking-[0.03em] text-muted">
            {legendOrder.map((status) => (
              <span key={status} className="inline-flex items-center gap-2">
                <i aria-hidden="true" className={`${square} ${statusColor[status]}`} />
                {text.legend[status]}
              </span>
            ))}
          </p>
        </div>
        <div
          aria-hidden="true"
          className="-mx-4 grid grid-cols-(--cols) gap-6 border-b border-rule-strong px-4 pb-3 font-mono text-[11px] leading-none font-medium tracking-[0.1em] text-muted uppercase max-[860px]:hidden"
        >
          <span>{text.columns.pos}</span>
          <span>{text.columns.project}</span>
          <span>{text.columns.stack}</span>
          <span className="max-[1100px]:hidden">{text.columns.status}</span>
          <span />
        </div>
        <ol className="-mx-4 my-0 list-none p-0 max-[860px]:mx-0 max-[860px]:border-t max-[860px]:border-rule-strong">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.slug}
              project={project}
              text={text.items[project.slug]}
              index={index}
              locale={locale}
              defaultOpen={index === 0}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
