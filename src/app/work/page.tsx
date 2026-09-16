import { Navbar } from "@/components/Navbar";
import { DottedDivider } from "@/components/DottedDivider";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { IconBadge } from "@/components/IconBadge";
import { TechIcon } from "@/components/TechIcon";
import { SkillsSelector } from "@/components/SkillsSelector";
import { experience } from "@/data/experience";
import { DottedLink } from "@/components/DottedLink";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work & Skills",
  description:
    "Professional experience and technical skills of Rahul Sain — full-stack development across React, Node.js, TypeScript, databases, and DevOps.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto max-w-2xl px-4 pb-10">
          <div className="pt-4">
            <Reveal>
              <SectionHeading>Work</SectionHeading>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-col gap-3">
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

          <div className="mt-10 flex flex-col gap-4">
            <Reveal>
              <SectionHeading>Skills</SectionHeading>
            </Reveal>
            <Reveal delay={0.05}>
              <SkillsSelector />
            </Reveal>
          </div>

          <div className="my-10 w-full shrink-0">
            <DottedDivider />
          </div>

          <Reveal>
            <p className="text-sm text-foreground/50">
              <DottedLink href="/">← Back home</DottedLink>
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
