# MTM-Webseite hochladen und bei Cloudflare veröffentlichen

Diese Anleitung ist für die fertige Projekt-ZIP gedacht. Der Versand des Anfrage-Assistenten funktioniert öffentlich erst, wenn die drei serverseitigen E-Mail-Variablen in Cloudflare hinterlegt sind.

## 1. ZIP entpacken und lokal prüfen

1. Die ZIP-Datei entpacken.
2. Im entpackten Ordner ein Terminal öffnen.
3. Folgende Befehle ausführen:

```bash
npm install
npm run dev
```

4. Im Browser `http://localhost:3000` öffnen und die Startseite, Leistungsseite, Impressum, Datenschutz und den Anfrage-Assistenten prüfen.

Zusätzliche technische Prüfung:

```bash
npm run lint
npm run typecheck
npm run cf:build
```

## 2. Projekt in GitHub hochladen

1. Bei GitHub ein neues, leeres Repository anlegen, zum Beispiel `mtm-service`.
2. Im Projektordner diese Befehle ausführen:

```bash
git init
git add .
git commit -m "Neue MTM Webseite"
git branch -M main
git remote add origin DEINE-GITHUB-REPOSITORY-URL
git push -u origin main
```

In GitHub dürfen keine echten API-Schlüssel oder Zugangsdaten gespeichert werden. Die Dateien `.env`, `.dev.vars`, `.open-next` und `.wrangler` sind bereits ausgeschlossen.

## 3. GitHub-Repository mit Cloudflare Workers verbinden

Für dieses Projekt **Cloudflare Workers** verwenden, nicht Cloudflare Pages. Das Projekt enthält eine serverseitige Formularroute und ist mit dem OpenNext-Adapter für Workers vorbereitet.

1. In Cloudflare zu **Workers & Pages** gehen.
2. **Create application** auswählen.
3. Bei **Import a repository** starten.
4. GitHub verbinden und das soeben hochgeladene Repository auswählen.
5. Als Production Branch `main` wählen.
6. Als Worker-Name exakt diesen Namen verwenden:

```text
mtm-service
```

Der Name muss mit `wrangler.jsonc` übereinstimmen.

## 4. Cloudflare Build-Einstellungen eintragen

In den Build-Einstellungen folgende Werte eintragen:

```text
Build command: npm run cf:build
Deploy command: npm run cf:deploy
Non-production branch deploy command: npm run cf:upload
Root directory: /
```

Anschließend speichern und das erste Deployment ausführen lassen.

## 5. Anfrageversand aktivieren

Der Anfrage-Assistent ist als sichtbare Anfrageführung vollständig eingebaut. Für den echten Versand ist ein serverseitiger E-Mail-Dienst vorgesehen. Vorbereitet ist **Resend**.

Benötigt werden:

1. Ein Resend-Konto.
2. Die Domain `mtm-service.de` als verifizierte Versanddomain bei Resend.
3. Ein Resend API-Key.
4. In Cloudflare beim Worker unter **Settings > Variables & Secrets** diese Runtime-Secrets:

```text
RESEND_API_KEY = dein_api_key
INQUIRY_TO_EMAIL = info@mtm-service.de
INQUIRY_FROM_EMAIL = MTM Anfrage <anfrage@mtm-service.de>
```

Wichtig: `RESEND_API_KEY` niemals in GitHub oder im Frontend eintragen.

Danach erneut deployen oder einen neuen Commit nach GitHub pushen und eine Testanfrage absenden.

## 6. Domain verbinden

Nach erfolgreichem Test des Workers:

1. Den Cloudflare Worker `mtm-service` öffnen.
2. Unter Domains beziehungsweise Custom Domains die Domain hinzufügen:

```text
www.mtm-service.de
```

3. Erst auf die neue Webseite umstellen, wenn Startseite, Mobilansicht, Versand des Anfrage-Assistenten, Impressum und Datenschutz getestet wurden.

## 7. Vor dem endgültigen Livegang prüfen

- Ist die offizielle Anschrift **Flüggestraße 19, 30161 Hannover** weiterhin korrekt?
- Sind Inhaber und USt-ID weiterhin korrekt?
- Sind die verwendeten Fotos zur Veröffentlichung freigegeben?
- Ist der echte E-Mail-Dienst in der Datenschutzerklärung korrekt benannt?
- Wird gegebenenfalls Cloudflare Turnstile als Spamschutz ergänzt und datenschutzrechtlich berücksichtigt?
- Soll später eine echte KI-Anbindung aktiviert werden, muss dies serverseitig erfolgen und in der Datenschutzerklärung ergänzt werden.

## Bereits umgesetzt

- neue mobile-first Startseite als kompakter Onepager
- vollflächiger Hero-Bereich mit echtem MTM-Teamfoto
- passende, lizenzdokumentierte Leistungsbilder und neue SVG-Einsatzgebietsgrafik
- Leistungen, separate Leistungsseite, Ablauf und Kontaktbereich
- reduzierte Anfrageauswahl als Einstieg in den Assistenten
- schrittweiser Anfrage-Assistent mit Zusammenfassung
- serverseitig vorbereiteter E-Mail-Versand mit Foto-Upload-Prüfung
- Impressum und Datenschutz
- SEO-Metadaten, LocalBusiness-Daten, Sitemap und robots.txt
- Cloudflare-Workers-/OpenNext-Konfiguration
