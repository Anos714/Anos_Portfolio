import { and, asc, count, desc, eq, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { guestbook } from "@/db/schema";

export type GuestbookEntry = {
  id: string;
  userId: string;
  name: string;
  avatarUrl: string | null;
  rating: number;
  comment: string | null;
  createdAt: Date;
};

// Shape stored in the cache. `unstable_cache` serializes the return value, so
// Dates travel as ISO strings and are rebuilt after the cache boundary by
// `toEntry` — calling date methods on a cached string otherwise throws.
type SerializedEntry = Omit<GuestbookEntry, "createdAt"> & {
  createdAt: string;
};

// All cached guestbook reads share this tag so a single updateTag("guestbook")
// from a Server Action refreshes every view (home preview + full page) without
// touching unrelated caches — revalidatePath("/") would also purge the external
// blog fetch, blocking the UI until that slow request finishes.
const GUESTBOOK_TAG = "guestbook";
// Fallback freshness window. Every mutation invalidates the tag explicitly, so
// this only bounds staleness for changes made directly in the database.
const GUESTBOOK_REVALIDATE = 300; // 5 minutes

const visible = eq(guestbook.hidden, false);

function toSerializedEntry(row: typeof guestbook.$inferSelect): SerializedEntry {
  return {
    id: row.id,
    userId: row.userId,
    name: row.name,
    avatarUrl: row.avatarUrl,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.createdAt.toISOString(),
  };
}

function toEntry(entry: SerializedEntry): GuestbookEntry {
  return { ...entry, createdAt: new Date(entry.createdAt) };
}

const getCachedGuestbookEntries = unstable_cache(
  async ({
    page = 1,
    limit = 6,
  }: {
    page?: number;
    limit?: number;
  } = {}): Promise<{
    entries: SerializedEntry[];
    total: number;
    totalPages: number;
  }> => {
    const safePage = Math.max(1, page);
    const offset = (safePage - 1) * limit;

    const [rows, [totalRow]] = await Promise.all([
      db
        .select()
        .from(guestbook)
        .where(visible)
        .orderBy(desc(guestbook.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ value: count() }).from(guestbook).where(visible),
    ]);

    const total = Number(totalRow?.value ?? 0);
    return {
      entries: rows.map(toSerializedEntry),
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  },
  ["guestbook-entries"],
  { tags: [GUESTBOOK_TAG], revalidate: GUESTBOOK_REVALIDATE },
);

/**
 * Paginated guestbook list, newest first. Public reads only ever see
 * entries that haven't been hidden by moderation.
 */
export async function getGuestbookEntries({
  page = 1,
  limit = 6,
}: {
  page?: number;
  limit?: number;
} = {}): Promise<{ entries: GuestbookEntry[]; total: number; totalPages: number }> {
  const { entries, ...rest } = await getCachedGuestbookEntries({ page, limit });
  return { ...rest, entries: entries.map(toEntry) };
}

const getCachedRecentGuestbookEntries = unstable_cache(
  async (limit: number): Promise<SerializedEntry[]> => {
    const rows = await db
      .select()
      .from(guestbook)
      .where(visible)
      .orderBy(desc(guestbook.createdAt))
      .limit(limit);
    return rows.map(toSerializedEntry);
  },
  ["guestbook-recent"],
  { tags: [GUESTBOOK_TAG], revalidate: GUESTBOOK_REVALIDATE },
);

/** Latest entries for the home-page preview. */
export async function getRecentGuestbookEntries(
  limit = 3,
): Promise<GuestbookEntry[]> {
  const rows = await getCachedRecentGuestbookEntries(limit);
  return rows.map(toEntry);
}

/** Highest-rated entries first — used for the home preview when there is
 *  enough data to make an average meaningful. */
const getCachedTopGuestbookEntries = unstable_cache(
  async (limit: number): Promise<SerializedEntry[]> => {
    const rows = await db
      .select()
      .from(guestbook)
      .where(visible)
      .orderBy(desc(guestbook.rating), desc(guestbook.createdAt))
      .limit(limit);
    return rows.map(toSerializedEntry);
  },
  ["guestbook-top"],
  { tags: [GUESTBOOK_TAG], revalidate: GUESTBOOK_REVALIDATE },
);

export async function getTopGuestbookEntries(
  limit = 3,
): Promise<GuestbookEntry[]> {
  const rows = await getCachedTopGuestbookEntries(limit);
  return rows.map(toEntry);
}

const getCachedGuestbookStats = unstable_cache(
  async (): Promise<{ count: number; average: number }> => {
    const [row] = await db
      .select({
        count: count(),
        average: sql<number>`coalesce(round(avg(${guestbook.rating}), 1), 0)`,
      })
      .from(guestbook)
      .where(visible);

    return {
      count: Number(row?.count ?? 0),
      average: Number(row?.average ?? 0),
    };
  },
  ["guestbook-stats"],
  { tags: [GUESTBOOK_TAG], revalidate: GUESTBOOK_REVALIDATE },
);

export async function getGuestbookStats(): Promise<{
  count: number;
  average: number;
}> {
  return getCachedGuestbookStats();
}

const getCachedGuestbookEntryByUser = unstable_cache(
  async (userId: string): Promise<SerializedEntry | null> => {
    const [row] = await db
      .select()
      .from(guestbook)
      .where(and(eq(guestbook.userId, userId), visible))
      .orderBy(asc(guestbook.createdAt))
      .limit(1);
    return row ? toSerializedEntry(row) : null;
  },
  ["guestbook-entry-by-user"],
  { tags: [GUESTBOOK_TAG], revalidate: GUESTBOOK_REVALIDATE },
);

export async function getGuestbookEntryByUser(
  userId: string,
): Promise<GuestbookEntry | null> {
  const row = await getCachedGuestbookEntryByUser(userId);
  return row ? toEntry(row) : null;
}
