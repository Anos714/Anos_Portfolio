"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { formatContributionDate, type ContributionWeek } from "@/data/contributions";

const LEVEL_BG: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-neutral-200/70 dark:bg-neutral-800",
  1: "bg-neutral-400/70 dark:bg-neutral-600",
  2: "bg-neutral-600/80 dark:bg-neutral-400",
  3: "bg-neutral-800 dark:bg-neutral-200",
  4: "bg-neutral-900 dark:bg-neutral-50",
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const VISIBLE_WEEKDAYS = [1, 3, 5];

export function ContributionsGraph({
  weeks,
  total,
}: {
  weeks: ContributionWeek[];
  total: number;
}) {
  const [active, setActive] = useState<{
    weekIndex: number;
    dayIndex: number;
  } | null>(null);

  const activeDay = useMemo(() => {
    if (!active) return null;
    return weeks[active.weekIndex]?.[active.dayIndex] ?? null;
  }, [active, weeks]);

  const monthLabels = useMemo(() => {
    return weeks.map((week, weekIndex) => {
      const first = week[0];
      if (!first) return null;
      const month = new Date(first.date + "T00:00:00").getMonth();
      const prev = weeks[weekIndex - 1]?.[0];
      const prevMonth = prev ? new Date(prev.date + "T00:00:00").getMonth() : -1;
      if (month === prevMonth) return null;
      return { weekIndex, label: MONTHS[month] };
    });
  }, [weeks]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm text-foreground/70">
          <span className="font-medium text-foreground">{total}</span>{" "}
          contributions in the last year
        </p>
        <p className="font-mono text-xs text-foreground/40">
          {weeks.length} weeks
        </p>
      </div>

      <div className="relative overflow-x-auto pb-1">
        <div className="flex gap-1">
          <div className="flex shrink-0 flex-col gap-[3px] pr-1">
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div key={dayIndex} className="flex h-[11px] items-center">
                {VISIBLE_WEEKDAYS.includes(dayIndex) && (
                  <span className="font-mono text-[9px] leading-none text-foreground/40">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayIndex]}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-[3px]">
            <div className="flex gap-[3px]">
              {weeks.map((week, weekIndex) => {
                const label = monthLabels[weekIndex];
                return (
                  <div
                    key={weekIndex}
                    className="relative flex h-[11px] w-[11px] items-start"
                  >
                    {label && (
                      <span className="absolute -top-3 left-0 font-mono text-[9px] leading-none text-foreground/40">
                        {label.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div key={dayIndex} className="flex gap-[3px]">
                {weeks.map((week, weekIndex) => {
                  const day = week[dayIndex];
                  if (!day) {
                    return (
                      <div
                        key={weekIndex}
                        className="h-[11px] w-[11px] shrink-0"
                      />
                    );
                  }
                  const isActive =
                    active?.weekIndex === weekIndex &&
                    active?.dayIndex === dayIndex;
                  return (
                    <motion.div
                      key={day.date}
                      className={`h-[11px] w-[11px] shrink-0 rounded-[2px] ${LEVEL_BG[day.level]} ${
                        isActive
                          ? "ring-2 ring-primary"
                          : "transition-colors duration-150 hover:ring-1 hover:ring-foreground/30"
                      }`}
                      initial={{ opacity: 0, scale: 0.3 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.25,
                        delay:
                          (weekIndex * 7 + dayIndex) * 0.004,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onMouseEnter={() => setActive({ weekIndex, dayIndex })}
                      onMouseLeave={() => setActive(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-foreground/40">Less</span>
          {(Object.keys(LEVEL_BG) as unknown as (0 | 1 | 2 | 3 | 4)[]).map(
            (level) => (
              <div
                key={level}
                className={`size-[11px] rounded-[2px] ${LEVEL_BG[level]}`}
              />
            ),
          )}
          <span className="font-mono text-[10px] text-foreground/40">More</span>
        </div>

        {activeDay && (
          <motion.p
            key={`${activeDay.date}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-right text-xs text-foreground/60"
          >
            <span className="font-medium text-foreground">
              {activeDay.count}
            </span>{" "}
            contribution{activeDay.count === 1 ? "" : "s"} on{" "}
            {formatContributionDate(activeDay.date)}
          </motion.p>
        )}
      </div>
    </div>
  );
}
