/**
 * "Fair by design": customer trust facts. Every line comes from a source document (cited below).
 * Keep it calm and factual. Do not add claims that are not in the documents.
 */
import type { IconName } from "@/components/Icon";

export const FAIR_BY_DESIGN = {
  overline: "Fair by design",
  title: "Clear rules, so you never have to wonder.",
  items: [
    {
      icon: "wallet" as IconName,
      title: "Free for you",
      // Context §4: free for customers; no commission.
      body: "Puraskrit is free for customers, and takes no commission on what you pay.",
    },
    {
      icon: "gift" as IconName,
      title: "The merchant's promise",
      // Customer T&C §9 (redeemable only with the issuing merchant; fulfilment is the merchant's);
      // Merchant T&C §7 (honour all promised rewards) and §10 (no arbitrary denial of redemption).
      body: "Each merchant funds and honours their own rewards, and you redeem them with that merchant.",
    },
    {
      icon: "target" as IconName,
      title: "Fixed, fair milestones",
      // Merchant T&C §8 (no unattainable milestones, hidden time limits or vague rewards);
      // Merchant T&C §9 (no change may reduce or erase milestones already earned).
      body: "Levels you can see. No unreachable targets, hidden time limits or vague rewards, and nothing you've reached can be reduced.",
    },
    {
      icon: "bell" as IconName,
      title: "If a merchant leaves",
      // Customer T&C §10: at least 30 days' notice; you can redeem outstanding rewards.
      body: "They must give at least 30 days' notice and let you redeem your rewards.",
      link: { label: "Customer Terms, Section 10", href: "/legal/customer-terms/#10-merchant-exit-or-closure" },
    },
    {
      icon: "shield" as IconName,
      title: "We don't handle payments",
      // Customer T&C §6: Puraskrit is not a payment processor.
      body: "You pay the merchant directly. Puraskrit doesn't process payments.",
    },
    {
      icon: "lock" as IconName,
      title: "Only what's needed",
      // Customer Privacy Policy §3.1 (name, phone number, optional photo) and §6.3 (erasure on request).
      body: "Your name and phone number, and a photo only if you add one. Ask us to delete your account any time.",
      link: { label: "Customer Privacy Policy", href: "/legal/customer-privacy/" },
    },
  ],
};
