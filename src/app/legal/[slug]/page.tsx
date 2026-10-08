import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { LEGAL, LEGAL_SLUGS, type LegalSlug } from "@/content/legal/meta";
import { LegalDocument } from "@/components/LegalDocument";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = LEGAL[slug as LegalSlug];
  if (!entry) return {};
  return pageMeta({ title: entry.name, description: entry.description, path: `/legal/${slug}/` });
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = LEGAL[slug as LegalSlug];
  if (!entry) notFound();
  return <LegalDocument doc={entry.doc} flags={entry.flags} current={`/legal/${slug}/`} />;
}
