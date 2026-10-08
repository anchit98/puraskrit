"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE_OUT } from "@/config/motion";

/** "About 10–20 seconds" ring. Fills once when it scrolls into view (no loop). */
export function StaffTimer() {
  const reduce = useReducedMotion();
  const c = 264;
  return (
    <div aria-hidden className="relative h-24 w-24">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#DBEAFE" strokeWidth="8" />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#2563EB"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduce ? c * 0.3 : c }}
          whileInView={{ strokeDashoffset: c * 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : DURATION.slow * 2, ease: EASE_OUT }}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-headline text-[20px] font-extrabold text-navy">10–20</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted">sec</span>
      </span>
    </div>
  );
}
