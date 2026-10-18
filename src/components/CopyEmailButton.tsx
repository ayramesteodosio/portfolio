"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/types";
import { btnBase, btnGhost } from "./styles";

function fallbackCopy(value: string) {
  const area = document.createElement("textarea");
  area.value = value;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
  } catch {}
  area.remove();
}

export function CopyEmailButton({ email, labels }: { email: string; labels: Dictionary["contact"] }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      fallbackCopy(email);
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <>
      <button type="button" onClick={copy} className={`${btnBase} ${btnGhost} min-h-11 px-[18px] text-sm max-[520px]:flex-auto`}>
        {copied ? labels.copied : labels.copy}
      </button>
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2 bg-fg px-[18px] py-3 text-sm leading-none font-semibold tracking-[0.02em] text-bg transition-[opacity,translate] duration-[180ms] ease-telemetry ${copied ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
      >
        {copied ? labels.toast : ""}
      </div>
    </>
  );
}
