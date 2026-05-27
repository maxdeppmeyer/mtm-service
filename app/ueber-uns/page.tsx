import type { Metadata } from "next";
import UeberUnsClient from "./UeberUnsClient";
import { aboutMetadata } from "@/lib/metadata";

export const metadata: Metadata = aboutMetadata;

export default function UeberUnsPage() {
  return <UeberUnsClient />;
}
