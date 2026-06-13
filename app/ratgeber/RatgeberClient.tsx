"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ratgeberArticles } from "@/lib/ratgeber";

const categoryColors: Record<string, string> = {
  Umzug: "bg-rose-50 text-accent-dark",
  Möbelmontage: "bg-rose-50 text-accent-dark",
  Entrümpelung: "bg-rose-50 text-accent-dark",
  Transport: "bg-rose-50 text-accent-dark",
  Gewerbe: "bg-rose-50 text-accent-dark",
  Entkernung: "bg-rose-50 text-accent-dark",
};

export default function RatgeberClient() {
  return (
    <>
      <Header />
      <main>
        <section className="brand-gradient text-white">
          <div className="container-shell py-10 sm:py-12">
            <p className="eyebrow-light">Ratgeber</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ratgeber rund um Umzug, Transport & Montage.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/90">
              Praxisnahe Informationen zu Kosten, Abläufen und häufigen Fragen – für Privat- und Geschäftskunden in Hannover & Umland.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container-shell">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ratgeberArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/ratgeber/${article.slug}`}
                  className="group flex min-h-[200px] flex-col rounded-[1.6rem] border border-rose-100 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-soft"
                >
                  <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${categoryColors[article.category] ?? "bg-rose-50 text-accent-dark"}`}>
                    {article.category}
                  </span>
                  <h2 className="mt-4 text-lg font-bold leading-snug tracking-tight text-navy">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{article.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-accent-dark">
                    Artikel lesen <ArrowRight size={15} className="transition group-hover:translate-x-1" />
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
