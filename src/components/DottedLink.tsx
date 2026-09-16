import React from "react";
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
  return (
    <a
      href={href}
      className={`group relative transition-colors ${
        active ? "text-primary" : "text-foreground/70 hover:text-primary"
      } ${className}`}
      {...props}
    >
      <span className="relative inline-block">
        {children}
        {underline && <DottedUnderline />}
      </span>
    </a>
  );
}
