import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { projects } from "../data/project";
import { RiArrowDownWideLine } from "react-icons/ri";
import { FiArrowUpRight } from "react-icons/fi";

const Projects = () => {
  const [openProject, setOpenProject] = useState<number | null>(0);

  const toggleProject = (index: number) => {
    setOpenProject(openProject === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <section className="mx-auto mt-10 w-full max-w-5xl px-4">
        {/* HEADER */}
        <div className="mb-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
            Projects
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Things I've built and shipped.
          </p>
        </div>

        {/* LIST */}
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
          {projects.map((item, index) => {
            const isOpen = openProject === index;

            return (
              <div key={item.title} className="py-8">
                {/* HEADER ROW */}
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.title}
                    </h2>

                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {item.subheading}
                    </p>

                    {/* TECH STACK (dabbe) */}
                    <ul className="flex flex-wrap gap-2">
                      {item.techStack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-neutral-300 bg-neutral-100 px-2.5 py-1 text-xs text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ARROW */}
                  <button
                    onClick={() => toggleProject(index)}
                    className="rounded-md p-2 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <RiArrowDownWideLine
                      className={`text-xl text-neutral-700 transition-transform duration-300 dark:text-neutral-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* EXPAND */}
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-6 space-y-5">
                      {/* DESCRIPTION */}
                      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                        {item.description.map((desc) => (
                          <li key={desc}>{desc}</li>
                        ))}
                      </ul>

                      {/* LINKS */}
                      <div className="flex gap-5 text-sm">
                        <a
                          href={item.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1 text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
                        >
                          Live
                          <FiArrowUpRight className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                        </a>

                        <a
                          href={item.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1 text-neutral-600 underline underline-offset-4 dark:text-neutral-400"
                        >
                          GitHub
                          <FiArrowUpRight className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
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
    </div>
  );
};

export default Projects;
