// Generates a .webp next to each screenshot and logo PNG in public/assets/.
// Components serve <picture> with the WebP first and the PNG as fallback.
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const DIR = "public/assets";
const files = readdirSync(DIR).filter((f) => /^(buyer|seller|logo)[^.]*\.png$/.test(f));
// Screenshots are re-trimmed on every run, so always regenerate their WebP files.
const always = (f) => /^(buyer|seller)/.test(f);

let made = 0;
for (const file of files) {
  const src = join(DIR, file);
  const out = src.replace(/\.png$/, ".webp");
  if (always(file) || !(existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs)) {
    await sharp(src).webp({ quality: 88 }).toFile(out);
    made++;
  }
  // Phones display screenshots at ≤ 300 px wide, so a 600 px variant covers 2x screens.
  if (file.startsWith("buyer") || file.startsWith("seller")) {
    const small = src.replace(/\.png$/, "-600.webp");
    if (always(file) || !(existsSync(small) && statSync(small).mtimeMs >= statSync(src).mtimeMs)) {
      await sharp(src).resize({ width: 600, withoutEnlargement: true }).webp({ quality: 86 }).toFile(small);
      made++;
    }
  }
}
console.log(`[optimize-images] ${made} WebP file(s) generated (${files.length} checked)`);
