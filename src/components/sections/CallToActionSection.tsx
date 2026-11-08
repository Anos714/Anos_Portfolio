import { site, socials } from "@/data/site";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { DottedLink } from "../DottedLink";
import { CalButton } from "../CalButton";

export function CallToActionSection() {
  return (
    <section className="flex scroll-mt-24 flex-col gap-6">
      <Reveal>
        <SectionHeading>Let&apos;s work together</SectionHeading>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 p-6 transition-colors duration-300 hover:border-neutral-300 sm:p-7 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-[radial-gradient(circle,rgba(10,10,10,0.05),transparent_65%)] dark:bg-[radial-gradient(circle,rgba(237,237,237,0.05),transparent_65%)]"
          />

          <p className="relative font-serif text-[1.65rem] leading-[1.12] tracking-tight text-foreground text-pretty sm:text-[1.9rem]">
            Have a project in mind?
          </p>

          <p className="relative mt-2.5 max-w-md text-sm leading-relaxed text-foreground/70 text-pretty">
            I&apos;m open to full-time roles, freelance work, and collaborations
            on things worth building. Pick a time that works — no email thread
            needed.
          </p>

          <div className="relative mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
            <CalButton />
            <a
              href={`mailto:${site.email}`}
              className="group/mail inline-flex items-center gap-1.5 text-sm text-foreground/65 transition-colors hover:text-foreground"
            >
              <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/40">
                or email
              </span>
              <span className="truncate underline-offset-4 group-hover/mail:underline">
                {site.email}
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/mail:-translate-y-0.5 group-hover/mail:translate-x-0.5 motion-reduce:transition-none"
              >
                ↗
              </span>
            </a>
          </div>

          <div className="relative mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-dashed border-neutral-200 pt-4 dark:border-neutral-800">
            <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/40">
              Find me
            </span>
            {socials
              .filter((s) => !s.href.startsWith("mailto:"))
              .map(({ label, href }) => (
                <DottedLink
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs"
                >
                  {label}
                </DottedLink>
              ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
