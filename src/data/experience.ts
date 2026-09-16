import { getTech } from "./tech";

export const experience = {
  role: "Full Stack Developer",
  type: "Freelance",
  duration: "2023 – Present",
  location: "Self-Employed",
  tech: ["React.js", "Node.js", "MongoDB"],
  description: [
    "Developed and deployed production-grade full-stack web applications using React.js, Next.js, Node.js, Express.js, and MongoDB.",
    "Built secure REST APIs with JWT authentication, rate limiting, and input validation while optimizing database queries.",
    "Utilized Docker, Git, and automated CI/CD workflows for consistent version control, staging, and zero-downtime maintenance.",
    "Conducted manual testing, API validation, regression testing, and defect fixing throughout SDLC to ensure high system stability.",
  ],
};

export type SkillGroup = {
  label: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Java", "JavaScript", "TypeScript", "SQL", "Go"],
  },
  {
    label: "Frontend",
    skills: ["React.js", "Next.js", "Tailwind CSS", "TanStack Query", "Zustand", "Redux Toolkit"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "Hono", "Bun", "JWT", "OAuth", "Zod", "RBAC"],
  },
  {
    label: "Database & Caching",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Drizzle ORM", "Prisma", "Neon", "Upstash"],
  },
  {
    label: "Testing & DevOps",
    skills: ["Docker", "Git", "GitHub", "CI/CD", "BullMQ", "Postman", "Selenium", "Vercel"],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.skills).map(getTech);
