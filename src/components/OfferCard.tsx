import { formatINR, type OfferType } from "@/content/loyalty";
import { Icon, type IconName } from "./Icon";

/** Fixed offer-type icons (context §6.3): % flat, hand + ₹ prepaid, gift box combo. */
export const OFFER_ICON: Record<OfferType, IconName> = { flat: "percent", prepaid: "handRupee", combo: "gift" };

export function OfferTypeCard({ type, name, body }: { type: OfferType; name: string; body: string }) {
  return (
    <div className="card flex h-full items-start gap-4 p-5">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-icon-bg text-primary">
        <Icon name={OFFER_ICON[type]} size={22} />
      </span>
      <div>
        <h3 className="text-title-md">{name}</h3>
        <p className="mt-1 text-body-md text-muted">{body}</p>
      </div>
    </div>
  );
}

export function OfferExampleCard({
  name,
  type,
  services,
  discount,
  originalPrice,
  finalPrice,
  validity,
}: {
  name: string;
  type: OfferType;
  services: string;
  discount: string;
  originalPrice: number;
  finalPrice: number;
  validity: string;
}) {
  return (
    <article className="card relative p-6" aria-label={`Example offer: ${name}`}>
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
        <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-container/70" />
      </span>
      <div className="relative flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-icon-bg text-primary">
          <Icon name={OFFER_ICON[type]} size={22} />
        </span>
        <span className="rounded-full bg-tag px-2.5 py-0.5 text-label-sm text-navy">Example</span>
      </div>
      <h3 className="text-headline-sm relative mt-5">{name}</h3>
      <p className="mt-1 text-body-md text-muted">{services}</p>
      <div className="mt-5 flex items-end justify-between gap-3 border-t border-outline pt-4">
        <div>
          <span className="rounded-full bg-primary-container px-2.5 py-1 text-label-sm text-on-primary-container">{discount}</span>
          <p className="mt-3 flex items-baseline gap-2">
            <s className="text-body-md text-muted">{formatINR(originalPrice)}</s>
            <span className="text-headline-md">{formatINR(finalPrice)}</span>
          </p>
        </div>
        <p className="text-body-sm text-muted">{validity}</p>
      </div>
    </article>
  );
}
