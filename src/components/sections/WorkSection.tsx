import { experience } from "@/data/experience";
import { SectionHeading } from "../SectionHeading";
import { IconBadge } from "../IconBadge";
import { TechIcon } from "../TechIcon";
import { Reveal } from "../Reveal";
import { SkillsSelector } from "../SkillsSelector";
import { SeeMoreLink } from "../SeeMoreLink";

export function WorkSection() {
  return (
    <section id="work" className="flex scroll-mt-24 flex-col gap-6">
      <Reveal>
        <SectionHeading>Work</SectionHeading>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="transition-transform duration-300 hover:-rotate-6 hover:scale-110">
              <IconBadge name={experience.tech[0]} />
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
      </Reveal>

      <div className="mt-4 flex flex-col gap-4">
        <Reveal>
          <SectionHeading>Skills</SectionHeading>
        </Reveal>
        <Reveal delay={0.05}>
          <SkillsSelector />
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <SeeMoreLink href="/work" label="See all work" />
      </Reveal>
    </section>
  );
}
