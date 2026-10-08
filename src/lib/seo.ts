import type { Metadata } from "next";
import { SITE } from "@/config/app";

/** Unique title + description per page, canonical URL and Open Graph (context §9.3). */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Puraskrit`,
      description,
      url,
      siteName: "Puraskrit",
      type: "website",
      locale: "en_IN",
      images: [{ url: `${SITE.url}/assets/og-image.png`, width: 1200, height: 630, alt: "Puraskrit" }],
    },
    twitter: { card: "summary_large_image", title: `${title} | Puraskrit`, description, images: [`${SITE.url}/assets/og-image.png`] },
  };
}
