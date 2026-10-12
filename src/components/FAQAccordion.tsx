"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DURATION, EASE_OUT } from "@/config/motion";
import type { FAQ } from "@/content/faq";
import { Icon } from "./Icon";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const reduce = useReducedMotion();
  return (
    <div className="card divide-y divide-outline overflow-hidden">
      {items.map((f, i) => {
        const isOpen = open === i;
        const btn = `${base}-b${i}`;
        const panel = `${base}-p${i}`;
        return (
          <div key={f.q}>
            <h2>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-6 text-left font-headline text-headline-sm transition-colors hover:bg-surface md:px-7"
              >
                {f.q}
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-icon-bg text-primary transition-transform duration-[400ms] ease-out ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <Icon name="chevronDown" size={18} />
                </span>
              </button>
            </h2>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? DURATION.reduced : DURATION.fast, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 text-[18px] leading-[28px] text-muted md:px-7">
                    <p>{f.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
