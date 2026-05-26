import type { Metadata, Viewport } from "next";
import "./globals.css";
import { company } from "@/lib/company";


export const metadata: Metadata = {
  metadataBase: new URL(company.website),
  title: {
    default: "MTM Möbel Transport Montage | Umzug & Möbeltransport Hannover",
    template: "%s | MTM Möbel Transport Montage",
  },
  description:
    "MTM unterstützt Sie bei Umzug, Möbeltransport, Montage und Entrümpelung in Hannover und Umgebung. Jetzt kostenlos Anfrage senden.",
  applicationName: company.brandName,
  formatDetection: { telephone: true, email: true, address: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#102b43",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
