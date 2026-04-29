import { useState } from "react";
import { experience } from "../data/experience";
import { RiArrowDownWideLine } from "react-icons/ri";

const Experience = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mt-10 w-full">
      {/* HEADER */}
      <div className="mb-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          Experience
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Work, tools, and systems I’ve built with.
        </p>
      </div>

      {/* LIST */}
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
        {experience.map((item) => (
          <div key={item.role} className="py-8">
            {/* HEADER ROW */}
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {item.role}
                </h3>

                <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <span>{item.company}</span>
                  <span className="opacity-50">•</span>
                  <span>{item.location}</span>
                  <span className="opacity-50">•</span>
                  <span>{item.duration}</span>
                </div>
              </div>

              {/* ARROW */}
              <button
                onClick={() => setIsOpen((prev) => !prev)}
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
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mt-6 space-y-6">
                  {/* DESCRIPTION */}
                  <ul className="space-y-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                    {item.description.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* TECH STACK */}
                  <div>
                    <p className="mb-3 text-xs tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                      Tech Stack
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {item.techStack.map((tech) => (
                        <div
                          key={tech.name}
                          className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                        >
                          <img
                            src={`${tech.icon}`}
                            alt={tech.name}
                            className="h-4 w-4"
                          />
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
