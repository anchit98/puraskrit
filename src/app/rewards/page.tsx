import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { MilestoneList } from "@/components/MilestoneList";
import { FeatureCard } from "@/components/FeatureCard";
import { FloatingPhone } from "@/components/FloatingPhone";
import { CTABand } from "@/components/CTABand";
import { DownloadBlock } from "@/components/DownloadBlock";
import { Reveal } from "@/components/Reveal";
import { FairByDesign } from "@/components/FairByDesign";
import { MERCHANT_PAGE_SCREEN, RewardJourney } from "@/components/sections/CustomerSections";
import { CLOSING_CTA, REWARDS_PAGE, REWARDS_SECTION } from "@/content/customer";
import { CUMULATIVE_LINE } from "@/content/loyalty";
import { STAGGER } from "@/config/motion";

export const metadata = pageMeta({
  title: "Rewards and milestones",
  description:
    "Merchants set milestones at fixed, visible levels, each with a reward they fund. See every reward up front. Redeem with the issuing merchant.",
  path: "/rewards/",
});

export default function RewardsPage() {
  return (
    <>
      <PageHero
        overline={REWARDS_SECTION.overline}
        title={REWARDS_SECTION.title}
        body={<p>{REWARDS_SECTION.body}</p>}
        aside={<FloatingPhone screens={[MERCHANT_PAGE_SCREEN]} />}
      />

      <Section labelledBy="cumulative-title">
        <SectionHeading id="cumulative-title" overline="Cumulative milestones" title="Your progress keeps building." body={<p>{CUMULATIVE_LINE}</p>} />
        <div className="mt-10">
          <RewardJourney />
        </div>
      </Section>

      <FairByDesign />

      <Section labelledBy="how-rewards-title">
        <SectionHeading id="how-rewards-title" overline="The basics" title="How rewards work." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {REWARDS_PAGE.items.map((p, i) => (
            <Reveal key={p.title} delay={i * STAGGER}>
              <FeatureCard icon={p.icon} title={p.title} body={p.body} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-10 max-w-2xl">
          <MilestoneList />
        </Reveal>
      </Section>

      <CTABand id="get-the-app" title={CLOSING_CTA.title} body={CLOSING_CTA.body}>
        <div className="w-full lg:w-[480px]">
          <DownloadBlock headingLevel="h3" />
        </div>
      </CTABand>
    </>
  );
}
