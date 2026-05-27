"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryAssistant } from "@/components/InquiryAssistant";
import { company, formattedAddress, ServiceId, services } from "@/lib/company";
import { useState } from "react";

const quickFacts = [
  { icon: ShieldCheck, title: "Sorgfältige Ausführung", text: "Verantwortungsvoller Umgang mit Möbeln, Gegenständen und Räumen." },
  { icon: ClipboardCheck, title: "Klare Abstimmung", text: "Sie beschreiben den Auftrag und erhalten eine persönliche Rückmeldung." },
  { icon: MapPin, title: "Regional erreichbar", text: "Für Privat- und Gewerbekunden in Hannover & Umland." },
  { icon: BadgeCheck, title: "Passende Leistungen", text: "Umzug, Transport, Montage und Entrümpelung aus einer Hand." },
];

const process = [
  { step: "1", title: "Anfrage starten", text: "Leistung auswählen und die wichtigsten Angaben eingeben." },
  { step: "2", title: "Rückmeldung", text: "MTM prüft Ihre Informationen persönlich." },
  { step: "3", title: "Abstimmung", text: "Termin und Umfang werden passend geklärt." },
  { step: "4", title: "Durchführung", text: "Der Auftrag wird sorgfältig umgesetzt." },
];

const serviceIcons = { umzug: Truck, moebeltransport: Package, moebelmontage: Wrench, entruempelung: Building2 };

export function HomeExperience() {
  const [selectedService, setSelectedService] = useState<ServiceId>("umzug");
  const [assistantOpen, setAssistantOpen] = useState(false);

  function openAssistant(service?: ServiceId) {
    if (service) setSelectedService(service);
    setAssistantOpen(true);
  }

  return (
    <>
      <Header onOpenAssistant={() => openAssistant()} />
      <main>
        <section className="hero-cover relative flex min-h-[calc(100svh-78px)] items-end overflow-hidden text-white" aria-labelledby="hero-heading">
          <Image
            src="/images/team-mtm.webp"
            alt="Das Team von MTM Möbel Transport Montage vor den Firmenfahrzeugen"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(25,7,10,0.88)_0%,rgba(25,7,10,0.46)_45%,rgba(25,7,10,0.22)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-2 bg-accent" />
          <div className="container-shell relative z-10 pb-12 pt-24 sm:pb-16 lg:pb-20">
            <div className="max-w-3xl">
              <p className="eyebrow-light">MTM Möbel Transport Montage · {company.area}</p>
              <h1 id="hero-heading" className="mt-5 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[4.2rem] lg:leading-[1.06]">
                Umzug, Transport oder Montage? MTM erledigt das.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
                Zuverlässige Unterstützung für Umzüge, Möbeltransporte, Montagen und Entrümpelungen in Hannover & Umland.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button type="button" onClick={() => openAssistant()} className="button-primary justify-center py-4">
                  Anfrage starten<ArrowRight size={18} />
                </button>
                <Link href="/leistungen" className="hero-button-secondary justify-center py-4">Leistungen ansehen</Link>
                <a href={`tel:${company.phoneHref}`} className="hero-button-secondary justify-center py-4"><Phone size={17} />{company.phoneDisplay}</a>
              </div>
            </div>
          </div>
        </section>

        <section id="leistungen" className="scroll-mt-28 py-16 sm:py-20" aria-labelledby="leistungen-heading">
          <div className="container-shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">Leistungen</p>
                <h2 id="leistungen-heading" className="section-heading">Unsere wichtigsten Leistungen</h2>
                <p className="section-intro">Ein kompakter Überblick. Ausführlichere Informationen finden Sie auf der Leistungsseite.</p>
              </div>
              <Link href="/leistungen" className="inline-flex items-center gap-2 text-sm font-bold text-accent-dark hover:underline">Alle Leistungen ansehen<ArrowRight size={16} /></Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => {
                const Icon = serviceIcons[service.id as keyof typeof serviceIcons];
                return (
                  <article key={service.id} className="flex min-h-full flex-col overflow-hidden rounded-[1.6rem] border border-rose-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={service.image} alt={service.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-accent-dark">
                        <Icon size={22} />
                      </span>
                      <h3 className="text-xl font-bold text-navy">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                      <div className="mt-auto pt-7">
                        <Link href={`/leistungen#${service.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-accent-dark hover:underline">Mehr zu dieser Leistung<ArrowRight size={15} /></Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-soft py-16 sm:py-20" aria-labelledby="vorteile-heading">
          <div className="container-shell">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Warum MTM?</p>
              <h2 id="vorteile-heading" className="section-heading">Persönlich, sorgfältig und regional.</h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {quickFacts.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-[1.5rem] bg-white p-6 shadow-card">
                  <span className="mb-5 inline-flex rounded-2xl bg-rose-50 p-3 text-accent-dark"><Icon size={22} /></span>
                  <h3 className="text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ablauf" className="scroll-mt-28 py-16 sm:py-20" aria-labelledby="ablauf-heading">
          <div className="container-shell">
            <div className="brand-gradient overflow-hidden rounded-[2rem] px-6 py-8 text-white shadow-soft sm:px-10 sm:py-12 lg:grid lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-14">
              <div>
                <p className="eyebrow-light">Einsatzgebiet & Ablauf</p>
                <h2 id="ablauf-heading" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Hannover & Umland.</h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/90">
                  MTM unterstützt bei Transport-, Montage-, Umzugs- und Räumungsaufträgen in Hannover und der umliegenden Region.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {process.map((item) => (
                    <div key={item.step} className="rounded-[1.4rem] border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-extrabold text-accent-dark">{item.step}</div>
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/90">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 rounded-[1.7rem] bg-white p-5 sm:p-8 lg:mt-0">
                <Image src="/images/region-map.svg" alt="Grafische Darstellung des Einsatzgebiets rund um Hannover" width={720} height={620} className="h-auto w-full" />
              </div>
            </div>
          </div>
        </section>

        <section id="anfrage" className="scroll-mt-28 bg-soft py-16 sm:py-20" aria-labelledby="anfrage-heading">
          <div className="container-shell">
            <div className="grid gap-8 overflow-hidden rounded-[2rem] bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 lg:p-12">
              <div>
                <p className="eyebrow">Digitale Anfrage</p>
                <h2 id="anfrage-heading" className="section-heading">Ihre Anfrage Schritt für Schritt vorbereiten</h2>
                <p className="section-intro">
                  Wählen Sie die passende Leistung. Der Anfrage-Assistent fragt anschließend nur die Angaben ab, die für Ihren Auftrag relevant sind.
                </p>
                <div className="mt-7 rounded-[1.4rem] bg-rose-50 p-5 text-sm leading-7 text-slate-700">
                  Die Anfrage bleibt unverbindlich. Preise, Termine und die Annahme des Auftrags werden persönlich geprüft.
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <button key={service.id} type="button" onClick={() => openAssistant(service.id)} className="group flex min-h-[92px] items-center justify-between gap-4 rounded-[1.35rem] border border-rose-100 bg-white px-5 py-4 text-left shadow-card transition hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50">
                    <span>
                      <span className="block font-bold text-navy">{service.title}</span>
                      <span className="mt-1 block text-sm text-slate-500">Anfrage vorbereiten</span>
                    </span>
                    <ArrowRight size={18} className="shrink-0 text-accent-dark transition group-hover:translate-x-1" />
                  </button>
                ))}
                <button type="button" onClick={() => openAssistant("sonstige")} className="group flex min-h-[92px] items-center justify-between gap-4 rounded-[1.35rem] border border-rose-100 bg-white px-5 py-4 text-left shadow-card transition hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50 sm:col-span-2">
                  <span>
                    <span className="block font-bold text-navy">Sonstige Anfrage</span>
                    <span className="mt-1 block text-sm text-slate-500">Individuelles Anliegen beschreiben</span>
                  </span>
                  <ArrowRight size={18} className="shrink-0 text-accent-dark transition group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="scroll-mt-24 py-16 sm:py-20" aria-labelledby="kontakt-heading">
          <div className="container-shell">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Kontakt</p>
              <h2 id="kontakt-heading" className="section-heading">Direkt erreichbar</h2>
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
                <h3 className="mt-4 text-lg font-bold text-navy">Standort</h3>
                <p className="mt-2 text-base font-semibold text-slate-700">{formattedAddress()}</p>
                <p className="mt-1 text-sm text-slate-500">Einsatzgebiet: {company.area}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <button type="button" onClick={() => openAssistant()} className="fixed bottom-20 right-4 z-30 hidden items-center gap-2 rounded-full bg-accent px-5 py-4 font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-accent-hover sm:inline-flex lg:bottom-6 lg:right-6"><Sparkles size={19} />Anfrage-Assistent</button>
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-rose-100 bg-white p-3 sm:hidden">
        <a href={`tel:${company.phoneHref}`} className="button-secondary justify-center px-3"><Phone size={17} />Anrufen</a>
        <button type="button" onClick={() => openAssistant()} className="button-primary justify-center px-3">Anfrage</button>
      </div>
      {assistantOpen && <InquiryAssistant open={assistantOpen} defaultService={selectedService} onServiceChange={setSelectedService} onClose={() => setAssistantOpen(false)} />}
    </>
  );
}
