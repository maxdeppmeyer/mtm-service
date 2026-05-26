"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryAssistant } from "@/components/InquiryAssistant";
import { company, extraServices, ServiceId, services } from "@/lib/company";
import { useState } from "react";


const detailActions = [
  "Persönliche Rückmeldung statt anonymer Sofortangebote",
  "Geeignet für Privat- und Gewerbekunden in Hannover & Umland",
  "Anfrage per Formular, Telefon oder KI-Assistent möglich",
];

export default function ServicesPage() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceId>("umzug");

  function openAssistant(service?: ServiceId) {
    if (service) setSelectedService(service);
    setAssistantOpen(true);
  }

  return (
    <>
      <Header onOpenAssistant={() => openAssistant()} />
      <main>
        <section className="brand-soft-gradient py-14 sm:py-18">
          <div className="container-shell grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow">Leistungen im Detail</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:leading-[1.08]">
                Mehr Informationen zu den Leistungen von MTM.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Auf dieser Seite werden die wichtigsten Leistungsbereiche ausführlicher vorgestellt – passend zur übersichtlichen Startseite und im roten MTM-Stil.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/#anfrage" className="button-primary justify-center">Zur Anfrage<ArrowRight size={18} /></Link>
                <button type="button" onClick={() => openAssistant()} className="button-accent justify-center"><Sparkles size={18} />KI-Assistent</button>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-slate-700">
                {detailActions.map((item) => (
                  <li key={item} className="flex items-start gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-dark" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-hero">
              <Image src="/images/region-overview.webp" alt="Visuelle Übersicht der MTM Leistungen" width={1254} height={1254} className="h-auto w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-shell">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => (
                <Link key={service.id} href={`#${service.id}`} className="rounded-[1.4rem] border border-rose-100 bg-white px-5 py-4 text-sm font-bold text-accent-dark shadow-card transition hover:-translate-y-0.5 hover:bg-rose-50">
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-10 pb-16 sm:space-y-12 sm:pb-20">
          <div className="container-shell space-y-10 sm:space-y-12">
            {services.map((service, index) => (
              <article key={service.id} id={service.id} className="scroll-mt-28 grid gap-6 overflow-hidden rounded-[2rem] border border-rose-100 bg-white shadow-card lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div className={`relative min-h-[280px] sm:min-h-[360px] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                </div>
                <div className={`p-7 sm:p-10 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p className="eyebrow">{service.shortTitle}</p>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{service.title}</h2>
                  <p className="mt-5 text-base leading-8 text-slate-600">{service.detailIntro}</p>
                  <ul className="mt-7 space-y-3 text-sm leading-7 text-slate-700">
                    {service.detailPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-dark" />{point}</li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link href="/#anfrage" className="button-primary">Diese Leistung anfragen</Link>
                    <button type="button" onClick={() => openAssistant(service.id)} className="button-secondary">Per Assistent vorbereiten</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-soft py-16 sm:py-20">
          <div className="container-shell grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="eyebrow">Weitere Leistungen</p>
              <h2 className="section-heading">Zusätzliche Arbeiten nach persönlicher Abstimmung</h2>
              <p className="section-intro">Je nach Auftrag können auch weitere passende Leistungen abgestimmt werden – zum Beispiel ausgewählte Entkernungsarbeiten.</p>
              <div className="mt-6 rounded-[1.6rem] border border-rose-100 bg-white p-6 shadow-card">
                {extraServices.map((entry) => (
                  <div key={entry.title}>
                    <h3 className="text-xl font-bold text-navy">{entry.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{entry.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      {entry.points.map((point) => <li key={point} className="flex items-start gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent-dark" />{point}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-card">
              <Image src="/images/service-entkernung.webp" alt="Innenraum mit Entkernungsarbeiten" width={1000} height={720} className="h-auto w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-shell brand-gradient overflow-hidden rounded-[2rem] px-7 py-8 text-white shadow-soft sm:px-10 sm:py-12 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
            <div>
              <p className="eyebrow text-rose-200">Kontakt & Region</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Hannover & Umland im Blick</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-rose-50/90">
                MTM ist regional im Einsatz. Für die Anfrage genügt meist ein kurzer Überblick zu Leistung, Ort, Termin und Besonderheiten.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`tel:${company.phoneHref}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold hover:bg-white/10"><Phone size={16} />{company.phoneDisplay}</a>
                <Link href="/#anfrage" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-accent-dark hover:bg-rose-50">Zur Anfrage<ArrowRight size={16} /></Link>
              </div>
              <div className="mt-8 inline-flex items-start gap-3 rounded-[1.3rem] border border-white/15 bg-white/10 px-4 py-4 text-sm leading-6 text-rose-50/90 backdrop-blur-sm">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>Standort: {company.address.street}, {company.address.postalCode} {company.address.city} · Einsatzgebiet: {company.area}</span>
              </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-white/15 bg-white/10 p-3 backdrop-blur-sm lg:mt-0">
              <Image src="/images/region-map.webp" alt="Region Hannover als Einsatzgebietskarte" width={900} height={820} className="h-auto w-full rounded-[1.25rem] object-cover" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {assistantOpen && <InquiryAssistant open={assistantOpen} defaultService={selectedService} onServiceChange={setSelectedService} onClose={() => setAssistantOpen(false)} />}
    </>
  );
}
