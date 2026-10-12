// Copies the founder-supplied assets from website-assets/ into public/.
// website-assets/ stays the single source; public/assets/ is generated (gitignored).
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const SRC = "website-assets";
const DEST = "public/assets";

if (!existsSync(SRC)) {
  console.error(`[copy-assets] Missing ${SRC}/. Add the asset folder before building.`);
  process.exit(1);
}
// Screenshots that are never published until the founder supplies corrected originals:
// banned wording ("Spend ₹X", "more to go", "record your spend"), a location ("Electronic City",
// "Mumbai") or a sample name + phone number. Remove a name here once its corrected file arrives.
const EXCLUDED = new Set([
  "buyer-01-loyalty.png",
  "buyer-02-milestones.png",
  "buyer-03-discover.png",
  "buyer-04-offers.png", // shows a person's name as a shop name; replaced by buyer-06
  "buyer-05-collect-qr.png",
  "seller-01-milestones.png",
  "seller-05b-enter-amount.png",
]);

/**
 * Screenshots: trim baked-in white margins (they show up as blank bars inside the phone frame)
 * and record the final size in src/config/generated/screenshots.json, so frames match exactly.
 */
async function trimScreenshot(src, dest) {
  const img = sharp(src).flatten({ background: "#ffffff" });
  const { data, info } = await img.clone().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const white = (x, y) => {
    const i = (y * W + x) * C;
    return data[i] > 247 && data[i + 1] > 247 && data[i + 2] > 247;
  };
  const colWhite = (x) => { let n = 0; for (let y = 0; y < H; y += 2) if (white(x, y)) n++; return n / Math.ceil(H / 2) > 0.995; };
  const rowWhite = (y) => { let n = 0; for (let x = 0; x < W; x += 2) if (white(x, y)) n++; return n / Math.ceil(W / 2) > 0.995; };
  let l = 0; while (l < W / 3 && colWhite(l)) l++;
  let r = W - 1; while (r > (W * 2) / 3 && colWhite(r)) r--;
  // Only side margins are trimmed (they cause bars in the frame); top/bottom whitespace is kept
  // so a status-bar area can stay clear of the phone's camera notch.
  const t = 0;
  const b = H - 1;
  void rowWhite;
  const box = { left: l, top: t, width: r - l + 1, height: b - t + 1 };
  await sharp(src).extract(box).png().toFile(dest);
  return { width: box.width, height: box.height, trimmed: { l, r: W - 1 - r, t, b: H - 1 - b } };
}
const dims = {};

rmSync(DEST, { recursive: true, force: true }); // start clean so excluded files never linger
mkdirSync(DEST, { recursive: true });

let count = 0;
for (const file of readdirSync(SRC)) {
  if (file.startsWith("_") || file.startsWith(".")) continue; // skip _unused/ and dotfiles
  if (!/\.(png|ico|svg|webp|jpg)$/i.test(file)) continue;
  if (EXCLUDED.has(file)) continue;
  if (/^(buyer|seller)-.*\.png$/.test(file)) {
    const d = await trimScreenshot(join(SRC, file), join(DEST, file));
    dims[file.replace(/\.png$/, "")] = { width: d.width, height: d.height };
  } else cpSync(join(SRC, file), join(DEST, file));
  count++;
}
mkdirSync("src/config/generated", { recursive: true });
writeFileSync("src/config/generated/screenshots.json", JSON.stringify(dims, null, 2) + "\n");

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
