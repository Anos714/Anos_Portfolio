"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StarRating } from "./StarRating";
import { useTransition } from "react";
import { formatRelativeTime, getInitials } from "@/lib/utils";
import type { GuestbookEntry } from "@/data/guestbook";
import { deleteEntry } from "@/app/guestbook/actions";

function Avatar({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl: string | null;
}) {
  const size = 36;
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={size}
        height={size}
        className="size-9 shrink-0 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-800"
        unoptimized
      />
    );
  }
  return (
    <span
      className="grid size-9 shrink-0 place-items-center rounded-full bg-neutral-100 font-mono text-xs font-medium text-foreground/70 ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-800"
      aria-hidden="true"
    >
      {getInitials(name) || "?"}
    </span>
  );
}

export function GuestbookEntryCard({
  entry,
  isOwner = false,
}: {
  entry: GuestbookEntry;
  isOwner?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex items-center gap-3">
        <Avatar name={entry.name} avatarUrl={entry.avatarUrl} />

        <div className="flex min-w-0 flex-col">
          <span className="flex items-center gap-1.5 truncate text-sm font-medium text-foreground">
            {entry.name}
            <svg
              viewBox="0 0 24 24"
              className="size-3.5 shrink-0 text-foreground/40"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
          <span className="text-xs text-foreground/40">
            {formatRelativeTime(entry.createdAt)}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <StarRating value={entry.rating} readOnly size={14} />
          {isOwner && (
            <form
              action={(formData) =>
                startTransition(async () => {
                  await deleteEntry({ success: false }, formData);
                })
              }
            >
              <input type="hidden" name="id" value={entry.id} />
              <button
                type="submit"
                disabled={isPending}
                className="text-xs text-foreground/40 transition-colors hover:text-foreground disabled:opacity-50"
                title="Delete your entry"
                aria-label="Delete your entry"
              >
                {isPending ? "Deleting…" : "Delete"}
              </button>
            </form>
          )}
        </div>
      </div>

      {entry.comment && (
        <p className="text-sm leading-relaxed text-foreground/80 text-pretty">
          {entry.comment}
        </p>
      )}
    </motion.article>
  );
}
