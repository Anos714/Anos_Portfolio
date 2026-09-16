import React from "react";

export function DottedDivider({
  className = "",
}: {
  className?: string;
}) {
  const id = React.useId();
  return (
    <svg
      className={`pointer-events-none relative block w-full text-neutral-400 opacity-40 dark:text-neutral-600 ${className}`}
      style={{ height: "4px" }}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={id}
          width="6"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="2" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
