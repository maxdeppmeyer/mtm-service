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
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "FAQ", href: "/faq" },
] as const;

export type ServiceId = "umzug" | "moebeltransport" | "moebelmontage" | "entruempelung" | "expresstransport" | "sonstige";

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
    image: "/images/leistung-umzug-mtm-20260527-v5.webp",
    alt: "MTM Transportfahrzeug mit Firmenbranding im Einsatz",
    highlights: ["Privat- & Firmenumzüge", "Sorgfältige Planung", "Sichere Durchführung"],
    detailPoints: [
      "Unterstützung bei privaten, gewerblichen und seniorengerechten Umzügen",
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
    image: "/images/leistung-moebeltransport-mtm-20260528-v6.webp",
    alt: "MTM Team mit Transportfahrzeugen und einem verpackten Möbelstück beim Einsatz",
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
    image: "/images/leistung-moebelmontage-mtm-20260528-v6.webp",
    alt: "MTM Mitarbeiter bei einer Möbel- und Badmontage in einem Innenraum",
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
      "Räumungen von Wohnung, Keller, Garage oder Gewerbefläche – schnell, diskret und sauber durchgeführt.",
    detailIntro:
      "MTM schafft Platz bei Wohnungs-, Haus-, Keller- oder Garagenräumungen und übernimmt eine saubere, diskrete und verlässliche Abwicklung.",
    image: "/images/leistung-entruempelung-mtm-20260527-v5.webp",
    alt: "Räumungsobjekt mit Möbeln und Gegenständen vor einer Entrümpelung",
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
      "3,5-Tonnen-LKW inkl. Fahrer für eilige Transporte – flexibel, kurzfristig und jederzeit anfragbar.",
    detailIntro:
      "Wenn es schnell gehen muss, bietet MTM Expresstransporte mit 3,5-Tonnen-LKW und Fahrer für dringende Fahrten, kurzfristige Lieferungen oder spontane Transportaufträge an.",
    image: "/images/leistung-expresstransport-mtm-20260527-v5.webp",
    alt: "MTM Fahrzeug beim Beladen für einen kurzfristigen Transportauftrag",
    highlights: ["3,5-Tonnen-LKW", "Kurzfristig anfragbar", "Mit Fahrer"],
    detailPoints: [
      "Eilige Transporte mit 3,5-Tonnen-LKW inklusive Fahrer",
      "Geeignet für kurzfristige Lieferungen und zeitkritische Fahrten",
      "Schnelle Rückmeldung zur Verfügbarkeit und zum Ablauf",
      "Auch sinnvoll als Ergänzung zu Möbeltransporten oder Sonderfahrten",
    ],
  },
];

export const extraServices = [
  {
    title: "Entkernung",
    description:
      "Ausgewählte Entkernungsarbeiten nach persönlicher Prüfung und Abstimmung des Umfangs.",
    image: "/images/leistung-entkernung-mtm-20260527-v7.webp",
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
