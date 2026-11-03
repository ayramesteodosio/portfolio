import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { en } from "@/content/en";
import { experience } from "@/content/experience";
import { pt } from "@/content/pt";
import { Experience } from "./Experience";
import { Header } from "./Header";

test("Experiência em português", () => {
  render(<Experience dict={pt} />);
  const section = screen.getByRole("region", { name: "Experiência" });
  expect(section).toHaveAttribute("id", "experiencia");
  expect(within(section).getByRole("heading", { level: 3, name: "Inovaxio" })).toBeInTheDocument();
  expect(section).toHaveTextContent("Desenvolvedor Full Stack Júnior");
  expect(section).toHaveTextContent("04/2025 a 11/2026");
  const terms = within(section).getAllByRole("term").map((el) => el.textContent);
  expect(terms).toEqual(["Produtos", "Commits", "Arquivos de teste", "Tempo"]);
  const items = within(section).getAllByRole("listitem");
  expect(items).toHaveLength(experience.items.length);
  expect(within(items[0]).getByRole("heading", { level: 4, name: "Plataforma de crédito" })).toBeInTheDocument();
  expect(items[0]).toHaveTextContent("86% dos commits");
  expect(items[0]).toHaveTextContent("11/2025 a 04/2026");
  for (const tag of experience.items[0].stack) expect(within(items[0]).getByText(tag)).toBeInTheDocument();
});

test("Experience em inglês", () => {
  render(<Experience dict={en} />);
  const section = screen.getByRole("region", { name: "Experience" });
  expect(section).toHaveAttribute("id", "experience");
  expect(section).toHaveTextContent("Apr 2025 to Nov 2026");
});

test("menu leva à Experiência, entre Sobre e Projetos", () => {
  render(<Header dict={pt} locale="pt" />);
  const nav = screen.getByRole("navigation", { name: pt.navLabel });
  const links = within(nav)
    .getAllByRole("link")
    .map((a) => [a.textContent, a.getAttribute("href")]);
  expect(links.slice(0, 3)).toEqual([
    ["Sobre", "#sobre"],
    ["Experiência", "#experiencia"],
    ["Projetos", "#projetos"],
  ]);
});
