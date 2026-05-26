"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { company, navigation } from "@/lib/company";

export function Header({ onOpenAssistant }: { onOpenAssistant: () => void }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="container-shell flex h-[76px] items-center justify-between gap-4">
        <Link href="/" aria-label="MTM Startseite" className="shrink-0">
          <Image src="/logo.svg" alt="MTM Möbel Transport Montage" width={210} height={46} priority className="h-auto w-[174px] sm:w-[210px]" />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${company.phoneHref}`} className="button-secondary hidden xl:inline-flex">
            <Phone size={16} />
            {company.phoneDisplay}
          </a>
          <button type="button" onClick={onOpenAssistant} className="hidden rounded-full p-3 text-navy transition hover:bg-slate-100 md:inline-flex lg:hidden" aria-label="KI-Anfrage starten">
            <Sparkles size={21} />
          </button>
          <Link href="#anfrage" className="button-primary hidden sm:inline-flex">
            Angebot anfragen
          </Link>
          <a href={`tel:${company.phoneHref}`} className="inline-flex rounded-full bg-navy p-3 text-white sm:hidden" aria-label={`${company.phoneDisplay} anrufen`}>
            <Phone size={20} />
          </a>
          <button type="button" className="inline-flex rounded-full p-3 text-navy lg:hidden" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"} onClick={() => setMenuOpen((current) => !current)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile Navigation" className="border-t border-slate-100 bg-white px-5 pb-5 pt-3 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-50">
                {item.label}
              </Link>
            ))}
            <button type="button" onClick={() => { setMenuOpen(false); onOpenAssistant(); }} className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 font-semibold text-navy">
              <Sparkles size={17} />
              KI-Anfrage starten
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
