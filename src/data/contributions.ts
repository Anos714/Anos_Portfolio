export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWeek = ContributionDay[];

const GITHUB_USERNAME = "Anos714";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

// GitHub's default contribution color scale, index = level. Used to map the
// exact `color` the API returns back to a 0–4 level.
const LEVEL_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

const CALENDAR_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

type CalendarDay = {
  date?: unknown;
  contributionCount?: unknown;
  color?: unknown;
};

type CalendarWeek = {
  contributionDays?: unknown;
};

function levelFromColor(color: string): ContributionDay["level"] | null {
  const index = LEVEL_COLORS.indexOf(color.toLowerCase());
  return index === -1 ? null : (index as ContributionDay["level"]);
}

/**
 * Yearly contribution calendar from GitHub's official GraphQL API —
 * the same data source your profile page uses, so counts and levels
 * always match. Needs a `GITHUB_TOKEN` env var (server-only, never
 * exposed to the browser). Returns null on any failure so the section
 * can gracefully hide instead of breaking the page.
 */
export async function getContributions(): Promise<ContributionWeek[] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("[contributions] GITHUB_TOKEN is not set — hiding section");
    return null;
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Anos-Portfolio",
      },
      body: JSON.stringify({
        query: CALENDAR_QUERY,
        variables: { login: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`[contributions] GitHub API responded ${res.status}`);
      return null;
    }

    const json: unknown = await res.json();
    if (
      typeof json !== "object" ||
      json === null ||
      !("data" in json) ||
      typeof (json as { data?: unknown }).data !== "object"
    ) {
      console.warn("[contributions] unexpected API response shape");
      return null;
    }
    const calendar = (
      json as {
        data: {
          user?: {
            contributionsCollection?: {
              contributionCalendar?: { weeks?: unknown };
            };
          } | null;
        } | null;
      }
    ).data?.user?.contributionsCollection?.contributionCalendar;
    const weeks: CalendarWeek[] = Array.isArray(calendar?.weeks)
      ? (calendar.weeks as CalendarWeek[])
      : [];
    if (weeks.length === 0) return null;

    // Max count across the year — fallback for levels when a color
    // doesn't match the known scale (e.g. custom GitHub themes).
    const max = weeks.reduce((m, w) => {
      const days: CalendarDay[] = Array.isArray(w?.contributionDays)
        ? (w.contributionDays as CalendarDay[])
        : [];
      for (const d of days) {
        const c = Number(d?.contributionCount);
        if (Number.isFinite(c) && c > m) m = c;
      }
      return m;
    }, 0);

    const result: ContributionWeek[] = [];
    for (const w of weeks) {
      const raw: CalendarDay[] = Array.isArray(w?.contributionDays)
        ? (w.contributionDays as CalendarDay[])
        : [];
      const days: ContributionDay[] = [];
      for (const d of raw) {
        if (typeof d?.date !== "string") continue;
        const count = Number(d.contributionCount);
        const safeCount =
          Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
        let level =
          typeof d.color === "string" ? levelFromColor(d.color) : null;
        if (level === null) {
          level =
            safeCount <= 0 || max <= 0
              ? 0
              : (Math.min(
                  4,
                  Math.ceil((safeCount / max) * 4),
                ) as ContributionDay["level"]);
        }
        days.push({ date: d.date, count: safeCount, level });
      }
      if (days.length > 0) result.push(days);
    }

    return result.length > 0 ? result : null;
  } catch (err) {
    console.warn("[contributions] fetch failed:", err);
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
