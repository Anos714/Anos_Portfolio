"use client";

import {
  createContext,
  useCallback,
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { searchGroups, type SearchGroup, type SearchItem } from "@/data/search";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { SearchIcon } from "./icons/SearchIcon";

type PaletteCtx = { isOpen: boolean; open: () => void; close: () => void };

const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PaletteContext = createContext<PaletteCtx | null>(null);

export function useCommandPalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) {
    throw new Error("useCommandPalette must be used inside CommandPaletteProvider");
  }
  return ctx;
}

// Hydration-safe: the server cannot know whether the visitor is on a Mac,
// so the modifier glyph is rendered only after the store settles on the client.
function subscribeNothing(callback: () => void) {
  callback();
  return () => {};
}

function useModKey(): string | null {
  return useSyncExternalStore(
    subscribeNothing,
    () => (navigator.userAgent.includes("Mac") ? "⌘" : "Ctrl"),
    () => null,
  );
}

const actionItems: SearchItem[] = [
  {
    group: "Actions",
    title: "Copy email address",
    detail: site.email,
    hint: "clipboard",
    href: "",
    external: false,
    keywords: "copy email mail contact write",
    action: "copy-email",
  },
];

function GroupIcon({ group }: { group: SearchGroup }) {
  const shared = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    className: "size-4",
  } as const;

  switch (group) {
    case "Projects":
      return (
        <svg {...shared}>
          <path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z" />
          <path d="M3.5 12.5 12 17l8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
        </svg>
      );
    case "Tools":
      return (
        <svg {...shared}>
          <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="8" cy="17" r="2" />
        </svg>
      );
    case "Elsewhere":
      return (
        <svg {...shared}>
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      );
    case "Actions":
      return (
        <svg {...shared}>
          <rect x="7" y="4.5" width="10" height="15" rx="2" />
          <path d="M10 4.5h4v2h-4z" />
          <path d="m10 13 1.7 1.7L15 11.5" />
        </svg>
      );
    default:
      return (
        <svg {...shared}>
          <rect x="4.5" y="4.5" width="15" height="15" rx="2.5" />
          <path d="M9 12h6M12.5 9.5 15 12l-2.5 2.5" />
        </svg>
      );
  }
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 font-mono text-[10px] leading-none text-foreground/50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-foreground/60">
      {children}
    </kbd>
  );
}

function ModKeyChip() {
  const mod = useModKey();
  if (!mod) return <span aria-hidden className="inline-block w-4" />;
  return <Kbd>{mod}</Kbd>;
}

export function CommandTrigger({ className = "" }: { className?: string }) {
  const { open } = useCommandPalette();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open command menu"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-neutral-50/80 py-1.5 pl-2.5 pr-1.5 text-foreground/60 shadow-sm ring-1 ring-neutral-200/80 backdrop-blur transition-all duration-200 hover:text-foreground hover:ring-neutral-300 dark:bg-neutral-900/80 dark:ring-neutral-800/80 dark:hover:ring-neutral-700",
        className,
      )}
    >
      <SearchIcon className="size-3.5" />
      <span className="hidden text-xs font-medium sm:inline">Search</span>
      <span className="flex items-center gap-1">
        <ModKeyChip />
        <Kbd>K</Kbd>
      </span>
    </button>
  );
}

export function CommandHint() {
  const { open } = useCommandPalette();

  return (
    <button
      type="button"
      onClick={open}
      className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 font-mono text-xs font-light text-foreground/50 transition-colors duration-200 hover:border-neutral-300 hover:text-foreground/70 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
    >
      Press
      <span className="flex items-center gap-1">
        <ModKeyChip />
        <Kbd>K</Kbd>
      </span>
      to jump anywhere
    </button>
  );
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const reduce = useReducedMotion() ?? false;
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const deferred = useDeferredValue(query.trim().toLowerCase());
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActive(0);
    setCopied(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (event.shiftKey || isOpen) close();
        else open();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, open, close]);

  // Focus, scroll lock, and handing focus back are DOM concerns, so they
  // belong to the open/close transition rather than to the handlers.
  useEffect(() => {
    if (!isOpen) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      restoreRef.current?.focus();
    };
  }, [isOpen]);

  const groups = useMemo(() => {
    const found = searchGroups(deferred);
    const tokens = deferred.split(/\s+/).filter(Boolean);
    const actions =
      tokens.length === 0 ||
      actionItems.some((a) =>
        tokens.every((t) => `${a.title} ${a.keywords}`.toLowerCase().includes(t)),
      )
        ? [{ group: "Actions" as const, items: actionItems }]
        : [];

    let i = -1;
    return [...found, ...actions].map((section) => ({
      group: section.group,
      items: section.items.map((item) => ({ item, index: (i += 1) })),
    }));
  }, [deferred]);

  const flat = useMemo(() => groups.flatMap((g) => g.items.map((e) => e.item)), [groups]);

  // A shorter result list can leave the cursor past the end; clamping here
  // avoids a second render just to correct it.
  const current = active < flat.length ? active : 0;

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${current}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [current]);

  const select = useCallback(
    (item: SearchItem) => {
      if (item.action === "copy-email") {
        navigator.clipboard
          ?.writeText(site.email)
          .then(() => setCopied(true))
          .catch(() => setCopied(false));
        return;
      }

      close();

      if (/^(mailto:|tel:)/.test(item.href)) {
        window.location.href = item.href;
      } else if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.href);
      }
    },
    [close, router],
  );

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (flat.length === 0) return;

    if (event.key === "ArrowDown" || (event.key === "n" && event.ctrlKey)) {
      event.preventDefault();
      setActive((i) => (i + 1) % flat.length);
    } else if (event.key === "ArrowUp" || (event.key === "p" && event.ctrlKey)) {
      event.preventDefault();
      setActive((i) => (i - 1 + flat.length) % flat.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(flat.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      select(flat[current]);
    }
  };

  const panelMotion = {
    initial: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: -10, scale: 0.98, filter: "blur(6px)" },
    animate: reduce
      ? { opacity: 1 }
      : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: -10, scale: 0.98, filter: "blur(6px)" },
    transition: { duration: reduce ? 0.01 : 0.24, ease: cubicEase },
  };

  return (
    <PaletteContext.Provider value={{ isOpen, open, close }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-start justify-center px-4 pt-[12vh]">
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[3px] dark:bg-black/60"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.01 : 0.2 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search this site"
              onKeyDown={onKeyDown}
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-900/10 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/50"
              {...panelMotion}
            >
              <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                <SearchIcon className="size-4 shrink-0 text-foreground/40" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActive(0);
                  }}
                  placeholder="Search pages, projects, tools…"
                  aria-label="Search"
                  role="combobox"
                  aria-expanded
                  aria-controls="command-list"
                  aria-activedescendant={
                    flat.length > 0 ? `command-option-${current}` : undefined
                  }
                  autoComplete="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-foreground/30"
                />
                {copied && (
                  <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                    copied
                  </span>
                )}
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close command menu"
                  className="shrink-0"
                >
                  <Kbd>esc</Kbd>
                </button>
              </div>

              <div
                ref={listRef}
                id="command-list"
                role="listbox"
                aria-label="Results"
                className="max-h-[52vh] overflow-y-auto px-2 py-2"
              >
                {flat.length === 0 ? (
                  <p className="px-3 py-8 text-center text-sm text-foreground/50">
                    Nothing matches “{query.trim()}”.
                  </p>
                ) : (
                  groups.map((section) => (
                    <div key={section.group} className="pb-1 last:pb-0">
                      <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-wide text-foreground/40">
                        {section.group}
                      </p>
                      {section.items.map(({ item, index }) => (
                        <button
                          key={`${item.group}-${item.title}`}
                          id={`command-option-${index}`}
                          data-index={index}
                          type="button"
                          role="option"
                          aria-selected={current === index}
                          onMouseEnter={() => setActive(index)}
                          onClick={() => select(item)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors duration-150",
                            current === index
                              ? "bg-neutral-100 text-foreground dark:bg-neutral-800"
                              : "text-foreground/70",
                          )}
                        >
                          <span
                            className={cn(
                              "shrink-0 transition-colors",
                              current === index
                                ? "text-foreground"
                                : "text-foreground/40",
                            )}
                          >
                            <GroupIcon group={item.group} />
                          </span>
                          <span className="flex min-w-0 flex-col">
                            <span className="truncate text-sm">{item.title}</span>
                            <span className="truncate text-xs text-foreground/40">
                              {item.detail}
                            </span>
                          </span>
                          <span className="ml-auto shrink-0 font-mono text-[11px] text-foreground/40">
                            {item.hint}
                          </span>
                        </button>
                      ))}
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center gap-4 border-t border-neutral-200 px-4 py-2.5 font-mono text-[10px] text-foreground/40 dark:border-neutral-800">
                <span className="flex items-center gap-1.5">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <Kbd>↵</Kbd>
                  open
                </span>
                <span className="ml-auto flex items-center gap-1.5">
                  <ModKeyChip />
                  <Kbd>K</Kbd>
                  toggle
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PaletteContext.Provider>
  );
}
