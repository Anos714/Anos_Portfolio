import { site, socials } from "@/data/site";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { DottedLink } from "../DottedLink";

function MailIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 7.2 5.1a2 2 0 0 0 2.6 0L20.5 7" />
    </svg>
  );
}

function PhoneIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8.5 3.5H5.2A1.7 1.7 0 0 0 3.5 5.3c.3 8 5.2 12.9 13.2 13.2a1.7 1.7 0 0 0 1.8-1.7v-3.3l-4-1.3-1.9 1.9a13.6 13.6 0 0 1-4.2-4.2l1.9-1.9z" />
    </svg>
  );
}

const contacts = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: MailIcon,
  },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
    icon: PhoneIcon,
  },
];

export function CallToActionSection() {
  return (
    <section className="flex scroll-mt-24 flex-col gap-6">
      <Reveal>
        <SectionHeading>Let&apos;s work together</SectionHeading>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 p-6 transition-colors duration-300 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-[radial-gradient(circle,rgba(10,10,10,0.05),transparent_65%)] dark:bg-[radial-gradient(circle,rgba(237,237,237,0.05),transparent_65%)]"
          />

          <p className="relative text-sm leading-relaxed text-foreground/75 text-pretty">
            I&apos;m always open to building great products with people who care
            about quality. Whether it&apos;s a full-time role, freelance work,
            or a collaboration on something interesting — let&apos;s talk.
          </p>

          <div className="relative mt-5 grid gap-2 sm:grid-cols-2">
            {contacts.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="group/contact flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm hover:shadow-neutral-900/5 dark:border-neutral-800 dark:bg-neutral-950/30 dark:hover:border-neutral-700 dark:hover:shadow-black/30"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 text-foreground/60 transition-colors duration-200 group-hover/contact:border-neutral-300 group-hover/contact:text-foreground dark:border-neutral-800 dark:group-hover/contact:border-neutral-700">
                  <Icon />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/40">
                    {label}
                  </span>
                  <span className="truncate text-sm text-foreground/80 transition-colors group-hover/contact:text-foreground">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <div className="relative mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
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
