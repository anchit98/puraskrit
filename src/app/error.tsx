"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/Button";

/** Shown when a page hits an unexpected error. Keeps the header and footer. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // TODO(lead-dev): send to an error-reporting service if one is added.
    console.error(error);
  }, [error]);
  return (
    <section className="bg-wash">
      <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-20 max-md:items-center max-md:text-center">
        <p className="text-overline text-primary">Something went wrong</p>
        <h1 className="text-display mt-3">That didn&apos;t load.</h1>
        <p className="mt-4 max-w-md text-[18px] leading-[28px] text-muted">Please try again. If it keeps happening, come back in a little while.</p>
        <div className="mt-8 flex flex-wrap gap-3 max-md:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-label-lg text-on-primary shadow-[0_8px_24px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 active:scale-[0.97]"
          >
            Try again
          </button>
          <ButtonLink href="/" variant="secondary">
            Go to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
