/**
 * Footer and legal-link content. The header has no links: logo + download only.
 * The merchant page is reachable only from the footer ("Partner with us").
 */

export type NavLink = { label: string; href: string };
export type Audience = "customer" | "merchant";

/** Merchant audience: the merchant page and the three merchant legal documents. */
export const audienceForPath = (path: string): Audience =>
  path.startsWith("/merchants") || path.startsWith("/legal/merchant-") ? "merchant" : "customer";

/** Three legal documents per audience, with short titles. Document text stays verbatim. */
export const LEGAL_LINKS: Record<Audience, NavLink[]> = {
  customer: [
    { label: "Terms of Use", href: "/legal/customer-terms-of-use/" },
    { label: "Privacy Policy", href: "/legal/customer-privacy/" },
    { label: "Terms and Conditions", href: "/legal/customer-terms/" },
  ],
  merchant: [
    { label: "Terms of Use", href: "/legal/merchant-terms-of-use/" },
    { label: "Privacy Policy", href: "/legal/merchant-privacy/" },
    { label: "Terms and Conditions", href: "/legal/merchant-terms/" },
  ],
};

export const FOOTER = {
  company: [
    { label: "About", href: "/about/" },
    { label: "FAQ", href: "/faq/" },
  ] as NavLink[],
  /** The only merchant entry points on the whole site (like Zomato's "For Restaurants"). */
  forMerchants: {
    title: "For merchants",
    links: [
      { label: "Partner with us", href: "/merchants/" },
      { label: "Contact", href: "/merchants/#contact" },
    ] as NavLink[],
  },
  /** Shown on merchant pages instead. */
  forCustomers: { title: "For customers", links: [{ label: "Get the app", href: "/#download" }] as NavLink[] },
  tagline: { customer: "Your loyalty, rewarded.", merchant: "Bring your regulars back." },
};
