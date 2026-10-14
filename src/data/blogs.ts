export type Blog = {
  title: string;
  slug: string;
  date: string;
};

type ApiBlog = {
  title: string;
  slug?: string;
  createdAt?: string;
};

const BLOG_BASE_URL = "https://inkwell-blogs.pages.dev/blogs";

export function blogUrl(slug: string) {
  return `${BLOG_BASE_URL}/${slug}`;
}

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch("https://inkwell-rca7.onrender.com/api/v1/blogs", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`[blogs] upstream responded with status ${res.status}`);
      return [];
    }
    const json: unknown = await res.json();
    const data: ApiBlog[] = Array.isArray(
      (json as { data?: unknown } | null)?.data,
    )
      ? ((json as { data: ApiBlog[] }).data ?? [])
      : [];

    // Skip malformed rows: an empty slug previously produced dead `href="#"`
    // links and duplicate React keys downstream.
    const posts: Blog[] = [];
    for (const b of data) {
      if (typeof b.title !== "string" || b.title.length === 0) continue;
      if (typeof b.slug !== "string" || b.slug.length === 0) continue;
      let date = "";
      if (b.createdAt) {
        const time = new Date(b.createdAt).getTime();
        // Guard Invalid Date — getUTCFullYear() on it would render "NaN".
        if (!Number.isNaN(time)) {
          date = new Date(time).getUTCFullYear().toString();
        }
      }
      posts.push({ title: b.title, slug: b.slug, date });
    }
    return posts;
  } catch (err) {
    console.warn("[blogs] fetch failed:", err);
    return [];
  }
}
