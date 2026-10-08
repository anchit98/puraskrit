import { EXAMPLE_MILESTONES, unlocksAt, type Milestone } from "@/content/loyalty";
import { Icon } from "./Icon";

/**
 * Reward-first milestone list (context §2.2): reward text dominant and identical size for all,
 * "Unlocks at ₹X" smaller. Always labelled "Example".
 */
export function MilestoneList({ milestones = EXAMPLE_MILESTONES, reached = 0 }: { milestones?: Milestone[]; reached?: number }) {
  return (
    <div className="card p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-overline text-muted">Milestones</p>
        <span className="rounded-full bg-tag px-2.5 py-0.5 text-label-sm text-navy">Example</span>
      </div>
      <ol className="relative space-y-3">
        <span aria-hidden className="absolute bottom-6 left-[21px] top-6 w-px bg-outline-variant" />
        {milestones.map((m) => {
          const on = reached >= m.unlocksAt;
          return (
            <li key={m.label} className="relative flex items-center gap-4">
              <span
                className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-4 ring-card transition-colors ${
                  on ? "bg-primary text-on-primary" : "bg-icon-bg text-primary"
                }`}
              >
                <Icon name="gift" size={20} />
              </span>
              <div className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-3">
                <div className="min-w-0">
                  <p className="text-label-sm text-muted">{m.label}</p>
                  <p className="text-headline-sm leading-snug">🎁 {m.reward}</p>
                </div>
                <p className="shrink-0 text-right text-body-sm text-muted">{unlocksAt(m.unlocksAt)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
