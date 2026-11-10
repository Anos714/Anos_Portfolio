import React from "react";
import Link from "next/link";
import { DottedUnderline } from "./DottedUnderline";

export function DottedLink({
  href,
  children,
  active = false,
  underline = true,
  className = "",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
  underline?: boolean;
}) {
  const classes = `group relative transition-colors ${
    active ? "text-primary" : "text-foreground/70 hover:text-primary"
  } ${className}`;
  const content = (
    <span className="relative inline-block">
      {children}
      {underline && <DottedUnderline />}
    </span>
  );

  // Internal routes go through next/link for client-side navigation. Static
  // files (e.g. the resume PDF) stay as plain anchors so Next doesn't prefetch
  // them, and so the download attribute works.
  const isInternalRoute =
    typeof href === "string" &&
    href.startsWith("/") &&
    !/\.[a-z0-9]+$/i.test(href);

  if (isInternalRoute) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  );
}
