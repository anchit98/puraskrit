/**
 * Puraskrit social profiles, shown in the footer on every page.
 *
 * Real Puraskrit profile URLs (supplied by the founder, Oct 2026). Edit here to change them.
 * - Development builds: an empty or invalid URL shows the icon with a dashed "URL needed" marker
 *   and is not a link.
 * - Production builds: an empty or invalid URL is hidden (never a "#" link). If none are set,
 *   the whole "Follow Puraskrit" row is hidden.
 * - `npm run build` prints a warning listing any missing or invalid URL (scripts/check-social.mjs).
 * A URL counts as valid only if it is https and on the platform's own domain.
 */

export type SocialPlatform = "facebook" | "instagram" | "linkedin" | "x";

export const SOCIAL_LINKS: { platform: SocialPlatform; name: string; url: string; hosts: string[] }[] = [
  { platform: "facebook", name: "Facebook", url: "https://www.facebook.com/share/14wBDWXpogt/?mibextid=wwXIfr", hosts: ["facebook.com", "www.facebook.com"] },
  { platform: "instagram", name: "Instagram", url: "https://www.instagram.com/puraskrit.in/", hosts: ["instagram.com", "www.instagram.com"] },
  { platform: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/company/puraskrit/", hosts: ["linkedin.com", "www.linkedin.com"] },
  { platform: "x", name: "X", url: "https://x.com/puraskritindia", hosts: ["x.com", "www.x.com", "twitter.com", "www.twitter.com"] },
];

export function isValidSocialUrl(url: string, hosts: string[]) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && hosts.includes(u.hostname);
  } catch {
    return false;
  }
}
