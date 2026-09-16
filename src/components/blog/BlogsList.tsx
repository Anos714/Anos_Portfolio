import { Reveal } from "../Reveal";
import { blogUrl, type Blog } from "@/data/blogs";

export function BlogsList({ posts }: { posts: Blog[] }) {
  if (posts.length === 0) {
    return (
      <Reveal>
        <p className="text-sm text-foreground/50">More writing coming soon.</p>
      </Reveal>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post, i) => (
        <Reveal key={post.slug || post.title} delay={i * 0.05}>
          <a
            href={post.slug ? blogUrl(post.slug) : "#"}
            target={post.slug ? "_blank" : undefined}
            rel={post.slug ? "noopener noreferrer" : undefined}
            className="group flex items-center justify-between gap-6 border-b border-neutral-100 pb-3 transition-colors duration-200 last:border-0 dark:border-neutral-800"
          >
            <span className="flex items-center gap-3 truncate text-foreground transition-colors duration-200 group-hover:text-primary">
              <span className="size-1.5 shrink-0 rounded-full bg-neutral-300 transition-colors duration-200 group-hover:bg-neutral-900 dark:bg-neutral-700 dark:group-hover:bg-neutral-100" />
              <span className="truncate">{post.title}</span>
            </span>
            <span className="shrink-0 font-mono text-xs font-light text-foreground/50 transition-colors duration-200 group-hover:text-primary">
              {post.date}
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
