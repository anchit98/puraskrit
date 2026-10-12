"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { DURATION, EASE_OUT } from "@/config/motion";
import { useFinePointer } from "@/lib/hooks";
import { PhoneMockup } from "./PhoneMockup";

/**
 * Two Seller App offer screens stacked in 3D. They fan apart on hover (desktop) or tap (touch).
 * Both phones share one grid cell, so the container height comes from the phones themselves
 * (no fixed height), and horizontal padding covers the fanned-out extent so nothing clips.
 */
export function OfferFan() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [open, setOpen] = useState(false);
  const spread = open || !!reduce;
  const t = { duration: reduce ? 0 : DURATION.slow, ease: EASE_OUT };
  return (
    <button
      type="button"
      onMouseEnter={() => fine && setOpen(true)}
      onMouseLeave={() => fine && setOpen(false)}
      onClick={() => setOpen((v) => !v)}
      aria-label={open ? "Stack the offer screens" : "Fan out the offer screens"}
      aria-pressed={open}
      className="relative mx-auto block w-full max-w-[520px] cursor-pointer rounded-[28px] px-[22%] pb-10 pt-6 text-left"
    >
      <span aria-hidden className="pointer-events-none absolute inset-x-[18%] inset-y-[12%] rounded-full bg-primary-container/70 blur-3xl" />
      <span className="relative grid [grid-template-areas:'stack'] place-items-center" style={{ perspective: 1400 }}>
        <motion.span
          className="block w-full [grid-area:stack]"
          animate={{ x: spread ? "-30%" : "-10%", rotateY: spread ? 16 : 6, rotateZ: spread ? -5 : -2 }}
          transition={t}
          style={{ transformStyle: "preserve-3d" }}
        >
          <PhoneMockup screens={[{ shot: "sellerActiveOffers" }]} />
        </motion.span>
        <motion.span
          className="block w-full [grid-area:stack]"
          animate={{ x: spread ? "30%" : "10%", y: 16, rotateY: spread ? -16 : -6, rotateZ: spread ? 5 : 2 }}
          transition={t}
          style={{ transformStyle: "preserve-3d" }}
        >
          <PhoneMockup screens={[{ shot: "sellerOfferDetails" }]} />
        </motion.span>
      </span>
    </button>
  );
}
