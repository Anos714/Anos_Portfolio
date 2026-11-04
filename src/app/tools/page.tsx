import { Navbar } from "@/components/Navbar";
import { DottedDivider } from "@/components/DottedDivider";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ToolRow } from "@/components/project/ToolRow";
import { tools } from "@/data/tools";
import { DottedLink } from "@/components/DottedLink";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Tools",
  description:
    "Open-source developer tools by Rahul Sain — clockit, a Rust + Tauri focus timer for COSMIC, and LeafNode, a Go terminal todo system.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto max-w-2xl px-4 pb-10">
          <div className="pt-4">
            <Reveal>
              <SectionHeading>Developer Tools / OSS Work</SectionHeading>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <p className="mt-6 text-sm leading-relaxed text-foreground/60 text-pretty">
              Tools I built for myself first and then shipped — CLIs, desktop
              apps, and everything in between, open source.
            </p>
          </Reveal>

          <div className="mt-4 flex flex-col">
            {tools.map((tool, i) => (
              <ToolRow key={tool.title} tool={tool} index={i} />
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
