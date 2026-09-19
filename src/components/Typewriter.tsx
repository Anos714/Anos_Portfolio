"use client";

import React from "react";
import { cn } from "@/lib/utils";

const DEFAULT_WORDS = [
  "Software Developer",
  "Full Stack Developer",
  "Backend Developer",
  "AI Engineer",
  "SaaS Builder",
];

export function Typewriter({
  words = DEFAULT_WORDS,
  className = "",
}: {
  words?: string[];
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const word = words[index % words.length] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else if (text.length > 0) {
      timeout = setTimeout(() => setText(word.slice(0, text.length - 1)), 35);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 120);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  const longest = React.useMemo(
    () => words.reduce((a, b) => (b.length > a.length ? b : a), ""),
    [words],
  );

  return (
    <span className="relative inline-block align-bottom">
      <span className="invisible whitespace-pre" aria-hidden="true">
        {longest}
      </span>
      <span className={cn("absolute inset-0 whitespace-pre", className)}>
        {text}
        <span className="animate-pulse">|</span>
      </span>
    </span>
  );
}
