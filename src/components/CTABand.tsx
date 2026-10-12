import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Closing call-to-action band before the footer. */
export function CTABand({ title, body, children, id }: { title: string; body?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="py-16 md:py-24" aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="container-page">
        <Reveal>
          <div className="relative rounded-[28px] border border-outline bg-card px-6 py-12 shadow-card md:px-14 md:py-16">
            {/* Decoration layer: the only clipped element, so the download card's tilt and shadow never clip */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
              <div className="bg-grid absolute inset-0 opacity-60" />
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-container blur-3xl" />
              <div className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-icon-bg blur-3xl" />
            </div>
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 id={id ? `${id}-title` : undefined} className="text-display max-w-xl">
                  {title}
                </h2>
                {body && <p className="mt-4 text-body-lg text-muted md:text-[20px]">{body}</p>}
              </div>
              <div>{children}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
