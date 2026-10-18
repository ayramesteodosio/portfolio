import { expect, test } from "vitest";
import { applyTeam, readTeam, TEAM_STORAGE_KEY, teamBootstrapScript, writeTeam } from "./team";

test.each([
  ["lec", "lec"],
  ["xyz", "ver"],
  [null, "ver"],
])("readTeam com %s salvo devolve %s", (stored, expected) => {
  expect(readTeam({ getItem: () => stored })).toBe(expected);
});

test("readTeam devolve ver quando o storage lança", () => {
  expect(
    readTeam({
      getItem: () => {
        throw new Error("bloqueado");
      },
    }),
  ).toBe("ver");
});

test("writeTeam não lança quando o storage lança", () => {
  expect(() =>
    writeTeam("lec", {
      setItem: () => {
        throw new Error("bloqueado");
      },
    }),
  ).not.toThrow();
});

test("applyTeam grava no html", () => {
  applyTeam("lec");
  expect(document.documentElement.dataset.team).toBe("lec");
});

test("script inicial usa a mesma chave", () => {
  expect(teamBootstrapScript).toContain(TEAM_STORAGE_KEY);
});
