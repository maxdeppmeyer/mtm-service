import type { Metadata } from "next";
import { company } from "@/lib/company";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "FAQ-Bereiche zu Umzug, Möbeltransport, Montage, Entrümpelung, Entkernung, Expresstransporten und zum Ablauf bei MTM in Hannover & Umland.",
  alternates: { canonical: `${company.website}/faq` },
};

export default function FaqPage() {
  return <FaqClient />;
}
