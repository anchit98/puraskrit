/**
 * Loyalty, offer and category data. Illustrative only, always shown with an "Example" label.
 * Source: context file §2.2 (milestones), §6.4 (offer example), §2.7 (categories).
 * Language rule: cumulative milestones always read "Unlocks at ₹X".
 */

export type Milestone = { label: string; reward: string; unlocksAt: number };

export const EXAMPLE_MILESTONES: Milestone[] = [
  { label: "Milestone 1", reward: "Free haircut", unlocksAt: 10000 },
  { label: "Milestone 2", reward: "Free hair spa", unlocksAt: 20000 },
  { label: "Milestone 3", reward: "Free haircut + head massage + foot massage", unlocksAt: 50000 },
  { label: "Milestone 4", reward: "Free body spa", unlocksAt: 75000 },
];

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export const unlocksAt = (n: number) => `Unlocks at ${formatINR(n)}`;

// Context §2.2. Reworded from Context §6.1 to avoid "spend" (finishing-pass copy rules).
export const CUMULATIVE_LINE = "Milestones are cumulative. ₹20,000 means your running total with that merchant reaches ₹20,000.";
export const CUMULATIVE_LINE_MERCHANT = "Milestones are cumulative. ₹20,000 means a customer's running total with you reaches ₹20,000.";

export type OfferType = "flat" | "prepaid" | "combo";

export const OFFER_TYPES: { type: OfferType; name: string; body: string }[] = [
  {
    type: "flat",
    name: "Flat Discount",
    body: "A straight discount on selected services.",
  },
  {
    type: "prepaid",
    name: "Prepaid Subscription",
    body: "Customers pay upfront for a set of services.",
  },
  {
    type: "combo",
    name: "Combo Package",
    body: "Several services bundled into one package.",
  },
];

/** Context §6.4 example. TODO(founder): confirm 30% vs 25% (₹4,000 → ₹3,000 is 25%), see §8.5 item 3. */
export const EXAMPLE_OFFER = {
  name: "Annual Wellness Subscription",
  type: "prepaid" as OfferType,
  services: "12 services",
  discount: "30% OFF",
  originalPrice: 4000,
  finalPrice: 3000,
  validity: "Valid till 30 Nov",
};

export const OFFER_FIELDS = [
  "Offer name",
  "Offer type",
  "Services included",
  "Discount",
  "Original price",
  "Final price",
  "Validity",
];

export const PRIMARY_CATEGORIES = ["Salons", "Car washes / car spas", "Spas"];

export const OTHER_CATEGORIES = [
  "Restaurants",
  "Cafés",
  "Bakeries",
  "Ice cream shops",
  "Mechanics",
  "Dry cleaners",
  "Garment & shoe stores",
  "Stationery",
  "Gift shops",
  "Flower shops",
  "Cosmetics",
  "Jewellery",
  "Book shops",
  "Pharmacies",
  "Society shops",
  "Supermarkets",
  "Pet stores",
  "Entertainment & sports venues",
];

export const ALL_CATEGORIES = [...PRIMARY_CATEGORIES, ...OTHER_CATEGORIES, "Other offline service and retail businesses"];
