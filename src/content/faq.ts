/**
 * FAQ answers come only from the source documents (context file §6.2, §6.4).
 * Each entry notes its source for review.
 */

export type FAQ = { q: string; a: string; link?: { label: string; href: string } };

export const CUSTOMER_FAQ: FAQ[] = [
  {
    // Context §4
    q: "Is Puraskrit free?",
    a: "Yes. Puraskrit is free for customers.",
  },
  {
    // Customer T&C §6, §11
    q: "Does Puraskrit take payments?",
    a: "No. Puraskrit is not a payment processor. You pay the merchant directly, the way you always do. Refunds for goods or services are handled directly between you and the merchant.",
    link: { label: "Customer Terms & Conditions", href: "/legal/customer-terms/#6-platform-nature-and-role" },
  },
  {
    // Customer T&C §8–9
    q: "Who gives the rewards?",
    a: "The merchant. Each merchant defines its own milestones and rewards, such as discounts, free services, complimentary add-ons or special benefits, and is responsible for fulfilling them.",
  },
  {
    // Customer T&C §9
    q: "Where can I redeem my rewards?",
    a: "Rewards are redeemable only with the specific merchant that issued them.",
    link: { label: "Customer Terms & Conditions, Section 9", href: "/legal/customer-terms/#9-reward-redemption" },
  },
  {
    // Customer Privacy Policy §3.1
    q: "What data do you collect?",
    a: "Only your name, your phone number and, if you choose to upload one, a profile photo.",
    link: { label: "Customer Privacy Policy", href: "/legal/customer-privacy/" },
  },
  {
    // Customer Privacy Policy §6.3
    q: "How do I delete my account and data?",
    a: "Send a request to support@puraskrit.com. After your request is verified, your data is deleted within 30 days, subject to any legal retention obligations.",
    link: { label: "Customer Privacy Policy, Right to Erasure", href: "/legal/customer-privacy/" },
  },
  {
    // Customer T&C §5
    q: "Is there a minimum age?",
    a: "Yes. You must be at least 18 years old to use Puraskrit.",
  },
  {
    q: "Is Puraskrit available on iOS?",
    a: "Coming soon. The Buyer App is launching on Google Play first.",
  },
];

export const PROHIBITED_BUSINESSES = [
  // Merchant ToU §7 (verbatim list)
  "Illegal substances or narcotics",
  "Gambling or wagering operations",
  "Adult entertainment or services",
  "Fraudulent financial services or investment schemes",
  "Any activity prohibited under applicable Indian law",
];

export const MERCHANT_FAQ: FAQ[] = [
  {
    // Merchant T&C §5
    q: "What do I need to join?",
    a: "Your business must be a validly registered business entity or proprietor under Indian law, with valid business licences and accurate business details. The authorised representative creating the account must be at least 18.",
    link: { label: "Merchant Terms & Conditions, Section 5", href: "/legal/merchant-terms/#5-eligibility" },
  },
  {
    // Context §4
    q: "Who pays for the rewards?",
    a: "You do. Rewards are defined and funded by the merchant, not by Puraskrit.",
  },
  {
    // Merchant ToU §10
    q: "Does Puraskrit process my customers' payments?",
    a: "No. Puraskrit does not process payments for merchant services. Your customers pay you directly, and refunds are handled between you and your customers.",
    link: { label: "Merchant Terms of Use, Section 10", href: "/legal/merchant-terms-of-use/#10-refund-policy-fair-service" },
  },
  {
    // Merchant T&C §11
    q: "What if I want to leave?",
    a: "Give at least 30 days' written notice to Puraskrit and all affected customers, and let customers redeem all outstanding earned milestones during the notice period.",
    link: { label: "Merchant Terms & Conditions, Section 11", href: "/legal/merchant-terms/#11-merchant-exit-or-closure" },
  },
  {
    // Merchant ToU §7
    q: "Which businesses are not allowed?",
    a: `Puraskrit can't be used for businesses involving: ${PROHIBITED_BUSINESSES.join("; ")}.`,
    link: { label: "Merchant Terms of Use, Section 7", href: "/legal/merchant-terms-of-use/#7-prohibited-businesses" },
  },
  {
    // Pricing hidden (context Rule 2)
    q: "How much does it cost?",
    a: "Contact us at support@puraskrit.com, or join as a merchant and we'll get in touch.",
    link: { label: "Join as merchant", href: "/merchants/join/" },
  },
];
