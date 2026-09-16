import React from "react";

export function DottedUnderline({
  className = "",
  from = "0%",
}: {
  className?: string;
  from?: string;
}) {
  const id = React.useId();
  return (
    <svg
      className={`pointer-events-none absolute bottom-0 left-0 w-full text-neutral-400 dotted-underline dark:text-neutral-500 ${className}`}
      style={{
        height: "4px",
        ["--mask-from" as string]: from,
      }}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id={id} width="6" height="4" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="2" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
