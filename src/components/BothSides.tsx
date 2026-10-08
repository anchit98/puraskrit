"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { BOTH_SIDES, EXAMPLE_AMOUNT, type Beat } from "@/content/bothSides";
import { formatINR } from "@/content/loyalty";
import { DURATION, EASE_OUT, STAGGER } from "@/config/motion";
import { PhoneMockup, type ScreenItem } from "./PhoneMockup";
import { BuyerProgressScreen, BuyerQrScreen, SellerAmountScreen, SellerScanScreen } from "./screens/Screens";
import { Icon } from "./Icon";

/** What each phone shows at each beat. Customer phone left, merchant phone right. */
const LEFT_SCREENS: ScreenItem[] = [
  { node: <BuyerProgressScreen />, label: "Illustration: the customer's progress before the visit" },
  { node: <BuyerQrScreen />, label: "Illustration: the customer shows their QR" },
  { node: <BuyerQrScreen scanned />, label: "Illustration: the QR has been scanned" },
  { node: <BuyerProgressScreen after />, label: "Illustration: progress updated, Free haircut unlocked" },
];
const RIGHT_SCREENS: ScreenItem[] = [
  { node: <SellerScanScreen />, label: "Illustration: the Seller App scanner, ready" },
  { node: <SellerScanScreen state="scanning" />, label: "Illustration: the merchant scans the QR" },
  { node: <SellerAmountScreen />, label: "Illustration: the merchant enters the purchase amount" },
  { node: <SellerAmountScreen confirmed />, label: "Illustration: logged, progress updated" },
];

/**
 * Pinned and scroll-driven on large screens with motion allowed (CSS `pin:` variant);
 * paired cards everywhere else (phones, tablets, short screens, reduced motion).
 * Both layouts are in the markup and switched by CSS, so there is no layout shift on load.
 */
export function BothSides({
  audience = "customer",
  heading,
  detailed = false,
}: {
  audience?: "customer" | "merchant";
  heading: ReactNode;
  detailed?: boolean;
}) {
  const c = BOTH_SIDES[audience];
  return (
    <>
      <div className="hidden pin:block">
        <Pinned c={c} heading={heading} detailed={detailed} />
      </div>
      <div className="pin:hidden">
        <Cards c={c} heading={heading} detailed={detailed} />
      </div>
    </>
  );
}

type Content = (typeof BOTH_SIDES)["customer"];

function Pinned({ c, heading, detailed }: { c: Content; heading: ReactNode; detailed: boolean }) {
  const outer = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);
  const n = c.beats.length;
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setBeat(Math.min(n - 1, Math.max(0, Math.floor(p * n * 0.999)))));

  const jump = (i: number) => {
    const el = outer.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / n) * travel, behavior: "smooth" });
  };

  return (
    <div ref={outer} className="relative h-[230svh]">
      <div className="sticky top-[72px] flex h-[calc(100svh-72px)] items-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
          <div>
            {heading}
            <ol className="mt-8 space-y-2.5">
              {c.beats.map((b, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={beat === i ? "step" : undefined}
                    className={`grid w-full grid-cols-[44px_1fr_1fr] items-start gap-4 rounded-[20px] border p-4 text-left transition-[border-color,box-shadow,background-color] duration-[400ms] ease-out ${
                      beat === i ? "border-primary/30 bg-card shadow-[0_10px_30px_rgba(37,99,235,0.12)]" : "border-outline bg-card/60 hover:border-outline-variant"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-label-md transition-colors duration-[400ms] ${
                        beat >= i ? "bg-primary text-on-primary" : "bg-icon-bg text-primary"
                      }`}
                    >
                      {beat > i ? <Icon name="check" size={18} /> : i + 1}
                    </span>
                    <BeatText label={c.leftLabel} text={b.left} detail={detailed ? b.detail : undefined} />
                    <BeatText label={c.rightLabel} text={b.right} />
                  </button>
                </li>
              ))}
            </ol>
            <Footnote text={c.footnote} />
          </div>
          <Stage beat={beat} c={c} />
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Step {beat + 1} of {n}: {c.beats[beat].left} {c.beats[beat].right}
      </p>
    </div>
  );
}

function BeatText({ label, text, detail }: { label: string; text: string; detail?: string }) {
  return (
    <span className="block">
      <span className="text-overline block text-muted">{label}</span>
      <span className="mt-0.5 block text-title-md leading-snug">{text}</span>
      {detail && <span className="mt-1 block text-body-sm text-muted">{detail}</span>}
    </span>
  );
}

function Footnote({ text }: { text: string }) {
  return (
    <p className="mt-6 flex items-start gap-2 rounded-2xl bg-icon-bg px-4 py-3 text-body-md text-on-primary-container">
      <Icon name="shield" size={18} className="mt-0.5 shrink-0" />
      {text}
    </p>
  );
}

/** Two phones facing each other, with a soft scan beam between them at the scan beat. */
function Stage({ beat, c }: { beat: number; c: Content }) {
  const turn = beat === 1 || beat === 2 ? 14 : 8;
  return (
    <div className="relative px-4 pb-16 pt-6" aria-hidden>
      <div aria-hidden className="pointer-events-none absolute inset-x-[10%] inset-y-[14%] rounded-full bg-primary-container/60 blur-3xl" />
      <div className="relative grid grid-cols-2 items-center gap-8">
        <div className="relative" style={{ perspective: 1200 }}>
          <p className="text-overline mb-3 text-center text-muted">{c.leftLabel}</p>
          <div className="transition-transform duration-700" style={{ transform: `rotateY(${turn}deg)`, transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}>
            <PhoneMockup screens={LEFT_SCREENS} active={beat} className="max-w-[220px]" lazy />
          </div>
        </div>
        <div className="relative" style={{ perspective: 1200 }}>
          <p className="text-overline mb-3 text-center text-muted">{c.rightLabel}</p>
          <div className="transition-transform duration-700" style={{ transform: `rotateY(${-turn}deg)`, transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}>
            <PhoneMockup screens={RIGHT_SCREENS} active={beat} className="max-w-[220px]" lazy />
          </div>
        </div>
        {/* Scan beam */}
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 h-[3px] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-opacity duration-500"
          style={{ opacity: beat === 1 ? 0.8 : 0, boxShadow: "0 0 18px 6px rgba(37,99,235,0.25)" }}
        />
        {/* Payment chip */}
        <span
          className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-outline bg-card px-3.5 py-1.5 text-label-sm text-navy shadow-card transition-opacity duration-500"
          style={{ opacity: beat === 0 ? 1 : 0 }}
        >
          Example · {formatINR(EXAMPLE_AMOUNT)} paid the usual way
        </span>
      </div>
    </div>
  );
}

function Cards({ c, heading, detailed }: { c: Content; heading: ReactNode; detailed: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div>
      {heading}
      <ol className="mt-8 space-y-4">
        {c.beats.map((b, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: reduce ? DURATION.reduced : DURATION.slow, ease: EASE_OUT, delay: reduce ? 0 : STAGGER }}
            className="card p-4 sm:p-5"
          >
            <p className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-label-sm text-on-primary">{i + 1}</span>
              <span className="text-overline text-muted">Step {i + 1}</span>
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-5">
              <CardSide label={c.leftLabel} text={b.left} detail={detailed ? b.detail : undefined} screen={LEFT_SCREENS[i]} />
              <CardSide label={c.rightLabel} text={b.right} screen={RIGHT_SCREENS[i]} />
            </div>
          </motion.li>
        ))}
      </ol>
      <Footnote text={c.footnote} />
    </div>
  );
}

function CardSide({ label, text, detail, screen }: { label: string; text: string; detail?: string; screen: ScreenItem }) {
  return (
    <div className="flex flex-col">
      <p className="text-overline text-muted">{label}</p>
      <p className="mt-1 text-body-md font-semibold text-navy sm:text-title-md">{text}</p>
      {detail && <p className="mt-1 text-body-sm text-muted">{detail}</p>}
      <div className="mt-3 px-1 pb-2">
        <PhoneMockup screens={[screen]} className="max-w-[170px]" lazy />
      </div>
    </div>
  );
}

export type { Beat };
