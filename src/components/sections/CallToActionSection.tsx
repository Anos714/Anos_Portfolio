import { site } from "@/data/site";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { DottedLink } from "../DottedLink";

export function CallToActionSection() {
  return (
    <section className="flex scroll-mt-24 flex-col gap-6">
      <Reveal>
        <SectionHeading>Let&apos;s work together</SectionHeading>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm leading-relaxed text-foreground/80 text-pretty">
            I&apos;m always open to building great products with people who
            care about quality. Whether it&apos;s a full-time role, freelance
            work, or a collaboration on something interesting — let&apos;s
            talk.
          </p>

          <div className="flex flex-col gap-2 text-sm">
            <p className="flex items-center gap-2 text-foreground/70">
              <span className="font-medium text-foreground">Email</span>
              <DottedLink href={`mailto:${site.email}`}>
                {site.email}
              </DottedLink>
            </p>
            <p className="flex items-center gap-2 text-foreground/70">
              <span className="font-medium text-foreground">Phone</span>
              <DottedLink href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </DottedLink>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
