import Link from "next/link";
import type { LegalDoc } from "@/content/legal/meta";
import { LEGAL_LINKS } from "@/content/site";
import { Icon } from "./Icon";

/**
 * Notice for unresolved open items (context §10). Always visible until the flag is removed
 * from src/content/legal/meta.ts, so unresolved legal text can't ship silently.
 */
export function LegalFlag({ flags, className = "" }: { flags: string[]; className?: string }) {
  if (!flags.length) return null;
  return (
    <div role="note" className={`rounded-2xl border border-dashed border-outline-variant bg-tag px-4 py-3 text-body-sm text-navy ${className}`}>
      <p className="text-label-sm uppercase tracking-[0.05em] text-navy">Pending founder review</p>
      <ul className="mt-1.5 list-disc space-y-1 pl-4">
        {flags.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </div>
  );
}

/** Renders legal text verbatim (generated from the .docx source by scripts/convert-legal.mjs). */
export function LegalDocument({ doc, flags, current }: { doc: LegalDoc; flags: string[]; current: string }) {
  return (
    <div className="container-page grid gap-10 pb-20 pt-8 md:pt-12 lg:grid-cols-[260px_1fr]">
      <aside className="order-2 lg:order-1">
        <div className="lg:sticky lg:top-24">
          <nav aria-label="On this page" className="hidden lg:block">
            <p className="text-overline mb-3 text-muted">On this page</p>
            <ul className="max-h-[50vh] space-y-1.5 overflow-auto pr-2">
              {doc.toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="block text-body-sm text-muted hover:text-primary">
                    {t.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal documents" className="mt-0 lg:mt-8">
            <p className="text-overline mb-3 text-muted">Legal documents</p>
            <ul className="lg:space-y-1.5">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={l.href === current ? "page" : undefined}
                    className={`flex min-h-11 items-center text-body-sm lg:block lg:min-h-0 ${l.href === current ? "font-semibold text-primary" : "text-muted hover:text-primary"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
      <article className="order-1 min-w-0 lg:order-2">
        <div className="card p-6 md:p-10">
          <h1 className="text-headline-lg">{doc.title}</h1>
          <div className="mt-3 space-y-0.5 text-body-md text-muted">
            {doc.meta.map((m) => (
              <p key={m}>{m}</p>
            ))}
          </div>
          <LegalFlag flags={flags} className="mt-6" />
          <div className="legal-prose mt-8" dangerouslySetInnerHTML={{ __html: doc.html }} />
          <a href="#main" className="mt-10 inline-flex items-center gap-1.5 text-label-md text-primary hover:underline">
            Back to top <Icon name="arrowRight" size={16} className="-rotate-90" />
          </a>
        </div>
      </article>
    </div>
  );
}
