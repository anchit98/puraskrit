import Link from "next/link";
import { DISCOVER_SECTION, JOURNEY, OFFERS_SECTION, REWARDS_SECTION } from "@/content/customer";
import { CUMULATIVE_LINE, EXAMPLE_MILESTONES, OFFER_TYPES } from "@/content/loyalty";
import { BOTH_SIDES } from "@/content/bothSides";
import { STAGGER } from "@/config/motion";
import { Section, SectionHeading } from "../Section";
import { BothSides } from "../BothSides";
import { MilestoneList } from "../MilestoneList";
import { MilestoneExplorer } from "../MilestoneExplorer";
import { FloatingPhone } from "../FloatingPhone";
import { OfferTypeCard } from "../OfferCard";
import { Reveal } from "../Reveal";
import { IconBubble, Icon } from "../Icon";
import { BuyerMerchantScreen } from "../screens/Screens";

export const MERCHANT_PAGE_SCREEN = {
  node: <BuyerMerchantScreen />,
  label: "Illustration: a merchant page in the Buyer App, with each reward and the level it unlocks at",
};

export function CustomerHowItWorks({ detailed = false, headingAs = "h2" }: { detailed?: boolean; headingAs?: "h1" | "h2" }) {
  const c = BOTH_SIDES.customer;
  return (
    <Section id="how-it-works" labelledBy="how-title">
      <BothSides audience="customer" detailed={detailed} heading={<SectionHeading as={headingAs} id="how-title" overline={c.overline} title={c.title} body={<p>{c.body}</p>} />} />
    </Section>
  );
}

export function RewardJourney({ audience = "customer" }: { audience?: "customer" | "merchant" }) {
  const j = JOURNEY[audience];
  return (
    <>
      <Reveal className="mb-6 max-w-xl">
        <h3 className="text-headline-md">{j.title}</h3>
        <p className="mt-2 text-body-lg text-muted">{j.body}</p>
      </Reveal>
      <div id={audience === "customer" ? "journey" : "journey-merchant"} className="scroll-mt-24">
        <MilestoneExplorer audience={audience} />
      </div>
    </>
  );
}

export function CustomerRewards({ withJourney = true, more = true }: { withJourney?: boolean; more?: boolean }) {
  return (
    <Section id="rewards" tone="white" labelledBy="rewards-title">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <SectionHeading id="rewards-title" overline={REWARDS_SECTION.overline} title={REWARDS_SECTION.title} body={REWARDS_SECTION.body} />
          <Reveal delay={0.1} className="mt-8">
            <MilestoneList milestones={EXAMPLE_MILESTONES.slice(0, 3)} />
            <p className="mt-4 flex items-start gap-2 text-body-md text-muted">
              <Icon name="progress" size={18} className="mt-0.5 shrink-0 text-primary" />
              {CUMULATIVE_LINE}
            </p>
            {more && (
              <Link href="/rewards/" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-label-lg text-primary hover:underline">
                More about rewards <Icon name="arrowRight" size={18} />
              </Link>
            )}
          </Reveal>
        </div>
        <FloatingPhone screens={[MERCHANT_PAGE_SCREEN]} />
      </div>
      {withJourney && (
        <div className="mt-16 md:mt-20">
          <RewardJourney />
        </div>
      )}
    </Section>
  );
}

export function CustomerDiscover({ more = true }: { more?: boolean }) {
  return (
    <Section id="discover" labelledBy="discover-title">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <FloatingPhone card="buyerDiscover" className="order-2 lg:order-1" />
        <div className="order-1 lg:order-2">
          <SectionHeading id="discover-title" overline={DISCOVER_SECTION.overline} title={DISCOVER_SECTION.title} body={DISCOVER_SECTION.body} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {DISCOVER_SECTION.features.map((f, i) => (
              <Reveal key={f.title} delay={i * STAGGER}>
                <div className="flex h-full items-start gap-3.5 rounded-2xl border border-outline bg-card p-4">
                  <IconBubble name={f.icon} size={42} />
                  <div>
                    <h3 className="text-title-md">{f.title}</h3>
                    <p className="mt-0.5 text-body-md text-muted">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 flex items-start gap-2.5 rounded-2xl bg-icon-bg px-4 py-3 text-body-md text-on-primary-container">
              <Icon name="check" size={18} className="mt-0.5 shrink-0" />
              {DISCOVER_SECTION.listedLine}
            </p>
            {more && (
              <Link href="/discover/" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-label-lg text-primary hover:underline">
                More about discovery <Icon name="arrowRight" size={18} />
              </Link>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function CustomerOffers() {
  return (
    <Section id="offers" tone="white" labelledBy="offers-title">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <SectionHeading id="offers-title" overline={OFFERS_SECTION.overline} title={OFFERS_SECTION.title} body={OFFERS_SECTION.body} />
          <div className="mt-8 grid gap-3">
            {OFFER_TYPES.map((o, i) => (
              <Reveal key={o.type} delay={i * STAGGER}>
                <OfferTypeCard {...o} />
              </Reveal>
            ))}
          </div>
        </div>
        <FloatingPhone card="buyerOffers" />
      </div>
    </Section>
  );
}
