import Link from "next/link";
import { CLOSING_CTA, HOME_HERO, MERCHANT_STRIP, WHAT_YOU_GET } from "@/content/customer";
import { pageMeta } from "@/lib/seo";
import { STAGGER } from "@/config/motion";
import { DownloadBlock } from "@/components/DownloadBlock";
import { HeroVisual } from "@/components/HeroVisual";
import { FeatureCard } from "@/components/FeatureCard";
import { Section, SectionHeading } from "@/components/Section";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { FairByDesign } from "@/components/FairByDesign";
import { CustomerDiscover, CustomerHowItWorks, CustomerOffers, CustomerRewards } from "@/components/sections/CustomerSections";

export const metadata = {
  ...pageMeta({
    title: "The places you already love, rewarding you for coming back",
    description:
      "The places you already love, rewarding you for coming back. See your progress and rewards clearly. Free for customers, in Bengaluru.",
    path: "/",
  }),
  title: { absolute: "Puraskrit | The places you already love, rewarding you for coming back" },
};

export default function HomePage() {
  return (
    <>
      {/* A. Hero (static on load: no entrance animation, so first paint is immediate) */}
      <section className="relative" aria-labelledby="hero-title">
        <div aria-hidden className="bg-wash pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-grid absolute inset-0 opacity-50" />
        </div>
        <div className="container-page relative grid items-center gap-6 pb-12 pt-8 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pb-16 hero-tall:min-h-[calc(100svh-72px)]">
          <div>
            <p className="text-overline mb-4 text-primary">{HOME_HERO.overline}</p>
            <h1 id="hero-title" className="text-display max-w-[20ch] lg:!text-[52px] lg:!leading-[1.12]">
              {HOME_HERO.title}
            </h1>
            <ul className="mt-6 space-y-2.5">
              {HOME_HERO.highlights.map((p) => (
                <li key={p.text} className="flex items-start gap-3 text-body-lg text-navy md:text-[18px] md:leading-[28px]">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-icon-bg text-primary">
                    <Icon name={p.icon} size={16} />
                  </span>
                  {p.text}
                </li>
              ))}
            </ul>
            <div className="mt-8 max-w-[520px]">
              <DownloadBlock id="download" />
              <p className="mt-4 flex items-center gap-2 text-body-sm text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-green" aria-hidden />
                {HOME_HERO.note}
              </p>
            </div>
          </div>
          <HeroVisual audience="customer" />
        </div>
      </section>

      {/* B. What you get */}
      <Section id="what-you-get" labelledBy="get-title">
        <SectionHeading id="get-title" overline="What you get" title="Loyalty that's easy to follow." align="center" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {WHAT_YOU_GET.map((f, i) => (
            <Reveal key={f.title} delay={i * STAGGER}>
              <FeatureCard {...f} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* C. How it works, for both */}
      <CustomerHowItWorks />

      {/* D. Rewards + reward journey */}
      <CustomerRewards />

      {/* Trust */}
      <FairByDesign tone="plain" />

      {/* E. Discover */}
      <CustomerDiscover />

      {/* F. Offers */}
      <CustomerOffers />

      {/* H. Merchant strip (secondary) */}
      <section className="py-10" aria-label="For merchants">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 rounded-[20px] border border-outline bg-tag/70 px-6 py-5 sm:flex-row sm:items-center">
              <p className="text-title-md">{MERCHANT_STRIP.text}</p>
              <Link
                href={MERCHANT_STRIP.cta.href}
                className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-card px-5 text-label-md text-navy ring-1 ring-outline transition-colors duration-[400ms] hover:text-primary"
              >
                {MERCHANT_STRIP.cta.label} <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* I. Closing download CTA */}
      <CTABand id="get-the-app" title={CLOSING_CTA.title} body={CLOSING_CTA.body}>
        <div className="w-full lg:w-[480px]">
          <DownloadBlock headingLevel="h3" />
        </div>
      </CTABand>
    </>
  );
}
