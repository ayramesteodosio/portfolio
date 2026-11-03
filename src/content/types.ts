import type { StaticImageData } from "next/image";

export type Locale = "pt" | "en";
export type SectionKey = "top" | "about" | "projects" | "stack" | "contact";
export type StatusKind = "public" | "running" | "design";
export type ProjectSlug = "prumo" | "mouse-bridge" | "dualsense" | "bot-passagens";
export type SiteImage = { src: StaticImageData | string; width: number; height: number };

export type ProjectMedia =
  | { kind: "image"; image: SiteImage; imageEn?: SiteImage }
  | { kind: "command"; prompt: string; args: string };

export type Project = {
  slug: ProjectSlug;
  stack: readonly string[];
  status: StatusKind;
  media: ProjectMedia;
  repo?: string;
};

export type ProjectText = {
  name: string;
  summary: string;
  status: string;
  statusDetail: string;
  statusShort: string;
  lead: { strong: string; rest: string };
  note: string;
  detailsLabel: string;
  mediaLabel: string;
  repoLabel?: string;
};

export type Dictionary = {
  htmlLang: "pt-BR" | "en";
  meta: { title: string; description: string };
  skipLink: string;
  brandLabel: string;
  navLabel: string;
  languageLabel: string;
  team: { label: string; ver: string; lec: string };
  sections: Record<SectionKey, { id: string; title: string }>;
  hero: {
    status: string;
    location: string;
    role: string;
    tagline: string;
    ctaProjects: string;
    ctaContact: string;
    portraitAlt: string;
  };
  about: {
    lead: string;
    facts: { term: string; value: string }[];
    offTrackLabel: string;
    offTrack: string;
  };
  projects: {
    legend: Record<StatusKind, string>;
    columns: { pos: string; project: string; stack: string; status: string };
    items: Record<ProjectSlug, ProjectText>;
  };
  stack: { daily: string; also: string };
  contact: { lead: string; copy: string; copied: string; toast: string; copyFailed: string };
  footer: { backToTop: string };
};
