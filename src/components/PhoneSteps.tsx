"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { DURATION, EASE_OUT } from "@/config/motion";
import { PhoneMockup, type ScreenItem } from "./PhoneMockup";
import { StepList, type Step } from "./StepList";

/**
 * Steps with a phone whose screen follows the active step.
 * Large screens with motion allowed: pinned, scroll-driven, steps are clickable.
 * Everywhere else: each step is a card with its own screen. No autoplay anywhere.
 */
export function PhoneSteps({ steps, screens }: { steps: Step[]; screens: ScreenItem[] }) {
  return (
    <>
      <div className="hidden pin:block">
        <Pinned steps={steps} screens={screens} />
      </div>
      <div className="pin:hidden">
        <Cards steps={steps} screens={screens} />
      </div>
    </>
  );
}

function Pinned({ steps, screens }: { steps: Step[]; screens: ScreenItem[] }) {
  const outer = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const n = steps.length;
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setStep(Math.min(n - 1, Math.max(0, Math.floor(p * n * 0.999)))));
  const select = (i: number) => {
    const el = outer.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    window.scrollTo({ top: top + ((i + 0.5) / n) * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  };
  return (
    <div ref={outer} className="relative h-[220svh]">
      <div className="sticky top-[72px] flex h-[calc(100svh-72px)] items-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">
          <StepList steps={steps} active={step} onSelect={select} />
          <div className="relative px-6 pb-10 pt-4" style={{ perspective: 1200 }}>
            <div aria-hidden className="pointer-events-none absolute inset-x-[16%] inset-y-[10%] rounded-full bg-primary-container/60 blur-3xl" />
            <div className="relative transition-transform duration-700" style={{ transform: `rotateY(${-6 + step * 4}deg) rotateX(3deg)`, transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}>
              <PhoneMockup screens={screens} active={step} className="max-w-[250px]" lazy />
            </div>
            <p className="sr-only" aria-live="polite">
              Step {step + 1} of {n}: {steps[step].title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cards({ steps, screens }: { steps: Step[]; screens: ScreenItem[] }) {
  const reduce = useReducedMotion();
  return (
    <ol className="space-y-4">
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: reduce ? DURATION.reduced : DURATION.slow, ease: EASE_OUT }}
          className="card grid grid-cols-[1fr_120px] items-center gap-4 p-4 sm:grid-cols-[1fr_160px] sm:p-5"
        >
          <div>
            <p className="text-overline text-muted">Step {i + 1}</p>
            <p className="mt-1 text-title-md">{s.title}</p>
            {s.body && <p className="mt-1 text-body-md text-muted">{s.body}</p>}
          </div>
          <div className="pb-2">
            <PhoneMockup screens={[screens[i]]} lazy />
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
