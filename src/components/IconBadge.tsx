import React from "react";
import { TechIcon } from "./TechIcon";

export function IconBadge({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex aspect-square size-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white align-middle shadow-sm dark:border-neutral-800 dark:bg-neutral-900 ${className}`}
    >
      <TechIcon name={name} className="size-4" />
    </div>
  );
}
