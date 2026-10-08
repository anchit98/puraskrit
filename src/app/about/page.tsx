import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/config/app";

export const metadata = pageMeta({
  title: "About",
  description: "Puraskrit is a merchant-first loyalty and local discovery platform for offline businesses, by Asraubh Private Limited, Bengaluru.",
  path: "/about/",
});

// TODO(founder): supply any additional About copy. No team photos or founder story until supplied (context §6.6).
export default function AboutPage() {
  return (
    <>
      <PageHero
        overline="About Puraskrit"
        title="Helping local places thank the people who keep coming back."
        body={
          <p>
            Puraskrit is a merchant-first loyalty and local discovery platform for offline businesses. It helps local businesses recognise and
            reward the customers who keep coming back.
          </p>
        }
      />
      <Section className="!pt-4">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <FeatureCard
              icon="store"
              title="For merchants"
              body="Give your customers a reason to come back."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <FeatureCard icon="users" title="For customers" body="Discover local businesses, track your loyalty, unlock rewards and discover offers." />
          </Reveal>
        </div>
        <Reveal delay={0.12} className="card mt-5 p-6 md:p-8">
          <h2 className="text-headline-sm">The company</h2>
          <p className="mt-2 text-body-lg text-muted">
            Puraskrit is built by {SITE.company}, based in {SITE.location}. We&apos;re starting in Bengaluru, around Electronic City.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/contact/" variant="secondary">
              Contact us
            </ButtonLink>
            <ButtonLink href="/merchants/" variant="ghost" arrow>
              For merchants
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
