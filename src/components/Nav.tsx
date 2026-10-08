"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV } from "@/content/site";
import { AudienceToggle } from "./AudienceToggle";
import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { buttonClass } from "./Button";
import { DURATION, EASE_OUT } from "@/config/motion";

export function Nav() {
  const pathname = usePathname() || "/";
  const isMerchant = pathname.startsWith("/merchants");
  const mod = isMerchant ? NAV.merchants : NAV.customers;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // On the home page "Get the app" scrolls to the download block; elsewhere it links to it.
  const ctaHref = !isMerchant && pathname === "/" ? "#download" : mod.cta.href;
  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, "");

  return (
    <header
      className={`sticky top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,border-color] duration-[400ms] ${
        scrolled || open ? "bg-surface/95 backdrop-blur-xl border-b border-outline" : "bg-transparent border-b border-transparent"
      }`}
    >
      <a href="#main" className="sr-only-focusable absolute left-4 top-3 z-50 rounded-full bg-primary px-4 py-2 text-label-md text-on-primary">
        Skip to content
      </a>
      <div className="container-page flex h-[72px] items-center gap-4">
        <Logo height={30} />
        <AudienceToggle isMerchant={isMerchant} className="ml-2 hidden md:inline-flex" />

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {mod.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full px-3.5 text-label-md transition-colors duration-[400ms] ${
                    isActive(l.href) ? "text-primary bg-icon-bg" : "text-navy hover:text-primary"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden sm:block lg:ml-2">
          <Link href={ctaHref} className={`${buttonClass("primary")} !h-11 whitespace-nowrap !px-5 !text-label-md`}>
            {mod.cta.label}
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-card text-navy ring-1 ring-outline sm:ml-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={20} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE_OUT }}
            className="overflow-hidden lg:hidden"
          >
            <div className="container-page pb-6 pt-2">
              <AudienceToggle isMerchant={isMerchant} className="mb-4 inline-flex md:hidden" />
              <ul className="flex flex-col">
                {mod.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className="flex items-center justify-between border-b border-outline py-3.5 text-title-md"
                    >
                      {l.label}
                      <Icon name="arrowRight" size={18} className="text-muted" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={ctaHref} onClick={() => setOpen(false)} className={`${buttonClass("primary")} mt-5 w-full`}>
                {mod.cta.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
