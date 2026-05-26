import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company, formattedAddress } from "@/lib/company";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.25fr_1fr_0.8fr]">
        <div>
          <Image src="/logo.svg" alt="MTM Möbel Transport Montage" width={210} height={46} className="mb-5 rounded bg-white p-2" />
          <p className="max-w-sm text-sm leading-7 text-slate-300">
            Unterstützung bei Umzügen, Möbeltransporten, Montagen und Entrümpelungen in Hannover, Isernhagen und Umgebung.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Kontakt</h2>
          <div className="space-y-3 text-sm text-slate-200">
            <a href={`tel:${company.phoneHref}`} className="flex items-start gap-3 hover:text-white"><Phone size={17} className="mt-0.5 shrink-0 text-accent" />{company.phoneDisplay}</a>
            <a href={`mailto:${company.email}`} className="flex items-start gap-3 hover:text-white"><Mail size={17} className="mt-0.5 shrink-0 text-accent" />{company.email}</a>
            <p className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-accent" />{formattedAddress()}<br />{company.address.country}</p>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Rechtliches</h2>
          <div className="flex flex-col gap-3 text-sm text-slate-200">
            <Link href="/impressum" className="hover:text-white">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
            <Link href="/#anfrage" className="hover:text-white">Anfrage senden</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <p className="container-shell text-sm text-slate-400">© {new Date().getFullYear()} {company.legalName}. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}
