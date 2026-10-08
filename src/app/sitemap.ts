import type { MetadataRoute } from "next";
import { SITE } from "@/config/app";
import { LEGAL_SLUGS } from "@/content/legal/meta";

export const dynamic = "force-static";

const ROUTES = [
  "/",
  "/how-it-works/",
  "/rewards/",
  "/discover/",
  "/faq/",
  "/merchants/",
  "/merchants/how-it-works/",
  "/merchants/loyalty/",
  "/merchants/offers/",
  "/merchants/join/",
  "/merchants/faq/",
  "/about/",
  "/contact/",
  ...LEGAL_SLUGS.map((s) => `/legal/${s}/`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: path.startsWith("/legal") ? "yearly" : "monthly",
    priority: path === "/" ? 1 : path === "/merchants/" ? 0.9 : path.startsWith("/legal") ? 0.3 : 0.7,
  }));
}
