import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import { Footer } from "@/components/Footer";
import { company } from "@/lib/company";

export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="container-shell flex h-[76px] items-center justify-between gap-4">
          <Link href="/" aria-label="Zur Startseite">
            <Image src="/logo.svg" alt="MTM Möbel Transport Montage" width={210} height={46} className="h-auto w-[176px] sm:w-[210px]" />
          </Link>
          <div className="flex items-center gap-3">
            <a href={`tel:${company.phoneHref}`} className="button-secondary hidden sm:inline-flex"><Phone size={16} />{company.phoneDisplay}</a>
            <Link href="/#anfrage" className="button-primary">Anfrage</Link>
          </div>
        </div>
      </header>
      <main className="bg-soft py-10 sm:py-16">
        <article className="container-shell max-w-4xl rounded-[1.75rem] bg-white p-6 shadow-card sm:p-10 lg:p-14">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-navy"><ArrowLeft size={16} />Zur Startseite</Link>
          <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h1>
          <div className="legal-content mt-8">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
