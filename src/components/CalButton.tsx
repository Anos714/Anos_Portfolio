"use client";

import Image from "next/image";
import { useEffect } from "react";
import { openCalBooking, prefetchCalBooking } from "@/lib/cal";
import { cn } from "@/lib/utils";

export function CalButton({ className = "" }: { className?: string }) {
  useEffect(() => {
    // Warm the embed after the page settles so the first click is instant.
    const timer = window.setTimeout(prefetchCalBooking, 2500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <button
      type="button"
      onClick={openCalBooking}
      aria-label="Book a call — opens the booking calendar"
      aria-haspopup="dialog"
      className={cn(
        "group/cal inline-flex cursor-pointer items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 text-sm font-medium text-foreground shadow-sm transition-all duration-300",
        "border-neutral-200 bg-white hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md hover:shadow-neutral-900/5",
        "dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:border-neutral-600 dark:hover:bg-neutral-800 dark:hover:shadow-black/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-neutral-500",
        "active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <span className="relative shrink-0">
        <Image
          src="/logo.jpeg"
          alt=""
          width={28}
          height={28}
          className="size-7 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-700"
        />
      </span>

      {/* The second seat slides in on hover, mirroring a two-person call. */}
      <span className="flex max-w-0 items-center gap-1.5 overflow-hidden opacity-0 transition-all duration-300 group-hover/cal:max-w-20 group-hover/cal:opacity-100 motion-reduce:transition-none">
        <span aria-hidden="true" className="text-foreground/30">
          +
        </span>
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-neutral-200 text-[9px] font-semibold uppercase tracking-wide text-neutral-600 dark:bg-neutral-700 dark:text-neutral-200">
          You
        </span>
      </span>

      <span className="whitespace-nowrap">Book a call</span>
    </button>
  );
}
