import { company, services } from "@/lib/company";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: company.legalName,
    url: company.website,
    telephone: company.phoneHref,
    email: company.email,
    image: `${company.website}/images/hero-team-mtm-20260527-v5.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: company.address.countryCode,
    },
    areaServed: [
      { "@type": "City", name: "Hannover" },
      { "@type": "AdministrativeArea", name: "Region Hannover" },
    ],
    serviceType: services.map((service) => service.title),
  };
}
