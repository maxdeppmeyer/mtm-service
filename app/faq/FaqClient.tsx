"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { faqSections } from "@/lib/faq";

export default function FaqClient() {
  return (
    <>
      <Header />
      <main>
        <section className="brand-gradient text-white">
          <div className="container-shell py-10 sm:py-12">
            <p className="eyebrow-light">FAQ</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">Häufige Fragen auf einen Blick.</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/90">
              Wählen Sie einfach den passenden FAQ-Bereich. Die Antworten sind auf eigenen, übersichtlichen Seiten zusammengefasst.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container-shell">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {faqSections.map((section) => (
                <Link
                  key={section.slug}
                  href={`/faq/${section.slug}`}
                  className="group flex min-h-[178px] flex-col rounded-[1.6rem] border border-rose-100 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-soft"
                >
                  <p className="eyebrow">FAQ Bereich</p>
                  <h2 className="mt-4 text-xl font-bold tracking-tight text-navy">{section.title}</h2>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-accent-dark">
                    Fragen ansehen <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
