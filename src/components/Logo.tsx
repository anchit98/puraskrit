import Link from "next/link";
import { LOGO } from "@/config/app";

/** Always the supplied logo image, never retyped (context §3.2). */
export function Logo({ height = 34, href = "/" }: { height?: number; href?: string }) {
  const width = Math.round((LOGO.width / LOGO.height) * height);
  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label="Puraskrit home">
      <picture>
        <source type="image/webp" srcSet={`${LOGO.webp} 1x, ${LOGO.webp2x} 2x`} />
        <img src={LOGO.src} srcSet={`${LOGO.src} 1x, ${LOGO.src2x} 2x`} alt={LOGO.alt} width={width} height={height} style={{ height, width: "auto" }} />
      </picture>
    </Link>
  );
}
