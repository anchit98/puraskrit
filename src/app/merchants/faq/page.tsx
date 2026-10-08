import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Reveal } from "@/components/Reveal";
import { MerchantFinalCTA } from "@/components/sections/MerchantSections";
import { MERCHANT_FAQ } from "@/content/faq";
import { SITE } from "@/config/app";

export const metadata = pageMeta({
  title: "Merchant FAQ",
  description: "Answers for merchants: what you need to join, who pays for rewards, payments, leaving the platform, prohibited businesses and cost.",
  path: "/merchants/faq/",
});

export default function MerchantFAQPage() {
  return (
    <>
      <PageHero
        overline="Merchant FAQ"
        title="Questions from merchants."
        body={
          <p>
            Anything else? Email{" "}
            <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
              {SITE.email}
            </a>
            .
          </p>
        }
      />
      <Section className="!pt-4">
        <Reveal className="mx-auto max-w-3xl">
          <FAQAccordion items={MERCHANT_FAQ} />
        </Reveal>
      </Section>
      <MerchantFinalCTA />
    </>
  );
}
