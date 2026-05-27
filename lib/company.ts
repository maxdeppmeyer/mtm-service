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
  { label: "FAQ", href: "/faq" },
  { label: "Anfrage", href: "/#anfrage" },
  { label: "Kontakt", href: "/#kontakt" },
] as const;

export type ServiceId = "umzug" | "moebeltransport" | "moebelmontage" | "entruempelung" | "expresstransport" | "entkernung" | "sonstige";

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
      "Zuverlässige Unterstützung bei privaten und gewerblichen Umzügen – persönlich abgestimmt und sorgfältig durchgeführt.",
    detailIntro:
      "MTM begleitet Wohnungs-, Haus-, Firmen- und Seniorenumzüge in Hannover & Umland mit einem klaren Ablauf, verlässlicher Planung und persönlicher Abstimmung.",
    image: "/images/leistung-umzug-mtm-20260527-v4.webp",
    alt: "MTM Transportfahrzeug mit Firmenbranding im Einsatz",
    highlights: ["Privat- & Firmenumzüge", "Sorgfältige Planung", "Sichere Durchführung"],
    detailPoints: [
      "Unterstützung bei privaten und gewerblichen Umzügen",
      "Persönliche Rückmeldung und individuelle Abstimmung zum Ablauf",
      "Sicherer Transport von Möbeln, Kartons und Einrichtung",
      "Auf Wunsch kombinierbar mit Möbelmontage oder Räumung",
    ],
  },
  {
    id: "moebeltransport",
    title: "Möbeltransport",
    shortTitle: "Transport",
    description:
      "Sicherer Möbeltransport für einzelne Stücke, komplette Einrichtungen oder größere Lieferungen.",
    detailIntro:
      "Wenn Möbel, Geräte oder Einrichtungsteile sicher von A nach B müssen, übernimmt MTM den Transport sorgfältig, termintreu und passend zum Auftrag.",
    image: "/images/leistung-moebeltransport-mtm-20260527-v4.webp",
    alt: "MTM Mitarbeiter im beladenen Möbeltransport-Fahrzeug",
    highlights: ["Einzelstücke & Lieferungen", "Schonender Transport", "Zuverlässige Termine"],
    detailPoints: [
      "Transport einzelner Möbelstücke oder kompletter Lieferungen",
      "Schonender Umgang mit empfindlichen Gegenständen",
      "Geeignet für Privatkunden, Gewerbe und Objekttransporte",
      "Auf Wunsch kombinierbar mit Tragehilfe oder Montage",
    ],
  },
  {
    id: "moebelmontage",
    title: "Möbelmontage",
    shortTitle: "Montage",
    description:
      "Fachgerechter Auf- und Abbau von Möbeln, Einrichtungen und ausgewählten Schrank- oder Küchenelementen.",
    detailIntro:
      "MTM kümmert sich um die fachgerechte Montage und Demontage von Möbeln – sauber, ordentlich und mit Blick auf eine sichere Nutzung vor Ort.",
    image: "/images/leistung-moebelmontage-mtm-20260527-v4.webp",
    alt: "MTM Mitarbeiter bei der Montage eines Möbelstücks",
    highlights: ["Auf- & Abbau", "Saubere Ausführung", "Auch einzeln anfragbar"],
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
      "Räumungen von Wohnung, Keller, Garage oder Gewerbefläche – diskret und sauber durchgeführt.",
    detailIntro:
      "MTM schafft Platz bei Wohnungs-, Haus-, Keller- oder Garagenräumungen und übernimmt eine saubere, diskrete und verlässliche Abwicklung.",
    image: "/images/leistung-entruempelung-mtm-20260527-v4.webp",
    alt: "Leere Garage nach einer Räumung",
    highlights: ["Wohnung, Keller & Garage", "Sortierung & Entsorgung", "Saubere Übergabe"],
    detailPoints: [
      "Entrümpelung von Wohnungen, Häusern, Kellern und Nebenräumen",
      "Sortierung, Ausräumung und Entsorgung nach Absprache",
      "Besenreine Übergabe bei passend vereinbartem Umfang",
      "Diskrete und verlässliche Durchführung in Hannover & Umland",
    ],
  },
  {
    id: "expresstransport",
    title: "Expresstransporte",
    shortTitle: "Express",
    description:
      "3,5-Tonnen-LKW inkl. Fahrer für eilige Transporte – flexibel und kurzfristig anfragbar.",
    detailIntro:
      "Wenn es schnell gehen muss, bietet MTM Expresstransporte mit 3,5-Tonnen-LKW und Fahrer für dringende Fahrten, kurzfristige Lieferungen oder spontane Transportaufträge an.",
    image: "/images/leistung-expresstransport-mtm-20260527-v4.webp",
    alt: "MTM LKW bereit für einen kurzfristigen Transportauftrag",
    highlights: ["3,5-Tonnen-LKW", "Kurzfristig anfragbar", "Mit Fahrer"],
    detailPoints: [
      "Eilige Transporte mit 3,5-Tonnen-LKW inklusive Fahrer",
      "Geeignet für kurzfristige Lieferungen und zeitkritische Fahrten",
      "Schnelle Rückmeldung zur Verfügbarkeit und zum Ablauf",
      "Auch sinnvoll als Ergänzung zu Möbeltransporten oder Sonderfahrten",
    ],
  },
  {
    id: "entkernung",
    title: "Entkernung",
    shortTitle: "Entkernung",
    description:
      "Ausgewählte Entkernungsarbeiten nach persönlicher Prüfung und Abstimmung des Umfangs.",
    detailIntro:
      "Bei passenden Objekten kann MTM ausgewählte Entkernungsarbeiten nach vorheriger Besichtigung und klarer Abstimmung des Umfangs übernehmen.",
    image: "/images/leistung-entkernung-mtm-20260527-v4.webp",
    alt: "Innenraum während einer Entkernung und Sanierung",
    highlights: ["Nach Absprache", "Vorherige Prüfung", "Sauberer Rückbau"],
    detailPoints: [
      "Ausgewählte Rückbauarbeiten nach persönlicher Prüfung",
      "Mögliche Entfernung von Böden, Decken oder Einbauten nach Absprache",
      "Geeignet für passende Wohnungen, Häuser und Objekte",
      "Besichtigung und genaue Leistungsabstimmung vor der Durchführung",
    ],
  },
];

export function serviceTitle(serviceId: string): string {
  return services.find((service) => service.id === serviceId)?.title ?? "Sonstige Anfrage";
}

export function formattedAddress(): string {
  return `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;
}
