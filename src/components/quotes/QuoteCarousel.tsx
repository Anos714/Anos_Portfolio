"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Quote } from "@/data/quotes";
import { QuoteIcon } from "@/components/icons/QuoteIcon";
import { cn } from "@/lib/utils";

const ROTATION_MS = 9000;

export function QuoteCarousel({ quotes }: { quotes: Quote[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const auto = !reduce && !paused && quotes.length > 1;

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % quotes.length),
      ROTATION_MS,
    );
    return () => clearInterval(id);
  }, [auto, quotes.length]);

  const quote = quotes[index];

  return (
    <figure
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="group relative overflow-hidden rounded-2xl border border-dashed border-neutral-300/80 bg-neutral-50/50 dark:border-neutral-700/80 dark:bg-neutral-900/50"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-2 select-none font-serif text-[11rem] leading-none text-foreground/[0.045] sm:-top-12 sm:-right-4 sm:text-[15rem]"
      >
        &rdquo;
      </span>

      <div className="relative p-8 sm:p-10">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <QuoteIcon className="size-4 text-foreground/60" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wide text-foreground/40">
            Quote of the moment
          </span>
        </div>

        <div className="min-h-[7.5rem] sm:min-h-[9rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-serif text-[1.65rem] leading-[1.22] text-pretty text-foreground sm:text-4xl">
                {quote.text}
              </p>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <figcaption className="mt-7 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 border-t border-neutral-200/80 pt-5 dark:border-neutral-800/80">
          <span className="font-mono text-xs uppercase tracking-wide text-foreground/65">
            {quote.author}
          </span>
          {quote.source && (
            <span className="font-mono text-xs text-foreground/35">
              &middot; {quote.source}
            </span>
          )}
        </figcaption>

        {quotes.length > 1 && (
          <div className="mt-6 flex items-center gap-1.5">
            {quotes.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show the quote by ${q.author}`}
                aria-current={i === index ? "true" : undefined}
                className="rounded-full p-1 transition-colors hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-5 bg-foreground" : "w-1.5 bg-foreground/20",
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {auto && (
        <motion.div
          key={index}
          className="absolute bottom-0 left-0 h-px bg-foreground/30"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: ROTATION_MS / 1000, ease: "linear" }}
        />
      )}
    </figure>
  );
}
