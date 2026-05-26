export const company = {
  legalName: "MTM Möbel Transport Montage",
  brandName: "MTM – Möbel Transport Montage",
  owner: "Tim Precan",
  vatId: "DE338555383",
  website: "https://www.mtm-service.de",
  domain: "www.mtm-service.de",
  email: "info@mtm-service.de",
  phoneDisplay: "0511 / 60978240",
  phoneHref: "+4951160978240",
  area: "Hannover, Isernhagen und Umgebung",
  address: {
    street: "Flüggestraße 19",
    postalCode: "30161",
    city: "Hannover",
    country: "Deutschland",
    countryCode: "DE",
  },
} as const;

export const navigation = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Anfrage", href: "#anfrage" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export type ServiceId =
  | "umzug"
  | "moebeltransport"
  | "moebelmontage"
  | "entruempelung"
  | "sonstige";

export const services: Array<{
  id: ServiceId;
  title: string;
  description: string;
  image: string;
  alt: string;
}> = [
  {
    id: "umzug",
    title: "Umzug",
    description:
      "Unterstützung bei privaten und gewerblichen Umzügen – zuverlässig organisiert und sorgfältig durchgeführt.",
    image: "/images/hero-einsatz.webp",
    alt: "MTM Transportfahrzeug bei einem Umzugseinsatz in Hannover",
  },
  {
    id: "moebeltransport",
    title: "Möbeltransport",
    description:
      "Sicherer Transport einzelner Möbelstücke, Haushaltsgeräte oder größerer Lieferungen.",
    image: "/images/transportauftrag.webp",
    alt: "Gesicherte Transportladung im MTM Fahrzeug",
  },
  {
    id: "moebelmontage",
    title: "Möbelmontage",
    description:
      "Professioneller Auf- und Abbau von Möbeln und Einrichtungen.",
    image: "/images/moebelmontage.webp",
    alt: "Fertig montiertes Sofa nach einer Möbelmontage",
  },
  {
    id: "entruempelung",
    title: "Entrümpelung & Entsorgung",
    description:
      "Schnelle Räumung von Wohnung, Keller oder Gewerbefläche mit sauberer Abwicklung.",
    image: "/images/entruempelung.webp",
    alt: "Geräumte Garage nach einer Entrümpelung",
  },
];

export function serviceTitle(serviceId: string): string {
  return services.find((service) => service.id === serviceId)?.title ?? "Sonstige Anfrage";
}

export function formattedAddress(): string {
  return `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;
}
