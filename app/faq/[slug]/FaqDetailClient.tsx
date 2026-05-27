"use client";

import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryAssistant } from "@/components/InquiryAssistant";
import { ServiceId } from "@/lib/company";
import type { FaqSection } from "@/lib/faq";
import { useState } from "react";

export default function FaqDetailClient({ section }: { section: FaqSection }) {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceId>("umzug");

  return (
    <>
      <Header onOpenAssistant={() => setAssistantOpen(true)} />
      <main>
        <section className="brand-gradient text-white">
          <div className="container-shell py-10 sm:py-12">
            <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white">
              <ArrowLeft size={16} /> Zur FAQ-Übersicht
            </Link>
            <p className="eyebrow-light mt-8">FAQ Bereich</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">{section.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/90">{section.intro}</p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container-shell max-w-4xl">
            <div className="space-y-3">
              {section.questions.map(({ question, answer }, index) => (
                <details key={question} className="group rounded-[1.3rem] border border-rose-100 bg-white px-5 py-4 shadow-card">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-base font-bold leading-7 text-navy">
                    <span>{index + 1}. {question}</span>
                    <ChevronDown size={18} className="mt-1 shrink-0 text-accent-dark transition group-open:rotate-180" />
                  </summary>
                  <p className="pt-4 text-sm leading-7 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
            <Link href="/faq" className="button-secondary mt-9 inline-flex">
              <ArrowLeft size={17} /> Zur FAQ-Übersicht
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      {assistantOpen && <InquiryAssistant open={assistantOpen} defaultService={selectedService} onServiceChange={setSelectedService} onClose={() => setAssistantOpen(false)} />}
    </>
  );
}
