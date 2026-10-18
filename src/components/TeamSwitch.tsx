"use client";

import { useSyncExternalStore } from "react";
import type { Dictionary } from "@/content/types";
import { applyTeam, type Team, writeTeam } from "@/lib/team";
import { segGroup, segItem } from "./styles";

const options: { team: Team; code: string; bar: string }[] = [
  {
    team: "ver",
    code: "VER",
    bar: "bg-[linear-gradient(180deg,var(--ver-blue)_0_66%,var(--ver-yellow)_66%_84%,var(--ver-red)_84%_100%)]",
  },
  { team: "lec", code: "LEC", bar: "bg-[var(--lec-red)]" },
];

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-team"] });
  return () => observer.disconnect();
}

function currentTeam(): Team {
  return document.documentElement.dataset.team === "lec" ? "lec" : "ver";
}

function serverTeam(): Team {
  return "ver";
}

export function TeamSwitch({ labels }: { labels: Dictionary["team"] }) {
  const team = useSyncExternalStore(subscribe, currentTeam, serverTeam);

  function choose(next: Team) {
    applyTeam(next);
    writeTeam(next);
  }

  return (
    <div role="group" aria-label={labels.label} className={segGroup}>
      {options.map((option) => (
        <button
          key={option.team}
          type="button"
          aria-pressed={team === option.team}
          title={labels[option.team]}
          onClick={() => choose(option.team)}
          className={`${segItem} group`}
        >
          <span
            aria-hidden="true"
            className={`block h-[15px] w-[3px] flex-none ${option.bar} group-aria-[pressed=false]:opacity-55`}
          />
          {option.code}
        </button>
      ))}
    </div>
  );
}
