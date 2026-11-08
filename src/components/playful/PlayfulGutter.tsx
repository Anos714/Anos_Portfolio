"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Small, optional toys that live in the empty desktop gutters beside the
 * 2xl content column. They are decorative, so the whole layer is hidden on
 * narrow screens and `aria-hidden` where they add no meaning. Every toy is
 * cheap: transforms are written straight to the DOM, never through state.
 */
export function PlayfulGutter() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden xl:block">
      <div className="relative mx-auto h-full w-full max-w-[1100px]">
        <div className="pointer-events-auto absolute left-0 top-[20vh]">
          <GooglyEyes />
        </div>

        <div className="pointer-events-auto absolute left-4 top-[56vh]">
          <DraggableSparkle />
        </div>

        <div className="pointer-events-auto absolute right-0 top-[28vh]">
          <MagneticDots />
        </div>

        <div className="pointer-events-auto absolute right-4 top-[66vh]">
          <GrowableSprout />
        </div>
      </div>
    </div>
  );
}

/** Two eyes whose pupils chase the pointer, with a lazy blink. */
function GooglyEyes() {
  const eyeRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      for (const pupil of eyeRefs.current) {
        if (!pupil) continue;
        const rect = pupil.parentElement?.getBoundingClientRect();
        if (!rect) continue;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = event.clientX - cx;
        const dy = event.clientY - cy;
        const distance = Math.hypot(dx, dy) || 1;
        const reach = Math.min(6, distance / 10);
        pupil.style.transform = `translate(${(dx / distance) * reach}px, ${(dy / distance) * reach}px)`;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="flex gap-2.5" title="They follow you" aria-hidden="true">
      {[0, 1].map((eye) => (
        <span
          key={eye}
          className="relative grid size-9 place-items-center rounded-full bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25)] ring-1 ring-neutral-300/80 dark:bg-neutral-100 dark:ring-neutral-400/40"
          style={{ animation: `doodle-blink 7s ease-in-out ${eye * 0.12}s infinite` }}
        >
          <span
            ref={(node) => {
              eyeRefs.current[eye] = node;
            }}
            className="size-3.5 rounded-full bg-neutral-900 transition-transform duration-75 ease-out will-change-transform"
          />
          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/70 to-transparent" />
        </span>
      ))}
    </div>
  );
}

/** A four-point sparkle you can drag around; it springs back home. */
function DraggableSparkle() {
  return (
    <div className="group flex flex-col items-center gap-1">
      <motion.button
        type="button"
        drag
        dragSnapToOrigin
        dragElastic={0.65}
        dragMomentum={false}
        whileHover={{ scale: 1.12, rotate: -8 }}
        whileDrag={{ scale: 1.2, rotate: 14, cursor: "grabbing" }}
        aria-label="Drag the sparkle"
        className="cursor-grab touch-none rounded-full p-1 text-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 dark:text-amber-400"
      >
        <svg viewBox="0 0 24 24" className="size-9 drop-shadow-sm" fill="currentColor">
          <path d="M12 1.8c.8 5.3 4.9 9.4 10.2 10.2-5.3.8-9.4 4.9-10.2 10.2C11.2 16.9 7.1 12.8 1.8 12 7.1 11.2 11.2 7.1 12 1.8Z" />
        </svg>
      </motion.button>
      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        drag me
      </span>
    </div>
  );
}

/** A 3x3 grid of dots that scatter away from the cursor. */
function MagneticDots() {
  const gridRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const grid = gridRef.current;
      if (!grid) return;
      const rect = grid.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      dotRefs.current.forEach((dot, index) => {
        if (!dot) return;
        const col = index % 3;
        const row = Math.floor(index / 3);
        const baseX = cx + (col - 1) * 15;
        const baseY = cy + (row - 1) * 15;
        const dx = baseX - event.clientX;
        const dy = baseY - event.clientY;
        const distance = Math.hypot(dx, dy) || 1;
        const push = Math.max(0, 1 - distance / 70) * 11;
        dot.style.transform = `translate(${(dx / distance) * push}px, ${(dy / distance) * push}px)`;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-3 gap-2.5 p-2"
      title="Boop the dots"
      aria-hidden="true"
    >
      {Array.from({ length: 9 }, (_, index) => (
        <span
          key={index}
          ref={(node) => {
            dotRefs.current[index] = node;
          }}
          className="size-1.5 rounded-full bg-neutral-400/80 transition-transform duration-150 ease-out will-change-transform dark:bg-neutral-500"
        />
      ))}
    </div>
  );
}

const FLOWER_PETALS = Array.from({ length: 6 }, (_, index) => {
  const angle = (Math.PI * 2 * index) / 6;
  return {
    cx: 32 + Math.cos(angle) * 6.5,
    cy: 26 + Math.sin(angle) * 6.5,
  };
});

/** Click the little plant to grow it from seed to flower. */
function GrowableSprout() {
  const [stage, setStage] = useState(2);
  const reduced = useReducedMotion();
  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 280, damping: 18 };

  const hint =
    stage === 0 ? "click to grow" : stage === 3 ? "again?" : "keep growing";

  return (
    <button
      type="button"
      onClick={() => setStage((current) => (current + 1) % 4)}
      aria-label={`Grow the plant (stage ${stage + 1} of 4)`}
      className="group relative grid size-16 place-items-end justify-items-center rounded-xl pb-1 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 motion-reduce:hover:translate-y-0"
    >
      <svg
        viewBox="0 0 64 64"
        className="size-16 origin-bottom overflow-visible animate-[doodle-sway_6s_ease-in-out_infinite] motion-reduce:animate-none"
      >
        <ellipse cx="32" cy="58" rx="15" ry="3.5" className="fill-neutral-300 dark:fill-neutral-700" />

        <motion.ellipse
          cx="32"
          cy="53"
          rx="3"
          ry="4.2"
          className="fill-amber-700"
          style={{ transformOrigin: "32px 53px" }}
          initial={false}
          animate={{ opacity: stage === 0 ? 1 : 0, scale: stage === 0 ? 1 : 0.5 }}
          transition={spring}
        />

        <motion.path
          d="M32 55 C30.5 47 33.5 39 32 29"
          fill="none"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="stroke-emerald-600 dark:stroke-emerald-400"
          initial={false}
          animate={{ pathLength: stage >= 1 ? 1 : 0, opacity: stage >= 1 ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut" }}
        />

        <motion.g
          style={{ transformOrigin: "32px 44px" }}
          initial={false}
          animate={{ scale: stage >= 2 ? 1 : 0, opacity: stage >= 2 ? 1 : 0 }}
          transition={spring}
        >
          <path d="M32 45c-6.5 0-11.5-3.6-12-9.6 6.6 0 11.6 3.4 12 9.6Z" className="fill-emerald-500/90 dark:fill-emerald-400/80" />
          <path d="M32 40c6.5 0 11.5-3.6 12-9.6-6.6 0-11.6 3.4-12 9.6Z" className="fill-emerald-500/60 dark:fill-emerald-400/55" />
        </motion.g>

        <motion.g
          style={{ transformOrigin: "32px 26px" }}
          initial={false}
          animate={{ scale: stage === 3 ? 1 : 0, opacity: stage === 3 ? 1 : 0 }}
          transition={spring}
        >
          {FLOWER_PETALS.map((petal, index) => (
            <circle
              key={index}
              cx={petal.cx}
              cy={petal.cy}
              r="3.6"
              className="fill-rose-400 dark:fill-rose-300"
            />
          ))}
          <circle cx="32" cy="26" r="3" className="fill-amber-400" />
        </motion.g>
      </svg>

      <span
        className={cn(
          "pointer-events-none absolute -bottom-4 whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-foreground/30 opacity-40 transition-opacity duration-200",
          "group-hover:opacity-100 group-focus-visible:opacity-100",
        )}
      >
        {hint}
      </span>
    </button>
  );
}
