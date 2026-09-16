import { getTech } from "./tech";

export type Project = {
  title: string;
  year: string;
  tech: string[];
  description: string[];
  live: string;
  github: string;
  image?: string;
  logo?: string;
};

export const projects: Project[] = [
  {
    title: "Xcel",
    year: "2026",
    tech: [
      "Next.js",
      "Bun",
      "Express.js",
      "PostgreSQL",
      "Drizzle ORM",
      "Redis",
      "BullMQ",
      "Gemini AI",
    ],
    image: "/projects/xcel.png",
    logo: "/projects/xcel.svg",
    description: [
      "Architected an autonomous Twitter growth SaaS that ingests real-time web trends via Tavily API and synthesizes high-engagement, topic-tailored tweet threads using structured Gemini AI prompts.",
      "Engineered an asynchronous queue architecture with BullMQ and Redis, successfully executing 495 total tweets (412 posted, 38 pending, 45 failed) via Buffer API with exponential backoff handling.",
      "Accelerated backend execution using Bun runtime and modeled relational schemas with Drizzle ORM on PostgreSQL, utilizing composite indexing to minimize queue polling latency.",
      "Engineered customizable posting schedules, timezone-aware cron triggers, request validation with Zod, and centralized structured error logging across worker nodes.",
    ],
    live: "https://xxcel.vercel.app/",
    github: "https://github.com/Anos714/Xcel",
  },
  {
    title: "Inkwell",
    year: "2026",
    tech: [
      "React",
      "Hono",
      "PostgreSQL",
      "Drizzle ORM",
      "Redis",
      "TanStack Query",
      "Zustand",
    ],
    image: "/projects/inkwell.png",
    logo: "/projects/inkwell.svg",
    description: [
      "Architected an ultra-fast, distraction-free personal blogging platform with a lightweight Hono backend, achieving sub-30ms API response latency.",
      "Implemented secure Google OAuth 2.0 authentication paired with strict Role-Based Access Control (RBAC) to separate reader permissions from author/admin publishing controls.",
      "Engineered an interactive split-pane Markdown editor with real-time live preview, draft auto-saving, and syntax highlighting using Zustand and local storage fallback.",
      "Integrated TanStack Query for optimistic UI updates and cache invalidation, paired with an Upstash Redis caching layer and Drizzle ORM on PostgreSQL for instant article reads.",
    ],
    live: "https://inkwell-0tx.pages.dev/",
    github: "https://github.com/Anos714/Inkwell",
  },
  {
    title: "Konnect",
    year: "2025",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TanStack Query",
      "Stream",
    ],
    image: "/projects/konnect.png",
    logo: "/projects/konnect.svg",
    description: [
      "Built a real-time social networking application supporting instant messaging, group channels, user presence indicators, and peer-to-peer HD video calling using Stream SDKs.",
      "Implemented TanStack Query for client-side query caching, background refetching, and optimistic UI updates, cutting redundant network requests by over 40%.",
      "Designed robust RESTful APIs with JWT authentication, protected endpoints, and schema-level validation using Express.js and Mongoose.",
      "Optimized MongoDB collections using compound indexing on user and feed relationships, ensuring sub-50ms data retrieval for complex timeline feeds.",
    ],
    live: "https://konnect-zeta.vercel.app/",
    github: "https://github.com/Anos714/Konnect",
  },
];

export const projectIcon = (p: Project) => getTech(p.title);
