/**
 * Legal page registry. Text comes verbatim from the .docx files via scripts/convert-legal.mjs.
 * Flags surface open items from context file §10 on the page until the founder resolves them.
 * To clear a flag after the founder fixes the source document, delete it from the list below.
 */
import customerTerms from "./generated/customer-terms.json";
import customerPrivacy from "./generated/customer-privacy.json";
import customerTermsOfUse from "./generated/customer-terms-of-use.json";
import merchantTerms from "./generated/merchant-terms.json";
import merchantPrivacy from "./generated/merchant-privacy.json";
import merchantTermsOfUse from "./generated/merchant-terms-of-use.json";

export type LegalDoc = {
  slug: string;
  source: string;
  title: string;
  meta: string[];
  effective: string;
  toc: { id: string; text: string }[];
  grievance: string[] | null;
  html: string;
};

export type LegalSlug =
  | "customer-terms"
  | "customer-privacy"
  | "customer-terms-of-use"
  | "merchant-terms"
  | "merchant-privacy"
  | "merchant-terms-of-use";

const FLAG_DATES =
  "Open item #2: effective dates differ across the six documents (10/03/2026 vs 10/08/2026) and the date format (DD/MM or MM/DD) is unconfirmed.";
const FLAG_GRIEVANCE =
  'Open item #3: the Grievance Officer "Designation" field repeats the officer\'s name.';
const FLAG_PLANS = "Open item #1: subscription plan names and amounts in Section 12.1 are placeholders.";

export const LEGAL: Record<LegalSlug, { doc: LegalDoc; name: string; audience: "Customer" | "Merchant"; description: string; flags: string[] }> = {
  "customer-terms": {
    doc: customerTerms,
    name: "Customer Terms & Conditions",
    audience: "Customer",
    description: "The terms that govern your use of the Puraskrit customer app.",
    flags: [FLAG_DATES],
  },
  "customer-privacy": {
    doc: customerPrivacy,
    name: "Customer Privacy Policy",
    audience: "Customer",
    description: "How Puraskrit collects, uses and protects customer personal data.",
    flags: [FLAG_DATES, FLAG_GRIEVANCE],
  },
  "customer-terms-of-use": {
    doc: customerTermsOfUse,
    name: "Customer Terms of Use",
    audience: "Customer",
    description: "Day-to-day rules for using the Puraskrit customer app.",
    flags: [FLAG_DATES],
  },
  "merchant-terms": {
    doc: merchantTerms,
    name: "Merchant Terms & Conditions",
    audience: "Merchant",
    description: "The terms that govern merchant use of the Puraskrit platform.",
    flags: [FLAG_DATES, FLAG_PLANS],
  },
  "merchant-privacy": {
    doc: merchantPrivacy,
    name: "Merchant Privacy Policy",
    audience: "Merchant",
    description: "How Puraskrit collects, uses and protects merchant data.",
    flags: [FLAG_DATES, FLAG_GRIEVANCE],
  },
  "merchant-terms-of-use": {
    doc: merchantTermsOfUse,
    name: "Merchant Terms of Use",
    audience: "Merchant",
    description: "Day-to-day rules for using the Puraskrit merchant platform.",
    flags: [FLAG_DATES],
  },
};

export const LEGAL_SLUGS = Object.keys(LEGAL) as LegalSlug[];

/** Grievance Officer block, verbatim from Customer Privacy Policy §9. */
export const GRIEVANCE_OFFICER = customerPrivacy.grievance ?? [];
export const GRIEVANCE_FLAG = FLAG_GRIEVANCE;
