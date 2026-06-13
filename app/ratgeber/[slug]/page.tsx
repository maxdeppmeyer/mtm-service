import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company } from "@/lib/company";
import { ratgeberArticles, getRatgeberArticle } from "@/lib/ratgeber";
import RatgeberDetailClient from "./RatgeberDetailClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ratgeberArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getRatgeberArticle(slug);

  if (!article) return {};

  return {
    title: `${article.title} | Ratgeber`,
    description: article.description,
    alternates: { canonical: `${company.website}/ratgeber/${article.slug}` },
  };
}

export default async function RatgeberDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getRatgeberArticle(slug);

  if (!article) notFound();

  return <RatgeberDetailClient article={article} />;
}
