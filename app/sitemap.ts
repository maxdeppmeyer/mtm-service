import type { MetadataRoute } from "next";
import { company } from "@/lib/company";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: company.website, changeFrequency: "monthly", priority: 1 },
    { url: `${company.website}/impressum`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${company.website}/datenschutz`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
