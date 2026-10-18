import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { pt } from "@/content/pt";
import { site } from "@/content/site";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Stack } from "./Stack";

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");

function setClipboard(value: unknown) {
  Object.defineProperty(navigator, "clipboard", { value, configurable: true });
}

function setExecCommand() {
  const exec = vi.fn(() => true);
  Object.defineProperty(document, "execCommand", { value: exec, configurable: true });
  return exec;
}

afterEach(() => {
  if (originalClipboard) Object.defineProperty(navigator, "clipboard", originalClipboard);
  else Reflect.deleteProperty(navigator, "clipboard");
  Reflect.deleteProperty(document, "execCommand");
});

async function clickCopy() {
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Copiar" }));
  });
}

test("e-mail e links", () => {
  render(<Contact dict={pt} />);
  expect(screen.getByRole("link", { name: site.email })).toHaveAttribute("href", `mailto:${site.email}`);
  for (const [name, href] of [
    ["GitHub", site.github.href],
    ["LinkedIn", site.linkedin.href],
  ]) {
    const link = screen.getByRole("link", { name: new RegExp(name) });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  }
});

test("copiar usa a Clipboard API e avisa", async () => {
  vi.useFakeTimers();
  const writeText = vi.fn(() => Promise.resolve());
  setClipboard({ writeText });
  render(<Contact dict={pt} />);
  await clickCopy();
  expect(writeText).toHaveBeenCalledWith(site.email);
  expect(screen.getByRole("button", { name: "Copiado" })).toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("E-mail copiado");
  act(() => {
    vi.advanceTimersByTime(1800);
  });
  expect(screen.getByRole("button", { name: "Copiar" })).toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("");
});

test("copiar cai no fallback quando a Clipboard API rejeita", async () => {
  setClipboard({ writeText: vi.fn(() => Promise.reject(new Error("negado"))) });
  const exec = setExecCommand();
  render(<Contact dict={pt} />);
  await clickCopy();
  expect(exec).toHaveBeenCalledWith("copy");
  expect(screen.getByRole("status")).toHaveTextContent("E-mail copiado");
});

test("copiar cai no fallback sem Clipboard API", async () => {
  setClipboard(undefined);
  const exec = setExecCommand();
  render(<Contact dict={pt} />);
  await clickCopy();
  expect(exec).toHaveBeenCalledWith("copy");
  expect(screen.getByRole("status")).toHaveTextContent("E-mail copiado");
});

test("stack numerada", () => {
  render(<Stack dict={pt} />);
  const items = screen.getAllByRole("listitem").map((el) => el.textContent);
  expect(items).toEqual(["01React", "02TypeScript", "03Next.js", "04Ruby on Rails", "05Go", "06Rust", "07Python"]);
  expect(screen.getByText("Dia a dia")).toBeInTheDocument();
  expect(screen.getByText("Também")).toBeInTheDocument();
});

test("rodapé com o ano atual", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2027-03-01T12:00:00"));
  render(<Footer dict={pt} />);
  expect(screen.getByText("© 2027 Ayrames Teodósio")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Voltar ao topo/ })).toHaveAttribute("href", "#inicio");
});
