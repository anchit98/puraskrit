/**
 * About page: three sections that go deeper than the home page without repeating it.
 * Facts: Context §2.1–2.5 (shop profiles, services, three offer types, reward-first milestones,
 * shops listed whether or not they run an offer); Customer T&C §6 (Puraskrit is not a payment
 * processor), §9 (redeem with the issuing shop), §10 (30 days' notice if a shop leaves);
 * Merchant T&C §8 (no unattainable milestones, hidden time limits or vague rewards) and
 * §9 (earned milestones can't be reduced; 7 days' notice of changes);
 * Customer Privacy Policy §3.1 (name, phone, optional photo), §6.3 (deletion on request).
 */
import type { IconName } from "@/components/Icon";

export const ABOUT = {
  hero: {
    title: "Loyalty, finally on your side.",
    line: "Why Puraskrit exists, what's inside the app, and what we promise you.",
  },
  why: {
    overline: "Why we built it",
    title: "Your loyalty always had value. It just had nowhere to live.",
    paragraphs: [
      "The salon that knows your style. The café that remembers your order. The car wash you trust with your car. Local places run on regulars, and regulars deserve more than a thank-you.",
      "Paper punch cards get lost, and every shop has its own system. Puraskrit brings all of it into one app, so the loyalty you give is something you can actually see, track and claim.",
      "When you keep coming back, a local business grows. Puraskrit makes sure that loyalty comes back to you too.",
    ],
  },
  inside: {
    overline: "Inside the app",
    title: "Every shop, laid out for you.",
    features: [
      { icon: "store" as IconName, title: "Shop pages", body: "Each shop has its own page with what it does and the services it offers, so you know what to expect before you walk in." },
      { icon: "gift" as IconName, title: "Rewards, shown first", body: "Every shop lists its rewards in order, with the reward up front and the level it unlocks at right beside it." },
      { icon: "percent" as IconName, title: "Three kinds of offers", body: "Flat discounts on services, prepaid subscriptions for the places you visit often, and combo packages that bundle services together." },
      { icon: "list" as IconName, title: "Every shop is listed", body: "You'll find shops near you whether or not they're running an offer today. No one hides behind a deal." },
    ],
  },
  promise: {
    overline: "Our promise",
    title: "Built to protect you.",
    items: [
      { icon: "lock" as IconName, title: "Rules that can't move on you", body: "Shops can't set impossible targets or hidden expiry dates, can't reduce what you've already earned, and must give 7 days' notice before changing their rewards." },
      { icon: "bell" as IconName, title: "Covered if a shop closes", body: "A shop leaving Puraskrit must give 30 days' notice and let you redeem what you've earned. We'll tell you in the app." },
      { icon: "wallet" as IconName, title: "Your money stays yours", body: "You always pay the shop directly. Puraskrit never handles your payments." },
      { icon: "shield" as IconName, title: "Private by default", body: "We only ask for your name and phone number. A photo only if you want one. Ask us to delete your account any time." },
    ],
  },
};
