import { navLinks, socials, site, education, resumeUrl } from "./site";
import { projects } from "./projects";
import { tools } from "./tools";
import { inspirations } from "./inspiration";
import { experience } from "./experience";
import { blogUrl, type Blog } from "./blogs";

export type SearchGroup =
  | "Pages"
  | "Projects"
  | "Tools"
  | "Blogs"
  | "Resume"
  | "Elsewhere"
  | "Inspiration"
  | "Actions";

export type SearchItem = {
  group: SearchGroup;
  title: string;
  detail: string;
  hint: string;
  href: string;
  /** Relative hrefs navigate in-app; anything else opens in a new tab. */
  external: boolean;
  keywords: string;
  action?: "copy-email" | "book-call";
};

export type SearchSection = { group: SearchGroup; items: SearchItem[] };

const groupOrder: SearchGroup[] = [
  "Pages",
  "Projects",
  "Tools",
  "Blogs",
  "Resume",
  "Elsewhere",
  "Inspiration",
  "Actions",
];

/**
 * What the palette shows before the visitor types. Resume sections and
 * inspiration links stay out of the preview so the list stays scannable;
 * they surface as soon as a query mentions them.
 */
const previewLimits: Partial<Record<SearchGroup, number>> = {
  Pages: 4,
  Projects: 3,
  Tools: 2,
  Blogs: 3,
  Elsewhere: 5,
  Actions: 1,
};

const pageKeywords: Record<string, string> = {
  "/": "home start landing about me profile intro",
  "/projects": "case studies portfolio things i built",
  "/tools": "utilities experiments apps",
  "/work": "experience job freelance career skills tech stack",
  "/blogs": "articles writing posts inkwell read",
  "/guestbook": "sign comments messages visitors",
  "/inspiration": "people i follow heroes respect",
  "/resume": "cv curriculum vitae pdf hire download",
};

const resumeItems: SearchItem[] = [
  {
    group: "Resume",
    title: "Resume",
    detail: "Latest CV — embedded PDF",
    hint: "open →",
    href: "/resume",
    external: false,
    keywords: "cv curriculum vitae pdf hire profile download print",
  },
  {
    group: "Resume",
    title: "Resume PDF",
    detail: "Open the PDF in a new tab",
    hint: "open ↗",
    href: resumeUrl,
    external: true,
    keywords: "cv curriculum vitae drive download print file",
  },
  {
    group: "Resume",
    title: "Education",
    detail: `${education.degree.replace(" in ", " · ")} · ${education.university}`,
    hint: "/resume",
    href: "/resume",
    external: false,
    keywords: `college university degree btech computer science ${education.university} ${education.duration} study`,
  },
  {
    group: "Resume",
    title: "Experience",
    detail: `${experience.role} · ${experience.type} · ${experience.duration}`,
    hint: "/work",
    href: "/work",
    external: false,
    keywords: "job work freelance career employment role company",
  },
  {
    group: "Resume",
    title: "Skills",
    detail: "React, Next.js, Node.js, TypeScript, PostgreSQL…",
    hint: "/work",
    href: "/work",
    external: false,
    keywords:
      "tech stack languages frameworks tools backend frontend java javascript typescript sql docker redis",
  },
];

const bookingItem: SearchItem = {
  group: "Elsewhere",
  title: "Book a call",
  detail: "30 min · Google Meet",
  hint: "schedule ↗",
  href: site.cal,
  external: true,
  keywords:
    "cal cal.com schedule meeting book appointment call intro chat got a project in mind hire freelance 30min google meet calendar",
  action: "book-call",
};

const actionItems: SearchItem[] = [
  {
    group: "Actions",
    title: "Copy email address",
    detail: site.email,
    hint: "clipboard",
    href: "",
    external: false,
    keywords: "copy email mail contact write reach out",
    action: "copy-email",
  },
];

const index: SearchItem[] = [
  ...navLinks.map((link) => ({
    group: "Pages" as const,
    title: link.label,
    detail: link.href === "/" ? "Top of the site" : `${link.label} page`,
    hint: link.href,
    href: link.href,
    external: false,
    keywords: `page go to navigate ${link.label.toLowerCase()} ${
      pageKeywords[link.href] ?? ""
    }`,
  })),
  ...projects.map((project) => ({
    group: "Projects" as const,
    title: project.title,
    detail: project.tech.slice(0, 4).join(" · "),
    hint: project.live ? "live ↗" : "github ↗",
    href: project.live ?? project.github,
    external: true,
    keywords: `${project.title} ${project.tech.join(" ")} ${project.description[0]}`,
  })),
  ...tools.map((tool) => ({
    group: "Tools" as const,
    title: tool.title,
    detail: tool.tech.slice(0, 4).join(" · "),
    hint: "github ↗",
    href: tool.github,
    external: true,
    keywords: `${tool.title} ${tool.tech.join(" ")} ${tool.description}`,
  })),
  ...resumeItems,
  bookingItem,
  ...socials.map((social) => {
    const mailto = social.href.startsWith("mailto:");
    return {
      group: "Elsewhere" as const,
      title: social.label,
      detail: mailto ? social.href.slice("mailto:".length) : social.preview.domain,
      hint: mailto ? "write ↗" : "open ↗",
      href: social.href,
      external: !mailto,
      keywords: `social contact link ${social.label.toLowerCase()} ${social.preview.domain} ${
        social.label === "X / Twitter" ? "twitter" : ""
      }`,
    };
  }),
  ...inspirations.map((person) => ({
    group: "Inspiration" as const,
    title: person.name,
    detail: person.note,
    hint: "visit ↗",
    href: person.href,
    external: true,
    keywords: `inspiration people i follow respect ${person.name} ${person.note}`,
  })),
  ...actionItems,
];

/** Turn the blog feed into palette entries (fetched once, client side). */
export function blogSearchItems(posts: Blog[]): SearchItem[] {
  return posts.map((post) => ({
    group: "Blogs" as const,
    title: post.title,
    detail: [post.date, "inkwell blogs"].filter(Boolean).join(" · "),
    hint: "read ↗",
    href: blogUrl(post.slug),
    external: true,
    keywords: `blog article post writing read inkwell ${post.title}`,
  }));
}

function score(item: SearchItem, tokens: string[]): number {
  if (tokens.length === 0) return 0;

  const title = item.title.toLowerCase();
  const detail = item.detail.toLowerCase();
  const keywords = item.keywords.toLowerCase();
  const haystack = `${title} ${detail} ${keywords}`;
  if (!tokens.every((token) => haystack.includes(token))) return -1;

  if (title === tokens.join(" ")) return 0;
  if (title.startsWith(tokens[0])) return 1;

  const words = title.split(/[\s\-/&·]+/).filter(Boolean);
  if (tokens.every((token) => words.some((word) => word.startsWith(token)))) {
    return 2;
  }
  if (title.includes(tokens[0])) return 3;
  if (detail.includes(tokens[0])) return 4;
  if (keywords.includes(tokens[0])) return 5;
  return 6;
}

/**
 * Empty query shows a short preview of the useful groups; a query searches
 * titles, subtitles and keywords, then keeps the group headings in order.
 * `extra` carries dynamic entries (blog posts) that only exist client side.
 */
export function searchGroups(
  query: string,
  extra: SearchItem[] = [],
): SearchSection[] {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const preview = tokens.length === 0;
  const source = extra.length > 0 ? [...index, ...extra] : index;

  const matched = source
    .map((item) => ({ item, score: score(item, tokens) }))
    .filter((entry) => entry.score >= 0)
    .sort(
      (a, b) =>
        a.score - b.score ||
        groupOrder.indexOf(a.item.group) - groupOrder.indexOf(b.item.group),
    );

  const sections: SearchSection[] = [];
  const bestScore = new Map<SearchGroup, number>();

  for (const group of groupOrder) {
    const limit = preview ? previewLimits[group] ?? 4 : 8;
    if (preview && !previewLimits[group]) continue;

    const groupEntries = matched.filter((entry) => entry.item.group === group);
    if (groupEntries.length === 0) continue;

    sections.push({
      group,
      items: groupEntries.slice(0, limit).map((entry) => entry.item),
    });
    bestScore.set(group, groupEntries[0].score);
  }

  // Preview keeps the familiar page order. While searching, the group with
  // the strongest match floats up so "call" puts Book a call first instead of
  // burying it under keyword matches from project descriptions.
  if (!preview) {
    sections.sort(
      (a, b) =>
        (bestScore.get(a.group) ?? 99) - (bestScore.get(b.group) ?? 99) ||
        groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group),
    );
  }

  return sections;
}
