"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

let clientHydrated = false;

function subscribeHydrated(callback: () => void) {
  clientHydrated = true;
  callback();
  return () => {
    clientHydrated = false;
  };
}

function getHydratedSnapshot() {
  return clientHydrated;
}

function getServerSnapshot() {
  return false;
}

function readIsDark() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export function ThemeToggle() {
  const mounted = React.useSyncExternalStore(
    subscribeHydrated,
    getHydratedSnapshot,
    getServerSnapshot,
  );
  const isDark = mounted ? readIsDark() : false;
  const [, bump] = React.useReducer((n: number) => n + 1, 0);

  const applyTheme = React.useCallback(
    (next: boolean) => {
      const root = document.documentElement;
      root.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        /* ignore */
      }
    },
    [],
  );

  const toggle = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const root = document.documentElement;
      const next = !root.classList.contains("dark");

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        applyTheme(next);
        bump();
        return;
      }

      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      const overlay = document.createElement("div");
      overlay.setAttribute("aria-hidden", "true");
      overlay.style.cssText = [
        "position:fixed",
        "inset:0",
        "z-index:9999",
        "pointer-events:none",
        `background:${next ? "#0a0a0a" : "#ffffff"}`,
        `clip-path:circle(0px at ${x}px ${y}px)`,
        "-webkit-clip-path:circle(0px at ${x}px ${y}px)",
      ].join(";");
      document.body.appendChild(overlay);

      const expand = overlay.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          {
            clipPath: `circle(${Math.ceil(maxRadius)}px at ${x}px ${y}px)`,
          },
        ],
        {
          duration: 340,
          easing: "cubic-bezier(0.32, 0.72, 0, 1)",
          fill: "forwards",
        },
      );

      // The circle only covers the viewport at maxRadius, so the theme must
      // flip on completion — otherwise the area outside the circle jumps.
      expand.onfinish = () => {
        applyTheme(next);
        bump();

        overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 160,
          easing: "ease-out",
          fill: "forwards",
        }).onfinish = () => overlay.remove();
      };
    },
    [applyTheme],
  );

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex size-9 items-center justify-center rounded-full bg-neutral-50/80 text-foreground/60 shadow-sm ring-1 ring-neutral-200/80 backdrop-blur transition-all duration-200 hover:scale-105 hover:text-foreground hover:ring-neutral-300 dark:bg-neutral-900/80 dark:text-foreground/60 dark:ring-neutral-800/80 dark:hover:text-foreground dark:hover:ring-neutral-700"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          isDark ? (
            <motion.svg
              key="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[18px]"
              aria-hidden="true"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </motion.svg>
          ) : (
            <motion.svg
              key="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[18px]"
              aria-hidden="true"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </motion.svg>
          )
        ) : (
          <span key="placeholder" className="size-[18px]" />
        )}
      </AnimatePresence>
    </button>
  );
}
