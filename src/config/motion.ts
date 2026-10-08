/**
 * One motion system for the whole site.
 * Calm and physical: ease-out tweens, no springy overshoot, no loops, no autoplay.
 * Every animated component reads its timing from here.
 */

/** Seconds */
export const DURATION = {
  /** Small UI changes: toggles, accordions, tap states */
  fast: 0.4,
  /** Default entrances and state changes */
  base: 0.55,
  /** Large reveals: section entrances, unlock moments */
  slow: 0.7,
  /** Reduced-motion fallback: a simple fade, nothing moves */
  reduced: 0.2,
} as const;

/** Ease-out (no overshoot). Fast start, long gentle settle. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Seconds between items in a list */
export const STAGGER = 0.06;

/** Pixels an element rises while it fades in */
export const RISE = 16;

/** 3D limits. Containers pad for these maximums so nothing clips. */
export const TILT = {
  /** Pointer tilt on desktop, degrees */
  pointer: 6,
  /** Scroll-linked phone rotation, degrees (each side) */
  scroll: 8,
  /** Card hover tilt on desktop, degrees */
  card: 5,
  /** Card hover lift, px */
  lift: 4,
  /** CSS perspective, px */
  perspective: 1200,
} as const;

/**
 * Pointer smoothing as a critically damped spring: it settles without overshoot
 * (damping = 2 * sqrt(stiffness * mass)).
 */
export const SMOOTH = { stiffness: 170, damping: 27, mass: 1, restDelta: 0.001 } as const;

export const tween = (duration: number = DURATION.base, delay = 0) => ({ duration, delay, ease: EASE_OUT });
