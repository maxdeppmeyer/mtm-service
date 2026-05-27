"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Phone, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryAssistant } from "@/components/InquiryAssistant";
import { company, ServiceId } from "@/lib/company";
import { useState } from "react";

const faqSections = [
  {
    title: "Umzug",
    questions: [
      ["Welche Umzüge übernimmt MTM?", "MTM unterstützt bei privaten und gewerblichen Umzügen in Hannover & Umland."],
      ["Kann ich auch einen kleinen Umzug anfragen?", "Ja, auch kleinere Umzüge oder Teilumzüge können unverbindlich angefragt werden."],
      ["Hilft MTM beim Tragen und Verladen?", "Ja, das Tragen und sichere Verladen gehört je nach abgestimmtem Auftrag dazu."],
      ["Kann ein Umzug mit Montage kombiniert werden?", "Ja, Umzug, Transport und Möbelmontage können gemeinsam angefragt werden."],
      ["Werden auch Firmenumzüge durchgeführt?", "Ja, gewerbliche Umzüge können ebenfalls individuell angefragt werden."],
      ["Kann ich einen Wunschtermin nennen?", "Ja, im Anfrage-Assistenten können Sie ein Wunschdatum oder einen Zeitraum angeben."],
      ["Sind kurzfristige Umzüge möglich?", "Kurzfristige Anfragen sind möglich. Die Verfügbarkeit wird persönlich geprüft."],
      ["Kann ich Fotos mitschicken?", "Ja, Fotos helfen bei der ersten Einschätzung und können im Assistenten hochgeladen werden."],
      ["Ist die Anfrage verbindlich?", "Nein, die Anfrage bleibt unverbindlich bis zur persönlichen Abstimmung."],
      ["Wie starte ich am schnellsten?", "Wählen Sie auf der Startseite Umzug aus oder rufen Sie direkt an."],
    ],
  },
  {
    title: "Möbeltransport",
    questions: [
      ["Transportiert MTM einzelne Möbelstücke?", "Ja, einzelne Möbelstücke und komplette Lieferungen können angefragt werden."],
      ["Kann ich den Transport ohne Umzug buchen?", "Ja, Möbeltransport ist eine eigenständige Leistung."],
      ["Werden empfindliche Möbel transportiert?", "Der Transport wird sorgfältig und passend zum Gegenstand abgestimmt."],
      ["Ist Abholung und Lieferung möglich?", "Ja, Abholung und Transport zum gewünschten Ziel können angefragt werden."],
      ["Gibt es Transporte für Gewerbekunden?", "Ja, auch gewerbliche Möbel- oder Objekttransporte sind möglich."],
      ["Kann ich Montage ergänzen?", "Ja, Transport und anschließende Montage können kombiniert werden."],
      ["Was sollte ich in der Anfrage nennen?", "Gegenstände, Start- und Zielort, Termin sowie besondere Tragebedingungen helfen bei der Prüfung."],
      ["Kann ich Fotos des Möbelstücks senden?", "Ja, optional können Bilder mit der Anfrage übermittelt werden."],
      ["Erhalte ich sofort einen Preis?", "Nein, die Angaben werden erst persönlich geprüft und anschließend beantwortet."],
      ["Fährt MTM in das Umland?", "Ja, das Einsatzgebiet umfasst Hannover & Umland."],
    ],
  },
  {
    title: "Möbelmontage",
    questions: [
      ["Welche Möbel montiert MTM?", "Zum Beispiel Schränke, Regale und weitere geeignete Einrichtungselemente nach Abstimmung."],
      ["Ist auch eine Demontage möglich?", "Ja, Auf- und Abbau können je nach Auftrag übernommen werden."],
      ["Kann Montage separat angefragt werden?", "Ja, Möbelmontage ist auch ohne Transport möglich."],
      ["Kann Montage zum Umzug ergänzt werden?", "Ja, das ist eine sinnvolle Kombination und kann zusammen angefragt werden."],
      ["Kann ich Küchen- oder Schrankelemente anfragen?", "Ausgewählte Elemente können beschrieben und anschließend persönlich geprüft werden."],
      ["Muss ich Werkzeug bereitstellen?", "Die Einzelheiten werden vorab abgestimmt; nennen Sie zunächst nur den gewünschten Umfang."],
      ["Kann ich Bilder der Bauteile schicken?", "Ja, Fotos helfen bei der Einschätzung der Montage."],
      ["Wird der Arbeitsplatz geschützt?", "MTM legt Wert auf eine sorgfältige und ordentliche Durchführung vor Ort."],
      ["Ist die Montage für Gewerbe geeignet?", "Auch gewerbliche Montageanfragen können gestellt werden."],
      ["Wie frage ich die Leistung an?", "Starten Sie den Assistenten und wählen Sie Möbelmontage."],
    ],
  },
  {
    title: "Entrümpelung & Entsorgung",
    questions: [
      ["Welche Räume können geräumt werden?", "Zum Beispiel Wohnung, Keller, Garage oder geeignete Gewerbeflächen."],
      ["Übernimmt MTM auch die Entsorgung?", "Ja, die Entsorgung kann nach Abstimmung Teil der Leistung sein."],
      ["Ist eine saubere Übergabe möglich?", "Eine saubere beziehungsweise besenreine Übergabe kann je nach Umfang abgestimmt werden."],
      ["Kann ich eine Haushaltsauflösung anfragen?", "Ja, beschreiben Sie dafür Umfang und Situation im Anfrage-Assistenten."],
      ["Werden Keller und Garagen geräumt?", "Ja, solche Räumungen können angefragt werden."],
      ["Muss vorher sortiert werden?", "Nicht zwingend. Die Vorgehensweise wird nach der Anfrage persönlich geklärt."],
      ["Helfen Fotos bei der Einschätzung?", "Ja, Fotos der Räume oder Gegenstände sind sehr hilfreich."],
      ["Erfolgt die Räumung diskret?", "MTM legt Wert auf eine verlässliche und diskrete Durchführung."],
      ["Sind kurzfristige Termine möglich?", "Die Verfügbarkeit wird nach Eingang der Anfrage persönlich geprüft."],
      ["Wie starte ich eine Anfrage?", "Wählen Sie Entrümpelung & Entsorgung auf der Startseite aus."],
    ],
  },
  {
    title: "Express & Entkernung",
    questions: [
      ["Was ist ein Expresstransport?", "Ein eilig benötigter Transport mit 3,5-Tonnen-LKW inklusive Fahrer nach Verfügbarkeit."],
      ["Sind kurzfristige Fahrten möglich?", "Ja, gerade dafür ist die Anfrage für Expresstransporte vorgesehen."],
      ["Welche Angaben braucht MTM für Express?", "Start, Ziel, Transportgut, Dringlichkeit und gewünschter Zeitpunkt sind besonders wichtig."],
      ["Kann Express mit Tragehilfe kombiniert werden?", "Zusatzleistungen können beschrieben und anschließend geprüft werden."],
      ["Was versteht MTM unter Entkernung?", "Ausgewählte Rückbauarbeiten an geeigneten Objekten nach vorheriger Prüfung und Absprache."],
      ["Welche Entkernungsarbeiten sind möglich?", "Mögliche Arbeiten werden erst nach Beschreibung beziehungsweise Besichtigung konkret abgestimmt."],
      ["Ist eine Besichtigung nötig?", "Bei Entkernungsarbeiten ist eine persönliche Prüfung in der Regel sinnvoll."],
      ["Kann Entkernung direkt online gebucht werden?", "Nein, die Anfrage dient zuerst der Prüfung und Abstimmung des Auftrags."],
      ["Kann ich Bilder für Entkernung senden?", "Ja, Bilder der Räume helfen bei der ersten Einordnung."],
      ["Welche Auswahl nutze ich im Assistenten?", "Für Express wählen Sie Expresstransporte, für Rückbauarbeiten Entkernung."],
    ],
  },
  {
    title: "Ablauf & Kontakt",
    questions: [
      ["Wie läuft eine Anfrage ab?", "Sie wählen eine Leistung aus, geben Eckdaten an und MTM meldet sich persönlich zurück."],
      ["Muss ich ein langes Formular ausfüllen?", "Nein, der Assistent fragt die Angaben schrittweise ab."],
      ["Kann ich auch telefonisch anfragen?", "Ja, MTM ist telefonisch unter der auf der Webseite angegebenen Nummer erreichbar."],
      ["Kann ich einen Rückruf wünschen?", "Ja, diese Option steht im Anfrage-Assistenten zur Verfügung."],
      ["Ist die Anfrage kostenlos?", "Die Anfrage ist unverbindlich. Eine konkrete Beauftragung erfolgt erst nach Abstimmung."],
      ["Bekomme ich automatisch einen Preis?", "Nein, Preis und Termin werden persönlich geprüft und abgestimmt."],
      ["In welcher Region arbeitet MTM?", "MTM ist in Hannover & Umland beziehungsweise der Region Hannover im Einsatz."],
      ["Können mehrere Leistungen kombiniert werden?", "Ja, zusätzliche Leistungen können in der Anfrage beschrieben werden."],
      ["Wann sollte ich Fotos mitschicken?", "Bei Möbeln, Räumungen, Montage oder besonderen Bedingungen sind Fotos besonders hilfreich."],
      ["Was passiert nach dem Absenden?", "MTM prüft Ihre Angaben und meldet sich zur weiteren Abstimmung zurück."],
    ],
  },
];

export default function FaqClient() {
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
        <section className="brand-gradient text-white">
          <div className="container-shell py-10 sm:py-12">
            <p className="eyebrow-light">FAQ</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">Häufige Fragen auf einen Blick.</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/90">
              Öffnen Sie einfach den passenden Bereich. Jede Kategorie enthält 10 kurze Antworten.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container-shell">
            <div className="grid items-start gap-5 lg:grid-cols-3">
              {faqSections.map((section) => (
                <details key={section.title} className="group overflow-hidden rounded-[1.6rem] border border-rose-100 bg-white shadow-card">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-left">
                    <span>
                      <span className="eyebrow">FAQ-Bereich</span>
                      <span className="mt-3 block text-xl font-bold text-navy">{section.title}</span>
                      <span className="mt-2 block text-sm text-slate-500">10 Fragen & Antworten</span>
                    </span>
                    <ChevronDown size={20} className="shrink-0 text-accent-dark transition group-open:rotate-180" />
                  </summary>
                  <div className="space-y-2 border-t border-rose-100 bg-rose-50/35 p-4">
                    {section.questions.map(([question, answer], index) => (
                      <details key={question} className="group/question rounded-xl border border-rose-100 bg-white px-4 py-3">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-semibold leading-6 text-navy">
                          <span>{index + 1}. {question}</span>
                          <ChevronDown size={16} className="mt-1 shrink-0 text-accent-dark transition group-open/question:rotate-180" />
                        </summary>
                        <p className="pt-3 text-sm leading-7 text-slate-600">{answer}</p>
                      </details>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-soft py-14 sm:py-16">
          <div className="container-shell overflow-hidden rounded-[2rem] bg-white p-7 shadow-card sm:p-9 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <p className="eyebrow">Noch Fragen offen?</p>
              <h2 className="section-heading">Anfrage einfach persönlich klären.</h2>
              <p className="section-intro">Der Assistent führt Sie Schritt für Schritt durch Ihren Auftrag. Alternativ erreichen Sie MTM telefonisch.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
              <button type="button" onClick={() => openAssistant()} className="button-primary"><Sparkles size={16} />Anfrage starten</button>
              <a href={`tel:${company.phoneHref}`} className="button-secondary"><Phone size={16} />{company.phoneDisplay}</a>
              <Link href="/leistungen" className="button-secondary">Leistungen<ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {assistantOpen && <InquiryAssistant open={assistantOpen} defaultService={selectedService} onServiceChange={setSelectedService} onClose={() => setAssistantOpen(false)} />}
    </>
  );
}
