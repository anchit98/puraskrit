/**
 * Customer copy: the whole customer site in a few big, bold lines.
 * Tone: customers are empowered. Their loyalty has value and they claim what it deserves.
 * Never sympathy (no "free to use"), never merchant-side detail, never location claims.
 * Facts stay inside Context §2 (offers and rewards come from Puraskrit merchants nearby;
 * rewards are redeemed with the issuing merchant, Customer T&C §9).
 */
import type { IconName } from "@/components/Icon";

export const HOME_HERO = {
  overline: "Puraskrit",
  title: "Your loyalty has value. Claim it.",
  line: "Every visit to the places around you now counts.",
};

// Facts: Context §2.4 (discover nearby merchants, search, categories, offers, join programmes,
// track progress). "Shops" means Puraskrit merchants.
export const WAITING = {
  title: "Everything your loyalty unlocks",
  tiles: [
    { icon: "percent" as IconName, title: "Offers from shops near you", line: "See what salons, spas, cafés and more around you are offering right now." },
    { icon: "progress" as IconName, title: "Every visit counts", line: "Each time you shop at a Puraskrit store, your progress there moves forward." },
    { icon: "gift" as IconName, title: "All your rewards in one app", line: "Track rewards from every shop you visit, side by side, in Puraskrit." },
    { icon: "sparkle" as IconName, title: "Discover hidden gems", line: "Find great local places you may have walked right past." },
    { icon: "search" as IconName, title: "Find any shop in seconds", line: "Search by name, or browse categories like salons, spas and car washes." },
    { icon: "store" as IconName, title: "Rewards start on day one", line: "Visiting a shop for the first time? Your journey there starts with that visit." },
  ],
};

export const JOURNEY_SECTION = {
  title: "Every visit moves you closer.",
  line: "See exactly how far you are from your next reward.",
};

export const DISCOVER_SECTION = {
  title: "Find the places others miss.",
  line: "Search by name, or browse by category.",
};

export const YOURS_SECTION = {
  title: "You earned it. It's yours.",
  tiles: [
    { icon: "target" as IconName, title: "Rewards you can see" },
    { icon: "text" as IconName, title: "No fine print" },
    { icon: "lock" as IconName, title: "What you earn stays earned" },
    // Founder brief: redeem rewards any time after they are unlocked (Customer T&C §9: with the issuing shop)
    { icon: "check" as IconName, title: "Redeem when you're ready" },
  ],
};

/** Closing download band: one tagline per page, never repeated. */
export const CLOSING_CTA = {
  home: { title: "Get rewarded for showing up.", line: "Scan to download Puraskrit." },
  about: { title: "Loyalty looks good on you.", line: "Wear it proudly. Get the app." },
  faq: { title: "All clear? Your rewards are waiting.", line: "Download Puraskrit and start your first journey." },
};

/** Reward journey readout copy (MilestoneExplorer). */
export const JOURNEY = {
  readoutOverline: "Your journey",
  readoutLabel: "Your progress at this place",
  hint: "Tap a reward to jump to it.",
};
