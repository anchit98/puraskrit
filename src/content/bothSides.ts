/**
 * "How it works, for both": the same QR moment from the customer's side and the merchant's side.
 * Source: Context §2.3 (transaction flow) and §30 (staff learn it in about 10–20 seconds).
 * Customer-side lines 1, 2 and 4 are the Context §6.1 steps, word for word.
 */

export type Beat = { left: string; right: string; detail?: string };

export const BOTH_SIDES = {
  customer: {
    overline: "How it works, for both",
    title: "One scan, two sides.",
    body: "The same moment at the counter, from your side and the merchant's.",
    leftLabel: "You",
    rightLabel: "The merchant",
    beats: [
      {
        left: "Pay the merchant as you normally do.",
        right: "Takes payment the usual way.",
        detail: "Pay the way you always do. Puraskrit stays out of the payment.",
      },
      {
        left: "Open Puraskrit and show your QR.",
        right: "Scans your QR in the Seller App.",
        detail: "Your personal QR is in the Buyer App, ready at the counter.",
      },
      {
        left: "The merchant scans it and enters your purchase amount.",
        right: "Enters the amount and confirms.",
        detail: "The merchant uses the Seller App to confirm the amount.",
      },
      {
        left: "Your progress updates and you see how close you are to your next reward.",
        right: "Done. Simple enough to learn in about 10–20 seconds.",
        detail: "The visit is logged and your progress along the milestones moves forward.",
      },
    ] as Beat[],
    footnote: "Puraskrit doesn't process payments. You pay the merchant directly, as usual.",
  },
  merchant: {
    overline: "How it works, for both",
    title: "One scan, two sides.",
    body: "The same moment at your counter, from your customer's side and yours.",
    leftLabel: "Your customer",
    rightLabel: "You",
    beats: [
      { left: "Pays you the usual way.", right: "Take payment as normal." },
      { left: "Shows their Puraskrit QR.", right: "Scan it in the Seller App." },
      { left: "Sees the amount added.", right: "Enter the amount and confirm." },
      { left: "Sees their progress and next reward.", right: "Done. Simple enough to learn in about 10–20 seconds." },
    ] as Beat[],
    footnote: "Puraskrit doesn't process payments. Your customers pay you directly.",
  },
};

/** Illustrative amount used in the scene, always labelled "Example". */
export const EXAMPLE_AMOUNT = 1200;
