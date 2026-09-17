import Link from "next/link";
import { GuestbookEntryCard } from "./GuestbookEntryCard";
import type { GuestbookEntry } from "@/data/guestbook";

const PAGE_SIZE = 6;

export function GuestbookList({
  entries,
  total,
  page,
  currentUserId,
}: {
  entries: GuestbookEntry[];
  total: number;
  page: number;
  currentUserId?: string;
}) {
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (entries.length === 0) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border border-dashed border-neutral-300 p-8 text-center dark:border-neutral-700">
        <p className="text-sm font-medium text-foreground">
          No guestbook entries yet
        </p>
        <p className="text-sm text-foreground/50">
          Be the first to leave a rating — sign in above.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-foreground/40">
        {total} {total === 1 ? "entry" : "entries"}
      </p>

      <div className="flex flex-col gap-4">
        {entries.map((entry) => (
          <GuestbookEntryCard
            key={entry.id}
            entry={entry}
            isOwner={entry.userId === currentUserId}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-2 flex items-center justify-between">
          {page > 1 ? (
            <Link
              href={`/guestbook?page=${page - 1}`}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
              prefetch
            >
              <span className="mr-1.5">←</span>
              Newer
            </Link>
          ) : (
            <span className="text-sm text-foreground/20">← Newer</span>
          )}

          <span className="font-mono text-xs text-foreground/40">
            {page} / {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={`/guestbook?page=${page + 1}`}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
              prefetch
            >
              Older
              <span className="ml-1.5">→</span>
            </Link>
          ) : (
            <span className="text-sm text-foreground/20">Older →</span>
          )}
        </div>
      )}
    </div>
  );
}
