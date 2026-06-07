import type { Metadata } from "next";
import { servicesMetadata } from "@/lib/metadata";
import { breadcrumbSchema, servicePageSchema } from "@/lib/schema";
import { company } from "@/lib/company";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = servicesMetadata;

export default function ServicesPage() {
  return (
    <>
      {/* Service-Schemas: Jede Leistung einzeln für Google & KI */}
      {servicePageSchema().map((schema) => (
        <script
          key={schema.url}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {/* Breadcrumb: Verbessert SERP-Darstellung */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Start", url: company.website },
              { name: "Leistungen", url: `${company.website}/leistungen` },
            ])
          ),
        }}
      />
      <ServicesClient />
    </>
  );
}
