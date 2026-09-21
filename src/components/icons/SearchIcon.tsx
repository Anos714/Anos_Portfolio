import { Icon } from "./Icon";
import type React from "react";

type P = React.SVGProps<SVGSVGElement>;

export function SearchIcon(p: P) {
  return (
    <Icon {...p}>
      <path
        fillRule="evenodd"
        d="M10.5 3.75a6.75 6.75 0 1 0 3.87 12.28l3.55 3.55a.75.75 0 1 0 1.06-1.06l-3.55-3.55A6.75 6.75 0 0 0 10.5 3.75ZM5.25 10.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
        clipRule="evenodd"
      />
    </Icon>
  );
}
