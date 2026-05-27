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
    id: "umzug",
    title: "Umzug",
    questions: [
      ["Welche Umzüge übernimmt MTM?", "MTM unterstützt bei privaten, gewerblichen und auf Anfrage auch bei seniorengerechten Umzügen in Hannover & Umland."],
      ["Kann ich nur einen kleinen Umzug anfragen?", "Ja, auch kleinere Umzüge oder Teilumzüge können unverbindlich angefragt werden."],
      ["Hilft MTM auch beim Tragen der Möbel?", "Ja, MTM übernimmt im Rahmen des Auftrags selbstverständlich auch das Tragen und Verladen."],
      ["Kann Umzug und Möbelmontage kombiniert werden?", "Ja, genau dafür ist die Webseite ausgelegt. Umzug, Transport und Montage können passend kombiniert werden."],
      ["Muss ich Kartons selbst besorgen?", "Das hängt vom Auftrag ab. Im ersten Schritt reicht eine unverbindliche Anfrage, danach wird der genaue Bedarf persönlich besprochen."],
      ["Werden auch Firmenumzüge durchgeführt?", "Ja, gewerbliche Umzüge können ebenfalls angefragt werden, zum Beispiel für Büros oder kleinere Betriebsverlagerungen."],
      ["Ist vor dem Umzug eine Rücksprache möglich?", "Ja, MTM meldet sich persönlich zurück und klärt offene Punkte zum Ablauf, Umfang und Termin."],
      ["Kann ich meinen Wunschtermin angeben?", "Ja, Sie können im Anfrage-Assistenten einen Wunschtermin oder einen Zeitraum angeben."],
      ["Übernimmt MTM auch kurzfristige Umzüge?", "Kurzfristige Anfragen sind möglich. Die Verfügbarkeit wird nach Eingang der Anfrage persönlich geprüft."],
      ["Wie läuft die Anfrage für einen Umzug ab?", "Sie starten online oder telefonisch, geben die wichtigsten Eckdaten an und erhalten danach eine persönliche Rückmeldung."],
    ],
  },
  {
    id: "moebeltransport",
    title: "Möbeltransport",
    questions: [
      ["Transportiert MTM auch einzelne Möbelstücke?", "Ja, Möbeltransport ist nicht nur für komplette Einrichtungen geeignet, sondern auch für einzelne Stücke oder Lieferungen."],
      ["Sind auch empfindliche Möbel möglich?", "Ja, der Transport wird sorgfältig und passend zum Auftrag abgestimmt."],
      ["Kann ich einen Transport auch ohne Umzug buchen?", "Ja, Möbeltransport kann unabhängig von einem Umzug angefragt werden."],
      ["Unterstützt MTM auch bei Abholung und Lieferung?", "Ja, wenn Möbel oder Einrichtung von A nach B gebracht werden sollen, kann das passend angefragt werden."],
      ["Sind Transporte für Privatkunden und Gewerbe möglich?", "Ja, Möbeltransporte sind sowohl für Privatkunden als auch für gewerbliche Kunden geeignet."],
      ["Kann Transport mit Montage kombiniert werden?", "Ja, Transport und anschließende Montage lassen sich sinnvoll miteinander verbinden."],
      ["Kann ich Fotos vom Transportgut mitschicken?", "Ja, im Anfrage-Assistenten können optional Bilder hochgeladen werden."],
      ["Kann ich auch größere Lieferungen anfragen?", "Ja, auch größere Lieferungen oder umfangreichere Transporte können beschrieben und angefragt werden."],
      ["Bekomme ich sofort einen Festpreis?", "Nein, die Anfrage wird erst persönlich geprüft. Danach erfolgt eine passende Rückmeldung."],
      ["Wie schnell bekomme ich eine Rückmeldung?", "Nach Eingang der Anfrage meldet sich MTM so schnell wie möglich persönlich zurück."],
    ],
  },
  {
    id: "montage",
    title: "Möbelmontage",
    questions: [
      ["Welche Montagearbeiten bietet MTM an?", "MTM unterstützt beim Auf- und Abbau von Möbeln sowie bei ausgewählten Schrank- oder Küchenelementen."],
      ["Kann ich nur eine Montage ohne Transport anfragen?", "Ja, Möbelmontage kann auch einzeln ohne zusätzlichen Transport angefragt werden."],
      ["Wird auch eine Demontage übernommen?", "Ja, je nach Auftrag sind sowohl Aufbau als auch Demontage möglich."],
      ["Kann die Montage direkt mit dem Umzug kombiniert werden?", "Ja, das ist eine häufig sinnvolle Kombination und kann direkt gemeinsam angefragt werden."],
      ["Muss ich Werkzeuge bereitstellen?", "Nein, wichtige Details werden im Vorfeld abgestimmt. Sie müssen in der Anfrage nur den gewünschten Umfang beschreiben."],
      ["Sind auch Schränke und Regale möglich?", "Ja, typische Möbelstücke wie Schränke, Regale oder ähnliche Einrichtungselemente können angefragt werden."],
      ["Kann ich Fotos der Möbel schicken?", "Ja, Bilder helfen bei der Einschätzung und können optional hochgeladen werden."],
      ["Wird sauber gearbeitet?", "Ja, auf der Webseite wird ausdrücklich eine ordentliche und sorgfältige Arbeitsweise betont."],
      ["Ist Möbelmontage auch für Gewerbe möglich?", "Ja, auch gewerbliche Anfragen sind grundsätzlich möglich."],
      ["Wie frage ich die Montage am besten an?", "Am einfachsten über den Anfrage-Assistenten mit Auswahl der Leistung Möbelmontage."],
    ],
  },
  {
    id: "entruempelung",
    title: "Entrümpelung & Entsorgung",
    questions: [
      ["Welche Bereiche können entrümpelt werden?", "Zum Beispiel Wohnungen, Häuser, Keller, Garagen, Nebenräume oder ausgewählte Gewerbeflächen."],
      ["Übernimmt MTM auch die Entsorgung?", "Ja, Entrümpelung und Entsorgung werden als kombinierte Leistung angeboten."],
      ["Ist auch eine besenreine Übergabe möglich?", "Ja, bei passend vereinbartem Umfang ist eine saubere Übergabe möglich."],
      ["Kann ich eine Haushaltsauflösung anfragen?", "Sie können den Umfang der Räumung individuell beschreiben. Danach wird persönlich geprüft, was genau umgesetzt werden kann."],
      ["Sind Keller- und Garagenräumungen möglich?", "Ja, genau solche Bereiche werden auf der Webseite ausdrücklich genannt."],
      ["Muss alles vorsortiert sein?", "Nicht zwingend. Im ersten Schritt reicht eine Beschreibung der Situation, danach wird der Ablauf abgestimmt."],
      ["Kann ich Fotos von den Räumen hochladen?", "Ja, Bilder sind im Anfrage-Assistenten optional möglich und hilfreich."],
      ["Sind diskrete Räumungen möglich?", "Ja, die Leistung wird als diskret und verlässlich beschrieben."],
      ["Wird auch kurzfristig entrümpelt?", "Kurzfristige Anfragen sind möglich. Die konkrete Terminlage wird nach Anfrage geprüft."],
      ["Wie fordere ich eine Entrümpelung an?", "Einfach auf der Webseite die passende Leistung auswählen und den Assistenten starten."],
    ],
  },
  {
    id: "ablauf",
    title: "Ablauf, Termin & Angebot",
    questions: [
      ["Wie läuft eine Anfrage bei MTM ab?", "Sie wählen die passende Leistung aus, geben die wichtigsten Daten an und erhalten anschließend eine persönliche Rückmeldung."],
      ["Muss ich sofort alles ausfüllen?", "Nein, der Assistent führt Schritt für Schritt durch die Anfrage und fragt nur passende Angaben ab."],
      ["Kann ich einen Zeitraum statt eines festen Datums angeben?", "Ja, Sie können einen Wunschtermin oder einen alternativen Zeitraum angeben."],
      ["Ist die Anfrage verbindlich?", "Nein, die Anfrage ist unverbindlich. Preis, Termin und Auftragsannahme werden erst nach persönlicher Prüfung bestätigt."],
      ["Bekomme ich automatisch einen Preis angezeigt?", "Nein, MTM setzt bewusst auf persönliche Rückmeldung statt automatischer Preisversprechen."],
      ["Kann ich auch telefonisch anfragen?", "Ja, auf jeder Seite ist die Telefonnummer gut sichtbar hinterlegt."],
      ["Welche Informationen sollte ich bereithalten?", "Hilfreich sind Leistung, Ort, Terminwunsch, Umfang und mögliche Besonderheiten wie Etagen, Aufzug oder besondere Gegenstände."],
      ["Kann ich zusätzliche Hinweise angeben?", "Ja, dafür gibt es im Anfrage-Assistenten passende Felder für Notizen und Besonderheiten."],
      ["Was passiert nach dem Absenden?", "Ihre Angaben werden geprüft und MTM meldet sich anschließend persönlich zurück."],
      ["Kann ich mehrere Leistungen in einer Anfrage nennen?", "Ja, das ist möglich. Zusätzliche Leistungen oder Hinweise können direkt in der Anfrage angegeben werden."],
    ],
  },
  {
    id: "kontakt",
    title: "Einsatzgebiet, Kontakt & Organisation",
    questions: [
      ["In welchem Gebiet ist MTM tätig?", "Schwerpunkt ist Hannover mit dem Umland sowie der gesamten Region Hannover."],
      ["Wo finde ich die Kontaktmöglichkeiten?", "Telefon, E-Mail und Anfrage-Assistent sind auf der Webseite direkt erreichbar."],
      ["Kann ich einen Rückruf wünschen?", "Ja, im Assistenten gibt es eine Option für einen Rückrufwunsch."],
      ["Gibt es auch Expresstransporte?", "Ja, Expresstransporte mit 3,5-Tonnen-LKW inklusive Fahrer sind als eigene Leistung vorgesehen."],
      ["Kann ich auch eine sonstige Anfrage stellen?", "Ja, dafür gibt es im Assistenten die Auswahl Sonstige Anfrage."],
      ["Ist die Webseite auch mobil nutzbar?", "Ja, die Seite ist so aufgebaut, dass Anfragen auch mobil übersichtlich gestartet werden können."],
      ["Kann ich später weitere Bilder oder Infos nachreichen?", "Ja, weitere Informationen können bei der Rückmeldung oder nach Absprache ergänzt werden."],
      ["Ist die Leistung nur für Privatkunden gedacht?", "Nein, sowohl Privatkunden als auch gewerbliche Kunden können passende Leistungen anfragen."],
      ["Welche Leistungen gibt es auf der Webseite?", "Aktuell werden Umzug, Möbeltransport, Möbelmontage, Entrümpelung & Entsorgung, Expresstransporte und auf Anfrage auch Entkernung genannt."],
      ["Wie starte ich am schnellsten?", "Am schnellsten über den Anfrage-Assistenten oder direkt telefonisch unter der angegebenen Rufnummer."],
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
          <div className="container-shell py-12 sm:py-16">
            <p className="eyebrow-light">FAQ</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.7rem] lg:leading-[1.08]">
              Häufige Fragen klar und übersichtlich beantwortet.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">
              Die FAQ ist in 6 Themenbereiche gegliedert und beantwortet die wichtigsten Fragen zu Leistungen, Ablauf, Terminen, Kontakt und Organisation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button type="button" onClick={() => openAssistant()} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-bold text-accent-dark transition hover:bg-rose-50">
                Anfrage starten<ArrowRight size={18} />
              </button>
              <a href={`tel:${company.phoneHref}`} className="hero-button-secondary justify-center py-4"><Phone size={17} />{company.phoneDisplay}</a>
              <Link href="/leistungen" className="hero-button-secondary justify-center py-4">Leistungen ansehen</Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-shell">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {faqSections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className="rounded-[1.5rem] border border-rose-100 bg-white px-5 py-5 shadow-card transition hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent-dark">Bereich</p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy">{section.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">10 Fragen & Antworten in diesem Bereich</p>
                </a>
              ))}
            </div>

            <div className="mt-12 space-y-8">
              {faqSections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28 rounded-[2rem] border border-rose-100 bg-white p-6 shadow-card sm:p-8">
                  <div className="max-w-3xl">
                    <p className="eyebrow">FAQ-Bereich</p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{section.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600">Hier finden Sie 10 typische Fragen und kurze, verständliche Antworten zu diesem Thema.</p>
                  </div>
                  <div className="mt-8 space-y-3">
                    {section.questions.map(([question, answer], index) => (
                      <details key={question} className="group rounded-[1.35rem] border border-rose-100 bg-rose-50/55 px-5 py-4 open:bg-white open:shadow-sm">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-bold text-navy">
                          <span>{index + 1}. {question}</span>
                          <ChevronDown size={18} className="shrink-0 text-accent-dark transition group-open:rotate-180" />
                        </summary>
                        <p className="pt-4 text-sm leading-7 text-slate-600">{answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-soft py-16 sm:py-20">
          <div className="container-shell overflow-hidden rounded-[2rem] bg-white p-7 shadow-card sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-3xl">
              <p className="eyebrow">Noch Fragen offen?</p>
              <h2 className="section-heading">Dann starten Sie direkt eine unverbindliche Anfrage.</h2>
              <p className="section-intro">Wenn Ihre Frage hier nicht beantwortet wurde, hilft der Anfrage-Assistent weiter oder Sie rufen direkt an.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
              <button type="button" onClick={() => openAssistant()} className="button-primary"><Sparkles size={16} />Anfrage-Assistent</button>
              <a href={`tel:${company.phoneHref}`} className="button-secondary"><Phone size={16} />Anrufen</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {assistantOpen && <InquiryAssistant open={assistantOpen} defaultService={selectedService} onServiceChange={setSelectedService} onClose={() => setAssistantOpen(false)} />}
    </>
  );
}
