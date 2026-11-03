import dualsenseControle from "@/assets/images/dualsense-painel-controle.webp";
import mouseBridgePainel from "@/assets/images/mouse-bridge-painel.webp";
import prumoSaidas from "@/assets/images/prumo-saidas-escuro.webp";
import type { Project } from "./types";

export const projects: readonly Project[] = [
  {
    slug: "prumo",
    stack: ["Next.js", "Ruby on Rails"],
    status: "design",
    media: { kind: "image", image: { src: prumoSaidas, width: 1440, height: 900 } },
  },
  {
    slug: "mouse-bridge",
    stack: ["Tauri 2", "Rust"],
    status: "running",
    media: { kind: "image", image: { src: mouseBridgePainel, width: 1220, height: 520 } },
  },
  {
    slug: "dualsense",
    stack: ["Python", "GTK 4", "Qt"],
    status: "public",
    media: { kind: "image", image: { src: dualsenseControle, width: 900, height: 820 } },
    repo: "https://github.com/ayramesteodosio/dualsense-painel",
  },
  {
    slug: "bot-passagens",
    stack: ["Ruby", "ActiveRecord", "SQLite"],
    status: "running",
    media: { kind: "command", prompt: "/add", args: "SCL 2026-12 5-10 1800" },
  },
];
