"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { Blog } from "@/data/blogs";
import { BlogsList } from "./BlogsList";
import { SearchIcon } from "@/components/icons/SearchIcon";

export function BlogSearch({ posts }: { posts: Blog[] }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(() => {
    if (!deferred) return posts;
    return posts.filter((p) => p.title.toLowerCase().includes(deferred));
  }, [deferred, posts]);

  const hasQuery = deferred.length > 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setQuery("");
          }}
          placeholder="Search posts…"
          aria-label="Search posts"
          className="w-full rounded-lg border border-neutral-200 bg-neutral-50/50 py-2.5 pl-10 pr-4 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-neutral-400 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900/50 dark:focus:border-neutral-600 dark:focus:bg-neutral-900"
        />
      </div>

      {hasQuery && (
        <p className="font-mono text-xs text-foreground/40">
          {filtered.length} {filtered.length === 1 ? "match" : "matches"} for “
          {query.trim()}”
        </p>
      )}

      {filtered.length > 0 ? (
        <BlogsList posts={filtered} />
      ) : (
        <p className="text-sm text-foreground/50">
          No posts match “{query.trim()}”. Try a different keyword.
        </p>
      )}
    </div>
  );
}
