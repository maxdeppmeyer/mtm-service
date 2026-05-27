# MTM – Möbel Transport Montage Webseite

Neue, kompakte Unternehmenswebseite für **MTM – Möbel Transport Montage** mit Fokus auf Anfragen, Direktanrufe und eine digitale Schritt-für-Schritt-Anfrage.

## Enthaltene Funktionen

- moderne, mobile-first Startseite als Onepager
- Sticky Header und mobile Kontaktleiste
- vollflächiger Hero-Bereich mit dem echten MTM-Teamfoto und gut lesbarer Textüberlagerung
- Leistungskarten für Umzug, Möbeltransport, Möbelmontage sowie Entrümpelung und Entsorgung
- eigene Detailseite für die Leistungsbereiche
- selbst erstellte, reduzierte Einsatzgebietsgrafik für Hannover & Umland
- kompakter Ablaufbereich
- reduzierte Anfrageauswahl, die Besucher direkt in den Anfrage-Assistenten führt
- digitaler Anfrage-Assistent mit Fortschritt, Zusammenfassung und Zwischenspeicherung im Browser
- serverseitiger API-Endpunkt für Anfrageversand mit Validierung und Upload-Prüfung
- Kontaktbereich und kompakter Footer
- eigene Seiten für Impressum und Datenschutz
- lokale SEO-Basis: Metadata, Open Graph, LocalBusiness-Markup, Sitemap, robots.txt und Webmanifest
- Cloudflare-Workers-Konfiguration über OpenNext

## Verwendete Unternehmensangaben

Alle Unternehmens- und Kontaktdaten werden zentral in `lib/company.ts` gepflegt. Verwendet werden die offiziellen Angaben aus dem aktuellen Impressum der bestehenden Webseite:

- MTM Möbel Transport Montage
- Inhaber: Tim Precan
- Flüggestraße 19, 30161 Hannover, Deutschland
- Telefon: 0511 / 60978240
- E-Mail: info@mtm-service.de
- Umsatzsteuer-ID: DE338555383

Die bisherige Webseite zeigt im Footer eine abweichende Anschrift. Dieses neue Projekt verwendet einheitlich die Angaben aus dem Impressum. Vor dem Livegang muss MTM bestätigen, dass die Impressumsadresse weiterhin aktuell und geschäftlich maßgeblich ist.

## Bilder

Das echte MTM-Teamfoto wird im Hero-Bereich verwendet. Für einzelne Leistungen wurden zusätzlich kostenfrei nutzbare Unsplash-Fotos ausgewählt und als WebP-Dateien optimiert. Das vorhandene echte MTM-Bild für Möbeltransport bleibt erhalten.

Die Bildquellen und Lizenzhinweise sind in `BILDQUELLEN.md` dokumentiert. Die Einsatzgebietskarte ist eine neu erstellte grafische SVG-Darstellung und kein Flyer-Screenshot.

## Technik

- Next.js 16 mit App Router
- React 19 und TypeScript
- Tailwind CSS 4
- serverseitige Route Handler für Formularanfragen
- Cloudflare Workers Deployment mit `@opennextjs/cloudflare`
- keine API-Schlüssel im Frontend
- kein Analyse- oder Marketing-Tracking im Projektstand

Die Cloudflare-Konfiguration folgt dem aktuellen offiziellen Next.js-Ansatz über Cloudflare Workers und den OpenNext-Adapter. Die App nutzt kein `runtime = "edge"`, da dies für den OpenNext-Cloudflare-Adapter nicht vorgesehen ist. In `wrangler.jsonc` ist ein mit der aktuellen lokalen Vorschau kompatibles Datum hinterlegt; es liegt deutlich nach dem von OpenNext geforderten Mindestdatum.

## Projektstruktur

```text
app/
  api/anfrage/route.ts       Serverseitiger Anfrage-Endpunkt
  datenschutz/page.tsx       Datenschutzerklärung
  impressum/page.tsx         Impressum
  layout.tsx                 Globales Layout und Metadaten
  page.tsx                   Startseite und LocalBusiness-Daten
  leistungen/                Separate Detailseite für Leistungen
  robots.ts                  Robots-Konfiguration
  sitemap.ts                 Sitemap
components/
  HomeExperience.tsx         Onepager und Interaktionen
  InquiryAssistant.tsx       Digitaler Anfrage-Assistent
  InquiryForm.tsx            Vorbereitete Formular-Komponente für mögliche spätere Nutzung
  Header.tsx / Footer.tsx    Navigation und Footer
lib/
  company.ts                 Zentrale Unternehmensdaten
  inquiry.ts                 E-Mail-Inhalt der Anfrage
  metadata.ts / schema.ts    SEO- und strukturierte Daten
public/
  images/                    Optimierte Originalbilder
  logo.svg                   Neues schlankes MTM-Logo für das Layout
wrangler.jsonc               Cloudflare-Workers-Konfiguration
open-next.config.ts          OpenNext-Konfiguration
```

## Lokal starten

Voraussetzungen:

- Node.js 20 oder neuer
- npm

```bash
npm install
npm run dev
```

Die Webseite ist anschließend lokal unter `http://localhost:3000` verfügbar.

## Qualität prüfen

```bash
npm run lint
npm run typecheck
npm run build
```

Für eine Vorschau in der Cloudflare-Workers-Laufzeit:

```bash
cp .dev.vars.example .dev.vars
npm run preview
```

## Anfrage-Assistent und E-Mail-Versand

Die sichtbare Anfrageführung startet über den Anfrage-Assistenten. Der Assistent sendet seine Daten an den serverseitigen Route Handler `app/api/anfrage/route.ts`. Der Endpunkt:

- prüft die Pflichtfelder und die Datenschutz-Einwilligung
- enthält ein Honeypot-Feld als Basisschutz gegen Bots
- akzeptiert maximal drei Bilder im Format JPG, PNG oder WEBP
- begrenzt Bilder auf maximal 4 MB pro Datei und 10 MB insgesamt
- versendet keine verbindlichen Preis- oder Terminzusagen
- gibt ohne konfigurierte Servervariablen eine ehrliche Meldung mit Telefon- und E-Mail-Alternative zurück

Für den vorbereiteten Versand über Resend werden serverseitig folgende Variablen benötigt:

```bash
RESEND_API_KEY="..."
INQUIRY_TO_EMAIL="info@mtm-service.de"
INQUIRY_FROM_EMAIL="MTM Anfrage <anfrage@mtm-service.de>"
```

Für eine lokale Cloudflare-Vorschau kann `.dev.vars.example` nach `.dev.vars` kopiert und mit Testwerten befüllt werden. Diese Datei darf nicht in GitHub hochgeladen werden.

Für einen echten Versand muss die Absenderdomain beim gewählten E-Mail-Dienst verifiziert werden. Die Variablen werden ausschließlich in Cloudflare als Geheimnisse beziehungsweise Umgebungsvariablen gepflegt und nicht in GitHub gespeichert.

Vor öffentlichem Betrieb sollten zusätzlich ein stärkerer Spamschutz, zum Beispiel Cloudflare Turnstile, sowie eine abschließende Prüfung der Upload- und Löschregeln ergänzt werden.

## Digitaler Anfrage-Assistent und spätere KI-Erweiterung

Der Assistent ist im ersten Projektstand als sichere strukturierte Anfrageführung umgesetzt:

- Leistung, Strecke beziehungsweise Einsatzort
- Wunschtermin und Dringlichkeit
- Umfang und Bedingungen vor Ort
- Kontaktdaten, Rückrufwunsch und optionale Bilder
- Zusammenfassung vor dem Absenden

Die Eingaben werden nur zur Fortsetzung im geöffneten Browser über `sessionStorage` zwischengespeichert und nach erfolgreichem Absenden entfernt.

Eine echte KI-Funktion kann später serverseitig ergänzt werden. Dafür gilt:

1. OpenAI-API ausschließlich in einem serverseitigen Route Handler oder Cloudflare Worker aufrufen.
2. `OPENAI_API_KEY` ausschließlich als Cloudflare Secret hinterlegen.
3. Die KI nur zur Strukturierung oder Rückfrageunterstützung einsetzen.
4. Keine automatische Preiszusage, Terminbestätigung oder Auftragsannahme ausgeben.
5. Strukturierte JSON-Ausgaben validieren, bevor Daten gespeichert oder versendet werden.
6. Die Datenschutzerklärung vor Aktivierung an die konkrete Verarbeitung anpassen.

## GitHub Repository anlegen

Im Projektordner:

```bash
git init
git add .
git commit -m "Neue MTM Unternehmenswebseite"
git branch -M main
git remote add origin <GITHUB-REPOSITORY-URL>
git push -u origin main
```

Die Dateien `.env`, `.dev.vars`, `.open-next` und lokale Cloudflare-Dateien werden über `.gitignore` ausgeschlossen.

## Deployment über Cloudflare Workers

Das Projekt ist für Cloudflare Workers mit OpenNext vorbereitet.

### Lokales Deployment

1. Cloudflare-Zugang in Wrangler einrichten:

```bash
npx wrangler login
```

2. Servervariablen als Secrets hinterlegen:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put INQUIRY_TO_EMAIL
npx wrangler secret put INQUIRY_FROM_EMAIL
```

3. Deployment ausführen:

```bash
npm run deploy
```

### GitHub mit Cloudflare verbinden

1. In Cloudflare unter **Workers & Pages** auf **Create application** gehen.
2. Bei **Import a repository** starten und das GitHub-Repository auswählen.
3. Den Produktionsbranch `main` auswählen.
4. Der Worker-Name muss exakt `mtm-service` lauten, weil dieser Name in `wrangler.jsonc` hinterlegt ist.
5. In den Build-Einstellungen diese Befehle eintragen:

```text
Build command: npm run cf:build
Deploy command: npm run cf:deploy
Non-production branch deploy command: npm run cf:upload
Root directory: /
```

6. Unter **Settings > Variables & Secrets** die Runtime-Secrets für den Anfrageversand hinterlegen:

```text
RESEND_API_KEY
INQUIRY_TO_EMAIL
INQUIRY_FROM_EMAIL
```

7. Das erste Deployment prüfen und erst danach die Custom Domain verbinden.

Cloudflare Workers Builds führt Build- und Deploy-Befehl getrennt aus. Deshalb wird der OpenNext-Build mit `npm run cf:build` erstellt und anschließend durch Wrangler mit `npm run cf:deploy` veröffentlicht.

### Domain verbinden

Die Zieladresse ist:

```text
www.mtm-service.de
```

In Cloudflare wird die Domain als Custom Domain des Workers hinzugefügt. Vor der Umschaltung muss geprüft werden, dass die DNS-Verwaltung korrekt in Cloudflare liegt und dass die bisherige Webseite erst ersetzt wird, wenn die neue Webseite vollständig getestet wurde.

## Rechtliche Prüfung vor Veröffentlichung

Vor dem endgültigen Livegang sind mindestens diese Punkte zu prüfen:

- Aktualität und rechtliche Richtigkeit von Impressum und Geschäftsadresse
- Anpassung der Datenschutzerklärung an den tatsächlich genutzten Hosting- und Versanddienst
- Auftragsverarbeitungsvereinbarungen, sofern erforderlich
- Rechtsgrundlagen und Löschfristen für Formularanfragen und Bilder
- Einsatz eines Spamschutzes und dessen Datenschutzangaben
- spätere KI-Anbindung und deren Datenschutzhinweise
- Verwendung und Lizenzdokumentation der eingebundenen Bilder

## Vor Livegang testen

- Darstellung auf Smartphone, Tablet und Desktop
- Mobile Telefonbuttons und E-Mail-Links
- Navigation und Scrollziele
- Auswahl einer Leistung und Start des passenden Anfrage-Assistenten
- Assistent einschließlich Zurück-Funktion, Zusammenfassung und Upload
- Versand des Anfrage-Assistenten mit echten Cloudflare-Secrets
- Fehlerfall ohne Versandkonfiguration
- Impressum, Datenschutz, Sitemap und robots.txt
- strukturierte Daten und Meta-Texte
- finale Schreibweise sämtlicher Kontaktdaten
