import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { OfferExampleCard, OfferTypeCard } from "@/components/OfferCard";
import { OfferFan } from "@/components/OfferFan";
import { Tilt3D } from "@/components/Tilt3D";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { MerchantFinalCTA } from "@/components/sections/MerchantSections";
import { EXAMPLE_OFFER, OFFER_FIELDS, OFFER_TYPES } from "@/content/loyalty";
import { OFFERS_INTRO } from "@/content/merchant";
import { STAGGER } from "@/config/motion";

export const metadata = pageMeta({
  title: "Offers for merchants",
  description: "Create Flat Discount, Prepaid Subscription and Combo Package offers in the Seller App. Preview and manage them; customers see them on your profile.",
  path: "/merchants/offers/",
});

export default function MerchantOffersPage() {
  return (
    <>
      <PageHero overline={OFFERS_INTRO.overline} title={OFFERS_INTRO.title} body={<p>{OFFERS_INTRO.body}</p>} aside={<OfferFan />}>
        <ButtonLink href="/merchants/join/" arrow>
          Join as merchant
        </ButtonLink>
      </PageHero>

      <Section labelledBy="types-title">
        <SectionHeading id="types-title" overline="Offer types" title="Pick the offer that fits." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {OFFER_TYPES.map((o, i) => (
            <Reveal key={o.type} delay={i * STAGGER}>
              <Tilt3D className="rounded-[20px]">
                <OfferTypeCard {...o} />
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white" labelledBy="anatomy-title">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="anatomy-title" overline="Anatomy of an offer" title="Everything a customer needs to decide." />
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {OFFER_FIELDS.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-body-lg">
                  <Icon name="check" size={18} className="shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="mx-auto w-full max-w-[400px]">
            <Tilt3D className="rounded-[20px]">
              {/* TODO(founder): confirm 30% vs 25% (₹4,000 → ₹3,000 is 25%), context §8.5 item 3. */}
              <OfferExampleCard {...EXAMPLE_OFFER} />
            </Tilt3D>
          </Reveal>
        </div>
      </Section>

      <MerchantFinalCTA />
    </>
  );
}
