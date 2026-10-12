"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE_OUT } from "@/config/motion";
import { OTHER_CATEGORIES, PRIMARY_CATEGORIES } from "@/content/loyalty";

/** Category chips: primary focus first, then the wider list, ending with "and more". */
export function CategoryChips({ limit = 7 }: { limit?: number }) {
  const reduce = useReducedMotion();
  const all = [...PRIMARY_CATEGORIES.map((c) => ({ c, primary: true })), ...OTHER_CATEGORIES.slice(0, limit).map((c) => ({ c, primary: false }))];
  return (
    <ul className="flex flex-wrap gap-2.5" aria-label="Business categories">
      {all.map(({ c, primary }, i) => (
        <motion.li
          key={c}
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: reduce ? 0 : i * 0.025, duration: reduce ? DURATION.reduced : DURATION.base, ease: EASE_OUT }}
          className={`rounded-full px-5 py-2.5 text-label-lg ${
            primary ? "bg-primary text-on-primary shadow-[0_6px_18px_rgba(37,99,235,0.25)]" : "bg-card text-navy ring-1 ring-outline"
          }`}
        >
          {c}
        </motion.li>
      ))}
      <li className="rounded-full bg-tag px-5 py-2.5 text-label-lg text-navy">and more</li>
    </ul>
  );
}
