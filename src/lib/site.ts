// Canonical site origin for SEO/sitemap/OG URLs. An empty env value must
// fall back to localhost too (?? would keep the empty string and produce
// broken absolute URLs), and all trailing slashes are stripped.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "http://localhost:3000";
