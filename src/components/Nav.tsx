"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SELLER_APP_LINKS } from "@/config/app";
import { audienceForPath } from "@/content/site";
import { Logo, MerchantLogo } from "./Logo";
import { StoreBadges } from "./StoreBadges";
import { buttonClass } from "./Button";

/**
 * Header: logo + download only. No navigation links (all links live in the footer).
 * Merchant page: Puraskrit Merchants logo + Seller App badge + "Get in touch".
 */
export function Nav() {
  const pathname = usePathname() || "/";
  const merchant = audienceForPath(pathname) === "merchant";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,border-color] duration-[400ms] ${
        scrolled ? "border-b border-outline bg-surface/95 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <a href="#main" className="sr-only-focusable absolute left-4 top-3 z-50 rounded-full bg-primary px-4 py-2 text-label-md text-on-primary">
        Skip to content
      </a>
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        {merchant ? <MerchantLogo height={40} /> : <Logo height={32} />}
        {merchant ? (
          <div className="flex items-center gap-3">
            <StoreBadges height={40} playUrl={SELLER_APP_LINKS.playStoreUrl} showIOS={false} className="hidden sm:flex" />
            <Link href="#contact" className={`${buttonClass("primary")} !h-11 whitespace-nowrap !px-5 !text-label-md`}>
              Get in touch
            </Link>
          </div>
        ) : (
          <>
            <StoreBadges height={40} className="hidden sm:flex" />
            <StoreBadges height={40} showIOS={false} className="sm:hidden" />
          </>
        )}
      </div>
    </header>
  );
}
