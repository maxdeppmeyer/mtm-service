import Image from "next/image";
import { MapPin, Phone, Send } from "lucide-react";
import { company } from "@/lib/company";

type RegionPanelProps = {
  variant: "contact" | "services";
  onInquiry: () => void;
};

export function RegionPanel({ variant, onInquiry }: RegionPanelProps) {
  const isContact = variant === "contact";

  return (
    <section
      id="einsatzgebiet"
      className="scroll-mt-28 py-14 sm:py-16"
      aria-labelledby={isContact ? "region-contact-heading" : "region-services-heading"}
    >
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#d81c2d_0%,#c41427_55%,#b00d1c_100%)] px-7 py-9 text-white shadow-soft sm:px-10 sm:py-11 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_48%,rgba(255,255,255,0.07),transparent_34%)]" />
          <div className="relative grid items-center gap-9 lg:grid-cols-[0.86fr_1.14fr] lg:gap-8">
            <div className="max-w-[410px]">
              <p className="eyebrow-light">{isContact ? "Einsatzgebiet" : "Regional unterwegs"}</p>
              <h2
                id={isContact ? "region-contact-heading" : "region-services-heading"}
                className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                {isContact ? "Region Hannover im Überblick" : "Für Hannover & Umland im Einsatz"}
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/90 sm:text-base">
                {isContact
                  ? "MTM ist regional erreichbar und unterstützt Sie bei passenden Aufträgen in Hannover sowie den umliegenden Städten und Gemeinden der Region."
                  : "Unsere Leistungen sind in Hannover und den umliegenden Städten und Gemeinden der Region flexibel anfragbar."}
              </p>
              <div className="mt-7 flex items-start gap-3 rounded-[1.2rem] border border-white/12 bg-white/10 px-4 py-4 text-sm leading-6 text-white/95">
                <MapPin size={17} className="mt-0.5 shrink-0" />
                <span>
                  Einsatzgebiet: {company.area}
                  <br />
                  {isContact
                    ? "Mit Schwerpunkt in Hannover und der gesamten Region Hannover."
                    : "Kurze Wege für Transport, Montage, Umzug und Räumung."}
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
            <div className="flex items-center justify-center lg:justify-end">
              <Image
                src="/images/karte-region-hannover-mtm-20260527-v9.png"
                alt="Region Hannover mit Hannover, Wedemark, Neustadt am Rübenberge, Burgwedel, Langenhagen, Isernhagen, Garbsen, Wunstorf, Seelze, Barsinghausen, Gehrden, Ronnenberg, Hemmingen, Wennigsen, Springe, Pattensen, Laatzen, Sehnde, Lehrte, Burgdorf und Uetze"
                width={1254}
                height={1254}
                className="h-auto w-full max-w-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
