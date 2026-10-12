import { pageMeta } from "@/lib/seo";
import { SELLER_APP_LINKS } from "@/config/app";
import { MERCHANT_CONTACT, MERCHANT_HERO, MERCHANT_OFFERS, MERCHANT_STEPS } from "@/content/merchant";
import { HeroVisual } from "@/components/HeroVisual";
import { ButtonLink } from "@/components/Button";
import { Section, SectionHeading } from "@/components/Section";
import { HowItWorks } from "@/components/HowItWorks";
import { OfferFan } from "@/components/OfferFan";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { StoreBadges } from "@/components/StoreBadges";

export const metadata = {
  ...pageMeta({
  title: "Puraskrit Merchants: partner with us",
  description: "Bring your regulars back and turn new faces into regulars, with rewards your customers can see. Run it from your phone.",
  path: "/merchants/",
  }),
  title: { absolute: "Puraskrit Merchants" }, // browser tab title
};

export default function MerchantsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative" aria-labelledby="m-hero-title">
        <div aria-hidden className="bg-wash pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-grid absolute inset-0 opacity-50" />
        </div>
        <div className="container-page relative grid items-center gap-6 pb-12 pt-8 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pb-16 hero-tall:min-h-[calc(100svh-72px)]">
          <div>
            <h1 id="m-hero-title" className="text-display max-w-[16ch] lg:!text-[60px] lg:!leading-[1.06]">
              {MERCHANT_HERO.title}{" "}
              <span className="text-primary">{MERCHANT_HERO.accent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-[20px] leading-[30px] text-muted md:text-[22px] md:leading-[32px]">{MERCHANT_HERO.line}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <StoreBadges height={52} playUrl={SELLER_APP_LINKS.playStoreUrl} showIOS={false} />
              <ButtonLink href="#contact" variant="secondary" className="!h-[52px]">
                Get in touch
              </ButtonLink>
            </div>
          </div>
          <HeroVisual audience="merchant" />
        </div>
      </section>

      {/* How it works */}
      <Section id="how-it-works" tone="white" labelledBy="m-how-title">
        <HowItWorks headingId="m-how-title" content={MERCHANT_STEPS} variant="merchant" />
      </Section>

      {/* Offers */}
      <Section id="offers" labelledBy="m-offers-title">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="m-offers-title" title={MERCHANT_OFFERS.title} />
            <ul className="mt-8 flex flex-wrap gap-3">
              {MERCHANT_OFFERS.types.map((t) => (
                <li key={t} className="rounded-full bg-card px-5 py-2.5 text-label-lg text-navy ring-1 ring-outline">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <OfferFan />
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" tone="white" labelledBy="m-contact-title" className="scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="m-contact-title" title={MERCHANT_CONTACT.title} body={<p>{MERCHANT_CONTACT.line}</p>} />
          <Reveal>
            <LeadForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
