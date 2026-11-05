"use client";

import { useState } from "react";
import Image from "next/image";
import { IconBadge } from "../IconBadge";
import { TechIcon } from "../TechIcon";
import { ProjectDialog } from "./ProjectDialog";
import type { Project } from "@/data/projects";

const VISIBLE_TECH = 4;

export function ProjectCard({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);
  const shownTech = project.tech.slice(0, VISIBLE_TECH);
  const hiddenTechCount = project.tech.length - shownTech.length;

  return (
    <article className="group/card isolate relative flex h-full flex-col rounded-2xl bg-white/70 ring-1 ring-neutral-200/70 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:bg-white hover:ring-neutral-300/80 dark:bg-neutral-900/40 dark:ring-neutral-800/70 dark:hover:bg-neutral-900 dark:hover:ring-neutral-700/80">
      {/* Elevation lives on its own layer and fades, so the lift never repaints a box-shadow. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-white opacity-0 shadow-[0_30px_60px_-32px_rgba(10,10,10,0.35)] transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:opacity-100 dark:bg-neutral-900 dark:shadow-[0_30px_60px_-32px_rgba(0,0,0,0.8)]"
      />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-neutral-400/80 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-x-100 dark:via-neutral-500/70"
      />

      {project.image && (
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-neutral-100 dark:bg-neutral-950">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.04]"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-neutral-950/[0.07] transition-opacity duration-300 group-hover/card:opacity-0 dark:bg-black/25"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-neutral-950/45 via-neutral-950/5 to-transparent opacity-60 transition-opacity duration-500 group-hover/card:opacity-90"
          />
          <span
            aria-hidden
            className="absolute bottom-3 right-3 grid size-8 translate-y-1.5 place-items-center rounded-full bg-white/90 text-neutral-900 opacity-0 shadow-sm transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-y-0 group-hover/card:opacity-100"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 21h4a2 2 0 0 0 2-2v-4" />
            </svg>
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        <div className="flex items-center gap-2.5">
          <span className="shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:-rotate-6 group-hover/card:scale-110">
            {project.logo ? (
              <Image
                src={project.logo}
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-lg object-contain ring-1 ring-neutral-200/80 dark:ring-neutral-800/80"
              />
            ) : (
              <IconBadge name={project.tech[0]} />
            )}
          </span>
          <h3 className="min-w-0 flex-1 truncate font-display text-[1.0625rem] font-medium leading-tight tracking-tight">
            {project.title}
          </h3>
          <span className="shrink-0 font-mono text-[11px] font-light tabular-nums tracking-widest text-foreground/45">
            {project.year}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-pretty text-foreground/65 transition-colors duration-300 group-hover/card:text-foreground/80">
          {project.description[0]}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {shownTech.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 px-2 py-0.5 font-mono text-[11px] text-foreground/60 transition-colors duration-300 group-hover/card:border-neutral-300 group-hover/card:text-foreground/80 dark:border-neutral-800 dark:group-hover/card:border-neutral-700"
            >
              <TechIcon name={tech} className="size-3.5" />
              {tech}
            </span>
          ))}
          {hiddenTechCount > 0 && (
            <span className="inline-flex items-center px-1 py-0.5 font-mono text-[11px] text-foreground/40">
              +{hiddenTechCount}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-4 border-t border-dashed border-neutral-200 pt-3 text-sm transition-colors duration-300 group-hover/card:border-neutral-300 dark:border-neutral-800 dark:group-hover/card:border-neutral-700">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/live relative z-20 inline-flex items-center gap-2 font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              Live
              <span className="transition-transform duration-300 group-hover/live:translate-x-0.5">
                ↗
              </span>
            </a>
          ) : (
            <span className="relative z-20 inline-flex items-center gap-2 font-medium text-foreground/70">
              <span className="relative inline-flex size-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_2px_rgba(245,158,11,0.45)]" />
              Building
            </span>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/source relative z-20 ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-foreground/50 transition-colors hover:text-primary"
          >
            source
            <span className="transition-transform duration-300 group-hover/source:translate-x-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`View details for ${project.title}`}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      <ProjectDialog
        project={project}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </article>
  );
}
