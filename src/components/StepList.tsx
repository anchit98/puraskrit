"use client";

import { Icon, type IconName } from "./Icon";

export type Step = { icon: IconName; title: string; body?: string };

/**
 * Numbered steps. When `active` is passed (scroll-driven scenes), the current step is highlighted.
 */
export function StepList({ steps, active, onSelect }: { steps: Step[]; active?: number; onSelect?: (i: number) => void }) {
  return (
    <ol className="relative space-y-3">
      {steps.map((s, i) => {
        const isActive = active === undefined || active === i;
        const done = active !== undefined && i < active;
        const Tag = onSelect ? "button" : "div";
        return (
          <li key={s.title}>
            <Tag
              {...(onSelect ? { type: "button" as const, onClick: () => onSelect(i), "aria-pressed": active === i } : {})}
              className={`group flex w-full items-start gap-4 rounded-[20px] border p-4 text-left transition-[border-color,box-shadow,background-color] duration-[400ms] ease-out md:p-5 ${
                isActive && active !== undefined
                  ? "border-primary/30 bg-card shadow-[0_10px_30px_rgba(37,99,235,0.12)]"
                  : "border-outline bg-card/70"
              } ${onSelect ? "cursor-pointer hover:border-outline-variant" : ""}`}
            >
              <span
                className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-[400ms] ${
                  isActive || done ? "bg-primary text-on-primary" : "bg-icon-bg text-primary"
                }`}
              >
                <Icon name={done ? "check" : s.icon} size={20} />
              </span>
              <span className="pt-0.5">
                <span className="text-overline text-muted">Step {i + 1}</span>
                <span className="mt-0.5 block text-title-md">{s.title}</span>
                {s.body && <span className="mt-1 block text-body-md text-muted">{s.body}</span>}
              </span>
            </Tag>
          </li>
        );
      })}
    </ol>
  );
}
