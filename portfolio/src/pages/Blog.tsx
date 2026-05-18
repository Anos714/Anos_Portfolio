import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { blogs } from "../data/blog";

const Blog = () => {
  const [activeTag, setActiveTag] = useState("all");

  const tags = useMemo(() => {
    const allTags = blogs.flatMap((blog) => blog.tags);
    return ["all", ...Array.from(new Set(allTags))];
  }, []);

  const filteredBlogs =
    activeTag === "all"
      ? blogs
      : blogs.filter((blog) => blog.tags.includes(activeTag));

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <section className="border-b border-neutral-200 pb-10 dark:border-neutral-800">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                Blogs
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl dark:text-neutral-100">
                Notes from the backend room.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base dark:text-neutral-400">
                Practical writeups on databases, backend systems, APIs, and the
                decisions that keep products fast after the demo is over.
              </p>
            </div>

            <div className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
              {blogs.length} post{blogs.length === 1 ? "" : "s"}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
            Popular Tags
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => {
              const count =
                tag === "all"
                  ? blogs.length
                  : blogs.filter((blog) => blog.tags.includes(tag)).length;
              const isActive = activeTag === tag;

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition ${
                    isActive
                      ? "border-neutral-950 bg-neutral-950 text-white shadow-sm dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950"
                      : "border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-950 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
                  }`}
                >
                  {tag} ({count})
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
              Latest Posts ({filteredBlogs.length})
            </h2>
          </div>

          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.slug}
                to={blog.href}
                className="group block border-b border-neutral-200 py-6 transition hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-semibold tracking-tight text-neutral-950 transition group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
                      {blog.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                      {blog.description}
                    </p>

                    <p className="mt-4 text-xs font-medium text-neutral-500 dark:text-neutral-500">
                      {blog.date} / {blog.readTime}
                    </p>
                  </div>

                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-950 dark:group-hover:text-neutral-100" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
