"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale, Project, ProjectText } from "@/content/types";
import { square, statusColor, textLink } from "./styles";

type Props = {
  project: Project;
  text: ProjectText;
  index: number;
  locale: Locale;
  defaultOpen: boolean;
};

function Media({ project, text, locale }: Pick<Props, "project" | "text" | "locale">) {
  const { media } = project;
  if (media.kind === "command") {
    return (
      <figure aria-label={text.mediaLabel} className="m-0">
        <pre className="m-0 overflow-x-auto border border-rule bg-bg px-5 py-[18px] font-mono text-[clamp(15px,1.6vw,20px)] leading-[1.5] font-medium whitespace-pre text-fg">
          <span className="text-accent-text">{media.prompt}</span> {media.args}
        </pre>
      </figure>
    );
  }
  const image = (locale === "en" && media.imageEn) || media.image;
  return (
    <figure className="m-0 w-fit max-w-full border border-rule bg-bg">
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={text.mediaLabel}
        sizes="(max-width: 860px) 100vw, 640px"
        className="block h-auto max-h-[440px] w-auto max-w-full"
      />
    </figure>
  );
}

export function ProjectRow({ project, text, index, locale, defaultOpen }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `d-${project.slug}`;
  const color = statusColor[project.status];

  return (
    <li className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="group grid w-full cursor-pointer grid-cols-(--cols) items-center gap-6 bg-transparent px-4 py-[26px] text-left transition-colors duration-150 ease-telemetry hover:bg-surface focus-visible:-outline-offset-2 aria-expanded:bg-surface max-[860px]:grid-cols-[34px_minmax(0,1fr)_34px] max-[860px]:items-start max-[860px]:gap-x-3 max-[860px]:gap-y-3.5 max-[860px]:px-0 max-[860px]:py-[22px] max-[860px]:[grid-template-areas:'pos_name_tog'_'._tags_.'] max-[860px]:hover:bg-transparent max-[860px]:aria-expanded:bg-transparent"
      >
        <span className="font-mono text-[15px] leading-none font-semibold text-muted tabular-nums transition-colors duration-150 ease-telemetry group-hover:text-accent-text group-aria-expanded:text-accent-text max-[860px]:pt-[5px] max-[860px]:[grid-area:pos]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="max-[860px]:[grid-area:name]">
          <span className="stretch-wide block font-display text-[clamp(21px,1.85vw,26px)] leading-[1.2] font-[620] tracking-[-0.012em]">
            {text.name}
          </span>
          <span className="mt-1.5 block max-w-[56ch] text-base leading-[1.5] text-muted">{text.summary}</span>
          <span className="mt-3 hidden items-center gap-2 font-mono text-[13px] leading-[1.4] font-medium text-muted max-[1100px]:flex">
            <i aria-hidden="true" className={`${square} ${color}`} />
            {text.statusShort}
          </span>
        </span>
        <span className="flex flex-wrap gap-1.5 max-[860px]:[grid-area:tags]">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="border border-rule px-2 py-[7px] font-mono text-xs leading-none font-medium whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </span>
        <span className="flex items-start gap-2.5 max-[1100px]:hidden">
          <i aria-hidden="true" className={`${square} ${color} mt-1.5`} />
          <span>
            <span className="block text-[15px] leading-[1.4] font-semibold">{text.status}</span>
            <span className="mt-[3px] block font-mono text-[13px] leading-[1.4] text-muted">{text.statusDetail}</span>
          </span>
        </span>
        <span
          aria-hidden="true"
          className="grid size-[34px] place-items-center border border-rule font-mono text-lg leading-none transition-[transform,border-color] duration-200 ease-telemetry group-hover:border-rule-strong group-aria-expanded:rotate-45 max-[860px]:[grid-area:tog]"
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-label={text.detailsLabel}
        inert={!open}
        className={`grid bg-surface transition-[grid-template-rows] duration-[320ms] ease-telemetry max-[860px]:bg-transparent ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid grid-cols-[minmax(0,7fr)_minmax(0,4fr)] items-start gap-11 pt-1.5 pr-4 pb-10 pl-[calc(56px+24px+16px)] max-[860px]:grid-cols-1 max-[860px]:gap-6 max-[860px]:p-0 max-[860px]:pb-8">
            <Media project={project} text={text} locale={locale} />
            <div>
              <p className="mt-0 mb-[18px] max-w-[42ch] text-muted">
                <strong className="font-semibold text-fg">{text.lead.strong}</strong>
                {text.lead.rest}
              </p>
              <p className="mt-0 mb-[18px] max-w-[42ch] text-muted">{text.note}</p>
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener" className={textLink}>
                  {text.repoLabel}
                  <span aria-hidden="true" className="font-mono">
                    ↗
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
