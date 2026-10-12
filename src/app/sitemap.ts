import type { MetadataRoute } from "next";
import { SITE } from "@/config/app";
import { LEGAL_SLUGS } from "@/content/legal/meta";

export const dynamic = "force-static";

const ROUTES = [
  "/",
  "/faq/",
  "/about/",
  "/merchants/",
  ...LEGAL_SLUGS.map((s) => `/legal/${s}/`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: path.startsWith("/legal") ? "yearly" : "monthly",
    priority: path === "/" ? 1 : path === "/merchants/" ? 0.5 : path.startsWith("/legal") ? 0.3 : 0.7,
  }));
}
