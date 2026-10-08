import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTABand } from "@/components/CTABand";
import { DownloadBlock } from "@/components/DownloadBlock";
import { Reveal } from "@/components/Reveal";
import { CUSTOMER_FAQ } from "@/content/faq";
import { CLOSING_CTA } from "@/content/customer";
import { SITE } from "@/config/app";

export const metadata = pageMeta({
  title: "FAQ",
  description: "Answers to common questions about Puraskrit for customers: cost, payments, rewards, redemption, your data, account deletion and iOS.",
  path: "/faq/",
});

export default function FAQPage() {
  return (
    <>
      <PageHero
        overline="FAQ"
        title="Questions, answered."
        body={
          <p>
            Can&apos;t find what you need? Email{" "}
            <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
              {SITE.email}
            </a>
            .
          </p>
        }
      />
      <Section className="!pt-4">
        <Reveal className="mx-auto max-w-3xl">
          <FAQAccordion items={CUSTOMER_FAQ} />
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
