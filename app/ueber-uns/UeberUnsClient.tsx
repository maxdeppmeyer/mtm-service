"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, ChevronDown, ExternalLink, Sparkles, Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryAssistant } from "@/components/InquiryAssistant";
import { ServiceId } from "@/lib/company";
import { useState } from "react";

const googleReviewsUrl =
  "https://www.google.com/search?rlz=1C1CHBD_deDE1184DE1203&sca_esv=8019248285bfd55b&cs=0&sxsrf=ANbL-n7gvUWmQwZ3_2shid06cW-xRNoHSQ:1780003879898&q=MTM+Service+M%C3%B6bel+Transport+Montage+Rezensionen&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNLcwMjIxtzSzNDUzMjUzN7AwNtvAyPiK0cA3xFchOLWoLDM5VcH38Lak1ByFkKLEvOKC_KISBd_8vJLE9FSFoNSq1LzizPy81LxFrCRrAQAJpS3egQAAAA&rldimm=17822479695625670836&tbm=lcl&hl=de-DE&sa=X&ved=2ahUKEwi2_tWX99yUAxUqUaQEHZ_UOGsQ9fQKegQIEBAG&biw=1920&bih=911&dpr=1#lkt=LocalPoiReviews";

const galleryImages = [
  {
    src: "/images/galerie-team-fahrzeuge-mtm-20260528-v6.webp",
    alt: "Das Team von MTM vor den Firmenfahrzeugen.",
  },
  {
    src: "/images/leistung-moebeltransport-mtm-20260528-v6.webp",
    alt: "MTM Team beim Möbeltransport mit einem verpackten Möbelstück.",
  },
  {
    src: "/images/leistung-moebelmontage-mtm-20260528-v6.webp",
    alt: "MTM Mitarbeiter bei einer Montagearbeit in einem Bad.",
  },
  {
    src: "/images/galerie-team-familienfoto-mtm-20260528-v6.webp",
    alt: "Gruppenfoto des MTM Teams vor mehreren Fahrzeugen.",
  },
  {
    src: "/images/galerie-team-lkw-offen-mtm-20260528-v6.webp",
    alt: "Mehrere MTM Mitarbeiter vor einem geöffneten Transportfahrzeug.",
  },
  {
    src: "/images/galerie-flexbox-lkw-mtm-20260528-v6.webp",
    alt: "MTM FlexBox Fahrzeug auf dem Firmengelände.",
  },
  {
    src: "/images/galerie-fahrer-lkw-mtm-20260528-v6.webp",
    alt: "MTM Mitarbeiter im Fahrerhaus eines Transportfahrzeugs.",
  },
  {
    src: "/images/galerie-beladung-hubwagen-mtm-20260528-v6.webp",
    alt: "MTM Mitarbeiter beim Beladen eines Fahrzeugs mit einem Hubwagen.",
  },
  {
    src: "/images/galerie-transport-innenstadt-mtm-20260528-v6.webp",
    alt: "Transportauftrag in der Innenstadt mit Kartons und Fahrzeugen.",
  },
  {
    src: "/images/galerie-regalraum-neu-mtm-20260528-v6.webp",
    alt: "Neu eingerichteter Regalraum nach einem MTM Einsatz.",
  },
  {
    src: "/images/galerie-montage-duschkabine-mtm-20260528-v6.webp",
    alt: "Montage einer Duschkabine durch MTM.",
  },
  {
    src: "/images/galerie-montage-badschrank-mtm-20260528-v6.webp",
    alt: "MTM Mitarbeiter bei der Montage eines Badschranks.",
  },
  {
    src: "/images/galerie-buero-arbeitsplatz-mtm-20260528-v6.webp",
    alt: "MTM Mitarbeiterin am Arbeitsplatz im Büro.",
  },
  {
    src: "/images/galerie-buero-service-mtm-20260528-v6.webp",
    alt: "MTM Mitarbeiterin im Büro mit Headset.",
  },
  {
    src: "/images/galerie-team-besprechung-mtm-20260528-v6.webp",
    alt: "Besprechung im Team während einer Präsentation.",
  },
  {
    src: "/images/galerie-schulung-praesentation-mtm-20260528-v6.webp",
    alt: "MTM Team bei einer internen Schulung oder Präsentation.",
  },
  {
    src: "/images/galerie-team-portrait-mtm-20260528-v6.webp",
    alt: "Zwei MTM Mitarbeiter in Firmenkleidung.",
  },
  {
    src: "/images/leistung-entruempelung-mtm-20260527-v5.webp",
    alt: "Geräumter Raum nach einem MTM Einsatz.",
  },
  {
    src: "/images/leistung-umzug-mtm-20260527-v5.webp",
    alt: "MTM Fahrzeug bei einem Umzugseinsatz.",
  },
  {
    src: "/images/leistung-expresstransport-mtm-20260527-v5.webp",
    alt: "MTM Transportfahrzeug für kurzfristige Transportaufträge.",
  },
  {
    src: "/images/leistung-entkernung-mtm-20260527-v7.webp",
    alt: "Innenraum während einer Entkernung oder Sanierung.",
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
    src: "/images/galerie-transport-karton-mtm-20260528-v6.webp",
    alt: "Kartons bei einem Transportauftrag.",
  },
  {
    src: "/images/galerie-einsatz-umzug-mtm-20260527-v5.webp",
    alt: "MTM Fahrzeug beim Einsatz im Wohngebiet.",
  },
] as const;

const featuredCustomers = [
  "Mömax Garbsen",
  "Mömax Vahrenwald",
  "Mömax Wülfel",
  "Hausverwaltung Pöl",
  "Landesaufnahmebehörde Niedersachsen",
  "Blieste Planungen",
  "Culina Direkt",
  "Diakovere Altenhilfe",
] as const;

const googleReviewHighlights = [
  {
    value: "4,9 / 5",
    label: "Google-Bewertung",
    description: "Aktuelle Gesamtbewertung im Google Unternehmensprofil.",
  },
  {
    value: "35",
    label: "öffentliche Rezensionen",
    description: "Stand der sichtbaren Google-Bewertungen zum Profil von MTM.",
  },
  {
    value: "Hannover & Umland",
    label: "Einsatzgebiet",
    description: "Privat- und Geschäftskunden im Raum Hannover und Umgebung.",
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
                src="/images/galerie-team-fahrzeuge-mtm-20260528-v6.webp"
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
                  <p className="section-intro">Öffnen Sie die Galerie für weitere Einblicke in Fahrzeuge, Montagearbeiten, Teamfotos und Einsätze von MTM.</p>
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
                className={`overflow-hidden transition-all duration-500 ease-out ${galleryOpen ? "mt-8 max-h-[9000px] opacity-100" : "max-h-0 opacity-0"}`}
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
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[1.8rem] border border-rose-100 bg-white p-7 shadow-card sm:p-8">
                <div className="inline-flex rounded-2xl bg-rose-50 p-3 text-accent-dark"><Star size={24} /></div>
                <p className="eyebrow mt-6">Rezensionen</p>
                <h2 id="referenzen-heading" className="section-heading">Google-Bewertungen & ehrliche Einblicke.</h2>
                <p className="section-intro">
                  Auf Google wird MTM aktuell mit einer sehr starken Gesamtbewertung geführt. Über den direkten Button können Besucher jederzeit die vollständigen Rezensionen im Google Unternehmensprofil öffnen.
                </p>

                <div className="mt-6 flex items-center gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={20} className="fill-current" />
                  ))}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {googleReviewHighlights.map((item) => (
                    <div key={item.label} className="rounded-[1.4rem] border border-rose-100 bg-rose-50/60 p-4">
                      <div className="text-2xl font-extrabold tracking-tight text-navy">{item.value}</div>
                      <div className="mt-1 text-sm font-semibold text-accent-dark">{item.label}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={googleReviewsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="button-primary"
                  >
                    Google Rezensionen ansehen <ExternalLink size={16} />
                  </a>
                  <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-accent-dark">
                    <BadgeCheck size={16} /> Direkt zum Google Unternehmensprofil
                  </div>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-rose-100 bg-white p-7 shadow-card sm:p-8">
                <div className="inline-flex rounded-2xl bg-rose-50 p-3 text-accent-dark"><Building2 size={24} /></div>
                <p className="eyebrow mt-6">Zufriedene Kunden</p>
                <h2 className="section-heading">Unternehmen und Einrichtungen, die MTM vertrauen.</h2>
                <p className="section-intro">
                  Neben vielen Privatkunden arbeitet MTM auch für Geschäftskunden, Einrichtungen und bekannte Häuser aus Hannover und der Region.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {featuredCustomers.map((customer) => (
                    <span key={customer} className="rounded-full border border-rose-100 bg-rose-50 px-4 py-2 text-sm font-semibold text-slate-700">
                      {customer}
                    </span>
                  ))}
                </div>
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
