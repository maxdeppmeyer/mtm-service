import type { Metadata } from "next";
import { company } from "@/lib/company";
import RatgeberClient from "./RatgeberClient";

export const metadata: Metadata = {
  title: "Ratgeber",
  description:
    "Ratgeber zu Umzug, Möbeltransport, Montage, Entrümpelung und Entkernung in Hannover – Kosten, Abläufe und praktische Tipps von MTM Service.",
  alternates: { canonical: `${company.website}/ratgeber` },
};

export default function RatgeberPage() {
  return <RatgeberClient />;
}
