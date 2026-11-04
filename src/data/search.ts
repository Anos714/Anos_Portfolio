import { navLinks, socials } from "./site";
import { projects } from "./projects";
import { tools } from "./tools";

export type SearchGroup = "Pages" | "Projects" | "Tools" | "Elsewhere" | "Actions";

export type SearchItem = {
  group: SearchGroup;
  title: string;
  detail: string;
  hint: string;
  href: string;
  /** Relative hrefs navigate in-app; anything else opens in a new tab. */
  external: boolean;
  keywords: string;
  action?: "copy-email";
};

export type SearchSection = { group: SearchGroup; items: SearchItem[] };

const groupOrder: SearchGroup[] = [
  "Pages",
  "Projects",
  "Tools",
  "Elsewhere",
  "Actions",
];

const index: SearchItem[] = [
  ...navLinks.map((link) => ({
    group: "Pages" as const,
    title: link.label,
    detail: link.href === "/" ? "Top of the site" : `${link.label} page`,
    hint: link.href,
    href: link.href,
    external: false,
    keywords: `page go to navigate ${link.label.toLowerCase()}`,
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
  ...socials.map((social) => {
    const mailto = social.href.startsWith("mailto:");
    return {
      group: "Elsewhere" as const,
      title: social.label,
      detail: mailto ? social.href.slice("mailto:".length) : social.preview.domain,
      hint: mailto ? "write ↗" : "open ↗",
      href: social.href,
      external: !mailto,
      keywords: `social contact ${social.label.toLowerCase()} ${social.preview.domain}`,
    };
  }),
];

function score(item: SearchItem, tokens: string[]): number {
  if (tokens.length === 0) return 0;

  const title = item.title.toLowerCase();
  const haystack = `${title} ${item.detail} ${item.keywords}`.toLowerCase();
  if (!tokens.every((token) => haystack.includes(token))) return -1;

  if (title.startsWith(tokens[0])) return 0;
  if (title.includes(tokens[0])) return 1;
  return 2;
}

/**
 * Empty query shows a short preview of every group; a query searches
 * title, subtitle and keywords and keeps the group headings.
 */
export function searchGroups(query: string): SearchSection[] {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matched = index
    .map((item) => ({ item, score: score(item, tokens) }))
    .filter((entry) => entry.score >= 0)
    .sort(
      (a, b) =>
        a.score - b.score ||
        groupOrder.indexOf(a.item.group) - groupOrder.indexOf(b.item.group),
    );

  const cap = tokens.length > 0 ? 6 : 4;
  const sections: SearchSection[] = [];

  for (const group of groupOrder) {
    const items = matched
      .filter((entry) => entry.item.group === group)
      .slice(0, cap)
      .map((entry) => entry.item);
    if (items.length > 0) sections.push({ group, items });
  }

  return sections;
}
