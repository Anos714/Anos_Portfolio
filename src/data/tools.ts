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
    title: "LeafNode",
    year: "2026",
    tech: ["Go", "Cobra", "Bubble Tea", "bbolt"],
    description:
      "Insane terminal todo system — natural-language parsing, recurring tasks, kanban TUI, focus timer, and daemon reminders in a single bbolt-backed binary.",
    github: "https://github.com/Anos714/LeafNode",
  },
];
