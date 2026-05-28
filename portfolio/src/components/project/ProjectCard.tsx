import type { IconType } from "react-icons";
import {
  LuArrowUpRight,
  LuChevronDown,
  LuExternalLink,
  LuGithub,
} from "react-icons/lu";
import {
  SiDjango,
  SiFastapi,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { Project } from "../../data/project";

type TechIcon = {
  src?: string;
  icon?: IconType;
  className?: string;
};

const techIconMap: Record<string, TechIcon> = {
  FastAPI: {
    icon: SiFastapi,
    className: "text-teal-600 dark:text-teal-300",
  },
  "Django REST Framework": {
    icon: SiDjango,
    className: "text-emerald-800 dark:text-emerald-300",
  },
  React: { icon: SiReact, className: "text-cyan-600 dark:text-cyan-300" },
  PostgreSQL: {
    icon: SiPostgresql,
    className: "text-sky-700 dark:text-sky-300",
  },
  pgvector: {
    icon: SiPostgresql,
    className: "text-sky-700 dark:text-sky-300",
  },
  Redis: { src: "Redis.svg" },
  "Gemini AI": { src: "gemini-color.svg" },
  "Tailwind CSS": {
    icon: SiTailwindcss,
    className: "text-sky-500 dark:text-sky-300",
  },
  Cloudinary: { src: "JavaScript.svg" },
  Neon: {
    icon: SiPostgresql,
    className: "text-sky-700 dark:text-sky-300",
  },
  Upstash: { src: "Redis.svg" },
  "Node.js": {
    icon: SiNodedotjs,
    className: "text-emerald-700 dark:text-emerald-300",
  },
  Express: { src: "Express.svg" },
  MongoDB: {
    icon: SiMongodb,
    className: "text-green-700 dark:text-green-300",
  },
  "Stream Chat SDK": { src: "socketio.svg" },
  "Stream Video SDK": { src: "socketio.svg" },
  "Redux Toolkit": { icon: SiRedux, className: "text-purple-600" },
  "Monaco Editor": {
    icon: SiTypescript,
    className: "text-blue-600 dark:text-blue-300",
  },
};

type ProjectCardProps = {
  project: Project;
  index: number;
  isOpen?: boolean;
  onToggle?: () => void;
};

const ProjectCard = ({ project, index, isOpen, onToggle }: ProjectCardProps) => {
  const caseCode = project.title
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, 8)
    .toUpperCase();

  return (
    <article className="group relative isolate flex h-full min-h-[430px] flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-950/10 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700">
      <header className="flex items-center justify-between gap-3 border-b border-neutral-200/80 px-3 py-2 dark:border-neutral-800/80">
        <div className="flex min-w-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-500">
          <span className="relative flex size-1.5 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
          </span>
          <span>Operational</span>
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <span className="truncate text-neutral-400 dark:text-neutral-600">
            Case-{caseCode}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          {project.liveLink !== "#" ? (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} live site`}
              className="flex size-6 items-center justify-center rounded-sm text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
            >
              <LuExternalLink className="size-3.5" />
            </a>
          ) : null}
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} source code`}
            className="flex size-6 items-center justify-center rounded-sm text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
          >
            <LuGithub className="size-3.5" />
          </a>
        </div>
      </header>

      <a
        href={project.liveLink !== "#" ? project.liveLink : project.githubLink}
        target="_blank"
        rel="noreferrer"
        className="relative block aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-900"
        aria-label={`${project.title} preview`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            className="h-full w-full object-cover saturate-[0.92] transition duration-700 ease-out group-hover:scale-[1.035] group-hover:saturate-100"
            loading={index > 1 ? "lazy" : "eager"}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-neutral-950 px-6 text-center text-neutral-100">
            <p className="text-2xl font-black tracking-tight">
              {project.title}
            </p>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/30 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-20" />
      </a>

      <div className="flex flex-1 flex-col px-3.5 pt-3.5 pb-3">
        <a
          href={project.liveLink !== "#" ? project.liveLink : project.githubLink}
          target="_blank"
          rel="noreferrer"
          className="group/title inline-flex w-fit items-start gap-1.5"
        >
          <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-neutral-900 dark:text-neutral-50">
            <span className="relative">
              {project.title}
              <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-neutral-900 transition-transform duration-500 ease-out group-hover/title:scale-x-100 dark:bg-neutral-100" />
            </span>
          </h3>
          <LuArrowUpRight className="mt-[3px] size-3 shrink-0 text-neutral-400 transition-all duration-300 group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5 group-hover/title:text-neutral-900 dark:group-hover/title:text-neutral-100" />
        </a>

        <p className="mt-1.5 line-clamp-3 text-[11.5px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          {project.subheading}
        </p>

        <div className="mt-auto pt-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-600">
              Stack
            </span>
            <span className="h-px flex-1 bg-neutral-200/70 dark:bg-neutral-800/70" />
          </div>
          <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
            {project.techStack.slice(0, 8).map((tech) => {
              const techIcon = techIconMap[tech];
              const Icon = techIcon?.icon;

              return (
                <span
                  key={tech}
                  title={tech}
                  className="inline-flex size-4 shrink-0 items-center justify-center opacity-70 grayscale transition duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0"
                >
                  {Icon ? (
                    <Icon className={`size-4 ${techIcon.className ?? ""}`} />
                  ) : techIcon?.src ? (
                    <img src={techIcon.src} alt="" className="size-4" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-neutral-400" />
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {onToggle ? (
          <div className="mt-4 border-t border-neutral-200/70 pt-3 dark:border-neutral-800/70">
            <button
              type="button"
              onClick={onToggle}
              className="flex w-full items-center justify-between gap-3 rounded-md px-1 py-1 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 transition hover:text-neutral-950 dark:text-neutral-500 dark:hover:text-neutral-100"
              aria-expanded={isOpen}
            >
              Details
              <LuChevronDown
                className={`size-4 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="space-y-2 pt-3 text-xs leading-5 text-neutral-700 dark:text-neutral-300">
                  {project.description.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
};

export default ProjectCard;
