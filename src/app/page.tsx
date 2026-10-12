import { CLOSING_CTA, DISCOVER_SECTION, HOME_HERO, JOURNEY_SECTION, WAITING, YOURS_SECTION } from "@/content/customer";
import { pageMeta } from "@/lib/seo";
import { STAGGER } from "@/config/motion";
import { DownloadBlock } from "@/components/DownloadBlock";
import { HeroVisual } from "@/components/HeroVisual";
import { FeatureCard } from "@/components/FeatureCard";
import { Section, SectionHeading } from "@/components/Section";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { HowItWorks } from "@/components/HowItWorks";
import { MilestoneExplorer } from "@/components/MilestoneExplorer";
import { FloatingPhone } from "@/components/FloatingPhone";
import { CategoryChips } from "@/components/CategoryChips";
import { IconBubble } from "@/components/Icon";

export const metadata = {
  ...pageMeta({
    title: HOME_HERO.title,
    description: "Every visit to the places around you now counts. Discover places, track your progress and unlock rewards with Puraskrit.",
    path: "/",
  }),
  title: { absolute: "Puraskrit" }, // browser tab title
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero (static on load: no entrance animation, so first paint is immediate) */}
      <section className="relative" aria-labelledby="hero-title">
        <div aria-hidden className="bg-wash pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-grid absolute inset-0 opacity-50" />
        </div>
        <div className="container-page relative grid items-center gap-6 pb-12 pt-8 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pb-16 hero-tall:min-h-[calc(100svh-72px)]">
          <div className="max-md:text-center">
            <h1 id="hero-title" className="text-display max-w-[14ch] max-md:mx-auto lg:!text-[64px] lg:!leading-[1.05]">
              {HOME_HERO.title}
            </h1>
            <p className="mt-6 max-w-xl text-[20px] leading-[30px] text-muted max-md:mx-auto md:text-[22px] md:leading-[32px]">{HOME_HERO.line}</p>
            <div className="mt-10 max-w-[540px] max-md:mx-auto">
              <DownloadBlock id="download" />
            </div>
          </div>
          <HeroVisual audience="customer" />
        </div>
      </section>

      {/* 2. Everything your loyalty unlocks */}
      <Section id="on-the-app" labelledBy="waiting-title">
        <SectionHeading id="waiting-title" title={WAITING.title} align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WAITING.tiles.map((t, i) => (
            <Reveal key={t.title} delay={i * STAGGER} className="h-full">
              <FeatureCard icon={t.icon} title={t.title} body={t.line} big />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3. How it works (customer-only text; two phones animate) */}
      <Section id="how-it-works" tone="white" labelledBy="how-title">
        <HowItWorks headingId="how-title" />
      </Section>

      {/* 4. Your reward journey */}
      <Section id="journey" labelledBy="journey-title">
        <SectionHeading id="journey-title" title={JOURNEY_SECTION.title} body={<p>{JOURNEY_SECTION.line}</p>} />
        <div className="mt-10">
          <MilestoneExplorer />
        </div>
      </Section>

      {/* 5. Find places */}
      <Section id="discover" tone="white" labelledBy="discover-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading id="discover-title" title={DISCOVER_SECTION.title} body={<p>{DISCOVER_SECTION.line}</p>} />
            <Reveal className="mt-8">
              <CategoryChips />
            </Reveal>
          </div>
          <FloatingPhone screens={[{ shot: "buyerOffers" }]} />
        </div>
      </Section>

      {/* 6. You earned it */}
      <Section id="yours" labelledBy="yours-title">
        <SectionHeading id="yours-title" title={YOURS_SECTION.title} align="center" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {YOURS_SECTION.tiles.map((t, i) => (
            <li key={t.title}>
              <Reveal delay={i * STAGGER} className="h-full">
                <div className="flex h-full flex-col items-start gap-4 rounded-[20px] border border-outline bg-card p-6 max-md:items-center max-md:text-center">
                  <IconBubble name={t.icon} size={48} />
                  <p className="font-headline text-headline-sm">{t.title}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. Download band */}
      <CTABand id="get-the-app" title={CLOSING_CTA.home.title} body={CLOSING_CTA.home.line}>
        <div className="w-full lg:w-[500px]">
          <DownloadBlock headingLevel="h3" />
        </div>
      </CTABand>
    </>
  );
}
