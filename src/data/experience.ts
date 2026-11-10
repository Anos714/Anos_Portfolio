import { getTech } from "./tech";

export type Experience = {
  role: string;
  roleIcon: string;
  type: string;
  duration: string;
  location: string;
  tech: string[];
  description: string[];
};

export const experiences: Experience[] = [
  {
    role: "Full Stack Developer",
    roleIcon: "Full Stack",
    type: "Freelance",
    duration: "Sep 2023 – Present",
    location: "Self-Employed · Alwar, India",
    tech: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "AWS",
    ],
    description: [
      "Delivered web apps end to end for clients: responsive React interfaces, Node.js and Express REST APIs, PostgreSQL and MongoDB schema design, and deployment with post-release fixes.",
      "Implemented authentication, role-based access control and validation at the API layer, worked in Git-based code review, and shipped with Playwright test coverage.",
      "Built AI features that turn a prompt into structured JSON output, with retry and provider fallback so a failed call degrades instead of breaking the flow.",
    ],
  },
  {
    role: "Python Developer Intern",
    roleIcon: "Python",
    type: "Internship",
    duration: "Jun 2024 – Aug 2024",
    location: "ONLEI Technologies · Remote, India",
    tech: ["Python"],
    description: [
      "Wrote and maintained Python scripts for data handling and basic automation, with documented code the team could run without a walkthrough.",
      "Returned for a second internship in 2025 with the same team for data-handling and automation work.",
    ],
  },
];

export type SkillGroup = {
  label: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["TypeScript", "JavaScript", "Go", "Python", "SQL", "HTML5", "CSS3"],
  },
  {
    label: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "React Hooks",
      "React Router",
      "Redux Toolkit",
      "Zustand",
      "TanStack Query",
      "Tailwind CSS",
    ],
  },
  {
    label: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "OAuth",
      "RBAC",
      "Zod",
      "WebSockets",
      "Hono",
    ],
  },
  {
    label: "Database & Caching",
    skills: ["PostgreSQL", "MongoDB", "Mongoose", "Redis", "Drizzle ORM"],
  },
  {
    label: "Testing & DevOps",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "AWS",
      "CI/CD",
      "Vercel",
      "Playwright",
      "Bun test",
      "Jest",
    ],
  },
  {
    label: "AI",
    skills: [
      "Generative AI",
      "LLMs",
      "Gemini",
      "Groq",
      "OpenAI-compatible APIs",
      "Structured outputs",
      "RAG",
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.skills).map(getTech);
