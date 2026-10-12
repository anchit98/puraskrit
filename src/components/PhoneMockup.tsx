import type { ReactNode } from "react";
import { SCREENSHOTS, type ScreenshotKey } from "@/config/app";
import { LazyMount } from "./LazyMount";
import { SafeImage } from "./SafeImage";

/** One screen inside a phone: a founder screenshot or a coded screen (see components/screens). */
export type ScreenItem = { shot: ScreenshotKey; label?: never; node?: never } | { node: ReactNode; label: string; shot?: never };

/** Height ÷ width of one screen: the screenshot's own shape, or 9:19.5 for coded screens. */
export function screenRatio(item: ScreenItem) {
  return item.shot ? SCREENSHOTS[item.shot].height / SCREENSHOTS[item.shot].width : 19.5 / 9;
}

/** Bezel: 3.6cqw on each side of the screen = 7.2% of the phone's reserved width. */
const BEZEL = 0.072;

function ScreenContent({ item, priority, lazy }: { item: ScreenItem; priority?: boolean; lazy?: boolean }) {
  if (item.shot) {
    const s = SCREENSHOTS[item.shot];
    return (
      <SafeImage
        src={s.src}
        srcSet={`${s.webpSmall} ${Math.min(600, s.width)}w, ${s.webp} ${s.width}w`}
        sizes="(max-width: 640px) 60vw, 300px"
        alt={s.alt}
        width={s.width}
        height={s.height}
        loading={priority ? "eager" : "lazy"}
        className="block h-full w-full"
      />
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
 * Every screen fills the frame exactly: no crop and no blank bars. The phone keeps a constant
 * height (reserved, so nothing shifts) and its width eases to the active screen's shape, so a
 * taller screenshot gets a slightly narrower phone. `active` picks the visible screen; the others
 * crossfade out. The figure is a size container, so coded screens scale with it (cqw units).
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
  const rMin = Math.min(...screens.map(screenRatio));
  const rActive = screenRatio(screens[active] ?? screens[0]);
  // Frame width as % of the reserved width: screen width shrinks as its ratio grows, height stays fixed.
  const frameWidth = ((1 - BEZEL) * (rMin / rActive) + BEZEL) * 100;
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  return (
    <figure className={`relative mx-auto w-full [container-type:inline-size] ${className}`}>
      <div className="relative" style={{ aspectRatio: `1 / ${((1 - BEZEL) * rMin + BEZEL).toFixed(4)}` }}>
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 rounded-[15cqw] bg-navy p-[3.6cqw] shadow-[0_24px_60px_rgba(26,43,74,0.2)]"
          style={{ width: `${frameWidth}%`, transition: `width ${fadeMs}ms ${ease}` }}
        >
          <div className="relative h-full overflow-hidden rounded-[11.5cqw] bg-card">
            {screens.map((item, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity"
                style={{ opacity: i === active ? 1 : 0, transitionDuration: `${fadeMs}ms`, transitionTimingFunction: ease }}
                aria-hidden={i === active ? undefined : true}
              >
                {(!mounted || mounted(i) || i === active) && <ScreenContent item={item} priority={priority && i === 0} lazy={lazy} />}
              </div>
            ))}
            <span aria-hidden className="absolute left-1/2 top-[2.2cqw] h-[7cqw] w-[28cqw] -translate-x-1/2 rounded-full bg-navy" />
          </div>
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
      <SafeImage
        src={s.src}
        srcSet={`${s.webpSmall} ${Math.min(600, s.width)}w, ${s.webp} ${s.width}w`}
        sizes="(max-width: 640px) 90vw, 340px"
        alt={s.alt}
        width={s.width}
        height={s.height}
        className="block h-auto w-full rounded-[16px]"
      />
    </figure>
  );
}
