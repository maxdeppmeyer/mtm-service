"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, MapPin, Phone, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryAssistant } from "@/components/InquiryAssistant";
import { company, ServiceId, services } from "@/lib/company";
import { useState } from "react";

const detailActions = [
  "Persönliche Rückmeldung statt automatischer Preisversprechen",
  "Geeignet für Privat- und Gewerbekunden in Hannover & Umland",
  "Anfrage bequem über den Schritt-für-Schritt-Assistenten",
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
        <section className="brand-gradient overflow-hidden text-white">
          <div className="container-shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_0.88fr] lg:items-center lg:gap-14">
            <div>
              <p className="eyebrow-light">Leistungen im Detail</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:leading-[1.08]">
                Leistungen, die zu Ihrem Auftrag passen.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
                Umzug, Möbeltransport, Möbelmontage, Entrümpelung, Expresstransporte und Entkernung für Hannover & Umland – klar erklärt und direkt anfragbar.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/90">
                {detailActions.map((item) => (
                  <li key={item} className="flex items-start gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />{item}</li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button type="button" onClick={() => openAssistant()} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-bold text-accent-dark transition hover:bg-rose-50">
                  Anfrage vorbereiten<ArrowRight size={18} />
                </button>
                <Link href="/" className="hero-button-secondary justify-center py-4">Zur Startseite</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-soft backdrop-blur-sm">
              <Image src="/images/leistung-expresstransport-mtm-20260527-v4.webp" alt="MTM LKW bereit für einen Transportauftrag" width={1200} height={900} className="aspect-[4/3] w-full rounded-[1.4rem] object-cover" />
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-shell space-y-10 sm:space-y-12">
            {services.map((service, index) => (
              <article key={service.id} id={service.id} className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-rose-100 bg-white shadow-card">
                <div className="grid gap-0 lg:grid-cols-[0.94fr_1.06fr] lg:items-stretch">
                  <div className={`relative min-h-[285px] sm:min-h-[370px] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Image src={service.image} alt={service.alt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                  </div>
                  <div className={`flex flex-col justify-center p-7 sm:p-10 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <p className="eyebrow">{service.shortTitle}</p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{service.title}</h2>
                    <p className="mt-5 text-base leading-8 text-slate-600">{service.detailIntro}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {service.highlights.map((highlight) => (
                        <span key={highlight} className="rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-accent-dark">{highlight}</span>
                      ))}
                    </div>
                    <ul className="mt-7 space-y-3 text-sm leading-7 text-slate-700">
                      {service.detailPoints.map((point) => (
                        <li key={point} className="flex items-start gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-dark" />{point}</li>
                      ))}
                    </ul>
                    <button type="button" onClick={() => openAssistant(service.id)} className="button-primary mt-8 w-fit">Diese Leistung anfragen<ArrowRight size={17} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-shell grid gap-8 overflow-hidden rounded-[2rem] border border-rose-100 bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
            <div>
              <p className="eyebrow">Einsatzgebiet</p>
              <h2 className="section-heading">Region Hannover im Überblick</h2>
              <p className="section-intro">
                MTM ist regional erreichbar und unterstützt Sie bei passenden Aufträgen in Hannover sowie den umliegenden Städten und Gemeinden der Region.
              </p>
              <div className="mt-7 inline-flex items-start gap-3 rounded-[1.3rem] bg-rose-50 px-4 py-4 text-sm leading-6 text-slate-700">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent-dark" />
                <span>Einsatzgebiet: {company.area}<br />Mit Schwerpunkt in Hannover und der gesamten Region Hannover.</span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`tel:${company.phoneHref}`} className="button-secondary"><Phone size={16} />{company.phoneDisplay}</a>
                <button type="button" onClick={() => openAssistant()} className="button-primary"><Sparkles size={16} />Anfrage starten</button>
              </div>
            </div>
            <div className="rounded-[1.7rem] bg-rose-50 p-4 sm:p-7">
              <Image src="/images/karte-region-hannover-mtm-20260527-v4.webp" alt="Karte der Region Hannover mit Ortsnamen im Umland" width={1254} height={1254} className="h-auto w-full" />
            </div>
          </div>
        </section>

        <section className="bg-soft py-16 sm:py-20">
          <div className="container-shell overflow-hidden rounded-[2rem] bg-white p-7 shadow-card sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-3xl">
              <p className="eyebrow">FAQ</p>
              <h2 className="section-heading">Viele Antworten finden Sie kompakt auf der FAQ-Seite.</h2>
              <p className="section-intro">Sechs aufklappbare Themenbereiche beantworten wichtige Fragen zu Leistungen, Ablauf, Terminen, Kosten und Organisation.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
              <Link href="/faq" className="button-primary">Zur FAQ-Seite<ArrowRight size={17} /></Link>
              <button type="button" onClick={() => openAssistant("expresstransport")} className="button-secondary"><Clock3 size={16} />Expresstransport anfragen</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {assistantOpen && <InquiryAssistant open={assistantOpen} defaultService={selectedService} onServiceChange={setSelectedService} onClose={() => setAssistantOpen(false)} />}
    </>
  );
}
