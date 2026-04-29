import { useState } from "react";
import { projects } from "../data/project";
import { RiArrowDownWideLine } from "react-icons/ri";
import { FiArrowUpRight } from "react-icons/fi";

const Projects = () => {
  const [openProject, setOpenProject] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setOpenProject(openProject === index ? null : index);
  };

  return (
    <section className="mt-20 w-full">
      <div className="mb-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          Projects
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Things I've built and shipped.
        </p>
      </div>

      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
        {projects.map((item, index) => {
          const isOpen = openProject === index;

          return (
            <div key={item.title} className="py-8">
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </h2>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {item.subheading}
                  </p>

                  <ul className="flex flex-wrap gap-2 pt-1">
                    {item.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700 transition hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => toggleProject(index)}
                  className="rounded-md p-2 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  aria-label={`Toggle ${item.title} description`}
                >
                  <RiArrowDownWideLine
                    className={`text-xl text-neutral-700 transition-transform duration-300 dark:text-neutral-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mt-6 space-y-5">
                    <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                      {item.description.map((desc) => (
                        <li key={desc}>{desc}</li>
                      ))}
                    </ul>

                    <div className="flex gap-2 text-sm">
                      <a
                        href={item.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1 text-neutral-900 underline underline-offset-4 transition hover:opacity-70 dark:text-neutral-100"
                      >
                        Live
                        <FiArrowUpRight className="translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                      </a>

                      <a
                        href={item.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1 text-neutral-600 underline underline-offset-4 transition hover:opacity-70 dark:text-neutral-400"
                      >
                        GitHub
                        <FiArrowUpRight className="translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
