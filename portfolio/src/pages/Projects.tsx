import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import ProjectCard from "../components/project/ProjectCard";
import { projects } from "../data/project";

const Projects = () => {
  const [openProjects, setOpenProjects] = useState<Set<string>>(
    () => (projects[0] ? new Set([projects[0].title]) : new Set()),
  );

  const toggleProject = (title: string) => {
    setOpenProjects((current) => {
      const next = new Set(current);

      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }

      return next;
    });
  };

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <section className="mx-auto mt-10 w-full max-w-5xl px-4">
        <div className="pt-4 pb-6">
          <p className="text-[11px] font-normal tracking-[0.2em] text-neutral-500 uppercase dark:text-neutral-400">
            Archive
          </p>
          <h1 className="mt-1.5 text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-100">
            Projects
          </h1>
          <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Some projects I poured my time, brain cells, and caffeine into.
          </p>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[11px] font-normal tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
            All Projects
          </h2>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
            {projects.length} projects
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-4 pb-12 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isOpen={openProjects.has(project.title)}
              onToggle={() => toggleProject(project.title)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
