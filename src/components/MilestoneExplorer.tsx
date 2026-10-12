"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { EXAMPLE_MILESTONES, formatINR, unlocksAt } from "@/content/loyalty";
import { JOURNEY } from "@/content/customer";
import { useMotionTier } from "@/lib/hooks";
import { GiftBox } from "./GiftBox";
import { LazyMount } from "./LazyMount";

const MAX = 80000;
const M = EXAMPLE_MILESTONES;

/* Track geometry (plane viewBox 1000 × 400). Positions are proportional to the amount, so the
   path shows honestly that milestones are cumulative. */
const xAt = (amount: number) => 70 + (Math.min(amount, MAX) / MAX) * 860;
const yAt = (x: number) => 230 + 80 * Math.sin((x / 1000) * Math.PI * 1.7 + 0.35);

function useTrack() {
  return useMemo(() => {
    const pts: [number, number][] = [];
    for (let x = 70; x <= 930; x += 5) pts.push([x, yAt(x)]);
    const lens = [0];
    for (let i = 1; i < pts.length; i++) lens.push(lens[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const total = lens[lens.length - 1];
    const lenAt = (x: number) => {
      const i = Math.max(0, Math.min(pts.length - 1, Math.round((x - 70) / 5)));
      return lens[i];
    };
    return { d: "M" + pts.map((p) => p.map((v) => v.toFixed(1)).join(" ")).join(" L"), total, lenAt };
  }, []);
}

/**
 * The reward journey. Scrolling moves your progress along the path; each gift unlocks with a soft
 * glow and its card appears. Tapping a milestone card scrolls to that point.
 * Gentle by design: fixed, visible levels; no randomness, countdowns or comparisons.
 */
export function MilestoneExplorer() {
  const ref = useRef<HTMLDivElement>(null);
  const tier = useMotionTier();
  const track = useTrack();
  const [amount, setAmount] = useState(0);

  // Progress runs from ₹0 when the journey enters (85% down the viewport) to the end of the
  // track as it nears the top (35%).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setAmount(Math.round((Math.min(1, p * 1.08) * MAX) / 250) * 250));

  const jumpTo = (target: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = window.scrollY + r.top - 0.85 * vh;
    const end = window.scrollY + r.bottom - 0.35 * vh;
    const p = Math.min(1, (target + 1500) / MAX / 1.08);
    window.scrollTo({ top: start + p * (end - start), behavior: tier === "none" ? "auto" : "smooth" });
  };

  const unlocked = M.filter((m) => amount >= m.unlocksAt).length;
  const next = M.find((m) => amount < m.unlocksAt);
  const copy = JOURNEY;
  const animate = tier !== "none";

  return (
    <div className="relative">
      {/* Decoration layer: the only clipped element */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
        <div className="bg-grid absolute inset-0 opacity-50" />
      </div>
      <div className="card relative grid gap-0 lg:grid-cols-[320px_1fr]">
        {/* Readout */}
        <div className="border-b border-outline p-6 max-md:text-center md:p-8 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <p className="text-overline text-muted">{copy.readoutOverline}</p>
          </div>
          <p className="mt-4 text-title-md">{copy.readoutLabel}</p>
          <p className="text-display mt-1 !text-[40px] tabular-nums">{formatINR(amount)}</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-primary-container">
            <div className="h-full rounded-full bg-primary" style={{ width: `${(amount / MAX) * 100}%` }} />
          </div>
          <p className="mt-5 text-body-md" aria-live="polite">
            <span className="font-semibold">{unlocked}</span> of {M.length} rewards unlocked
          </p>
          <p className="mt-1 text-body-md text-muted">
            {next ? (
              <>
                Next: <span className="font-semibold text-navy">{next.reward}</span>, {unlocksAt(next.unlocksAt).toLowerCase()}
              </>
            ) : (
              "Every milestone in this example is unlocked."
            )}
          </p>
          <p className="mt-4 text-body-sm text-muted">{copy.hint}</p>
        </div>

        {/* Track */}
        <div ref={ref} className="relative px-4 py-8 md:px-8">
          {/* Desktop and tablet: 3D plane */}
          <div className="hidden md:block">
            <LazyMount className="" rootMargin="600px 0px">
              <TrackPlane track={track} amount={amount} animate={animate} onJump={jumpTo} />
            </LazyMount>
          </div>

          {/* Phones: vertical path */}
          <ol className="md:hidden">
            {M.map((m, i) => {
              const prev = i === 0 ? 0 : M[i - 1].unlocksAt;
              const seg = Math.max(0, Math.min(1, (amount - prev) / (m.unlocksAt - prev)));
              const on = amount >= m.unlocksAt;
              return (
                <li key={m.label} className="grid grid-cols-[84px_1fr] gap-3">
                  <div className="flex flex-col items-center">
                    <div className="relative h-10 w-2 overflow-hidden rounded-full bg-primary-container">
                      <div className="absolute inset-x-0 top-0 rounded-full bg-primary" style={{ height: `${seg * 100}%` }} />
                    </div>
                    <div className="py-2">
                      <GiftBox size={46} unlocked={on} animate={animate} />
                    </div>
                  </div>
                  <div className="pt-6">
                    <MilestoneCard m={m} on={on} onClick={() => jumpTo(m.unlocksAt)} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

function MilestoneCard({ m, on, onClick, compact = false }: { m: (typeof M)[number]; on: boolean; onClick: () => void; compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block min-h-11 rounded-[16px] border bg-card p-3 text-left max-md:text-center shadow-[0_12px_30px_rgba(26,43,74,0.1)] transition-[border-color,box-shadow,transform] duration-[550ms] ease-out ${
        compact ? "w-[176px]" : "w-full"
      } ${on ? "border-primary/40 ring-4 ring-primary/10" : "border-outline"}`}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-label-sm text-muted">{m.label}</span>
        <span aria-hidden={!on} className={`flex items-center gap-1 text-label-sm text-navy transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}>
          <span className="h-2 w-2 rounded-full bg-accent-green" />
          Unlocked
        </span>
      </span>
      <span className="mt-1 block font-headline text-[15px] font-bold leading-snug text-navy"><span aria-hidden>🎁 </span>{m.reward}</span>
      <span className="mt-0.5 block text-body-sm text-muted">{unlocksAt(m.unlocksAt)}</span>
    </button>
  );
}

const TILT_DEG = 46;
const PERSPECTIVE = 1100;
const PAD_TOP = 170;

/**
 * The tilted track. Only the path and marker live on the rotated plane; cards and gift boxes
 * sit in a flat overlay, positioned with the same perspective maths CSS uses. Keeping text out
 * of nested 3D avoids WebKit (Safari) flattening it.
 */
function TrackPlane({
  track,
  amount,
  animate,
  onJump,
}: {
  track: ReturnType<typeof useTrack>;
  amount: number;
  animate: boolean;
  onJump: (amount: number) => void;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Project a point on the plane (viewBox units) to overlay pixels.
  const project = (vx: number, vy: number) => {
    const W = width * 0.94;
    const H = W * 0.4;
    const Ch = PAD_TOP + H;
    const ox = width / 2; // transform-origin x (plane is centred)
    const oy = PAD_TOP + H; // transform-origin y (bottom edge)
    const X = (vx / 1000) * W - W / 2;
    const Y = (vy / 400) * H - H;
    const t = (TILT_DEG * Math.PI) / 180;
    const z = Y * Math.sin(t);
    const k = PERSPECTIVE / (PERSPECTIVE - z);
    return { x: width / 2 + (ox + X - width / 2) * k, y: Ch / 2 + (oy + Y * Math.cos(t) - Ch / 2) * k, k };
  };

  return (
    <div ref={wrap} className="relative" style={{ paddingTop: PAD_TOP, perspective: PERSPECTIVE }}>
      <div
        className="relative mx-auto w-[94%] rounded-[24px] border border-primary-container bg-icon-bg"
        style={{ aspectRatio: "1000 / 400", transform: `rotateX(${TILT_DEG}deg)`, transformOrigin: "50% 100%" }}
      >
        <svg viewBox="0 0 1000 400" className="absolute inset-0 h-full w-full" aria-hidden>
          <path d={track.d} fill="none" stroke="#DBEAFE" strokeWidth={16} strokeLinecap="round" />
          <path
            d={track.d}
            fill="none"
            stroke="#2563EB"
            strokeWidth={16}
            strokeLinecap="round"
            strokeDasharray={track.total}
            strokeDashoffset={track.total - track.lenAt(xAt(amount))}
            style={{ transition: animate ? "stroke-dashoffset 200ms linear" : undefined }}
          />
          <circle cx={xAt(amount)} cy={yAt(xAt(amount))} r={15} fill="#FFFFFF" stroke="#1A2B4A" strokeWidth={6} />
        </svg>
      </div>
      {width > 0 && (
        <div className="absolute inset-0">
          {M.map((m, i) => {
            const vx = xAt(m.unlocksAt);
            const p = project(vx, yAt(vx));
            const on = amount >= m.unlocksAt;
            return (
              <div key={m.label} className="absolute" style={{ left: p.x, top: p.y, transform: "translate(-50%, -100%)" }}>
                <div className="flex flex-col items-center">
                  <MilestoneCard m={m} on={on} onClick={() => onJump(m.unlocksAt)} compact />
                  <div style={{ height: i % 2 === 0 ? 6 : 92 }} />
                  <div style={{ marginBottom: -8 }}>
                    <GiftBox size={Math.round(40 * p.k)} unlocked={on} animate={animate} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
