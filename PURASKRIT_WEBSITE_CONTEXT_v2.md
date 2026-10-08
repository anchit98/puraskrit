# पुरSkrit Website — Build Context

**Purpose of this file:** Give an AI coding assistant (Claude Code / Copilot in VS Code) everything it needs to build the Puraskrit marketing website. Treat this file as the source of truth. If something is not stated here, do not invent it. Leave a clearly marked `TODO` instead.

**Status of this file:** v2, 8 Oct 2026 (asset pass: logos, favicon, buyer and seller screenshots, DESIGN.md and six legal documents received). Sources: Puraskrit Product Context (Oct 2026), DESIGN.md, Customer and Merchant Terms / Privacy Policies / Terms of Use (v1.0).

---

## 0. Rules for the assistant (read first)

1. **Do not fabricate.** No invented user counts, merchant counts, ratings, testimonials, press logos, awards, revenue, or market sizes. Any stat section is omitted until the founder supplies validated numbers.
2. **Do not show pricing.** Merchant pricing is hidden for now. Use "Contact us" / "Join as merchant" CTAs only.
3. **Follow DESIGN.md exactly** (Section 3 below). Do not introduce new colours or fonts, except the one flagged Devanagari fallback in 3.2.
4. **Use only features that exist in the MVP** (Section 2.3). Do not describe NFC, payments, UPI, POS integration, CRM, or advertising as live.
5. **Cumulative milestone language:** always "Unlocks at ₹X". Never "Spend ₹X more".
6. **Placeholders must be obvious.** Anything sample (QR code, screenshots, logo) is labelled in code with `// SAMPLE` or `// TODO` and driven by one config file so it can be swapped in one place.
7. **Hosting is out of scope.** The founder will hand the code to a lead developer who will host it, most likely on AWS. Keep the project portable (Section 9).

---

## 1. Project goals

- Show clearly what Puraskrit does, in detail, for **two audiences**: customers (buyers) and merchants (sellers).
- **The first page (`/`) is buyer-only.** Its primary job is to get people to download the Buyer App.
- Merchants have their own separate module under `/merchants`, with a "Join as merchant" lead form.
- Look and feel follows the Puraskrit Professional Blue design system.

### Launch constraints (from Context)

- Launch market: **Bengaluru**, hyperlocal start around **Electronic City / Neeladri**. The site must not imply a pan-India or city-wide presence.
- Buyer App: Google Play launch is the current priority. iOS (App Store) is **not live**.
- Seller App: publishing "as required". No seller app download on the website for now.

---

## 2. Product facts the site may state (source: Product Context, Oct 2026)

### 2.1 What Puraskrit is
A merchant-first loyalty and local discovery platform for offline businesses. Core idea: help local businesses turn existing customers into repeat customers.

- Merchant pitch line: **"Turn your existing customers into repeat customers."** Alternative: **"Give your customers a reason to come back."**
- Customer line: **"Discover local businesses, track your loyalty, unlock rewards and discover offers."**
- Positioning line (direction, not a proven claim): "Others digitize the punch card. Puraskrit digitizes the merchant's repeat-customer relationship." **Do not use this on the public site** (it names competitors implicitly and is flagged in Context as direction only).

### 2.2 How loyalty works
- Loyalty is **cumulative-spend based**. Merchants set milestones; each milestone has a reward.
- Example from Context (use as illustrative, label "Example"):
  - Milestone 1: 🎁 FREE HAIRCUT, Unlocks at ₹10,000
  - Milestone 2: 🎁 FREE HAIR SPA, Unlocks at ₹20,000
  - Milestone 3: 🎁 FREE HAIRCUT + HEAD MASSAGE + FOOT MASSAGE, Unlocks at ₹50,000
  - Milestone 4: 🎁 FREE BODY SPA, Unlocks at ₹75,000
- ₹20,000 means total eligible spend reaches ₹20,000, not "another ₹20,000".
- Rewards are **merchant-funded** and merchant-defined (free service, free product, discount, complimentary experience, combination). **No points system.**
- Reward text is visually dominant; "Unlocks at ₹X" is smaller. Same font size for all rewards.
- Rewards are redeemable only with the issuing merchant (Customer T&C §9).

### 2.3 How a transaction is logged (current MVP, QR only)
1. Customer pays the merchant outside Puraskrit (UPI, cash or card; Puraskrit does not process or verify payment).
2. Customer opens the Buyer App and shows their QR.
3. Merchant scans it with the Seller App.
4. Merchant enters the purchase amount and confirms.
5. Transaction is logged; cumulative spend and milestone progress update.
6. Customer sees confirmation and updated progress.

Teachable to merchant staff in roughly 10–20 seconds (Context §30).

### 2.4 Customer features (Buyer App)
Discover nearby merchants · Search by merchant name · Browse by category · Join merchant loyalty programmes · Track cumulative spend · See upcoming/pending rewards and milestone progress · Unlock and redeem rewards · Discover merchant offers · View merchant services. (The app also has a "My Services" spend-history screen. It ships in v1 but is **deliberately not mentioned anywhere on the website**, per founder, 8 Oct 2026.)

Discovery rule: merchants appear in search and categories **whether or not they have an offer**. Offers are an attribute, not a requirement.

### 2.5 Merchant features (Seller App)
Merchant profile and About · Services · Loyalty milestones and rewards · Offers (Flat Discount, Prepaid Subscription, Combo Package) · Customer transaction logging via QR · Customer loyalty activity · Basic analytics · Offer creation, preview and management.

### 2.6 Business model facts safe to state
- **Free for customers.** (Context §4)
- **No commission on customer spending.** (Context §4)
- Rewards funded by the merchant, not Puraskrit.
- Merchant pricing: **do not display** (see Rule 2).

### 2.7 Merchant categories (initial focus, Context §1 and §26)
Primary focus: Salons, Car washes / car spas, Spas. Also supported: restaurants, cafés, bakeries, ice cream shops, mechanics, dry cleaners, garment/shoe stores, stationery, gift shops, flower shops, cosmetics, jewellery, book shops, pharmacies, society shops, supermarkets, pet stores, entertainment and sports venues, other offline service and retail businesses.

### 2.8 Things the site must NOT claim
Payment gateway · UPI app · bank · marketplace or discount platform · POS · full CRM · NFC · automatic payment verification · points-based rewards · any pre-launch traction numbers.

---

## 3. Design system (source: DESIGN.md "Puraskrit Professional Blue")

### 3.1 Colour tokens
Use these exact values. Define them as CSS variables or Tailwind theme tokens.

| Token | Hex | Use |
|---|---|---|
| primary | `#2563EB` | CTAs, links, key accents |
| on-primary | `#FFFFFF` | Text on primary |
| primary-container | `#DBEAFE` | Soft blue fills |
| on-primary-container | `#1E40AF` | Text on primary-container |
| secondary / on-surface (navy) | `#1A2B4A` | Headings and primary text |
| surface (page background) | `#F8F9FB` | Page canvas |
| surface-container-lowest (cards) | `#FFFFFF` | Cards, modals |
| surface-container / tag fill | `#F1F5F9` | Tags, badges, subtle sections |
| surface-container-high | `#E2E8F0` | Stronger fills |
| outline (borders, dividers) | `#E2E8F0` | Card borders |
| outline-variant | `#CBD5E1` | Secondary borders |
| on-surface-variant (muted text) | `#64748B` | Secondary text, labels |
| accent-green | `#10B981` | Active/verified/positive states only |
| error | `#BA1A1A` | Destructive/error states only |
| permission-icon bg | `#EFF6FF` | Circular icon containers (from DESIGN.md §4 components) |

Notes for the assistant:
- DESIGN.md contains two near-identical background values (`#F8F9FB` in §2 and `#faf8ff` as `background`). **Use `#F8F9FB`** as the page background (it is the documented "Background / Surface" token).
- Avoid red except for error states. No extra colours.

### 3.2 Typography
- Headlines: **Manrope**, weight 700/800, tight tracking.
- Body, captions, buttons: **Inter**.
- Scale (from DESIGN.md):

| Style | Font | Size / Line | Weight | Tracking |
|---|---|---|---|---|
| display | Manrope | 36 / 44 | 800 | -0.02em |
| headline-lg | Manrope | 28 / 36 | 700 | -0.015em |
| headline-md | Manrope | 24 / 32 | 700 | -0.01em |
| headline-sm | Manrope | 20 / 28 | 700 | none |
| title-md | Manrope | 16 / 24 | 600 | none |
| body-lg | Inter | 16 / 24 | 400 | none |
| body-md | Inter | 14 / 20 | 400 | none |
| body-sm | Inter | 13 / 18 | 400 | none |
| label-lg / md / sm | Inter | 15 / 14 / 12 | 600 | none |
| overline | Manrope | 11 / 16, uppercase | 600 | +0.05em |

- DESIGN.md's scale is app-sized. For desktop hero headlines the assistant may scale **display** up responsively (for example `clamp()` up to ~56–64px) **using the same font, weight and tracking**. This is a size adaptation, not a new style.
- **Devanagari fallback (flagged deviation):** Manrope and Inter do not include Devanagari glyphs, and the brand name is "पुरSkrit". Use **Noto Sans Devanagari** (Google Fonts) only as the fallback for the Devanagari characters. **Logo supplied (8 Oct 2026):** `Puraskrit_Logo.png`, a square canvas (~1160×1160) with generous white padding. Navy `#1A2B4A` "पुर" + blue `#2563EB` "Skrit" in a serif face that is not Manrope. **Always use the logo image; never retype the wordmark in live text.** Crop the padding for nav/footer use. The Noto Sans Devanagari fallback then only applies to running text, if ever needed. The favicon uses the full wordmark (see 8.1). TODO: founder to supply an SVG for crisp scaling.

### 3.3 Shape, spacing, elevation
- Radius: sm 4px, default 8px, md 12px, lg 16px, xl 24px, full 9999px.
- Cards: white, `rounded-2xl` (16–20px), border `1px solid #E2E8F0`, shadow `0 4px 20px rgba(26, 43, 74, 0.05)`.
- Primary buttons: `#2563EB`, white text, pill or `rounded-xl`, Inter 600, 14–16px, clear high-contrast active state.
- Tags/badges: fill `#F1F5F9`.
- Icon containers: circular, `#EFF6FF`, blue line icons.
- Spacing scale: 4, 8, 16, 24, 32px. Section gutter 24px, page margin 32px (16px on mobile).

### 3.4 Style direction (Context §23)
Modern, minimal, premium but accessible, light background, deep navy text, Puraskrit blue as the only strong accent, rounded cards, subtle shadows, minimal icons. **Avoid:** excessive badges or pills, too many colours, dense information, decorative clutter, complicated navigation.

---

## 4. Layout and navigation reference

Reference sites: **Cred** and **Zomato**. Take only the high-level *pattern* (app-first marketing site). **Do not copy** their visuals, copy, illustrations, or code. Puraskrit's look comes from Section 3.

Patterns to adopt:
- Sticky, minimal top navigation with logo left, a few links, and a persistent **"Get the app"** button on the right.
- Hero with one strong headline, one line of support copy, a **phone mockup**, and the **download block** (QR + store badges) visible without scrolling on desktop.
- Short, scannable sections that alternate text and phone-screen visuals.
- A simple "how it works" in 3–4 steps.
- A closing download CTA band before the footer.
- Multi-column footer with product, merchant, legal and contact links.
- On mobile: replace the QR (useless on a phone) with a direct **"Get it on Google Play"** button.

### 4.1 Audience switch
A two-option toggle in the top nav: **For Customers** (default, `/`) and **For Merchants** (`/merchants`). The nav links and the primary CTA change with the module:

| Module | Nav links | Primary CTA |
|---|---|---|
| Customers | How it works · Rewards · Discover · FAQ | **Get the app** (scrolls to / opens download block) |
| Merchants | How it works · Loyalty programmes · Offers · FAQ | **Join as merchant** (`/merchants/join`) |

---

## 5. Site map

```
/                          Customer home (buyer-only, first page, QR download)
/how-it-works              Customer: how loyalty tracking works
/rewards                   Customer: milestones and rewards explained
/discover                  Customer: merchant discovery, search, categories, offers
/faq                       Customer FAQ

/merchants                 Merchant home
/merchants/how-it-works    Merchant: setup + QR transaction flow
/merchants/loyalty         Merchant: loyalty programmes and milestones
/merchants/offers          Merchant: offer types and management
/merchants/join            "Join as merchant" lead form
/merchants/faq             Merchant FAQ

/about                     About Puraskrit (Asraubh Private Limited, Bengaluru)
/contact                   Contact (support@puraskrit.com)

/legal/customer-terms      Customer Terms & Conditions
/legal/customer-privacy    Customer Privacy Policy
/legal/customer-terms-of-use   Customer Terms of Use
/legal/merchant-terms      Merchant Terms & Conditions
/legal/merchant-privacy    Merchant Privacy Policy
/legal/merchant-terms-of-use   Merchant Terms of Use
```

Legal pages render the text from the six documents **verbatim**. Source files (received 8 Oct 2026, `.docx`, in the project root): `BuyerApp_Terms_Conditions`, `BuyerApp_Privacy_Policy`, `BuyerApp_Terms_of_Use`, `SellerApp_Terms_Conditions`, `SellerApp_Privacy_Policy`, `SellerApp_Terms_of_Use`. Buyer = Customer pages, Seller = Merchant pages. Do not rewrite or summarise legal text. See Section 10 for issues to resolve before publishing.

---

## 6. Page specifications

### 6.1 `/` Customer home (buyer-only)

**Section A. Hero**
- Overline: `LOYALTY, LOCAL`
- H1 (display): **Your favourite local places. One loyalty.**
- Support: Track what you spend at the businesses you already visit, watch your progress, and unlock rewards from the merchants themselves.
- Download block (see 7): QR + Google Play badge + iOS "Coming soon".
- Small line under the block: "Free for customers. Currently available in Bengaluru." (Free: Context §4. Bengaluru: Context §1.)
- Right side: phone mockup showing the buyer loyalty screen. **Screenshot slot `buyer-01-loyalty.png`.**

> Copy above is a draft within the facts in Section 2. Founder may change wording but not the facts.

**Section B. What you get (3 cards)**
1. **Track your loyalty.** See your cumulative spend and how close you are to the next reward.
2. **Unlock real rewards.** Free services, discounts and add-ons defined by the merchant. Rewards show up front; the amount needed shows as "Unlocks at ₹X".
3. **Discover local businesses.** Find Puraskrit merchants nearby, search by name or browse by category.

Each card: circular `#EFF6FF` icon container, title (title-md), body (body-md). White card per 3.3.

**Section C. How it works (4 steps)** (from 2.3)
1. Pay the merchant as you normally do.
2. Open Puraskrit and show your QR.
3. The merchant scans it and enters your purchase amount.
4. Your progress updates and you see how close you are to your next reward.

Include the line: "Puraskrit doesn't process payments. You pay the merchant directly, as usual."

**Section D. Rewards, explained** (with example milestone list)
- Two-column: text left, phone mockup right (**slot `buyer-02-milestones.png`**).
- Show the Milestone 1–3 example from 2.2 as a styled list: reward large, "Unlocks at ₹X" small, labelled "Example".
- Explain in one sentence: "Milestones are cumulative. ₹20,000 means your total spend reaches ₹20,000."

**Section E. Discover** (**slot `buyer-03-discover.png`**)
- Search, categories, nearby merchants, offers, and each merchant's services.
- State plainly: every Puraskrit merchant in your area is listed, whether or not they have an offer running.

**Section F. Offers** (**slot `buyer-04-offers.png`**)
- Offers appear under the merchant that created them. Types: Flat Discount, Prepaid Subscription, Combo Package.

**(No "history" / "My Services" section.** Founder decision, 8 Oct 2026: do not mention My Services anywhere on the site: no section, FAQ, feature list or screenshot. If a supplied screenshot shows it, crop or choose a different screen.)

**Section H. Merchant strip (small, secondary)**
- One compact band: "Run a business? Turn existing customers into repeat customers." Button: **For merchants** → `/merchants`. Do not make this compete with the download CTA.

**Section I. Closing download CTA band**
- Headline: **Start tracking your rewards.** Repeat the download block.

**Footer** (all pages): logo · Customers links · Merchants links · Company (About, Contact) · Legal (all six) · "© Asraubh Private Limited" · support@puraskrit.com · "Bengaluru, Karnataka, India".

### 6.2 `/how-it-works`, `/rewards`, `/discover`, `/faq`
Expand Sections C, D, E/F of the home page into full pages using the same components.
- `/rewards`: full milestone explanation, cumulative language, merchant-funded rewards, redemption only with the issuing merchant, what happens if a merchant closes (Customer T&C §10: merchants must give 30 days' notice and allow redemption of outstanding rewards; summarise this accurately, link to the T&C).
- `/discover`: search ranking is internal; do **not** describe ranking logic on the site.
- `/faq` (customer), answers must come from the documents:
  - Is Puraskrit free? (Yes for customers, Context §4)
  - Does Puraskrit take payments? (No, Customer T&C §6)
  - Who gives the rewards? (The merchant. T&C §9)
  - Where can I redeem? (Only with the issuing merchant. T&C §9)
  - What data do you collect? (Name, phone number, optional photo. Privacy Policy §3.1)
  - How do I delete my account/data? (Request via support@puraskrit.com; deletion within 30 days subject to legal retention. Privacy Policy §6.3)
  - Minimum age? (18+. T&C §5)
  - Is iOS available? ("Coming soon.")

### 6.3 `/merchants` Merchant home

**Hero**
- H1: **Turn your existing customers into repeat customers.** (Context §2)
- Support: A simple loyalty programme you run from your phone. You set the milestones and rewards. Customers track their progress and come back.
- CTAs: **Join as merchant** (primary) and **See how it works** (secondary).
- Visual: seller phone mockup (**slot `seller-01-milestones.png`**).

**Sections**
1. **Why Puraskrit** (3 cards): *Built for repeat business* · *You own the relationship and fund your own rewards* · *No commission on your customers' spending* (Context §4, §38).
2. **How it works for you** (see `/merchants/how-it-works`): create your profile and loyalty programme → show your Puraskrit QR at checkout → scan the customer's QR after payment and enter the amount → the customer's progress updates.
3. **Your loyalty programme**: milestone example (2.2), reward-first display (**slot `seller-02-preview-milestones.png`**).
4. **Offers**: three types with the fixed icons (% for Flat Discount, hand + ₹ for Prepaid Subscription, gift box for Combo Package). (**slot `seller-03-active-offers.png`**, **slot `seller-04-offer-details.png`**.)
5. **Who it's for**: category chips from 2.7 (lead with Salons, Car washes / car spas, Spas; "and more").
6. **Simple to teach your staff**: "Your team can learn the scan-and-enter flow in about 10–20 seconds." (Context §30; phrase as "about".)
7. **Getting started**: onboarding steps from Context §30 (account, business profile, location, services, milestones and rewards, offers, QR setup, Seller App installation, staff demonstration). Founder-assisted onboarding is the current model: "We help you get set up." TODO: confirm the exact wording of this promise with founder.
8. **Final CTA**: **Join as merchant** + "Questions? support@puraskrit.com".

**Do not include:** pricing, plan names, subscription amounts, free-trial claims, analytics promises beyond "basic analytics", merchant counts.

### 6.4 `/merchants/how-it-works`, `/merchants/loyalty`, `/merchants/offers`, `/merchants/faq`
- `/merchants/loyalty`: milestone mechanics, reward types (discounts, free services, complimentary add-ons, special benefits), cumulative language, and merchant rules stated accurately from Merchant T&C §8–9: no unattainable milestones, no hidden time limits, no vague reward descriptions, no retroactive devaluing of earned milestones, 7 days' customer notice before structural changes. Frame as "Fair programme rules".
- `/merchants/offers`: three offer types, offer fields (name, type, services included, discount, original price, final price, validity). Show an illustrative card using the Context example: Annual Wellness Subscription · 12 services · 30% OFF · ~~₹4,000~~ ₹3,000 · Valid till 30 Nov, labelled **"Example"**.
- `/merchants/faq`, answers from documents only:
  - What do I need to join? (Valid registered business or proprietor; valid licences; accurate details. Merchant T&C §5)
  - Who pays for rewards? (The merchant. Context §4)
  - Does Puraskrit process my customers' payments? (No. Merchant ToU §10)
  - What if I want to leave? (30 days' written notice; honour outstanding milestones. Merchant T&C §11)
  - Which businesses are not allowed? (List from Merchant ToU §7)
  - Cost? → **"Contact us"** (pricing hidden)

### 6.5 `/merchants/join` Lead form
Fields:
| Field | Type | Required |
|---|---|---|
| Business name | text | yes |
| Your name | text | yes |
| Mobile number | tel (+91) | yes |
| Email | email | yes |
| Business category | select (list in 2.7) | yes |
| Locality / area | text | yes |
| City | text, default "Bengaluru" | yes |
| Anything else? | textarea | no |
| Consent | checkbox, **unchecked by default** | yes |

Consent text: "I agree to Asraubh Private Limited contacting me about Puraskrit and processing these details as described in the Merchant Privacy Policy." (link to `/legal/merchant-privacy`).

Requirements: inline validation, success state ("Thanks. We'll be in touch."), spam protection (honeypot field at minimum), and **no GSTIN or bank details on this form** (those belong to formal onboarding per the Merchant Privacy Policy).
Submission: post to a configurable endpoint `NEXT_PUBLIC_LEAD_ENDPOINT` (or equivalent env var). Backend is **TODO for the lead developer**. Until then, the form posts to a stub that logs locally and shows success in dev only. Do not store personal data in the front-end repo.

### 6.6 `/about`, `/contact`
- `/about`: Asraubh Private Limited, Bengaluru, Karnataka. What Puraskrit is, in the 2.1 wording. No team photos or founder story unless supplied. TODO: founder to supply any about copy.
- `/contact`: support@puraskrit.com, Bengaluru. Grievance Officer details exactly as in the Privacy Policy §9 (see Section 10 about issues there).

---

## 7. Download block component (critical)

Used in the home hero, closing band and anywhere "Get the app" is clicked.

**Desktop/tablet:**
- White card (per 3.3) containing:
  - A **sample QR code** (see config below) with caption "Scan to download the Puraskrit app".
  - **Google Play badge** (links to the same URL as the QR).
  - **App Store badge, disabled**: greyed (`#F1F5F9` fill, `#64748B` text) with the label **"Coming soon on iOS"**. Not clickable. No QR for iOS.
- A visible **"SAMPLE — replace before launch"** marker in development builds only (hide in production builds via env flag).

**Mobile:**
- Hide the QR. Show a full-width primary button **"Get it on Google Play"**. Under it, the disabled iOS note "iOS coming soon".
- Optional: if the user agent is iOS, show only the "iOS coming soon" message plus the option to be notified. TODO: founder to decide if a notify-me email capture is wanted (not specified, so build nothing by default).

**Config (single source, `src/config/app.ts` or equivalent):**
```ts
export const APP_LINKS = {
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.puraskrit.customer", // SAMPLE: invented package ID, not a real listing. Replace at launch.
  appStoreUrl: null,            // null => render "Coming soon on iOS"
  showSampleMarker: true,       // set false in production
};
```
- QR is generated from `playStoreUrl` at build/run time with a QR library (for example `qrcode` / `qrcode.react`), rendered as SVG, navy `#1A2B4A` modules on white, with quiet zone. Add a high error-correction level.
- When `appStoreUrl` is later set, the iOS badge becomes active and a second QR may be shown.
- Use official store badge artwork per each store's brand guidelines. TODO: founder/lead dev to download the current official Google Play badge assets. Do not redraw them.

---

## 8. Assets (received 8 Oct 2026)

All assets live in `/public/assets/`. Source: the `website-assets/` folder (copy its contents there). Any slot still empty renders a clearly labelled placeholder frame (phone outline `#E2E8F0`, centred label with the filename).

### 8.1 Logo and favicon (received; derived from `Puraskrit_Logo.png`, transparent PNG)
| File | Size | Use |
|---|---|---|
| `logo.png` | 640×209, tight crop | Nav and footer (primary) |
| `logo@2x.png` | 1280×418, tight crop | Retina version of `logo.png` (use via `srcset`) |
| `logo.svg` | 1150×1150 canvas | Founder-supplied. **Not a true vector**: it wraps one embedded 1442×468 PNG. Do not use it for scaling; kept for reference only |
| `logo-small.png` | 313×102, tight crop | Small contexts, fallback |
| `logo-square.png` | 1150×1150, padded | Social/OG base |
| `favicon-512.png`, `-192`, `-180`, `-48`, `-32` | square | Favicon set: full wordmark on a rounded white tile (founder-approved, option A). 180 = Apple touch icon, 192 and 512 = web manifest |
| `favicon.ico` | 48 + 32 | Legacy browsers |
| `og-image.png` | 1200×630 | Social share preview: the favicon tile (440px) centred on `#F8F9FB`. Founder-approved design: icon only, no tagline |

`logo.png`, `logo@2x.png`, `logo-small.png` and the favicons were rebuilt from the PNG embedded in the founder's `logo.svg` (1442×468, higher resolution than `Puraskrit_Logo.png`). `logo-square.png` is the original `Puraskrit_Logo.png`. Originals are untouched in the project root. At 32px the one-line wordmark is small; accepted by the founder.

Still needed: a **true vector** SVG (paths, not an embedded PNG) if crisp scaling matters. Use the images; never retype the wordmark.

### 8.2 Buyer screenshots (received, PROVISIONAL, see 8.4)
**Founder decision (8 Oct 2026): all buyer and seller screenshots are accepted as placeholders.** They go into the build as-is (flagged issues included, see 8.4 and 8.5) and the founder will supply corrected originals later. Every screenshot must be referenced only through the single config file so each can be swapped without code changes, and each carries a `// SAMPLE` marker. Do not ship to production with these.

| Slot file | Source screen | Used on | Status |
|---|---|---|---|
| `buyer-00-landing.png` | Landing Page | Hero phone (best fit) | OK to use |
| `buyer-01-loyalty.png` | Customer Home Page (full scroll) | Hero / loyalty | Has banned copy, see 8.4 |
| `buyer-02-milestones.png` | Shop Details Screen | Rewards section | Has banned copy, see 8.4 |
| `buyer-03-discover.png` | Home Page, top crop (location, search, categories) | Discover | Usable; check sample data |
| `buyer-04-offers.png` | Home Page, bottom crop (Nearby Offers) | Offers | Sample data (past dates), see 8.4 |
| `buyer-05-collect-qr.png` | Collect / QR screen | How it works, step 2 | Placeholder; shows fake name and phone, see 8.4 and 8.5 |

### 8.3 Seller screenshots (RECEIVED, PROVISIONAL, see 8.5)
The seller folder now holds ~30 screens (earlier it held only two logo files). Slot mapping:

| Slot file | Source screen | Used on | Status |
|---|---|---|---|
| `seller-01-milestones.png` | Create Loyalty Screen ("Create Milestones" form) | Merchant hero | Field labels read "Spend", see 8.5 |
| `seller-02-preview-milestones.png` | Loyalty Card 1.png ("Preview Milestones", 6 milestones, "Unlocks at ₹X") | Merchant loyalty section | Best seller screen; correct language |
| `seller-03-active-offers.png` | Offers_Seller 1.png ("Active Offers", all three offer types) | Merchant offers | Some past dates, see 8.5 |
| `seller-04-offer-details.png` | Offers Expanded_Seller 1.png (offer detail sheet) | Merchant offers | Discount maths mismatch, see 8.5 |
| `seller-05-scan-amount.png` | Give Loyalty Screen (QR scan + manual entry) | Merchant how it works | Usable; phone-number manual entry is not in the 2.3 flow |
| `seller-05b-enter-amount.png` | Add Spends Screen (Enter Purchase Amount) | Merchant how it works | Banned "₹X more" copy, see 8.5 |

Screens received but not used: About Us (x2), Add Photo, Body (Team Management), Business Details (x2), Create Offers / Discount / Combo / Prepaid, Home Page, Landing Page, My Customers, My Offers, Profile, Profile Setting Selection, Select Services Offered, Milestone Preview (x2, older low-fi versions). Seller login/utility screens are in `website-assets/_unused/`. No seller slot is empty.

### 8.4 Screenshot audit: issues to fix before launch
1. **Banned language in screens.** Customer Home shows "₹7k More to go / ₹3k More to go / ₹25k More to go". Loyalty Spends shows "Spend ₹2,000 more to unlock". Shop Details shows "Spend ₹10,000 / ₹20,000 / ₹35,000". Context §6, §16 and §38 say cumulative milestones must read "Unlocks at ₹X", never "Spend/₹X more". Fix in the app (or re-export corrected mock screens). Shop Details also shows milestone rewards as "-10% OFF / -20% OFF / -40% OFF" rather than reward-first text.
2. **Excluded by founder decision (My Services):** `My Spends.png`, and the Profile screen's "My Spends" row. Do not use these. `Profile Screen.png` is excluded for that reason too. `My Spends.png` also shows "Gold Tier Member", "Membership Credit" and "Refund" lines; none of these features exist in Context, so they must never appear on the site.
3. **Excluded:** `Visit Shop View.png` (Directions sheet shows a Google map of Leeds, UK; wrong city and third-party map imagery).
4. **Not used (utility screens):** OTP, Mobile Number, Location Selection, Personal Details Edit, 24x7 Help & Support (buyer and seller versions). Stored in `website-assets/_unused/`. Add only if a login-flow section is wanted.
5. **Sample data shows non-Bengaluru and stale content:** shops in Mumbai and New Delhi; offers "Valid till 2026-05-20" (already past on 8 Oct 2026); a person name and phone number (+91 98765 43210) in the QR screen. Replace with Bengaluru sample merchants and future dates, and use clearly fictional names. A visible fake phone number must not be published.
6. **Resolution too low.** Received widths are 390–470px. A hero phone at desktop size needs ~3x (≥1170px wide). Re-export from Figma at 3x. Several are long scroll captures, not phone-frame screens; export fixed viewport frames (e.g. 390×844 at 3x).
7. **Brand mismatch in screens:** screen headings use a serif display face and the mark is rendered differently across screens ("पुरSkrit" weight and colour vary). Not a website issue, but the site must not copy that serif; the site uses Manrope/Inter per DESIGN.md.

### 8.5 Added flags (asset pass, seller screens and extra buyer findings)
Screenshots were not edited. Slot files are in `website-assets/`.
1. `seller-01-milestones.png`: "1st MILESTONE / Spend" and "2nd MILESTONE / Spend" field labels (must read "Unlocks at"). Width 470px.
2. `seller-03-active-offers.png`: "Valid till 2026-09-30", "2026-09-29", "2026-09-28" are past dates. Also the device status bar (10:37, 72%) is a real phone capture; crop it.
3. `seller-04-offer-details.png`: "30% OFF" with "₹4000 → ₹3000" is 25%, and the same offer in `seller-03` says "25% OFF". The 6.4 Context example also says 30%. Founder to confirm the intended figure.
4. `seller-05-scan-amount.png`: stock lake photo stands in for the camera view; "Manual Entry" by "+91" phone number is outside the QR-only flow in 2.3.
5. `seller-05b-enter-amount.png`: "₹25,000 more to reach the next milestone reward." (banned); "FirstName LastName" placeholder.
6. `seller-02-preview-milestones.png`: no copy flags. Real phone capture with status bar (10:21, 76%) and Android nav bar; crop.
7. `buyer-01-loyalty.png`: exact banned text "₹7k More to go", "₹3k More to go", "₹25k More to go"; sub-lines "Reach ₹35k to unlock the next reward", "Reach ₹25k…", "Reach ₹50k…"; gem icons beside merchant names look like tiers; heading "My Loyalty Spends"; offers "Valid till 2026-05-20" (past) by "Anchit's Salon" (real-looking personal name); search placeholder "Search for luxury services".
8. `buyer-02-milestones.png`: "Spend ₹10,000 / ₹20,000 / ₹35,000" with "-10% OFF / -20% OFF / -40% OFF"; "The Zen Wellness Spa, 42nd Luxury Avenue, Mumbai, MH"; "SHOW DIRECTIONS" (leads to the excluded Directions screen); "Valid till 2026-02-24" (past); seller-style "Upload More" tile on a buyer screen.
9. `buyer-04-offers.png`: "Valid till 2026-05-20" (x3, past); "Anchit's Salon" (x3, real-looking personal name).
10. `buyer-05-collect-qr.png`: "Aditi Sharma" and "+91 98765 43210" (fake-looking but must not be published). Marked OK in 8.2; treat as flagged.
11. `buyer-03-discover.png`: no banned text in the crop (Electronic City Phase 2, categories). Note: the 1px top row was trimmed by the crop tool. Categories include FUEL and DINING, SUPERMARKET, DRY CLEAN, PET CARE; check they fit the 2.7 list (Fuel is not in 2.7).
12. `buyer-00-landing.png`: no flags in copy. Files in `_unused/` were not audited.

Other assets still needed: none for the og-image or favicons (both done, see 8.1). Phone frames: build with CSS using the card radius and border tokens. Do not use real device brand marks.

---

## 9. Technical requirements

### 9.1 Stack
**Not decided.** The founder will hand this to a lead developer who will host it, mostly on AWS. Therefore:
- Default recommendation for the assistant: **Next.js (App Router) + TypeScript + Tailwind CSS**, configured for **static export where possible** so it can be hosted on S3 + CloudFront or AWS Amplify without code changes. TODO: lead developer to confirm the stack before major build work starts. If they choose another framework, the content, routes and design tokens in this file stay the same.
- No hosting-specific code (no Vercel-only APIs, no Amplify-only SDKs).

### 9.2 Handover requirements
- Clean `README.md`: install, run, build, environment variables, and how to change content.
- `.env.example` listing every variable (lead endpoint, analytics ID, store URLs, sample-marker flag). No secrets committed.
- All copy and links in a small number of content/config files, not scattered in components.
- Design tokens in one theme file mapped 1:1 to Section 3.
- Reusable components: `Nav`, `AudienceToggle`, `DownloadBlock`, `PhoneMockup`, `FeatureCard`, `StepList`, `MilestoneList`, `OfferCard`, `FAQAccordion`, `LeadForm`, `Footer`, `CTABand`.
- Lint + type-check pass; production build passes with no errors.
- Backend for the lead form, analytics, cookie consent, and hosting are left to the lead developer. Mark each integration point with `// TODO(lead-dev)`.

### 9.3 Quality bar
- Responsive: 360px to 1440px+. Mobile-first.
- Accessibility: WCAG 2.1 AA contrast, keyboard navigable, visible focus states (use primary blue), semantic HTML, alt text on all images, QR has an accessible text alternative (link to the store).
- Performance: optimised images (WebP/AVIF with fallback), lazy-load below-the-fold, fonts via `font-display: swap`.
- SEO: unique title and meta description per page, Open Graph tags, `sitemap.xml`, `robots.txt`, semantic headings (one H1 per page).
- Language: English only for now.
- Analytics and cookies: **not specified.** Do not add trackers. Leave a `TODO(lead-dev)` hook. If analytics is added later, a consent banner must default to declining non-essential cookies.

---

## 10. Open items and issues to resolve before launch

Found while reading the source documents. The assistant should **not** resolve these silently.

| # | Item | Source | Action |
|---|---|---|---|
| 1 | Merchant T&C subscription plans are still placeholders (`[INSERT PLAN NAME]`, `₹[INSERT AMOUNT]`). | Merchant T&C §12.1 | Keep pricing hidden. Founder to finalise before the legal page is published. **Confirmed present** in `SellerApp_Terms_Conditions` (two plan lines). |
| 2 | Effective dates differ across documents (**re-verified against the received files, all correct**; Customer ToU and Merchant Privacy are the two `10/08/2026`): Customer T&C, Customer Privacy, Merchant T&C, Merchant ToU show `10/03/2026`; Merchant Privacy and Customer ToU show `10/08/2026`. All say Version 1.0. | All six legal docs | Founder to confirm one intended date per document. Also confirm date format (DD/MM vs MM/DD). |
| 3 | Grievance Officer "Designation" field repeats the name ("Krishna Kumar Pradhan, Director, …"). | Privacy Policies §9 / §12 | Fix text before publishing. |
| 4 | Customer T&C and Privacy say a **fresh consent screen** is shown for material changes. The website itself has no consent mechanism. | T&C §4, §17 | Not a website task. Noted for the lead developer. |
| 5 | Privacy Policies state security practices (AES-256, ISO 27001-aligned). | Privacy Policies | Do not repeat these as marketing claims on the site unless the founder confirms they are accurate. |
| 6 | "My Services" ships in v1 but is intentionally excluded from the website. | Founder, 8 Oct 2026 | Do not add it anywhere on the site. |
| 7 | Logo, favicon, buyer and seller screenshots received (screenshots are placeholders until replaced by corrected originals, per founder). SVG logo not supplied. | Founder | See Section 8, esp. 8.4 and 8.5. |
| 8 | Real Google Play listing URL not available yet. Sample URL in use (`com.puraskrit.customer` is an invented ID). | Context §32 | Founder to replace `playStoreUrl` in `APP_LINKS` at launch. |
| 9 | Brand spelling: Context uses both "Puraskrit" (text) and "पुरSkrit" (wordmark). | Context, DESIGN.md | Convention in this file: wordmark = पुरSkrit, running text = Puraskrit. Founder to confirm. |
| 10 | Hosting, domain, analytics, lead-form backend, cookie consent. | n/a | Lead developer. |
| 11 | Seller App availability on stores is "as required". | Context §32 | No seller download on the site until confirmed. |

---

## 11. Definition of done (v1)

- [ ] `/` is buyer-only and shows the sample QR, Google Play badge, and disabled "Coming soon on iOS" badge.
- [ ] Mobile shows a Google Play button instead of a QR.
- [ ] Customer and merchant modules are separate, with the audience toggle in the nav.
- [ ] Every page follows the Section 3 tokens; no off-system colours or fonts (Devanagari fallback excepted).
- [ ] No pricing, no invented numbers, no testimonials anywhere.
- [ ] All milestone copy uses "Unlocks at ₹X".
- [ ] All six legal pages present and linked from the footer, with Section 10 items 2 and 3 resolved or visibly flagged.
- [ ] Lead form validates, requires unchecked-by-default consent, and posts to a configurable endpoint.
- [ ] All placeholders carry `SAMPLE` / `TODO` markers and are driven from config.
- [ ] README, `.env.example`, and `TODO(lead-dev)` markers are in place for handover.
- [ ] Lighthouse accessibility ≥ 90 and no console errors on a production build.
