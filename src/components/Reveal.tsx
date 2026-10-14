"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import React from "react";

type RevealCustom = { delay: number; reduce: boolean };

const variants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: ({ delay, reduce }: RevealCustom) =>
    reduce
      ? { opacity: 1, transition: { duration: 0.01 } }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.55,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={{ delay, reduce }}
    >
      {children}
    </motion.div>
  );
}
