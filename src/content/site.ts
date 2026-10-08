/** Navigation and footer content (context file §4.1, §6.1 footer). */

export type NavLink = { label: string; href: string };

export const NAV = {
  customers: {
    links: [
      { label: "How it works", href: "/how-it-works/" },
      { label: "Rewards", href: "/rewards/" },
      { label: "Discover", href: "/discover/" },
      { label: "FAQ", href: "/faq/" },
    ] as NavLink[],
    cta: { label: "Get the app", href: "/#download" },
  },
  merchants: {
    links: [
      { label: "How it works", href: "/merchants/how-it-works/" },
      { label: "Loyalty programmes", href: "/merchants/loyalty/" },
      { label: "Offers", href: "/merchants/offers/" },
      { label: "FAQ", href: "/merchants/faq/" },
    ] as NavLink[],
    cta: { label: "Join as merchant", href: "/merchants/join/" },
  },
};

export const LEGAL_LINKS: NavLink[] = [
  { label: "Customer Terms & Conditions", href: "/legal/customer-terms/" },
  { label: "Customer Privacy Policy", href: "/legal/customer-privacy/" },
  { label: "Customer Terms of Use", href: "/legal/customer-terms-of-use/" },
  { label: "Merchant Terms & Conditions", href: "/legal/merchant-terms/" },
  { label: "Merchant Privacy Policy", href: "/legal/merchant-privacy/" },
  { label: "Merchant Terms of Use", href: "/legal/merchant-terms-of-use/" },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Customers",
    links: [
      { label: "Get the app", href: "/#download" },
      ...NAV.customers.links,
    ],
  },
  {
    title: "Merchants",
    links: [
      { label: "For merchants", href: "/merchants/" },
      ...NAV.merchants.links,
      { label: "Join as merchant", href: "/merchants/join/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
];
