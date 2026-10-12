"use client";

/**
 * Last-resort error page: shown if the root layout itself fails. It cannot use the site's
 * styles or fonts, so it uses plain inline styles in the brand palette.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ margin: 0, background: "#F8F9FB", color: "#1A2B4A", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
          <h1 style={{ fontSize: 36, margin: 0 }}>That didn&apos;t load.</h1>
          <p style={{ color: "#64748B", fontSize: 18, maxWidth: 420 }}>Please try again. If it keeps happening, come back in a little while.</p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 16, background: "#2563EB", color: "#fff", border: 0, borderRadius: 999, padding: "14px 28px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
