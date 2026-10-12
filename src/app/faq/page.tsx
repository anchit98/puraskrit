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
  description: "Quick answers about Puraskrit: cost, payments, rewards, your data and iPhone.",
  path: "/faq/",
});

export default function FAQPage() {
  return (
    <>
      <PageHero
        title="Questions? Answered."
        body={
          <p>
            Something else?{" "}
            <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
              {SITE.email}
            </a>
          </p>
        }
      />
      <Section className="!pt-4">
        <Reveal className="mx-auto max-w-3xl">
          <FAQAccordion items={CUSTOMER_FAQ} />
        </Reveal>
      </Section>
      <CTABand id="get-the-app" title={CLOSING_CTA.faq.title} body={CLOSING_CTA.faq.line}>
        <div className="w-full lg:w-[480px]">
          <DownloadBlock headingLevel="h3" />
        </div>
      </CTABand>
    </>
  );
}
