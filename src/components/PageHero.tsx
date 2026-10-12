import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Top-of-page header for inner pages. One H1 per page. */
export function PageHero({ overline, title, body, children, aside }: { overline?: string; title: string; body?: ReactNode; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="relative pb-14 pt-10 md:pb-20 md:pt-16">
      <div aria-hidden className="bg-wash pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-50" />
      </div>
      <div className={`container-page relative grid items-center gap-10 ${aside ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
        <Reveal className="max-w-2xl max-md:mx-auto max-md:text-center">
          {overline && <p className="text-overline mb-4 text-primary">{overline}</p>}
          <h1 className="text-display">{title}</h1>
          {body && <div className="mt-5 text-body-lg text-muted md:text-[18px] md:leading-[28px]">{body}</div>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
        {aside && <div>{aside}</div>}
      </div>
    </section>
  );
}
