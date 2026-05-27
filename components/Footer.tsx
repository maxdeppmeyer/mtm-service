import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/company";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.25fr_1fr_0.9fr]">
        <div>
          <Image src="/logo.svg" alt="MTM Möbel Transport Montage" width={220} height={66} className="mb-5 h-auto w-[185px] sm:w-[215px]" />
          <p className="max-w-sm text-sm leading-7 text-rose-100/80">
            Zuverlässige Unterstützung bei Umzügen, Möbeltransporten, Montagen, Expresstransporten und Entrümpelungen in Hannover & Umland.
          </p>
          <Link href="/ueber-uns" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-rose-200">
            Über uns & Einblicke <ArrowRight size={15} />
          </Link>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-rose-200/70">Kontakt</h2>
          <div className="space-y-3 text-sm text-rose-50">
            <a href={`tel:${company.phoneHref}`} className="flex items-start gap-3 hover:text-white"><Phone size={17} className="mt-0.5 shrink-0 text-rose-300" />{company.phoneDisplay}</a>
            <a href={`mailto:${company.email}`} className="flex items-start gap-3 hover:text-white"><Mail size={17} className="mt-0.5 shrink-0 text-rose-300" />{company.email}</a>
            <p className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-rose-300" />Einsatzgebiet: {company.area}</p>
            <Link href="/kontakt" className="inline-flex items-center gap-2 pt-1 font-semibold text-white hover:text-rose-200">
              Zur Kontaktseite <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-rose-200/70">Rechtliches</h2>
          <div className="flex flex-col gap-3 text-sm text-rose-50">
            <Link href="/impressum" className="hover:text-white">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <p className="container-shell text-sm text-rose-100/60">© {new Date().getFullYear()} {company.legalName}. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}
