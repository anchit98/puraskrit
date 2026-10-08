// Converts the six legal .docx files (project root) into JSON consumed by the /legal pages.
// The TEXT IS NOT CHANGED. Only structure is mapped: numbered bold paragraphs become headings
// so the page has an outline and anchor links. Do not rewrite or summarise legal text.
import { mkdirSync, writeFileSync } from "node:fs";
import mammoth from "mammoth";

const OUT = "src/content/legal/generated";
mkdirSync(OUT, { recursive: true });

const DOCS = [
  { slug: "customer-terms", file: "BuyerApp_Terms_Conditions.docx" },
  { slug: "customer-privacy", file: "BuyerApp_Privacy_Policy.docx" },
  { slug: "customer-terms-of-use", file: "BuyerApp_Terms_of_Use.docx" },
  { slug: "merchant-terms", file: "SellerApp_Terms_Conditions.docx" },
  { slug: "merchant-privacy", file: "SellerApp_Privacy_Policy.docx" },
  { slug: "merchant-terms-of-use", file: "SellerApp_Terms_of_Use.docx" },
];

const decode = (s) =>
  s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

for (const { slug, file } of DOCS) {
  const { value } = await mammoth.convertToHtml({ path: file });
  let html = value;

  // Title: the first bold paragraph.
  const titleMatch = html.match(/^<p><strong>(.*?)<\/strong><\/p>/);
  const title = titleMatch ? decode(titleMatch[1]) : slug;
  if (titleMatch) html = html.slice(titleMatch[0].length);

  // Meta lines ("Issued by", "Effective Date") are italic paragraphs right after the title.
  const meta = [];
  while (true) {
    const m = html.match(/^<p><em>(.*?)<\/em><\/p>/);
    if (!m) break;
    meta.push(decode(m[1]));
    html = html.slice(m[0].length);
  }
  const effective = meta.find((l) => l.startsWith("Effective Date")) ?? "";

  // Numbered bold paragraphs -> headings. "9." -> h2, "12.1" -> h3. Other bold paragraphs -> h2.
  const toc = [];
  html = html.replace(/<p><strong>(.*?)<\/strong><\/p>/g, (_, inner) => {
    const text = decode(inner);
    const level = /^\d+\.\d+/.test(text) ? 3 : 2;
    const id = slugify(text).slice(0, 60);
    if (level === 2) toc.push({ id, text });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  // Grievance Officer list, used verbatim on /contact.
  let grievance = null;
  const g = html.match(/Grievance Officer<\/h2>[\s\S]*?<ul>([\s\S]*?)<\/ul>/);
  if (g) grievance = [...g[1].matchAll(/<li>(.*?)<\/li>/g)].map((x) => decode(x[1]));

  writeFileSync(
    `${OUT}/${slug}.json`,
    JSON.stringify({ slug, source: file, title, meta, effective, toc, grievance, html }, null, 2),
  );
}
console.log(`[convert-legal] ${DOCS.length} documents converted to ${OUT}/`);
