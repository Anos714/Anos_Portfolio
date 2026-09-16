import React from "react";

export function SectionHeading({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="font-mono text-sm font-light uppercase tracking-wide text-foreground/40"
    >
      {children}
    </h2>
  );
}
