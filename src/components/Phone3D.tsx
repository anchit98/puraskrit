"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { SMOOTH, TILT } from "@/config/motion";
import { useExtremeMotion, useFinePointer, useMotionTier } from "@/lib/hooks";
import { PhoneMockup, ScreenCard, type ScreenItem } from "./PhoneMockup";
import type { ScreenshotKey } from "@/config/app";

export type Layer = {
  node: ReactNode;
  /** Absolute position inside the stage, e.g. "right-0 top-[12%]". Keep it inside the stage. */
  className: string;
  /** Depth in px: higher floats nearer and drifts more on scroll. */
  depth: number;
};

/**
 * CSS 3D stage for a phone or screen card.
 * - Desktop: subtle pointer tilt (max TILT.pointer degrees, smoothed without overshoot).
 * - Every device: rotates up to TILT.scroll degrees as it scrolls through the viewport, and
 *   switches screens at the midpoint of that travel.
 * - Floating layers drift at their own depth (parallax).
 * - Reduced motion: nothing moves; screens switch with a short fade. Low-end: no continuous 3D.
 * The stage pads itself for the maximum tilt and keeps layers inside its box, so nothing clips.
 */
export function Phone3D({
  screens,
  card,
  layers = [],
  className = "",
  phoneClassName = "max-w-[270px]",
  priority = false,
  label,
}: {
  screens?: ScreenItem[];
  /** A partial screenshot shown as a screen card instead of a phone */
  card?: ScreenshotKey;
  layers?: Layer[];
  className?: string;
  phoneClassName?: string;
  priority?: boolean;
  /** Accessible description of what changes as you scroll (for multi-screen phones) */
  label?: string;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const tier = useMotionTier();
  const fine = useFinePointer();
  const extreme = useExtremeMotion();
  const moving = tier === "full";

  // 0 → 1 while the stage's centre travels from 60% to 15% of the viewport height.
  const { scrollYProgress } = useScroll({ target: stage, offset: ["center 0.6", "center 0.15"] });
  const count = screens?.length ?? 1;
  const [active, setActive] = useState(0);
  // Screens after the first mount once the page has loaded and gone idle, so they never delay
  // the first paint (they are ready well before the scroll-driven crossfade needs them).
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (count < 2) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const go = () => (w.requestIdleCallback ? w.requestIdleCallback(() => setReady(true)) : setTimeout(() => setReady(true), 200));
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, [count]);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (count > 1) setActive(Math.min(count - 1, Math.floor(p * count * 0.999)));
  });

  // Pointer tilt, -1…1, smoothed (critically damped: no overshoot)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, SMOOTH);
  const spy = useSpring(py, SMOOTH);

  const scrollRY = useTransform(scrollYProgress, [0, 1], [-TILT.scroll, TILT.scroll]);
  const scrollRX = useTransform(scrollYProgress, [0, 1], [5, -3]);
  const rotateY = useTransform<number, number>([scrollRY, spx], ([s, p]) =>
    extreme ? TILT.scroll + TILT.pointer : moving ? s + p * TILT.pointer : 0,
  );
  const rotateX = useTransform<number, number>([scrollRX, spy], ([s, p]) =>
    extreme ? 5 + TILT.pointer : moving ? s - p * TILT.pointer : 0,
  );
  const shadowX = useTransform(rotateY, (v) => -v * 1.6);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (!fine || !moving || e.pointerType !== "mouse" || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={stage}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative px-[6%] pb-12 pt-6 ${className}`}
      style={{ perspective: TILT.perspective }}
    >
      {label && count > 1 && (
        <p className="sr-only" aria-live="polite">
          {label}: screen {active + 1} of {count}
        </p>
      )}
      {/* Soft halo (decoration, kept inside the stage box) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-[14%] inset-y-[12%] rounded-full bg-primary-container/70 blur-3xl" />
      <motion.div className="relative" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {card ? (
          <ScreenCard shot={card} className={phoneClassName} />
        ) : (
          <PhoneMockup
            screens={screens!}
            active={active}
            className={phoneClassName}
            priority={priority}
            fadeMs={tier === "none" ? 200 : 550}
            mounted={(i) => i === 0 || ready}
          />
        )}
        {layers.map((l, i) => (
          <ParallaxLayer key={i} layer={l} progress={scrollYProgress} moving={moving} extreme={extreme} />
        ))}
      </motion.div>
      {/* Depth shadow: shifts opposite to the tilt */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-3 left-1/2 h-6 w-[46%] -translate-x-1/2 rounded-full bg-navy/15 blur-xl"
        style={{ x: shadowX }}
      />
    </div>
  );
}

function ParallaxLayer({ layer, progress, moving, extreme }: { layer: Layer; progress: MotionValue<number>; moving: boolean; extreme: boolean }) {
  const y = useTransform(progress, [0, 1], [layer.depth * 0.35, -layer.depth * 0.35]);
  return (
    <motion.div
      className={`absolute ${layer.className}`}
      style={{ z: layer.depth, y: extreme ? -layer.depth * 0.35 : moving ? y : 0, transformStyle: "preserve-3d" }}
    >
      {layer.node}
    </motion.div>
  );
}
