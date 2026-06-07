"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, Sparkles } from "lucide-react";
import { company, navigation } from "@/lib/company";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/40 bg-white/93 shadow-[0_1px_0_rgba(216,28,45,0.07),0_4px_20px_rgba(36,17,19,0.05)] backdrop-blur-md">
      <div className="container-shell flex h-[76px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center" aria-label="Zur Startseite">
          <Image
            src="/logo-mtm-top-20260529-v15.png"
            alt="MTM Logo"
            width={1323}
            height={381}
            priority
            quality={100}
            className="h-auto w-[88px] sm:w-[108px]"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="group relative text-sm font-medium text-slate-700 transition hover:text-accent-dark">
                <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 rounded-full bg-accent transition-all duration-300 group-hover:w-full" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={`tel:${company.phoneHref}`} className="button-secondary">
            <Phone size={16} />
            {company.phoneDisplay}
          </a>
          <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-inquiry-assistant"))} className="button-primary">
            <Sparkles size={16} />
            Anfrage starten
          </button>
        </div>

        <details className="relative lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-navy">
            <Menu size={22} />
            <span className="sr-only">Menü öffnen</span>
          </summary>
          <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-rose-50 hover:text-accent-dark">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 border-t border-slate-200 pt-4">
              <a href={`tel:${company.phoneHref}`} className="button-secondary w-full justify-center">
                <Phone size={16} />
                {company.phoneDisplay}
              </a>
              <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-inquiry-assistant"))} className="button-primary mt-3 w-full justify-center">
                <Sparkles size={16} />
                Anfrage starten
              </button>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
