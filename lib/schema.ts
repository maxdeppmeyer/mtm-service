import { company, services } from "@/lib/company";

/* ──────────────────────────────────────────────
   LocalBusiness — Hauptschema für Google
   Zeigt Sternebewertungen, Kontakt & Leistungen
   ────────────────────────────────────────────── */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: company.legalName,
    alternateName: ["MTM Service", "MTM Hannover"],
    description:
      "Professionelles Umzugsunternehmen in Hannover & Umland. MTM bietet Umzüge, Möbeltransporte, Möbelmontage, Entrümpelung, Expresstransporte und Entkernungsarbeiten – persönlich abgestimmt und zuverlässig durchgeführt.",
    url: company.website,
    telephone: company.phoneHref,
    email: company.email,
    image: `${company.website}/images/hero-team-mtm-20260529-v6.webp`,
    logo: `${company.website}/logo-mtm-top-20260529-v15.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressRegion: "Niedersachsen",
      addressCountry: company.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.3836,
      longitude: 9.7349,
    },
    areaServed: [
      { "@type": "City", name: "Hannover" },
      { "@type": "AdministrativeArea", name: "Region Hannover" },
      { "@type": "City", name: "Garbsen" },
      { "@type": "City", name: "Langenhagen" },
      { "@type": "City", name: "Lehrte" },
      { "@type": "City", name: "Isernhagen" },
      { "@type": "City", name: "Seelze" },
      { "@type": "City", name: "Wunstorf" },
      { "@type": "City", name: "Burgdorf" },
      { "@type": "City", name: "Sarstedt" },
      { "@type": "City", name: "Hemmingen" },
      { "@type": "City", name: "Ronnenberg" },
      { "@type": "City", name: "Laatzen" },
      { "@type": "City", name: "Barsinghausen" },
      { "@type": "City", name: "Wedemark" },
    ],
    /* Sternebewertungen → erscheinen in Google-Suchergebnissen */
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "35",
      bestRating: "5",
      worstRating: "1",
    },
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Bar, Überweisung",
    /* Leistungskatalog für Google & KI */
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen MTM Möbel Transport Montage",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          areaServed: { "@type": "City", name: "Hannover" },
        },
      })),
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phoneHref,
      contactType: "customer service",
      areaServed: "DE",
      availableLanguage: "German",
    },
    founder: {
      "@type": "Person",
      name: company.owner,
    },
  };
}

/* ──────────────────────────────────────────────
   WebSite-Schema — hilft Google die Domain
   als Marke zu erkennen
   ────────────────────────────────────────────── */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.brandName,
    url: company.website,
    inLanguage: "de-DE",
    publisher: {
      "@type": "Organization",
      name: company.legalName,
    },
  };
}

/* ──────────────────────────────────────────────
   Service-Schema für die Leistungsseite
   Hilft Google jede Leistung einzeln zu indexieren
   ────────────────────────────────────────────── */
export function servicePageSchema() {
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} Hannover`,
    description: service.detailIntro,
    provider: {
      "@type": "MovingCompany",
      name: company.legalName,
      url: company.website,
      telephone: company.phoneHref,
    },
    areaServed: [
      { "@type": "City", name: "Hannover" },
      { "@type": "AdministrativeArea", name: "Region Hannover" },
    ],
    serviceType: service.title,
    url: `${company.website}/leistungen#${service.id}`,
  }));
}

/* ──────────────────────────────────────────────
   FAQ-Schema — sehr wichtig für:
   - Google FAQ-Rich-Snippets
   - KI-Antworten (ChatGPT, Perplexity, Google AI)
   ────────────────────────────────────────────── */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

/* ──────────────────────────────────────────────
   Breadcrumb-Schema — verbessert SERP-Darstellung
   ────────────────────────────────────────────── */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
