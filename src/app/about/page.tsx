import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { FloatingPhone } from "@/components/FloatingPhone";
import { FeatureCard } from "@/components/FeatureCard";
import { CTABand } from "@/components/CTABand";
import { DownloadBlock } from "@/components/DownloadBlock";
import { Reveal } from "@/components/Reveal";
import { IconBubble } from "@/components/Icon";
import { ABOUT } from "@/content/about";
import { CLOSING_CTA } from "@/content/customer";
import { STAGGER } from "@/config/motion";
import { SITE } from "@/config/app";

export const metadata = pageMeta({
  title: "About",
  description: "Why Puraskrit exists, what's inside the app, and how it protects the loyalty you've earned.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero title={ABOUT.hero.title} body={<p>{ABOUT.hero.line}</p>} />

      {/* 1. Why we built it */}
      <Section id="why" tone="white" labelledBy="why-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading id="why-title" overline={ABOUT.why.overline} title={ABOUT.why.title} />
            <div className="mt-6 max-w-2xl space-y-4 text-[18px] leading-[30px] text-muted">
              {ABOUT.why.paragraphs.map((p) => (
                <Reveal key={p}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-body-md text-muted">Puraskrit is built by {SITE.company}.</p>
          </div>
          <FloatingPhone screens={[{ shot: "buyerLanding" }]} />
        </div>
      </Section>

      {/* 2. Inside the app */}
      <Section id="inside" labelledBy="inside-title">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <FloatingPhone screens={[{ shot: "buyerOffers" }]} className="order-2 lg:order-1" />
          <div className="order-1 lg:order-2">
            <SectionHeading id="inside-title" overline={ABOUT.inside.overline} title={ABOUT.inside.title} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {ABOUT.inside.features.map((f, i) => (
                <Reveal key={f.title} delay={i * STAGGER} className="h-full">
                  <FeatureCard icon={f.icon} title={f.title} body={f.body} compact />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Our promise */}
      <Section id="promise" tone="white" labelledBy="promise-title">
        <SectionHeading id="promise-title" overline={ABOUT.promise.overline} title={ABOUT.promise.title} align="center" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {ABOUT.promise.items.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * STAGGER} className="h-full">
                <div className="flex h-full items-start gap-5 rounded-[20px] border border-outline bg-surface p-6 md:p-7">
                  <IconBubble name={p.icon} size={52} />
                  <div>
                    <h3 className="text-headline-sm">{p.title}</h3>
                    <p className="mt-2 text-body-lg text-muted">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand id="get-the-app" title={CLOSING_CTA.about.title} body={CLOSING_CTA.about.line}>
        <div className="w-full lg:w-[500px]">
          <DownloadBlock headingLevel="h3" />
        </div>
      </CTABand>
    </>
  );
}
