import type { ReactNode } from "react";
import { SCREENSHOTS, type ScreenshotKey } from "@/config/app";
import { LazyMount } from "./LazyMount";

/** One screen inside a phone: a founder screenshot or a coded screen (see components/screens). */
export type ScreenItem = { shot: ScreenshotKey; label?: never; node?: never } | { node: ReactNode; label: string; shot?: never };

/**
 * Frame shape follows the screenshot, so a screenshot is never cropped (object-fit: contain).
 * With several screens, the frame takes the tallest screenshot's shape and shorter ones sit
 * top-aligned. Coded screens are fluid and fill any shape (9:19.5 when there is no screenshot).
 */
export function screenAspect(screens: ScreenItem[]) {
  const ratios = screens.filter((s) => s.shot).map((s) => SCREENSHOTS[s.shot!].height / SCREENSHOTS[s.shot!].width);
  const r = ratios.length ? Math.max(...ratios) : 19.5 / 9;
  return `1 / ${r.toFixed(4)}`;
}

function ScreenContent({ item, priority, lazy }: { item: ScreenItem; priority?: boolean; lazy?: boolean }) {
  if (item.shot) {
    const s = SCREENSHOTS[item.shot];
    return (
      <picture>
        <source type="image/webp" srcSet={`${s.webpSmall} ${Math.min(600, s.width)}w, ${s.webp} ${s.width}w`} sizes="(max-width: 640px) 60vw, 300px" />
        <img
          src={s.src}
          alt={s.alt}
          width={s.width}
          height={s.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="block h-full w-full object-contain object-top"
        />
      </picture>
    );
  }
  return (
    <div role="img" aria-label={item.label} className="h-full">
      <div aria-hidden="true" className="h-full">
        {lazy ? <LazyMount>{item.node}</LazyMount> : item.node}
      </div>
    </div>
  );
}

/**
 * CSS phone frame (token radius/border, no device brand marks; context §8.5).
 * `active` picks which of `screens` is visible; the others crossfade out.
 * The frame is a size container, so coded screens scale with it (cqw units).
 */
export function PhoneMockup({
  screens,
  active = 0,
  className = "",
  priority = false,
  fadeMs = 550,
  mounted,
  lazy = false,
}: {
  screens: ScreenItem[];
  active?: number;
  className?: string;
  priority?: boolean;
  fadeMs?: number;
  /** Which screens to render. Hidden screens can mount later so they don't compete with first paint. */
  mounted?: (i: number) => boolean;
  /** Mount coded screens only near the viewport (keeps the initial DOM small). */
  lazy?: boolean;
}) {
  return (
    <figure className={`relative mx-auto w-full [container-type:inline-size] ${className}`}>
      <div className="rounded-[15cqw] bg-navy p-[3.6cqw] shadow-[0_24px_60px_rgba(26,43,74,0.2)]">
        <div className="relative overflow-hidden rounded-[11.5cqw] bg-card" style={{ aspectRatio: screenAspect(screens) }}>
          {screens.map((item, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity"
              style={{ opacity: i === active ? 1 : 0, transitionDuration: `${fadeMs}ms`, transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
              aria-hidden={i === active ? undefined : true}
            >
              {(!mounted || mounted(i) || i === active) && <ScreenContent item={item} priority={priority && i === 0} lazy={lazy} />}
            </div>
          ))}
          <span aria-hidden className="absolute left-1/2 top-[2.2cqw] h-[7cqw] w-[28cqw] -translate-x-1/2 rounded-full bg-navy" />
        </div>
      </div>
    </figure>
  );
}

/** A partial screenshot (not a full screen) shown as an app card rather than a fake full phone. */
export function ScreenCard({ shot, className = "" }: { shot: ScreenshotKey; className?: string }) {
  const s = SCREENSHOTS[shot];
  return (
    <figure className={`relative mx-auto w-full rounded-[22px] border border-outline bg-card p-2 shadow-[0_24px_60px_rgba(26,43,74,0.14)] ${className}`}>
      <picture>
        <source type="image/webp" srcSet={`${s.webpSmall} ${Math.min(600, s.width)}w, ${s.webp} ${s.width}w`} sizes="(max-width: 640px) 90vw, 340px" />
        <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading="lazy" decoding="async" className="block h-auto w-full rounded-[16px] object-contain" />
      </picture>
    </figure>
  );
}
