import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { PhoneSteps } from "@/components/PhoneSteps";
import { FeatureCard } from "@/components/FeatureCard";
import { FloatingPhone } from "@/components/FloatingPhone";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { MERCHANT_STEP_SCREENS, MerchantFinalCTA, StaffAndOnboarding } from "@/components/sections/MerchantSections";
import { MERCHANT_STEPS, SELLER_FEATURES } from "@/content/merchant";
import { STAGGER } from "@/config/motion";

export const metadata = pageMeta({
  title: "How it works for merchants",
  description: "Set up your profile and loyalty programme, then scan your customer's QR after payment and enter the amount. Their progress updates instantly.",
  path: "/merchants/how-it-works/",
});

export default function MerchantHowItWorksPage() {
  return (
    <>
      <PageHero
        overline="How it works for you"
        title="Set it up once. Scan at the counter."
        body={<p>Your customer pays you the usual way. Puraskrit doesn&apos;t process payments. You log the purchase in a few taps.</p>}
        aside={<FloatingPhone screens={[{ shot: "sellerScan" }]} />}
      >
        <ButtonLink href="/merchants/join/" arrow>
          Join as merchant
        </ButtonLink>
      </PageHero>

      <Section labelledBy="flow-title">
        <SectionHeading id="flow-title" overline="The flow" title="Four steps, start to finish." />
        <div className="mt-10">
          <PhoneSteps steps={MERCHANT_STEPS} screens={MERCHANT_STEP_SCREENS} />
        </div>
      </Section>

      <StaffAndOnboarding />

      <Section labelledBy="app-title">
        <SectionHeading id="app-title" overline="The Seller App" title="What you can do in the Seller App." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SELLER_FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * STAGGER}>
              <FeatureCard icon={f.icon} title={f.title} compact />
            </Reveal>
          ))}
        </div>
      </Section>

      <MerchantFinalCTA />
    </>
  );
}
