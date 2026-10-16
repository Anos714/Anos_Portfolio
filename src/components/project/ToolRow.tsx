import { Reveal } from "../Reveal";
import type { Tool } from "@/data/tools";

export function ToolRow({ tool, index }: { tool: Tool; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <a
        href={tool.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start justify-between gap-6 border-b border-neutral-100 py-4 transition-colors duration-200 last:border-0 hover:border-neutral-200 dark:border-neutral-800 dark:hover:border-neutral-700"
      >
        <span className="flex min-w-0 flex-col gap-1.5">
          <span className="flex items-baseline gap-2.5">
            <span className="text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
              {tool.title}
            </span>
            <span className="font-mono text-xs font-light text-foreground/40">
              {tool.year}
            </span>
          </span>
          <span className="text-sm leading-relaxed text-foreground/60">
            {tool.description}
          </span>
          <span className="flex flex-wrap gap-1.5 pt-0.5">
            {tool.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-neutral-200 px-2 py-px font-mono text-[11px] text-foreground/50 dark:border-neutral-800"
              >
                {t}
              </span>
            ))}
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 pt-0.5 text-sm font-medium text-foreground/50 transition-all duration-200 group-hover:gap-1.5 group-hover:text-primary">
          GitHub
          <span aria-hidden="true">↗</span>
        </span>
      </a>
    </Reveal>
  );
}
