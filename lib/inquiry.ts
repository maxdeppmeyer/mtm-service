import { serviceTitle } from "@/lib/company";

export type InquirySource = "klassisch" | "assistent";

export type InquirySubmission = {
  source: InquirySource;
  service: string;
  name: string;
  phone: string;
  email: string;
  startLocation?: string;
  destination?: string;
  preferredDate?: string;
  alternatePeriod?: string;
  urgency?: string;
  scope?: string;
  conditions?: string;
  message?: string;
  callbackRequested: boolean;
};

export function buildInquiryEmailText(data: InquirySubmission): string {
  return [
    "Neue unverbindliche Anfrage über die MTM-Webseite",
    "",
    `Quelle: ${data.source === "assistent" ? "Digitaler Anfrage-Assistent" : "Klassisches Formular"}`,
    `Leistung: ${serviceTitle(data.service)}`,
    `Name: ${data.name}`,
    `Telefon: ${data.phone}`,
    `E-Mail: ${data.email}`,
    `Rückruf gewünscht: ${data.callbackRequested ? "Ja" : "Nein"}`,
    "",
    `Einsatzort / Startadresse: ${data.startLocation || "–"}`,
    `Zieladresse: ${data.destination || "–"}`,
    `Wunschtermin: ${data.preferredDate || "–"}`,
    `Alternativer Zeitraum: ${data.alternatePeriod || "–"}`,
    `Dringlichkeit: ${data.urgency || "–"}`,
    "",
    "Umfang:",
    data.scope || "–",
    "",
    "Bedingungen / Zusatzleistungen:",
    data.conditions || "–",
    "",
    "Nachricht:",
    data.message || "–",
    "",
    "Hinweis: Dies ist eine unverbindliche Anfrage. Preis, Termin und Auftragsannahme müssen persönlich geprüft und bestätigt werden.",
  ].join("\n");
}
