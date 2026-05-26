"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, CheckCircle2, ClipboardCheck, Mail, MapPin, Package, Phone, ShieldCheck, Sparkles, Truck, Wrench } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryAssistant } from "@/components/InquiryAssistant";
import { InquiryForm } from "@/components/InquiryForm";
import { company, formattedAddress, ServiceId, services } from "@/lib/company";
import { useState } from "react";

const advantages = [
  { icon: ClipboardCheck, title: "Schnelle Terminabstimmung", text: "Kontaktieren Sie MTM unkompliziert per Formular oder Telefon." },
  { icon: ShieldCheck, title: "Sorgfältiger Transport", text: "Möbel und Gegenstände werden verantwortungsvoll behandelt." },
  { icon: BadgeCheck, title: "Klare Anfrageabwicklung", text: "Sie teilen Ihren Bedarf mit und erhalten eine persönliche Rückmeldung." },
  { icon: MapPin, title: "Regional erreichbar", text: "Für Kunden in Hannover, Isernhagen und Umgebung." },
];

const process = [
  { title: "Anfrage senden", text: "Beschreiben Sie kurz Ihren Auftrag per Formular, Telefon oder KI-Assistent." },
  { title: "Rückmeldung erhalten", text: "MTM prüft Ihre Angaben und bespricht die passenden nächsten Schritte mit Ihnen." },
  { title: "Auftrag durchführen", text: "Zum vereinbarten Termin wird der Auftrag sorgfältig umgesetzt." },
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
        <section className="relative overflow-hidden bg-slate-50" aria-labelledby="hero-heading">
          <div className="absolute inset-y-0 right-0 hidden w-[46%] bg-navy lg:block" />
          <div className="container-shell relative grid gap-10 pb-14 pt-10 sm:pb-20 sm:pt-16 lg:grid-cols-[1.03fr_0.97fr] lg:items-center lg:gap-14 lg:py-16">
            <div>
              <p className="eyebrow">Möbel Transport Montage · Hannover & Isernhagen</p>
              <h1 id="hero-heading" className="mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-[3.55rem] lg:leading-[1.08]">
                Umzug, Transport oder Montage? MTM erledigt das.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Zuverlässige Unterstützung für Umzüge, Möbeltransporte, Montagen und Entrümpelungen in Hannover, Isernhagen und Umgebung. Einfach anfragen und persönlich betreuen lassen.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#anfrage" className="button-primary justify-center py-4">Kostenlos Angebot anfragen<ArrowRight size={18} /></Link>
                <button type="button" onClick={() => openAssistant()} className="button-accent justify-center py-4"><Sparkles size={18} />KI-Anfrage starten</button>
                <a href={`tel:${company.phoneHref}`} className="button-secondary justify-center py-4"><Phone size={18} />{company.phoneDisplay} anrufen</a>
              </div>
              <ul className="mt-10 grid max-w-xl gap-3 text-sm font-medium text-slate-700 sm:grid-cols-2">
                {["Hannover & Umgebung", "Privat- und Gewerbekunden", "Persönliche Rückmeldung", "Sorgfältige Durchführung"].map((item) => (
                  <li key={item} className="flex items-center gap-2"><CheckCircle2 size={18} className="text-accent-dark" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="relative lg:pl-5">
              <div className="relative overflow-hidden rounded-[2rem] shadow-hero">
                <Image src="/images/hero-einsatz.webp" alt="MTM Fahrzeug und Hinweisschild bei einem Umzugseinsatz" width={1125} height={1500} priority className="aspect-[4/4.8] w-full object-cover object-center sm:aspect-[5/5.2] lg:aspect-[4/5]" />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/96 p-4 shadow-xl backdrop-blur sm:inset-x-6 sm:bottom-6 sm:p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-dark">Direkt erreichbar</p>
                  <a href={`tel:${company.phoneHref}`} className="mt-1 block text-xl font-bold text-navy">{company.phoneDisplay}</a>
                  <p className="mt-1 text-sm text-slate-500">Umzüge · Möbeltransport · Montage · Entrümpelung</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="leistungen" className="scroll-mt-28 py-16 sm:py-20" aria-labelledby="leistungen-heading">
          <div className="container-shell">
            <div className="max-w-xl">
              <p className="eyebrow">Leistungen</p>
              <h2 id="leistungen-heading" className="section-heading">Wobei können wir helfen?</h2>
              <p className="section-intro">Wählen Sie Ihre Leistung aus. Das Anfrageformular wird anschließend direkt passend vorbereitet.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => {
                const Icon = serviceIcons[service.id as keyof typeof serviceIcons];
                return (
                  <button key={service.id} type="button" onClick={() => chooseService(service.id)} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-card transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                    <div className="relative h-44 overflow-hidden">
                      <Image src={service.image} alt={service.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <Icon size={23} className="mb-4 text-accent-dark" />
                      <h3 className="text-lg font-bold text-navy">{service.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy">Anfrage vorbereiten<ArrowRight size={15} /></span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-soft py-16 sm:py-20" aria-labelledby="vorteile-heading">
          <div className="container-shell">
            <div className="text-center">
              <p className="eyebrow">Warum MTM?</p>
              <h2 id="vorteile-heading" className="section-heading">Ihre Anfrage. Unser Einsatz.</h2>
            </div>
            <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl bg-white p-6 shadow-card">
                  <span className="mb-5 inline-flex rounded-xl bg-orange-50 p-3 text-accent-dark"><Icon size={23} /></span>
                  <h3 className="text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ablauf" className="scroll-mt-28 py-16 sm:py-20" aria-labelledby="ablauf-heading">
          <div className="container-shell">
            <div className="mx-auto max-w-xl text-center">
              <p className="eyebrow">Ablauf</p>
              <h2 id="ablauf-heading" className="section-heading">So einfach geht Ihre Anfrage</h2>
            </div>
            <div className="relative mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3">
              <div className="absolute left-[17%] right-[17%] top-8 hidden h-px bg-slate-200 lg:block" />
              {process.map((item, index) => (
                <article key={item.title} className="relative rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-card">
                  <span className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-xl font-bold text-white ring-8 ring-white">{index + 1}</span>
                  <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy py-16 text-white sm:py-20" aria-labelledby="team-heading">
          <div className="container-shell grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <p className="eyebrow text-orange-300">Regional im Einsatz</p>
              <h2 id="team-heading" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Ein Team, das anpackt.</h2>
              <p className="mt-5 max-w-md text-base leading-8 text-slate-300">MTM unterstützt Privat- und Gewerbekunden bei Transport-, Montage-, Umzugs- und Räumungsaufträgen im Raum Hannover und Isernhagen.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="#anfrage" className="button-accent">Kostenlos Angebot anfragen</Link>
                <a href={`tel:${company.phoneHref}`} className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10"><Phone size={17} />Jetzt anrufen</a>
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl">
              <Image src="/images/team-mtm.webp" alt="Das Team von MTM Möbel Transport Montage vor den Firmenfahrzeugen" width={1800} height={1065} className="h-auto w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20" aria-labelledby="assistent-heading">
          <div className="container-shell">
            <div className="overflow-hidden rounded-[2rem] bg-soft p-7 sm:p-10 lg:grid lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-12 lg:p-14">
              <div>
                <p className="eyebrow">Digitale Anfrage</p>
                <h2 id="assistent-heading" className="section-heading">In wenigen Schritten zur passenden Anfrage</h2>
                <p className="section-intro">Unser digitaler Anfrage-Assistent hilft Ihnen dabei, alle wichtigen Angaben für Ihren Auftrag schnell zusammenzustellen.</p>
                <button type="button" onClick={() => openAssistant()} className="button-accent mt-8"><Sparkles size={18} />KI-Anfrage starten</button>
              </div>
              <div className="mt-9 rounded-2xl bg-white p-5 shadow-soft lg:mt-0">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-500"><span>Anfrage-Assistent</span><span>Schritt 2 von 6</span></div>
                <div className="mt-3 h-2 rounded-full bg-slate-100"><div className="h-2 w-1/3 rounded-full bg-accent" /></div>
                <div className="mt-7 rounded-2xl bg-soft p-4 text-sm leading-6 text-slate-700">Wo findet Ihr Auftrag statt?</div>
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-400">Startort</div>
                  <div className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-400">Zielort</div>
                </div>
                <p className="mt-5 text-xs leading-5 text-slate-500">Keine verbindliche Preis- oder Terminzusage ohne persönliche Prüfung.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="anfrage" className="scroll-mt-24 bg-soft py-16 sm:py-20" aria-labelledby="anfrage-heading">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.1fr] lg:gap-14">
            <div>
              <p className="eyebrow">Anfrageformular</p>
              <h2 id="anfrage-heading" className="section-heading">Kostenlos Anfrage senden</h2>
              <p className="section-intro">Beschreiben Sie kurz Ihren Auftrag. MTM prüft Ihre Anfrage und meldet sich persönlich bei Ihnen.</p>
              <div className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-card">
                <p className="font-bold text-navy">Lieber direkt besprechen?</p>
                <a className="flex items-center gap-3 text-lg font-bold text-navy hover:text-accent-dark" href={`tel:${company.phoneHref}`}><Phone size={21} className="text-accent-dark" />{company.phoneDisplay}</a>
                <p className="text-sm leading-6 text-slate-500">Ein Anruf ist auf Mobilgeräten direkt mit einem Klick möglich.</p>
              </div>
            </div>
            <InquiryForm selectedService={selectedService} onServiceChange={setSelectedService} />
          </div>
        </section>

        <section id="kontakt" className="scroll-mt-24 py-16 sm:py-20" aria-labelledby="kontakt-heading">
          <div className="container-shell">
            <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft lg:grid-cols-[1fr_0.85fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow">Kontakt</p>
                <h2 id="kontakt-heading" className="section-heading">Direkt Kontakt aufnehmen</h2>
                <div className="mt-7 space-y-5 text-slate-700">
                  <a href={`tel:${company.phoneHref}`} className="contact-link"><Phone className="text-accent-dark" size={22} /><span><span className="block text-sm text-slate-500">Telefon</span><strong className="text-navy">{company.phoneDisplay}</strong></span></a>
                  <a href={`mailto:${company.email}`} className="contact-link"><Mail className="text-accent-dark" size={22} /><span><span className="block text-sm text-slate-500">E-Mail</span><strong className="text-navy">{company.email}</strong></span></a>
                  <div className="contact-link"><MapPin className="text-accent-dark" size={22} /><span><span className="block text-sm text-slate-500">Geschäftsadresse</span><strong className="text-navy">{formattedAddress()}</strong><span className="block text-sm text-slate-500">Einsatzgebiet: {company.area}</span></span></div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`tel:${company.phoneHref}`} className="button-primary">Jetzt anrufen</a>
                  <a href={`mailto:${company.email}`} className="button-secondary">E-Mail schreiben</a>
                </div>
              </div>
              <div className="relative min-h-72 lg:min-h-full">
                <Image src="/images/hero-einsatz.webp" alt="MTM Umzugseinsatz in Hannover" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 pt-4 sm:pb-24" aria-label="Abschließende Anfrageaufforderung">
          <div className="container-shell rounded-[2rem] bg-navy px-6 py-12 text-center text-white sm:px-10 sm:py-16">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">Sie benötigen Unterstützung bei Umzug, Transport oder Montage?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">Senden Sie jetzt Ihre Anfrage oder rufen Sie direkt an. MTM prüft Ihr Anliegen und meldet sich persönlich bei Ihnen.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="#anfrage" className="button-accent justify-center">Kostenlos Angebot anfragen</Link>
              <button type="button" onClick={() => openAssistant()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10"><Sparkles size={17} />KI-Anfrage starten</button>
              <a href={`tel:${company.phoneHref}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10"><Phone size={17} />Jetzt anrufen</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <button type="button" onClick={() => openAssistant()} className="fixed bottom-20 right-4 z-30 hidden items-center gap-2 rounded-full bg-accent px-5 py-4 font-bold text-navy shadow-xl transition hover:-translate-y-0.5 hover:bg-accent-hover sm:inline-flex lg:bottom-6 lg:right-6"><Sparkles size={19} />Anfrage-Assistent</button>
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-3 sm:hidden">
        <a href={`tel:${company.phoneHref}`} className="button-secondary justify-center px-3"><Phone size={17} />Anrufen</a>
        <Link href="#anfrage" className="button-primary justify-center px-3">Anfrage</Link>
      </div>
      {assistantOpen && <InquiryAssistant open={assistantOpen} defaultService={selectedService} onServiceChange={setSelectedService} onClose={() => setAssistantOpen(false)} />}
    </>
  );
}
