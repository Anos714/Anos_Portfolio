import { Icon } from "./Icon";
import type React from "react";

type P = React.SVGProps<SVGSVGElement>;

export function QuoteIcon(p: P) {
  return (
    <Icon {...p}>
      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
    </Icon>
  );
}
