import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export function Icon({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}
