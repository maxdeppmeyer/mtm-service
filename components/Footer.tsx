import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/company";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      {/* Floating glow blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="shape-float-1 absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-accent/8 blur-3xl" />
        <div className="shape-float-3 absolute -left-28 bottom-0 h-64 w-64 rounded-full bg-accent/6 blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,rgba(216,28,45,0.07)_0%,transparent_55%)]" />
      </div>

      {/* Top gradient accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <div className="container-shell relative z-10 grid gap-10 py-14 md:grid-cols-[1.25fr_1fr_0.9fr]">
        <div>
          <Image
            src="/logo-mtm-top-20260529-v15.png"
            alt="MTM Logo"
            width={1323}
            height={381}
            quality={100}
            className="mb-5 h-auto w-[96px] opacity-95 sm:w-[116px]"
          />
          <p className="max-w-sm text-sm leading-7 text-rose-100/75">
            Zuverlässige Unterstützung bei Umzügen, Möbeltransporten, Montagen, Expresstransporten und Entrümpelungen in Hannover & Umland.
          </p>
          <Link
            href="/ueber-uns"
            className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
          >
            Über uns
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div>
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-rose-200/60">Kontakt</h2>
          <div className="space-y-3 text-sm text-rose-50/80">
            <a
              href={`tel:${company.phoneHref}`}
              className="flex items-start gap-3 transition hover:text-white"
            >
              <Phone size={17} className="mt-0.5 shrink-0 text-accent/80" />{company.phoneDisplay}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="flex items-start gap-3 transition hover:text-white"
            >
              <Mail size={17} className="mt-0.5 shrink-0 text-accent/80" />{company.email}
            </a>
            <p className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-accent/80" />Einsatzgebiet: {company.area}
            </p>
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 pt-1 font-semibold text-white/90 transition hover:text-white"
            >
              Zur Kontaktseite
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div>
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-rose-200/60">Rechtliches</h2>
          <div className="flex flex-col gap-3 text-sm text-rose-50/80">
            <Link href="/impressum" className="transition hover:text-white">Impressum</Link>
            <Link href="/datenschutz" className="transition hover:text-white">Datenschutz</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.07] py-5">
        <p className="container-shell relative z-10 text-sm text-rose-100/45">
          © {new Date().getFullYear()} {company.legalName}. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
