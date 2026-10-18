import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { en } from "@/content/en";
import { pt } from "@/content/pt";
import { About } from "./About";
import { Hero } from "./Hero";

test("Hero em português", () => {
  render(<Hero dict={pt} />);
  expect(screen.getByRole("heading", { level: 1, name: "Ayrames Teodósio" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Ver projetos/ })).toHaveAttribute("href", "#projetos");
  expect(screen.getByRole("link", { name: "Falar comigo" })).toHaveAttribute("href", "#contato");
  expect(screen.getByRole("img", { name: pt.hero.portraitAlt })).toBeInTheDocument();
  expect(screen.getByText("Aberto a projetos e oportunidades")).toBeInTheDocument();
  expect(screen.getByText("Maceió, Alagoas")).toBeInTheDocument();
  expect(screen.getByText("Desenvolvedor Full Stack")).toBeInTheDocument();
  expect(screen.getByText("Do pixel ao banco de dados.")).toBeInTheDocument();
});

test("Hero em inglês aponta para as âncoras em inglês", () => {
  render(<Hero dict={en} />);
  expect(screen.getByRole("link", { name: /See projects/ })).toHaveAttribute("href", "#projects");
});

test("About em português", () => {
  render(<About dict={pt} />);
  const section = screen.getByRole("region", { name: "Sobre" });
  expect(section).toHaveAttribute("id", "sobre");
  expect(within(section).getByRole("heading", { level: 2, name: "Sobre" })).toBeInTheDocument();
  const terms = within(section).getAllByRole("term").map((el) => el.textContent);
  const values = within(section).getAllByRole("definition").map((el) => el.textContent);
  expect(terms).toEqual(["Agora", "Formação", "Rumo"]);
  expect(values).toEqual(["Full stack na Inovaxio", "Sistemas para Internet, UNCISAL", "Mais fundo no back-end"]);
  expect(section).toHaveTextContent("torcendo pelo Max e pelo Charles");
});
