"use client";

import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import { StarRating } from "./StarRating";
import { postEntry, signOutAction } from "@/app/guestbook/actions";
import type { EntryFormState } from "@/app/guestbook/actions";
import { signIn } from "@/lib/auth-client";

const MAX_COMMENT_LENGTH = 500;

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 002.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

export function GuestbookForm({
  user,
  existingEntry,
  callbackURL = "/guestbook",
}: {
  user: { name: string; email: string; image?: string | null } | null;
  existingEntry?: { rating: number; comment: string | null } | null;
  callbackURL?: string;
}) {
  const [rating, setRating] = useState<number>(existingEntry?.rating ?? 0);
  const [comment, setComment] = useState<string>(existingEntry?.comment ?? "");
  const [state, formAction, isPending] = useActionState<
    EntryFormState,
    FormData
  >(postEntry, {});

  // Not signed in — the only thing to show is the Google sign-in button.
  if (!user) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-dashed border-neutral-300 p-5 dark:border-neutral-700">
        <p className="text-sm text-foreground/70">
          Sign in with Google to rate my work and leave a comment.
        </p>
        <button
          type="button"
          onClick={() =>
            signIn.social({
              provider: "google",
              callbackURL,
            })
          }
          className="inline-flex w-fit items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </div>
    );
  }

  const hasRated = rating >= 1 && rating <= 5;

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex items-center gap-3">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            className="size-9 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-800"
          />
        ) : (
          <span className="grid size-9 place-items-center rounded-full bg-neutral-200 font-mono text-xs font-medium dark:bg-neutral-800">
            {(user.name[0] ?? "?").toUpperCase()}
          </span>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {user.name}
          </span>
          <span className="text-xs text-foreground/40">
            Signed in as {user.email}
          </span>
        </div>
        <button
          type="button"
          onClick={() => signOutAction()}
          className="ml-auto text-xs text-foreground/40 transition-colors hover:text-foreground"
        >
          Sign out
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium uppercase tracking-wide text-foreground/50">
          Your rating
        </label>
        <StarRating value={rating} onChange={setRating} size={26} />
        {!hasRated && (
          <p className="text-xs text-foreground/40">Pick 1–5 stars</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="comment"
          className="text-xs font-medium uppercase tracking-wide text-foreground/50"
        >
          Comment <span className="font-normal lowercase">(optional)</span>
        </label>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={MAX_COMMENT_LENGTH}
          rows={3}
          placeholder="Say something about my work…"
          className="resize-none rounded-md border border-neutral-200 bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus-visible:border-foreground/40 dark:border-neutral-800"
        />
        <span className="text-right text-xs text-foreground/30">
          {comment.length}/{MAX_COMMENT_LENGTH}
        </span>
      </div>

      {/* Hidden rating value — submitted with the FormData. */}
      <input type="hidden" name="rating" value={rating} />

      {state.error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-foreground/70"
        >
          {state.error}
        </motion.p>
      )}

      <button
        type="submit"
        disabled={isPending || !hasRated}
        className="inline-flex w-fit items-center gap-2 rounded-md bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isPending
          ? "Posting…"
          : existingEntry
            ? "Update your rating"
            : "Post to guestbook"}
      </button>
    </form>
  );
}
