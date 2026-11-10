import { Navbar } from "@/components/Navbar";
import { DottedDivider } from "@/components/DottedDivider";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ExperienceItem } from "@/components/ExperienceItem";
import { SkillsSelector } from "@/components/SkillsSelector";
import { experiences } from "@/data/experience";
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
            <div className="mt-6 flex flex-col gap-8">
              {experiences.map((experience) => (
                <ExperienceItem
                  key={`${experience.role}-${experience.duration}`}
                  experience={experience}
                />
              ))}
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
