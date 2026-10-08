"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { SMOOTH, TILT } from "@/config/motion";
import { useExtremeMotion, useFinePointer, useMotionTier } from "@/lib/hooks";

/**
 * Light 3D lift and tilt on hover. Desktop only (hover-capable, precise pointer).
 * Touch devices stay flat and get a tap-press state instead. Reduced motion: flat.
 * Smoothing is critically damped (no overshoot).
 */
export function Tilt3D({ children, className = "", max = TILT.card }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const tier = useMotionTier();
  const extreme = useExtremeMotion();
  const enabled = fine && tier === "full";
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), SMOOTH);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), SMOOTH);
  const lift = useSpring(useTransform(hover, [0, 1], [0, -TILT.lift]), SMOOTH);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (!enabled || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    hover.set(1);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  }

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={
          extreme
            ? { rotateX: max, rotateY: max, y: -TILT.lift }
            : enabled
              ? { rotateX: rx, rotateY: ry, y: lift, transformStyle: "preserve-3d" }
              : undefined
        }
        className={`relative h-full transition-shadow duration-[400ms] ease-out active:scale-[0.99] ${enabled ? "hover:shadow-[0_18px_44px_rgba(26,43,74,0.1)]" : ""} ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
