"use server";

import { and, eq, sql } from "drizzle-orm";
import { updateTag } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { guestbook } from "@/db/schema";

const MAX_COMMENT_LENGTH = 500;
const RATE_LIMIT_MS = 60_000;

// Best-effort, in-memory per-user throttle. A single server instance is the
// common deployment for a portfolio; this stops rapid double-posts.
const lastPostAt = new Map<string, number>();

export type EntryFormState = {
  error?: string;
  success?: boolean;
  rating?: number;
  comment?: string;
};

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function postEntry(
  _prevState: EntryFormState,
  formData: FormData,
): Promise<EntryFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Please sign in with Google to leave a rating." };
  }

  const rating = Number(formData.get("rating"));
  const comment = String(formData.get("comment") ?? "").trim();

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return {
      error: "Choose a rating from 1 to 5 stars.",
      comment,
    };
  }

  if (comment.length > MAX_COMMENT_LENGTH) {
    return {
      error: `Comments are limited to ${MAX_COMMENT_LENGTH} characters.`,
      rating,
      comment,
    };
  }

  const now = Date.now();
  const last = lastPostAt.get(session.user.id) ?? 0;
  if (now - last < RATE_LIMIT_MS) {
    return {
      error: "Slow down — you can update your rating again in a minute.",
      rating,
      comment,
    };
  }
  lastPostAt.set(session.user.id, now);

  try {
    // One row per user: posting again updates the existing entry.
    await db
      .insert(guestbook)
      .values({
        userId: session.user.id,
        name: session.user.name,
        email: session.user.email,
        avatarUrl: session.user.image,
        rating,
        comment: comment || null,
      })
      .onConflictDoUpdate({
        target: guestbook.userId,
        set: {
          rating,
          comment: comment || null,
          name: session.user.name,
          email: session.user.email,
          avatarUrl: session.user.image,
          updatedAt: sql`now()`,
        },
      });
  } catch {
    return {
      error: "Something went wrong posting your rating. Please try again.",
      rating,
      comment,
    };
  }

  // Refresh only guestbook-tagged reads so the new entry is visible right away
  // (read-your-own-writes). revalidatePath("/") would also purge the external
  // blog fetch, blocking this response until that slow request finishes.
  updateTag("guestbook");

  return { success: true, rating, comment };
}

export async function deleteEntry(
  _prevState: EntryFormState,
  formData: FormData,
): Promise<EntryFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Please sign in to delete your entry." };
  }

  const id = String(formData.get("id") ?? "");

  // Ownership check in the WHERE clause — a user can only ever delete their own
  // row. No client-supplied fields are trusted beyond the id.
  await db
    .delete(guestbook)
    .where(
      and(eq(guestbook.id, id), eq(guestbook.userId, session.user.id)),
    );

  updateTag("guestbook");

  return { success: true };
}

export async function signOutAction() {
  await auth.api.signOut({ headers: await headers() });
  updateTag("guestbook");
}
