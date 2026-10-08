"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE_OUT } from "@/config/motion";

/** Two-option switch between the customer (/) and merchant (/merchants) modules (context §4.1). */
export function AudienceToggle({ isMerchant, className = "" }: { isMerchant: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const options = [
    { label: "For Customers", href: "/", active: !isMerchant },
    { label: "For Merchants", href: "/merchants/", active: isMerchant },
  ];
  return (
    <nav aria-label="Choose audience" className={`relative rounded-full bg-tag p-1 ${className || "inline-flex"}`}>
      {options.map((o) => (
        <Link
          key={o.href}
          href={o.href}
          aria-current={o.active ? "page" : undefined}
          className={`relative z-10 inline-flex min-h-11 items-center rounded-full px-3.5 text-label-sm transition-colors duration-[400ms] sm:px-4 ${
            o.active ? "text-navy" : "text-muted hover:text-navy"
          }`}
        >
          {o.active && (
            <motion.span
              layoutId="audience-pill"
              transition={{ duration: reduce ? 0 : DURATION.fast, ease: EASE_OUT }}
              className="absolute inset-0 -z-10 rounded-full bg-card shadow-card ring-1 ring-outline"
            />
          )}
          {o.label}
        </Link>
      ))}
    </nav>
  );
}
