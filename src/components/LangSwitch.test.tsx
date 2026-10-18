import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { LangSwitch } from "./LangSwitch";

test("em português, EN é link e PT é o atual", () => {
  render(<LangSwitch locale="pt" label="Idioma" />);
  expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/en/");
  expect(screen.getByText("PT")).toHaveAttribute("aria-current", "true");
  expect(screen.getByRole("group", { name: "Idioma" })).toBeInTheDocument();
});

test("em inglês, PT é link", () => {
  render(<LangSwitch locale="en" label="Language" />);
  expect(screen.getByRole("link", { name: "PT" })).toHaveAttribute("href", "/pt/");
});
