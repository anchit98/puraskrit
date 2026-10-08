import { EXAMPLE_MILESTONES, unlocksAt } from "@/content/loyalty";
import { Phone3D, type Layer } from "./Phone3D";
import { BuyerProgressScreen, SellerCreateMilestonesScreen } from "./screens/Screens";
import { Icon } from "./Icon";

function FloatCard({ children }: { children: React.ReactNode }) {
  return (
    <div aria-hidden className="rounded-[18px] border border-outline bg-card/95 p-3 shadow-[0_18px_40px_rgba(26,43,74,0.14)] backdrop-blur sm:p-3.5">
      {children}
    </div>
  );
}

function Ring({ value }: { value: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="shrink-0 -rotate-90">
      <circle cx="20" cy="20" r={r} fill="none" stroke="#DBEAFE" strokeWidth="5" />
      <circle cx="20" cy="20" r={r} fill="none" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value)} />
    </svg>
  );
}

/**
 * Landing-page hero visual. The phone starts on the real welcome/preview screen and, as you scroll,
 * rotates gently and crossfades to a coded screen. Two cards float at different depths.
 */
export function HeroVisual({ audience = "customer" }: { audience?: "customer" | "merchant" }) {
  const m = EXAMPLE_MILESTONES[1];
  const customer = audience === "customer";

  const layers: Layer[] = [
    {
      depth: 70,
      className: "right-0 top-[10%] w-[172px] sm:w-[200px]",
      node: (
        <FloatCard>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-icon-bg text-primary">
              <Icon name="gift" size={18} />
            </span>
            <div className="min-w-0">
              <p className="font-headline text-[14px] font-bold leading-tight text-navy">{customer ? m.reward : "Your rewards"}</p>
              <p className="mt-0.5 text-[12px] text-muted">{customer ? unlocksAt(m.unlocksAt) : "Milestones you design"}</p>
            </div>
          </div>
          {customer && <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.05em] text-muted">Example</p>}
        </FloatCard>
      ),
    },
    {
      depth: 100,
      className: "left-0 top-[52%] w-[170px] sm:w-[190px]",
      node: (
        <FloatCard>
          <div className="flex items-center gap-2.5">
            {customer ? (
              <Ring value={0.5} />
            ) : (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-icon-bg text-primary">
                <Icon name="users" size={18} />
              </span>
            )}
            <div>
              <p className="font-headline text-[14px] font-bold leading-tight text-navy">{customer ? "Your progress" : "Your regulars"}</p>
              <p className="mt-0.5 text-[12px] text-muted">{customer ? "Milestone 2 of 4" : "Repeat visits, recognised"}</p>
            </div>
          </div>
        </FloatCard>
      ),
    },
  ];

  return (
    <Phone3D
      priority
      className="mx-auto w-full max-w-[520px]"
      phoneClassName="max-w-[230px] sm:max-w-[260px]"
      layers={layers}
      label={customer ? "Buyer App illustration" : "Seller App illustration"}
      screens={
        customer
          ? [
              { shot: "buyerLanding" },
              { node: <BuyerProgressScreen />, label: "Illustration: your progress at local merchants in the Buyer App, with the next reward and the level it unlocks at" },
            ]
          : [
              { shot: "sellerPreviewMilestones" },
              { node: <SellerCreateMilestonesScreen />, label: "Illustration: creating milestones in the Seller App, each with a reward and the level it unlocks at" },
            ]
      }
    />
  );
}
