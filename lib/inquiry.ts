import { company, serviceTitle } from "@/lib/company";

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

/* ─── E-Mail an MTM (Eingehende Anfrage) ─── */

export function buildInquiryEmailText(data: InquirySubmission): string {
  return [
    "Neue unverbindliche Anfrage über die MTM-Webseite",
    "",
    `Quelle: ${data.source === "assistent" ? "Anfrage-Assistent" : "Klassisches Formular"}`,
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

/* ─── Bestätigungs-E-Mail an den Kunden ─── */

export function buildConfirmationEmailText(data: InquirySubmission): string {
  const lines: string[] = [
    `Guten Tag ${data.name},`,
    "",
    "vielen Dank für Ihre Anfrage bei MTM Möbel Transport Montage!",
    "",
    "Wir haben Ihre Anfrage erhalten und melden uns so schnell wie möglich bei Ihnen,",
    "um alle Details persönlich zu besprechen.",
    ...(data.callbackRequested
      ? [
          "",
          "Sie haben einen Rückruf gewünscht – wir werden Sie telefonisch kontaktieren.",
        ]
      : []),
    "",
    "──────────────────────────────────────",
    "Ihre Anfrage im Überblick",
    "──────────────────────────────────────",
    `Leistung:       ${serviceTitle(data.service)}`,
    ...(data.startLocation
      ? [`Einsatzort:     ${data.startLocation}`]
      : []),
    ...(data.destination
      ? [`Zieladresse:    ${data.destination}`]
      : []),
    ...(data.preferredDate
      ? [`Wunschtermin:   ${data.preferredDate}`]
      : []),
    ...(data.scope
      ? ["", "Ihr Anliegen:", data.scope]
      : []),
    "",
    "──────────────────────────────────────",
    "",
    "Bei dringenden Fragen erreichen Sie uns jederzeit direkt:",
    "",
    `  Telefon:  ${company.phoneDisplay}`,
    `  E-Mail:   ${company.email}`,
    `  Web:      ${company.domain}`,
    "",
    "Mit freundlichen Grüßen",
    "Ihr MTM-Team",
    "",
    "MTM Möbel Transport Montage",
    `${company.address.street}, ${company.address.postalCode} ${company.address.city}`,
    "",
    "──────────────────────────────────────",
    "Diese E-Mail ist eine automatische Eingangsbestätigung Ihrer unverbindlichen",
    "Anfrage. Preis, Termin und Auftragsannahme werden nach persönlicher Prüfung",
    "durch unser Team mitgeteilt.",
  ];
  return lines.join("\n");
}
