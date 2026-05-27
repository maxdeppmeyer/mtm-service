import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company } from "@/lib/company";
import { faqSections, getFaqSection } from "@/lib/faq";
import FaqDetailClient from "./FaqDetailClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return faqSections.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = getFaqSection(slug);

  if (!section) {
    return {};
  }

  return {
    title: `${section.title} | FAQ`,
    description: section.intro,
    alternates: { canonical: `${company.website}/faq/${section.slug}` },
  };
}

export default async function FaqDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const section = getFaqSection(slug);

  if (!section) {
    notFound();
  }

  return <FaqDetailClient section={section} />;
}
