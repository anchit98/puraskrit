import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { IconBubble } from "@/components/Icon";
import { SITE } from "@/config/app";
import { GRIEVANCE_FLAG, GRIEVANCE_OFFICER } from "@/content/legal/meta";
import { LegalFlag } from "@/components/LegalDocument";

export const metadata = pageMeta({
  title: "Contact",
  description: "Contact Puraskrit at support@puraskrit.com. Asraubh Private Limited, Bengaluru, Karnataka, India. Grievance Officer details.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero overline="Contact" title="Get in touch." body={<p>Customers and merchants can reach us by email.</p>} />
      <Section className="!pt-4">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-6 md:p-8">
              <IconBubble name="mail" />
              <h2 className="text-headline-sm mt-5">Email</h2>
              <a href={`mailto:${SITE.email}`} className="mt-2 inline-block text-headline-sm text-primary hover:underline">
                {SITE.email}
              </a>
              <h2 className="text-headline-sm mt-8">Address</h2>
              <p className="mt-2 text-body-lg text-muted">
                {SITE.company}
                <br />
                {SITE.location}
              </p>
              <p className="mt-8 text-body-md text-muted">
                Running a business?{" "}
                <Link href="/merchants/join/" className="text-primary hover:underline">
                  Join as merchant
                </Link>
                .
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-6 md:p-8">
              <IconBubble name="shield" />
              <h2 className="text-headline-sm mt-5">Grievance Officer</h2>
              <p className="mt-2 text-body-md text-muted">As set out in the Customer Privacy Policy, Section 9 (verbatim).</p>
              <dl className="mt-5 divide-y divide-outline rounded-2xl border border-outline">
                {GRIEVANCE_OFFICER.map((line) => {
                  const i = line.indexOf(":");
                  return (
                    <div key={line} className="grid gap-1 px-4 py-3 sm:grid-cols-[130px_1fr]">
                      <dt className="text-label-md text-muted">{line.slice(0, i)}</dt>
                      <dd className="text-body-md">{line.slice(i + 1).trim()}</dd>
                    </div>
                  );
                })}
              </dl>
              <LegalFlag flags={[GRIEVANCE_FLAG]} className="mt-5" />
              <p className="mt-5 text-body-md">
                <Link href="/legal/customer-privacy/" className="text-primary hover:underline">
                  Customer Privacy Policy
                </Link>{" "}
                ·{" "}
                <Link href="/legal/merchant-privacy/" className="text-primary hover:underline">
                  Merchant Privacy Policy
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
