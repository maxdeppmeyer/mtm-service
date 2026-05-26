import type { Metadata } from "next";
import { company } from "@/lib/company";

export const homeMetadata: Metadata = {
  title: "MTM Möbel Transport Montage | Umzug & Möbeltransport Hannover",
  description:
    "MTM unterstützt Sie bei Umzug, Möbeltransport, Montage und Entrümpelung in Hannover und Umgebung. Jetzt kostenlos Anfrage senden.",
  alternates: { canonical: company.website },
  openGraph: {
    title: "MTM Möbel Transport Montage | Umzug & Möbeltransport Hannover",
    description:
      "Umzug, Möbeltransport, Montage und Entrümpelung in Hannover, Isernhagen und Umgebung. Jetzt unverbindlich anfragen.",
    type: "website",
    locale: "de_DE",
    url: company.website,
    siteName: company.brandName,
    images: [
      {
        url: "/images/og-mtm.webp",
        width: 1200,
        height: 630,
        alt: "Das Team von MTM Möbel Transport Montage mit Fahrzeugen",
      },
    ],
  },
};
