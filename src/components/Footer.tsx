"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FOOTER, LEGAL_LINKS, audienceForPath, type NavLink } from "@/content/site";
import { SITE } from "@/config/app";
import { Logo, MerchantLogo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

/**
 * Zomato-style column footer. All site links live here.
 * Customer pages: "Partner with us" (the only link to the merchant page) and the 3 customer legal docs.
 * Merchant pages: "Get the app" and the 3 merchant legal docs.
 */
export function Footer() {
  const merchant = audienceForPath(usePathname() || "/") === "merchant";
  const audience = merchant ? "merchant" : "customer";
  const other = merchant ? FOOTER.forCustomers : FOOTER.forMerchants;
  const columns: { title: string; links: NavLink[] }[] = [
    { title: "Puraskrit", links: FOOTER.company },
    { title: other.title, links: other.links },
    { title: "Legal", links: LEGAL_LINKS[audience] },
  ];
  return (
    <footer className="border-t border-outline bg-card pb-[env(safe-area-inset-bottom)]">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          {merchant ? <MerchantLogo height={40} /> : <Logo height={30} />}
          <p className="font-headline text-headline-sm text-navy">{FOOTER.tagline[audience]}</p>
          <p className="text-body-md">
            <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
              {SITE.email}
            </a>
          </p>
          <SocialLinks />
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-overline mb-4 text-muted">{col.title}</h2>
            <ul className="md:space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center text-body-md text-navy transition-colors duration-[400ms] hover:text-primary md:min-h-0"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-outline">
        <div className="container-page flex flex-col gap-2 py-6 text-body-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE.company}</p>
          {/* Registered company address (not a statement of where the app is available). */}
          <p>{SITE.location}</p>
        </div>
      </div>
    </footer>
  );
}
