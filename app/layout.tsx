import type { Metadata, Viewport } from "next";
import "./globals.css";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  metadataBase: new URL(company.website),
  title: {
    default: "MTM Möbel Transport Montage | Umzug, Transport & Entrümpelung in Hannover",
    template: "%s | MTM Möbel Transport Montage",
  },
  description:
    "MTM unterstützt bei Umzug, Möbeltransport, Montage, Expresstransport und Entrümpelung in Hannover & Umland. Jetzt unverbindlich anfragen.",
  applicationName: company.brandName,
  formatDetection: { telephone: true, email: true, address: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#d81c2d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
