"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { company, navigation } from "@/lib/company";
import { useState } from "react";

export function Header({ onOpenAssistant }: { onOpenAssistant: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rose-100/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="shrink-0" aria-label="MTM Startseite">
          <Image src="/logo.svg" alt="MTM Möbel Transport Montage" width={210} height={63} priority className="h-auto w-[170px] sm:w-[205px]" />
        </Link>

        <nav className="hidden items-center gap-4 xl:gap-6 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-sm font-semibold text-slate-700 transition hover:text-accent-dark">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${company.phoneHref}`} className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-accent-dark transition hover:bg-rose-50">
            <Phone size={16} />
            {company.phoneDisplay}
          </a>
          <button type="button" onClick={onOpenAssistant} className="button-primary rounded-full px-5 py-3 text-sm">
            <Sparkles size={16} />
            KI-Assistent
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex items-center justify-center rounded-full border border-rose-200 p-3 text-accent-dark lg:hidden"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-rose-100 bg-white lg:hidden">
          <div className="container-shell flex flex-col gap-2 py-4">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-rose-50" onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <a href={`tel:${company.phoneHref}`} className="mt-2 inline-flex items-center gap-2 rounded-2xl border border-rose-200 px-4 py-3 font-semibold text-accent-dark" onClick={() => setMenuOpen(false)}>
              <Phone size={17} />
              {company.phoneDisplay}
            </a>
            <button type="button" onClick={() => { setMenuOpen(false); onOpenAssistant(); }} className="button-primary mt-1 justify-center">
              <Sparkles size={17} />
              KI-Assistent starten
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
