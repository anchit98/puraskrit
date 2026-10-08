import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { CustomerOffers } from "@/components/sections/CustomerSections";
import { FloatingPhone } from "@/components/FloatingPhone";
import { FeatureCard } from "@/components/FeatureCard";
import { CategoryChips } from "@/components/CategoryChips";
import { CTABand } from "@/components/CTABand";
import { DownloadBlock } from "@/components/DownloadBlock";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { CLOSING_CTA, DISCOVER_SECTION } from "@/content/customer";
import { STAGGER } from "@/config/motion";

export const metadata = pageMeta({
  title: "Discover local businesses",
  description: "Search Puraskrit merchants by name, browse by category, see nearby merchants, their services and offers. Every merchant is listed, offer or not.",
  path: "/discover/",
});

export default function DiscoverPage() {
  return (
    <>
      <PageHero
        overline={DISCOVER_SECTION.overline}
        title={DISCOVER_SECTION.title}
        body={<p>{DISCOVER_SECTION.body}</p>}
        aside={<FloatingPhone card="buyerDiscover" />}
      >
        <p className="flex items-start gap-2.5 rounded-2xl bg-card px-4 py-3 text-body-md text-navy ring-1 ring-outline">
          <Icon name="check" size={18} className="mt-0.5 shrink-0 text-primary" />
          {DISCOVER_SECTION.listedLine}
        </p>
      </PageHero>

      <Section labelledBy="find-title">
        <SectionHeading id="find-title" overline="Ways to find" title="Four ways to find your next favourite place." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DISCOVER_SECTION.features.map((f, i) => (
            <Reveal key={f.title} delay={i * STAGGER}>
              <FeatureCard icon={f.icon} title={f.title} body={f.body} compact />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white" labelledBy="cat-title">
        <SectionHeading id="cat-title" overline="Categories" title="Local businesses of all kinds." body={<p>Puraskrit is starting in Bengaluru, around Electronic City.</p>} />
        <Reveal className="mt-8">
          <CategoryChips />
        </Reveal>
      </Section>

      <CustomerOffers />

      <CTABand id="get-the-app" title={CLOSING_CTA.title} body={CLOSING_CTA.body}>
        <div className="w-full lg:w-[480px]">
          <DownloadBlock headingLevel="h3" />
        </div>
      </CTABand>
    </>
  );
}
