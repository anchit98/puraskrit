import { pageMeta } from "@/lib/seo";
import { CustomerHowItWorks, CustomerRewards } from "@/components/sections/CustomerSections";
import { CTABand } from "@/components/CTABand";
import { DownloadBlock } from "@/components/DownloadBlock";
import { CLOSING_CTA } from "@/content/customer";

export const metadata = pageMeta({
  title: "How it works",
  description: "Pay the merchant as usual and show your Puraskrit QR. The merchant logs your visit and your milestone progress moves forward.",
  path: "/how-it-works/",
});

export default function HowItWorksPage() {
  return (
    <>
      <div className="relative pt-4">
        <div aria-hidden className="bg-wash pointer-events-none absolute inset-x-0 top-0 h-[70svh]" />
        <CustomerHowItWorks detailed headingAs="h1" />
      </div>
      <CustomerRewards withJourney={false} />
      <CTABand id="get-the-app" title={CLOSING_CTA.title} body={CLOSING_CTA.body}>
        <div className="w-full lg:w-[480px]">
          <DownloadBlock headingLevel="h3" />
        </div>
      </CTABand>
    </>
  );
}
