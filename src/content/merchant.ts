/**
 * Merchant (seller) copy. Source: context file §6.3, §6.4, Merchant T&C §8–9.
 * Customers read these pages too: no business-speak, no promised results, no figures.
 * Do not add pricing, plan names, free-trial claims, merchant counts or analytics promises
 * beyond "basic analytics".
 */
import type { IconName } from "@/components/Icon";

export const MERCHANT_HERO = {
  overline: "For merchants",
  // Value proposition (one line). Context §2.1 ("Give your customers a reason to come back.")
  title: "A simple way to thank the customers who keep coming back.",
  highlights: [
    // Context §2.5 (merchant sets milestones, rewards, offers); Merchant T&C §8
    { icon: "gift" as IconName, text: "You design the milestones and rewards, and stay in control." },
    // Context §2.3 (scan, enter amount, confirm) and §30 (staff learn it in about 10–20 seconds)
    { icon: "scan" as IconName, text: "Easy at the counter: scan, enter the amount, done. Simple enough to learn in about 10–20 seconds." },
    // Context §4 (no commission); Rule 2 (no pricing on the site)
    { icon: "shield" as IconName, text: "No commission on what your customers pay you. For pricing, contact us." },
  ],
  primary: { label: "Join as merchant", href: "/merchants/join/" },
  secondary: { label: "See how it works", href: "/merchants/how-it-works/" },
};

export const WHY_PURASKRIT: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "repeat",
    title: "Made for your regulars",
    body: "Recognise the people who keep coming back, with milestones they can see.",
  },
  {
    icon: "store",
    title: "You design the rewards",
    body: "You choose and fund them: free services, discounts, add-ons or special benefits.",
  },
  {
    icon: "shield",
    title: "No commission",
    body: "Your customers pay you directly. Puraskrit takes no cut of what they pay.",
  },
];

export const MERCHANT_STEPS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "store",
    title: "Create your profile and loyalty programme",
    body: "Add your business, services, milestones and rewards.",
  },
  {
    icon: "qr",
    title: "Show your Puraskrit QR at checkout",
    body: "Let customers know you're on Puraskrit.",
  },
  {
    icon: "scan",
    title: "Scan the customer's QR after payment and enter the amount",
    body: "Your customer pays you as usual. Then scan their QR in the Seller App and confirm the purchase amount.",
  },
  {
    icon: "progress",
    title: "The customer's progress updates",
    body: "The visit is logged and their milestone progress updates in their app straight away.",
  },
];

export const SELLER_FEATURES: { icon: IconName; title: string }[] = [
  { icon: "store", title: "Merchant profile and About" },
  { icon: "list", title: "Services" },
  { icon: "gift", title: "Loyalty milestones and rewards" },
  { icon: "percent", title: "Offers: create, preview and manage" },
  { icon: "scan", title: "Customer transaction logging via QR" },
  { icon: "users", title: "Customer loyalty activity" },
  { icon: "chart", title: "Basic analytics" },
];

export const LOYALTY_SECTION = {
  overline: "Your loyalty programme",
  title: "Rewards first. Milestones your customers can see.",
  body: 'Set milestones at fixed amounts, each with a reward you choose. Customers see the reward up front, with "Unlocks at ₹X" underneath.',
};

export const REWARD_TYPES = ["Discounts on services", "Free services", "Complimentary add-ons", "Special benefits you define"];

export const FAIR_RULES: { icon: IconName; title: string; body: string }[] = [
  { icon: "target", title: "No unattainable milestones", body: "Milestones must be realistically reachable for a customer." },
  { icon: "clock", title: "No hidden time limits", body: "Earned progress can't quietly expire without customers being told." },
  { icon: "text", title: "Clear reward descriptions", body: "No vague, ambiguous or misleading reward text." },
  { icon: "lock", title: "Earned milestones are protected", body: "Changes never retroactively devalue, reduce or erase milestones a customer has already earned. Approved changes apply to future transactions only." },
  { icon: "bell", title: "7 days' notice for structural changes", body: "Customers must be told at least 7 days before a structural change to reward terms takes effect." },
];

export const OFFERS_INTRO = {
  overline: "Offers",
  title: "Three offer types, built in.",
  body: "Create an offer, preview it, and manage it from the Seller App. Offers appear on your profile in the Buyer App.",
};

export const WHO_ITS_FOR = {
  overline: "Who it's for",
  title: "Made for local, offline businesses.",
  body: "We're starting with salons, car washes and spas, and Puraskrit works for many other offline service and retail businesses too.",
};

export const STAFF_LINE = {
  title: "Simple to teach your staff.",
  body: "Your team can learn the scan-and-enter flow in about 10–20 seconds.",
};

// TODO(founder): confirm the exact wording of the founder-assisted onboarding promise (context §6.3 item 7).
export const ONBOARDING = {
  overline: "Getting started",
  title: "We help you get set up.",
  steps: [
    "Account",
    "Business profile",
    "Location",
    "Services",
    "Milestones and rewards",
    "Offers",
    "QR setup",
    "Seller App installation",
    "Staff demonstration",
  ],
};

export const MERCHANT_FINAL_CTA = {
  title: "Give your customers a reason to come back.",
  body: "Questions? support@puraskrit.com",
};
