import { Navbar } from "@/components/Navbar";
import { DottedDivider } from "@/components/DottedDivider";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { LinkPreview } from "@/components/LinkPreview";
import { DottedLink } from "@/components/DottedLink";
import { inspirations, inspirationNote } from "@/data/inspiration";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inspiration",
  description:
    "The creators and teachers who inspired Rahul Sain's journey into software development.",
  alternates: { canonical: "/inspiration" },
};

export default function InspirationPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto max-w-2xl px-4 pb-10">
          <div className="pt-4">
            <Reveal>
              <SectionHeading>Inspiration</SectionHeading>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <p className="mt-6 text-sm leading-relaxed text-foreground/70 text-pretty">
              {inspirationNote}
            </p>
          </Reveal>

          <div className="mt-8 flex flex-col gap-4">
            {inspirations.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.05}>
                <div className="flex flex-col gap-1 border-b border-neutral-100 pb-3 last:border-0 dark:border-neutral-800">
                  <LinkPreview url={item.href} className="text-base">
                    {item.name}
                  </LinkPreview>
                  <p className="text-sm text-foreground/60">{item.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

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
