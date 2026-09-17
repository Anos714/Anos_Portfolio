"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Single star path (24x24 viewbox).
const STAR_PATH =
  "M12 2.6l2.83 5.9 6.47.8-4.71 4.52 1.2 6.42L12 17.26l-5.79 2.98 1.2-6.42-4.71-4.52 6.47-.8z";

function StarIcon({
  filled,
  size,
  animate,
  index,
}: {
  filled: boolean;
  size: number;
  animate?: boolean;
  index?: number;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={filled ? "text-foreground" : "text-foreground/25"}
      // Monochrome: filled stars use --foreground, empty ones a faint outline.
      animate={
        animate && filled
          ? { scale: [1, 1.35, 1], rotate: [0, -8, 0] }
          : { scale: 1, rotate: 0 }
      }
      transition={
        animate && filled
          ? {
              duration: 0.42,
              delay: (index ?? 0) * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }
          : { duration: 0.18 }
      }
      aria-hidden="true"
    >
      <path
        d={STAR_PATH}
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.4}
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export function StarRating({
  value,
  onChange,
  readOnly = false,
  size = 16,
  className,
}: {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: number;
  className?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;
  const stars = [1, 2, 3, 4, 5];

  if (readOnly) {
    return (
      <span
        className={cn("inline-flex items-center gap-0.5", className)}
        role="img"
        aria-label={`Rated ${value} out of 5 stars`}
      >
        {stars.map((star) => (
          <StarIcon
            key={star}
            filled={star <= display}
            size={size}
            index={star - 1}
          />
        ))}
      </span>
    );
  }

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="radiogroup"
      aria-label="Rating"
    >
      {stars.map((star) => (
        <motion.button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          onFocus={() => setHover(star)}
          onBlur={() => setHover(null)}
          aria-checked={star === value}
          role="radio"
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          className="relative grid place-items-center rounded-sm outline-none transition-transform focus-visible:ring-2 focus-visible:ring-foreground/30"
          whileHover={{ scale: 1.18 }}
          whileTap={{ scale: 0.88 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <StarIcon
            filled={star <= display}
            size={size}
            animate
            index={star - 1}
          />
        </motion.button>
      ))}
    </div>
  );
}
