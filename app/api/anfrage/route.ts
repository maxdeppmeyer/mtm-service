import { NextResponse } from "next/server";
import { z } from "zod";
import { company, serviceTitle } from "@/lib/company";
import { buildInquiryEmailText, InquirySubmission } from "@/lib/inquiry";

const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxImages = 3;
const maxImageSize = 4 * 1024 * 1024;
const maxCombinedSize = 10 * 1024 * 1024;

const inquirySchema = z.object({
  source: z.enum(["klassisch", "assistent"]),
  service: z.string().min(1).max(60),
  name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen an.").max(120),
  phone: z.string().trim().min(5, "Bitte geben Sie Ihre Telefonnummer an.").max(60),
  email: z.string().trim().email("Bitte geben Sie eine gültige E-Mail-Adresse an.").max(160),
  startLocation: z.string().trim().max(240).optional(),
  destination: z.string().trim().max(240).optional(),
  preferredDate: z.string().trim().max(40).optional(),
  alternatePeriod: z.string().trim().max(160).optional(),
  urgency: z.string().trim().max(80).optional(),
  scope: z.string().trim().max(4000).optional(),
  conditions: z.string().trim().max(4000).optional(),
  message: z.string().trim().max(5000).optional(),
  callbackRequested: z.boolean(),
  privacyAccepted: z.literal(true, { error: "Bitte stimmen Sie der Datenschutzerklärung zu." }),
});

function stringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function truthyValue(formData: FormData, key: string) {
  const value = stringValue(formData, key);
  return value === "true" || value === "on";
}

function toBase64(bytes: ArrayBuffer) {
  const array = new Uint8Array(bytes);
  let binary = "";
  const chunk = 8192;
  for (let index = 0; index < array.length; index += chunk) {
    binary += String.fromCharCode(...array.subarray(index, index + chunk));
  }
  return btoa(binary);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    if (stringValue(formData, "companyWebsite")) {
      return NextResponse.json({ success: true });
    }

    const parsed = inquirySchema.safeParse({
      source: stringValue(formData, "source"),
      service: stringValue(formData, "service"),
      name: stringValue(formData, "name"),
      phone: stringValue(formData, "phone"),
      email: stringValue(formData, "email"),
      startLocation: stringValue(formData, "startLocation"),
      destination: stringValue(formData, "destination"),
      preferredDate: stringValue(formData, "preferredDate"),
      alternatePeriod: stringValue(formData, "alternatePeriod"),
      urgency: stringValue(formData, "urgency"),
      scope: stringValue(formData, "scope"),
      conditions: stringValue(formData, "conditions"),
      message: stringValue(formData, "message"),
      callbackRequested: truthyValue(formData, "callbackRequested"),
      privacyAccepted: truthyValue(formData, "privacyAccepted"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, code: "VALIDATION_ERROR", message: parsed.error.issues[0]?.message ?? "Bitte prüfen Sie Ihre Angaben." },
        { status: 400 },
      );
    }

    const uploads = formData.getAll("photos").filter((value): value is File => value instanceof File && value.size > 0);
    if (uploads.length > maxImages) {
      return NextResponse.json({ success: false, code: "FILE_LIMIT", message: "Bitte laden Sie höchstens drei Bilder hoch." }, { status: 400 });
    }

    let combinedSize = 0;
    for (const upload of uploads) {
      combinedSize += upload.size;
      if (!acceptedImageTypes.has(upload.type) || upload.size > maxImageSize) {
        return NextResponse.json({ success: false, code: "FILE_INVALID", message: "Bitte laden Sie nur JPG-, PNG- oder WEBP-Bilder mit maximal 4 MB je Datei hoch." }, { status: 400 });
      }
    }
    if (combinedSize > maxCombinedSize) {
      return NextResponse.json({ success: false, code: "FILE_LIMIT", message: "Die hochgeladenen Bilder sind zusammen zu groß. Bitte wählen Sie kleinere Dateien." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.INQUIRY_TO_EMAIL;
    const sender = process.env.INQUIRY_FROM_EMAIL;
    if (!apiKey || !recipient || !sender) {
      return NextResponse.json(
        {
          success: false,
          code: "NOT_CONFIGURED",
          message: `Der Online-Versand wird noch eingerichtet. Bitte kontaktieren Sie MTM direkt unter ${company.phoneDisplay} oder per E-Mail an ${company.email}.`,
        },
        { status: 503 },
      );
    }

    const data: InquirySubmission = parsed.data;
    const attachments = await Promise.all(
      uploads.map(async (upload) => ({
        filename: upload.name.replace(/[^a-zA-Z0-9äöüÄÖÜß._-]/g, "_"),
        content: toBase64(await upload.arrayBuffer()),
      })),
    );

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "mtm-service-website/1.0",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: data.email,
        subject: `Neue Anfrage: ${serviceTitle(data.service)} – ${data.name}`,
        text: buildInquiryEmailText(data),
        attachments,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, code: "SEND_ERROR", message: "Die Anfrage konnte momentan nicht übermittelt werden. Bitte rufen Sie direkt an." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, code: "SERVER_ERROR", message: "Die Anfrage konnte momentan nicht übermittelt werden. Bitte rufen Sie direkt an." }, { status: 500 });
  }
}
