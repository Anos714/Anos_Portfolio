"use client";

import React from "react";

export function VisitorCount() {
  const [count, setCount] = React.useState<number | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function record() {
      try {
        const res = await fetch("/api/visits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer || null,
          }),
        });
        const data = await res.json();
        if (!cancelled && typeof data.uniqueVisitors === "number") {
          setCount(data.uniqueVisitors);
        }
      } catch {
        if (!cancelled) setCount(null);
      }
    }

    record();
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 font-mono text-xs font-light text-foreground/50 transition-colors duration-200 hover:border-neutral-300 hover:text-foreground/70 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
      </span>
      <span className="tabular-nums">
        {count.toLocaleString()} unique{" "}
        {count === 1 ? "visitor" : "visitors"}
      </span>
    </span>
  );
}
