import type { Metadata } from "next";
import { company } from "@/lib/company";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Häufige Fragen zu Umzug, Möbeltransport, Möbelmontage, Entrümpelung, Expresstransporten sowie zum Ablauf bei MTM in Hannover & Umland.",
  alternates: { canonical: `${company.website}/faq` },
};

export default function FaqPage() {
  return <FaqClient />;
}
