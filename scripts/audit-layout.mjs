// Layout audit: finds product graphics clipped by a container, and horizontal scrolling.
//
//   npm run build && npx serve out -l 4123      (in another terminal)
//   npm run audit:layout                        (defaults to http://localhost:4123)
//   AUDIT_URL=http://localhost:3000 npm run audit:layout
//
// Every page is loaded at 360, 390, 768, 1024 and 1440 px (plus 844×390 landscape) with
// `?motion=extreme`, which pins every tilt and parallax at its maximum. Decoration layers
// (aria-hidden + pointer-events-none) are allowed to clip; nothing else is.
// Needs Chrome: set CHROME_PATH if it is not in the default macOS location.
import puppeteer from "puppeteer-core";

const BASE = process.env.AUDIT_URL || "http://localhost:4123";
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PAGES = [
  "/", "/how-it-works/", "/rewards/", "/discover/", "/faq/",
  "/merchants/", "/merchants/how-it-works/", "/merchants/loyalty/", "/merchants/offers/", "/merchants/join/", "/merchants/faq/",
  "/about/", "/contact/", "/legal/customer-terms/",
];
const SIZES = [[360, 740], [390, 844], [844, 390], [768, 1024], [1024, 768], [1440, 900]];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
let problems = 0;
for (const [w, h] of SIZES) {
  for (const path of PAGES) {
    const page = await browser.newPage();
    const touch = w < 1024;
    await page.setViewport({ width: w, height: h, isMobile: touch, hasTouch: touch });
    await page.goto(`${BASE}${path}?motion=extreme`, { waitUntil: "networkidle2", timeout: 60000 });
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const found = new Set();
    for (let y = 0; y < height; y += Math.round(h * 0.6)) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await new Promise((r) => setTimeout(r, 450));
      const hits = await page.evaluate(() => {
        const out = [];
        const isDecor = (el) => !!el.closest(".pointer-events-none[aria-hidden], [aria-hidden].pointer-events-none");
        const sel = "img, svg, figure, button, a, input, .card, h1, h2, h3, p";
        for (const el of document.querySelectorAll(sel)) {
          // header: sticky nav; .sr-only: visually hidden text; [data-audit-ignore]: the form honeypot
          if (isDecor(el) || el.closest("header, .sr-only, [data-audit-ignore]")) continue;
          const cs0 = getComputedStyle(el);
          if (cs0.visibility === "hidden" || cs0.display === "none") continue;
          const r = el.getBoundingClientRect();
          if (r.width < 4 || r.height < 4 || r.bottom < 0 || r.top > innerHeight) continue;
          for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
            const cs = getComputedStyle(a);
            if (!/(hidden|clip)/.test(cs.overflowX + cs.overflowY)) continue;
            if (isDecor(a)) break;
            const ar = a.getBoundingClientRect();
            const over = Math.max(ar.left - r.left, r.right - ar.right, ar.top - r.top, r.bottom - ar.bottom);
            // Accordion panels and the mobile menu animate their height on purpose.
            if (over > 2 && !a.matches("[role=region], #mobile-menu")) {
              const name = (el.getAttribute("alt") || el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 50);
              out.push(`${el.tagName.toLowerCase()} "${name}" clipped ${Math.round(over)}px by ${a.tagName.toLowerCase()}.${(a.getAttribute("class") || "").split(" ").slice(0, 3).join(".")}`);
            }
            break;
          }
        }
        // Measure with the body's overflow-x: clip lifted, so masked overflow is still caught.
        const prev = document.body.style.overflowX;
        document.body.style.overflowX = "visible";
        const sw = document.documentElement.scrollWidth;
        document.body.style.overflowX = prev;
        if (sw > innerWidth + 1) out.push(`horizontal overflow: content is ${sw}px wide (viewport ${innerWidth}px)`);
        return out;
      });
      hits.forEach((x) => found.add(x));
    }
    if (found.size) {
      problems += found.size;
      console.log(`✗ ${w}×${h} ${path}`);
      for (const f of found) console.log(`    ${f}`);
    } else console.log(`✓ ${w}×${h} ${path}`);
    await page.close();
  }
}
await browser.close();
if (problems) {
  console.error(`\n[audit-layout] ${problems} clipped element(s) found`);
  process.exit(1);
}
console.log("\n[audit-layout] OK: nothing clipped, no horizontal scroll, at every size with tilt and parallax at maximum");
