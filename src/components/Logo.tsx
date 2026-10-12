import Link from "next/link";
import { LOGO, MERCHANT_LOGO } from "@/config/app";

/** Always the supplied logo image, never retyped (context §3.2). */
export function Logo({ height = 34, href = "/", imgClassName = "" }: { height?: number; href?: string; imgClassName?: string }) {
  const width = Math.round((LOGO.width / LOGO.height) * height);
  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label={`${LOGO.alt} home`}>
      <picture>
        <source type="image/webp" srcSet={`${LOGO.webp} 1x, ${LOGO.webp2x} 2x`} />
        <img src={LOGO.src} srcSet={`${LOGO.src} 1x, ${LOGO.src2x} 2x`} alt={LOGO.alt} width={width} height={height} style={{ height, width: "auto" }} className={imgClassName} />
      </picture>
    </Link>
  );
}

/** Puraskrit Merchants logo (merchant page only). */
export function MerchantLogo({ height = 40, href = "/merchants/", imgClassName = "" }: { height?: number; href?: string; imgClassName?: string }) {
  const width = Math.round((MERCHANT_LOGO.width / MERCHANT_LOGO.height) * height);
  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label={MERCHANT_LOGO.alt}>
      <picture>
        <source type="image/webp" srcSet={MERCHANT_LOGO.webp} />
        <img src={MERCHANT_LOGO.src} alt={MERCHANT_LOGO.alt} width={width} height={height} style={{ height, width: "auto" }} className={imgClassName} />
      </picture>
    </Link>
  );
}
