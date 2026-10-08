import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { RewardJourney } from "@/components/sections/CustomerSections";
import { STAGGER } from "@/config/motion";
import { FeatureCard } from "@/components/FeatureCard";
import { FloatingPhone } from "@/components/FloatingPhone";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { MerchantFinalCTA } from "@/components/sections/MerchantSections";
import { FAIR_RULES, LOYALTY_SECTION, REWARD_TYPES } from "@/content/merchant";

export const metadata = pageMeta({
  title: "Loyalty programmes for merchants",
  description: "Create milestones at fixed, visible levels, each with a reward you choose and fund. Rewards show first, with Unlocks at ₹X underneath. Fair programme rules protect your customers.",
  path: "/merchants/loyalty/",
});

export default function MerchantLoyaltyPage() {
  return (
    <>
      <PageHero
        overline="Loyalty programmes"
        title={LOYALTY_SECTION.title}
        body={<p>{LOYALTY_SECTION.body}</p>}
        aside={<FloatingPhone screens={[{ shot: "sellerPreviewMilestones" }]} />}
      >
        <ButtonLink href="/merchants/join/" arrow>
          Join as merchant
        </ButtonLink>
      </PageHero>

      <Section labelledBy="mech-title">
        <SectionHeading
          id="mech-title"
          overline="Milestone mechanics"
          title="Cumulative milestones, explained."
          body={<p>Each purchase you log adds to the customer&apos;s running total with you. A milestone that unlocks at ₹20,000 is reached when that total reaches ₹20,000, not after another ₹20,000.</p>}
        />
        <div className="mt-10">
          <RewardJourney audience="merchant" />
        </div>
      </Section>

      <Section tone="white" labelledBy="types-title">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading id="types-title" overline="Reward types" title="You choose the rewards. You fund them." body={<p>Rewards are merchant-defined and merchant-funded, and redeemable only at your business.</p>} />
          <ul className="grid gap-3 sm:grid-cols-2">
            {REWARD_TYPES.map((r, i) => (
              <li key={r}>
                <Reveal delay={i * STAGGER} className="flex h-full items-center gap-3 rounded-2xl border border-outline bg-surface px-4 py-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-icon-bg text-primary">
                    <Icon name="gift" size={20} />
                  </span>
                  <span className="text-title-md">{r}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="rules-title">
        <SectionHeading
          id="rules-title"
          overline="Fair programme rules"
          title="Rules that keep your programme trustworthy."
          body={
            <p>
              From the Merchant Terms &amp; Conditions, Sections 8 and 9. Puraskrit may review and reject milestone structures that are predatory or
              misleading.
            </p>
          }
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FAIR_RULES.map((r, i) => (
            <Reveal key={r.title} delay={i * STAGGER}>
              <FeatureCard icon={r.icon} title={r.title} body={r.body} compact />
            </Reveal>
          ))}
        </div>
        <Link href="/legal/merchant-terms/#8-loyalty-program-structure" className="mt-8 inline-flex items-center gap-1.5 text-label-lg text-primary hover:underline">
          Read Merchant Terms &amp; Conditions <Icon name="arrowRight" size={18} />
        </Link>
      </Section>

      <MerchantFinalCTA />
    </>
  );
}
