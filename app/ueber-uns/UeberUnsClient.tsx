"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, FolderOpen, Images, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryAssistant } from "@/components/InquiryAssistant";
import { ServiceId } from "@/lib/company";
import { useState } from "react";

const galleryImages = [
  {
    src: "/images/hero-team-mtm-20260527-v5.webp",
    alt: "Das Team von MTM vor den Firmenfahrzeugen.",
  },
  {
    src: "/images/leistung-moebelmontage-mtm-20260527-v5.webp",
    alt: "MTM Mitarbeiter bei der Möbelmontage in einem Wohnraum.",
  },
  {
    src: "/images/leistung-entruempelung-mtm-20260527-v5.webp",
    alt: "Geräumter Raum nach einem MTM Einsatz.",
  },
  {
    src: "/images/leistung-moebeltransport-mtm-20260527-v5.webp",
    alt: "MTM Mitarbeiter im beladenen Transportfahrzeug.",
  },
  {
    src: "/images/leistung-expresstransport-mtm-20260527-v5.webp",
    alt: "MTM Transportfahrzeug für kurzfristige Transportaufträge.",
  },
  {
    src: "/images/leistung-umzug-mtm-20260527-v5.webp",
    alt: "MTM Fahrzeug bei einem Umzugseinsatz.",
  },
  {
    src: "/images/leistung-entkernung-mtm-20260527-v7.webp",
    alt: "Innenraum während einer Entkernung oder Sanierung.",
  },
  {
    src: "/images/galerie-montage-detail-mtm-20260527-v5.webp",
    alt: "Detailaufnahme bei der Möbelmontage.",
  },
  {
    src: "/images/galerie-regalraum-mtm-20260527-v5.webp",
    alt: "Aufgestellte Regale in einem Innenraum.",
  },
  {
    src: "/images/galerie-schrank-mtm-20260527-v5.webp",
    alt: "Montierter Schrank in einem Raum.",
  },
  {
    src: "/images/galerie-garderobe-mtm-20260527-v5.webp",
    alt: "Montierte Garderobe mit Kleiderstangen.",
  },
  {
    src: "/images/galerie-transport-kartons-mtm-20260527-v5.webp",
    alt: "Kartons bei einem Transportauftrag.",
  },
  {
    src: "/images/galerie-einsatz-umzug-mtm-20260527-v5.webp",
    alt: "MTM Fahrzeug beim Einsatz im Wohngebiet.",
  },
] as const;

export default function UeberUnsClient() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceId>("umzug");
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <>
      <Header onOpenAssistant={() => setAssistantOpen(true)} />
      <main>
        <section className="brand-gradient overflow-hidden text-white">
          <div className="container-shell grid gap-9 py-12 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
            <div>
              <p className="eyebrow-light">Über uns</p>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">Echte Einblicke in unsere Arbeit.</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/90 sm:text-lg">
                Hier erhalten Sie einen Eindruck vom MTM-Team, unseren Fahrzeugen sowie ausgeführten Transport- und Montagearbeiten.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/leistungen" className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-4 font-bold text-accent-dark transition hover:bg-rose-50">
                  Leistungen ansehen <ArrowRight size={17} />
                </Link>
                <button type="button" onClick={() => setAssistantOpen(true)} className="hero-button-secondary py-4">
                  <Sparkles size={17} /> Anfrage starten
                </button>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-soft">
              <Image
                src="/images/hero-team-mtm-20260527-v5.webp"
                alt="Das Team von MTM Möbel Transport Montage vor den Firmenfahrzeugen"
                width={1600}
                height={980}
                className="aspect-[16/10] w-full rounded-[1.45rem] object-cover object-center"
                priority
              />
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
                  <p className="section-intro">Öffnen Sie die Galerie für weitere Einblicke in Fahrzeuge, Montagearbeiten und Einsätze von MTM.</p>
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
                  <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-rose-50 shadow-sm">
                    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </div>
                ))}
              </div>

              <div
                id="mtm-gallery-content"
                className={`overflow-hidden transition-all duration-500 ease-out ${galleryOpen ? "mt-8 max-h-[6000px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="md:hidden">
                  <div className="flex snap-x gap-4 overflow-x-auto pb-2">
                    {galleryImages.slice(3).map((image) => (
                      <div key={image.src} className="relative aspect-[4/3] min-w-[82%] snap-start overflow-hidden rounded-[1.35rem] border border-rose-100 bg-white shadow-sm">
                        <Image src={image.src} alt={image.alt} fill sizes="80vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3">
                  {galleryImages.slice(3).map((image) => (
                    <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] border border-rose-100 bg-white shadow-sm">
                      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1280px) 50vw, 33vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-soft py-16 sm:py-20" aria-labelledby="referenzen-heading">
          <div className="container-shell">
            <div className="max-w-3xl rounded-[1.8rem] border border-dashed border-rose-200 bg-white p-7 shadow-card sm:p-8">
              <span className="inline-flex rounded-2xl bg-rose-50 p-3 text-accent-dark"><FolderOpen size={24} /></span>
              <p className="eyebrow mt-6">Referenzen</p>
              <h2 id="referenzen-heading" className="section-heading">Ein sauberer Platzhalter für spätere Referenzen.</h2>
              <p className="section-intro">Hier können später echte Projektbeispiele, Kundenstimmen oder Vorher-Nachher-Inhalte ergänzt werden.</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-accent-dark">
                <Images size={16} /> Platzhalter für Referenzen
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {assistantOpen && <InquiryAssistant open={assistantOpen} defaultService={selectedService} onServiceChange={setSelectedService} onClose={() => setAssistantOpen(false)} />}
    </>
  );
}
