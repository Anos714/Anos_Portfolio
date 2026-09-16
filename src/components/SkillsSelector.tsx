"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { skillGroups } from "@/data/experience";
import { TechIcon } from "./TechIcon";

const CATEGORIES = ["All", ...skillGroups.map((g) => g.label)] as const;
type Category = (typeof CATEGORIES)[number];

export function SkillsSelector() {
  const [active, setActive] = React.useState<Category>("All");

  const visible =
    active === "All"
      ? skillGroups.flatMap((g) => g.skills)
      : skillGroups.find((g) => g.label === active)?.skills ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`relative rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                isActive
                  ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                  : "border-neutral-200 bg-neutral-50 text-foreground/70 hover:border-neutral-300 hover:text-foreground dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <motion.div
        key={active}
        layout
        className="flex flex-wrap gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.02 } },
        }}
      >
        <AnimatePresence mode="popLayout">
          {visible.map((skill) => (
            <motion.span
              key={skill}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-foreground/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-100 hover:text-foreground dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <TechIcon name={skill} className="size-3.5" />
              {skill}
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
