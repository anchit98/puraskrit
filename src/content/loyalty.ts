/**
 * Loyalty and category data. The milestones are illustrative (used by the reward journey demo).
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
