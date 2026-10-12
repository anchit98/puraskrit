# Decisions since the original brief

`PURASKRIT_WEBSITE_CONTEXT_v2.md` was the original brief (8 Oct 2026). The decisions below were made afterwards by the founder and **override it** where they differ. The brief itself is left unedited.

## Structure and audience
- **Customer-first.** The website is for customers. They see only what the app does for them (the what, the how, and the download), never what merchants get, do or are responsible for.
- **One long home page.** The old `/how-it-works`, `/rewards`, `/discover` pages were folded into `/`.
- **One merchant page.** `/merchants/` (Puraskrit Merchants logo, Seller App link, steps, offers, contact form), linked **only** from the footer row "Partner with us" (like Zomato's "For Restaurants"). The old merchant sub-pages were removed.
- **Header has no links.** Logo and download badges only. All links live in the footer. The header scrolls with the page.
- **Footer legal links:** three documents per audience, titled "Terms of Use", "Privacy Policy", "Terms and Conditions". Customer pages show the customer documents; merchant pages show the merchant documents.
- **No customer contact page.** The merchant contact form is reached from the footer. Customers use support@puraskrit.com. The Grievance Officer block was removed from the site (it remains inside the verbatim Privacy Policy).

## Copy and tone
- Big, bold, short. Leave curiosity; don't over-explain. Customers should feel empowered ("Your loyalty has value. Claim it."), never sympathised with, so the site does not say "free".
- Banned from all public copy: "spend" and its forms, urgency/scarcity/pressure words, business-speak aimed at customers, payment-method claims. Enforced by `scripts/check-copy.mjs`.
- No location claims anywhere on the site (no "Bengaluru").
- FAQ answers are plain one-sentence answers with no links into legal documents.
- Each page ends with its own download tagline; "Get rewarded for showing up." is used on the home page only.
- The merchant journey is: one-time loyalty setup → broadcast offers → scan the customer's QR and enter the amount → they come back. Merchants never show a QR.
- The merchant hero highlights that new customers can be turned into regulars as well as bringing regulars back.
- The merchant page does not mention commission or pricing.

## Visuals
- **CSS-only 3D and motion** (WebGL removed). All motion and 3D is retained when changing copy.
- **Only clean original screenshots.** No made-up/coded app screens and no "SAMPLE"/"Example" labels. Screens with banned wording, a location, a person's name or a sample phone number are held back until corrected versions arrive.
- **Store badges:** official Google Play badge. iOS is plain text, "Coming soon to iOS" (no Apple badge until it is live).
- Phone frames follow each screenshot's shape, with no blank bars and no cropping. Screenshot side margins are trimmed automatically.
- Mobile: all text centred; header logo centred and larger; no store badge in the mobile header; social icons after the legal links.

## Footer
- Social icons link to the real profiles (LinkedIn, X, Facebook, Instagram), set in `src/config/social.ts`.
- No company name or city line. The bottom-most note is a single line: "By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners." followed by "© 2026 Puraskrit Ltd. All rights reserved."

## Forms
- The merchant form promises contact within 24 hours (success message). It is not connected to storage yet; see the README "Merchant form" section.

## Process
- Do not commit or push unless the founder asks.
- The founder sample-hosts on Vercel from the GitHub repo `anchit98/puraskrit` (`main`).
