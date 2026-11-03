export const segGroup = "inline-flex border border-rule";

export const segItem =
  "inline-flex h-[34px] cursor-pointer items-center gap-2 bg-transparent px-[11px] font-mono text-xs leading-none font-medium tracking-[0.08em] text-muted no-underline transition-colors duration-150 ease-telemetry not-first:border-l not-first:border-rule hover:bg-surface hover:text-fg focus-visible:-outline-offset-2 pointer-coarse:h-11 aria-pressed:bg-surface-2 aria-pressed:font-semibold aria-pressed:text-fg aria-[current=true]:cursor-default aria-[current=true]:bg-surface-2 aria-[current=true]:font-semibold aria-[current=true]:text-fg";

export const btnBase =
  "group inline-flex cursor-pointer items-center justify-center gap-3 border leading-none font-semibold tracking-[0.02em] whitespace-nowrap no-underline transition-[background-color,border-color,transform] duration-150 ease-telemetry active:translate-y-px";

export const btn = `${btnBase} min-h-[52px] px-6 text-[15px] max-[520px]:flex-auto`;

export const btnPrimary = "border-transparent bg-accent text-on-accent hover:bg-accent-hover";

export const btnGhost =
  "border-rule-strong bg-transparent text-fg hover:border-[oklch(0.98_0_0/0.45)] hover:bg-surface-2";

export const secTitle =
  "stretch-wide m-0 font-display text-[clamp(28px,2.5vw,36px)] leading-[1.1] font-[620] tracking-[-0.018em]";

export const statusColor = {
  public: "bg-s-purple",
  running: "bg-s-green",
  design: "bg-s-yellow",
} as const;

export const square = "inline-block size-2.5 flex-none";

export const chip = "border border-rule px-2 py-[7px] font-mono text-xs leading-none font-medium whitespace-nowrap";

export const textLink =
  "inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold tracking-[0.02em] text-fg underline decoration-rule-strong underline-offset-[5px] transition-[text-decoration-color] duration-150 ease-telemetry hover:decoration-fg";

export const monoLabel = "font-mono text-xs leading-[1.4] font-medium tracking-[0.1em] text-muted uppercase";
