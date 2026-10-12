// Build-time warning for social links that are still placeholders (src/config/social.ts).
// Missing links are hidden in production builds; this makes sure that never happens silently.
import { readFileSync } from "node:fs";

const src = readFileSync("src/config/social.ts", "utf8");
const rows = [...src.matchAll(/\{\s*platform:\s*"(\w+)",\s*name:\s*"([^"]+)",\s*url:\s*"([^"]*)",\s*hosts:\s*\[([^\]]*)\]/g)];
const problems = [];
for (const [, , name, url, hostsRaw] of rows) {
  const hosts = [...hostsRaw.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  if (!url) { problems.push(`${name}: no URL yet (hidden in production)`); continue; }
  try {
    const u = new URL(url);
    if (u.protocol !== "https:" || !hosts.includes(u.hostname)) problems.push(`${name}: "${url}" is not a valid ${name} URL (hidden in production)`);
    else if (u.pathname.length <= 1) problems.push(`${name}: still the platform home page placeholder (${url}); replace with the Puraskrit profile URL`);
  } catch { problems.push(`${name}: "${url}" is not a URL (hidden in production)`); }
}
if (rows.length !== 4) problems.push(`expected 4 social entries, found ${rows.length}`);
if (problems.length) console.warn(`\n⚠️  [check-social] Footer social links need attention (src/config/social.ts):\n   - ${problems.join("\n   - ")}\n`);
else console.log("[check-social] All 4 social links set");
