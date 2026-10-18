import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { pt } from "@/content/pt";
import { TeamSwitch } from "./TeamSwitch";

test("começa em VER sem nada salvo", () => {
  render(<TeamSwitch labels={pt.team} />);
  expect(screen.getByRole("button", { name: /VER/ })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("button", { name: /LEC/ })).toHaveAttribute("aria-pressed", "false");
});

test("clicar em LEC troca a cor e salva", async () => {
  render(<TeamSwitch labels={pt.team} />);
  await userEvent.click(screen.getByRole("button", { name: /LEC/ }));
  expect(document.documentElement.dataset.team).toBe("lec");
  expect(screen.getByRole("button", { name: /LEC/ })).toHaveAttribute("aria-pressed", "true");
  expect(localStorage.getItem("portfolio-equipe")).toBe("lec");
});

test("troca a cor mesmo com o storage bloqueado", async () => {
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("bloqueado");
  });
  render(<TeamSwitch labels={pt.team} />);
  await userEvent.click(screen.getByRole("button", { name: /LEC/ }));
  expect(document.documentElement.dataset.team).toBe("lec");
});

test("respeita a cor já aplicada no html", () => {
  document.documentElement.dataset.team = "lec";
  render(<TeamSwitch labels={pt.team} />);
  expect(screen.getByRole("button", { name: /LEC/ })).toHaveAttribute("aria-pressed", "true");
});
