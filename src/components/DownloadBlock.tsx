"use client";

import { QRCodeSVG } from "qrcode.react";
import { APP_LINKS } from "@/config/app";
import { StoreBadges } from "./StoreBadges";
import { Tilt3D } from "./Tilt3D";

/**
 * Download block (context §7), with the official store badges.
 * Desktop/tablet: QR (from APP_LINKS.playStoreUrl) + Google Play badge + "Coming soon to iOS".
 * Mobile: no QR (useless on a phone); the badge and the iOS note only.
 */
export function DownloadBlock({ id, headingLevel = "h2" }: { id?: string; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div id={id} className="scroll-mt-28">
      {/* Desktop / tablet */}
      <div className="hidden md:block">
        <Tilt3D className="rounded-[24px]">
          <div className="card relative flex items-center gap-6 rounded-[24px] p-5 pr-7">
            <div className="relative shrink-0 rounded-2xl border border-outline bg-card p-2.5">
              <QRCodeSVG
                value={APP_LINKS.playStoreUrl}
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
              <H className="text-headline-sm">Scan to get Puraskrit</H>
              <StoreBadges height={44} className="mt-4" />
            </div>
          </div>
        </Tilt3D>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <StoreBadges height={52} className="justify-center" />
      </div>
    </div>
  );
}
