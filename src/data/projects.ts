import { getTech } from "./tech";

export type Project = {
  title: string;
  year: string;
  tech: string[];
  description: string[];
  live?: string;
  github: string;
  image?: string;
  logo?: string;
};

export const projects: Project[] = [
  {
    title: "Waku",
    year: "2026",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Drizzle ORM",
      "Neon",
      "OAuth",
      "Gemini AI",
    ],
    image: "/projects/waku.jpg",
    description: [
      "Built a local-first profile and identity-card studio that turns a name, role, and links into a themeable public profile page plus a matching downloadable identity card, with live publishing at /p/<slug>.",
      "Engineered a single shared ProfileView renderer for both the editor live preview and the public page, with token-based theming (10 themes, 8 fonts, 16 accents, 8 backgrounds), 4 page designs, and 8 card layouts exported as PNG/JPEG/WebP/AVIF at 2x with theme-colored QR codes.",
      "Implemented server-side Gemini AI bio/tagline writing constrained to profile facts, signed Cloudinary photo uploads, and Better Auth GitHub/Google publishing with anonymous draft claiming and server-owned slugs.",
      "Added anonymous visitor ratings with hashed-fingerprint deduplication, contact and legal pages, and graceful degradation that reports exactly what is missing instead of failing when DB, OAuth, or AI keys are unconfigured.",
    ],
    live: "https://wakucards.vercel.app",
    github: "https://github.com/Anos714/waku",
  },
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
    live: "https://inkwell-blogs.pages.dev",
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
  {
    title: "ThePerfectResume",
    year: "2026",
    tech: [
      "Hono",
      "Bun",
      "Drizzle ORM",
      "Neon",
      "Redis",
      "Zod",
      "OAuth",
    ],
    image: "/projects/theperfectresume.png",
    description: [
      "Built a resume and CV builder that pairs full manual editing control with AI-assisted content generation, letting users craft polished, role-targeted resumes from scratch or from an existing profile.",
      "Designed a modular Hono backend on the Bun runtime, splitting domain logic into users, profiles, and resumes modules with route-level Zod request validation.",
      "Modeled relational schemas with Drizzle ORM on Neon serverless PostgreSQL and added a Redis caching layer with rate limiting to protect auth and generation endpoints from abuse.",
      "Implemented secure Google OAuth authentication and transactional email via Nodemailer, with end-to-end typed APIs for a fully type-safe developer experience.",
    ],
    github: "https://github.com/Anos714/ThePerfectResume",
  },
  {
    title: "SmartBillr",
    year: "2026",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "TanStack Query",
      "Zustand",
      "Zod",
      "JWT",
    ],
    image: "/projects/smartbillr.png",
    description: [
      "Built a modern invoice generation platform that combines full manual invoice control with AI-assisted automation, covering dynamic invoice fields, clients, items, and taxes in a clean export-ready UI.",
      "Engineered a Node.js + Express backend with JWT and Google OAuth authentication, secure cookie-based sessions, Zod input validation, and hardening via Helmet, CORS, and Morgan logging.",
      "Persisted invoices and clients in MongoDB with Mongoose, layered Redis for caching and performance, and integrated Nodemailer for invoice delivery and notifications.",
      "Crafted a fast Vite + React 19 frontend with TanStack Query for server state, Zustand for global state, and toast-driven feedback for a snappy invoicing workflow.",
    ],
    github: "https://github.com/Anos714/SmartBillr",
  },
];

export const projectIcon = (p: Project) => getTech(p.title);
