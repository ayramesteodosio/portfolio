"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/types";
import { btnBase, btnGhost } from "./styles";

type CopyState = "idle" | "copied" | "failed";

function fallbackCopy(value: string): boolean {
  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const area = document.createElement("textarea");
  area.value = value;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {}
  area.remove();
  previous?.focus({ preventScroll: true });
  return copied;
}

export function CopyEmailButton({ email, labels }: { email: string; labels: Dictionary["contact"] }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    let copied = true;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      copied = fallbackCopy(email);
    }
    setState(copied ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), copied ? 1800 : 4000);
  }

  const message = state === "copied" ? labels.toast : state === "failed" ? labels.copyFailed : "";

  return (
    <>
      <button type="button" onClick={copy} className={`${btnBase} ${btnGhost} min-h-11 px-[18px] text-sm max-[520px]:flex-auto`}>
        {state === "copied" ? labels.copied : labels.copy}
      </button>
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2 bg-fg px-[18px] py-3 text-sm leading-none font-semibold tracking-[0.02em] text-bg transition-[opacity,translate] duration-[180ms] ease-telemetry ${message ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
      >
        {message}
      </div>
    </>
  );
}
