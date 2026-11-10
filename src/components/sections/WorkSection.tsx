import { experiences } from "@/data/experience";
import { ExperienceItem } from "../ExperienceItem";
import { SectionHeading } from "../SectionHeading";
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
        <div className="flex flex-col gap-8">
          {experiences.map((experience) => (
            <ExperienceItem
              key={`${experience.role}-${experience.duration}`}
              experience={experience}
            />
          ))}
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
