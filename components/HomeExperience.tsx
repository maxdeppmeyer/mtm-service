"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FolderOpen,
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
import { company, extraServices, ServiceId, services } from "@/lib/company";
import { useState } from "react";

const quickFacts = [
  { icon: ShieldCheck, title: "Sorgfältige Ausführung", text: "Verantwortungsvoller Umgang mit Möbeln, Gegenständen und Räumen." },
  { icon: ClipboardCheck, title: "Klare Abstimmung", text: "Sie beschreiben den Auftrag und erhalten eine persönliche Rückmeldung." },
  { icon: MapPin, title: "Regional erreichbar", text: "Für Privat- und Gewerbekunden in Hannover & Umland." },
  { icon: BadgeCheck, title: "Passende Leistungen", text: "Umzug, Transport, Montage, Entkernung, Express und Entrümpelung aus einer Hand." },
];

const process = [
  { step: "1", title: "Anfrage", text: "Sie starten Ihre Anfrage online oder telefonisch mit den wichtigsten Eckdaten." },
  { step: "2", title: "Prüfung", text: "MTM meldet sich persönlich zurück und klärt offene Punkte zum Auftrag." },
  { step: "3", title: "Abstimmung", text: "Termin, Umfang und Ablauf werden passend und transparent abgestimmt." },
  { step: "4", title: "Durchführung", text: "Der Auftrag wird zuverlässig, ordentlich und termingerecht umgesetzt." },
];

const homeServices = [
  {
    id: "umzug",
    title: services[0].title,
    description: services[0].description,
    image: services[0].image,
    alt: services[0].alt,
    href: "/leistungen#umzug",
    icon: Truck,
  },
  {
    id: "moebeltransport",
    title: services[1].title,
    description: services[1].description,
    image: services[1].image,
    alt: services[1].alt,
    href: "/leistungen#moebeltransport",
    icon: Package,
  },
  {
    id: "moebelmontage",
    title: services[2].title,
    description: services[2].description,
    image: services[2].image,
    alt: services[2].alt,
    href: "/leistungen#moebelmontage",
    icon: Wrench,
  },
  {
    id: "entruempelung",
    title: services[3].title,
    description: services[3].description,
    image: services[3].image,
    alt: services[3].alt,
    href: "/leistungen#entruempelung",
    icon: Building2,
  },
  {
    id: "expresstransport",
    title: services[4].title,
    description: services[4].description,
    image: services[4].image,
    alt: services[4].alt,
    href: "/leistungen#expresstransport",
    icon: Clock3,
  },
  {
    id: "entkernung",
    title: "Entkernung",
    description: extraServices[0].description,
    image: extraServices[0].image,
    alt: extraServices[0].alt,
    href: "/leistungen#entkernung",
    icon: Building2,
  },
] as const;

const placeholders = [
  {
    title: "Referenzen & Projektbeispiele",
    text: "Hier bleibt bewusst ein sauberer Platzhalter, damit später echte Referenzen, Projektbeispiele oder kurze Kundenstimmen ergänzt werden können.",
    icon: FolderOpen,
    button: "Platzhalter für Referenzen",
  },
];

const galleryImages = [
  {
    src: "/images/gallery-teamfoto-mtm-2026.webp",
    alt: "Das Team von MTM vor den Firmenfahrzeugen.",
    title: "Team & Fahrzeuge",
  },
  {
    src: "/images/gallery-moebelmontage-mtm-2026.webp",
    alt: "MTM Mitarbeiter bei der Möbelmontage in einem Wohnraum.",
    title: "Möbelmontage vor Ort",
  },
  {
    src: "/images/gallery-truck-front-mtm-2026.webp",
    alt: "MTM Transportfahrzeug vor einem Gebäude.",
    title: "Regional im Einsatz",
  },
  {
    src: "/images/gallery-truck-side-mtm-2026.webp",
    alt: "MTM Transportfahrzeug mit Firmenbeschriftung in Seitenansicht.",
    title: "Transportfahrzeug",
  },
  {
    src: "/images/gallery-ladetruck-mtm-2026.webp",
    alt: "Beladener MTM LKW mit Möbeln und Einrichtung.",
    title: "Umzug & Beladung",
  },
  {
    src: "/images/gallery-entruempelung-mtm-2026.webp",
    alt: "MTM Mitarbeiter bei einer Entrümpelung.",
    title: "Entrümpelung",
  },
  {
    src: "/images/gallery-regalraum-mtm-2026.webp",
    alt: "Montierte Regalsysteme in einem Raum.",
    title: "Montageergebnis",
  },
  {
    src: "/images/gallery-schrank-mtm-2026.webp",
    alt: "Aufgebauter Schrank in einem leeren Raum.",
    title: "Schrankmontage",
  },
  {
    src: "/images/gallery-garderobe-mtm-2026.webp",
    alt: "Montierte Garderobe mit Kleiderstangen.",
    title: "Einrichtungen & Aufbau",
  },
  {
    src: "/images/gallery-kisten-mtm-2026.webp",
    alt: "Umzugskartons und Transportmaterial bei einem Einsatz.",
    title: "Transport & Organisation",
  },
] as const;

export function HomeExperience() {
  const [selectedService, setSelectedService] = useState<ServiceId>("umzug");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

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
            src="/images/teamfoto-mtm-2026-v2.webp"
            alt="Das Team von MTM Möbel Transport Montage vor den Firmenfahrzeugen"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,7,9,0.84)_0%,rgba(20,7,9,0.48)_46%,rgba(20,7,9,0.18)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-2 bg-accent" />
          <div className="container-shell relative z-10 pb-12 pt-24 sm:pb-16 lg:pb-20">
            <div className="max-w-3xl">
              <p className="eyebrow-light">MTM Möbel Transport Montage · {company.area}</p>
              <h1 id="hero-heading" className="mt-5 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[4.2rem] lg:leading-[1.06]">
                Umzug, Transport oder Montage? MTM erledigt das.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
                Zuverlässige Unterstützung für Umzüge, Möbeltransporte, Montagen, Expresstransporte, Entrümpelungen und abgestimmte Entkernungsarbeiten in Hannover & Umland.
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
                <p className="section-intro">Ein kompakter Überblick. Auf der Leistungsseite finden Sie alle Leistungen ausführlicher erklärt.</p>
              </div>
              <Link href="/leistungen" className="inline-flex items-center gap-2 text-sm font-bold text-accent-dark hover:underline">Alle Leistungen ansehen<ArrowRight size={16} /></Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {homeServices.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.id} className="flex min-h-full flex-col overflow-hidden rounded-[1.6rem] border border-rose-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                    <div className="relative aspect-[4/3] overflow-hidden bg-rose-50">
                      <Image src={service.image} alt={service.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-accent-dark">
                        <Icon size={22} />
                      </span>
                      <h3 className="text-xl font-bold text-navy">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                      <div className="mt-auto pt-7">
                        <Link href={service.href} className="inline-flex items-center gap-2 text-sm font-bold text-accent-dark hover:underline">Mehr zu dieser Leistung<ArrowRight size={15} /></Link>
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

        <section className="py-16 sm:py-20" aria-labelledby="galerie-heading">
          <div className="container-shell">
            <div className="overflow-hidden rounded-[2rem] border border-rose-100 bg-white p-7 shadow-card sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="eyebrow">Bildergalerie</p>
                  <h2 id="galerie-heading" className="section-heading">Echte Eindrücke aus Transport und Montage.</h2>
                  <p className="section-intro">Die Galerie bleibt kompakt und kann bei Bedarf direkt geöffnet werden. So wirkt die Startseite aufgeräumt, ohne dass die echten Bilder verloren gehen.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setGalleryOpen((current) => !current)}
                  aria-expanded={galleryOpen}
                  aria-controls="mtm-gallery-content"
                  className="button-primary justify-center self-start"
                >
                  {galleryOpen ? "Bildergalerie schließen" : "Bildergalerie öffnen"}
                  <ChevronDown size={18} className={`transition ${galleryOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {galleryImages.slice(0, 3).map((image) => (
                  <div key={image.src} className="overflow-hidden rounded-[1.35rem] bg-rose-50 shadow-sm">
                    <div className="relative aspect-[4/3]">
                      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-navy">{image.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                id="mtm-gallery-content"
                className={`overflow-hidden transition-all duration-500 ease-out ${galleryOpen ? "mt-8 max-h-[6000px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="md:hidden">
                  <div className="flex snap-x gap-4 overflow-x-auto pb-2">
                    {galleryImages.map((image) => (
                      <article key={image.src} className="min-w-[82%] snap-start overflow-hidden rounded-[1.35rem] border border-rose-100 bg-white shadow-sm">
                        <div className="relative aspect-[4/3]">
                          <Image src={image.src} alt={image.alt} fill sizes="80vw" className="object-cover" />
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-sm font-semibold text-navy">{image.title}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="hidden md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3">
                  {galleryImages.map((image) => (
                    <article key={image.src} className="overflow-hidden rounded-[1.35rem] border border-rose-100 bg-white shadow-sm">
                      <div className="relative aspect-[4/3]">
                        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1280px) 50vw, 33vw" className="object-cover" />
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-sm font-semibold text-navy">{image.title}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20" aria-labelledby="einblicke-heading">
          <div className="container-shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">Referenzen</p>
                <h2 id="einblicke-heading" className="section-heading">Ein sauberer Platzhalter für spätere Referenzen.</h2>
                <p className="section-intro">Die Bildgalerie ist jetzt eingebaut. Dieser Bereich bleibt bewusst als einzelner Platzhalter für spätere Referenzen und Projektbeispiele erhalten.</p>
              </div>
            </div>
            <div className="mt-10 max-w-3xl">
              {placeholders.map(({ title, text, icon: Icon, button }) => (
                <article key={title} className="rounded-[1.8rem] border border-dashed border-rose-200 bg-white p-7 shadow-card sm:p-8">
                  <span className="inline-flex rounded-2xl bg-rose-50 p-3 text-accent-dark"><Icon size={24} /></span>
                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-navy">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
                  <div className="mt-6 inline-flex rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-accent-dark">{button}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ablauf" className="scroll-mt-28 py-16 sm:py-20" aria-labelledby="ablauf-heading">
          <div className="container-shell">
            <div className="brand-gradient relative overflow-hidden rounded-[2rem] px-6 py-8 text-white shadow-soft sm:px-10 sm:py-12 lg:px-12 lg:py-14">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-28 -top-16 hidden h-[145%] w-[78%] opacity-[0.12] lg:block">
                  <Image src="/images/karte-region-hannover-2026-v2.png" alt="" fill sizes="50vw" className="object-contain object-center scale-[1.38]" />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_36%,rgba(255,255,255,0.14),transparent_24%),linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.08)_100%)]" />
              </div>
              <div className="relative lg:grid lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-14">
                <div>
                  <p className="eyebrow-light">Einsatzgebiet & Ablauf</p>
                  <h2 id="ablauf-heading" className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Hannover & Umland</h2>
                  <p className="mt-5 max-w-xl text-base leading-8 text-white/90">
                    MTM unterstützt bei Transport-, Montage-, Umzugs-, Express-, Entkernungs- und Räumungsaufträgen in Hannover und der umliegenden Region.
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {process.map((item) => (
                      <div key={item.step} className="rounded-[1.4rem] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-extrabold text-accent-dark">{item.step}</div>
                        <h3 className="text-base font-bold text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/90">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative mt-10 flex items-center justify-center lg:mt-0 lg:justify-end">
                  <div className="absolute h-[80%] w-[80%] rounded-full bg-white/10 blur-3xl" />
                  <Image
                    src="/images/karte-region-hannover-2026-v2.png"
                    alt="Grafische Darstellung der Region Hannover mit Ortsnamen im Umland"
                    width={1254}
                    height={1254}
                    className="relative z-10 h-auto w-full max-w-[560px] drop-shadow-[0_20px_48px_rgba(44,8,12,0.32)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="anfrage" className="scroll-mt-28 bg-soft py-16 sm:py-20" aria-labelledby="anfrage-heading">
          <div className="container-shell">
            <div className="grid gap-8 overflow-hidden rounded-[2rem] bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12 lg:p-12">
              <div>
                <p className="eyebrow">Digitale Anfrage</p>
                <h2 id="anfrage-heading" className="section-heading">Schnell starten – der Assistent fragt den Rest ab.</h2>
                <p className="section-intro">
                  Statt eines langen Formulars starten Sie einfach mit der passenden Leistung. Der KI-Assistent führt anschließend Schritt für Schritt durch die Anfrage.
                </p>
                <div className="mt-7 space-y-3 rounded-[1.4rem] bg-rose-50 p-5 text-sm leading-7 text-slate-700">
                  <p className="flex items-start gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-dark" />Nur die Angaben angeben, die wirklich zum Auftrag passen.</p>
                  <p className="flex items-start gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-dark" />Persönliche Prüfung statt automatischer Preisversprechen.</p>
                  <p className="flex items-start gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-dark" />Unverbindlich, übersichtlich und auch mobil schnell nutzbar.</p>
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

        <section className="py-16 sm:py-20" aria-labelledby="faq-teaser-heading">
          <div className="container-shell">
            <div className="overflow-hidden rounded-[2rem] border border-rose-100 bg-white p-7 shadow-card sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-3xl">
                <p className="eyebrow">FAQ</p>
                <h2 id="faq-teaser-heading" className="section-heading">Häufige Fragen jetzt auf einer eigenen Seite.</h2>
                <p className="section-intro">Auf der neuen FAQ-Seite finden Sie 6 übersichtliche Themenbereiche mit jeweils 10 Fragen und Antworten zu Leistungen, Ablauf, Terminen und Organisation.</p>
              </div>
              <div className="mt-6 lg:mt-0">
                <Link href="/faq" className="button-primary">Zur FAQ-Seite<ArrowRight size={17} /></Link>
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
                <h3 className="mt-4 text-lg font-bold text-navy">Einsatzgebiet</h3>
                <p className="mt-2 text-base font-semibold text-slate-700">{company.area}</p>
                <p className="mt-1 text-sm text-slate-500">Regional erreichbar für private und gewerbliche Aufträge.</p>
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
