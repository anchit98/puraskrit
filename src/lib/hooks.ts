"use client";

import { useEffect, useState, type RefObject } from "react";

export function useMediaQuery(query: string, initial = false) {
  const [match, setMatch] = useState(initial);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

/** Desktop-style pointer: hover-capable and precise. Touch devices get tap states instead. */
export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/** Viewports where scroll-pinned storytelling is comfortable (wide and tall enough). */
export const PIN_QUERY = "(min-width: 1024px) and (min-height: 720px)";

export type MotionTier = "full" | "lite" | "none";

/**
 * How much motion this device gets.
 * - none: the user prefers reduced motion. Simple fades only, nothing moves.
 * - lite: low-end devices (≤ 4 cores on touch, ≤ 2 GB memory, or Data Saver on).
 *   Entrance fades and state changes, but no continuous scroll-linked 3D.
 * - full: everything.
 * `?motion=reduced|lite|full` forces a tier for testing.
 */
export function useMotionTier(): MotionTier {
  const [tier, setTier] = useState<MotionTier>("full");
  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).get("motion");
    if (forced === "reduced") return setTier("none");
    if (forced === "lite") return setTier("lite");
    if (forced === "full" || forced === "extreme") return setTier("full");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lowEnd =
      (coarse && (navigator.hardwareConcurrency ?? 8) <= 4) || (nav.deviceMemory ?? 8) <= 2 || nav.connection?.saveData === true;
    const update = () => setTier(reduce.matches ? "none" : lowEnd ? "lite" : "full");
    update();
    reduce.addEventListener("change", update);
    return () => reduce.removeEventListener("change", update);
  }, []);
  return tier;
}

/**
 * `?motion=extreme` pins every tilt and parallax at its maximum so layout audits and screenshots
 * can prove nothing clips at the extremes.
 */
export function useExtremeMotion() {
  const [extreme, setExtreme] = useState(false);
  useEffect(() => {
    setExtreme(new URLSearchParams(window.location.search).get("motion") === "extreme");
  }, []);
  return extreme;
}

/** Tracks whether an element is in (or near) the viewport. `seen` latches true on first intersection. */
export function useInView(ref: RefObject<Element | null>, rootMargin = "0px", threshold = 0) {
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, threshold]);
  return { inView, seen };
}
