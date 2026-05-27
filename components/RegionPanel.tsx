import Image from "next/image";
import { MapPin, Phone, Send } from "lucide-react";
import { company } from "@/lib/company";

type RegionPanelProps = {
  variant: "home" | "services";
  onInquiry: () => void;
};

export function RegionPanel({ variant, onInquiry }: RegionPanelProps) {
  const isHome = variant === "home";

  return (
    <section
      id={isHome ? "ablauf" : undefined}
      className="scroll-mt-28 py-16 sm:py-20"
      aria-labelledby={isHome ? "region-home-heading" : "region-services-heading"}
    >
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#d81c2d_0%,#bd1121_57%,#a40d1a_100%)] px-7 py-9 text-white shadow-soft sm:px-10 sm:py-11 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_77%_46%,rgba(255,255,255,0.12),transparent_31%)]" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">
            <div className="max-w-[405px]">
              <p className="eyebrow-light">{isHome ? "Einsatzgebiet" : "Regional unterwegs"}</p>
              <h2
                id={isHome ? "region-home-heading" : "region-services-heading"}
                className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                {isHome ? "Region Hannover im Überblick" : "Für Hannover & Umland im Einsatz"}
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/90 sm:text-base">
                {isHome
                  ? "MTM ist regional erreichbar und unterstützt Sie bei passenden Aufträgen in Hannover sowie den umliegenden Städten und Gemeinden der Region."
                  : "Unsere Leistungen sind in Hannover und den umliegenden Städten und Gemeinden der Region flexibel anfragbar."}
              </p>
              <div className="mt-7 flex items-start gap-3 rounded-[1.2rem] border border-white/10 bg-white/10 px-4 py-4 text-sm leading-6 text-white/95">
                <MapPin size={17} className="mt-0.5 shrink-0" />
                <span>
                  Einsatzgebiet: {company.area}
                  <br />
                  {isHome ? "Mit Schwerpunkt in Hannover und der gesamten Region Hannover." : "Kurze Wege für Transport, Montage, Umzug und Räumung."}
                </span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`tel:${company.phoneHref}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/65 bg-transparent px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <Phone size={15} />
                  {company.phoneDisplay}
                </a>
                <button
                  type="button"
                  onClick={onInquiry}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-accent-dark transition hover:bg-rose-50"
                >
                  <Send size={15} />
                  Anfrage starten
                </button>
              </div>
            </div>
            <div className={`flex items-center justify-center lg:justify-end ${isHome ? "lg:pr-1" : "lg:pr-4"}`}>
              <Image
                src="/images/karte-region-hannover-outline-mtm-20260527-v6.svg"
                alt="Region Hannover mit Hannover, Wedemark, Neustadt am Rübenberge, Burgwedel, Langenhagen, Isernhagen, Garbsen, Wunstorf, Seelze, Barsinghausen, Gehrden, Ronnenberg, Hemmingen, Wennigsen, Springe, Pattensen, Laatzen, Sehnde, Lehrte, Burgdorf und Uetze"
                width={860}
                height={640}
                className={`h-auto w-full ${isHome ? "max-w-[620px]" : "max-w-[590px]"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
