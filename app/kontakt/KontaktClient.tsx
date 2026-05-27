"use client";

import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryAssistant } from "@/components/InquiryAssistant";
import { RegionPanel } from "@/components/RegionPanel";
import { company, ServiceId } from "@/lib/company";
import { useState } from "react";

export default function KontaktClient() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceId>("umzug");

  return (
    <>
      <Header onOpenAssistant={() => setAssistantOpen(true)} />
      <main>
        <section className="brand-gradient text-white">
          <div className="container-shell py-12 sm:py-16">
            <p className="eyebrow-light">Kontakt</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Direkt erreichbar.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
              Sprechen Sie Ihren Auftrag persönlich mit MTM ab oder starten Sie direkt eine unverbindliche Anfrage.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20" aria-labelledby="kontakt-heading">
          <div className="container-shell">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Kontakt</p>
              <h2 id="kontakt-heading" className="section-heading">Schnell und unkompliziert Kontakt aufnehmen</h2>
              <p className="section-intro">Für Fragen, eine erste Abstimmung oder eine konkrete Anfrage erreichen Sie MTM direkt per Telefon oder E-Mail.</p>
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
              <a href={`tel:${company.phoneHref}`} className="rounded-[1.5rem] border border-rose-100 bg-white p-6 shadow-card transition hover:border-rose-200">
                <Phone className="text-accent-dark" size={24} />
                <h3 className="mt-4 text-lg font-bold text-navy">Telefon</h3>
                <p className="mt-2 text-base font-semibold text-accent-dark">{company.phoneDisplay}</p>
              </a>
              <a href={`mailto:${company.email}`} className="rounded-[1.5rem] border border-rose-100 bg-white p-6 shadow-card transition hover:border-rose-200">
                <Mail className="text-accent-dark" size={24} />
                <h3 className="mt-4 text-lg font-bold text-navy">E-Mail</h3>
                <p className="mt-2 text-base font-semibold text-accent-dark">{company.email}</p>
              </a>
              <div className="rounded-[1.5rem] border border-rose-100 bg-white p-6 shadow-card">
                <MapPin className="text-accent-dark" size={24} />
                <h3 className="mt-4 text-lg font-bold text-navy">Einsatzgebiet</h3>
                <p className="mt-2 text-base font-semibold text-slate-700">{company.area}</p>
                <p className="mt-1 text-sm text-slate-500">Regional erreichbar für private und gewerbliche Aufträge.</p>
              </div>
            </div>
            <div className="mt-9 flex justify-center">
              <button type="button" onClick={() => setAssistantOpen(true)} className="button-primary">
                <Sparkles size={17} /> Anfrage starten
              </button>
            </div>
          </div>
        </section>

        <RegionPanel variant="contact" onInquiry={() => setAssistantOpen(true)} />
      </main>
      <Footer />
      {assistantOpen && <InquiryAssistant open={assistantOpen} defaultService={selectedService} onServiceChange={setSelectedService} onClose={() => setAssistantOpen(false)} />}
    </>
  );
}
