import { FaXTwitter } from "react-icons/fa6";
import Navbar from "../components/navbar/Navbar";
import { CiLinkedin } from "react-icons/ci";
import { FaGithubSquare } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import Footer from "../components/footer/Footer";
import { Link } from "react-router";
import { projects } from "../data/project";
import { experience } from "../data/experience";

const Home = () => {
  const social = [
    {
      label: "X",
      href: "https://x.com/RahulSain714",
      icon: <FaXTwitter />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rahulxcode/",
      icon: <CiLinkedin />,
    },
    {
      label: "Github",
      href: "https://github.com/Anos714",
      icon: <FaGithubSquare />,
    },
    {
      label: "Email",
      href: "mailto:sainrahul374@gmail.com",
      icon: <LuMail />,
    },
  ];

  const techStackArr = [
    { label: "React.js", icon: "React.svg" },
    { label: "Tailwind CSS", icon: "Tailwind CSS.svg" },
    { label: "TanStack Query", icon: "react-query-icon.svg" },
    { label: "Zustand", icon: "zustand.svg" },
    { label: "Redux Toolkit", icon: "Redux.svg" },
    { label: "Framer Motion", icon: "motion.svg" },
    { label: "Git", icon: "Git.svg" },
    { label: "Node.js", icon: "Node.js.svg" },
    { label: "Bun.js", icon: "Bun.svg" },
    { label: "Express.js", icon: "Express.svg" },
    { label: "MongoDB", icon: "MongoDB.svg" },
    { label: "Redis", icon: "Redis.svg" },
    { label: "TypeScript", icon: "TypeScript.svg" },
    { label: "JavaScript", icon: "JavaScript.svg" },
    { label: "Java", icon: "Java.svg" },
    { label: "Nginx", icon: "NGINX.svg" },
    { label: "Docker", icon: "Docker.svg" },
    { label: "Gemini API", icon: "gemini-color.svg" },
    { label: "Linux", icon: "Linux.svg" },
  ];

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <main className="mx-auto mt-10 w-full max-w-5xl px-4">
        {/* HERO */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <img
              className="size-24 rounded-full object-cover"
              src="/rahul_pfp.avif"
              alt="Rahul Sain"
            />

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
                Rahul Sain
              </h1>
              <p className="text-base tracking-tight text-neutral-700 dark:text-neutral-400">
                Engineer · MERN · Open to Work
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="max-w-2xl text-neutral-700 dark:text-neutral-300">
              I turn ideas into working products. Clean code, solid systems, no
              fluff.
            </p>

            <div className="flex gap-3">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  className="text-lg text-neutral-700 transition hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100"
                  data-tooltip-id="social-tooltip"
                  data-tooltip-content={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </section>
        {/* Tech Stack */}

        <section>
          <div>
            <h2 className="mt-15 mb-4 text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
              Tech Stack & Tools
            </h2>
            <div className="flex flex-wrap gap-4">
              {techStackArr.map((tech) => (
                <img
                  className="size-12 shrink rounded-xl border border-neutral-200 bg-neutral-100 p-2 dark:border-neutral-800 dark:bg-neutral-900"
                  key={tech.label}
                  data-tooltip-id="tech-stack-tooltip"
                  data-tooltip-content={tech.label}
                  src={tech.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS + WORK */}
        <section className="mt-20 space-y-16">
          {/* PROJECTS */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                Projects
              </h2>

              <Link
                to="/projects"
                className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-6">
              {projects.slice(0, 2).map((item) => (
                <Link
                  key={item.title}
                  to="/projects"
                  className="group block border-b border-neutral-200 pb-6 dark:border-neutral-800"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-medium text-neutral-900 group-hover:underline group-hover:underline-offset-4 dark:text-neutral-100">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                        {item.subheading}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-neutral-200 px-2 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <span className="text-neutral-400 transition group-hover:translate-x-1 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* WORK */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                Work
              </h2>

              <Link
                to="/experience"
                className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-6">
              {experience.slice(0, 1).map((item) => (
                <Link
                  key={item.role}
                  to="/experience"
                  className="group block border-b border-neutral-200 pb-6 dark:border-neutral-800"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-medium text-neutral-900 group-hover:underline group-hover:underline-offset-4 dark:text-neutral-100">
                        {item.role}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        {item.company} · {item.location}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        {item.duration}
                      </p>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                        {item.description[0]}
                      </p>
                    </div>

                    <span className="text-neutral-400 transition group-hover:translate-x-1 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Tooltip id="social-tooltip" />
      <Tooltip id="tech-stack-tooltip" />
      <Footer />
    </div>
  );
};

export default Home;
