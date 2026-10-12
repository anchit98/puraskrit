"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useInView } from "motion/react";
import { EASE_OUT, SMOOTH, TILT } from "@/config/motion";
import { useExtremeMotion, useFinePointer, useMotionTier } from "@/lib/hooks";
import { EXAMPLE_MILESTONES, unlocksAt } from "@/content/loyalty";
import { PhoneMockup } from "./PhoneMockup";
import { Icon, type IconName } from "./Icon";

/**
 * Landing hero: an entrance sequence followed by a calm ambient loop. Pure CSS 3D, palette only.
 * 1. The phone swings in from depth and a light sheen sweeps its screen.
 * 2. Two cards fly in at different depths.
 * 3. The progress ring fills and counts up a milestone ("+1 visit" pops).
 * 4. The reward card flips from "Unlocks at ₹X" to "Unlocked" with a one-off sparkle.
 * 5. Reward icons orbit the phone on a tilted 3D ellipse (passing behind and in front),
 *    while the phone floats gently and follows the pointer / scroll.
 * Reduced motion: final state, still. Low-end devices: entrance only, no orbit or float.
 */
export function HeroVisual({ audience = "customer" }: { audience?: "customer" | "merchant" }) {
  const customer = audience === "customer";
  const stage = useRef<HTMLDivElement>(null);
  const tier = useMotionTier();
  const fine = useFinePointer();
  const extreme = useExtremeMotion();
  const still = tier === "none";
  const ambient = tier === "full";
  const inView = useInView(stage, { margin: "200px" });

  // Story clock: phase 0 = entering, 1 = progress filling, 2 = unlocked
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (still) return setPhase(2);
    const a = setTimeout(() => setPhase(1), 1300);
    const b = setTimeout(() => setPhase(2), 3100);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [still]);

  // Pointer + scroll tilt (critically damped, no overshoot)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, SMOOTH);
  const spy = useSpring(py, SMOOTH);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["center 0.6", "center 0.15"] });
  const scrollRY = useTransform(scrollYProgress, [0, 1], [-TILT.scroll, TILT.scroll]);
  const rotateY = useTransform<number, number>([scrollRY, spx], ([s, p]) => (extreme ? TILT.scroll + TILT.pointer : ambient ? s + p * TILT.pointer : 0));
  const rotateX = useTransform<number, number>([spy], ([p]) => (extreme ? TILT.pointer : ambient ? 3 - p * TILT.pointer : 0));
  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (!fine || !ambient || e.pointerType !== "mouse" || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }

  const enter = (delay: number, from: Record<string, number | string>) =>
    still ? { initial: false as const } : { initial: { opacity: 0, ...from }, animate: { opacity: 1, x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, filter: "blur(0px)" }, transition: { duration: 0.9, delay, ease: EASE_OUT } };

  return (
    <div
      ref={stage}
      onPointerMove={onMove}
      onPointerLeave={() => (px.set(0), py.set(0))}
      className="relative mx-auto w-full max-w-[540px] px-[4%] pb-14 pt-8"
      style={{ perspective: TILT.perspective }}
      aria-hidden
    >
      {/* Soft halo (decoration) */}
      <div className="pointer-events-none absolute inset-x-[12%] inset-y-[10%] rounded-full bg-primary-container/70 blur-3xl" />

      <motion.div className="relative" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <Orbit icons={customer ? CUSTOMER_ORBIT : MERCHANT_ORBIT} run={ambient && inView && !extreme} show={!still} stageRef={stage} />

        {/* Phone: swings in from depth, then floats */}
        <motion.div style={{ transformStyle: "preserve-3d" }} {...enter(0, { rotateY: -28, rotateX: 16, y: 50, z: -220 })}>
          <motion.div
            animate={ambient && !extreme ? { y: [0, -8, 0] } : undefined}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
            className="relative mx-auto max-w-[240px] sm:max-w-[270px]"
          >
            <PhoneMockup screens={[{ shot: customer ? "buyerLanding" : "sellerPreviewMilestones" }]} priority />
            {!still && (
              <span className="pointer-events-none absolute inset-[3.6%] overflow-hidden rounded-[11cqw]">
                <motion.span
                  className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                  initial={{ x: "-120%", skewX: -12 }}
                  animate={{ x: "260%" }}
                  transition={{ duration: 1.3, delay: 0.85, ease: EASE_OUT }}
                />
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* Reward card (top right) */}
        <motion.div className="absolute right-0 top-[8%] w-[188px] sm:w-[210px]" style={{ z: 90 }} {...enter(0.45, { x: 60, z: -80, filter: "blur(6px)" })}>
          <RewardCard customer={customer} unlocked={phase === 2} still={still} />
        </motion.div>

        {/* Progress card (left) */}
        <motion.div className="absolute left-0 top-[58%] w-[180px] sm:w-[200px]" style={{ z: 110 }} {...enter(0.65, { x: -60, z: -80, filter: "blur(6px)" })}>
          <ProgressCard customer={customer} filled={phase >= 1} still={still} />
        </motion.div>
      </motion.div>

      {/* Depth shadow */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 h-6 w-[44%] -translate-x-1/2 rounded-full bg-navy/15 blur-xl" />
    </div>
  );
}

const CUSTOMER_ORBIT: IconName[] = ["gift", "percent", "store", "sparkle", "progress"];
const MERCHANT_ORBIT: IconName[] = ["gift", "users", "scan", "percent", "repeat"];

/** Icon chips on a tilted 3D ellipse around the phone. Positions update per frame without re-rendering. */
function Orbit({ icons, run, show, stageRef }: { icons: IconName[]; run: boolean; show: boolean; stageRef: React.RefObject<HTMLDivElement | null> }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const angle = useRef(0.6);
  const size = useRef({ w: 480 });
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => (size.current.w = e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [stageRef]);
  const place = () => {
    const rx = size.current.w * 0.47;
    const n = icons.length;
    refs.current.forEach((el, i) => {
      if (!el) return;
      const a = angle.current + (i / n) * Math.PI * 2;
      const x = Math.cos(a) * rx;
      // Depth stays within ±55 px: in front of the phone at the near side, always behind the cards (z 70+).
      const depth = Math.sin(a);
      const z = depth * 55;
      const y = depth * 34 + Math.cos(a * 2) * 8;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) scale(${(0.82 + depth * 0.14).toFixed(3)})`;
      el.style.opacity = (0.62 + (depth + 1) * 0.19).toFixed(2);
    });
  };
  useEffect(place);
  useAnimationFrame((_, delta) => {
    if (!run) return;
    angle.current += (delta / 1000) * ((Math.PI * 2) / 40); // one revolution every 40 s
    place();
  });
  if (!show) return null;
  return (
    <div className="pointer-events-none absolute left-1/2 top-[38%] h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
      {icons.map((name, i) => (
        <motion.span
          key={name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 + i * 0.12, ease: EASE_OUT }}
          className="absolute -ml-[22px] -mt-[22px] block"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-outline bg-card text-primary shadow-[0_10px_24px_rgba(26,43,74,0.14)]"
          >
            <Icon name={name} size={19} />
          </span>
        </motion.span>
      ))}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-[18px] border border-outline bg-card/95 p-3.5 shadow-[0_18px_40px_rgba(26,43,74,0.14)] backdrop-blur">{children}</div>;
}

function RewardCard({ customer, unlocked, still }: { customer: boolean; unlocked: boolean; still: boolean }) {
  const m = EXAMPLE_MILESTONES[1];
  const title = customer ? m.reward : "Your rewards";
  return (
    <div style={{ perspective: 600 }}>
      <motion.div
        key={unlocked ? "on" : "off"}
        initial={still || !unlocked ? false : { rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        style={{ transformOrigin: "50% 0%" }}
        className="relative"
      >
        <Card>
          <div className="flex items-center gap-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${unlocked ? "bg-primary text-on-primary" : "bg-icon-bg text-primary"}`}>
              <Icon name={unlocked ? "check" : "gift"} size={19} />
            </span>
            <div className="min-w-0">
              <p className="font-headline text-[15px] font-bold leading-tight text-navy">{title}</p>
              {unlocked ? (
                <p className="mt-0.5 flex items-center gap-1.5 text-[12px] font-semibold text-navy">
                  <span className="h-2 w-2 rounded-full bg-accent-green" />
                  {customer ? "Unlocked" : "Live for your regulars"}
                </p>
              ) : (
                <p className="mt-0.5 text-[12px] text-muted">{customer ? unlocksAt(m.unlocksAt) : "Milestones you design"}</p>
              )}
            </div>
          </div>
        </Card>
        {unlocked && !still && (
          <span className="pointer-events-none absolute left-[26px] top-[26px]">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <span key={deg} className="sparkle absolute h-1.5 w-1.5 rounded-full" style={{ background: i % 2 ? "#DBEAFE" : "#2563EB", ["--a" as string]: `${deg}deg` }} />
            ))}
          </span>
        )}
      </motion.div>
    </div>
  );
}

function ProgressCard({ customer, filled, still }: { customer: boolean; filled: boolean; still: boolean }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative">
      <Card>
        <div className="flex items-center gap-3">
          <svg width="44" height="44" viewBox="0 0 40 40" className="shrink-0 -rotate-90">
            <circle cx="20" cy="20" r={r} fill="none" stroke="#DBEAFE" strokeWidth="5" />
            <motion.circle
              cx="20"
              cy="20"
              r={r}
              fill="none"
              stroke="#2563EB"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={c}
              initial={still ? false : { strokeDashoffset: c * 0.85 }}
              animate={{ strokeDashoffset: filled ? c * 0.5 : c * 0.85 }}
              transition={{ duration: 1.5, ease: EASE_OUT }}
            />
          </svg>
          <div>
            <p className="font-headline text-[14px] font-bold leading-tight text-navy">{customer ? "Your progress" : "Your regulars"}</p>
            <p className="mt-0.5 text-[12px] text-muted">{customer ? (filled ? "Milestone 2 of 4" : "Milestone 1 of 4") : "Coming back, visit after visit"}</p>
          </div>
        </div>
      </Card>
      {customer && (
        <motion.span
          className="absolute -right-3 -top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-on-primary shadow-[0_8px_18px_rgba(37,99,235,0.35)]"
          initial={still ? false : { opacity: 0, y: 8, scale: 0.9 }}
          animate={filled ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
        >
          +1 visit
        </motion.span>
      )}
    </div>
  );
}
