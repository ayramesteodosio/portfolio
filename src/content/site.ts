import portrait from "@/assets/images/ayrames-retrato.jpg";
import type { SiteImage } from "./types";

export const site = {
  name: "Ayrames Teodósio",
  initials: "AYR",
  email: "ayrames.teodosio@hotmail.com",
  github: { href: "https://github.com/ayramesteodosio", label: "github.com/ayramesteodosio" },
  linkedin: {
    href: "https://www.linkedin.com/in/ayrames-pereira/",
    label: "linkedin.com/in/ayrames-pereira",
  },
  stack: {
    daily: ["React", "TypeScript", "Next.js"],
    also: ["Ruby on Rails", "Go", "Rust", "Python"],
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4173",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  portrait: { src: portrait, width: 397, height: 397 } satisfies SiteImage,
} as const;
