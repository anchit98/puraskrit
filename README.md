# Puraskrit website

Marketing site for Puraskrit (पुरSkrit). Customer-first: the home page explains what the app is, how it works, and where to download it. Merchants have one separate page, reachable only from the footer.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion (animation). Everything visual is CSS/SVG (no WebGL). It builds to a **fully static export** (`out/`), so any static host works (Vercel, S3 + CloudFront, Amplify). There is no hosting-specific code.

Background documents in this repo: `DESIGN.md` (design tokens), `PURASKRIT_WEBSITE_CONTEXT_v2.md` (original brief), and [`docs/DECISIONS.md`](docs/DECISIONS.md) (decisions made since the brief, which **override** it where they differ).

---

## Pages

```
/                 Customer home (one long page + download)
/about/           About (3 sections)
/faq/             FAQ (8 short questions)
/merchants/       Puraskrit Merchants: Seller App link, steps, offers, contact form
/legal/[slug]/    6 legal documents, rendered verbatim from the .docx files
404               Custom "page not found"
```

- **Header (all pages):** logo + store badges only, no links. It scrolls with the page. On `/merchants/` it shows the Puraskrit Merchants logo and a "Get in touch" button.
- **Footer (all pages):** Puraskrit (About, FAQ) · For merchants (Partner with us, Contact) · Legal (Terms of Use, Privacy Policy, Terms and Conditions) · social icons · bottom note. This is the **only** place the merchant page is linked.
- **Footer audience:** on `/merchants/` and `/legal/merchant-*` the footer shows the merchant legal documents and a "Get the app" link; elsewhere it shows the customer documents (`src/content/site.ts`).
- **Mobile:** all text is centred; the header logo is centred and larger; social icons sit after the legal links.

## Quick start

```bash
npm install
cp .env.example .env.local     # optional; defaults work locally
npm run dev                    # http://localhost:3000
```

Requires Node 20+.

| Script | What it does |
|---|---|
| `npm run dev` | Prepares content (below), then starts the dev server |
| `npm run build` | Prepares content, then builds the static site into `out/` |
| `npm start` | Serves `out/` locally (`npx serve out`) |
| `npm run lint` / `typecheck` | ESLint / `tsc --noEmit` |
| `npm run check:copy` | Fails if banned language is in the site source (see "Content rules") |
| `npm run check:copy:built` | Same, on the built HTML of every non-legal page (text, meta, alt, aria-labels) |
| `npm run audit:layout` | Finds clipped graphics and sideways scrolling at 6 screen sizes with all tilts at maximum. Needs Chrome; serve `out/` on :4123 first, or set `AUDIT_URL` |
| `npm run verify` | lint + typecheck + check:copy + build + check:copy:built |

`dev` and `build` first run `npm run prepare-content`:

1. `scripts/copy-assets.mjs`: copies `website-assets/*` (except `_unused/`) to `public/assets/`. Screenshots get their baked-in white side margins trimmed, and their final sizes are written to `src/config/generated/screenshots.json`. Screenshots listed in `EXCLUDED` are never published.
2. `scripts/optimize-images.mjs`: screenshots become compressed WebP (900 px and 600 px wide) and the PNG copies are removed. Logos keep their PNG plus a WebP twin.
3. `scripts/convert-legal.mjs`: converts the six `.docx` files in the project root into `src/content/legal/generated/*.json`. **The text is kept verbatim.**
4. `scripts/check-social.mjs`: warns if a footer social URL is missing or invalid.

`public/assets/` is generated and gitignored. `website-assets/` is the source.

## Deploying

`npm run build` produces `out/`.

- **Vercel:** import the GitHub repo and leave the defaults. Add the environment variables below, then redeploy.
- **S3 + CloudFront:** `trailingSlash: true` is set, so each route is a folder with an `index.html`; make `/merchants/` resolve to its `index.html`. `out/404.html` is the not-found page.
- Set `NEXT_PUBLIC_*` variables **at build time**.

## Environment variables

See `.env.example`. All are public and need a redeploy to change.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Real domain, for sitemap, robots, canonical links and Open Graph |
| `NEXT_PUBLIC_LEAD_ENDPOINT` | Address that receives merchant form entries (**TODO(lead-dev)**) |
| `NEXT_PUBLIC_PLAY_STORE_URL` | Customer app on Google Play. The QR code is generated from it. Default is a placeholder id |
| `NEXT_PUBLIC_SELLER_PLAY_STORE_URL` | Seller App on Google Play. Default is a placeholder |
| `NEXT_PUBLIC_APP_STORE_URL` | Empty until iOS is live; then "Coming soon to iOS" becomes a link |
| `NEXT_PUBLIC_ANALYTICS_ID` | Unused. Analytics is intentionally not added |

## Where things live

```
src/config/app.ts         Store links, SITE (email, company), form endpoint, SCREENSHOTS, logos, badges
src/config/motion.ts      The motion system: durations, easing, stagger, tilt limits
src/config/social.ts      The four footer social URLs (edit here)
src/config/generated/     Screenshot sizes (generated, do not edit)
src/content/              ALL copy: customer.ts (home), about.ts, faq.ts, merchant.ts,
                          howItWorks.ts, loyalty.ts, site.ts (footer/legal links), legal/meta.ts
src/styles/theme.css      Design tokens, 1:1 with DESIGN.md
src/app/                  Routes (page.tsx per folder), error.tsx, global-error.tsx, not-found.tsx
src/components/           HeroVisual (landing hero animation), HowItWorks (animated steps, customer and
                          merchant variants), MilestoneExplorer (reward journey), Phone3D / PhoneMockup,
                          DownloadBlock, StoreBadges, LeadForm, Footer, Nav, OfflineNotice, SafeImage, …
public/brand/             Official Google Play badge, LinkedIn "In" mark (footer icon mask)
scripts/                  Content preparation, copy checks, social check, layout audit
videos/                   Launch videos (buyer, merchants), not used by the site
docs/DECISIONS.md         Decisions made since the original brief
```

### Change copy

Edit the files in `src/content/`. Components hold no marketing copy.

### Swap a screenshot

Replace the file in `website-assets/` (same name) and rebuild; margins are trimmed and WebP files made automatically. New slots are added to `SCREENSHOTS` in `src/config/app.ts`.

Only **clean original screenshots** are used; there are no made-up screens. Seven originals are held back (`EXCLUDED` in `scripts/copy-assets.mjs`) because they show banned wording, a location, a person's name or a sample phone number: buyer-01, buyer-02, buyer-03, buyer-04, buyer-05, seller-01, seller-05b. When a corrected file arrives, remove it from `EXCLUDED` and add a slot. Frames follow each screenshot's own shape, so nothing is cropped (`object-fit: contain`; the copy checker fails on `object-cover`).

### Update legal text

Replace the `.docx` in the project root (same filename) and run `npm run prepare-content`. When an open item is resolved, delete its flag in `src/content/legal/meta.ts`.

## Motion, 3D and accessibility

- **One motion system** in `src/config/motion.ts`: 400 / 550 / 700 ms, one ease-out curve with no overshoot, 60 ms stagger. No bouncy springs and no autoplay.
- **CSS-only 3D** from the DESIGN.md palette. No WebGL, so there is no canvas to clip and no 3D library in the bundle.
  - **Hero (`HeroVisual`):** entrance sequence (phone swings in, sheen, progress ring fills, reward card unlocks), then a slow 3D orbit of reward icons.
  - **Phones (`Phone3D`):** pointer tilt up to 6° on desktop, up to 8° of scroll rotation on every device.
  - **Cards (`Tilt3D`):** 5° tilt and a small lift on hover, desktop only; flat on touch.
  - **How it works (`HowItWorks`):** pinned and scroll-driven on large screens (≥1024 px wide and ≥720 px tall), stacked cards elsewhere. Four animated illustrations per variant (customer: pay, QR, progress, unlock; merchant: set up, broadcast offers, scan and enter, come back).
  - **Reward journey (`MilestoneExplorer`):** tilted track; isometric SVG gift boxes unlock as you scroll; vertical on phones.
- **Motion tiers** (`useMotionTier`): reduced motion gets short fades only; low-end devices get no continuous scroll-linked 3D. Force a tier with `?motion=reduced|lite|full`; `?motion=extreme` pins every tilt at its maximum for audits.
- **Never clip product graphics:** containers clip only a separate decorative layer. `npm run audit:layout` checks this.
- **Mobile:** 44 px tap targets, `svh` units, `viewport-fit=cover` with safe-area padding, `overflow-x: clip`.
- **Failure states:** custom 404 · `error.tsx` and `global-error.tsx` for unexpected errors · red offline bar at the top of the screen · `SafeImage` placeholder if an image fails · form field and send errors.
- Decorative motion is `aria-hidden`; pinned scenes announce the current step in a polite live region.

## Social links

`src/config/social.ts` holds the four profile URLs (Facebook, Instagram, LinkedIn, X). Each must be `https` on that platform's own domain. Invalid or empty URLs are hidden in production (never a `#` link) and listed as a warning at build time. Links open in a new tab with `rel="noopener noreferrer"`. Icons are single-colour (navy, blue on hover). Facebook, Instagram and X are Simple Icons (CC0); LinkedIn is the official "In" mark from LinkedIn's brand site, used as a CSS mask.

## Content rules (enforced by `check:copy` and `check:copy:built`)

Customers read the merchant page too, so every word must be safe for both audiences.

- Milestones always say **"Unlocks at ₹X"**. Never "spend", "spent", "spending", "more to go" or "₹X more".
- No urgency, scarcity or pressure wording; no business-speak aimed at customers; no points, NFC, payment or UPI claims.
- No location claims ("Bengaluru", "Bangalore", "Electronic City") anywhere on the site. Legal documents are verbatim and exempt.
- Don't pitch "free". Customers should feel empowered, not sympathised with.
- No "SAMPLE"/"Example" placeholders and no made-up app screens.
- Customer pages never show merchant-side wording ("Seller App", "commission", "your customers"). Only the footer links to `/merchants/`.
- Gentle game only: no randomness, countdowns, streak penalties, "losing progress" messages or comparisons.
- The six legal pages are excluded from these checks.

## Merchant form

`src/components/LeadForm.tsx` (the "Let's talk" form on `/merchants/`) POSTs JSON to `NEXT_PUBLIC_LEAD_ENDPOINT` and expects any 2xx reply for success.

```json
{ "businessName": "", "name": "", "mobile": "+91XXXXXXXXXX", "email": "", "category": "",
  "locality": "", "city": "", "message": "", "consent": true,
  "submittedAt": "ISO-8601", "source": "website:/merchants/join" }
```

- **Not connected yet.** With no endpoint, dev builds log the entry and show success; production builds show "This form isn't connected yet. Please email support@puraskrit.com."
- **Client side:** field validation, consent checkbox (unchecked by default), hidden spam-trap field, and an animated success message that promises contact within 24 hours.
- **TODO(lead-dev), backend:** accept the POST, store the entry, ignore entries where the hidden `website` field is filled, rate-limit, notify the team (the 24-hour promise depends on it), and allow the site's origin (CORS). Quick options without a backend: Formspree/Getform, a Google Sheet Apps Script, or Supabase.
- Do not add GSTIN or bank fields; those belong to formal onboarding.

## TODO markers

`grep -rn "TODO(" src scripts` lists them:

- `TODO(lead-dev)`: merchant form backend, domain and `NEXT_PUBLIC_SITE_URL`, analytics with a consent banner, error reporting.
- `TODO(founder)`: real store URLs at launch, corrected screenshots for the held-back screens.

## Open items before launch

| Item | Where |
|---|---|
| Merchant T&C §12.1 plan names and amounts are placeholders | Flag on `/legal/merchant-terms` |
| Effective dates differ across the legal documents (10/03/2026 vs 10/08/2026); date format unconfirmed | Flag on all legal pages |
| Grievance Officer "Designation" repeats the name | Flag on both privacy pages |
| Footer note names "Puraskrit Ltd" while the legal documents name Asraubh Private Limited | Confirm the legal entity |
| Footer note mentions a Terms of Service, Cookie Policy and Content Policies that don't exist as pages | Add pages or reword |
| Store URLs are placeholders | `NEXT_PUBLIC_PLAY_STORE_URL`, `NEXT_PUBLIC_SELLER_PLAY_STORE_URL` |
| Merchant form has no backend | `NEXT_PUBLIC_LEAD_ENDPOINT` |
| True vector logo SVG not supplied | PNG logo with `srcset` |
