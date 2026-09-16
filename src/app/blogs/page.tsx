import { Navbar } from "@/components/Navbar";
import { DottedDivider } from "@/components/DottedDivider";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { BlogsList } from "@/components/blog/BlogsList";
import { fetchBlogs } from "@/data/blogs";
import { DottedLink } from "@/components/DottedLink";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Articles and writing by Rahul Sain on full-stack development, AI-powered SaaS, and software engineering.",
  alternates: { canonical: "/blogs" },
};

export default async function BlogsPage() {
  const posts = await fetchBlogs();

  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto max-w-2xl px-4 pb-10">
          <div className="pt-4">
            <Reveal>
              <SectionHeading>All Blogs</SectionHeading>
            </Reveal>
          </div>

          <div className="mt-6">
            <BlogsList posts={posts} />
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
