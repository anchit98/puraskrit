import { pageMeta } from "@/lib/seo";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { IconBubble } from "@/components/Icon";
import { WHY_PURASKRIT } from "@/content/merchant";
import { SITE } from "@/config/app";

export const metadata = pageMeta({
  title: "Join as merchant",
  description: "Tell us about your business and we'll be in touch to help you set up Puraskrit loyalty.",
  path: "/merchants/join/",
});

export default function JoinPage() {
  return (
    <section className="relative pb-20 pt-10 md:pt-16">
      <div aria-hidden className="bg-wash pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-50" />
      </div>
      <div className="container-page relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="text-overline mb-4 text-primary">For merchants</p>
          <h1 className="text-display">Join as merchant</h1>
          <p className="mt-5 text-body-lg text-muted">
            Tell us about your business. We help you get set up.
          </p>
          <ul className="mt-8 space-y-4">
            {WHY_PURASKRIT.map((w) => (
              <li key={w.title} className="flex items-start gap-3.5">
                <IconBubble name={w.icon} size={42} />
                <span className="pt-2 text-title-md">{w.title}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-body-md text-muted">
            Prefer email?{" "}
            <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
              {SITE.email}
            </a>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
