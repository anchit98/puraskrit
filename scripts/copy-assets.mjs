// Copies the founder-supplied assets from website-assets/ into public/.
// website-assets/ stays the single source; public/assets/ is generated (gitignored).
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SRC = "website-assets";
const DEST = "public/assets";

if (!existsSync(SRC)) {
  console.error(`[copy-assets] Missing ${SRC}/. Add the asset folder before building.`);
  process.exit(1);
}
// Screenshots that contain banned wording ("Spend ₹X", "more to go", "record your spend").
// They are never published; the moments are rebuilt as coded screens (src/components/screens).
// Remove a name from this list only when the founder supplies a corrected original.
const EXCLUDED = new Set([
  "buyer-01-loyalty.png",
  "buyer-02-milestones.png",
  "buyer-05-collect-qr.png",
  "seller-01-milestones.png",
  "seller-05b-enter-amount.png",
]);

rmSync(DEST, { recursive: true, force: true }); // start clean so excluded files never linger
mkdirSync(DEST, { recursive: true });

let count = 0;
for (const file of readdirSync(SRC)) {
  if (file.startsWith("_") || file.startsWith(".")) continue; // skip _unused/ and dotfiles
  if (!/\.(png|ico|svg|webp|jpg)$/i.test(file)) continue;
  if (EXCLUDED.has(file)) continue;
  cpSync(join(SRC, file), join(DEST, file));
  count++;
}

// Favicons at the site root, where browsers look for them.
cpSync(join(SRC, "favicon.ico"), "public/favicon.ico");

writeFileSync(
  "public/site.webmanifest",
  JSON.stringify(
    {
      name: "Puraskrit",
      short_name: "Puraskrit",
      icons: [
        { src: "/assets/favicon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/assets/favicon-512.png", sizes: "512x512", type: "image/png" },
      ],
      theme_color: "#2563EB",
      background_color: "#F8F9FB",
      display: "browser",
    },
    null,
    2,
  ),
);

console.log(`[copy-assets] Copied ${count} files to ${DEST}/`);
