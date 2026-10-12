import { APP_LINKS, BADGES } from "@/config/app";

/**
 * Official Google Play badge (unmodified artwork from Google) plus a plain "Coming soon to iOS"
 * note. Once NEXT_PUBLIC_APP_STORE_URL is set, the note becomes a text link to the App Store.
 */
export function StoreBadges({
  height = 48,
  playUrl = APP_LINKS.playStoreUrl,
  showIOS = true,
  className = "",
}: {
  height?: number;
  playUrl?: string;
  showIOS?: boolean;
  className?: string;
}) {
  const h = Math.max(40, height);
  const appStoreUrl = APP_LINKS.appStoreUrl;
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 max-md:justify-center ${className}`}>
      <a href={playUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 rounded-[10px] transition-transform duration-[400ms] hover:-translate-y-0.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BADGES.play.src} alt={BADGES.play.alt} width={Math.round((BADGES.play.width / BADGES.play.height) * h)} height={h} style={{ height: h, width: "auto" }} />
      </a>
      {showIOS &&
        (appStoreUrl ? (
          <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="text-label-md text-primary hover:underline">
            Download for iOS
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 text-label-md text-navy">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            Coming soon to iOS
          </span>
        ))}
    </div>
  );
}
