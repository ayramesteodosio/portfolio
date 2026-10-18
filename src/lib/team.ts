export type Team = "ver" | "lec";

export const TEAM_STORAGE_KEY = "portfolio-equipe";

function browserStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

export function readTeam(storage: Pick<Storage, "getItem"> | undefined = browserStorage()): Team {
  try {
    return storage?.getItem(TEAM_STORAGE_KEY) === "lec" ? "lec" : "ver";
  } catch {
    return "ver";
  }
}

export function writeTeam(team: Team, storage: Pick<Storage, "setItem"> | undefined = browserStorage()): void {
  try {
    storage?.setItem(TEAM_STORAGE_KEY, team);
  } catch {}
}

export function applyTeam(team: Team): void {
  document.documentElement.dataset.team = team;
}

export const teamBootstrapScript = `try{if(localStorage.getItem("${TEAM_STORAGE_KEY}")==="lec")document.documentElement.dataset.team="lec"}catch(e){}`;
