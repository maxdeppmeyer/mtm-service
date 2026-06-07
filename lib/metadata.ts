import type { Metadata } from "next";
import { company } from "@/lib/company";

const sharedImage = {
  url: "/images/og-team-mtm-20260527-v5.webp",
  width: 1200,
  height: 630,
  alt: "Das Team von MTM Möbel Transport Montage vor den Firmenfahrzeugen in Hannover",
};

/* ─── Startseite ─────────────────────────────────────────────────────────────
   Primary keyword: "Umzüge Hannover" | Secondary: "Umzugsunternehmen Hannover"
   Title unter 60 Zeichen, Description unter 160 Zeichen
   ─────────────────────────────────────────────────────────────────────────── */
export const homeMetadata: Metadata = {
  title: "Umzüge Hannover | MTM Möbel Transport Montage",
  description:
    "Professionelles Umzugsunternehmen in Hannover & Umland. MTM bietet Umzüge, Möbeltransport, Möbelmontage, Entrümpelung & Expresstransporte – persönlich, sorgfältig, regional.",
  keywords: [
    "Umzüge Hannover",
    "Umzugsunternehmen Hannover",
    "Umzug Hannover",
    "Möbeltransport Hannover",
    "Möbelmontage Hannover",
    "Entrümpelung Hannover",
    "Expresstransport Hannover",
    "Umzugsfirma Hannover",
    "Umzugshelfer Hannover",
    "MTM Möbel Transport Montage",
  ],
  alternates: { canonical: company.website },
  openGraph: {
    title: "Umzüge Hannover | MTM Möbel Transport Montage",
    description:
      "Ihr Umzugsunternehmen in Hannover & Umland. Umzüge, Möbeltransport, Montage, Entrümpelung und Expresstransporte – persönlich abgestimmt und zuverlässig.",
    type: "website",
    locale: "de_DE",
    url: company.website,
    siteName: company.brandName,
    images: [sharedImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umzüge Hannover | MTM Möbel Transport Montage",
    description:
      "Professionelles Umzugsunternehmen in Hannover & Umland – Umzüge, Transport, Montage und mehr.",
    images: [sharedImage.url],
  },
};

/* ─── Leistungen ──────────────────────────────────────────────────────────── */
export const servicesMetadata: Metadata = {
  title: "Leistungen: Umzug & Transport Hannover | MTM",
  description:
    "Alle Leistungen von MTM in Hannover: Umzug, Möbeltransport, Möbelmontage, Entrümpelung, Expresstransporte und Entkernung. Übersichtlich erklärt – direkt anfragbar.",
  keywords: [
    "Umzug Hannover",
    "Möbeltransport Hannover",
    "Möbelmontage Hannover",
    "Entrümpelung Hannover",
    "Entkernung Hannover",
    "Expresstransport Hannover",
    "Leistungen MTM Hannover",
  ],
  alternates: { canonical: `${company.website}/leistungen` },
  openGraph: {
    title: "Leistungen: Umzug & Transport Hannover | MTM",
    description:
      "Umzug, Möbeltransport, Möbelmontage, Entrümpelung und Expresstransporte in Hannover & Umland von MTM – alle Leistungen übersichtlich.",
    type: "website",
    locale: "de_DE",
    url: `${company.website}/leistungen`,
    siteName: company.brandName,
    images: [sharedImage],
  },
};

/* ─── Über uns ────────────────────────────────────────────────────────────── */
export const aboutMetadata: Metadata = {
  title: "Über MTM – Umzugsunternehmen Hannover",
  description:
    "Das Team von MTM Möbel Transport Montage in Hannover. 4,9 von 5 Sternen bei Google. Einblicke in Arbeit, Fahrzeuge und echte Kundenstimmen.",
  keywords: [
    "MTM Hannover Team",
    "Umzugsunternehmen Hannover Bewertungen",
    "MTM Möbel Transport Montage Team",
  ],
  alternates: { canonical: `${company.website}/ueber-uns` },
  openGraph: {
    title: "Über MTM – Umzugsunternehmen Hannover",
    description:
      "Einblicke in die Arbeit von MTM in Hannover – Team, Fahrzeuge und Google-Bewertungen mit 4,9 von 5 Sternen.",
    type: "website",
    locale: "de_DE",
    url: `${company.website}/ueber-uns`,
    siteName: company.brandName,
    images: [sharedImage],
  },
};

/* ─── Kontakt ─────────────────────────────────────────────────────────────── */
export const contactMetadata: Metadata = {
  title: "Kontakt – Umzugsunternehmen Hannover | MTM",
  description:
    "MTM Möbel Transport Montage in Hannover direkt kontaktieren. Telefon, E-Mail und Einsatzgebiet im Überblick. Unverbindliche Anfrage jederzeit möglich.",
  keywords: [
    "MTM Hannover Kontakt",
    "Umzugsfirma Hannover Telefon",
    "Umzug Hannover anfragen",
  ],
  alternates: { canonical: `${company.website}/kontakt` },
  openGraph: {
    title: "Kontakt – Umzugsunternehmen Hannover | MTM",
    description:
      "Telefon, E-Mail und Einsatzgebiet von MTM in Hannover. Jetzt unverbindlich anfragen.",
    type: "website",
    locale: "de_DE",
    url: `${company.website}/kontakt`,
    siteName: company.brandName,
    images: [sharedImage],
  },
};
