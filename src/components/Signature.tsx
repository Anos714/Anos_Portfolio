"use client";

import React from "react";

const NAME = "Rahul Sain";

export function Signature() {
  const [text, setText] = React.useState("");
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => {
        setText(NAME);
        setDone(true);
      }, 0);
      return () => window.clearTimeout(id);
    }

    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setText(NAME.slice(0, index));
      if (index >= NAME.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, 110);

    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="font-signature relative inline-block -rotate-2 text-5xl leading-none text-foreground/80 sm:text-6xl">
      <span className="sr-only">{NAME}</span>
      <span className="invisible" aria-hidden="true">
        {NAME}
      </span>
      <span className="absolute inset-0 whitespace-pre" aria-hidden="true">
        {text}
        <span
          className={`ml-0.5 inline-block transition-opacity duration-500 ${
            done ? "opacity-0" : "animate-pulse opacity-60"
          }`}
        >
          |
        </span>
      </span>
    </span>
  );
}
