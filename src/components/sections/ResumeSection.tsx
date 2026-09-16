import { site, education, highlights } from "@/data/site";
import { SectionHeading } from "../SectionHeading";
import { allSkills } from "@/data/experience";
import { TechIcon } from "../TechIcon";
import { Reveal } from "../Reveal";
import { SeeMoreLink } from "../SeeMoreLink";

export function ResumeSection() {
  return (
    <section id="resume" className="flex scroll-mt-24 flex-col gap-6">
      <Reveal>
        <SectionHeading>Resume</SectionHeading>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="flex flex-col gap-3">
          <p className="text-sm leading-relaxed text-foreground/70 text-pretty">
            {site.summary}
          </p>
          <p className="text-sm text-foreground/50">
            {site.location} · {site.phone}
          </p>
        </div>
      </Reveal>

      <div className="flex flex-col gap-4">
        <Reveal>
          <SectionHeading>Education</SectionHeading>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex flex-col gap-3">
            <p className="font-medium text-foreground">{education.degree}</p>
            <p className="text-sm text-foreground/70">
              {education.university}, {education.location} · {education.duration}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col gap-4">
        <Reveal>
          <SectionHeading>Highlights</SectionHeading>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="flex flex-col gap-2">
            {highlights.map((point) => (
              <li
                key={point}
                className="group/item flex items-start gap-2 text-sm leading-relaxed text-foreground/70 transition-colors duration-200 hover:text-foreground"
              >
                <span className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400 transition-colors group-hover/item:bg-neutral-900 dark:bg-neutral-600 dark:group-hover/item:bg-neutral-100" />
                <span className="text-pretty">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="flex flex-col gap-4">
        <Reveal>
          <SectionHeading>Tech Stack</SectionHeading>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <span
                key={skill.name}
                className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-foreground/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-100 hover:text-foreground dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
              >
                <TechIcon name={skill.name} className="size-3.5" />
                {skill.name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <SeeMoreLink href="/resume" label="See full resume" />
      </Reveal>
    </section>
  );
}
