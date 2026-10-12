import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { OfflineNotice } from "@/components/OfflineNotice";
import { SITE } from "@/config/app";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Flagged deviation (context §3.2): Devanagari fallback only. Manrope/Inter have no Devanagari glyphs.
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["400", "700"], variable: "--font-devanagari", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Puraskrit", template: "%s | Puraskrit" },
  description: "Your loyalty has value. Discover places, track your progress and unlock rewards with Puraskrit.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/assets/favicon-180.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = { themeColor: "#F8F9FB", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${inter.variable} ${devanagari.variable}`}>
      <body>
        {/* TODO(lead-dev): analytics hook. Not added by design. If analytics is added, add a consent banner
            that defaults to declining non-essential cookies (context §9.3). */}
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <OfflineNotice />
      </body>
    </html>
  );
}
