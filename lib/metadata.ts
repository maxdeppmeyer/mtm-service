import type { Metadata } from "next";
import { company } from "@/lib/company";

export const homeMetadata: Metadata = {
  title: "MTM Möbel Transport Montage | Umzug, Transport & Entrümpelung in Hannover",
  description:
    "MTM unterstützt bei Umzug, Möbeltransport, Montage und Entrümpelung in Hannover & Umland. Jetzt unverbindlich anfragen.",
  alternates: { canonical: company.website },
  openGraph: {
    title: "MTM Möbel Transport Montage | Umzug, Transport & Entrümpelung in Hannover",
    description:
      "Zuverlässige Unterstützung für Umzug, Möbeltransport, Montage und Entrümpelung in Hannover & Umland.",
    type: "website",
    locale: "de_DE",
    url: company.website,
    siteName: company.brandName,
    images: [
      {
        url: "/images/og-mtm.webp",
        width: 1200,
        height: 630,
        alt: "Das Team von MTM Möbel Transport Montage vor den Firmenfahrzeugen",
      },
    ],
  },
};

export const servicesMetadata: Metadata = {
  title: "Leistungen im Detail",
  description:
    "Alle Leistungen von MTM im Überblick: Umzug, Möbeltransport, Montage, Entrümpelung und weitere passende Arbeiten in Hannover & Umland.",
  alternates: { canonical: `${company.website}/leistungen` },
  openGraph: {
    title: "Leistungen im Detail | MTM Möbel Transport Montage",
    description:
      "Übersicht der Leistungen von MTM für Hannover & Umland – klar, übersichtlich und direkt anfragbar.",
    type: "website",
    locale: "de_DE",
    url: `${company.website}/leistungen`,
    siteName: company.brandName,
    images: [
      {
        url: "/images/og-mtm.webp",
        width: 1200,
        height: 630,
        alt: "MTM Leistungen im Überblick",
      },
    ],
  },
};
