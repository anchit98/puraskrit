# Puraskrit website

Marketing site for Puraskrit (पुरSkrit) by Asraubh Private Limited, Bengaluru.

- `/` and the customer pages exist to get the **Buyer App** downloaded.
- `/merchants/*` is the merchant module, with a **Join as merchant** lead form.

The source of truth for content and rules is `PURASKRIT_WEBSITE_CONTEXT_v2.md`. The design tokens come from `DESIGN.md`.

**Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS v4. 3D is pure CSS 3D transforms (no WebGL). Animation uses Motion. The site builds to a **fully static export** (`out/`), so it can be hosted on S3 + CloudFront, Amplify, or any static host. There is no hosting-specific code.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # optional; defaults work for local dev
npm run dev                    # http://localhost:3000
```

Requires Node 20+.

| Script | What it does |
|---|---|
| `npm run dev` | Prepares content (below), then starts the dev server |
| `npm run build` | Prepares content, then builds the static site into `out/` |
| `npm start` | Serves `out/` locally (`npx serve out`) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check:copy` | Fails if banned language appears in site source (see "Content rules") |
| `npm run check:copy:built` | Same check on the built HTML of every non-legal page (text, meta, alt, aria-labels) |
| `npm run audit:layout` | Finds clipped graphics and horizontal scroll at 6 viewport sizes with all tilts at maximum (needs Chrome; serve `out/` on :4123 first, or set `AUDIT_URL`) |
| `npm run verify` | lint + typecheck + check:copy + build + check:copy:built |

`dev` and `build` first run `npm run prepare-content`:

1. `scripts/copy-assets.mjs` copies `website-assets/*` (except `_unused/`) to `public/assets/`, writes the favicon and `site.webmanifest`.
2. `scripts/optimize-images.mjs` creates `.webp` versions of the screenshots and logos with `sharp`.
3. `scripts/convert-legal.mjs` converts the six legal `.docx` files in the project root into `src/content/legal/generated/*.json`. **The text is kept verbatim.** Only numbered bold paragraphs become headings, for anchors and the table of contents.
4. `scripts/check-social.mjs` warns about footer social links that are still placeholders (see "Social links").

`copy-assets` never publishes the five screenshots that contain banned wording (`EXCLUDED` list in the script).

`public/assets/` is generated and gitignored. `website-assets/` is the source.

## Deploying (TODO: lead dev)

`npm run build` produces `out/`. Upload it to any static host.

- `trailingSlash: true` is set, so every route is a folder with an `index.html` (e.g. `out/merchants/join/index.html`). On S3 + CloudFront, use a CloudFront Function or the S3 website endpoint so `/merchants/join/` resolves to `index.html`.
- `out/404.html` is the not-found page.
- Set `NEXT_PUBLIC_*` variables **at build time**, because they are baked into the static files.

## Environment variables

See `.env.example`. All of them are public.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for sitemap, robots and Open Graph |
| `NEXT_PUBLIC_LEAD_ENDPOINT` | POST endpoint for the merchant lead form (backend is **TODO(lead-dev)**) |
| `NEXT_PUBLIC_PLAY_STORE_URL` | Buyer App Google Play URL. The default is a **SAMPLE** invented package id |
| `NEXT_PUBLIC_APP_STORE_URL` | Leave empty until iOS is live. Empty renders "Coming soon on iOS" |
| `NEXT_PUBLIC_SHOW_SAMPLE_MARKER` | `false` hides the "SAMPLE — replace before launch" markers |
| `NEXT_PUBLIC_ANALYTICS_ID` | Unused. Analytics is intentionally not added |

## Where things live

```
src/config/app.ts        APP_LINKS (store URLs, sample flag), SITE, LEAD_ENDPOINT, SCREENSHOTS, LOGO
src/config/motion.ts     The motion system: durations, easing, stagger, tilt limits (one place)
src/config/social.ts     Footer social profile URLs (TODO(founder): paste real links)
src/content/             All copy: site.ts (nav/footer), customer.ts, merchant.ts, faq.ts, trust.ts
                         (Fair by design, each fact cited), bothSides.ts (one scan, two sides),
                         loyalty.ts (example milestones, offers, categories), legal/meta.ts
src/styles/theme.css     Design tokens, 1:1 with DESIGN.md (colours, type scale, radii, card)
src/app/                 One folder per route
src/components/          Nav, AudienceToggle, DownloadBlock, PhoneMockup, FeatureCard, StepList,
                         MilestoneList, OfferCard, FAQAccordion, LeadForm, Footer, CTABand, …
src/components/Phone3D   CSS 3D stage: pointer tilt, scroll rotation, screen crossfade, parallax layers
src/components/screens/  Coded app screens that replace screenshots with banned wording
public/brand/            Official LinkedIn "In" mark (used as a CSS mask in the footer)
scripts/                 Content preparation, copy checker, social check, layout audit
```

### Change copy

Edit the files in `src/content/`. The components contain no marketing copy.

### Swap a screenshot

Either replace the file in `website-assets/` with the same name, or point the slot at a new file in `SCREENSHOTS` (`src/config/app.ts`). Every page and the 3D phones read from there. The phone frame takes the screenshot's own shape, so screenshots are never cropped (`object-fit: contain`; the copy checker fails on `object-cover`). Partial screenshots (Discover, Offers) are shown as screen cards, not full phones.

Five founder screenshots contain banned wording and are **not used** (buyer-01, buyer-02, buyer-05, seller-01, seller-05b). Those moments are rebuilt as coded screens in `src/components/screens/Screens.tsx` with fictional "Sample" merchants labelled "Example". When corrected originals arrive, remove them from `EXCLUDED` in `scripts/copy-assets.mjs`, add the slot back to `SCREENSHOTS`, and swap the coded screen where it is used. The remaining screenshots are still unaudited placeholders (context file §8.4–8.5).

### Update legal text

Replace the `.docx` in the project root (same filename) and run `npm run prepare-content`. When the founder resolves an open item, delete its flag from `src/content/legal/meta.ts`. The "Pending founder review" notice disappears when no flags are left.

### Go live

1. Set `NEXT_PUBLIC_PLAY_STORE_URL` to the real listing. The QR code is generated from it.
2. Replace the placeholder store buttons in `src/components/DownloadBlock.tsx` with the official Google Play and App Store badge artwork. Do not redraw them.
3. Replace the SAMPLE screenshots.
4. Set `NEXT_PUBLIC_SHOW_SAMPLE_MARKER=false`.
5. Connect the lead form endpoint.
6. Resolve the legal open items (below).

## Motion, 3D and accessibility

- **One motion system** in `src/config/motion.ts`: 400 / 550 / 700 ms, one ease-out curve with no overshoot, 60 ms stagger. No springs that bounce, no loops, no autoplay. Pointer smoothing is critically damped.
- **3D is CSS only** (perspective transforms, plus isometric SVG for the gift boxes), built from the DESIGN.md palette. No WebGL, so there is no canvas to clip, no off-palette shading, and no 3D library in the bundle.
  - Phones (`Phone3D`): pointer tilt up to 6° on desktop; up to 8° of rotation as they scroll through the viewport on every device; screens crossfade at the midpoint.
  - Cards (`Tilt3D`): 5° tilt and a 4 px lift on hover, desktop only. Touch devices stay flat with a tap state.
  - Reward journey (`MilestoneExplorer`): a CSS 3D tilted track; gift boxes are isometric SVG (identical in Safari, Chrome and Firefox) that unlock with a soft glow as you scroll; vertical on phones. Cards sit in a flat overlay positioned with the same perspective maths as the track, because WebKit flattens text nested inside 3D transforms.
  - "One scan, two sides" (`BothSides`) and merchant steps (`PhoneSteps`): pinned and scroll-driven on large screens (≥1024 px wide and ≥720 px tall); step cards with their own screens everywhere else.
- **Motion tiers** (`useMotionTier`): reduced motion gets short fades only; low-end devices (≤ 4 cores on touch, ≤ 2 GB memory, or Data Saver) get no continuous scroll-linked 3D. Force a tier with `?motion=reduced|lite|full`; `?motion=extreme` pins every tilt at its maximum for audits.
- **Never clip product graphics**: containers clip only a separate `aria-hidden pointer-events-none` decoration layer; tilted elements sit in padded stages. `npm run audit:layout` checks this.
- **Mobile**: 44 px minimum tap targets, no hover-only content, `svh` units instead of `100vh`, `viewport-fit=cover` with safe-area padding, `overflow-x: clip` (keeps `position: sticky` working on iOS).
- Page transitions are a 400 ms fade on client navigations only (never on first load).
- Coded screens are `role="img"` with a text description; pinned scenes announce the current step in a polite live region.

## Social links

`src/config/social.ts` holds the four profile URLs (Facebook, Instagram, LinkedIn, X), all empty with `TODO(founder)`.

- A URL counts only if it is `https` on that platform's own domain.
- **Development** (`npm run dev`): placeholders show the icon with a dashed outline and a "Dev only" note. They are not links.
- **Production** (`npm run build`): placeholders are not rendered at all (never a `#` link). With none set, the "Follow Puraskrit" row disappears. The build prints a warning listing what is missing.
- Real links open in a new tab with `rel="noopener noreferrer"` and an accessible name such as "Puraskrit on Instagram". Icons are single colour: navy, blue on hover or focus.
- Icon sources: Facebook, Instagram and X from Simple Icons (CC0). LinkedIn is the official "In" mark from LinkedIn's brand site (`public/brand/`), used as a CSS mask. Note: the platforms' brand guidelines prefer black, white or their own brand colour; navy and blue were chosen to match DESIGN.md.

## Content rules (enforced by `npm run check:copy` and `check:copy:built`)

From the context file and the finishing pass. No invented numbers, testimonials or pricing. Customers read the merchant pages too, so every word must be safe for both audiences.

- Milestones always say **"Unlocks at ₹X"**. Never "spend", "spent", "spending", "more to go", or "₹X more".
- No urgency, scarcity or pressure: no "hurry", "limited time", "don't miss out", "only X left", "hook", "lock-in", "trap", "free money", "cheap".
- No business-speak aimed at customers: no "footfall", "sales", "revenue", "boost your numbers".
- No points system, NFC, payments/UPI/POS/CRM claims, or security claims as marketing.
- Never mention "My Services".
- Gentle game only: milestones as a path, rewards you unlock. No randomness, countdowns, streak penalties, "losing progress" messages, comparisons or leaderboards.
- The six legal pages are verbatim and excluded from these checks.

## Lead form

`src/components/LeadForm.tsx` POSTs JSON to `NEXT_PUBLIC_LEAD_ENDPOINT`:

```json
{ "businessName": "", "name": "", "mobile": "+91XXXXXXXXXX", "email": "", "category": "",
  "locality": "", "city": "Bengaluru", "message": "", "consent": true,
  "submittedAt": "ISO-8601", "source": "website:/merchants/join" }
```

- With no endpoint, dev builds log the payload and show success. Production builds show a "not connected" message.
- There is a honeypot field (`website`). Server-side validation, spam protection, storage and notification are **TODO(lead-dev)**.
- Do not add GSTIN or bank fields. Those belong to formal onboarding.

## TODO markers

`grep -rn "TODO(" src scripts` lists every integration point:

- `TODO(lead-dev)`: lead-form backend, hosting/domain, analytics with a consent banner (default decline), official store badges, staging robots.
- `TODO(founder)`: onboarding wording, the offer discount figure (30% vs 25%), About copy.

## Open items before launch (context file §10)

| # | Item | Where it shows |
|---|---|---|
| 1 | Merchant T&C §12.1 plan names and amounts are placeholders | Flag on `/legal/merchant-terms` |
| 2 | Effective dates differ (10/03/2026 vs 10/08/2026); date format unconfirmed | Flag on all legal pages |
| 3 | Grievance Officer "Designation" repeats the name | Flag on both privacy pages and `/contact` |
| 5 | Security claims (AES-256, ISO 27001) appear only inside the verbatim privacy text | Not used as marketing |
| 8 | Play Store URL is a sample | `APP_LINKS.playStoreUrl` |
| 9 | Brand spelling: wordmark पुरSkrit (always the logo image), running text "Puraskrit" | Convention applied |
| — | True vector logo SVG not supplied | PNG logo with `srcset` |
