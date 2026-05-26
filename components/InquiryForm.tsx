"use client";

import Link from "next/link";
import { CheckCircle2, Info, Mail, Phone, Upload } from "lucide-react";
import { company, ServiceId, services } from "@/lib/company";
import { FormEvent, useRef, useState } from "react";

type FormStatus =
  | { type: "idle" }
  | { type: "sending" }
  | { type: "success"; message: string }
  | { type: "not-configured"; message: string }
  | { type: "error"; message: string };

export function InquiryForm({ selectedService, onServiceChange }: { selectedService: ServiceId; onServiceChange: (service: ServiceId) => void }) {
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "sending" });
    const data = new FormData(event.currentTarget);
    data.set("source", "klassisch");
    data.set("service", selectedService);

    try {
      const response = await fetch("/api/anfrage", { method: "POST", body: data });
      const result = (await response.json()) as { success?: boolean; code?: string; message?: string };
      if (response.ok && result.success) {
        setStatus({ type: "success", message: "Vielen Dank für Ihre Anfrage. Ihre Angaben wurden übermittelt und werden persönlich geprüft." });
        formRef.current?.reset();
        return;
      }
      if (result.code === "NOT_CONFIGURED") {
        setStatus({ type: "not-configured", message: result.message ?? "Der Online-Versand wird aktuell eingerichtet." });
        return;
      }
      setStatus({ type: "error", message: result.message ?? "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie direkt an." });
    } catch {
      setStatus({ type: "error", message: "Die Anfrage konnte nicht gesendet werden. Bitte rufen Sie direkt an oder schreiben Sie eine E-Mail." });
    }
  }

  return (
    <form ref={formRef} onSubmit={submitInquiry} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="service">Gewünschte Leistung</label>
          <select id="service" name="service" className="field" value={selectedService} onChange={(event) => onServiceChange(event.target.value as ServiceId)} required>
            {services.map((option) => <option key={option.id} value={option.id}>{option.title}</option>)}
            <option value="sonstige">Sonstige Anfrage</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="name">Name</label>
          <input className="field" id="name" name="name" autoComplete="name" required />
        </div>
        <div>
          <label className="label" htmlFor="phone">Telefonnummer</label>
          <input className="field" id="phone" name="phone" type="tel" autoComplete="tel" required />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="email">E-Mail-Adresse</label>
          <input className="field" id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label className="label" htmlFor="startLocation">Einsatzort / Startadresse</label>
          <input className="field" id="startLocation" name="startLocation" autoComplete="street-address" required />
        </div>
        <div>
          <label className="label" htmlFor="destination">Zieladresse <span className="text-slate-400">(falls erforderlich)</span></label>
          <input className="field" id="destination" name="destination" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="preferredDate">Wunschtermin</label>
          <input className="field" id="preferredDate" name="preferredDate" type="date" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="message">Beschreibung des Auftrags</label>
          <textarea className="field min-h-32 resize-y" id="message" name="message" placeholder="Was soll transportiert, montiert oder geräumt werden? Gibt es Etagen, schwere Gegenstände oder Besonderheiten?" required />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="photos">Fotos hochladen <span className="text-slate-400">(optional, max. 3 Bilder)</span></label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-600 transition hover:border-accent hover:bg-orange-50">
            <Upload size={19} className="text-accent-dark" />
            <span>Fotos auswählen: JPG, PNG oder WEBP, je maximal 4 MB</span>
            <input id="photos" name="photos" type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" />
          </label>
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="companyWebsite">Webseite</label>
          <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="sm:col-span-2 flex items-start gap-3 text-sm text-slate-700">
          <input name="callbackRequested" value="true" type="checkbox" className="checkbox mt-0.5" />
          Ich wünsche einen Rückruf.
        </label>
        <label className="sm:col-span-2 flex items-start gap-3 text-sm leading-6 text-slate-700">
          <input name="privacyAccepted" value="true" type="checkbox" className="checkbox mt-1" required />
          <span>Ich habe die <Link href="/datenschutz" className="font-semibold text-navy underline decoration-accent underline-offset-2">Datenschutzerklärung</Link> gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.</span>
        </label>
      </div>
      <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-slate-500"><Info size={16} className="mt-1 shrink-0" />Ihre Anfrage ist unverbindlich. Preis, Termin und Auftragsannahme werden persönlich geprüft.</p>
      {status.type !== "idle" && status.type !== "sending" && (
        <div role="status" className={`mt-5 rounded-xl px-4 py-4 text-sm leading-6 ${status.type === "success" ? "bg-emerald-50 text-emerald-800" : status.type === "not-configured" ? "bg-amber-50 text-amber-900" : "bg-red-50 text-red-800"}`}>
          <p className="flex items-start gap-2">{status.type === "success" ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <Info size={18} className="mt-0.5 shrink-0" />}{status.message}</p>
          {status.type === "not-configured" && (
            <div className="mt-3 flex flex-wrap gap-3">
              <a href={`tel:${company.phoneHref}`} className="inline-flex items-center gap-2 font-semibold underline"><Phone size={15} />Jetzt anrufen</a>
              <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 font-semibold underline"><Mail size={15} />E-Mail schreiben</a>
            </div>
          )}
        </div>
      )}
      <button type="submit" className="button-primary mt-6 w-full justify-center py-4" disabled={status.type === "sending"}>
        {status.type === "sending" ? "Anfrage wird gesendet …" : "Kostenlos Anfrage senden"}
      </button>
    </form>
  );
}
