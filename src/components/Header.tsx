import { site } from "@/content/site";
import type { Dictionary, Locale, SectionKey } from "@/content/types";
import { LangSwitch } from "./LangSwitch";
import { TeamSwitch } from "./TeamSwitch";

const navKeys: SectionKey[] = ["about", "experience", "projects", "stack", "contact"];

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg-glass backdrop-blur-md">
      <div className="wrap flex min-h-16 items-center gap-9 max-[860px]:flex-wrap max-[860px]:gap-x-4 max-[860px]:gap-y-1 max-[860px]:pt-2.5">
        <a
          href={`#${dict.sections.top.id}`}
          aria-label={dict.brandLabel}
          className="mr-auto flex items-center gap-3 py-1.5 no-underline"
        >
          <span
            aria-hidden="true"
            className="border border-rule-strong px-2 py-1.5 font-mono text-[13px] leading-none font-semibold tracking-[0.08em]"
          >
            {site.initials}
          </span>
          <span aria-hidden="true" className="stretch-wide text-[15px] font-semibold tracking-[-0.005em] max-[520px]:hidden">
            {site.name}
          </span>
        </a>
        <nav
          aria-label={dict.navLabel}
          className="flex gap-[30px] max-[860px]:order-3 max-[860px]:w-full max-[860px]:justify-between max-[860px]:gap-2 max-[860px]:border-t max-[860px]:border-border max-[360px]:gap-0"
        >
          {navKeys.map((key) => (
            <a
              key={key}
              href={`#${dict.sections[key].id}`}
              className="py-2.5 text-sm font-medium tracking-[0.02em] text-muted no-underline transition-colors duration-150 ease-telemetry hover:text-fg max-[860px]:py-3 max-[360px]:text-[13px] max-[360px]:tracking-normal"
            >
              {dict.sections[key].title}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <LangSwitch locale={locale} label={dict.languageLabel} />
          <TeamSwitch labels={dict.team} />
        </div>
      </div>
    </header>
  );
}
