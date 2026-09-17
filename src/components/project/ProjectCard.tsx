import Image from "next/image";
import { IconBadge } from "../IconBadge";
import { TechIcon } from "../TechIcon";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col gap-3 overflow-hidden rounded-2xl bg-neutral-50/50 shadow-sm shadow-neutral-900/[0.03] ring-1 ring-neutral-200/70 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-50 hover:shadow-md hover:shadow-neutral-900/[0.06] hover:ring-neutral-300/80 dark:bg-neutral-900/50 dark:shadow-neutral-950/30 dark:ring-neutral-800/70 dark:hover:bg-neutral-900 dark:hover:shadow-neutral-950/50 dark:hover:ring-neutral-700/80">
      {project.image && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="flex flex-col gap-3 px-4 pb-4">
        <div className="flex items-center gap-2">
          <div className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
            {project.logo ? (
              <Image
                src={project.logo}
                alt={`${project.title} logo`}
                width={32}
                height={32}
                className="aspect-square size-8 rounded-md object-contain ring-1 ring-neutral-200/70 dark:ring-neutral-800/70"
              />
            ) : (
              <IconBadge name={project.tech[0]} />
            )}
          </div>
          <h3 className="text-sm font-medium text-foreground">
            {project.title}
          </h3>
          <span className="ml-auto font-mono text-xs font-light text-foreground/50">
            {project.year}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-foreground/70 text-pretty">
          {project.description[0]}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-foreground/70 transition-colors duration-200 hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <TechIcon name={t} className="size-3.5" />
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 pt-2 text-sm">
          {project.live ? (
            <a
              href={project.live}
              className="group/link inline-flex items-center gap-1.5 font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]" />
              Live
              <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                ↗
              </span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground/70">
              <span className="size-1.5 animate-pulse rounded-full bg-orange-500 shadow-[0_0_8px_2px_rgba(249,115,22,0.7)]" />
              Building
            </span>
          )}
          <span className="size-1 rounded-full bg-neutral-200 dark:bg-neutral-700" />
          <a
            href={project.github}
            className="group/link inline-flex items-center gap-1 font-medium text-foreground/70 transition-colors hover:text-primary"
          >
            GitHub
            <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
