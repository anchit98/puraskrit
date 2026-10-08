import Link from "next/link";
import {
  LOYALTY_SECTION,
  MERCHANT_FINAL_CTA,
  OFFERS_INTRO,
  ONBOARDING,
  STAFF_LINE,
  WHO_ITS_FOR,
  WHY_PURASKRIT,
} from "@/content/merchant";
import { CUMULATIVE_LINE_MERCHANT, OFFER_TYPES } from "@/content/loyalty";
import { BOTH_SIDES } from "@/content/bothSides";
import { SITE } from "@/config/app";
import { STAGGER } from "@/config/motion";
import type { ScreenItem } from "../PhoneMockup";
import { BothSides } from "../BothSides";
import { SellerAmountScreen, SellerCreateMilestonesScreen } from "../screens/Screens";
import { Section, SectionHeading } from "../Section";
import { FeatureCard } from "../FeatureCard";
import { MilestoneList } from "../MilestoneList";
import { FloatingPhone } from "../FloatingPhone";
import { OfferTypeCard } from "../OfferCard";
import { OfferFan } from "../OfferFan";
import { CategoryChips } from "../CategoryChips";
import { CTABand } from "../CTABand";
import { ButtonLink } from "../Button";
import { Reveal } from "../Reveal";
import { Icon } from "../Icon";
import { StaffTimer } from "../StaffTimer";

/** Screens for the four merchant steps. Coded screens replace screenshots with banned wording. */
export const MERCHANT_STEP_SCREENS: ScreenItem[] = [
  { node: <SellerCreateMilestonesScreen />, label: "Illustration: creating milestones in the Seller App" },
  { shot: "sellerPreviewMilestones" },
  { shot: "sellerScan" },
  { node: <SellerAmountScreen confirmed />, label: "Illustration: purchase amount entered and logged in the Seller App" },
];

export function WhyPuraskrit() {
  return (
    <Section labelledBy="why-title">
      <SectionHeading id="why-title" overline="Why Puraskrit" title="Give your customers a reason to come back." align="center" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {WHY_PURASKRIT.map((f, i) => (
          <Reveal key={f.title} delay={i * STAGGER}>
            <FeatureCard {...f} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function MerchantHowItWorks({ more = true }: { more?: boolean }) {
  const c = BOTH_SIDES.merchant;
  return (
    <Section id="how-it-works" tone="white" labelledBy="m-how-title">
      <BothSides audience="merchant" heading={<SectionHeading id="m-how-title" overline={c.overline} title={c.title} body={<p>{c.body}</p>} />} />
      {more && (
        <Link href="/merchants/how-it-works/" className="mt-8 inline-flex min-h-11 items-center gap-1.5 text-label-lg text-primary hover:underline">
          Setting up, step by step <Icon name="arrowRight" size={18} />
        </Link>
      )}
    </Section>
  );
}

export function MerchantLoyalty({ more = true }: { more?: boolean }) {
  return (
    <Section id="loyalty" labelledBy="m-loyalty-title">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <SectionHeading id="m-loyalty-title" overline={LOYALTY_SECTION.overline} title={LOYALTY_SECTION.title} body={<p>{LOYALTY_SECTION.body}</p>} />
          <Reveal delay={0.1} className="mt-8">
            <MilestoneList />
            <p className="mt-4 flex items-start gap-2 text-body-md text-muted">
              <Icon name="progress" size={18} className="mt-0.5 shrink-0 text-primary" />
              {CUMULATIVE_LINE_MERCHANT}
            </p>
            {more && (
              <Link href="/merchants/loyalty/" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-label-lg text-primary hover:underline">
                Loyalty programmes in detail <Icon name="arrowRight" size={18} />
              </Link>
            )}
          </Reveal>
        </div>
        <FloatingPhone screens={[{ shot: "sellerPreviewMilestones" }]} />
      </div>
    </Section>
  );
}

export function MerchantOffers({ more = true }: { more?: boolean }) {
  return (
    <Section id="offers" tone="white" labelledBy="m-offers-title">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading id="m-offers-title" overline={OFFERS_INTRO.overline} title={OFFERS_INTRO.title} body={<p>{OFFERS_INTRO.body}</p>} />
          <div className="mt-8 grid gap-3">
            {OFFER_TYPES.map((o, i) => (
              <Reveal key={o.type} delay={i * STAGGER}>
                <OfferTypeCard {...o} />
              </Reveal>
            ))}
          </div>
          {more && (
            <Link href="/merchants/offers/" className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-label-lg text-primary hover:underline">
              More about offers <Icon name="arrowRight" size={18} />
            </Link>
          )}
        </div>
        <OfferFan />
      </div>
    </Section>
  );
}

export function WhoItsFor() {
  return (
    <Section labelledBy="who-title">
      <SectionHeading id="who-title" overline={WHO_ITS_FOR.overline} title={WHO_ITS_FOR.title} body={<p>{WHO_ITS_FOR.body}</p>} />
      <Reveal className="mt-8">
        <CategoryChips />
      </Reveal>
    </Section>
  );
}

export function StaffAndOnboarding() {
  return (
    <Section tone="white" labelledBy="onboard-title">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="card relative h-full p-7 md:p-9">
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary-container blur-2xl" />
            </div>
            <div className="relative">
              <StaffTimer />
              <h2 className="text-headline-md mt-6">{STAFF_LINE.title}</h2>
              <p className="mt-2 text-body-lg text-muted">{STAFF_LINE.body}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card h-full p-7 md:p-9">
            <p className="text-overline text-primary">{ONBOARDING.overline}</p>
            <h2 id="onboard-title" className="text-headline-md mt-2">
              {ONBOARDING.title}
            </h2>
            <ol className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {ONBOARDING.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 rounded-2xl border border-outline bg-surface px-3.5 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-label-sm text-on-primary">{i + 1}</span>
                  <span className="text-label-md">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function MerchantFinalCTA() {
  return (
    <CTABand id="join-cta" title={MERCHANT_FINAL_CTA.title}>
      <div className="flex flex-col items-start gap-3 lg:items-end">
        <ButtonLink href="/merchants/join/" arrow>
          Join as merchant
        </ButtonLink>
        <p className="text-body-md text-muted">
          Questions?{" "}
          <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
            {SITE.email}
          </a>
        </p>
      </div>
    </CTABand>
  );
}
