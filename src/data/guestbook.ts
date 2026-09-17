import { and, asc, count, desc, eq, sql } from "drizzle-orm";
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

const visible = eq(guestbook.hidden, false);

function toEntry(row: typeof guestbook.$inferSelect): GuestbookEntry {
  return {
    id: row.id,
    userId: row.userId,
    name: row.name,
    avatarUrl: row.avatarUrl,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.createdAt,
  };
}

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
} = {}): Promise<{
  entries: GuestbookEntry[];
  total: number;
  totalPages: number;
}> {
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
    entries: rows.map(toEntry),
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

/** Latest entries for the home-page preview. */
export async function getRecentGuestbookEntries(
  limit = 3,
): Promise<GuestbookEntry[]> {
  const rows = await db
    .select()
    .from(guestbook)
    .where(visible)
    .orderBy(desc(guestbook.createdAt))
    .limit(limit);
  return rows.map(toEntry);
}

/** Highest-rated entries first — used for the home preview when there is
 *  enough data to make an average meaningful. */
export async function getTopGuestbookEntries(
  limit = 3,
): Promise<GuestbookEntry[]> {
  const rows = await db
    .select()
    .from(guestbook)
    .where(visible)
    .orderBy(desc(guestbook.rating), desc(guestbook.createdAt))
    .limit(limit);
  return rows.map(toEntry);
}

export async function getGuestbookStats(): Promise<{
  count: number;
  average: number;
}> {
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
}

export async function getGuestbookEntryByUser(
  userId: string,
): Promise<GuestbookEntry | null> {
  const [row] = await db
    .select()
    .from(guestbook)
    .where(and(eq(guestbook.userId, userId), visible))
    .orderBy(asc(guestbook.createdAt))
    .limit(1);
  return row ? toEntry(row) : null;
}
