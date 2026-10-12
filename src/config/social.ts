/**
 * Puraskrit social profiles, shown in the footer on every page.
 *
 * TODO(founder): each URL below is the platform's home page as a placeholder. Replace it with
 * the real Puraskrit profile URL (e.g. https://www.instagram.com/<handle>).
 * - Development builds: an empty or invalid URL shows the icon with a dashed "URL needed" marker
 *   and is not a link.
 * - Production builds: an empty or invalid URL is hidden (never a "#" link). If none are set,
 *   the whole "Follow Puraskrit" row is hidden.
 * - `npm run build` prints a warning listing any missing or invalid URL (scripts/check-social.mjs).
 * A URL counts as valid only if it is https and on the platform's own domain.
 */

export type SocialPlatform = "facebook" | "instagram" | "linkedin" | "x";

export const SOCIAL_LINKS: { platform: SocialPlatform; name: string; url: string; hosts: string[] }[] = [
  // TODO(founder): Facebook page URL, e.g. https://www.facebook.com/<page>
  { platform: "facebook", name: "Facebook", url: "https://www.facebook.com/", hosts: ["facebook.com", "www.facebook.com"] },
  // TODO(founder): Instagram profile URL, e.g. https://www.instagram.com/<handle>
  { platform: "instagram", name: "Instagram", url: "https://www.instagram.com/", hosts: ["instagram.com", "www.instagram.com"] },
  // TODO(founder): LinkedIn company page URL, e.g. https://www.linkedin.com/company/<page>
  { platform: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/", hosts: ["linkedin.com", "www.linkedin.com"] },
  // TODO(founder): X profile URL, e.g. https://x.com/<handle>
  { platform: "x", name: "X", url: "https://x.com/", hosts: ["x.com", "www.x.com", "twitter.com", "www.twitter.com"] },
];

export function isValidSocialUrl(url: string, hosts: string[]) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && hosts.includes(u.hostname);
  } catch {
    return false;
  }
}
