import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowLeft, CalendarDays, Clock3, type LucideIcon } from "lucide-react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

type ArticleSection = {
  title: string;
  id: string;
};

type BlogArticleLayoutProps = {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  cover: {
    src: string;
    alt: string;
    caption: string;
  };
  accent: "emerald" | "red";
  sections: ArticleSection[];
  sidebar: {
    icon: LucideIcon;
    title: string;
    note: string;
  };
  children: ReactNode;
};

const accentStyles = {
  emerald: {
    bar: "bg-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200",
    active:
      "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200",
  },
  red: {
    bar: "bg-red-500",
    pill: "bg-red-50 text-red-700 dark:bg-red-400/10 dark:text-red-200",
    active:
      "border-red-500 bg-red-50 text-red-700 dark:bg-red-400/10 dark:text-red-200",
  },
};

const BlogArticleLayout = ({
  title,
  description,
  date,
  readTime,
  tags,
  cover,
  accent,
  sections,
  sidebar,
  children,
}: BlogArticleLayoutProps) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const styles = accentStyles[accent];
  const SidebarIcon = sidebar.icon;

  useEffect(() => {
    const updateReaderState = () => {
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;

      setReadingProgress(Math.min(100, Math.max(0, progress)));

      const currentSection = sections
        .map((section) => ({
          id: section.id,
          top: document.getElementById(section.id)?.getBoundingClientRect()
            .top,
        }))
        .filter(
          (section): section is { id: string; top: number } =>
            typeof section.top === "number",
        )
        .reverse()
        .find((section) => section.top <= 150);

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    updateReaderState();
    window.addEventListener("scroll", updateReaderState, { passive: true });
    window.addEventListener("resize", updateReaderState);

    return () => {
      window.removeEventListener("scroll", updateReaderState);
      window.removeEventListener("resize", updateReaderState);
    };
  }, [sections]);

  return (
    <div className="min-h-screen w-full">
      <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-transparent">
        <div
          className={`h-full transition-[width] duration-150 ${styles.bar}`}
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-14">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 transition hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <ArrowLeft className="size-4" />
          Blogs
        </Link>

        <header className="mt-8 border-b border-neutral-200 pb-8 dark:border-neutral-800">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles.pill}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl dark:text-neutral-100">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-neutral-500 dark:text-neutral-500">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4" />
              {date}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="size-4" />
              {readTime}
            </span>
          </div>
        </header>

        <nav
          className="sticky top-[57px] z-40 -mx-4 border-b border-neutral-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden dark:border-neutral-800 dark:bg-neutral-900/90"
          aria-label="Reading tracker"
        >
          <div className="mb-2 flex items-center justify-between text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            <span>Reading</span>
            <span>{Math.round(readingProgress)}%</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  activeSection === section.id
                    ? styles.active
                    : "border-neutral-200 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
                }`}
              >
                {section.title}
              </a>
            ))}
          </div>
        </nav>

        <article className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0">
            <figure className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
              <img
                src={cover.src}
                alt={cover.alt}
                className="aspect-video w-full object-cover"
              />
              <figcaption className="border-t border-neutral-200 px-4 py-3 text-xs text-neutral-500 dark:border-neutral-800">
                {cover.caption}
              </figcaption>
            </figure>

            {children}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950">
                <div className="mb-2 flex items-center justify-between text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                  <span>Reader</span>
                  <span>{Math.round(readingProgress)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div
                    className={`h-full rounded-full transition-[width] duration-150 ${styles.bar}`}
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950">
                <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                  <SidebarIcon className="size-4" />
                  {sidebar.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  {sidebar.note}
                </p>
              </div>

              <div className="border-l border-neutral-200 pl-5 dark:border-neutral-800">
                <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                  In this post
                </p>
                <div className="mt-4 space-y-3 text-sm">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`block transition ${
                        activeSection === section.id
                          ? "font-semibold text-neutral-950 dark:text-neutral-100"
                          : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                      }`}
                    >
                      {section.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogArticleLayout;
