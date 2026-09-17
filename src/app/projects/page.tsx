import { Navbar } from "@/components/Navbar";
import { DottedDivider } from "@/components/DottedDivider";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/project/ProjectCard";
import { projects } from "@/data/projects";
import { DottedLink } from "@/components/DottedLink";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AI-powered SaaS and full-stack projects by Rahul Sain — Xcel, Inkwell, Konnect, ThePerfectResume, and SmartBillr, built with React, Node.js, TypeScript, PostgreSQL, and Gemini AI.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto max-w-2xl px-4 pb-10">
          <div className="pt-4">
            <Reveal>
              <SectionHeading>All Projects</SectionHeading>
            </Reveal>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.06}>
                <ProjectCard project={project} />
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
