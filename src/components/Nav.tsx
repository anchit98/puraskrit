"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header
      className="relative z-50 border-b border-transparent bg-transparent pt-[env(safe-area-inset-top)]"
    >
      <a href="#main" className="sr-only-focusable absolute left-4 top-3 z-50 rounded-full bg-primary px-4 py-2 text-label-md text-on-primary">
        Skip to content
      </a>
      <div className="container-page flex h-[84px] items-center justify-center gap-4 sm:justify-between">
        {merchant ? <MerchantLogo height={48} imgClassName="max-sm:!h-[50px]" /> : <Logo height={40} imgClassName="max-sm:!h-[46px]" />}
        {merchant ? (
          <div className="hidden items-center gap-3 sm:flex">
            <StoreBadges height={40} playUrl={SELLER_APP_LINKS.playStoreUrl} showIOS={false} />
            <Link href="#contact" className={`${buttonClass("primary")} !h-11 whitespace-nowrap !px-5 !text-label-md`}>
              Get in touch
            </Link>
          </div>
        ) : (
          <>
            <StoreBadges height={40} className="hidden sm:flex" />
          </>
        )}
      </div>
    </header>
  );
}
