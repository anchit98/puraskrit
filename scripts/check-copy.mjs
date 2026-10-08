// Guards public copy against banned language (context file §0, §2.8, §6 and the finishing-pass
// copy rules: no "spend", urgency, scarcity or pressure words).
//
//   node scripts/check-copy.mjs          → scans source (src/), fails on any hit
//   node scripts/check-copy.mjs --built  → scans the built HTML of every non-legal page in out/
//                                          (visible text, meta tags, alt text, aria-labels)
//
// The six legal pages are verbatim documents and are always excluded.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const BANNED = [
  // Finishing pass, rule 3A
  { re: /\bspend(s|ing)?\b|\bspent\b/i, why: 'Banned word "spend/spent/spending". Use progress, milestones, "running total", "Unlocks at ₹X"' },
  { re: /more to go/i, why: 'Use "Unlocks at ₹X", never "more to go"' },
  { re: /₹[\d,k]+ more\b/i, why: 'Use "Unlocks at ₹X", never "₹X more"' },
  { re: /\bfootfall\b|\bsales\b|\brevenue\b/i, why: "Business-speak banned from public copy (footfall, sales, revenue)" },
  { re: /\bhook(s|ed)?\b|lock-in|\btrap(s|ped)?\b|\bpressure\b/i, why: "Manipulative wording banned (hook, lock-in, trap, pressure)" },
  { re: /miss out|limited time|\bhurry\b|only \w+ left|free money|\bcheap\b|boost your numbers/i, why: "Urgency/scarcity wording banned" },
  // Earlier rules
  { re: /\bpoints?\b/i, why: "Puraskrit has no points system" },
  { re: /my services|my spends/i, why: "My Services is excluded from the website (founder, 8 Oct 2026)" },
  { re: /\bNFC\b/, why: "NFC is not live" },
  { re: /UPI app|payment gateway/i, why: "Not a payments product" },
  { re: /\bUPI\b/, why: "No payment-method claims in marketing copy" },
  { re: /\bPOS\b|\bCRM\b/, why: "Not a POS/CRM product" },
  { re: /testimonial|\b\d[\d,]*\+ (merchants|users|customers)\b/i, why: "No testimonials or traction numbers" },
  { re: /₹\[INSERT|per month|per year|\/month|free trial/i, why: "Merchant pricing is hidden" },
  { re: /AES-256|ISO 27001/i, why: "Security claims are not to be used as marketing (open item #5)" },
];
const LAYOUT = [{ re: /object-(cover|fill)\b/, why: "Screenshots must use object-fit: contain, never cover/fill (no cropped product graphics)" }];

const hits = [];

function scanSource() {
  const SKIP = [join("src", "content", "legal", "generated")];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (SKIP.some((s) => p.startsWith(s))) continue;
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(tsx?|css|json|md)$/.test(name)) {
        readFileSync(p, "utf8").split("\n").forEach((line, i) => {
          if (line.includes("check-copy-ignore")) return;
          // Comments and imports are not public copy (the --built scan covers what users see).
          const t = line.trim();
          if (/^(\/\/|\*|\/\*|\{\/\*)/.test(t) || /^import\b/.test(t)) return;
          for (const { re, why } of [...BANNED, ...LAYOUT]) if (re.test(line)) hits.push(`${p}:${i + 1}  ${why}\n    ${line.trim().slice(0, 200)}`);
        });
      }
    }
  };
  walk("src");
}

function scanBuilt() {
  if (!existsSync("out")) {
    console.error("[check-copy] out/ not found. Run `npm run build` first.");
    process.exit(1);
  }
  const pages = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) {
        if (p === join("out", "legal") || p === join("out", "_next")) continue;
        walk(p);
      } else if (name.endsWith(".html")) pages.push(p);
    }
  };
  walk("out");
  for (const file of pages) {
    const html = readFileSync(file, "utf8");
    // Visible text (scripts/styles removed) plus user-facing attributes.
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/\s+/g, " ");
    const attrs = [...html.matchAll(/\b(?:alt|aria-label|title|content|placeholder)="([^"]*)"/gi)].map((m) => m[1]).join(" | ");
    for (const { re, why } of BANNED) {
      for (const [where, hay] of [["text", text], ["attributes", attrs]]) {
        const m = hay.match(new RegExp(re.source, re.flags.includes("i") ? "i" : ""));
        if (m) {
          const at = hay.indexOf(m[0]);
          hits.push(`${file} (${where})  ${why}\n    …${hay.slice(Math.max(0, at - 60), at + 60).trim()}…`);
        }
      }
    }
  }
  console.log(`[check-copy] scanned ${pages.length} built non-legal pages`);
}

if (process.argv.includes("--built")) scanBuilt();
else scanSource();

if (hits.length) {
  console.error(`[check-copy] ${hits.length} problem(s) found:\n\n${hits.join("\n")}`);
  process.exit(1);
}
console.log("[check-copy] OK, no banned phrases" + (process.argv.includes("--built") ? " in built pages" : " in site source"));
