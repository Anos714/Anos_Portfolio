import type { Experience } from "@/data/experience";
import { IconBadge } from "./IconBadge";
import { TechIcon } from "./TechIcon";

export function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="transition-transform duration-300 hover:-rotate-6 hover:scale-110">
          <IconBadge name={experience.roleIcon} />
        </div>
        <p className="font-medium text-foreground">{experience.role}</p>
        <span className="hidden size-1 rounded-full bg-neutral-200 md:block dark:bg-neutral-700" />
        <p className="text-foreground/70">{experience.type}</p>
      </div>

      <p className="text-sm text-foreground/70">
        {experience.location} · {experience.duration}
      </p>

      <ul className="mt-2 flex flex-col gap-2">
        {experience.description.map((point) => (
          <li
            key={point}
            className="group/item flex items-start gap-2 text-sm leading-relaxed text-foreground/70 transition-colors duration-200 hover:text-foreground"
          >
            <span className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400 transition-colors group-hover/item:bg-neutral-900 dark:bg-neutral-600 dark:group-hover/item:bg-neutral-100" />
            <span className="text-pretty">{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
        {experience.tech.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            <TechIcon name={t} className="size-3.5" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
