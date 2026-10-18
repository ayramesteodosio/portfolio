import { site } from "@/content/site";
import type { Dictionary } from "@/content/types";

export function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="wrap flex flex-wrap items-center justify-between gap-3 py-[26px] text-sm text-muted">
        <span>{`© ${year} ${site.name}`}</span>
        <a
          href={`#${dict.sections.top.id}`}
          className="inline-flex min-h-11 items-center no-underline transition-colors duration-150 ease-telemetry hover:text-fg"
        >
          {dict.footer.backToTop}
          <span aria-hidden="true">&nbsp;↑</span>
        </a>
      </div>
    </footer>
  );
}
