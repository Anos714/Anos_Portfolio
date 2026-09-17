import { projects } from "@/data/projects";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { ProjectCard } from "../project/ProjectCard";
import { SeeMoreLink } from "../SeeMoreLink";

const PREVIEW_COUNT = 4;

export function ProjectsSection() {
  const preview = projects.slice(0, PREVIEW_COUNT);
  const hasMore = projects.length > PREVIEW_COUNT;

  return (
    <section id="projects" className="flex scroll-mt-24 flex-col gap-6">
      <Reveal>
        <SectionHeading>Projects</SectionHeading>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {preview.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {hasMore && (
        <Reveal delay={preview.length * 0.06}>
          <SeeMoreLink href="/projects" label="See all projects" />
        </Reveal>
      )}
    </section>
  );
}
