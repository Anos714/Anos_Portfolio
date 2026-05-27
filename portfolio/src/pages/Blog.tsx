import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { blogs } from "../data/blog";

const Blog = () => {
  const [activeTag, setActiveTag] = useState("all");
  const [preview, setPreview] = useState<{
    slug: string;
    x: number;
    y: number;
  } | null>(null);

  const tags = useMemo(() => {
    const allTags = blogs.flatMap((blog) => blog.tags);
    return ["all", ...Array.from(new Set(allTags))];
  }, []);

  const filteredBlogs =
    activeTag === "all"
      ? blogs
      : blogs.filter((blog) => blog.tags.includes(activeTag));
  const previewBlog = preview
    ? blogs.find((blog) => blog.slug === preview.slug)
    : null;

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      {preview && previewBlog ? (
        <div
          className="pointer-events-none fixed z-50 hidden w-80 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-2xl shadow-neutral-950/15 ring-1 ring-black/5 md:block dark:border-neutral-700 dark:bg-neutral-950 dark:shadow-black/40"
          style={{
            left: Math.min(preview.x + 24, window.innerWidth - 344),
            top: Math.min(preview.y + 24, window.innerHeight - 260),
          }}
          aria-hidden="true"
        >
          <img
            src={previewBlog.image}
            alt=""
            className="aspect-[1.91/1] w-full object-cover"
          />
          <div className="border-t border-neutral-200 px-4 py-3 dark:border-neutral-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Preview
            </p>
            <p className="mt-1 line-clamp-2 text-sm font-semibold tracking-tight text-neutral-950 dark:text-neutral-100">
              {previewBlog.title}
            </p>
          </div>
        </div>
      ) : null}

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

        <section className="mt-10" aria-label="Blog filters">
          <div className="flex flex-wrap gap-2">
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
                onMouseEnter={(event) =>
                  setPreview({
                    slug: blog.slug,
                    x: event.clientX,
                    y: event.clientY,
                  })
                }
                onMouseMove={(event) =>
                  setPreview({
                    slug: blog.slug,
                    x: event.clientX,
                    y: event.clientY,
                  })
                }
                onMouseLeave={() => setPreview(null)}
                onFocus={() => setPreview(null)}
                className="group grid gap-4 border-b border-neutral-200 py-6 transition hover:border-neutral-400 sm:grid-cols-[1fr_auto] dark:border-neutral-800 dark:hover:border-neutral-600"
              >
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 ? (
                      <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                        +{blog.tags.length - 3} more
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight text-neutral-950 transition group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
                    {blog.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                    {blog.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-neutral-500 dark:text-neutral-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      {blog.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-3.5" />
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <img
                    src={blog.image}
                    alt={blog.imageAlt}
                    className="aspect-[1.91/1] w-32 rounded-md border border-neutral-200 object-cover md:hidden dark:border-neutral-800"
                  />
                  <ArrowUpRight className="size-5 shrink-0 text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-950 dark:group-hover:text-neutral-100" />
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
