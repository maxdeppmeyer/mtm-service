"use client";

import { useEffect, useState } from "react";
import { Phone, Sparkles } from "lucide-react";
import { InquiryAssistant } from "@/components/InquiryAssistant";
import { company, ServiceId } from "@/lib/company";

export function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<ServiceId>("umzug");

  useEffect(() => {
    function handleOpen(e: Event) {
      const ev = e as CustomEvent<{ service?: ServiceId }>;
      if (ev.detail?.service) setService(ev.detail.service as ServiceId);
      setOpen(true);
    }
    window.addEventListener("open-inquiry-assistant", handleOpen);
    return () => window.removeEventListener("open-inquiry-assistant", handleOpen);
  }, []);

  return (
    <>
      {/* Desktop: fixierter Button unten rechts – auf allen Seiten */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="button-primary fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full px-5 py-4 font-bold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(216,28,45,0.5)] sm:inline-flex"
      >
        <Sparkles size={19} />Anfrage-Assistent
      </button>

      {/* Mobile: fixierte Leiste unten – auf allen Seiten */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-rose-100 bg-white/95 p-3 backdrop-blur-sm sm:hidden">
        <a href={`tel:${company.phoneHref}`} className="button-secondary justify-center px-3">
          <Phone size={17} />Anrufen
        </a>
        <button type="button" onClick={() => setOpen(true)} className="button-primary justify-center px-3">
          Anfrage
        </button>
      </div>

      {open && (
        <InquiryAssistant
          open={open}
          defaultService={service}
          onServiceChange={setService}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
