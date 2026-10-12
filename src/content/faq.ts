/**
 * Customer FAQ: plain one-sentence answers, no links to legal documents.
 * Facts come from the source documents (cited in comments only).
 */

export type FAQ = { q: string; a: string };

export const CUSTOMER_FAQ: FAQ[] = [
  // Context §4
  { q: "What does Puraskrit cost?", a: "Nothing. Puraskrit costs you nothing." },
  // Customer T&C §6
  { q: "Do I pay through Puraskrit?", a: "No. You pay the shop directly, the way you always do." },
  // Customer T&C §8–9
  { q: "Who gives the rewards?", a: "The shop you visit. Each one sets its own rewards." },
  // Customer T&C §9
  { q: "Where do I redeem a reward?", a: "At the shop that gave it to you, once it's unlocked." },
  // Customer Privacy Policy §3.1
  { q: "What do you need from me?", a: "Just your name and phone number. A photo only if you want." },
  // Customer Privacy Policy §6.3
  { q: "Can I delete my account?", a: "Yes, any time. Write to support@puraskrit.com." },
  // Customer T&C §5
  { q: "Is there an age limit?", a: "Yes. You need to be 18 or older." },
  // Context §1
  { q: "Is Puraskrit on iPhone?", a: "Coming soon. It's on Google Play now." },
];
