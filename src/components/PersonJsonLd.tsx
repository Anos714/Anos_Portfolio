import { site, socials } from "@/data/site";
import { siteUrl } from "@/lib/site";

export function PersonJsonLd() {
  const sameAs = socials
    .filter((s) => s.href.startsWith("http"))
    .map((s) => s.href);

  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: siteUrl,
    image: `${siteUrl}/icon.png`,
    jobTitle: site.title,
    description: site.summary,
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
      addressCountry: "IN",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Bun",
      "Hono",
      "Drizzle ORM",
      "Gemini AI",
      "Docker",
    ],
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
