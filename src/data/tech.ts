export type Tech = {
  name: string;
  icon: string;
};

export const techIcons: Record<string, string> = {
  Java: "/tech/java.svg",
  JavaScript: "/tech/javascript.svg",
  TypeScript: "/tech/typescript.svg",
  SQL: "/tech/sql.svg",
  Go: "/tech/go.svg",
  "React.js": "/tech/react.svg",
  React: "/tech/react.svg",
  "Next.js": "/tech/nextjs.svg",
  "Tailwind CSS": "/tech/tailwindcss.svg",
  "TanStack Query": "/tech/tanstack.svg",
  Zustand: "/tech/zustand.svg",
  "Redux Toolkit": "/tech/redux.svg",
  "Node.js": "/tech/nodejs.svg",
  "Express.js": "/tech/express.svg",
  Hono: "/tech/hono.svg",
  Bun: "/tech/bun.svg",
  JWT: "/tech/jwt.svg",
  OAuth: "/tech/oauth.svg",
  Zod: "/tech/zod.svg",
  RBAC: "/tech/jwt.svg",
  PostgreSQL: "/tech/postgresql.svg",
  MongoDB: "/tech/mongodb.svg",
  Redis: "/tech/redis.svg",
  Drizzle: "/tech/drizzle.svg",
  "Drizzle ORM": "/tech/drizzle.svg",
  Prisma: "/tech/prisma.svg",
  Docker: "/tech/docker.svg",
  Git: "/tech/git.svg",
  GitHub: "/tech/github.svg",
  "CI/CD": "/tech/cicd.svg",
  BullMQ: "/tech/bullmq.svg",
  Postman: "/tech/postman.svg",
  Selenium: "/tech/selenium.svg",
  Gemini: "/tech/gemini.svg",
  "Gemini AI": "/tech/gemini.svg",
  Stream: "/tech/stream.svg",
  Neon: "/tech/neon.svg",
  Upstash: "/tech/upstash.svg",
  Vercel: "/tech/vercel.svg",
};

export function getTech(name: string): Tech {
  return {
    name,
    icon: techIcons[name] ?? "/tech/javascript.svg",
  };
}
