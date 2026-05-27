"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Info, Phone, Upload, X } from "lucide-react";
import { company, ServiceId, services, serviceTitle } from "@/lib/company";
import { FormEvent, useEffect, useRef, useState } from "react";

type AssistantData = {
  service: ServiceId;
  startLocation: string;
  destination: string;
  preferredDate: string;
  alternatePeriod: string;
  urgency: string;
  scope: string;
  floors: string;
  elevator: string;
  parking: string;
  additionalServices: string[];
  conditionsNote: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  callbackRequested: boolean;
  privacyAccepted: boolean;
};

type SubmitState = "idle" | "sending" | "success" | "not-configured" | "error";

const storageKey = "mtm-inquiry-assistant";
const initialData: AssistantData = {
  service: "umzug",
  startLocation: "",
  destination: "",
  preferredDate: "",
  alternatePeriod: "",
  urgency: "flexibel",
  scope: "",
  floors: "",
  elevator: "",
  parking: "",
  additionalServices: [],
  conditionsNote: "",
  name: "",
  phone: "",
  email: "",
  message: "",
  callbackRequested: false,
  privacyAccepted: false,
};

const steps = ["Leistung", "Ort", "Termin", "Umfang", "Bedingungen", "Kontakt", "Prüfen"];
const additionalOptions = ["Abbau erforderlich", "Aufbau erforderlich", "Entsorgung erforderlich", "Schwere Gegenstände"];

function conditionsSummary(data: AssistantData): string {
  return [
    data.floors && `Etage: ${data.floors}`,
    data.elevator && `Aufzug: ${data.elevator}`,
    data.parking && `Parksituation: ${data.parking}`,
    data.additionalServices.length > 0 && `Zusatzleistungen: ${data.additionalServices.join(", ")}`,
    data.conditionsNote,
  ].filter(Boolean).join("\n");
}

export function InquiryAssistant({ open, defaultService, onServiceChange, onClose }: { open: boolean; defaultService: ServiceId; onServiceChange: (service: ServiceId) => void; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AssistantData>(() => {
    if (typeof window === "undefined") return { ...initialData, service: defaultService };
    try {
      const saved = sessionStorage.getItem(storageKey);
      return saved ? { ...initialData, ...(JSON.parse(saved) as AssistantData), service: defaultService } : { ...initialData, service: defaultService };
    } catch {
      sessionStorage.removeItem(storageKey);
      return { ...initialData, service: defaultService };
    }
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  function setField<K extends keyof AssistantData>(key: K, value: AssistantData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function toggleAdditional(value: string) {
    setData((current) => ({
      ...current,
      additionalServices: current.additionalServices.includes(value)
        ? current.additionalServices.filter((entry) => entry !== value)
        : [...current.additionalServices, value],
    }));
  }

  function canContinue() {
    if (step === 0) return Boolean(data.service);
    if (step === 1) return Boolean(data.startLocation.trim()) && (data.service !== "umzug" && data.service !== "moebeltransport" ? true : Boolean(data.destination.trim()));
    if (step === 2) return Boolean(data.preferredDate || data.alternatePeriod.trim());
    if (step === 3) return Boolean(data.scope.trim());
    if (step === 5) return Boolean(data.name.trim() && data.phone.trim() && data.email.trim() && data.privacyAccepted);
    return true;
  }

  function continueStep() {
    if (canContinue()) setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function submitAssistant(event: FormEvent) {
    event.preventDefault();
    setSubmitState("sending");
    setMessage("");
    const payload = new FormData();
    payload.set("source", "assistent");
    payload.set("service", data.service);
    payload.set("startLocation", data.startLocation);
    payload.set("destination", data.destination);
    payload.set("preferredDate", data.preferredDate);
    payload.set("alternatePeriod", data.alternatePeriod);
    payload.set("urgency", data.urgency);
    payload.set("scope", data.scope);
    payload.set("conditions", conditionsSummary(data));
    payload.set("name", data.name);
    payload.set("phone", data.phone);
    payload.set("email", data.email);
    payload.set("message", data.message);
    payload.set("callbackRequested", String(data.callbackRequested));
    payload.set("privacyAccepted", String(data.privacyAccepted));
    photos.forEach((photo) => payload.append("photos", photo));
    try {
      const response = await fetch("/api/anfrage", { method: "POST", body: payload });
      const result = (await response.json()) as { success?: boolean; code?: string; message?: string };
      if (response.ok && result.success) {
        setSubmitState("success");
        setMessage("Vielen Dank für Ihre Anfrage. Ihre Angaben wurden übermittelt und werden persönlich geprüft.");
        sessionStorage.removeItem(storageKey);
        return;
      }
      if (result.code === "NOT_CONFIGURED") {
        setSubmitState("not-configured");
        setMessage(result.message ?? "Der Online-Versand wird aktuell eingerichtet.");
        return;
      }
      setSubmitState("error");
      setMessage(result.message ?? "Die Anfrage konnte nicht gesendet werden.");
    } catch {
      setSubmitState("error");
      setMessage("Die Anfrage konnte nicht gesendet werden. Bitte rufen Sie direkt an.");
    }
  }

  function resetAssistant() {
    setData({ ...initialData, service: defaultService });
    onServiceChange(defaultService);
    setPhotos([]);
    setStep(0);
    setSubmitState("idle");
    setMessage("");
    sessionStorage.removeItem(storageKey);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="assistant-title" className="flex max-h-[96svh] w-full max-w-2xl flex-col rounded-t-[1.75rem] bg-white shadow-2xl outline-none sm:max-h-[92vh] sm:rounded-[1.75rem]">
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-accent-dark">Anfrage-Assistent</p>
            <h2 id="assistant-title" className="text-xl font-bold text-navy">In wenigen Schritten zur Anfrage</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Anfrage-Assistent schließen"><X size={22} /></button>
        </div>
        {submitState === "success" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-7 py-16 text-center">
            <CheckCircle2 className="text-emerald-600" size={48} />
            <h3 className="text-2xl font-bold text-navy">Anfrage übermittelt</h3>
            <p className="max-w-md text-slate-600">{message}</p>
            <button type="button" onClick={() => { resetAssistant(); onClose(); }} className="button-primary">Schließen</button>
          </div>
        ) : (
          <form onSubmit={submitAssistant} className="flex min-h-0 flex-1 flex-col">
            <div className="px-5 pt-5 sm:px-7">
              <div className="flex items-center justify-between text-sm font-medium text-slate-500">
                <span>Schritt {step + 1} von {steps.length}</span>
                <span>{steps[step]}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-accent transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-7 sm:px-7">
              {step === 0 && (
                <div>
                  <h3 className="wizard-heading">Hallo, ich helfe Ihnen dabei, Ihre Anfrage schnell vorzubereiten.</h3>
                  <p className="wizard-text">Wobei benötigen Sie Unterstützung?</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[...services, { id: "sonstige" as ServiceId, title: "Sonstige Anfrage", description: "Beschreiben Sie Ihr Anliegen individuell.", image: "", alt: "" }].map((service) => (
                      <button key={service.id} type="button" onClick={() => { setField("service", service.id); onServiceChange(service.id); }} className={`rounded-xl border p-4 text-left transition ${data.service === service.id ? "border-accent bg-rose-50 ring-2 ring-rose-100" : "border-slate-200 hover:border-slate-300"}`}>
                        <span className="font-semibold text-navy">{service.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 1 && (
                <div>
                  <h3 className="wizard-heading">Wo findet der Auftrag statt?</h3>
                  <p className="wizard-text">Für {serviceTitle(data.service)} benötigen wir die wichtigsten Ortsangaben.</p>
                  <div className="mt-6 space-y-4">
                    <div><label className="label" htmlFor="wizard-start">{data.service === "moebelmontage" || data.service === "entruempelung" ? "Einsatzort" : "Startort"}</label><input id="wizard-start" className="field" value={data.startLocation} onChange={(event) => setField("startLocation", event.target.value)} required /></div>
                    {(data.service === "umzug" || data.service === "moebeltransport") && <div><label className="label" htmlFor="wizard-destination">Zielort</label><input id="wizard-destination" className="field" value={data.destination} onChange={(event) => setField("destination", event.target.value)} required /></div>}
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h3 className="wizard-heading">Wann soll der Auftrag erfolgen?</h3>
                  <div className="mt-6 space-y-4">
                    <div><label className="label" htmlFor="wizard-date">Wunschtermin</label><input id="wizard-date" className="field" type="text" placeholder="TT.MM.JJJJ oder Zeitraum" value={data.preferredDate} onChange={(event) => setField("preferredDate", event.target.value)} /></div>
                    <div><label className="label" htmlFor="wizard-alternative">Alternativer Zeitraum</label><input id="wizard-alternative" className="field" placeholder="z. B. innerhalb der nächsten zwei Wochen" value={data.alternatePeriod} onChange={(event) => setField("alternatePeriod", event.target.value)} /></div>
                    <div><label className="label" htmlFor="wizard-urgency">Dringlichkeit</label><select id="wizard-urgency" className="field" value={data.urgency} onChange={(event) => setField("urgency", event.target.value)}><option value="flexibel">Flexibel</option><option value="zeitnah">Zeitnah</option><option value="dringend">Dringend</option></select></div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h3 className="wizard-heading">Wie groß ist der Umfang?</h3>
                  <p className="wizard-text">Nennen Sie die wichtigsten Gegenstände, Räume, Kartons oder Montagearbeiten.</p>
                  <div className="mt-6"><label className="label" htmlFor="wizard-scope">Beschreibung des Umfangs</label><textarea id="wizard-scope" className="field min-h-40" placeholder={data.service === "entruempelung" ? "z. B. Kellerraum mit Möbeln, Kartons und Restmüll" : "z. B. Sofa, Schrank, 20 Kartons oder 3-Zimmer-Wohnung"} value={data.scope} onChange={(event) => setField("scope", event.target.value)} required /></div>
                </div>
              )}
              {step === 4 && (
                <div>
                  <h3 className="wizard-heading">Welche Bedingungen gibt es vor Ort?</h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div><label className="label" htmlFor="wizard-floor">Etage</label><input id="wizard-floor" className="field" placeholder="z. B. 2. OG" value={data.floors} onChange={(event) => setField("floors", event.target.value)} /></div>
                    <div><label className="label" htmlFor="wizard-elevator">Aufzug vorhanden?</label><select id="wizard-elevator" className="field" value={data.elevator} onChange={(event) => setField("elevator", event.target.value)}><option value="">Bitte auswählen</option><option value="Ja">Ja</option><option value="Nein">Nein</option><option value="Unklar">Unklar</option></select></div>
                    <div className="sm:col-span-2"><label className="label" htmlFor="wizard-parking">Parksituation / Laufweg</label><input id="wizard-parking" className="field" placeholder="z. B. Stellplatz direkt vor dem Eingang" value={data.parking} onChange={(event) => setField("parking", event.target.value)} /></div>
                  </div>
                  <p className="label mt-5">Zusatzleistungen</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {additionalOptions.map((option) => <label key={option} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm"><input type="checkbox" className="checkbox" checked={data.additionalServices.includes(option)} onChange={() => toggleAdditional(option)} />{option}</label>)}
                  </div>
                  <div className="mt-4"><label className="label" htmlFor="wizard-conditions-note">Weitere Hinweise</label><textarea id="wizard-conditions-note" className="field min-h-24" value={data.conditionsNote} onChange={(event) => setField("conditionsNote", event.target.value)} /></div>
                </div>
              )}
              {step === 5 && (
                <div>
                  <h3 className="wizard-heading">Wie kann MTM Sie erreichen?</h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div><label className="label" htmlFor="wizard-name">Name</label><input id="wizard-name" className="field" autoComplete="name" value={data.name} onChange={(event) => setField("name", event.target.value)} required /></div>
                    <div><label className="label" htmlFor="wizard-phone">Telefonnummer</label><input id="wizard-phone" className="field" type="tel" autoComplete="tel" value={data.phone} onChange={(event) => setField("phone", event.target.value)} required /></div>
                    <div className="sm:col-span-2"><label className="label" htmlFor="wizard-email">E-Mail-Adresse</label><input id="wizard-email" className="field" type="email" autoComplete="email" value={data.email} onChange={(event) => setField("email", event.target.value)} required /></div>
                    <div className="sm:col-span-2"><label className="label" htmlFor="wizard-message">Optionale Nachricht</label><textarea id="wizard-message" className="field min-h-24" value={data.message} onChange={(event) => setField("message", event.target.value)} /></div>
                    <div className="sm:col-span-2"><label className="label">Fotos <span className="text-slate-400">(optional, max. 3 Bilder)</span></label><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-600"><Upload size={18} className="text-accent-dark" /><span>{photos.length > 0 ? `${photos.length} Bild(er) ausgewählt` : "Fotos auswählen"}</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(event) => setPhotos(Array.from(event.target.files ?? []).slice(0, 3))} /></label></div>
                  </div>
                  <label className="mt-5 flex gap-3 text-sm text-slate-700"><input type="checkbox" className="checkbox mt-0.5" checked={data.callbackRequested} onChange={(event) => setField("callbackRequested", event.target.checked)} />Ich wünsche einen Rückruf.</label>
                  <label className="mt-4 flex gap-3 text-sm leading-6 text-slate-700"><input type="checkbox" className="checkbox mt-1" checked={data.privacyAccepted} onChange={(event) => setField("privacyAccepted", event.target.checked)} required /><span>Ich habe die <Link href="/datenschutz" className="font-semibold text-navy underline decoration-accent underline-offset-2">Datenschutzerklärung</Link> gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.</span></label>
                </div>
              )}
              {step === 6 && (
                <div>
                  <h3 className="wizard-heading">Bitte prüfen Sie Ihre Angaben</h3>
                  <dl className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-slate-50 px-5">
                    <SummaryRow title="Leistung" value={serviceTitle(data.service)} />
                    <SummaryRow title="Ort / Strecke" value={[data.startLocation, data.destination].filter(Boolean).join(" → ")} />
                    <SummaryRow title="Termin" value={[data.preferredDate, data.alternatePeriod].filter(Boolean).join(" / ")} />
                    <SummaryRow title="Umfang" value={data.scope} />
                    <SummaryRow title="Bedingungen" value={conditionsSummary(data) || "Keine zusätzlichen Angaben"} />
                    <SummaryRow title="Kontakt" value={`${data.name}\n${data.phone}\n${data.email}`} />
                    <SummaryRow title="Fotos" value={photos.length > 0 ? `${photos.length} Bild(er) ausgewählt` : "Keine Fotos ausgewählt"} />
                  </dl>
                  <p className="mt-5 flex gap-2 rounded-xl bg-rose-50 p-4 text-sm leading-6 text-slate-700"><Info size={18} className="mt-0.5 shrink-0 text-accent-dark" />Dies ist eine unverbindliche Anfrage. Ein Preis, ein Termin oder eine Auftragsannahme wird erst nach persönlicher Prüfung bestätigt.</p>
                  {message && (
                    <div role="status" className={`mt-4 rounded-xl p-4 text-sm ${submitState === "not-configured" ? "bg-amber-50 text-amber-900" : "bg-red-50 text-red-800"}`}>
                      <p>{message}</p>
                      {submitState === "not-configured" && <a href={`tel:${company.phoneHref}`} className="mt-2 inline-flex items-center gap-2 font-semibold underline"><Phone size={15} />Jetzt direkt anrufen</a>}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-5 sm:px-7">
              {step > 0 ? <button type="button" onClick={() => setStep((current) => current - 1)} className="button-secondary"><ArrowLeft size={17} />Zurück</button> : <button type="button" onClick={resetAssistant} className="text-sm font-semibold text-slate-500 hover:text-navy">Zurücksetzen</button>}
              {step < steps.length - 1 ? <button type="button" onClick={continueStep} disabled={!canContinue()} className="button-primary disabled:cursor-not-allowed disabled:opacity-50">Weiter<ArrowRight size={17} /></button> : <button type="submit" disabled={submitState === "sending"} className="button-primary">{submitState === "sending" ? "Wird gesendet …" : "Anfrage jetzt unverbindlich senden"}</button>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ title, value }: { title: string; value: string }) {
  return <div className="grid gap-1 py-4 sm:grid-cols-[142px_1fr]"><dt className="text-sm font-semibold text-navy">{title}</dt><dd className="whitespace-pre-line text-sm leading-6 text-slate-600">{value || "–"}</dd></div>;
}
