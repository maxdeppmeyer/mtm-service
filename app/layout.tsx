import type { Metadata, Viewport } from "next";
import "./globals.css";
import { company } from "@/lib/company";
import { FloatingCTA } from "@/components/FloatingCTA";

export const metadata: Metadata = {
  metadataBase: new URL(company.website),
  title: {
    default: "Umzüge Hannover | MTM Möbel Transport Montage",
    template: "%s | MTM Möbel Transport Montage",
  },
  description:
    "Professionelles Umzugsunternehmen in Hannover & Umland. MTM bietet Umzüge, Möbeltransport, Möbelmontage, Entrümpelung & Expresstransporte – persönlich und regional.",
  applicationName: company.brandName,
  formatDetection: { telephone: true, email: true, address: true },
  icons: { icon: "/icon.svg" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#d81c2d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="antialiased">
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
