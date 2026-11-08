"use client";

import Image from "next/image";
import {
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { DottedUnderline } from "../DottedUnderline";
import { IconBadge } from "../IconBadge";
import { TechIcon } from "../TechIcon";
import { ProjectDialog } from "./ProjectDialog";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

const CHIP_LIMIT = 4;

function trackSpotlight(event: ReactPointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const shownTech = project.tech.slice(0, CHIP_LIMIT);
  const extraTech = project.tech.slice(CHIP_LIMIT);

  return (
    <article
      onPointerMove={trackSpotlight}
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-2xl ring-1 transition-all duration-300 ease-out",
        "bg-neutral-50 ring-neutral-200/80 hover:-translate-y-1 hover:bg-white hover:ring-neutral-300/90 hover:shadow-[0_24px_48px_-30px_rgba(0,0,0,0.45)]",
        "dark:bg-neutral-800/40 dark:ring-neutral-700/50 dark:hover:bg-neutral-800/70 dark:hover:ring-neutral-600/60",
        "motion-reduce:hover:translate-y-0",
        featured && "md:flex-row",
      )}
    >
      {/* Cursor-following highlight that rides the card edge on hover. */}
      <span
        aria-hidden="true"
        className="card-ring-glow pointer-events-none absolute inset-0 z-50 rounded-2xl p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* The whole card opens the detail dialog; footer links sit above it. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${project.title} — view project details`}
        className="absolute inset-0 z-30 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500"
      />

      {project.image && (
        <div
          className={cn(
            "relative overflow-hidden",
            featured
              ? "aspect-[16/10] md:aspect-auto md:w-1/2 md:shrink-0"
              : "aspect-[16/10]",
          )}
        >
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes={
              featured
                ? "(max-width: 767px) 100vw, 340px"
                : "(max-width: 767px) 100vw, 320px"
            }
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:group-hover:scale-100"
          />

          {project.badge && (
            /* A true corner ribbon: the triangle is clipped by the card's
               rounded corner, so both ends meet the top and right edges
               cleanly instead of being cut off mid-image. */
            <span className="pointer-events-none absolute right-0 top-0 z-10 block size-[130px]">
              <span
                className="project-ribbon absolute inset-0 block"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
              >
                <span className="absolute left-[57.5%] top-[42.5%] flex -translate-x-1/2 -translate-y-1/2 rotate-45 items-center gap-1.5 whitespace-nowrap text-[10.5px] font-semibold tracking-wide text-neutral-900">
                  <span
                    aria-hidden="true"
                    className="inline-block size-1.5 rounded-full bg-emerald-700"
                  />
                  {project.badge}
                </span>
              </span>
            </span>
          )}

          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 right-3 grid size-8 translate-y-2 place-items-center rounded-full bg-background text-sm text-foreground opacity-0 ring-1 ring-neutral-200/80 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-neutral-900 dark:ring-neutral-700/80 motion-reduce:translate-y-0"
          >
            ↗
          </span>
        </div>
      )}

      <div
        className={cn(
          "relative flex flex-1 flex-col gap-3",
          featured ? "p-5" : "p-4",
        )}
      >
        <div className="flex items-center gap-2.5">
          <div className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100">
            {project.logo ? (
              <Image
                src={project.logo}
                alt={`${project.title} logo`}
                width={32}
                height={32}
                className="aspect-square size-8 rounded-lg object-contain ring-1 ring-neutral-200/80 dark:ring-neutral-700/70"
              />
            ) : (
              <IconBadge name={project.tech[0]} />
            )}
          </div>

          <h3
            className={cn(
              "relative inline-block pb-1 tracking-tight text-foreground",
              featured ? "text-xl font-semibold" : "text-[15px] font-medium",
            )}
          >
            {project.title}
            <DottedUnderline from="100%" className="dotted-underline--sweep" />
          </h3>

          <span className="ml-auto shrink-0 font-mono text-[11px] font-light text-foreground/40">
            {project.year}
          </span>
        </div>

        <p
          className={cn(
            "line-clamp-3 text-sm leading-relaxed text-foreground/70 text-pretty",
            featured && "line-clamp-4",
          )}
        >
          {project.description[0]}
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
          {shownTech.map((t, i) => (
            <span
              key={t}
              style={{ transitionDelay: `${i * 40}ms` }}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/90 bg-white/70 px-2 py-0.5 text-[11px] font-medium text-foreground/65 transition-transform duration-300 group-hover:-translate-y-0.5 dark:border-neutral-600/60 dark:bg-neutral-950/40 dark:text-foreground/60 motion-reduce:group-hover:translate-y-0 motion-reduce:transition-none"
            >
              <TechIcon name={t} className="size-3.5" />
              {t}
            </span>
          ))}
          {extraTech.length > 0 && (
            <span
              title={extraTech.join(", ")}
              className="rounded-full px-1.5 py-0.5 font-mono text-[11px] font-light text-foreground/45"
            >
              +{extraTech.length}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-1 text-sm">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link relative z-40 inline-flex items-center gap-1.5 font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]" />
              Live
              <span className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:group-hover/link:translate-0">
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
            target="_blank"
            rel="noopener noreferrer"
            className="group/link relative z-40 inline-flex items-center gap-1 font-medium text-foreground/70 transition-colors hover:text-primary"
          >
            GitHub
            <span className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:group-hover/link:translate-0">
              ↗
            </span>
          </a>
        </div>
      </div>

      <ProjectDialog
        project={project}
        open={open}
        onClose={() => setOpen(false)}
      />
    </article>
  );
}
