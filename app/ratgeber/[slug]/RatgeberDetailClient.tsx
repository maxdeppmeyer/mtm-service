"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { RatgeberArticle, ContentBlock } from "@/lib/ratgeber";

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "heading2":
      return <h2 key={index} className="mt-8 text-xl font-extrabold tracking-tight text-navy sm:text-2xl">{block.text}</h2>;
    case "heading3":
      return <h3 key={index} className="mt-5 text-base font-bold text-navy sm:text-lg">{block.text}</h3>;
    case "paragraph":
      return <p key={index} className="mt-4 text-sm leading-8 text-slate-600">{block.text}</p>;
    case "list":
      return (
        <ul key={index} className="mt-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-7 text-slate-600">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div key={index} className="mt-4 rounded-2xl border border-rose-100 bg-rose-50/60 px-5 py-4 text-sm leading-7 text-slate-600">
          {block.text}
        </div>
      );
  }
}

export default function RatgeberDetailClient({ article }: { article: RatgeberArticle }) {
  return (
    <>
      <Header />
      <main>
        <section className="brand-gradient text-white">
          <div className="container-shell py-10 sm:py-12">
            <Link href="/ratgeber" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white">
              <ArrowLeft size={16} /> Zum Ratgeber
            </Link>
            <p className="eyebrow-light mt-8">{article.category}</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">{article.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/90">{article.description}</p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container-shell max-w-3xl">
            <div className="rounded-[1.6rem] border border-rose-100 bg-white p-7 shadow-card sm:p-10">
              {article.content.map((block, index) => renderBlock(block, index))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-inquiry-assistant"))}
                className="button-primary"
              >
                <Sparkles size={17} /> Jetzt anfragen
              </button>
              <Link href="/ratgeber" className="button-secondary">
                <ArrowLeft size={16} /> Zum Ratgeber
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
