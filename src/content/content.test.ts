import { describe, expect, test } from "vitest";
import { en } from "./en";
import { projects } from "./projects";
import { pt } from "./pt";
import { site } from "./site";

function keyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => keyPaths(item, `${prefix}[${i}]`));
  }
  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => [
      `${prefix}.${key}`,
      ...keyPaths(child, `${prefix}.${key}`),
    ]);
  }
  return [];
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value !== null && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

const slugs = projects.map((p) => p.slug).sort();

test("pt e en têm as mesmas chaves", () => {
  const ignore = (path: string) => !path.endsWith(".repoLabel");
  expect(keyPaths(en).filter(ignore)).toEqual(keyPaths(pt).filter(ignore));
});

describe.each([
  ["pt", pt],
  ["en", en],
])("%s", (_, dict) => {
  test("tem texto para todos os projetos", () => {
    expect(Object.keys(dict.projects.items).sort()).toEqual(slugs);
  });

  test("ids de seção são únicos", () => {
    const ids = Object.values(dict.sections).map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("projetos com repositório têm rótulo do link", () => {
    for (const project of projects.filter((p) => p.repo)) {
      expect(dict.projects.items[project.slug].repoLabel).toBeTruthy();
    }
  });
});

test("nenhum texto tem travessão", () => {
  for (const text of [...strings(pt), ...strings(en), ...strings(site)]) {
    expect(text).not.toMatch(/[—–]/);
  }
});

test("números conferidos em 18/10/2026", () => {
  expect(pt.projects.items.prumo.statusDetail).toBe("protótipo, 32 telas");
  expect(pt.projects.items.dualsense.statusDetail).toBe("v0.2.1");
});

test("capturas dos projetos são WebP", () => {
  const sources = projects.flatMap((p) => (p.media.kind === "image" ? [String(p.media.image.src)] : []));
  expect(sources.length).toBeGreaterThan(0);
  for (const src of sources) expect(src).toMatch(/\.webp$/);
});

test("tempo na Inovaxio é o mesmo no Sobre e na Experiência", () => {
  const tempo = pt.experience.facts.find((fact) => fact.term === "Tempo")?.value;
  expect(tempo).toBe("1 ano e 8 meses");
  expect(pt.about.lead).toContain(tempo);
  expect(en.experience.facts.find((fact) => fact.term === "Tenure")?.value).toBe("1 year, 8 months");
  expect(en.about.lead).toContain("a year and eight months");
});
