import Link from "next/link";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/content/site";
import { SITE } from "@/config/app";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-outline bg-card pb-[env(safe-area-inset-bottom)]">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr_1.4fr]">
        <div className="space-y-4">
          <Logo height={30} />
          <p className="max-w-xs text-body-md text-muted">
            Discover local businesses, track your loyalty, unlock rewards and discover offers.
          </p>
          <p className="text-body-md">
            <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
              {SITE.email}
            </a>
            <br />
            <span className="text-muted">{SITE.location}</span>
          </p>
          <SocialLinks />
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-overline text-muted mb-4">{col.title}</h2>
            <ul className="md:space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label + l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center text-body-md text-navy transition-colors duration-[400ms] hover:text-primary md:min-h-0">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <nav aria-label="Legal">
          <h2 className="text-overline text-muted mb-4">Legal</h2>
          <ul className="md:space-y-2.5">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center text-body-md text-navy transition-colors duration-[400ms] hover:text-primary md:min-h-0">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-outline">
        <div className="container-page flex flex-col gap-2 py-6 text-body-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE.company}</p>
          <p>{SITE.location}</p>
        </div>
      </div>
    </footer>
  );
}
