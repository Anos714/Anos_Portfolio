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

const BLOG_BASE_URL = "https://inkwell-0tx.pages.dev/blogs";

export function blogUrl(slug: string) {
  return `${BLOG_BASE_URL}/${slug}`;
}

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch("https://inkwell-x9r7.onrender.com/api/v1/blogs", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const data: ApiBlog[] = json?.data ?? [];
    return data.map((b) => ({
      title: b.title,
      slug: b.slug ?? "",
      date: b.createdAt ? new Date(b.createdAt).getUTCFullYear().toString() : "",
    }));
  } catch {
    return [];
  }
}
