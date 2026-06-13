import type { MetadataRoute } from "next";
import { company } from "@/lib/company";
import { faqSections } from "@/lib/faq";
import { ratgeberArticles } from "@/lib/ratgeber";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: company.website, changeFrequency: "monthly", priority: 1 },
    { url: `${company.website}/leistungen`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${company.website}/ueber-uns`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${company.website}/kontakt`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${company.website}/faq`, changeFrequency: "monthly", priority: 0.7 },
    ...faqSections.map((section) => ({
      url: `${company.website}/faq/${section.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${company.website}/ratgeber`, changeFrequency: "monthly", priority: 0.7 },
    ...ratgeberArticles.map((article) => ({
      url: `${company.website}/ratgeber/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    { url: `${company.website}/impressum`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${company.website}/datenschutz`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
