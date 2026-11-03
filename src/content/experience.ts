import type { ExperienceItem } from "./types";

export const experience: { items: readonly ExperienceItem[] } = {
  items: [
    { slug: "credito", stack: ["Next.js", "TanStack Query", "Zod", "Recharts"] },
    { slug: "entregas", stack: ["React", "Redux Toolkit", "Firebase"] },
    { slug: "pagamentos", stack: ["Next.js", "Mantine", "Ruby on Rails", "Sidekiq", "Vitest"] },
    { slug: "renegociacao", stack: ["Ruby on Rails", "Grape", "Sidekiq", "MySQL", "RSpec", "React"] },
    { slug: "crm", stack: ["TypeScript", "Fastify", "Drizzle ORM", "BullMQ", "React"] },
    { slug: "site", stack: ["Next.js", "Bitbucket Pipelines", "PM2"] },
    { slug: "transmissoes", stack: ["React", "Redux Toolkit", "Mantine"] },
  ],
};
