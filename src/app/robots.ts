import type { MetadataRoute } from "next";
import { SITE } from "@/config/app";

export const dynamic = "force-static";

// TODO(lead-dev): disallow all on staging environments.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${SITE.url}/sitemap.xml` };
}
