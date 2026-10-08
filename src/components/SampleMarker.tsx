import { APP_LINKS } from "@/config/app";

/** Visible "SAMPLE" marker for placeholders. Hidden when NEXT_PUBLIC_SHOW_SAMPLE_MARKER=false. */
export function SampleMarker({ label = "SAMPLE — replace before launch", className = "" }: { label?: string; className?: string }) {
  if (!APP_LINKS.showSampleMarker) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-dashed border-outline-variant bg-tag px-2.5 py-0.5 text-label-sm text-navy ${className}`}
    >
      {label}
    </span>
  );
}
