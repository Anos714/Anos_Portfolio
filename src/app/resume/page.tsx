import { Navbar } from "@/components/Navbar";
import { DottedDivider } from "@/components/DottedDivider";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { DottedLink } from "@/components/DottedLink";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "The resume of Rahul Sain — Full Stack Developer specializing in AI-powered SaaS products. Education, highlights, and full tech stack.",
  alternates: { canonical: "/resume" },
};

const RESUME_PREVIEW_URL =
  "https://drive.google.com/file/d/16mgc9bf97b-KXsSN9cWcnDr6NNi_uVQK/preview";

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
              My latest resume is embedded below. If it doesn&apos;t load, you
              can open it directly via the link.
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
