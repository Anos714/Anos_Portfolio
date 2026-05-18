import { FaXTwitter } from "react-icons/fa6";
import Navbar from "../components/navbar/Navbar";
import { CiLinkedin } from "react-icons/ci";
import { FaGithubSquare } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import {
  SiBun,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { motion, type Variants } from "framer-motion";
import { Tooltip } from "react-tooltip";
import Footer from "../components/footer/Footer";
import { Link } from "react-router";
import { projects } from "../data/project";
import { experience } from "../data/experience";
import { GitHubCalendar } from "react-github-calendar";

const Home = () => {
  const heroIntroVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.08,
      },
    },
  };

  const heroIntroItemVariants: Variants = {
    hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const heroTechStack = [
    {
      label: "TypeScript",
      icon: SiTypescript,
      className:
        "border-blue-200/80 bg-blue-50/80 text-blue-700 shadow-blue-500/10 hover:border-blue-300 hover:bg-blue-100/80 hover:text-blue-800 hover:shadow-blue-500/25 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200 dark:hover:border-blue-300/50 dark:hover:bg-blue-400/15",
    },
    {
      label: "React",
      icon: SiReact,
      className:
        "border-cyan-200/80 bg-cyan-50/80 text-cyan-700 shadow-cyan-500/10 hover:border-cyan-300 hover:bg-cyan-100/80 hover:text-cyan-800 hover:shadow-cyan-500/25 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100 dark:hover:border-cyan-200/50 dark:hover:bg-cyan-300/15",
    },
    {
      label: "Next.js",
      icon: SiNextdotjs,
      className:
        "border-neutral-300/80 bg-white/90 text-neutral-900 shadow-neutral-500/10 hover:border-neutral-400 hover:bg-neutral-100 hover:text-black hover:shadow-neutral-500/25 dark:border-neutral-600/70 dark:bg-neutral-100/10 dark:text-neutral-100 dark:hover:border-neutral-300/60 dark:hover:bg-neutral-100/15",
    },
    {
      label: "Node.js",
      icon: SiNodedotjs,
      className:
        "border-emerald-200/80 bg-emerald-50/80 text-emerald-700 shadow-emerald-500/10 hover:border-emerald-300 hover:bg-emerald-100/80 hover:text-emerald-800 hover:shadow-emerald-500/25 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-100 dark:hover:border-emerald-200/50 dark:hover:bg-emerald-300/15",
    },
    {
      label: "Bun",
      icon: SiBun,
      className:
        "border-stone-300/80 bg-stone-50/90 text-stone-800 shadow-stone-500/10 hover:border-stone-400 hover:bg-stone-100 hover:text-stone-950 hover:shadow-stone-500/25 dark:border-stone-300/20 dark:bg-stone-200/10 dark:text-stone-100 dark:hover:border-stone-200/50 dark:hover:bg-stone-200/15",
    },
    {
      label: "PostgreSQL",
      icon: SiPostgresql,
      className:
        "border-sky-200/80 bg-sky-50/80 text-sky-700 shadow-sky-500/10 hover:border-sky-300 hover:bg-sky-100/80 hover:text-sky-800 hover:shadow-sky-500/25 dark:border-sky-300/20 dark:bg-sky-300/10 dark:text-sky-100 dark:hover:border-sky-200/50 dark:hover:bg-sky-300/15",
    },
    {
      label: "MongoDB",
      icon: SiMongodb,
      className:
        "border-green-200/80 bg-green-50/80 text-green-700 shadow-green-500/10 hover:border-green-300 hover:bg-green-100/80 hover:text-green-800 hover:shadow-green-500/25 dark:border-green-300/20 dark:bg-green-300/10 dark:text-green-100 dark:hover:border-green-200/50 dark:hover:bg-green-300/15",
    },
  ];

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
    { label: "PostgreSQL", icon: "postgresql.svg" },
    { label: "Socket.io", icon: "socketio.svg" },
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
            <motion.p
              className="flex max-w-3xl flex-wrap items-center gap-x-2 gap-y-2 text-[15px] leading-8 text-neutral-700 sm:text-base dark:text-neutral-300"
              variants={heroIntroVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={heroIntroItemVariants}>
                Crafting modern web applications with
              </motion.span>

              {heroTechStack.map((tech) => {
                const Icon = tech.icon;

                return (
                  <motion.span
                    key={tech.label}
                    variants={heroIntroItemVariants}
                  >
                    <motion.span
                      className={`inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold tracking-tight shadow-sm backdrop-blur transition-colors duration-300 will-change-transform sm:h-8 sm:px-3 sm:text-sm ${tech.className}`}
                      whileHover={{
                        scale: 1.06,
                        y: -3,
                        transition: {
                          duration: 0.18,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }}
                    >
                      <Icon className="size-3.5 sm:size-4" aria-hidden="true" />
                      <span>{tech.label}</span>
                    </motion.span>
                  </motion.span>
                );
              })}

              <motion.span variants={heroIntroItemVariants}>
                — built for performance, scalability, and exceptional user
                experience.
              </motion.span>
            </motion.p>

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
                  alt=""
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
                  to="/work"
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
        {/* github contribution calendar */}
        <section>
          <h2 className="mt-15 mb-5 text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
            GitHub Contributions
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <GitHubCalendar
              username="Anos714"
              blockSize={14}
              blockMargin={5}
              fontSize={14}
              theme={{
                light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
            />
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
