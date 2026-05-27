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
  area: "Hannover & Umland",
  address: {
    street: "Flüggestraße 19",
    postalCode: "30161",
    city: "Hannover",
    country: "Deutschland",
    countryCode: "DE",
  },
} as const;

export const navigation = [
  { label: "Start", href: "/" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Ablauf", href: "/#ablauf" },
  { label: "Anfrage", href: "/#anfrage" },
  { label: "Kontakt", href: "/#kontakt" },
] as const;

export type ServiceId = "umzug" | "moebeltransport" | "moebelmontage" | "entruempelung" | "sonstige";

export type ServiceEntry = {
  id: Exclude<ServiceId, "sonstige">;
  title: string;
  shortTitle: string;
  description: string;
  detailIntro: string;
  image: string;
  alt: string;
  highlights: string[];
  detailPoints: string[];
};

export const services: ServiceEntry[] = [
  {
    id: "umzug",
    title: "Umzug",
    shortTitle: "Umzüge",
    description:
      "Private und gewerbliche Umzüge mit sorgfältiger Planung, sicherem Transport und persönlicher Abstimmung.",
    detailIntro:
      "MTM unterstützt bei Wohnungs-, Haus-, Firmen- und Seniorenumzügen – zuverlässig, ordentlich und mit einem klaren Ablauf.",
    image: "/images/service-umzug.webp",
    alt: "Umzugskartons in einer Wohnung vor einem anstehenden Umzug",
    highlights: ["Privat- & Firmenumzüge", "Sicherer Transport", "Pünktliche Durchführung"],
    detailPoints: [
      "Sichere und termingerechte Umzüge im Raum Hannover & Umland",
      "Sorgfältiger Ab- und Aufbau nach Absprache",
      "Sauberer Transport von Möbeln, Kartons und Einrichtung",
      "Persönliche Rückmeldung und transparente Abstimmung",
    ],
  },
  {
    id: "moebeltransport",
    title: "Möbeltransport",
    shortTitle: "Transport",
    description:
      "Sicherer Möbeltransport für einzelne Stücke, komplette Einrichtungen oder größere Lieferungen.",
    detailIntro:
      "Wenn Möbel, Geräte oder Einrichtungsteile sicher von A nach B müssen, übernimmt MTM den Transport sorgfältig und termintreu.",
    image: "/images/service-transport.webp",
    alt: "MTM Mitarbeiter transportieren ein eingewickeltes Möbelstück in ein Fahrzeug",
    highlights: ["Einzelstücke & Lieferungen", "Schonender Transport", "Zuverlässige Termine"],
    detailPoints: [
      "Transport einzelner Möbelstücke oder kompletter Lieferungen",
      "Schonender Umgang mit Möbeln und empfindlichen Gegenständen",
      "Geeignet für Privatkunden, Gewerbe und Objekttransporte",
      "Auf Wunsch kombinierbar mit Tragehilfe oder Montage",
    ],
  },
  {
    id: "moebelmontage",
    title: "Möbelmontage",
    shortTitle: "Montage",
    description:
      "Professioneller Auf- und Abbau von Möbeln, Einrichtungen und ausgewählten Küchen- oder Schrankelementen.",
    detailIntro:
      "MTM kümmert sich um die fachgerechte Montage und Demontage von Möbeln – sauber, ordentlich und mit Blick auf eine sichere Nutzung.",
    image: "/images/service-montage.webp",
    alt: "Montagearbeit mit Akkuschrauber an einem Möbelstück",
    highlights: ["Auf- & Abbau", "Ordentliche Ausführung", "Passend zum Transport"],
    detailPoints: [
      "Aufbau und Demontage von Möbeln und Einrichtungselementen",
      "Sinnvolle Kombination mit Umzug oder Möbeltransport",
      "Ordentliche, saubere Arbeitsweise vor Ort",
      "Abstimmung zu Umfang, Besonderheiten und Termin im Vorfeld",
    ],
  },
  {
    id: "entruempelung",
    title: "Entrümpelung & Entsorgung",
    shortTitle: "Entrümpelung",
    description:
      "Räumungen von Wohnung, Keller, Garage oder Gewerbefläche – schnell, diskret und sauber durchgeführt.",
    detailIntro:
      "MTM schafft Platz bei Wohnungs-, Haus-, Keller- oder Garagenräumungen und übernimmt eine saubere, diskrete Abwicklung.",
    image: "/images/service-entruempelung.webp",
    alt: "Gefüllte Garage vor einer Entrümpelung",
    highlights: ["Wohnung, Keller & Garage", "Sortierung & Entsorgung", "Saubere Übergabe"],
    detailPoints: [
      "Entrümpelung von Wohnungen, Häusern, Kellern und Nebenräumen",
      "Sortierung, Ausräumung und Entsorgung nach Absprache",
      "Besenreine Übergabe bei passend vereinbartem Umfang",
      "Diskrete und verlässliche Durchführung im Raum Hannover & Umland",
    ],
  },
];

export const extraServices = [
  {
    title: "Entkernung",
    description:
      "Ausgewählte Entkernungsarbeiten nach persönlicher Prüfung und Abstimmung des Umfangs.",
    image: "/images/service-entkernung.webp",
    alt: "Innenraum im Zustand einer Renovierung und Entkernung",
    points: [
      "Entfernung von Böden, Wänden, Decken oder Einbauten nach Absprache",
      "Geeignet für Wohnungen, Häuser und ausgewählte Objekte",
      "Besichtigung und individuelle Abstimmung vorab",
    ],
  },
];

export function serviceTitle(serviceId: string): string {
  return services.find((service) => service.id === serviceId)?.title ?? "Sonstige Anfrage";
}

export function formattedAddress(): string {
  return `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;
}
