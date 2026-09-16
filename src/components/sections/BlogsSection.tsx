import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { BlogsList } from "../blog/BlogsList";
import { SeeMoreLink } from "../SeeMoreLink";
import { fetchBlogs } from "@/data/blogs";

export async function BlogsSection() {
  const posts = await fetchBlogs();

  return (
    <section id="blogs" className="flex scroll-mt-24 flex-col gap-4">
      <Reveal>
        <SectionHeading>Blogs</SectionHeading>
      </Reveal>

      <BlogsList posts={posts} />

      {posts.length > 0 && (
        <Reveal delay={posts.length * 0.05}>
          <SeeMoreLink href="/blogs" label="See all blogs" />
        </Reveal>
      )}
    </section>
  );
}
