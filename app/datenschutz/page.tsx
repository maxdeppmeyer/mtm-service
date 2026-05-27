import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Informationen zum Datenschutz bei ${company.legalName}.`,
  alternates: { canonical: `${company.website}/datenschutz` },
};

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <p>Stand: 26.05.2026</p>

      <h2>1. Verantwortlicher</h2>
      <p>
        {company.legalName}<br />
        Inhaber: {company.owner}<br />
        {company.address.street}<br />
        {company.address.postalCode} {company.address.city}<br />
        {company.address.country}<br />
        Telefon: <a href={`tel:${company.phoneHref}`}>{company.phoneDisplay}</a><br />
        E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
      </p>

      <h2>2. Allgemeine Hinweise</h2>
      <p>Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Webseite, zur Bearbeitung von Anfragen oder zur Erfüllung gesetzlicher Pflichten erforderlich ist. Personenbezogene Daten sind alle Informationen, mit denen Sie persönlich identifiziert werden können.</p>

      <h2>3. Bereitstellung der Webseite und Hosting</h2>
      <p>Die Webseite ist für eine Bereitstellung über Cloudflare vorbereitet. Beim Aufruf der Webseite können technisch erforderliche Verbindungsdaten verarbeitet werden, insbesondere IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Datei, Browserinformationen und Referrer-Informationen. Diese Verarbeitung dient der sicheren und technisch zuverlässigen Bereitstellung der Webseite.</p>
      <p>Vor der Veröffentlichung ist zu prüfen, welche Cloudflare-Produkte tatsächlich eingesetzt werden und ob dafür weitere Angaben, Vereinbarungen oder Einstellungen erforderlich sind.</p>

      <h2>4. Kontaktaufnahme per Telefon oder E-Mail</h2>
      <p>Wenn Sie uns telefonisch oder per E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung Ihres Anliegens und für mögliche Anschlussfragen. Hierzu können insbesondere Name, Kontaktdaten und Informationen zu Ihrem gewünschten Auftrag gehören.</p>

      <h2>5. Anfrageformular</h2>
      <p>Über das Anfrageformular können Sie eine unverbindliche Anfrage zu einem Auftrag senden. Dabei können insbesondere folgende Angaben verarbeitet werden:</p>
      <ul>
        <li>gewünschte Leistung, Einsatzort, Zieladresse und Wunschtermin,</li>
        <li>Name, Telefonnummer und E-Mail-Adresse,</li>
        <li>Ihre Beschreibung des Auftrags und der Rückrufwunsch,</li>
        <li>optional hochgeladene Fotos.</li>
      </ul>
      <p>Die Daten werden ausschließlich zur Prüfung und Bearbeitung Ihrer Anfrage sowie zur Kontaktaufnahme verwendet. Das Absenden einer Anfrage führt nicht automatisch zu einem Vertrag oder einer verbindlichen Terminbestätigung.</p>

      <h2>6. Anfrage-Assistent</h2>
      <p>Der Anfrage-Assistent führt Sie schrittweise durch die Erfassung Ihres Anliegens. In der ersten Version werden Ihre Angaben strukturiert zusammengestellt und anschließend wie eine Anfrage verarbeitet. Ein automatischer Preis, eine verbindliche Terminbestätigung oder eine automatische Auftragsannahme erfolgt nicht.</p>
      <p>Während der Eingabe können Angaben in Ihrem Browser vorübergehend gespeichert werden, damit Sie den Anfrage-Assistenten schließen und später fortsetzen können. Diese Daten werden nach erfolgreichem Absenden entfernt und können von Ihnen durch Zurücksetzen des Anfrage-Assistenten gelöscht werden.</p>

      <h2>7. Hochgeladene Fotos</h2>
      <p>Sie können freiwillig Fotos hochladen, um die Anfrage besser beurteilen zu lassen. Laden Sie nur Bilder hoch, deren Übermittlung zulässig ist und die keine unnötigen sensiblen Informationen enthalten. Die technische Umsetzung begrenzt die Uploads auf Bilddateien und eine maximale Dateigröße.</p>

      <h2>8. Versand und Empfänger von Anfragen</h2>
      <p>Der Formularversand wird serverseitig eingerichtet. Wenn hierfür ein E-Mail-Versanddienst oder eine Datenbank eingesetzt wird, werden die dafür notwendigen Angaben vor dem Livegang in dieser Datenschutzerklärung konkret ergänzt. Geheimschlüssel und Zugangsdaten werden nicht im Browser bereitgestellt.</p>

      <h2>9. Cookies, Analyse und externe Inhalte</h2>
      <p>Die vorliegende Webseite ist ohne Analyse- oder Marketing-Tracking und ohne externe eingebettete Karten, Videos oder Bewertungswidgets konzipiert. Werden solche Dienste später ergänzt, wird die Datenschutzerklärung vor ihrem Einsatz entsprechend aktualisiert und erforderliche Einwilligungen werden berücksichtigt.</p>

      <h2>10. Speicherdauer</h2>
      <p>Wir speichern personenbezogene Daten nur so lange, wie dies für die Bearbeitung Ihrer Anfrage, für die Durchführung eines entstehenden Vertragsverhältnisses oder aufgrund gesetzlicher Aufbewahrungspflichten erforderlich ist. Entfällt der Verarbeitungszweck und bestehen keine Aufbewahrungspflichten mehr, werden die Daten gelöscht.</p>

      <h2>11. Ihre Rechte</h2>
      <p>Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten. Eine erteilte Einwilligung können Sie mit Wirkung für die Zukunft widerrufen.</p>
      <p>Sie haben außerdem das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.</p>

      <h2>12. Aktualisierung dieser Datenschutzerklärung</h2>
      <p>Diese Datenschutzerklärung wird angepasst, wenn sich die eingesetzten Dienste oder die Art der Datenverarbeitung ändern.</p>
    </LegalLayout>
  );
}
