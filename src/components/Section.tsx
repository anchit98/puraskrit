import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  children,
  className = "",
  tone = "plain",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "plain" | "tint" | "white";
  labelledBy?: string;
}) {
  const bg = tone === "tint" ? "bg-tag/60" : tone === "white" ? "bg-card" : "";
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-16 md:py-24 ${bg} ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  overline,
  title,
  body,
  id,
  align = "left",
  as: As = "h2",
}: {
  overline?: string;
  title: string;
  body?: ReactNode;
  id?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {overline && <p className="text-overline text-primary mb-3">{overline}</p>}
      <As id={id} className="text-display">
        {title}
      </As>
      {body && <div className="mt-4 text-body-lg text-muted md:text-[20px] md:leading-[30px]">{body}</div>}
    </Reveal>
  );
}
