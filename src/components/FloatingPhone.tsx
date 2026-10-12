import type { ScreenshotKey } from "@/config/app";
import { Phone3D } from "./Phone3D";
import type { ScreenItem } from "./PhoneMockup";
import { Reveal } from "./Reveal";

/** A section phone (or partial-screen card) that tilts with the pointer and rotates on scroll. */
export function FloatingPhone({
  screens,
  card,
  className = "",
}: {
  screens?: ScreenItem[];
  card?: ScreenshotKey;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <Phone3D screens={screens} card={card} phoneClassName={card ? "max-w-[340px]" : "max-w-[310px] md:max-w-[270px]"} />
    </Reveal>
  );
}
