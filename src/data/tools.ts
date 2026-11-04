export type Tool = {
  title: string;
  year: string;
  tech: string[];
  description: string;
  github: string;
  live?: string;
};

export const tools: Tool[] = [
  {
    title: "clockit",
    year: "2026",
    tech: ["Rust", "Tauri", "React", "COSMIC"],
    description:
      "Calm local-first focus timer and stopwatch for Pop!_OS and COSMIC — a wall-clock engine that survives restarts and suspend, a native panel applet with live countdown, tray and CLI controls, fullscreen focus mode, and idle-aware app-usage insights, all on disk with no accounts or network calls.",
    github: "https://github.com/Anos714/clockit",
  },
  {
    title: "LeafNode",
    year: "2026",
    tech: ["Go", "Cobra", "Bubble Tea", "bbolt"],
    description:
      "Insane terminal todo system — natural-language parsing, recurring tasks, kanban TUI, focus timer, and daemon reminders in a single bbolt-backed binary.",
    github: "https://github.com/Anos714/LeafNode",
  },
];
