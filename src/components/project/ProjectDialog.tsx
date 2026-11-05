"use client";

import {
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IconBadge } from "../IconBadge";
import { TechIcon } from "../TechIcon";
import type { Project } from "@/data/projects";

const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function subscribeImmediately(callback: () => void) {
  callback();
  return () => {};
}

// The portal target only exists once we are on the client.
function useIsMounted() {
  return useSyncExternalStore(
    subscribeImmediately,
    () => true,
    () => false,
  );
}

export function ProjectDialog({
  project,
  open,
  onClose,
}: {
  project: Project;
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const isMounted = useIsMounted();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;

    const panel = panelRef.current;
    if (!panel) return;
    const items = Array.from(
      panel.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((item) => item.offsetParent !== null);
    if (items.length === 0) return;

    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === panel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!isMounted) return null;

  const duration = reduce ? 0.01 : 0.32;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key={project.title}
          className="fixed inset-0 z-[10000] flex items-start justify-center p-4 sm:p-8"
          onKeyDown={onKeyDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.2 }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-neutral-950/45 backdrop-blur-[3px] dark:bg-black/65"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-background shadow-[0_44px_90px_-40px_rgba(10,10,10,0.55)] ring-1 ring-neutral-200/80 outline-none dark:shadow-[0_44px_90px_-40px_rgba(0,0,0,0.9)] dark:ring-neutral-800/80"
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.97 }}
            transition={{ duration, ease: cubicEase }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-3 top-3 z-20 grid size-8 place-items-center rounded-full bg-white/85 text-neutral-700 shadow-sm backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-90 hover:bg-white dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {project.image && (
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-950">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 704px) 100vw, 672px"
                    className="object-cover object-top"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent"
                  />
                </div>
              )}

              <div className="flex flex-col gap-5 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  {project.logo ? (
                    <Image
                      src={project.logo}
                      alt=""
                      width={40}
                      height={40}
                      className="size-10 shrink-0 rounded-xl object-contain ring-1 ring-neutral-200/80 dark:ring-neutral-800/80"
                    />
                  ) : (
                    <IconBadge name={project.tech[0]} />
                  )}
                  <div className="min-w-0">
                    <h2
                      id={titleId}
                      className="truncate font-display text-lg font-medium leading-tight tracking-tight sm:text-xl"
                    >
                      {project.title}
                    </h2>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-foreground/45">
                      {project.year}
                      <span className="px-1.5 text-foreground/25">·</span>
                      {project.live ? "Live" : "In progress"}
                    </p>
                  </div>
                </div>

                <ol className="flex flex-col gap-3">
                  {project.description.map((line, i) => (
                    <li
                      key={line}
                      className="flex gap-3 text-sm leading-relaxed text-pretty text-foreground/70"
                    >
                      <span className="shrink-0 pt-0.5 font-mono text-[11px] tabular-nums text-foreground/35">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {line}
                    </li>
                  ))}
                </ol>

                <div className="flex flex-col gap-2.5">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-foreground/40">
                    Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 px-2 py-0.5 font-mono text-[11px] text-foreground/65 dark:border-neutral-800"
                      >
                        <TechIcon name={tech} className="size-3.5" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t border-dashed border-neutral-200 pt-4 dark:border-neutral-800">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/live inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
                    >
                      View live
                      <span className="transition-transform duration-300 group-hover/live:translate-x-0.5">
                        ↗
                      </span>
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/source inline-flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-foreground/70 transition-colors hover:border-neutral-300 hover:text-primary dark:border-neutral-800 dark:hover:border-neutral-700"
                  >
                    Source
                    <span className="transition-transform duration-300 group-hover/source:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="ml-auto font-mono text-[11px] uppercase tracking-widest text-foreground/40 transition-colors hover:text-primary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
