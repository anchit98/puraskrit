/**
 * Customer (buyer) copy. Source: context file §6.1, §6.2, built only on facts in §2.
 * Finishing pass (Oct 2026): warm, pressure-free wording. Words like "spend", urgency or
 * scarcity are banned from public copy (enforced by scripts/check-copy.mjs).
 */
import type { IconName } from "@/components/Icon";

export const HOME_HERO = {
  overline: "Loyalty, local",
  // Value proposition (one line). Context §2.1
  title: "The places you already love, now rewarding you for coming back.",
  highlights: [
    // Context §2.4 (track progress and milestone progress)
    { icon: "progress" as IconName, text: "See your progress at every place." },
    // Context §2.2 (reward first, "Unlocks at ₹X")
    { icon: "gift" as IconName, text: "Know each reward up front, and the level it unlocks at." },
    // Context §4 (free for customers); Merchant T&C §8 (no hidden time limits or vague rewards)
    { icon: "shield" as IconName, text: "Nothing to pay, nothing hidden." },
  ],
  note: "Free for customers. Currently available in Bengaluru.",
};

export const WHAT_YOU_GET: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "progress",
    title: "See your progress.",
    body: "See how far along you are at each place, and what you'll unlock next.",
  },
  {
    icon: "gift",
    title: "Unlock rewards from the merchant.",
    body: 'Free services, discounts and add-ons defined by the merchant. Rewards show up front; the amount needed shows as "Unlocks at ₹X".',
  },
  {
    icon: "pin",
    title: "Discover local businesses.",
    body: "Find Puraskrit merchants nearby, search by name or browse by category.",
  },
];


export const REWARDS_SECTION = {
  overline: "Rewards, explained",
  title: "Rewards from the places you already love.",
  body: "Each merchant sets their own milestones and the reward at each one. You see the reward first, and the total it unlocks at.",
};

export const DISCOVER_SECTION = {
  overline: "Discover",
  title: "Find good places around you.",
  body: "Search by merchant name, browse by category, see nearby merchants, their offers and the services each one provides.",
  listedLine: "Every Puraskrit merchant in your area is listed, whether or not they have an offer running.",
  features: [
    { icon: "search" as IconName, title: "Search by name", body: "Know the place? Type its name." },
    { icon: "grid" as IconName, title: "Browse by category", body: "Salons, spas, car washes, cafés and more." },
    { icon: "pin" as IconName, title: "Nearby merchants", body: "Puraskrit merchants close to you." },
    { icon: "list" as IconName, title: "Merchant services", body: "See what each merchant offers before you go." },
  ],
};

export const OFFERS_SECTION = {
  overline: "Offers",
  title: "Offers, right where they belong.",
  body: "Offers appear under the merchant that created them. There are three types:",
};

export const MERCHANT_STRIP = {
  text: "Run a local business? Thank the customers who keep coming back.",
  cta: { label: "For merchants", href: "/merchants/" },
};

export const CLOSING_CTA = {
  title: "Start collecting your rewards.",
  body: "Free for customers. Currently available in Bengaluru.",
};

export const REWARDS_PAGE = {
  items: [
    {
      icon: "progress" as IconName,
      title: "Cumulative, not per visit",
      body: "Every purchase a merchant logs adds to your running total with that merchant. A milestone that unlocks at ₹20,000 is reached when that total reaches ₹20,000, not after another ₹20,000.",
    },
    {
      icon: "store" as IconName,
      title: "Funded by the merchant",
      body: "Rewards are defined and funded by each merchant: a free service, a free product, a discount, a complimentary experience, or a combination.",
    },
    {
      icon: "check" as IconName,
      title: "Redeem with the issuing merchant",
      body: "Rewards you earn are redeemable only with the merchant that issued them.",
    },
  ],
};

/** Reward journey copy (customer and merchant variants). */
export const JOURNEY = {
  customer: {
    title: "Your reward journey",
    body: "Scroll along the path and watch each reward unlock.",
    readoutOverline: "Your journey",
    readoutLabel: "Your progress at this place",
    hint: "Tap a milestone to jump to it.",
  },
  merchant: {
    title: "A customer's reward journey",
    body: "Scroll along the path to see how a customer's rewards unlock at the levels you set.",
    readoutOverline: "Their journey",
    readoutLabel: "A customer's progress with you",
    hint: "Tap a milestone to jump to it.",
  },
};
