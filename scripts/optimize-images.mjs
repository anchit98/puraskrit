// Screenshots: generates compressed WebP files in public/assets/ and removes the PNG copies,
// so only the small WebP files are published (all current browsers support WebP).
//   <name>.webp       up to 900 px wide, quality 76
//   <name>-600.webp   600 px wide (phones and small screens), quality 74
// Logos keep their PNG (tiny, and used as the favicon/OG fallback) and also get a WebP twin.
import { existsSync, readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const DIR = "public/assets";
const files = readdirSync(DIR).filter((f) => /^(buyer|seller|logo)[^.]*\.png$/.test(f));
const isShot = (f) => /^(buyer|seller)/.test(f);

let made = 0;
for (const file of files) {
  const src = join(DIR, file);
  const out = src.replace(/\.png$/, ".webp");
  if (isShot(file)) {
    await sharp(src).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 76, effort: 6 }).toFile(out);
    await sharp(src).resize({ width: 600, withoutEnlargement: true }).webp({ quality: 74, effort: 6 }).toFile(src.replace(/\.png$/, "-600.webp"));
    unlinkSync(src); // never publish the PNG original
    made += 2;
  } else if (!(existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs)) {
    await sharp(src).webp({ quality: 82, effort: 6 }).toFile(out);
    made++;
  }
}
console.log(`[optimize-images] ${made} WebP file(s) generated (${files.length} checked)`);
