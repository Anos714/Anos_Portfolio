export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWeek = ContributionDay[];

const GITHUB_USERNAME = "Anos714";
const CONTRIBUTIONS_URL = `https://github.com/users/${GITHUB_USERNAME}/contributions`;

const DAY_RE =
  /<td[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
const ATTR_RE = /([\w-]+)="([^"]*)"/g;
const TOOLTIP_RE =
  /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/;

function parseAttrs(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  let m: RegExpExecArray | null;
  ATTR_RE.lastIndex = 0;
  while ((m = ATTR_RE.exec(tag)) !== null) {
    attrs[m[1]] = m[2];
  }
  return attrs;
}

/**
 * Scrapes GitHub's public contribution calendar. GitHub renders the heatmap as
 * <td> cells carrying data-date/data-level, with the contribution count living
 * in a matching <tool-tip> element keyed by the cell id. Returns null on any
 * failure so the section can gracefully hide instead of breaking the page.
 */
export async function getContributions(): Promise<ContributionWeek[] | null> {
  try {
    const res = await fetch(CONTRIBUTIONS_URL, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      },
      next: { revalidate: 21600 },
    });
    if (!res.ok) return null;

    const html = await res.text();

    const tooltips = new Map<string, string>();
    let tip: RegExpExecArray | null;
    const tipRe = new RegExp(TOOLTIP_RE.source, "g");
    while ((tip = tipRe.exec(html)) !== null) {
      tooltips.set(tip[1], tip[2]);
    }

    const days: ContributionDay[] = [];
    let match: RegExpExecArray | null;
    const dayRe = new RegExp(DAY_RE.source, "g");
    while ((match = dayRe.exec(html)) !== null) {
      const attrs = parseAttrs(match[0]);
      const date = attrs["data-date"];
      const level = Number(attrs["data-level"]);
      const id = attrs["id"];
      if (!date || !id || !Number.isInteger(level) || level < 0 || level > 4) {
        continue;
      }

      const tipText = (tooltips.get(id) ?? "").replace(/<[^>]+>/g, "").trim();
      const count = tipText.startsWith("No contributions")
        ? 0
        : Number((tipText.match(/(\d+)/) ?? [])[1] ?? 0);

      days.push({ date, count, level: level as 0 | 1 | 2 | 3 | 4 });
    }

    if (days.length === 0) return null;

    const weeks: ContributionWeek[] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  } catch {
    return null;
  }
}

export function formatContributionDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
