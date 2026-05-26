import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum von ${company.legalName}.`,
  alternates: { canonical: `${company.website}/impressum` },
};

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {company.legalName}<br />
        {company.address.street}<br />
        {company.address.postalCode} {company.address.city}<br />
        {company.address.country}
      </p>

      <h2>Vertreten durch</h2>
      <p>Inhaber: {company.owner}</p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={`tel:${company.phoneHref}`}>{company.phoneDisplay}</a><br />
        E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: {company.vatId}</p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

      <h2>Haftung für Inhalte und Links</h2>
      <p>Die Inhalte dieser Webseite werden mit Sorgfalt erstellt. Für externe Links sind ausschließlich deren Betreiber verantwortlich. Sobald konkrete Rechtsverletzungen bekannt werden, werden entsprechende Links entfernt.</p>

      <h2>Urheberrecht</h2>
      <p>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Webseite unterliegen dem deutschen Urheberrecht. Eine Verwertung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers.</p>
    </LegalLayout>
  );
}
