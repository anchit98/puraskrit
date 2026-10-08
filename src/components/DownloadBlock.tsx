"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { APP_LINKS } from "@/config/app";
import { Icon } from "./Icon";
import { SampleMarker } from "./SampleMarker";
import { Tilt3D } from "./Tilt3D";

/**
 * Download block (context §7).
 * Desktop/tablet: QR (generated from APP_LINKS.playStoreUrl) + Google Play link + disabled iOS badge.
 * Mobile: no QR; full-width "Get it on Google Play" button + "iOS coming soon".
 * iOS user agents see only the iOS message.
 *
 * TODO(lead-dev): replace the placeholder store buttons with the official Google Play / App Store
 * badge artwork per each store's brand guidelines. Do not redraw the badges.
 */
export function DownloadBlock({ id, headingLevel = "h2" }: { id?: string; headingLevel?: "h2" | "h3" }) {
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1));
  }, []);

  const { playStoreUrl, appStoreUrl } = APP_LINKS;
  const H = headingLevel;

  return (
    <div id={id} className="scroll-mt-28">
      {/* Desktop / tablet */}
      <div className="hidden md:block">
        <Tilt3D className="rounded-[24px]">
          <div className="card relative flex items-center gap-6 rounded-[24px] p-5 pr-7">
            <div className="relative shrink-0 rounded-2xl border border-outline bg-card p-2.5">
              <QRCodeSVG
                value={playStoreUrl}
                size={132}
                level="H"
                marginSize={2}
                fgColor="#1A2B4A"
                bgColor="#FFFFFF"
                role="img"
                aria-label="QR code linking to the Puraskrit app on Google Play"
              />
            </div>
            <div className="min-w-0">
              <H className="text-title-md">Scan to download the Puraskrit app</H>
              <p className="mt-1 text-body-sm text-muted">
                Or <a href={playStoreUrl} className="text-primary underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">open the Google Play listing</a>.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <StoreButton href={playStoreUrl} store="play" />
                <StoreButton href={appStoreUrl} store="ios" />
              </div>
              <SampleMarker className="mt-3" />
            </div>
          </div>
        </Tilt3D>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        {!isIOS && (
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-primary text-label-lg text-on-primary shadow-[0_8px_24px_rgba(37,99,235,0.3)] active:bg-on-primary-container"
          >
            <Icon name="play" size={18} fill="currentColor" />
            Get it on Google Play
          </a>
        )}
        <p className={`text-center text-body-sm ${isIOS ? "rounded-2xl bg-tag px-4 py-4 text-label-md text-navy" : "mt-3 text-muted"}`}>
          {appStoreUrl ? (
            <a href={appStoreUrl} className="text-primary">Download on the App Store</a>
          ) : isIOS ? (
            "Puraskrit is coming soon on iOS. It's available on Google Play for Android now."
          ) : (
            "iOS coming soon"
          )}
        </p>
        <div className="mt-3 flex justify-center">
          <SampleMarker />
        </div>
      </div>
    </div>
  );
}

function StoreButton({ href, store }: { href: string | null; store: "play" | "ios" }) {
  if (store === "ios" && !href) {
    return (
      <span
        aria-disabled="true"
        // Disabled state colours mandated by context §7 (#F1F5F9 fill, #64748B text); disabled controls are exempt from WCAG contrast.
        className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-xl bg-tag px-4 text-label-md text-muted"
      >
        <Icon name="phone" size={18} />
        Coming soon on iOS
      </span>
    );
  }
  return (
    <a
      href={href!}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-label-md text-on-primary transition hover:-translate-y-0.5 active:bg-on-primary-container"
    >
      <Icon name="play" size={16} fill="currentColor" />
      {store === "play" ? "Get it on Google Play" : "Download on the App Store"}
    </a>
  );
}
