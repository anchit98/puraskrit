import { pageMeta } from "@/lib/seo";
import { MERCHANT_HERO } from "@/content/merchant";
import { HeroVisual } from "@/components/HeroVisual";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import {
  MerchantFinalCTA,
  MerchantHowItWorks,
  MerchantLoyalty,
  MerchantOffers,
  StaffAndOnboarding,
  WhoItsFor,
  WhyPuraskrit,
} from "@/components/sections/MerchantSections";

export const metadata = pageMeta({
  title: "For merchants: thank the customers who keep coming back",
  description:
    "A simple loyalty programme you run from your phone. You design the milestones and rewards; your regulars see their progress. No commission. Contact us for pricing.",
  path: "/merchants/",
});

export default function MerchantsPage() {
  return (
    <>
      <section className="relative" aria-labelledby="m-hero-title">
        <div aria-hidden className="bg-wash pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-grid absolute inset-0 opacity-50" />
        </div>
        <div className="container-page relative grid items-center gap-6 pb-12 pt-8 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pb-16 hero-tall:min-h-[calc(100svh-72px)]">
          <div>
            <p className="text-overline mb-4 text-primary">{MERCHANT_HERO.overline}</p>
            <h1 id="m-hero-title" className="text-display max-w-[20ch] lg:!text-[52px] lg:!leading-[1.12]">
              {MERCHANT_HERO.title}
            </h1>
            <ul className="mt-6 space-y-2.5">
              {MERCHANT_HERO.highlights.map((p) => (
                <li key={p.text} className="flex items-start gap-3 text-body-lg text-navy md:text-[18px] md:leading-[28px]">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-icon-bg text-primary">
                    <Icon name={p.icon} size={16} />
                  </span>
                  {p.text}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={MERCHANT_HERO.primary.href} arrow>
                {MERCHANT_HERO.primary.label}
              </ButtonLink>
              <ButtonLink href={MERCHANT_HERO.secondary.href} variant="secondary">
                {MERCHANT_HERO.secondary.label}
              </ButtonLink>
            </div>
          </div>
          <HeroVisual audience="merchant" />
        </div>
      </section>
      <WhyPuraskrit />
      <MerchantHowItWorks />
      <MerchantLoyalty />
      <MerchantOffers />
      <WhoItsFor />
      <StaffAndOnboarding />
      <MerchantFinalCTA />
    </>
  );
}
