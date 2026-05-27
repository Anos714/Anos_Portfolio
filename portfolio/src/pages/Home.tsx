import { FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import Navbar from "../components/navbar/Navbar";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  LuArrowUpRight,
  LuBriefcaseBusiness,
  LuCalendarDays,
  LuExternalLink,
  LuFileText,
  LuGithub,
  LuMail,
  LuSend,
} from "react-icons/lu";
import {
  SiBun,
  SiDjango,
  SiFastapi,
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
      icon: <FaLinkedin />,
    },
    {
      label: "GitHub",
      href: "https://github.com/Anos714",
      icon: <FaGithub />,
    },
  ];

  const contactActions = [
    {
      label: "Resume / CV",
      href: "/resume/rahul_resume.pdf",
      icon: <LuFileText />,
      download: true,
      className:
        "border-neutral-700 bg-neutral-900 text-white shadow-[0_4px_0_0_#0a0a0a] hover:bg-neutral-800 hover:shadow-[0_2px_0_0_#0a0a0a] dark:border-neutral-700 dark:bg-neutral-100 dark:text-neutral-950 dark:shadow-[0_4px_0_0_rgba(255,255,255,0.25)] dark:hover:bg-neutral-200 dark:hover:shadow-[0_2px_0_0_rgba(255,255,255,0.25)]",
    },
    {
      label: "Get in touch",
      href: "mailto:sainrahul374@gmail.com",
      icon: <LuSend />,
      className:
        "border-neutral-300 bg-neutral-100 text-neutral-950 shadow-[0_4px_0_0_rgba(0,0,0,0.15)] hover:bg-neutral-200 hover:shadow-[0_2px_0_0_rgba(0,0,0,0.15)] dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-[0_4px_0_0_rgba(0,0,0,0.4)] dark:hover:bg-neutral-700 dark:hover:shadow-[0_2px_0_0_rgba(0,0,0,0.4)]",
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

  const projectHighlights: Record<string, string[]> = {
    "DocuMind AI": [
      "RAG architecture",
      "Citation-aware answers",
      "Multi-service backend",
    ],
    SmartBillr: ["AI invoice flow", "Business snapshots", "Freelancer-ready"],
    Konnect: ["Realtime messaging", "Video calls", "Secure sessions"],
    CodeVault: ["Monaco editor", "Snippet CRUD", "Developer UX"],
  };

  const techIconMap: Record<
    string,
    { src?: string; icon?: IconType; className?: string }
  > = {
    FastAPI: {
      icon: SiFastapi,
      className: "text-teal-600 dark:text-teal-300",
    },
    "Django REST Framework": {
      icon: SiDjango,
      className: "text-emerald-800 dark:text-emerald-300",
    },
    React: { src: "React.svg" },
    PostgreSQL: { src: "postgresql.svg" },
    pgvector: { src: "postgresql.svg" },
    Redis: { src: "Redis.svg" },
    "Gemini AI": { src: "gemini-color.svg" },
    "Tailwind CSS": { src: "Tailwind CSS.svg" },
    Cloudinary: { src: "JavaScript.svg" },
    Neon: { src: "postgresql.svg" },
    Upstash: { src: "Redis.svg" },
    "Node.js": { src: "Node.js.svg" },
    Express: { src: "Express.svg" },
    MongoDB: { src: "MongoDB.svg" },
    "Stream Chat SDK": { src: "socketio.svg" },
    "Stream Video SDK": { src: "socketio.svg" },
    "Redux Toolkit": { src: "Redux.svg" },
    "Monaco Editor": { src: "TypeScript.svg" },
  };

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <main className="mx-auto mt-10 w-full max-w-5xl px-4">
        {/* HERO */}
        <section className="flex flex-col gap-7">
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

          <div className="flex flex-col gap-5">
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

            <div className="mt-1 flex flex-col gap-5">
              <div className="flex flex-wrap gap-x-4 gap-y-3">
                {contactActions.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    download={item.download}
                    className={`inline-flex min-h-10 items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-medium transition-all duration-300 hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none ${item.className}`}
                    data-tooltip-id="social-tooltip"
                    data-tooltip-content={item.label}
                    aria-label={item.label}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-3 gap-y-3 font-bold">
                {social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-100 px-3.5 py-2 text-sm text-neutral-800 shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all duration-300 hover:translate-y-[2px] hover:bg-neutral-200 hover:shadow-[0_2px_0_0_rgba(0,0,0,0.15)] active:translate-y-[4px] active:shadow-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-[0_4px_0_0_rgba(0,0,0,0.4)] dark:hover:bg-neutral-700 dark:hover:shadow-[0_2px_0_0_rgba(0,0,0,0.4)]"
                    data-tooltip-id="social-tooltip"
                    data-tooltip-content={item.label}
                    aria-label={item.label}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                ))}

                <a
                  href="mailto:sainrahul374@gmail.com"
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-100 px-3.5 py-2 text-sm font-bold text-neutral-800 shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all duration-300 hover:translate-y-[2px] hover:bg-neutral-200 hover:shadow-[0_2px_0_0_rgba(0,0,0,0.15)] active:translate-y-[4px] active:shadow-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-[0_4px_0_0_rgba(0,0,0,0.4)] dark:hover:bg-neutral-700 dark:hover:shadow-[0_2px_0_0_rgba(0,0,0,0.4)]"
                  data-tooltip-id="social-tooltip"
                  data-tooltip-content="Email"
                  aria-label="Email"
                >
                  <span className="text-lg">
                    <LuMail />
                  </span>
                  <span>Email</span>
                </a>
              </div>
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
        <section className="mt-20 space-y-20">
          {/* PROJECTS */}
          <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                  Featured Builds
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  A quick recruiter scan of what I can ship: AI workflows,
                  backend architecture, realtime features, and polished product
                  interfaces.
                </p>
              </div>

              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-800 transition hover:text-neutral-500 dark:text-neutral-200 dark:hover:text-neutral-400"
              >
                More projects
                <LuArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-4">
              {projects.slice(0, 3).map((item, index) => (
                <article
                  key={item.title}
                  className="group rounded-lg border border-neutral-200 bg-neutral-50 p-4 transition hover:border-neutral-300 hover:bg-white hover:shadow-lg hover:shadow-neutral-950/5 sm:p-5 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700 dark:hover:bg-neutral-900"
                >
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
                    <div className="min-w-0">
                      <div className="flex items-start gap-4">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white text-sm font-black text-neutral-400 transition group-hover:border-neutral-300 group-hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-500 dark:group-hover:border-neutral-700 dark:group-hover:text-neutral-100">
                          0{index + 1}
                        </span>

                        <div className="min-w-0">
                          <h3 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100">
                            {item.title}
                          </h3>
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                            {item.subheading}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        {(
                          projectHighlights[item.title] ??
                          item.description.slice(0, 3)
                        ).map((highlight) => (
                          <div
                            key={highlight}
                            className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                          >
                            {highlight}
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.techStack.slice(0, 8).map((tech) => {
                          const icon = techIconMap[tech];
                          const Icon = icon?.icon;

                          return (
                            <span
                              key={tech}
                              className="inline-flex h-8 items-center gap-2 rounded-md border border-neutral-200 bg-white px-2.5 text-xs font-semibold text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                            >
                              {Icon ? (
                                <Icon
                                  className={`size-4 ${icon.className ?? ""}`}
                                />
                              ) : icon?.src ? (
                                <img src={icon.src} alt="" className="size-4" />
                              ) : null}
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-4 rounded-md border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
                      <div>
                        <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                          Core Stack
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.techStack.slice(0, 5).map((tech) => {
                            const icon = techIconMap[tech];
                            const Icon = icon?.icon;

                            return Icon ? (
                              <span
                                key={tech}
                                title={tech}
                                className="flex size-9 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950"
                              >
                                <Icon
                                  className={`size-5 ${icon.className ?? ""}`}
                                />
                              </span>
                            ) : icon?.src ? (
                              <img
                                key={tech}
                                src={icon.src}
                                alt={tech}
                                title={tech}
                                className="size-9 rounded-md border border-neutral-200 bg-neutral-50 p-1.5 dark:border-neutral-800 dark:bg-neutral-950"
                              />
                            ) : null;
                          })}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 lg:flex-col">
                        {item.liveLink !== "#" ? (
                          <a
                            href={item.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-neutral-900 bg-neutral-900 px-3 text-sm font-medium text-white transition hover:bg-neutral-700 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-neutral-300"
                          >
                            <LuExternalLink className="size-4" />
                            Live
                          </a>
                        ) : null}

                        <a
                          href={item.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-neutral-200 px-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-950 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
                        >
                          <LuGithub className="size-4" />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* WORK */}
          <div>
            <div className="mb-6 flex flex-col gap-3 border-b border-neutral-200 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-neutral-800">
              <div>
                <h2 className="text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                  Experience
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  Work shaped around shipping useful products, not just
                  completing tickets.
                </p>
              </div>

              <Link
                to="/work"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-800 transition hover:text-neutral-500 dark:text-neutral-200 dark:hover:text-neutral-400"
              >
                Full timeline
                <LuArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute top-2 left-3 hidden h-[calc(100%-1rem)] w-px bg-neutral-200 sm:block dark:bg-neutral-800" />

              {experience.slice(0, 1).map((item) => (
                <article
                  key={item.role}
                  className="relative grid gap-5 sm:grid-cols-[44px_minmax(0,1fr)]"
                >
                  <div className="hidden sm:flex">
                    <span className="z-10 flex size-6 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900">
                      <LuBriefcaseBusiness className="size-3.5" />
                    </span>
                  </div>

                  <div className="pb-2">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-neutral-500">
                      <span>{item.company}</span>
                      <span>{item.location}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <LuCalendarDays className="size-4" />
                        {item.duration}
                      </span>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100">
                      {item.role}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                      {item.description[0]}
                    </p>

                    <div className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-2">
                      {item.description.slice(1, 5).map((point) => (
                        <div
                          key={point}
                          className="flex gap-3 text-sm leading-6"
                        >
                          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                          <span className="text-neutral-700 dark:text-neutral-300">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                      {item.techStack.slice(0, 9).map((tech) => (
                        <span
                          key={tech.name}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-500"
                        >
                          <img src={tech.icon} alt="" className="size-4" />
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
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
