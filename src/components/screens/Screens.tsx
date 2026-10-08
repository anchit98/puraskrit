/**
 * Coded app screens. They replace founder screenshots that contain banned wording
 * ("Spend ₹X", "more to go", "record your spend"), so the moments are rebuilt as live, crisp UI.
 * All data is illustrative: fictional "Sample" merchants in Electronic City, labelled "Example".
 * Milestone values come from the Context example (content/loyalty.ts).
 *
 * Sizing: every measurement is in `em`. The root font size is set in `cqw` from the phone frame
 * (a size container), so the same screen renders crisp at hero size or as a mini screen.
 */
import type { ReactNode } from "react";
import { EXAMPLE_MILESTONES, formatINR, unlocksAt } from "@/content/loyalty";
import { Icon, type IconName } from "../Icon";

const M = EXAMPLE_MILESTONES;

function Tag({ children = "Example" }: { children?: ReactNode }) {
  return <span className="rounded-full bg-tag px-[0.6em] py-[0.15em] text-[0.72em] font-semibold text-navy">{children}</span>;
}

function Shell({ title, subtitle, children, nav }: { title: string; subtitle?: string; children: ReactNode; nav?: "buyer" | "seller" }) {
  return (
    <div className="flex h-full flex-col bg-surface text-[4.4cqw] leading-[1.35] text-navy">
      <div className="h-[3em] shrink-0" />
      <div className="flex items-center justify-between px-[1.1em]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo-small.webp" alt="" width={313} height={102} loading="lazy" decoding="async" className="h-[1.45em] w-auto" />
        <Tag />
      </div>
      <div className="px-[1.1em] pt-[0.9em]">
        <p className="font-headline text-[1.4em] font-extrabold leading-tight">{title}</p>
        {subtitle && <p className="mt-[0.15em] text-[0.82em] text-muted">{subtitle}</p>}
      </div>
      <div className="min-h-0 flex-1 overflow-hidden px-[1.1em] pt-[0.8em]">{children}</div>
      {nav && <BottomNav kind={nav} />}
    </div>
  );
}

function BottomNav({ kind }: { kind: "buyer" | "seller" }) {
  const items: { icon: IconName; label: string; active?: boolean }[] =
    kind === "buyer"
      ? [{ icon: "store", label: "Home", active: true }, { icon: "qr", label: "Collect" }, { icon: "users", label: "Profile" }]
      : [{ icon: "store", label: "Home" }, { icon: "scan", label: "Give loyalty", active: true }, { icon: "users", label: "Profile" }];
  return (
    <div className="flex shrink-0 justify-around border-t border-outline bg-card px-[0.6em] pb-[1.4em] pt-[0.6em]">
      {items.map((i) => (
        <span key={i.label} className={`flex flex-col items-center gap-[0.15em] text-[0.7em] font-semibold ${i.active ? "text-primary" : "text-muted"}`}>
          <Icon name={i.icon} size={16} className="h-[1.6em] w-[1.6em]" />
          {i.label}
        </span>
      ))}
    </div>
  );
}

function Bar({ value }: { value: number }) {
  return (
    <div className="h-[0.5em] overflow-hidden rounded-full bg-primary-container">
      <div className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out" style={{ width: `${Math.min(100, value * 100)}%` }} />
    </div>
  );
}

function MerchantCard({ name, total, next, unlocked }: { name: string; total: number; next: (typeof M)[number]; unlocked?: string }) {
  return (
    <div className="rounded-[1em] border border-outline bg-card p-[0.85em] shadow-card">
      <div className="flex items-center gap-[0.6em]">
        <span className="flex h-[2.2em] w-[2.2em] items-center justify-center rounded-full bg-icon-bg text-primary">
          <Icon name="store" size={16} className="h-[1.2em] w-[1.2em]" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[0.95em] font-bold">{name}</p>
          <p className="text-[0.72em] text-muted">Electronic City</p>
        </div>
        <p className="ml-auto text-right text-[0.72em] text-muted">
          Total
          <span className="block text-[1.25em] font-bold text-navy">{formatINR(total)}</span>
        </p>
      </div>
      <div className="mt-[0.7em]">
        <Bar value={total / next.unlocksAt} />
      </div>
      {unlocked && (
        <p className="mt-[0.6em] flex items-center gap-[0.4em] rounded-[0.6em] bg-icon-bg px-[0.6em] py-[0.35em] text-[0.8em] font-bold">
          <span className="h-[0.55em] w-[0.55em] rounded-full bg-accent-green" />
          🎁 {unlocked} unlocked
        </p>
      )}
      <p className="mt-[0.55em] text-[0.8em]">
        <span className="text-muted">Next: </span>
        <span className="font-bold">🎁 {next.reward}</span>
      </p>
      <p className="text-[0.72em] text-muted">{unlocksAt(next.unlocksAt)}</p>
    </div>
  );
}

/** Buyer home: progress at local merchants. Replaces buyer-01 (banned "more to go" copy). */
export function BuyerProgressScreen({ after = false }: { after?: boolean }) {
  return (
    <Shell title="Your progress" subtitle="At the places you visit" nav="buyer">
      <div className="space-y-[0.7em]">
        <MerchantCard name="Sample Salon" total={after ? 11000 : 9800} next={after ? M[1] : M[0]} unlocked={after ? M[0].reward : undefined} />
        <MerchantCard name="Sample Spa" total={31500} next={M[3]} />
      </div>
    </Shell>
  );
}

/** Buyer merchant page with milestones. Replaces buyer-02 (banned "Spend ₹X" copy). */
export function BuyerMerchantScreen({ total = 24000 }: { total?: number }) {
  const next = M.find((m) => total < m.unlocksAt) ?? M[M.length - 1];
  return (
    <Shell title="Sample Salon" subtitle="Electronic City, Bengaluru">
      <div className="rounded-[1em] border border-outline bg-card p-[0.85em]">
        <div className="flex items-baseline justify-between">
          <p className="text-[0.75em] text-muted">Your progress</p>
          <p className="font-headline text-[1.2em] font-extrabold">{formatINR(total)}</p>
        </div>
        <div className="mt-[0.5em]">
          <Bar value={total / next.unlocksAt} />
        </div>
      </div>
      <p className="mt-[0.9em] text-[0.7em] font-semibold uppercase tracking-[0.05em] text-muted">Milestones</p>
      <ol className="mt-[0.4em] space-y-[0.45em]">
        {M.map((m) => {
          const on = total >= m.unlocksAt;
          return (
            <li key={m.label} className="flex items-center gap-[0.6em] rounded-[0.8em] border border-outline bg-card p-[0.55em]">
              <span className={`flex h-[2em] w-[2em] shrink-0 items-center justify-center rounded-full ${on ? "bg-primary text-on-primary" : "bg-icon-bg text-primary"}`}>
                <Icon name={on ? "check" : "gift"} size={14} className="h-[1.1em] w-[1.1em]" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.85em] font-bold leading-tight">{m.reward}</p>
                <p className="text-[0.7em] text-muted">{unlocksAt(m.unlocksAt)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Shell>
  );
}

/** Decorative QR-style pattern. Deliberately not a valid code: the app shows the real one. */
function QrPattern() {
  const n = 21;
  const cells: [number, number][] = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!inFinder(x, y) && rnd() > 0.52) cells.push([x, y]);
  const finder = (ox: number, oy: number) => (
    <g key={`${ox}-${oy}`}>
      <rect x={ox} y={oy} width={7} height={7} fill="#1A2B4A" />
      <rect x={ox + 1} y={oy + 1} width={5} height={5} fill="#FFFFFF" />
      <rect x={ox + 2} y={oy + 2} width={3} height={3} fill="#1A2B4A" />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} className="h-full w-full" shapeRendering="crispEdges">
      <rect x={-1} y={-1} width={n + 2} height={n + 2} fill="#FFFFFF" />
      {cells.map(([x, y]) => (
        <rect key={`${x}.${y}`} x={x} y={y} width={1} height={1} fill="#1A2B4A" />
      ))}
      {finder(0, 0)}
      {finder(n - 7, 0)}
      {finder(0, n - 7)}
    </svg>
  );
}

/** Buyer QR. Replaces buyer-05 (banned "record your spend" copy and a sample phone number). */
export function BuyerQrScreen({ scanned = false }: { scanned?: boolean }) {
  return (
    <Shell title="Your QR" subtitle="Show this at the counter" nav="buyer">
      <div className="relative mx-auto mt-[0.4em] aspect-square w-[82%] rounded-[1.2em] border border-outline bg-card p-[0.9em] shadow-card">
        <QrPattern />
        <span
          className={`absolute inset-0 flex flex-col items-center justify-center gap-[0.3em] rounded-[1.2em] bg-card/90 transition-opacity duration-500 ${
            scanned ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="flex h-[2.6em] w-[2.6em] items-center justify-center rounded-full bg-accent-green text-white">
            <Icon name="check" size={20} className="h-[1.5em] w-[1.5em]" />
          </span>
          <span className="text-[0.9em] font-bold">Scanned</span>
        </span>
      </div>
      <p className="mt-[1em] text-center text-[0.8em] text-muted">Sample QR</p>
      <div className="mx-auto mt-[0.6em] w-[82%] rounded-[0.9em] border border-outline bg-card p-[0.7em] text-center">
        <p className="text-[0.7em] font-semibold uppercase tracking-[0.05em] text-muted">Customer</p>
        <p className="text-[0.95em] font-bold">Customer Name</p>
      </div>
    </Shell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.7em] font-semibold text-muted">{label}</p>
      <p className="mt-[0.2em] rounded-[0.6em] border border-outline-variant bg-card px-[0.6em] py-[0.4em] text-[0.85em] font-semibold">{value}</p>
    </div>
  );
}

/** Seller: create milestones. Replaces seller-01 (field labels read "Spend"). */
export function SellerCreateMilestonesScreen() {
  return (
    <Shell title="Create milestones" subtitle="Reward first, then the level it unlocks at">
      <div className="space-y-[0.7em]">
        {M.slice(0, 2).map((m) => (
          <div key={m.label} className="space-y-[0.45em] rounded-[1em] border border-outline bg-card p-[0.75em]">
            <p className="text-[0.7em] font-semibold uppercase tracking-[0.05em] text-primary">{m.label}</p>
            <Field label="Reward" value={m.reward} />
            <Field label="Unlocks at" value={formatINR(m.unlocksAt)} />
          </div>
        ))}
        <p className="text-[0.8em] font-semibold text-primary">+ Add milestone</p>
        <p className="rounded-full bg-primary py-[0.6em] text-center text-[0.85em] font-bold text-on-primary">Preview milestones</p>
      </div>
    </Shell>
  );
}

/** Seller: scanner. Coded so the "for both" scene stays crisp (seller-05 uses a stock photo). */
export function SellerScanScreen({ state = "idle" }: { state?: "idle" | "scanning" | "found" }) {
  return (
    <Shell title="Give loyalty" subtitle="Scan the customer's QR" nav="seller">
      <div className="relative mx-auto mt-[0.3em] aspect-square w-[88%] overflow-hidden rounded-[1.2em] bg-navy">
        {[
          "left-[12%] top-[12%] border-l-[0.25em] border-t-[0.25em] rounded-tl-[0.6em]",
          "right-[12%] top-[12%] border-r-[0.25em] border-t-[0.25em] rounded-tr-[0.6em]",
          "left-[12%] bottom-[12%] border-l-[0.25em] border-b-[0.25em] rounded-bl-[0.6em]",
          "right-[12%] bottom-[12%] border-r-[0.25em] border-b-[0.25em] rounded-br-[0.6em]",
        ].map((c) => (
          <span key={c} className={`absolute h-[18%] w-[18%] border-card ${c}`} />
        ))}
        {state === "scanning" && <span className="screen-scan absolute inset-x-[14%] top-[14%] h-[0.18em] rounded-full bg-primary-container" />}
        <span
          className={`absolute inset-0 flex flex-col items-center justify-center gap-[0.3em] text-card transition-opacity duration-500 ${
            state === "found" ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="flex h-[2.6em] w-[2.6em] items-center justify-center rounded-full bg-accent-green text-white">
            <Icon name="check" size={20} className="h-[1.5em] w-[1.5em]" />
          </span>
          <span className="text-[0.9em] font-bold">Customer found</span>
        </span>
      </div>
      <p className="mt-[0.9em] text-center text-[0.8em] text-muted">Align the QR inside the frame</p>
    </Shell>
  );
}

/** Seller: enter amount. Replaces seller-05b (banned "₹X more to reach" copy). */
export function SellerAmountScreen({ confirmed = false }: { confirmed?: boolean }) {
  return (
    <Shell title="Add purchase" subtitle="After the customer has paid">
      <div className="flex items-center gap-[0.6em] rounded-[1em] border border-outline bg-card p-[0.7em]">
        <span className="flex h-[2.3em] w-[2.3em] items-center justify-center rounded-full bg-icon-bg text-[0.85em] font-bold text-primary">CN</span>
        <div>
          <p className="text-[0.9em] font-bold">Customer Name</p>
          <p className="flex items-center gap-[0.35em] text-[0.72em] text-muted">
            <span className="h-[0.5em] w-[0.5em] rounded-full bg-accent-green" /> QR verified
          </p>
        </div>
      </div>
      <p className="mt-[1em] text-[0.72em] font-semibold text-muted">Purchase amount</p>
      <p className="mt-[0.2em] rounded-[0.8em] border border-outline-variant bg-card px-[0.7em] py-[0.5em] font-headline text-[1.6em] font-extrabold">
        {formatINR(1200)}
      </p>
      <div className="relative mt-[1em] h-[3.2em]">
        <p
          className={`absolute inset-0 flex items-center justify-center rounded-full bg-primary text-[0.9em] font-bold text-on-primary transition-opacity duration-500 ${
            confirmed ? "opacity-0" : "opacity-100"
          }`}
        >
          Confirm
        </p>
        <p
          className={`absolute inset-0 flex items-center justify-center gap-[0.4em] rounded-full border border-outline bg-card text-[0.85em] font-bold transition-opacity duration-500 ${
            confirmed ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="h-[0.6em] w-[0.6em] rounded-full bg-accent-green" /> Logged. Progress updated.
        </p>
      </div>
    </Shell>
  );
}
