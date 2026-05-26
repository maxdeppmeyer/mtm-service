"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
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
import { InquiryForm } from "@/components/InquiryForm";
import { company, formattedAddress, ServiceId, services } from "@/lib/company";
import { useState } from "react";

const quickFacts = [
  { icon: ShieldCheck, title: "Sorgfältige Ausführung", text: "MTM arbeitet ordentlich, zuverlässig und mit Blick auf einen sicheren Ablauf." },
  { icon: ClipboardCheck, title: "Klare Abstimmung", text: "Anfrage, Rückmeldung und Terminabstimmung laufen persönlich und übersichtlich ab." },
  { icon: MapPin, title: "Regional unterwegs", text: "Im Einsatz für Privat- und Gewerbekunden in Hannover & Umland." },
  { icon: BadgeCheck, title: "Passende Leistungen", text: "Umzug, Transport, Montage und Entrümpelung aus einer Hand." },
];

const process = [
  { step: "1", title: "Anfrage", text: "Per Formular, Telefon oder KI-Assistent kurz beschreiben, worum es geht." },
  { step: "2", title: "Rückmeldung", text: "MTM prüft die Anfrage und meldet sich persönlich zurück." },
  { step: "3", title: "Abstimmung", text: "Umfang, Termin und Besonderheiten werden gemeinsam geklärt." },
  { step: "4", title: "Durchführung", text: "Der Auftrag wird sorgfältig und zuverlässig umgesetzt." },
  { step: "5", title: "Abschluss", text: "Auf Wunsch mit sauberer Übergabe und weiteren Hinweisen." },
];

const serviceIcons = { umzug: Truck, moebeltransport: Package, moebelmontage: Wrench, entruempelung: Building2 };

export function HomeExperience() {
  const [selectedService, setSelectedService] = useState<ServiceId>("umzug");
  const [assistantOpen, setAssistantOpen] = useState(false);

  function chooseService(service: ServiceId) {
    setSelectedService(service);
    document.getElementById("anfrage")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openAssistant(service?: ServiceId) {
    if (service) setSelectedService(service);
    setAssistantOpen(true);
  }

  return (
    <>
      <Header onOpenAssistant={() => openAssistant()} />
      <main>
        <section className="brand-soft-gradient overflow-hidden" aria-labelledby="hero-heading">
          <div className="container-shell grid gap-10 pb-14 pt-10 sm:pb-20 sm:pt-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14 lg:py-16">
            <div>
              <p className="eyebrow">MTM · {company.area}</p>
              <h1 id="hero-heading" className="mt-5 max-w-2xl text-balance text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-[3.5rem] lg:leading-[1.07]">
                Ihr starkes Team für Umzug, Transport, Montage & Entrümpelung.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Übersichtliche Startseite, persönliche Anfragewege und die wichtigsten Leistungen klar auf einen Blick – für Hannover & Umland.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#anfrage" className="button-primary justify-center py-4">Kostenlos anfragen<ArrowRight size={18} /></Link>
                <Link href="/leistungen" className="button-secondary justify-center py-4">Leistungen im Detail</Link>
                <button type="button" onClick={() => openAssistant()} className="button-accent justify-center py-4"><Sparkles size={18} />KI-Assistent</button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-700">
                <a href={`tel:${company.phoneHref}`} className="inline-flex items-center gap-2 text-accent-dark hover:underline"><Phone size={17} />{company.phoneDisplay}</a>
                <span className="inline-flex items-center gap-2"><CheckCircle2 size={17} className="text-accent-dark" />Privat & Gewerbe</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 size={17} className="text-accent-dark" />Persönliche Rückmeldung</span>
              </div>
            </div>
            <div>
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-hero">
                <Image src="/images/team-mtm.webp" alt="Teamfoto von MTM Möbel Transport Montage vor den Firmenfahrzeugen" width={1800} height={1065} priority className="h-auto w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section id="leistungen" className="scroll-mt-28 py-16 sm:py-20" aria-labelledby="leistungen-heading">
          <div className="container-shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">Startseite · Überblick</p>
                <h2 id="leistungen-heading" className="section-heading">Unsere wichtigsten Leistungen</h2>
                <p className="section-intro">Die Übersicht bleibt bewusst klar und kompakt. Alle Leistungen im Detail finden Sie auf der separaten Leistungsseite.</p>
              </div>
              <Link href="/leistungen" className="inline-flex items-center gap-2 text-sm font-bold text-accent-dark hover:underline">Zur Detailseite<ArrowRight size={16} /></Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => {
                const Icon = serviceIcons[service.id as keyof typeof serviceIcons];
                return (
                  <article key={service.id} className="flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-rose-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={service.image} alt={service.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-accent-dark">
                        <Icon size={22} />
                      </div>
                      <h3 className="text-xl font-bold text-navy">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                      <ul className="mt-5 space-y-2 text-sm text-slate-700">
                        {service.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent-dark" />{item}</li>
                        ))}
                      </ul>
                      <div className="mt-6 pt-2">
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
            <div className="max-w-2xl">
              <p className="eyebrow">Warum MTM?</p>
              <h2 id="vorteile-heading" className="section-heading">Übersichtlich, persönlich und regional.</h2>
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
            <div className="brand-gradient overflow-hidden rounded-[2rem] px-6 py-8 text-white shadow-soft sm:px-10 sm:py-12 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
              <div>
                <p className="eyebrow text-rose-200">Einsatzgebiet & Ablauf</p>
                <h2 id="ablauf-heading" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Hannover & Umland – klarer Ablauf, kurze Wege.</h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-rose-50/90">
                  MTM ist regional im Einsatz und begleitet Anfragen vom ersten Kontakt bis zur Durchführung persönlich. Die Karte mit der Region Hannover ist bewusst mit auf der Seite eingebunden.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {process.map((item) => (
                    <div key={item.step} className="rounded-[1.4rem] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-extrabold text-accent-dark">{item.step}</div>
                      <h3 className="text-base font-bold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-rose-50/90">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 lg:mt-0">
                <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
                  <Image src="/images/region-map.webp" alt="Karte der Region Hannover als grafische Übersicht des Einsatzgebiets von MTM" width={900} height={820} className="h-auto w-full rounded-[1.25rem] bg-white/5 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 pb-16 sm:pb-20" aria-labelledby="detail-teaser-heading">
          <div className="container-shell">
            <div className="grid gap-6 overflow-hidden rounded-[2rem] border border-rose-100 bg-white shadow-card lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div className="p-7 sm:p-10">
                <p className="eyebrow">Mehr Details</p>
                <h2 id="detail-teaser-heading" className="section-heading">Zusätzliche Infos auf einer eigenen Leistungsseite</h2>
                <p className="section-intro">Damit die Startseite übersichtlich bleibt, finden Sie alle Leistungsbereiche dort ausführlicher – inklusive passender Bilder, Schwerpunkte und weiterer Hinweise.</p>
                <Link href="/leistungen" className="button-primary mt-7">Leistungsseite öffnen<ArrowRight size={18} /></Link>
              </div>
              <div className="relative min-h-[280px] lg:min-h-full">
                <Image src="/images/region-overview.webp" alt="Grafische Übersicht der MTM Leistungen in rotem Flyer-Stil" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section id="anfrage" className="scroll-mt-24 bg-soft py-16 sm:py-20" aria-labelledby="anfrage-heading">
          <div className="container-shell">
            <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-soft lg:grid-cols-[0.42fr_0.58fr]">
              <div className="brand-gradient p-7 text-white sm:p-10 lg:p-12">
                <p className="eyebrow text-rose-200">Anfrageformular</p>
                <h2 id="anfrage-heading" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Kostenlos Anfrage senden</h2>
                <p className="mt-5 text-base leading-8 text-rose-50/90">
                  Beschreiben Sie kurz Ihren Auftrag. MTM prüft Ihre Anfrage persönlich und meldet sich direkt zurück.
                </p>

                <div className="mt-8 space-y-4 rounded-[1.6rem] border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="font-bold">Lieber direkt besprechen?</p>
                  <a className="flex items-center gap-3 text-lg font-bold hover:underline" href={`tel:${company.phoneHref}`}>
                    <Phone size={22} />
                    {company.phoneDisplay}
                  </a>
                  <p className="text-sm leading-6 text-rose-50/90">Ein Anruf ist auf Mobilgeräten direkt mit einem Klick möglich.</p>
                </div>

                <div className="mt-5 space-y-3 rounded-[1.6rem] border border-white/15 bg-white/10 p-5 backdrop-blur-sm text-sm leading-6 text-rose-50/90">
                  <p className="font-bold text-white">Praktisch für die Anfrage</p>
                  <div className="flex items-start gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0" />Fotos können direkt mitgesendet werden.</div>
                  <div className="flex items-start gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0" />Leistung, Ort und Besonderheiten reichen für den ersten Überblick.</div>
                  <div className="flex items-start gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0" />Alternativ hilft der KI-Assistent Schritt für Schritt.</div>
                </div>

                <button type="button" onClick={() => openAssistant(selectedService)} className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10">
                  <Sparkles size={17} />
                  KI-Anfrage starten
                </button>
              </div>

              <div className="p-2 sm:p-4 lg:p-5">
                <InquiryForm selectedService={selectedService} onServiceChange={setSelectedService} />
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="scroll-mt-24 py-16 sm:py-20" aria-labelledby="kontakt-heading">
          <div className="container-shell">
            <div className="max-w-2xl">
              <p className="eyebrow">Kontakt</p>
              <h2 id="kontakt-heading" className="section-heading">Direkt erreichbar in Hannover & Umland</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-rose-100 bg-white p-6 shadow-card">
                <Phone className="text-accent-dark" size={24} />
                <h3 className="mt-4 text-lg font-bold text-navy">Telefon</h3>
                <a href={`tel:${company.phoneHref}`} className="mt-2 block text-base font-semibold text-accent-dark hover:underline">{company.phoneDisplay}</a>
              </div>
              <div className="rounded-[1.5rem] border border-rose-100 bg-white p-6 shadow-card">
                <Mail className="text-accent-dark" size={24} />
                <h3 className="mt-4 text-lg font-bold text-navy">E-Mail</h3>
                <a href={`mailto:${company.email}`} className="mt-2 block text-base font-semibold text-accent-dark hover:underline">{company.email}</a>
              </div>
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
        <Link href="#anfrage" className="button-primary justify-center px-3">Anfrage</Link>
      </div>
      {assistantOpen && <InquiryAssistant open={assistantOpen} defaultService={selectedService} onServiceChange={setSelectedService} onClose={() => setAssistantOpen(false)} />}
    </>
  );
}
