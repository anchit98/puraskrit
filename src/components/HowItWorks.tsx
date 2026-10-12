"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { HOW_IT_WORKS as C } from "@/content/howItWorks";
import { DURATION, EASE_OUT, STAGGER } from "@/config/motion";
import { EXAMPLE_MILESTONES, unlocksAt } from "@/content/loyalty";
import { GiftBox } from "./GiftBox";
import { Icon } from "./Icon";

/**
 * How it works, from the customer's side: four beats, each with its own animated illustration
 * (no app screens). Pinned and scroll-driven on large screens with motion allowed (CSS `pin:`
 * variant); stacked cards elsewhere, each illustration playing as it scrolls into view.
 */
export type StepsContent = { title: string; beats: { title: string; line: string }[] };

export function HowItWorks({
  headingId = "how-title",
  content = C,
  variant = "customer",
}: {
  headingId?: string;
  content?: StepsContent;
  variant?: "customer" | "merchant";
}) {
  const heading = (
    <h2 id={headingId} className="text-display">
      {content.title}
    </h2>
  );
  return (
    <>
      <div className="hidden pin:block">
        <Pinned heading={heading} c={content} variant={variant} />
      </div>
      <div className="pin:hidden">
        <Cards heading={heading} c={content} variant={variant} />
      </div>
    </>
  );
}

type Variant = "customer" | "merchant";

function Pinned({ heading, c, variant }: { heading: React.ReactNode; c: StepsContent; variant: Variant }) {
  const outer = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);
  const n = c.beats.length;
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setBeat(Math.min(n - 1, Math.max(0, Math.floor(p * n * 0.999)))));
  const jump = (i: number) => {
    const el = outer.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    window.scrollTo({ top: top + ((i + 0.5) / n) * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  };
  return (
    <div ref={outer} className="relative h-[230svh]">
      <div className="sticky top-[72px] flex h-[calc(100svh-72px)] items-center">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            {heading}
            <ol className="mt-10 space-y-3">
              {c.beats.map((b, i) => (
                <li key={b.title}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={beat === i ? "step" : undefined}
                    className={`flex w-full items-start gap-5 rounded-[20px] border px-5 py-4 text-left transition-[border-color,box-shadow,background-color,opacity] duration-[400ms] ease-out ${
                      beat === i ? "border-primary/30 bg-card shadow-[0_10px_30px_rgba(37,99,235,0.12)]" : "border-transparent opacity-55 hover:opacity-100"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-label-md transition-colors duration-[400ms] ${
                        beat >= i ? "bg-primary text-on-primary" : "bg-icon-bg text-primary"
                      }`}
                    >
                      {beat > i ? <Icon name="check" size={18} /> : i + 1}
                    </span>
                    <span>
                      <span className="block font-headline text-headline-md">{b.title}</span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-[400ms] ease-out ${beat === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-1 text-body-lg text-muted">{b.line}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[460px]">
            <div aria-hidden className="pointer-events-none absolute inset-[8%] rounded-full bg-primary-container/60 blur-3xl" />
            <div className="card relative h-full w-full rounded-[32px]">
              {c.beats.map((b, i) => (
                <div
                  key={b.title}
                  className="absolute inset-0 transition-opacity duration-[550ms] ease-out"
                  style={{ opacity: beat === i ? 1 : 0 }}
                  aria-hidden
                >
                  <Illustration beat={i} play={beat === i} variant={variant} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Step {beat + 1} of {n}: {c.beats[beat].title}
      </p>
    </div>
  );
}

function Cards({ heading, c, variant }: { heading: React.ReactNode; c: StepsContent; variant: Variant }) {
  const reduce = useReducedMotion();
  return (
    <div>
      {heading}
      <ol className="mt-8 space-y-4">
        {c.beats.map((b, i) => (
          <motion.li
            key={b.title}
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: reduce ? DURATION.reduced : DURATION.slow, ease: EASE_OUT, delay: reduce ? 0 : STAGGER }}
            className="card grid grid-cols-[1fr_120px] items-center gap-4 p-5 sm:grid-cols-[1fr_180px]"
          >
            <div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-label-md text-on-primary">{i + 1}</span>
              <p className="mt-3 font-headline text-headline-sm">{b.title}</p>
              <p className="mt-1 text-body-md text-muted">{b.line}</p>
            </div>
            <CardIllustration beat={i} variant={variant} />
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function CardIllustration({ beat, variant }: { beat: number; variant: Variant }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [scale, setScale] = useState(0.35);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The artwork is drawn on a 340 px canvas (plus room for its labels) and scaled to fit the card.
    const ro = new ResizeObserver(([e]) => setScale((e.contentRect.width * 0.86) / 400));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-surface" aria-hidden>
      <Illustration beat={beat} play={inView} scale={scale} variant={variant} />
    </div>
  );
}

/** One animated illustration per beat. `play` restarts it each time the beat becomes active. */
function Illustration({ beat, play, scale = 1, variant = "customer" }: { beat: number; play: boolean; scale?: number; variant?: Variant }) {
  const reduce = useReducedMotion();
  const k = play ? "on" : "off";
  const t = (delay = 0, duration: number = DURATION.slow) => ({ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: EASE_OUT });
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div style={{ transform: `scale(${scale})` }} className="relative flex h-[340px] w-[340px] shrink-0 items-center justify-center">
        {variant === "merchant" && beat === 0 && <LadderIllustration key={k} play={play} reduce={!!reduce} />}
        {variant === "merchant" && beat === 2 && <ScanAmountIllustration key={k} play={play} reduce={!!reduce} />}
        {variant === "merchant" && beat === 3 && <ComeBackIllustration key={k} play={play} reduce={!!reduce} />}

        {variant === "customer" && beat === 0 && (
          <motion.div key={k} className="relative flex items-center justify-center">
            {[0, 1].map((r) => (
              <motion.span
                key={r}
                className="absolute rounded-full border-2 border-primary/25"
                initial={{ width: 150, height: 150, opacity: 0 }}
                animate={play ? { width: 300 - r * 60, height: 300 - r * 60, opacity: [0, 0.8, 0] } : {}}
                transition={t(0.2 + r * 0.25, 1.4)}
              />
            ))}
            <motion.span
              className="flex h-40 w-40 items-center justify-center rounded-full bg-icon-bg text-primary"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={play ? { scale: 1, opacity: 1 } : {}}
              transition={t(0)}
            >
              <Icon name="wallet" size={72} strokeWidth={1.4} />
            </motion.span>
            <motion.span
              className="absolute -bottom-6 right-[-34px] flex items-center gap-2 rounded-full bg-card px-4 py-2 text-label-lg text-navy shadow-[0_14px_30px_rgba(26,43,74,0.14)]"
              initial={{ opacity: 0, y: 14 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={t(0.55)}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-green text-white">
                <Icon name="check" size={14} />
              </span>
              Paid
            </motion.span>
          </motion.div>
        )}

        {variant === "merchant" && beat === 1 && <BroadcastIllustration key={k} play={play} reduce={!!reduce} />}

        {variant === "customer" && beat === 1 && (
          <motion.div key={k} className="relative" initial={{ rotateY: -18, opacity: 0 }} animate={play ? { rotateY: 0, opacity: 1 } : {}} transition={t(0)} style={{ transformPerspective: 800 }}>
            <div className="relative h-56 w-56 rounded-[28px] border border-outline bg-card p-5 shadow-[0_20px_50px_rgba(26,43,74,0.14)]">
              <QrPattern />
              <motion.span
                className="absolute inset-x-5 top-5 h-[3px] rounded-full bg-primary"
                style={{ boxShadow: "0 0 16px 4px rgba(37,99,235,0.35)" }}
                initial={{ y: 0, opacity: 0 }}
                animate={play ? { y: [0, 176, 0], opacity: [0, 1, 1, 0] } : {}}
                transition={{ duration: reduce ? 0 : 1.8, delay: reduce ? 0 : 0.5, ease: "easeInOut" }}
              />
            </div>
            {["-left-3 -top-3 border-l-4 border-t-4 rounded-tl-xl", "-right-3 -top-3 border-r-4 border-t-4 rounded-tr-xl", "-left-3 -bottom-3 border-l-4 border-b-4 rounded-bl-xl", "-right-3 -bottom-3 border-r-4 border-b-4 rounded-br-xl"].map((c) => (
              <span key={c} className={`absolute h-10 w-10 border-primary ${c}`} />
            ))}
          </motion.div>
        )}

        {variant === "customer" && beat === 2 && <ProgressIllustration key={k} play={play} reduce={!!reduce} />}

        {variant === "customer" && beat === 3 && (
          <motion.div key={k} className="relative flex flex-col items-center" initial={{ opacity: 0 }} animate={play ? { opacity: 1 } : {}} transition={t(0, DURATION.base)}>
            <GiftBox size={130} unlocked={play} animate={!reduce} />
            <motion.span
              className="relative z-10 -mt-2 flex items-center gap-2 rounded-full bg-card px-4 py-2 text-label-lg text-navy shadow-[0_14px_30px_rgba(26,43,74,0.14)]"
              initial={{ opacity: 0, y: 12 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={t(0.6)}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-accent-green" /> Unlocked
            </motion.span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ProgressIllustration({ play, reduce }: { play: boolean; reduce: boolean }) {
  const r = 110;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative flex items-center justify-center">
      <svg width="270" height="270" viewBox="0 0 270 270" className="-rotate-90">
        <circle cx="135" cy="135" r={r} fill="none" stroke="#DBEAFE" strokeWidth="22" />
        <motion.circle
          cx="135"
          cy="135"
          r={r}
          fill="none"
          stroke="#2563EB"
          strokeWidth="22"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c * 0.72 }}
          animate={play ? { strokeDashoffset: c * 0.4 } : {}}
          transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : 0.3, ease: EASE_OUT }}
        />
      </svg>
      <span className="absolute flex flex-col items-center">
        <Icon name="gift" size={56} strokeWidth={1.4} className="text-primary" />
        <motion.span
          className="mt-2 rounded-full bg-primary px-3 py-1 text-label-md text-on-primary"
          initial={{ opacity: 0, y: 8 }}
          animate={play ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 1.2, ease: EASE_OUT }}
        >
          +1 visit
        </motion.span>
      </span>
    </div>
  );
}

/** Decorative QR-style pattern (an illustration, not a scannable code). */
function QrPattern() {
  const n = 21;
  const cells: [number, number][] = [];
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!inFinder(x, y) && rnd() > 0.52) cells.push([x, y]);
  const finder = (ox: number, oy: number) => (
    <g key={`${ox}-${oy}`}>
      <rect x={ox} y={oy} width={7} height={7} fill="#1A2B4A" />
      <rect x={ox + 1} y={oy + 1} width={5} height={5} fill="#FFFFFF" />
      <rect x={ox + 2} y={oy + 2} width={3} height={3} fill="#1A2B4A" />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} className="h-full w-full" shapeRendering="crispEdges">
      <rect x={-1} y={-1} width={n + 2} height={n + 2} fill="#FFFFFF" />
      {cells.map(([x, y]) => (
        <rect key={`${x}.${y}`} x={x} y={y} width={1} height={1} fill="#1A2B4A" />
      ))}
      {finder(0, 0)}
      {finder(n - 7, 0)}
      {finder(0, n - 7)}
    </svg>
  );
}

/** Merchant step 1: rewards stacking up as milestones. */
function LadderIllustration({ play, reduce }: { play: boolean; reduce: boolean }) {
  const rows = EXAMPLE_MILESTONES.slice(0, 3);
  return (
    <div className="flex w-[300px] flex-col gap-3">
      {rows.map((m, i) => (
        <motion.div
          key={m.label}
          className="flex items-center gap-3 rounded-[16px] border border-outline bg-card px-4 py-3 shadow-[0_12px_28px_rgba(26,43,74,0.1)]"
          initial={{ opacity: 0, y: 24, x: i * 12 }}
          animate={play ? { opacity: 1, y: 0, x: i * 12 } : {}}
          transition={{ duration: reduce ? 0 : DURATION.slow, delay: reduce ? 0 : 0.15 + i * 0.22, ease: EASE_OUT }}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-icon-bg text-primary">
            <Icon name="gift" size={20} />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-headline text-[15px] font-bold leading-tight text-navy">{m.reward}</span>
            <span className="block text-[12px] text-muted">{unlocksAt(m.unlocksAt)}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/** Merchant step 3: scan, then the amount lands and is confirmed. */
function ScanAmountIllustration({ play, reduce }: { play: boolean; reduce: boolean }) {
  const t = (delay: number) => ({ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : delay, ease: EASE_OUT });
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="relative h-52 w-52 rounded-[28px] bg-navy"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={play ? { opacity: 1, scale: 1 } : {}}
        transition={t(0)}
      >
        {/* The customer's QR, seen through the scanner */}
        <span className="absolute inset-[22%] rounded-[14px] bg-card p-2">
          <QrPattern />
        </span>
        {["left-4 top-4 border-l-4 border-t-4 rounded-tl-xl", "right-4 top-4 border-r-4 border-t-4 rounded-tr-xl", "left-4 bottom-4 border-l-4 border-b-4 rounded-bl-xl", "right-4 bottom-4 border-r-4 border-b-4 rounded-br-xl"].map((c) => (
          <span key={c} className={`absolute h-10 w-10 border-card ${c}`} />
        ))}
        <motion.span
          className="absolute inset-x-8 top-8 h-[3px] rounded-full bg-primary-container"
          initial={{ y: 0, opacity: 0 }}
          animate={play ? { y: [0, 130, 0], opacity: [0, 1, 1, 0] } : {}}
          transition={{ duration: reduce ? 0 : 1.6, delay: reduce ? 0 : 0.2, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.span
        className="absolute -bottom-5 -right-8 flex items-center gap-2 rounded-full bg-card px-4 py-2 text-label-lg text-navy shadow-[0_14px_30px_rgba(26,43,74,0.14)]"
        initial={{ opacity: 0, y: 14 }}
        animate={play ? { opacity: 1, y: 0 } : {}}
        transition={t(1.4)}
      >
        <span className="font-headline text-[18px] font-extrabold">₹1,200</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-green text-white">
          <Icon name="check" size={14} />
        </span>
      </motion.span>
    </div>
  );
}

/** Merchant step 4: customers return, including new faces becoming regulars. */
function ComeBackIllustration({ play, reduce }: { play: boolean; reduce: boolean }) {
  const spots = [
    { x: -110, y: -30 },
    { x: 105, y: -50 },
    { x: -60, y: 85 },
    { x: 80, y: 80 },
  ];
  return (
    <div className="relative flex h-[280px] w-[280px] items-center justify-center">
      <motion.span
        className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_18px_40px_rgba(37,99,235,0.35)]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={play ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: reduce ? 0 : DURATION.slow, ease: EASE_OUT }}
      >
        <Icon name="store" size={56} strokeWidth={1.5} />
      </motion.span>
      {spots.map((p, i) => (
        <motion.span
          key={i}
          className="absolute flex h-12 w-12 items-center justify-center rounded-full border border-outline bg-card text-primary shadow-[0_10px_24px_rgba(26,43,74,0.14)]"
          initial={{ x: p.x * 1.9, y: p.y * 1.9, opacity: 0 }}
          animate={play ? { x: p.x, y: p.y, opacity: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.35 + i * 0.18, ease: EASE_OUT }}
        >
          <Icon name={i === 1 ? "sparkle" : "users"} size={20} />
        </motion.span>
      ))}
    </div>
  );
}

/** Merchant step 2: an offer goes out to people nearby. */
function BroadcastIllustration({ play, reduce }: { play: boolean; reduce: boolean }) {
  const people = [
    { x: -118, y: -88 },
    { x: 122, y: -70 },
    { x: -104, y: 92 },
    { x: 112, y: 100 },
  ];
  return (
    <div className="relative flex h-[300px] w-[300px] items-center justify-center">
      {[0, 1, 2].map((r) => (
        <motion.span
          key={r}
          className="absolute rounded-full border-2 border-primary/25"
          initial={{ width: 110, height: 110, opacity: 0 }}
          animate={play ? { width: 290, height: 290, opacity: [0, 0.7, 0] } : {}}
          transition={{ duration: reduce ? 0 : 1.8, delay: reduce ? 0 : 0.3 + r * 0.45, ease: "easeOut" }}
        />
      ))}
      <motion.div
        className="relative z-10 flex items-center gap-3 rounded-[18px] border border-outline bg-card px-4 py-3 shadow-[0_18px_40px_rgba(26,43,74,0.16)]"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={play ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: reduce ? 0 : DURATION.slow, ease: EASE_OUT }}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-on-primary">
          <Icon name="percent" size={20} />
        </span>
        <span className="font-headline text-[16px] font-bold leading-tight text-navy">Your offer</span>
      </motion.div>
      {people.map((p, i) => (
        <motion.span
          key={i}
          className="absolute flex h-12 w-12 items-center justify-center rounded-full border border-outline bg-card text-primary shadow-[0_10px_24px_rgba(26,43,74,0.14)]"
          style={{ x: p.x, y: p.y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={play ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.9 + i * 0.2, ease: EASE_OUT }}
        >
          <Icon name={i % 2 ? "bell" : "users"} size={20} />
        </motion.span>
      ))}
    </div>
  );
}
