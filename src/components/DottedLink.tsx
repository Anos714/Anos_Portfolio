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

  // Internal links go through next/link for client-side navigation —
  // a raw <a> would trigger a full page reload.
  if (typeof href === "string" && href.startsWith("/")) {
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
