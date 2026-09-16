# Rahul Sain — Portfolio

A minimal, modern developer portfolio built with Next.js 16, React 19, and Tailwind CSS v4.
Features dedicated pages for projects, work, blogs, inspiration, and resume, live unique-visitor
tracking backed by Neon Postgres, full SEO, and a polished light/dark theme.

[**Live Demo**](https://rahulxcode.vercel.app/) · [**Source**](https://github.com/Anos714/Anos_Portfolio)

---

## ✨ Features

- **Dedicated pages** — Home, Projects, Work, Blogs, Inspiration, Resume, each with its own metadata
- **Live blog integration** — posts are fetched from the Inkwell API and link out by slug
- **Unique visitor tracking** — a Next.js API route (`/api/visits`) backed by Neon Postgres + Drizzle ORM,
  with a race-safe per-day upsert and a short-lived in-memory count cache
- **Light & dark mode** — class-based theming with a circular-reveal toggle animation, no flash on load
- **Full SEO** — Open Graph + dynamically generated OG image, Twitter cards, sitemap, robots.txt,
  web manifest, canonical URLs, and JSON-LD structured data
- **Typing-effect hero** — the "aka …" title cycles through roles with a typewriter animation
- **Link previews** — hover cards with live screenshots (via Microlink) on social links
- **Motion** — subtle reveal, stagger, and hover animations throughout (Framer Motion)

---

## 🛠️ Tech Stack

| Area        | Technology                                             |
| ----------- | ------------------------------------------------------ |
| Framework   | Next.js 16 (App Router, Turbopack)                     |
| Language    | TypeScript                                             |
| Styling     | Tailwind CSS v4                                        |
| Animation   | Framer Motion / Motion                                 |
| UI Primitives | Radix UI (Hover Card)                                |
| Database    | Neon Postgres                                          |
| ORM         | Drizzle ORM + Drizzle Kit                              |
| Package Mgr | Bun                                                    |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18+ or [Bun](https://bun.sh/) 1.0+
- A [Neon](https://neon.tech) Postgres project (for visitor tracking)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Anos714/Anos_Portfolio.git
cd Anos_Portfolio

# 2. Install dependencies
bun install
# or
npm install

# 3. Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root (see `.env.example`):

```env
# Neon Postgres connection string
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Canonical production URL — used for SEO, sitemap, and OG image URLs
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

> **Note:** `NEXT_PUBLIC_SITE_URL` should point to your deployed domain. It drives the
> canonical tags, `sitemap.xml`, `robots.txt`, and Open Graph image URLs.

### Database Setup

The visitor tracking table is managed with Drizzle Kit. Push the schema to your Neon database:

```bash
npx drizzle-kit push
```

This creates the `visits` table. To modify the schema, edit `src/db/schema.ts` and re-run the push.

### Development

```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Lint

```bash
bun run build   # production build
bun run start   # serve the production build
bun run lint    # run eslint
```

---

## 📁 Project Structure

```
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── api/visits/route.ts     # Visitor tracking API (GET + POST)
│   │   ├── blogs/page.tsx          # All blogs page
│   │   ├── inspiration/page.tsx    # Inspirational people page
│   │   ├── projects/page.tsx       # All projects page
│   │   ├── resume/page.tsx         # Resume page (embedded PDF)
│   │   ├── work/page.tsx           # Work experience & skills page
│   │   ├── opengraph-image.tsx     # Dynamically generated OG image
│   │   ├── manifest.ts             # Web app manifest
│   │   ├── robots.ts               # robots.txt generation
│   │   ├── sitemap.ts              # sitemap.xml generation
│   │   ├── icon.png                # Favicon (generated from logo)
│   │   ├── layout.tsx              # Root layout (fonts, metadata, theme script)
│   │   └── page.tsx                # Home page
│   ├── components/                 # React components
│   │   ├── sections/               # Page sections (Hero, Projects, Work, etc.)
│   │   ├── project/ProjectCard.tsx # Project card with logo & tech stack
│   │   ├── blog/BlogsList.tsx      # Blog post list
│   │   ├── Navbar.tsx              # Nav with typing effect & theme toggle
│   │   ├── ThemeToggle.tsx         # Dark mode toggle with circular reveal
│   │   ├── VisitorCount.tsx        # Live unique visitor badge
│   │   ├── LinkPreview.tsx         # Hover link previews (Microlink)
│   │   ├── Typewriter.tsx          # Typing effect for hero title
│   │   ├── PersonJsonLd.tsx        # JSON-LD structured data
│   │   └── ...
│   ├── data/                       # Static content data
│   │   ├── site.ts                 # Site info, socials, nav links
│   │   ├── projects.ts             # Project entries
│   │   ├── experience.ts           # Work experience & skill groups
│   │   ├── inspiration.ts          # Inspiration page content
│   │   ├── blogs.ts                # Blog API fetcher
│   │   └── tech.ts                 # Tech icon mapping
│   ├── db/                         # Drizzle database layer
│   │   ├── schema.ts               # Visits table schema
│   │   └── index.ts                # Neon + Drizzle client
│   └── lib/                        # Utilities
│       ├── site.ts                 # Site URL helper
│       └── utils.ts                # cn() class merge helper
├── public/                         # Static assets
│   ├── logo.jpeg                   # Profile/logo image
│   ├── projects/                   # Project logos & previews
│   └── tech/                       # Technology icons
├── drizzle.config.ts               # Drizzle Kit config
└── .env.example                    # Environment variable template
```

---

## 📊 Visitor Tracking API

Unique-visitor tracking is built in as a Next.js Route Handler (no separate backend needed).

**`POST /api/visits`** — records a visit and returns the current count

```json
{
  "uniqueVisitors": 1337,
  "isNewDailyVisitor": true
}
```

**`GET /api/visits`** — returns stats without recording

```json
{
  "uniqueVisitors": 1337,
  "todayUniqueVisitors": 42,
  "pageViews": 5000
}
```

### How it works

- Visitors are identified by a SHA-256 hash of IP + User-Agent (no raw PII stored — only hashes).
- The schema stores **one row per visitor per day**. Recording a visit does an
  `INSERT ... ON CONFLICT DO UPDATE` that bumps a `pageViews` counter, so repeat visits
  in the same day never inflate the unique count.
- New-visitor detection uses Postgres's `xmax = 0` trick on the upsert's `RETURNING` clause.
- A 5-second in-memory count cache means most requests skip the count query entirely.
  The cache increments locally on new visitors so it stays accurate within the window.

---

## 🌗 Dark Mode

Theming is **class-based** (not `prefers-color-scheme`). This is important: Tailwind CSS v4's
`dark:` variant targets the media query by default. This project overrides it in
`src/app/globals.css`:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

So every `dark:` utility follows the `.dark` class on `<html>`, which is toggled by
`ThemeToggle.tsx`. An inline script in `src/app/layout.tsx` reads the stored preference
**before paint**, so there's no flash of the wrong theme on load.

The toggle uses a circular clip-path reveal animation (via the Web Animations API) that
expands from the button position.

---

## 🔍 SEO

- **Metadata** — title templates, description, keywords, authors in `src/app/layout.tsx`
- **Open Graph & Twitter** — cards with a dynamically generated 1200×630 OG image
  (`src/app/opengraph-image.tsx`, rendered with `next/og`)
- **Sitemap** — auto-generated at `/sitemap.xml` from `src/app/sitemap.ts`
- **Robots** — `/robots.txt` from `src/app/robots.ts` (allows crawling, disallows `/api/`)
- **Canonical URLs** — per-page via `alternates.canonical`
- **JSON-LD** — `Person` schema on the home page (`PersonJsonLd.tsx`)
- **Web Manifest** — `/manifest.webmanifest` for PWA install metadata
- **Favicon** — generated from the logo at multiple sizes (`icon.png`, `apple-icon.png`, `favicon.ico`)

> Remember to set `NEXT_PUBLIC_SITE_URL` to your production domain, or all canonical/OG/sitemap
> URLs will point to the placeholder.

---

## 🎨 Customization

Most content lives in `src/data/` — edit these files to make the site yours:

- **`site.ts`** — name, title, summary, email, phone, social links, nav links
- **`projects.ts`** — project entries (title, year, tech, description, live/GitHub links, logo)
- **`experience.ts`** — work experience and skill groups
- **`inspiration.ts`** — people who inspire you (with links and notes)
- **`tech.ts`** — maps technology names to icons in `public/tech/`

Replace the images in `public/` (logo, project logos/previews, tech icons) with your own.

---

## 📦 Deployment

Optimized for **Vercel**:

1. Push this repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add environment variables:
   - `DATABASE_URL` — your Neon connection string
   - `NEXT_PUBLIC_SITE_URL` — your deployed domain (e.g. `https://your-domain.com`)
4. Deploy

Any other Next.js-compatible host works too — just make sure to run `npx drizzle-kit push`
against your database first.

---

## 📝 Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `bun run dev`     | Start the development server         |
| `bun run build`   | Create a production build            |
| `bun run start`   | Serve the production build           |
| `bun run lint`    | Run eslint                           |
| `npx drizzle-kit push` | Sync the DB schema with Neon    |

---

## 📄 License

This is a personal portfolio. The design is inspired by [Manu Arora](https://www.manuarora.in/).
Feel free to look at the code and learn from it, but please don't copy it verbatim.

---

## 👤 Author

**Rahul Sain** — Full Stack Developer

- Website: [portfolio](https://rahulxcode.vercel.app/)
- GitHub: [@Anos714](https://github.com/Anos714)
- X/Twitter: [@RahulSain714](https://x.com/RahulSain714)
- LinkedIn: [rahulxcode](https://www.linkedin.com/in/rahulxcode/)
