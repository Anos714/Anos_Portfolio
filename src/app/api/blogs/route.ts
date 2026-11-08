import { NextResponse } from "next/server";
import { fetchBlogs } from "@/data/blogs";

/**
 * Lightweight blog index for the command palette. The upstream feed is
 * already cached for an hour, so this stays cheap and never blocks a page
 * render.
 */
export const revalidate = 3600;

export async function GET() {
  const posts = await fetchBlogs();
  return NextResponse.json(posts, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
