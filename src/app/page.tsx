import { Navbar } from "@/components/Navbar";
import { DottedDivider } from "@/components/DottedDivider";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { BlogsSection } from "@/components/sections/BlogsSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import { GuestbookSection } from "@/components/sections/GuestbookSection";
import { Footer } from "@/components/Footer";
import { PersonJsonLd } from "@/components/PersonJsonLd";

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <Navbar />

      <main>
        <div className="mx-auto max-w-2xl px-4 pb-10">
          <HeroSection />

          <div className="my-10 w-full shrink-0">
            <DottedDivider />
          </div>

          <ProjectsSection />

          <div className="my-10 w-full shrink-0">
            <DottedDivider />
          </div>

          <WorkSection />

          <div className="my-10 w-full shrink-0">
            <DottedDivider />
          </div>

          <BlogsSection />

          <div className="my-10 w-full shrink-0">
            <DottedDivider />
          </div>

          <ResumeSection />

          <div className="my-10 w-full shrink-0">
            <DottedDivider />
          </div>

          <CallToActionSection />

          <div className="my-10 w-full shrink-0">
            <DottedDivider />
          </div>

          <GuestbookSection />
        </div>
      </main>

      <Footer />
    </>
  );
}
