import Link from "next/link";
import { FAIR_BY_DESIGN } from "@/content/trust";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { Icon, IconBubble } from "./Icon";
import { STAGGER } from "@/config/motion";

/** Calm trust section (customer home and /rewards). Facts only, each sourced in content/trust.ts. */
export function FairByDesign({ tone = "white" }: { tone?: "plain" | "white" }) {
  return (
    <Section id="fair-by-design" tone={tone} labelledBy="fair-title">
      <SectionHeading id="fair-title" overline={FAIR_BY_DESIGN.overline} title={FAIR_BY_DESIGN.title} />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FAIR_BY_DESIGN.items.map((f, i) => (
          <li key={f.title}>
            <Reveal delay={i * STAGGER} className="h-full">
              <div className="flex h-full items-start gap-4 rounded-[20px] border border-outline bg-card p-5">
                <IconBubble name={f.icon} size={44} />
                <div>
                  <h3 className="text-title-md">{f.title}</h3>
                  <p className="mt-1 text-body-md text-muted">{f.body}</p>
                  {"link" in f && f.link && (
                    <Link href={f.link.href} className="mt-2 inline-flex min-h-11 items-center gap-1 text-label-md text-primary hover:underline">
                      {f.link.label} <Icon name="arrowRight" size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
