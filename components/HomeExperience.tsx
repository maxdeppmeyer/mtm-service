"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryAssistant } from "@/components/InquiryAssistant";
import { company, extraServices, ServiceId, services } from "@/lib/company";
import { useEffect, useRef, useState } from "react";

/* ─── Data ─── */

const quickFacts = [
  { icon: ShieldCheck, title: "Sorgfältige Ausführung", text: "Verantwortungsvoller Umgang mit Möbeln, Gegenständen und Räumen." },
  { icon: ClipboardCheck, title: "Klare Abstimmung", text: "Sie beschreiben den Auftrag und erhalten eine persönliche Rückmeldung." },
  { icon: MapPin, title: "Regional erreichbar", text: "Für Privat- und Gewerbekunden in Hannover & Umland." },
  { icon: BadgeCheck, title: "Passende Leistungen", text: "Umzug, Transport, Montage, Entkernung, Express und Entrümpelung aus einer Hand." },
];

const homeServices = [
  { id: "umzug", title: services[0].title, description: services[0].description, image: services[0].image, alt: services[0].alt, href: "/leistungen#umzug", icon: Truck },
  { id: "moebeltransport", title: services[1].title, description: services[1].description, image: services[1].image, alt: services[1].alt, href: "/leistungen#moebeltransport", icon: Package },
  { id: "moebelmontage", title: services[2].title, description: services[2].description, image: services[2].image, alt: services[2].alt, href: "/leistungen#moebelmontage", icon: Wrench },
  { id: "entruempelung", title: services[3].title, description: services[3].description, image: services[3].image, alt: services[3].alt, href: "/leistungen#entruempelung", icon: Building2 },
  { id: "expresstransport", title: services[4].title, description: services[4].description, image: services[4].image, alt: services[4].alt, href: "/leistungen#expresstransport", icon: Clock3 },
  { id: "entkernung", title: "Entkernung", description: extraServices[0].description, image: extraServices[0].image, alt: extraServices[0].alt, href: "/leistungen#entkernung", icon: Building2 },
] as const;

const statsData = [
  { value: 4.9, decimals: 1, suffix: "★", label: "Google Bewertung" },
  { value: 35, decimals: 0, suffix: "+", label: "Kundenbewertungen" },
  { value: 6, decimals: 0, suffix: "", label: "Leistungen aus einer Hand" },
];

const cardDelays = ["reveal-delay-100", "reveal-delay-200", "reveal-delay-300", "reveal-delay-100", "reveal-delay-200", "reveal-delay-300"];

/* ─── Hooks ─── */

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Sub-components ─── */

function AnimatedNumber({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const [display, setDisplay] = useState(decimals > 0 ? `0.${"0".repeat(decimals)}` : "0");
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      let t0: number | null = null;
      function tick(ts: number) {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / 1500, 1);
        const val = (1 - Math.pow(1 - p, 3)) * value;
        setDisplay(decimals > 0 ? val.toFixed(decimals) : String(Math.floor(val)));
        if (p < 1) requestAnimationFrame(tick);
        else setDisplay(decimals > 0 ? value.toFixed(decimals) : String(value));
      }
      requestAnimationFrame(tick);
      obs.disconnect();
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, decimals]);

  return <span ref={ref}>{display}{suffix}</span>;
}

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  icon: LucideIcon;
  delay: string;
}

function ServiceCard({ title, description, image, alt, href, icon: Icon, delay }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.transform = `perspective(700px) rotateX(${-y * 5.5}deg) rotateY(${x * 5.5}deg) translateZ(8px)`;
    el.style.boxShadow = `${-x * 5}px ${-y * 5}px 40px rgba(84,18,24,0.14), 0 20px 48px rgba(84,18,24,0.1)`;
  }

  function onLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "";
    ref.current.style.boxShadow = "";
  }

  return (
    <div
      ref={ref}
      className={`reveal ${delay} group card-wrapper card-shine card-glow-hover flex min-h-full flex-col overflow-hidden rounded-[1.6rem] border border-rose-100 bg-white shadow-card`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.13s ease-out, box-shadow 0.3s ease", willChange: "transform" }}
    >
      <article className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-rose-50">
          <Image
            src={image} alt={alt} fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="icon-3d mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-accent-dark">
            <Icon size={22} />
          </span>
          <h3 className="text-xl font-bold text-navy">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          <div className="mt-auto pt-7">
            <Link href={href} className="inline-flex items-center gap-2 text-sm font-bold text-accent-dark transition-all duration-200 hover:gap-3 hover:underline">
              Mehr zu dieser Leistung<ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

function FactCard({ icon: Icon, title, text, delay }: { icon: LucideIcon; title: string; text: string; delay: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.transform = `perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateZ(6px)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      className={`reveal ${delay} card-wrapper card-shine glass-dark rounded-[1.5rem] p-6`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.13s ease-out", willChange: "transform" }}
    >
      <article>
        <span className="icon-3d mb-5 inline-flex rounded-2xl bg-accent/15 p-3 text-rose-300">
          <Icon size={22} />
        </span>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-rose-100/70">{text}</p>
      </article>
    </div>
  );
}

/* ─── Main Component ─── */

export function HomeExperience() {
  const [selectedService, setSelectedService] = useState<ServiceId>("umzug");
  const [assistantOpen, setAssistantOpen] = useState(false);
  useScrollReveal();

  function openAssistant(service?: ServiceId) {
    if (service) setSelectedService(service);
    setAssistantOpen(true);
  }

  return (
    <>
      <Header onOpenAssistant={() => openAssistant()} />
      <main>

        {/* ══════════════════════════════════════
            HERO — Floating shapes + animated CTA
            ══════════════════════════════════════ */}
        <section
          className="hero-cover relative flex min-h-[calc(100svh-78px)] items-end overflow-hidden text-white"
          aria-labelledby="hero-heading"
        >
          <Image
            src="/images/hero-team-mtm-20260529-v6.webp"
            alt="Das Team von MTM Möbel Transport Montage vor den Firmenfahrzeugen"
            fill priority sizes="100vw"
            className="object-cover object-center"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,7,9,0.90)_0%,rgba(20,7,9,0.52)_46%,rgba(20,7,9,0.20)_100%)]" />

          {/* Floating decorative shapes */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="shape-float-1 absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl" />
            <div className="shape-float-2 absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent/8 blur-2xl" />
            <div className="shape-float-3 absolute right-1/4 top-1/4 h-44 w-44 rounded-full bg-white/[0.04] blur-xl" />
            {/* Geometric outlines */}
            <div className="shape-float-1 absolute right-[8%] top-[32%] h-20 w-20 rotate-45 rounded-sm border border-white/[0.07]" />
            <div className="shape-float-2 absolute right-[31%] bottom-[26%] h-10 w-10 rotate-12 rounded-sm border border-accent/20" />
            <div className="shape-float-3 absolute left-[22%] top-[30%] h-14 w-14 rounded-full border border-white/[0.06]" />
            {/* Dot grid texture */}
            <div className="dot-grid absolute inset-0" />
          </div>

          {/* Bottom gradient accent line */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent" />

          <div className="container-shell relative z-10 pb-12 pt-24 sm:pb-16 lg:pb-20">
            <div className="max-w-3xl">
              <p className="eyebrow-light reveal">MTM Möbel Transport Montage · {company.area}</p>
              <h1
                id="hero-heading"
                className="reveal reveal-delay-100 mt-5 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[4.2rem] lg:leading-[1.06]"
              >
                Umzug, Transport oder Montage?{" "}
                <span className="gradient-text">MTM erledigt das.</span>
              </h1>
              <p className="reveal reveal-delay-200 mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
                Zuverlässige Unterstützung für Umzüge, Möbeltransporte, Montagen, Expresstransporte, Entrümpelungen und abgestimmte Entkernungsarbeiten in Hannover & Umland.
              </p>
              <div className="reveal reveal-delay-300 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button type="button" onClick={() => openAssistant()} className="button-primary button-glow justify-center py-4">
                  <span>Anfrage starten</span><ArrowRight size={18} />
                </button>
                <Link href="/leistungen" className="hero-button-secondary justify-center py-4">Leistungen ansehen</Link>
                <a href={`tel:${company.phoneHref}`} className="hero-button-secondary justify-center py-4">
                  <Phone size={17} />{company.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS BAR — Animated numbers
            ══════════════════════════════════════ */}
        <section className="brand-gradient relative overflow-hidden py-10" aria-label="Kurzübersicht MTM">
          <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.06]" aria-hidden="true" />
          <div className="container-shell relative z-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/20">
              {statsData.map(({ value, decimals, suffix, label }) => (
                <div key={label} className="reveal flex flex-col items-center gap-1 px-6 text-center text-white">
                  <span className="stat-number text-4xl sm:text-5xl">
                    <AnimatedNumber value={value} decimals={decimals} suffix={suffix} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SERVICES — 3D tilt cards with shine
            ══════════════════════════════════════ */}
        <section id="leistungen" className="scroll-mt-28 py-16 sm:py-24" aria-labelledby="leistungen-heading">
          <div className="container-shell">
            <div className="reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">Leistungen</p>
                <h2 id="leistungen-heading" className="section-heading">Unsere wichtigsten Leistungen</h2>
                <p className="section-intro">Ein kompakter Überblick. Auf der Leistungsseite finden Sie alle Leistungen ausführlicher erklärt.</p>
              </div>
              <Link href="/leistungen" className="inline-flex items-center gap-2 text-sm font-bold text-accent-dark hover:underline">
                Alle Leistungen ansehen<ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {homeServices.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  delay={cardDelays[i] ?? "reveal-delay-100"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHY MTM — Dark glass cards
            ══════════════════════════════════════ */}
        <section
          className="mesh-bg-navy relative overflow-hidden py-16 sm:py-24"
          aria-labelledby="vorteile-heading"
        >
          {/* Floating glow blobs */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="shape-float-1 absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-3xl" />
            <div className="shape-float-3 absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-accent/8 blur-2xl" />
            <div className="dot-grid absolute inset-0 opacity-[0.04]" />
          </div>

          <div className="container-shell relative z-10">
            <div className="reveal mx-auto max-w-2xl text-center">
              <p className="eyebrow-light">Warum MTM?</p>
              <h2
                id="vorteile-heading"
                className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.8rem] lg:leading-[1.12]"
              >
                Persönlich, sorgfältig und regional.
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {quickFacts.map(({ icon, title, text }, i) => (
                <FactCard
                  key={title}
                  icon={icon}
                  title={title}
                  text={text}
                  delay={cardDelays[i] ?? "reveal-delay-100"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            INQUIRY — Premium glass card
            ══════════════════════════════════════ */}
        <section id="anfrage" className="scroll-mt-28 bg-soft py-16 sm:py-24" aria-labelledby="anfrage-heading">
          <div className="container-shell">
            <div className="reveal relative grid gap-8 overflow-hidden rounded-[2rem] bg-white p-7 shadow-[0_24px_80px_rgba(84,18,24,0.11),0_4px_16px_rgba(84,18,24,0.05)] ring-1 ring-rose-100/80 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12 lg:p-12">
              {/* Subtle inner glow gradient */}
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white via-transparent to-rose-50/60" aria-hidden="true" />

              <div className="relative z-10">
                <p className="eyebrow">Digitale Anfrage</p>
                <h2 id="anfrage-heading" className="section-heading">Schnell starten – der Assistent fragt den Rest ab.</h2>
                <p className="section-intro">
                  Statt eines langen Formulars starten Sie einfach mit der passenden Leistung. Der Anfrage-Assistent führt anschließend Schritt für Schritt durch die Anfrage.
                </p>
                <div className="mt-7 space-y-3 rounded-[1.4rem] bg-rose-50 p-5 text-sm leading-7 text-slate-700">
                  <p className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-dark" />
                    Nur die Angaben angeben, die wirklich zum Auftrag passen.
                  </p>
                  <p className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-dark" />
                    Persönliche Prüfung statt automatischer Preisversprechen.
                  </p>
                  <p className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-dark" />
                    Unverbindlich, übersichtlich und auch mobil schnell nutzbar.
                  </p>
                </div>
              </div>

              <div className="relative z-10 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <button
                    key={service.id} type="button"
                    onClick={() => openAssistant(service.id)}
                    className="group flex min-h-[92px] items-center justify-between gap-4 rounded-[1.35rem] border border-rose-100 bg-white px-5 py-4 text-left shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-rose-200 hover:bg-rose-50 hover:shadow-soft"
                  >
                    <span>
                      <span className="block font-bold text-navy">{service.title}</span>
                      <span className="mt-1 block text-sm text-slate-500">Anfrage vorbereiten</span>
                    </span>
                    <ArrowRight size={18} className="shrink-0 text-accent-dark transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                ))}
                <button
                  type="button" onClick={() => openAssistant("sonstige")}
                  className="group flex min-h-[92px] items-center justify-between gap-4 rounded-[1.35rem] border border-rose-100 bg-white px-5 py-4 text-left shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-rose-200 hover:bg-rose-50 hover:shadow-soft sm:col-span-2"
                >
                  <span>
                    <span className="block font-bold text-navy">Sonstige Anfrage</span>
                    <span className="mt-1 block text-sm text-slate-500">Individuelles Anliegen beschreiben</span>
                  </span>
                  <ArrowRight size={18} className="shrink-0 text-accent-dark transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      {/* Desktop floating assistant button */}
      <button
        type="button" onClick={() => openAssistant()}
        className="button-primary fixed bottom-20 right-4 z-30 hidden items-center gap-2 rounded-full px-5 py-4 font-bold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(216,28,45,0.5)] sm:inline-flex lg:bottom-6 lg:right-6"
      >
        <Sparkles size={19} />Anfrage-Assistent
      </button>

      {/* Mobile bottom CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-rose-100 bg-white/95 p-3 backdrop-blur-sm sm:hidden">
        <a href={`tel:${company.phoneHref}`} className="button-secondary justify-center px-3">
          <Phone size={17} />Anrufen
        </a>
        <button type="button" onClick={() => openAssistant()} className="button-primary justify-center px-3">
          Anfrage
        </button>
      </div>

      {assistantOpen && (
        <InquiryAssistant
          open={assistantOpen}
          defaultService={selectedService}
          onServiceChange={setSelectedService}
          onClose={() => setAssistantOpen(false)}
        />
      )}
    </>
  );
}
