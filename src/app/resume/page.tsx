import { Navbar } from "@/components/Navbar";
import { DottedDivider } from "@/components/DottedDivider";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { DottedLink } from "@/components/DottedLink";
import { Footer } from "@/components/Footer";
import { resumeUrl, site } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "The resume of Rahul Sain — Full Stack Developer with 3+ years of experience in React, Node.js, TypeScript, PostgreSQL, and AI-powered products.",
  alternates: { canonical: "/resume" },
};

const RESUME_PREVIEW_URL = resumeUrl;

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto max-w-2xl px-4 pb-10">
          <div className="pt-4">
            <Reveal>
              <SectionHeading>Resume</SectionHeading>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <p className="mt-6 text-sm text-foreground/60">
              My latest resume is embedded below. You can also{" "}
              <DottedLink
                href={RESUME_PREVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                open it in a new tab
              </DottedLink>{" "}
              or{" "}
              <DottedLink href={RESUME_PREVIEW_URL} download>
                download the PDF
              </DottedLink>
              .
            </p>
            <p className="mt-2 text-sm text-foreground/50">
              {site.availability} · {site.languages}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
              <iframe
                src={RESUME_PREVIEW_URL}
                title="Rahul Sain — Resume"
                className="h-[75vh] w-full"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div className="my-10 w-full shrink-0">
            <DottedDivider />
          </div>

          <Reveal>
            <p className="text-sm text-foreground/50">
              <DottedLink href="/">← Back home</DottedLink>
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
