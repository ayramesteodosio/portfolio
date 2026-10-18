import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { en } from "@/content/en";
import { pt } from "@/content/pt";
import { Projects } from "./Projects";

function rows() {
  return screen.getAllByRole("button").filter((el) => el.hasAttribute("aria-expanded"));
}

test("só a primeira linha começa aberta", () => {
  render(<Projects dict={pt} locale="pt" />);
  expect(rows().map((r) => r.getAttribute("aria-expanded"))).toEqual(["true", "false", "false", "false"]);
});

test("abrir uma linha não fecha as outras", async () => {
  render(<Projects dict={pt} locale="pt" />);
  await userEvent.click(rows()[1]);
  expect(rows()[1]).toHaveAttribute("aria-expanded", "true");
  expect(rows()[0]).toHaveAttribute("aria-expanded", "true");
});

test("painel fechado fica fora do foco", async () => {
  const { container } = render(<Projects dict={pt} locale="pt" />);
  const panel = container.querySelector("#d-mouse-bridge");
  expect(panel).toHaveAttribute("inert");
  await userEvent.click(rows()[1]);
  expect(panel).not.toHaveAttribute("inert");
  expect(rows()[1]).toHaveAttribute("aria-controls", "d-mouse-bridge");
});

test("painel tem nome acessível", () => {
  render(<Projects dict={pt} locale="pt" />);
  expect(screen.getByRole("region", { name: "Detalhes do Prumo" })).toBeInTheDocument();
});

test("legenda das cores de setor", () => {
  render(<Projects dict={pt} locale="pt" />);
  for (const label of ["Público", "Rodando ou em testes", "Em design"]) {
    expect(screen.getAllByText(label).length).toBeGreaterThan(0);
  }
});

test("link do repositório do Painel do DualSense", () => {
  render(<Projects dict={pt} locale="pt" />);
  const link = screen.getByRole("link", { name: /Ver no GitHub/ });
  expect(link).toHaveAttribute("href", "https://github.com/ayramesteodosio/dualsense-painel");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noopener");
});

test("comando do bot", () => {
  render(<Projects dict={pt} locale="pt" />);
  const pre = screen.getByLabelText("Exemplo de comando do bot");
  expect(pre).toHaveTextContent("/add");
  expect(pre).toHaveTextContent("SCL 2026-12 5-10 1800");
});

test("números conferidos aparecem", () => {
  render(<Projects dict={pt} locale="pt" />);
  expect(screen.getByText("protótipo, 32 telas")).toBeInTheDocument();
  expect(screen.getByText("v0.2.1")).toBeInTheDocument();
});

test("seção com título e âncora do idioma", () => {
  render(<Projects dict={pt} locale="pt" />);
  const section = screen.getByRole("region", { name: "Projetos" });
  expect(section).toHaveAttribute("id", "projetos");
});

test("em inglês, o bot vira Flight deals bot", () => {
  render(<Projects dict={en} locale="en" />);
  expect(within(rows()[3]).getByText("Flight deals bot")).toBeInTheDocument();
});
